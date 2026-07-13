"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Modal } from "@/components/ui/Modal";
import { EtatBadge } from "@/components/ui/EtatBadge";
import type { Equipement, Pole, Lieu, Categorie } from "@/types";
import type { SessionUser } from "@/lib/permissions";

const ETATS = ["Bon", "À vérifier", "Hors service"];

interface FormState {
  nom: string;
  quantite: string;
  categorie: string;
  pole: string;
  responsable: string;
  lieu_stockage: string;
  detenu_par: string;
  etat: string;
  notes: string;
}

const empty: FormState = {
  nom: "",
  quantite: "1",
  categorie: "",
  pole: "",
  responsable: "",
  lieu_stockage: "",
  detenu_par: "",
  etat: "Bon",
  notes: "",
};

function canEdit(user: SessionUser | null, poleId: string): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "responsable_pole") {
    return !!user.pole_rattache && user.pole_rattache === poleId;
  }
  return false;
}

export function EquipementModal({
  open,
  onClose,
  equipement,
  user,
  onSaved,
  onDeleted,
  initialEdit = false,
}: {
  open: boolean;
  onClose: () => void;
  equipement: Equipement | null;
  user: SessionUser | null;
  onSaved: () => void;
  onDeleted?: () => void;
  initialEdit?: boolean;
}) {
  const isCreate = !equipement;
  const [editing, setEditing] = useState(isCreate || initialEdit);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: polesData } = useSWR<{ poles: Pole[] }>(
    open ? "/api/poles" : null
  );
  const { data: lieuxData } = useSWR<{ lieux: Lieu[] }>(
    open ? "/api/lieux" : null
  );
  const { data: catsData } = useSWR<{ categories: Categorie[] }>(
    open ? "/api/categories" : null
  );

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (equipement) {
      setForm({
        nom: equipement.nom,
        quantite: String(equipement.quantite ?? 1),
        categorie: equipement.categorie,
        pole: equipement.pole,
        responsable: equipement.responsable,
        lieu_stockage: equipement.lieu_stockage,
        detenu_par: equipement.detenu_par,
        etat: equipement.etat || "Bon",
        notes: equipement.notes,
      });
      setEditing(initialEdit);
    } else {
      const next = { ...empty };
      if (user?.role === "responsable_pole" && user.pole_rattache) {
        next.pole = user.pole_rattache;
      }
      setForm(next);
      setEditing(true);
    }
  }, [open, equipement, initialEdit, user]);

  const poles = (polesData?.poles || []).filter((p) => p.actif);
  const lieux = (lieuxData?.lieux || []).filter((l) => l.actif);
  const categories = (catsData?.categories || []).filter((c) => c.actif);

  const polesAllowedForCreate =
    user?.role === "responsable_pole"
      ? poles.filter((p) => p.id === user.pole_rattache)
      : poles;

  const editable = isCreate
    ? user?.role === "admin" || user?.role === "responsable_pole"
    : canEdit(user, equipement!.pole);

  const isAdmin = user?.role === "admin";

  const setField = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const url = isCreate
        ? "/api/equipements"
        : `/api/equipements/${equipement!.id}`;
      const method = isCreate ? "POST" : "PUT";
      const payload = {
        ...form,
        quantite: Math.max(1, parseInt(form.quantite, 10) || 1),
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Erreur d'enregistrement");
      }
      onSaved();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function doDelete() {
    if (!equipement) return;
    if (!confirm(`Supprimer définitivement « ${equipement.nom} » ?`)) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/equipements/${equipement.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Erreur de suppression");
      }
      onDeleted?.();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  const poleName = (id: string) =>
    poles.find((p) => p.id === id)?.nom || id;
  const lieuName = (id: string) =>
    lieux.find((l) => l.id === id)?.nom || id;
  const catName = (id: string) =>
    categories.find((c) => c.id === id)?.nom || id;

  const title = isCreate
    ? "Ajouter un équipement"
    : editing
      ? "Modifier l'équipement"
      : equipement!.nom;

  const footer = (
    <>
      {error && (
        <div className="mr-auto text-sm text-burgundy">{error}</div>
      )}
      {!isCreate && !editing && editable && (
        <button onClick={() => setEditing(true)} className="btn-secondary">
          Modifier
        </button>
      )}
      {!isCreate && isAdmin && (
        <button onClick={doDelete} disabled={saving} className="btn-danger">
          Supprimer
        </button>
      )}
      {(isCreate || editing) && (
        <>
          <button
            onClick={onClose}
            disabled={saving}
            className="btn-secondary"
          >
            Annuler
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary"
          >
            {saving ? "..." : "Enregistrer"}
          </button>
        </>
      )}
      {!isCreate && !editing && !editable && (
        <button onClick={onClose} className="btn-secondary">
          Fermer
        </button>
      )}
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={title} footer={footer}>
      {!editing && equipement ? (
        <div className="space-y-4">
          <Detail label="Quantité" value={String(equipement.quantite ?? 1)} />
          <Detail label="Catégorie" value={catName(equipement.categorie)} />
          <Detail label="Pôle" value={poleName(equipement.pole)} />
          <Detail label="Responsable" value={equipement.responsable || "—"} />
          <Detail
            label="Lieu de stockage"
            value={lieuName(equipement.lieu_stockage)}
          />
          <Detail
            label="Détenu par"
            value={equipement.detenu_par || "Au lieu de stockage"}
          />
          <div>
            <div className="label">État</div>
            <EtatBadge etat={equipement.etat} />
          </div>
          {equipement.notes && (
            <Detail label="Notes" value={equipement.notes} multiline />
          )}
          <div className="text-xs text-ink/40 pt-2 border-t border-ink/10">
            Créé : {fmt(equipement.date_creation)}
            {equipement.derniere_modif &&
              ` · Modifié : ${fmt(equipement.derniere_modif)}`}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="label">Nom *</label>
            <input
              className="input"
              value={form.nom}
              onChange={(e) => setField("nom", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Quantité *</label>
            <input
              type="number"
              min={1}
              step={1}
              className="input"
              value={form.quantite}
              onChange={(e) => setField("quantite", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Catégorie *</label>
            <select
              className="input"
              value={form.categorie}
              onChange={(e) => setField("categorie", e.target.value)}
            >
              <option value="">— Choisir —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Pôle *</label>
            <select
              className="input"
              value={form.pole}
              onChange={(e) => setField("pole", e.target.value)}
              disabled={
                user?.role === "responsable_pole" && !isAdmin && isCreate
              }
            >
              <option value="">— Choisir —</option>
              {(isCreate ? polesAllowedForCreate : poles).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Responsable</label>
            <input
              className="input"
              value={form.responsable}
              onChange={(e) => setField("responsable", e.target.value)}
              placeholder="Prénom Nom"
            />
          </div>
          <div>
            <label className="label">Lieu de stockage *</label>
            <select
              className="input"
              value={form.lieu_stockage}
              onChange={(e) => setField("lieu_stockage", e.target.value)}
            >
              <option value="">— Choisir —</option>
              {lieux.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Détenu par</label>
            <input
              className="input"
              value={form.detenu_par}
              onChange={(e) => setField("detenu_par", e.target.value)}
              placeholder="Vide = au lieu de stockage"
            />
          </div>
          <div>
            <label className="label">État</label>
            <select
              className="input"
              value={form.etat}
              onChange={(e) => setField("etat", e.target.value)}
            >
              {ETATS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="label">Notes</label>
            <textarea
              className="input min-h-[100px]"
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}

function Detail({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="label">{label}</div>
      <div
        className={`text-ink ${multiline ? "whitespace-pre-wrap" : ""}`}
      >
        {value || "—"}
      </div>
    </div>
  );
}

function fmt(iso: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
