import { google, sheets_v4 } from "googleapis";
import { JWT } from "google-auth-library";
import { v4 as uuidv4 } from "uuid";
import type {
  Equipement,
  Pole,
  Lieu,
  Categorie,
  Utilisateur,
  SheetName,
} from "@/types";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const SHEET_HEADERS: Record<SheetName, string[]> = {
  Equipements: [
    "id",
    "nom",
    "categorie",
    "pole",
    "responsable",
    "lieu_stockage",
    "detenu_par",
    "etat",
    "notes",
    "date_creation",
    "derniere_modif",
    "quantite",
  ],
  Poles: ["id", "nom", "responsable", "actif"],
  Lieux: ["id", "nom", "adresse", "actif"],
  Categories: ["id", "nom", "actif"],
  Utilisateurs: [
    "id",
    "email",
    "nom",
    "mot_de_passe",
    "role",
    "pole_rattache",
    "actif",
  ],
};

type RowMap = Record<string, string>;

let sheetsClient: sheets_v4.Sheets | null = null;

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY env var"
    );
  }
  const key = rawKey.replace(/\\n/g, "\n");
  return new JWT({ email, key, scopes: SCOPES });
}

function getSheets(): sheets_v4.Sheets {
  if (sheetsClient) return sheetsClient;
  sheetsClient = google.sheets({ version: "v4", auth: getAuth() });
  return sheetsClient;
}

function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SPREADSHEET_ID;
  if (!id) throw new Error("Missing GOOGLE_SPREADSHEET_ID env var");
  return id;
}

function rowToObject(headers: string[], row: string[]): RowMap {
  const obj: RowMap = {};
  headers.forEach((h, i) => {
    obj[h] = row[i] ?? "";
  });
  return obj;
}

function objectToRow(headers: string[], obj: RowMap): string[] {
  return headers.map((h) => {
    const v = obj[h];
    if (v === undefined || v === null) return "";
    return String(v);
  });
}

function parseBool(v: string | boolean | undefined): boolean {
  if (typeof v === "boolean") return v;
  if (!v) return false;
  return v === "TRUE" || v === "true" || v === "1" || v === "VRAI";
}

function serializeBool(v: boolean | string | undefined): string {
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  return parseBool(v) ? "TRUE" : "FALSE";
}

// Simple in-memory cache for reference sheets
type CacheEntry<T> = { data: T[]; expiry: number };
const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL_MS = 30_000;
const CACHED_SHEETS: SheetName[] = ["Poles", "Lieux", "Categories"];

function clearCache(sheet?: SheetName) {
  if (sheet) cache.delete(sheet);
  else cache.clear();
}

async function fetchSheetRows(
  sheet: SheetName
): Promise<{ headers: string[]; rows: string[][] }> {
  const sheets = getSheets();
  const range = `${sheet}!A1:Z`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range,
  });
  const values = res.data.values ?? [];
  if (values.length === 0) {
    return { headers: SHEET_HEADERS[sheet], rows: [] };
  }
  const [headers, ...rows] = values as string[][];
  return { headers, rows };
}

async function getAllRaw(sheet: SheetName): Promise<RowMap[]> {
  if (CACHED_SHEETS.includes(sheet)) {
    const cached = cache.get(sheet) as CacheEntry<RowMap> | undefined;
    if (cached && cached.expiry > Date.now()) return cached.data;
  }
  const { headers, rows } = await fetchSheetRows(sheet);
  const data = rows
    .filter((r) => r.length > 0 && (r[0] ?? "").trim() !== "")
    .map((r) => rowToObject(headers, r));
  if (CACHED_SHEETS.includes(sheet)) {
    cache.set(sheet, { data, expiry: Date.now() + CACHE_TTL_MS });
  }
  return data;
}

