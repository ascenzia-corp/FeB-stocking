"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { EtatBadge } from "@/components/ui/EtatBadge";
import { EquipementModal } from "@/components/equipements/EquipementModal";
import type {
  Equipement,
  Pole,
  Lieu,
  Categorie,
} from "@/types";
import type { SessionUser } from "@/lib/permissions";

type SortKey =
  | "nom"
  | "categorie"
  | "pole"
  | "responsable"
  | "lieu_stockage"
  | "detenu_par"
  | "etat";

const ETATS = ["Bon", "À vérifier", "Hors service"];

export function InventoryView() {
  const { data: session } = useSession();
  const sessionUser: SessionUser | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        pole_rattache: session.user.pole_rattache || "",
      }
    : null;

  const { data: equipementsData, mutate } = useSWR<{
    equipements: Equipement[];
  }>("/api/equipements");
  const { data: polesData } = useSWR<{ poles: Pole[] }>("/api/poles");
  const { data: lieuxData } = useSWR<{ lieux: Lieu[] }>("/api/lieux");
  const { data: catsData } = useSWR<{ categories: Categorie[] }>(
    "/api/categories"
  );

  const equipements = equipementsData?.equipements || [];
  const poles = polesData?.poles || [];
  const lieux = lieuxData?.lieux || [];
  const categories = catsData?.categories || [];

  const [search, setSearch] = useState("");
  const [filterPoles, setFilterPoles] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [filterLieux, setFilterLieux] = useState<string[]>([]);
  const [filterEtats, setFilterEtats] = useState<string[]>([]);
  const [sortiOnly, setSortiOnly] = useState(false);

  const [sortKey, setSortKey] = useState<SortKey>("nom");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalEquip, setModalEquip] = useState<Equipement | null>(null);
  const [modalEdit, setModalEdit] = useState(false);

  const poleMap = useMemo(
    () => Object.fromEntries(poles.map((p) => [p.id, p.nom])),
    [poles]
  );
  const lieuMap = useMemo(
    () => Object.fromEntries(lieux.map((l) => [l.id, l.nom])),
    [lieux]
  );
  const catMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.nom])),
    [categories]
  );

  const enriched = useMemo(() => {
    return equipements.map((e) => ({
      ...e,
      pole_nom: poleMap[e.pole] || e.pole,
      lieu_nom: lieuMap[e.lieu_stockage] || e.lieu_stockage,
      categorie_nom: catMap[e.categorie] || e.categorie,
    }));
  }, [equipements, poleMap, lieuMap, catMap]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = enriched;
    if (q) {
      result = result.filter((e) => {
        const haystack = [
          e.nom,
          e.categorie_nom,
          e.pole_nom,
          e.responsable,
          e.lieu_nom,
          e.detenu_par,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    if (filterPoles.length > 0) {
      result = result.filter((e) => filterPoles.includes(e.pole));
    }
    if (filterCategories.length > 0) {
      result = result.filter((e) => filterCategories.includes(e.categorie));
    }
    if (filterLieux.length > 0) {
      result = result.filter((e) => filterLieux.includes(e.lieu_stockage));
    }
    if (filterEtats.length > 0) {
      result = result.filter((e) => filterEtats.includes(e.etat));
    }
    if (sortiOnly) {
      result = result.filter((e) => e.detenu_par && e.detenu_par.trim() !== "");
    }
    return result;
  }, [
    enriched,
    search,
    filterPoles,
    filterCategories,
    filterLieux,
    filterEtats,
    sortiOnly,
  ]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const canCreate =
    sessionUser?.role === "admin" || sessionUser?.role === "responsable_pole";

  const openCreate = () => {
    setModalEquip(null);
    setModalEdit(true);
    setModalOpen(true);
  };

  const openRow = (e: Equipement) => {
    setModalEquip(e);
    setModalEdit(false);
    setModalOpen(true);
  };

  const reset = () => {
    setSearch("");
    setFilterPoles([]);
    setFilterCategories([]);
    setFilterLieux([]);
    setFilterEtats([]);
    setSortiOnly(false);
  };

  const hasFilters =
    !!search ||
    filterPoles.length > 0 ||
    filterCategories.length > 0 ||
    filterLieux.length > 0 ||
    filterEtats.length > 0 ||
    sortiOnly;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-ink">Inventaire</h1>
          <p className="text-sm text-ink/50">
            {sorted.length} équipement{sorted.length > 1 ? "s" : ""}
            {hasFilters && ` sur ${equipements.length}`}
          </p>
        </div>
        <div className="flex-1" />
        {canCreate && (
          <button onClick={openCreate} className="btn-primary">
            + Ajouter un équipement
          </button>
        )}
      </div>

      <div className="card p-4 mb-4">
        <div className="mb-3">
          <input
            type="search"
            placeholder="Rechercher (nom, catégorie, pôle, responsable, lieu, détenteur)..."
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MultiSelect
            label="Pôle"
            options={poles.map((p) => ({ value: p.id, label: p.nom }))}
            selected={filterPoles}
            onChange={setFilterPoles}
          />
          <MultiSelect
            label="Catégorie"
            options={categories.map((c) => ({ value: c.id, label: c.nom }))}
            selected={filterCategories}
            onChange={setFilterCategories}
          />
          <MultiSelect
            label="Lieu de stockage"
            options={lieux.map((l) => ({ value: l.id, label: l.nom }))}
            selected={filterLieux}
            onChange={setFilterLieux}
          />
          <MultiSelect
            label="État"
            options={ETATS.map((e) => ({ value: e, label: e }))}
            selected={filterEtats}
            onChange={setFilterEtats}
          />
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink/10">
          <label className="flex items-center gap-2 text-sm text-ink/80">
            <input
              type="checkbox"
              className="accent-gold"
              checked={sortiOnly}
              onChange={(e) => setSortiOnly(e.target.checked)}
            />
            Actuellement sorti
          </label>
          {hasFilters && (
            <button onClick={reset} className="text-sm text-ink/60 hover:text-ink underline">
              Effacer les filtres
            </button>
          )}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink/5 border-b border-ink/10">
            <tr className="text-left">
              <Th onClick={() => toggleSort("nom")} sorted={sortKey === "nom" ? sortDir : undefined}>
                Nom
              </Th>
              <Th onClick={() => toggleSort("categorie")} sorted={sortKey === "categorie" ? sortDir : undefined}>
                Catégorie
              </Th>
              <Th onClick={() => toggleSort("pole")} sorted={sortKey === "pole" ? sortDir : undefined}>
                Pôle
              </Th>
              <Th onClick={() => toggleSort("responsable")} sorted={sortKey === "responsable" ? sortDir : undefined}>
                Responsable
              </Th>
              <Th onClick={() => toggleSort("lieu_stockage")} sorted={sortKey === "lieu_stockage" ? sortDir : undefined}>
                Lieu
              </Th>
              <Th onClick={() => toggleSort("detenu_par")} sorted={sortKey === "detenu_par" ? sortDir : undefined}>
                Détenu par
              </Th>
              <Th onClick={() => toggleSort("etat")} sorted={sortKey === "etat" ? sortDir : undefined}>
                État
              </Th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink/40">
                  Aucun équipement trouvé
                </td>
              </tr>
            ) : (
              sorted.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => openRow(e)}
                  className="border-b border-ink/5 hover:bg-gold/5 cursor-pointer"
                >
                  <td className="px-3 py-2 font-medium text-ink">{e.nom}</td>
                  <td className="px-3 py-2 text-ink/80">{e.categorie_nom}</td>
                  <td className="px-3 py-2 text-ink/80">{e.pole_nom}</td>
                  <td className="px-3 py-2 text-ink/80">{e.responsable || "—"}</td>
                  <td className="px-3 py-2 text-ink/80">{e.lieu_nom}</td>
                  <td className="px-3 py-2">
                    {e.detenu_par ? (
                      <span className="badge bg-burgundy/10 text-burgundy">{e.detenu_par}</span>
                    ) : (
                      <span className="text-ink/40">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <EtatBadge etat={e.etat} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {sorted.length === 0 ? (
          <div className="card p-6 text-center text-ink/40">
            Aucun équipement trouvé
          </div>
        ) : (
          sorted.map((e) => (
            <button
              key={e.id}
              onClick={() => openRow(e)}
              className="card p-3 w-full text-left hover:bg-gold/5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium text-ink">{e.nom}</div>
                <EtatBadge etat={e.etat} />
              </div>
              <div className="text-xs text-ink/60 mt-1">
                {e.categorie_nom} · {e.pole_nom}
              </div>
              <div className="text-xs text-ink/60 mt-1">
                Lieu : {e.lieu_nom}
              </div>
              {e.detenu_par && (
                <div className="text-xs text-burgundy mt-1">
                  Détenu par : {e.detenu_par}
                </div>
              )}
            </button>
          ))
        )}
      </div>

      <EquipementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        equipement={modalEquip}
        user={sessionUser}
        onSaved={() => mutate()}
        onDeleted={() => mutate()}
        initialEdit={modalEdit}
      />
    </div>
  );
}

function Th({
  children,
  onClick,
  sorted,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  sorted?: "asc" | "desc";
}) {
  return (
    <th className="px-3 py-2 font-medium text-ink/70 select-none">
      <button
        onClick={onClick}
        className="flex items-center gap-1 hover:text-ink"
      >
        {children}
        {sorted && (
          <span className="text-ink/40 text-xs">
            {sorted === "asc" ? "▲" : "▼"}
          </span>
        )}
      </button>
    </th>
  );
}

function sortValue(
  e: Equipement & { pole_nom: string; lieu_nom: string; categorie_nom: string },
  key: SortKey
): string {
  switch (key) {
    case "nom":
      return e.nom.toLowerCase();
    case "categorie":
      return e.categorie_nom.toLowerCase();
    case "pole":
      return e.pole_nom.toLowerCase();
    case "responsable":
      return (e.responsable || "").toLowerCase();
    case "lieu_stockage":
      return e.lieu_nom.toLowerCase();
    case "detenu_par":
      return (e.detenu_par || "").toLowerCase();
    case "etat":
      return e.etat || "";
  }
}
