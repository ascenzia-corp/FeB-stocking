import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAll, create, findUserByEmail } from "@/lib/sheets";
import { getSessionUser, isAdmin } from "@/lib/permissions";
import { utilisateurCreateSchema } from "@/lib/validation";
import type { Utilisateur } from "@/types";

export const dynamic = "force-dynamic";

function sanitize(u: Utilisateur) {
  const { mot_de_passe, ...rest } = u;
  void mot_de_passe;
  return rest;
}

export async function GET() {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const utilisateurs = await getAll("Utilisateurs");
  return NextResponse.json({ utilisateurs: utilisateurs.map(sanitize) });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const parsed = utilisateurCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;
  if (data.role === "responsable_pole" && !data.pole_rattache) {
    return NextResponse.json(
      { error: "Pôle requis pour un responsable de pôle" },
      { status: 400 }
    );
  }
  const existing = await findUserByEmail(data.email);
  if (existing) {
    return NextResponse.json(
      { error: "Email déjà utilisé" },
      { status: 409 }
    );
  }
  const hash = data.mot_de_passe
    ? await bcrypt.hash(data.mot_de_passe, 12)
    : "";
  const { id } = await create("Utilisateurs", {
    email: data.email,
    nom: data.nom,
    mot_de_passe: hash,
    role: data.role,
    pole_rattache: data.pole_rattache || "",
    actif: data.actif,
  });
  return NextResponse.json({ id }, { status: 201 });
}
