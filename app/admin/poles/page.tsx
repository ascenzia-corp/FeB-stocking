"use client";

import { useState } from "react";
import useSWR from "swr";
import { Modal } from "@/components/ui/Modal";
import type { Pole } from "@/types";

interface FormState {
  nom: string;
  responsable: string;
  actif: boolean;
}

const empty: FormState = { nom: "", responsable: "", actif: true };

export default function PolesAdminPage() {
  const { data, mutate } = useSWR<{ poles: Pole[] }>("/api/poles");
  const poles = data?.poles || [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pole | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setError(null);
    setOpen(true);
  };
  const openEdit = (p: Pole) => {
    setEditing(p);
    setForm({ nom: p.nom, responsable: p.responsable, actif: p.actif });
    setError(null);
    setOpen(true);
  };

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const url = editing ? `/api/poles/${editing.id}` : "/api/poles";
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

  async function archive(p: Pole) {
    if (!confirm(`Archiver le pôle « ${p.nom} » ?`)) return;
    await fetch(`/api/poles/${p.id}`, { method: "DELETE" });
    await mutate();
  }

  async function toggleActif(p: Pole) {
    await fetch(`/api/poles/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: !p.actif }),
    });
    await mutate();
  }

  return (
    <div>
      <div className="flex items-end gap-3 mb-4">
        <h1 className="font-serif text-2xl md:text-3xl text-ink">Pôles</h1>
        <div className="flex-1" />
        <button onClick={openCreate} className="btn-primary">
          + Ajouter
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink/5 border-b border-ink/10 text-left">
            <tr>
              <th className="px-3 py-2 font-medium text-ink/70">Nom</th>
              <th className="px-3 py-2 font-medium text-ink/70">Responsable</th>
              <th className="px-3 py-2 font-medium text-ink/70">Statut</th>
              <th className="px-3 py-2 font-medium text-ink/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {poles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink/40">
                  Aucun pôle
                </td>
              </tr>
            ) : (
              poles.map((p) => (
                <tr key={p.id} className="border-b border-ink/5">
                  <td className="px-3 py-2 font-medium text-ink">{p.nom}</td>
                  <td className="px-3 py-2 text-ink/80">{p.responsable || "—"}</td>
                  <td className="px-3 py-2">
                    {p.actif ? (
                      <span className="badge bg-emerald-50 text-emerald-700">Actif</span>
                    ) : (
                      <span className="badge bg-ink/10 text-ink/60">Archivé</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="text-sm text-gold-dark hover:underline">
                      Modifier
                    </button>
                    <button onClick={() => toggleActif(p)} className="text-sm text-ink/60 hover:underline">
                      {p.actif ? "Archiver" : "Réactiver"}
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
        title={editing ? "Modifier le pôle" : "Ajouter un pôle"}
        footer={
          <>
            {error && <div className="mr-auto text-sm text-burgundy">{error}</div>}
            <button onClick={() => setOpen(false)} className="btn-secondary" disabled={saving}>
              Annuler
            </button>
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
            <label className="label">Responsable</label>
            <input
              className="input"
              value={form.responsable}
              onChange={(e) => setForm({ ...form, responsable: e.target.value })}
              placeholder="Prénom Nom"
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