async function findRowIndex(
  sheet: SheetName,
  id: string
): Promise<{ index: number; headers: string[] } | null> {
  const { headers, rows } = await fetchSheetRows(sheet);
  const idCol = headers.indexOf("id");
  if (idCol < 0) return null;
  const idx = rows.findIndex((r) => r[idCol] === id);
  if (idx < 0) return null;
  // sheet rows are 1-indexed, header takes row 1, so data row = idx + 2
  return { index: idx + 2, headers };
}

function castEquipement(r: RowMap): Equipement {
  const q = parseInt(r.quantite, 10);
  return {
    id: r.id,
    nom: r.nom,
    quantite: Number.isFinite(q) && q > 0 ? q : 1,
    categorie: r.categorie,
    pole: r.pole,
    responsable: r.responsable,
    lieu_stockage: r.lieu_stockage,
    detenu_par: r.detenu_par,
    etat: r.etat,
    notes: r.notes,
    date_creation: r.date_creation,
    derniere_modif: r.derniere_modif,
  };
}

function castPole(r: RowMap): Pole {
  return {
    id: r.id,
    nom: r.nom,
    responsable: r.responsable,
    actif: parseBool(r.actif),
  };
}

function castLieu(r: RowMap): Lieu {
  return {
    id: r.id,
    nom: r.nom,
    adresse: r.adresse,
    actif: parseBool(r.actif),
  };
}

function castCategorie(r: RowMap): Categorie {
  return { id: r.id, nom: r.nom, actif: parseBool(r.actif) };
}

function castUtilisateur(r: RowMap): Utilisateur {
  return {
    id: r.id,
    email: r.email,
    nom: r.nom,
    mot_de_passe: r.mot_de_passe,
    role: (r.role as Utilisateur["role"]) || "lecteur",
    pole_rattache: r.pole_rattache,
    actif: parseBool(r.actif),
  };
}

const CASTERS = {
  Equipements: castEquipement,
  Poles: castPole,
  Lieux: castLieu,
  Categories: castCategorie,
  Utilisateurs: castUtilisateur,
} as const;

function serializeRow(sheet: SheetName, data: Record<string, unknown>): RowMap {
  const out: RowMap = {};
  for (const h of SHEET_HEADERS[sheet]) {
    const v = (data as Record<string, unknown>)[h];
    if (h === "actif") {
      out[h] = serializeBool(v as boolean | string | undefined);
    } else if (v === undefined || v === null) {
      out[h] = "";
    } else {
      out[h] = String(v);
    }
  }
  return out;
}

// Public API ---------------------------------------------------------------

export async function getAll(sheet: "Equipements"): Promise<Equipement[]>;
export async function getAll(sheet: "Poles"): Promise<Pole[]>;
export async function getAll(sheet: "Lieux"): Promise<Lieu[]>;
export async function getAll(sheet: "Categories"): Promise<Categorie[]>;
export async function getAll(sheet: "Utilisateurs"): Promise<Utilisateur[]>;
export async function getAll(sheet: SheetName): Promise<unknown[]> {
  const rows = await getAllRaw(sheet);
  const cast = CASTERS[sheet] as (r: RowMap) => unknown;
  return rows.map(cast);
}

export async function getById(
  sheet: "Equipements",
  id: string
): Promise<Equipement | null>;
export async function getById(sheet: "Poles", id: string): Promise<Pole | null>;
export async function getById(sheet: "Lieux", id: string): Promise<Lieu | null>;
export async function getById(
  sheet: "Categories",
  id: string
): Promise<Categorie | null>;
export async function getById(
  sheet: "Utilisateurs",
  id: string
): Promise<Utilisateur | null>;
export async function getById(
  sheet: SheetName,
  id: string
): Promise<unknown | null> {
  const all = await getAllRaw(sheet);
  const row = all.find((r) => r.id === id);
  if (!row) return null;
  const cast = CASTERS[sheet] as (r: RowMap) => unknown;
  return cast(row);
}

