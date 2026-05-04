"use client";

import { useState } from "react";
import useSWR from "swr";
import { Modal } from "@/components/ui/Modal";
import type { Lieu } from "@/types";

interface FormState {
  nom: string;
  adresse: string;
  actif: boolean;
}

const empty: FormState = { nom: "", adresse: "", actif: true };

export default function LieuxAdminPage() {
  const { data, mutate } = useSWR<{ lieux: Lieu[] }>("/api/lieux");
  const lieux = data?.lieux || [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lieu | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setError(null);
    setOpen(true);
  };
  const openEdit = (l: Lieu) => {
    setEditing(l);
    setForm({ nom: l.nom, adresse: l.adresse, actif: l.actif });
    setError(null);
    setOpen(true);
  };

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const url = editing ? `/api/lieux/${editing.id}` : "/api/lieux";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Erreur");
      }
      await mutate();
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActif(l: Lieu) {
    await fetch(`/api/lieux/${l.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: !l.actif }),
    });
    await mutate();
  }

  return (
    <div>
      <div className="flex items-end gap-3 mb-4">
        <h1 className="font-serif text-2xl md:text-3xl text-ink">Lieux</h1>
        <div className="flex-1" />
        <button onClick={openCreate} className="btn-primary">+ Ajouter</button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink/5 border-b border-ink/10 text-left">
            <tr>
              <th className="px-3 py-2 font-medium text-ink/70">Nom</th>
              <th className="px-3 py-2 font-medium text-ink/70">Adresse</th>
              <th className="px-3 py-2 font-medium text-ink/70">Statut</th>
              <th className="px-3 py-2 font-medium text-ink/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lieux.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink/40">
                  Aucun lieu
                </td>
              </tr>
            ) : (
              lieux.map((l) => (
                <tr key={l.id} className="border-b border-ink/5">
                  <td className="px-3 py-2 font-medium text-ink">{l.nom}</td>
                  <td className="px-3 py-2 text-ink/80">{l.adresse || "—"}</td>
                  <td className="px-3 py-2">
                    {l.actif ? (
                      <span className="badge bg-emerald-50 text-emerald-700">Actif</span>
                    ) : (
                      <span className="badge bg-ink/10 text-ink/60">Archivé</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button onClick={() => openEdit(l)} className="text-sm text-gold-dark hover:underline">
                      Modifier
                    </button>
                    <button onClick={() => toggleActif(l)} className="text-sm text-ink/60 hover:underline">
                      {l.actif ? "Archiver" : "Réactiver"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Modifier le lieu" : "Ajouter un lieu"}
        footer={
          <>
            {error && <div className="mr-auto text-sm text-burgundy">{error}</div>}
            <button onClick={() => setOpen(false)} className="btn-secondary" disabled={saving}>Annuler</button>
            <button onClick={save} className="btn-primary" disabled={saving}>
              {saving ? "..." : "Enregistrer"}
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="label">Nom *</label>
            <input
              className="input"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Adresse</label>
            <textarea
              className="input min-h-[80px]"
              value={form.adresse}
              onChange={(e) => setForm({ ...form, adresse: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.actif}
              onChange={(e) => setForm({ ...form, actif: e.target.checked })}
              className="accent-gold"
            />
            Actif
          </label>
        </div>
      </Modal>
    </div>
  );
}
