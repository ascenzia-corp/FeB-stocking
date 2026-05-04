# Inventaire Matériel — Feiz e Breizh

Application web de gestion du matériel pour l'association Feiz e Breizh, qui
organise le grand pèlerinage breton vers Sainte-Anne d'Auray.

## Stack

- **Next.js** (App Router) + React + TypeScript + Tailwind CSS
- **Google Sheets** comme base de données (via service account)
- **NextAuth.js** : Google OAuth + Credentials (email/mot de passe)
- Hébergement **Vercel**

## Installation

```bash
npm install
cp .env.example .env.local
# Renseigner les variables d'environnement (cf. plus bas)
npm run init-sheet   # crée les onglets, l'admin et les valeurs par défaut
npm run dev
```

## Variables d'environnement

| Variable | Description |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email du service account Google |
| `GOOGLE_PRIVATE_KEY` | Clé privée du service account (avec `\n` littéraux) |
| `GOOGLE_SPREADSHEET_ID` | ID du Google Spreadsheet |
| `NEXTAUTH_SECRET` | Secret aléatoire (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL publique de l'app |
| `GOOGLE_CLIENT_ID` | OAuth Client ID Google (provider) |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret Google (provider) |
| `ADMIN_EMAIL` | (init) email du premier admin |
| `ADMIN_PASSWORD` | (init) mot de passe initial du premier admin |

⚠ Le service account doit avoir un accès **Éditeur** sur le Spreadsheet
(partagez le sheet avec son adresse email).

## Permissions

- **admin** : CRUD complet, gestion des utilisateurs / pôles / lieux / catégories
- **responsable_pole** : lecture globale, écriture uniquement sur son pôle
- **lecteur** : lecture seule

Les comptes sont créés exclusivement par les admins (pas d'inscription libre).
La connexion Google n'est autorisée que si l'email est déjà inscrit dans
l'onglet Utilisateurs.

## Architecture

```
app/                    # Pages Next.js (App Router)
  api/                  # Routes API (REST sur les onglets)
  admin/                # Pages d'administration (admin only)
  login/                # Page de connexion
components/             # Composants React (layout, équipements, UI)
lib/
  sheets.ts             # Abstraction Google Sheets (repository)
  auth.ts               # Configuration NextAuth
  permissions.ts        # Helpers de droits côté serveur
  validation.ts         # Schémas Zod
scripts/init-sheet.ts   # Initialisation du Spreadsheet
```

## Hors scope (pour l'instant)

OCR, intégration centrale d'achat, historique de mouvements, exports, notifications.