export async function findUserByEmail(
  email: string
): Promise<Utilisateur | null> {
  const all = await getAllRaw("Utilisateurs");
  const row = all.find(
    (r) => (r.email || "").trim().toLowerCase() === email.trim().toLowerCase()
  );
  return row ? castUtilisateur(row) : null;
}

export async function create(
  sheet: SheetName,
  data: Record<string, unknown>
): Promise<{ id: string }> {
  const sheets = getSheets();
  const id = (data.id as string) || uuidv4();
  const now = new Date().toISOString();
  const merged: Record<string, unknown> = { ...data, id };
  if (sheet === "Equipements") {
    merged.date_creation = (data.date_creation as string) || now;
    merged.derniere_modif = now;
  }
  const headers = SHEET_HEADERS[sheet];
  const row = objectToRow(headers, serializeRow(sheet, merged));
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: `${sheet}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
  clearCache(sheet);
  return { id };
}

export async function update(
  sheet: SheetName,
  id: string,
  data: Record<string, unknown>
): Promise<boolean> {
  const sheets = getSheets();
  const found = await findRowIndex(sheet, id);
  if (!found) return false;
  const { index, headers } = found;
  // Read existing row to merge
  const range = `${sheet}!A${index}:Z${index}`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range,
  });
  const existingRow = res.data.values?.[0] ?? [];
  const existing = rowToObject(headers, existingRow);
  const merged: Record<string, unknown> = { ...existing, ...data, id };
  if (sheet === "Equipements") {
    merged.derniere_modif = new Date().toISOString();
  }
  const newRow = objectToRow(headers, serializeRow(sheet, merged));
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSpreadsheetId(),
    range: `${sheet}!A${index}`,
    valueInputOption: "RAW",
    requestBody: { values: [newRow] },
  });
  clearCache(sheet);
  return true;
}

async function getSheetIdByName(name: SheetName): Promise<number> {
  const sheets = getSheets();
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: getSpreadsheetId(),
  });
  const found = meta.data.sheets?.find((s) => s.properties?.title === name);
  if (!found?.properties?.sheetId && found?.properties?.sheetId !== 0) {
    throw new Error(`Sheet ${name} not found`);
  }
  return found.properties.sheetId as number;
}

export async function remove(sheet: SheetName, id: string): Promise<boolean> {
  const sheets = getSheets();
  const found = await findRowIndex(sheet, id);
  if (!found) return false;
  const { index } = found;
  const sheetId = await getSheetIdByName(sheet);
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: getSpreadsheetId(),
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: index - 1,
              endIndex: index,
            },
          },
        },
      ],
    },
  });
  clearCache(sheet);
  return true;
}

export async function ensureSheetsExist(): Promise<void> {
  const sheets = getSheets();
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: getSpreadsheetId(),
  });
  const existing = new Set(
    (meta.data.sheets || [])
      .map((s) => s.properties?.title)
      .filter(Boolean) as string[]
  );
  const requests: sheets_v4.Schema$Request[] = [];
  const sheetNames: SheetName[] = [
    "Equipements",
    "Poles",
    "Lieux",
    "Categories",
    "Utilisateurs",
  ];
  for (const name of sheetNames) {
    if (!existing.has(name)) {
      requests.push({ addSheet: { properties: { title: name } } });
    }
  }
  if (requests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: getSpreadsheetId(),
      requestBody: { requests },
    });
  }
  // Ensure each sheet has its header row
  for (const name of sheetNames) {
    const headers = SHEET_HEADERS[name];
    const range = `${name}!A1:Z1`;
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: getSpreadsheetId(),
      range,
    });
    const current = res.data.values?.[0] ?? [];
    const needsWrite =
      current.length !== headers.length ||
      headers.some((h, i) => current[i] !== h);
    if (needsWrite) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: getSpreadsheetId(),
        range: `${name}!A1`,
        valueInputOption: "RAW",
        requestBody: { values: [headers] },
      });
    }
  }
}

export { clearCache };
