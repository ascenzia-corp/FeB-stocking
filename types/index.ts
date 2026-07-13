export type Role = "admin" | "responsable_pole" | "lecteur";

export type Etat = "Bon" | "À vérifier" | "Hors service";

export interface Equipement {
  id: string;
  nom: string;
  quantite: number;
  categorie: string;
  pole: string;
  responsable: string;
  lieu_stockage: string;
  detenu_par: string;
  etat: Etat | string;
  notes: string;
  date_creation: string;
  derniere_modif: string;
}

export interface Pole {
  id: string;
  nom: string;
  responsable: string;
  actif: boolean;
}

export interface Lieu {
  id: string;
  nom: string;
  adresse: string;
  actif: boolean;
}

export interface Categorie {
  id: string;
  nom: string;
  actif: boolean;
}

export interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  mot_de_passe: string;
  role: Role;
  pole_rattache: string;
  actif: boolean;
}

export type SheetName = "Equipements" | "Poles" | "Lieux" | "Categories" | "Utilisateurs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      pole_rattache: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    pole_rattache: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    pole_rattache: string;
  }
}
