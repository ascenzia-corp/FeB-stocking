import { z } from "zod";

export const equipementCreateSchema = z.object({
  nom: z.string().min(1, "Nom requis").max(200),
  quantite: z.coerce.number().int().min(1, "Quantité minimum 1").default(1),
  categorie: z.string().min(1, "Catégorie requise"),
  pole: z.string().min(1, "Pôle requis"),
  responsable: z.string().max(200).default(""),
  lieu_stockage: z.string().min(1, "Lieu de stockage requis"),
  detenu_par: z.string().max(200).default(""),
  etat: z.string().default("Bon"),
  notes: z.string().max(2000).default(""),
});

export const equipementUpdateSchema = equipementCreateSchema.partial();

export const poleSchema = z.object({
  nom: z.string().min(1).max(120),
  responsable: z.string().max(200).default(""),
  actif: z.boolean().default(true),
});

export const lieuSchema = z.object({
  nom: z.string().min(1).max(200),
  adresse: z.string().max(500).default(""),
  actif: z.boolean().default(true),
});

export const categorieSchema = z.object({
  nom: z.string().min(1).max(120),
  actif: z.boolean().default(true),
});

export const utilisateurCreateSchema = z.object({
  email: z.string().email(),
  nom: z.string().min(1).max(200),
  mot_de_passe: z.string().min(8).max(200).optional().or(z.literal("")),
  role: z.enum(["admin", "responsable_pole", "lecteur"]),
  pole_rattache: z.string().default(""),
  actif: z.boolean().default(true),
});

export const utilisateurUpdateSchema = z.object({
  email: z.string().email().optional(),
  nom: z.string().min(1).max(200).optional(),
  mot_de_passe: z.string().min(8).max(200).optional().or(z.literal("")),
  role: z.enum(["admin", "responsable_pole", "lecteur"]).optional(),
  pole_rattache: z.string().optional(),
  actif: z.boolean().optional(),
});
