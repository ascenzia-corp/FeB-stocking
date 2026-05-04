"use client";

import { useState } from "react";
import useSWR from "swr";
import { Modal } from "@/components/ui/Modal";
import type { Utilisateur, Pole, Role } from "@/types";

interface FormState {
  email: string;
  nom: string;
  mot_de_passe: string;
  role: Role;
  pole_rattache: string;
  actif: boolean;
}

const empty: FormState = {
  email: "",
  nom: "",
  mot_de_passe: "",
  role: "lecteur",
  pole_rattache: "",
  actif: true,
};

const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrateur",
  responsable_pole: "Responsable de pôle",
  lecteur: "Lecteur",
};

export default function UtilisateursAdminPage() {
  const { data, mutate } = useSWR<{ utilisateurs: Utilisateur[] }>(
    "/api/utilisateurs"
  );
  const { data: polesData } = useSWR<{ poles: Pole[] }>("/api/poles");
  const utilisateurs = data?.utilisateurs || [];
  const poles = polesData?.poles || [];
  const polesActifs = poles.filter((p) => p.actif);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Utilisateur | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setError(null);
    setOpen(true);
  };
  const openEdit = (u: Utilisateur) => {
    setEditing(u);
    setForm({
      email: u.email,
      nom: u.nom,
      mot_de_passe: "",
      role: u.role,
      pole_rattache: u.pole_rattache || "",
      actif: u.actif,
    });
    setError(null);
    setOpen(true);
  };

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const url = editing
        ? `/api/utilisateurs/${editing.id}`
        : "/api/utilisateurs";
      const method = editing ? "PUT" : "POST";
      const payload: Record<string, unknown> = { ...form };
      if (editing && !payload.mot_de_passe) {
        delete payload.mot_de_passe;
      }
      if (form.role !== "responsable_pole") {
        payload.pole_rattache = "";
      }
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  async function toggleActif(u: Utilisateur) {
    await fetch(`/api/utilisateurs/${u.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: !u.actif }),
    });
    await mutate();
  }

  const poleName = (id: string) => poles.find((p) => p.id === id)?.nom || "—";

  return (
    <div>
      <div className="flex items-end gap-3 mb-4">
        <h1 className="font-serif text-2xl md:text-3xl text-ink">Utilisateurs</h1>
        <div className="flex-1" />
        <button onClick={openCreate} className="btn-primary">+ Ajouter</button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink/5 border-b border-ink/10 text-left">
            <tr>
              <th className="px-3 py-2 font-medium text-ink/70">Nom</th>
              <th className="px-3 py-2 font-medium text-ink/70">Email</th>
              <th className="px-3 py-2 font-medium text-ink/70">Rôle</th>
              <th className="px-3 py-2 font-medium text-ink/70">Pôle rattaché</th>
              <th className="px-3 py-2 font-medium text-ink/70">Statut</th>
              <th className="px-3 py-2 font-medium text-ink/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink/40">
                  Aucun utilisateur
                </td>
              </tr>
            ) : (
              utilisateurs.map((u) => (
                <tr key={u.id} className="border-b border-ink/5">
                  <td className="px-3 py-2 font-medium text-ink">{u.nom}</td>
                  <td className="px-3 py-2 text-ink/80">{u.email}</td>
                  <td className="px-3 py-2 text-ink/80">{ROLE_LABELS[u.role]}</td>
                  <td className="px-3 py-2 text-ink/80">
                    {u.role === "responsable_pole" ? poleName(u.pole_rattache) : "—"}
                  </td>
                  <td className="px-3 py-2">
                    {u.actif ? (
                      <span className="badge bg-emerald-50 text-emerald-700">Actif</span>
                    ) : (
                      <span className="badge bg-ink/10 text-ink/60">Désactivé</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button onClick={() => openEdit(u)} className="text-sm text-gold-dark hover:underline">
                      Modifier
                    </button>
                    <button onClick={() => toggleActif(u)} className="text-sm text-ink/60 hover:underline">
                      {u.actif ? "Désactiver" : "Réactiver"}
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
        title={editing ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
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
            <label className="label">Email *</label>
            <input
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={!!editing}
            />
          </div>
          <div>
            <label className="label">Nom complet *</label>
            <input
              className="input"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
            />
          </div>
          <div>
            <label className="label">
              {editing ? "Nouveau mot de passe (laisser vide pour conserver)" : "Mot de passe initial"}
            </label>
            <input
              type="password"
              className="input"
              value={form.mot_de_passe}
              onChange={(e) => setForm({ ...form, mot_de_passe: e.target.value })}
              placeholder={editing ? "(inchangé)" : "Min. 8 caractères"}
            />
            <p className="text-xs text-ink/50 mt-1">
              Laisser vide si l&apos;utilisateur se connecte uniquement via Google.
            </p>
          </div>
          <div>
            <label className="label">Rôle *</label>
            <select
              className="input"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as Role })
              }
            >
              <option value="lecteur">Lecteur</option>
              <option value="responsable_pole">Responsable de pôle</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          {form.role === "responsable_pole" && (
            <div>
              <label className="label">Pôle rattaché *</label>
              <select
                className="input"
                value={form.pole_rattache}
                onChange={(e) =>
                  setForm({ ...form, pole_rattache: e.target.value })
                }
              >
                <option value="">— Choisir —</option>
                {polesActifs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nom}
                  </option>
                ))}
              </select>
            </div>
          )}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.actif}
              onChange={(e) => setForm({ ...form, actif: e.target.checked })}
              className="accent-gold"
            />
            Compte actif
          </label>
        </div>
      </Modal>
    </div>
  );
}
