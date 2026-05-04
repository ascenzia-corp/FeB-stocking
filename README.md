# Inventaire Matériel — Feiz e Breizh

Application web de gestion du matériel pour l'association Feiz e Breizh, qui
organise le grand pèlerinage breton vers Sainte-Anne d'Auray.

## Stack

- **Next.js** (App Router) + React + TypeScript + Tailwind CSS
- **Google Sheets** comme base de données (via service account)
- **NextAuth.js** : Google OAuth + Credentials (email/mot de passe)
- Hébergement **Vercel**

## Pas-à-pas — du dépôt à la mise en production sur Vercel

### 1. Créer le Google Spreadsheet

1. Sur [sheets.google.com](https://sheets.google.com), créer un nouveau classeur, par
   exemple « Inventaire Feiz e Breizh ».
2. Récupérer l'**ID** du Spreadsheet : il apparaît dans l'URL entre
   `/d/` et `/edit`. Exemple :
   `https://docs.google.com/spreadsheets/d/1aBcDeFgHi.../edit` →
   ID = `1aBcDeFgHi...`. Garder cette valeur, ce sera `GOOGLE_SPREADSHEET_ID`.
3. Le script d'initialisation créera lui-même les onglets `Equipements`,
   `Poles`, `Lieux`, `Categories`, `Utilisateurs`. Pas besoin de les créer
   à la main.

### 2. Créer un service account Google

1. Aller sur [console.cloud.google.com](https://console.cloud.google.com).
2. Créer un nouveau projet (ex : « feiz-stocking ») ou en réutiliser un.
3. Dans le menu **API & Services → Library**, chercher **Google Sheets API**
   et cliquer sur **Enable**.
4. Toujours dans **API & Services**, ouvrir **Credentials → Create
   Credentials → Service account**.
   - Nom : `feiz-stocking-sheets` (ou ce que vous voulez).
   - Aucun rôle IAM nécessaire (on s'appuie sur le partage du Spreadsheet).
5. Une fois le service account créé, l'ouvrir, onglet **Keys → Add Key →
   Create new key → JSON**. Un fichier JSON est téléchargé : c'est le
   secret, à ne jamais committer.
6. Dans ce JSON, on récupère :
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
     (du type `xxx@xxx.iam.gserviceaccount.com`)
   - `private_key` → `GOOGLE_PRIVATE_KEY` (la grande chaîne
     `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`).

### 3. Partager le Spreadsheet avec le service account

Dans le Spreadsheet, cliquer sur **Partager**, coller le `client_email`
du service account, donner un accès **Éditeur**, désactiver la
notification par mail, valider. **Sans cette étape, l'app verra le
Spreadsheet comme inexistant (erreur 403).**

### 4. Configurer l'OAuth Google (login utilisateurs)

1. Toujours dans Google Cloud Console, **API & Services → OAuth consent
   screen** : configurer l'écran (type « External », nom de l'app,
   email de support, scopes par défaut, ajouter les emails de test si
   l'app est en mode « Testing »).
2. **Credentials → Create Credentials → OAuth client ID** → type
   **Web application**.
3. **Authorized redirect URIs** : ajouter d'abord `http://localhost:3000/api/auth/callback/google`
   pour le dev. Les URIs Vercel seront ajoutées à l'étape 7.
4. Récupérer **Client ID** et **Client Secret** → ce seront
   `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`.

### 5. Initialiser localement le Spreadsheet

```bash
git clone https://github.com/ascenzia-corp/feb-stocking.git
cd feb-stocking
npm install
cp .env.example .env.local
# éditer .env.local et remplir toutes les variables (cf. tableau plus bas)
# - NEXTAUTH_URL=http://localhost:3000 pour cette étape
# - NEXTAUTH_SECRET : générer avec `openssl rand -base64 32`
# - ADMIN_EMAIL / ADMIN_PASSWORD : compte admin initial
npm run init-sheet
```

Le script provisionne les onglets, les pôles/lieux/catégories par défaut
et le premier admin. Vérifier ensuite en local avec `npm run dev` que la
connexion fonctionne (`http://localhost:3000/login` avec
`ADMIN_EMAIL`/`ADMIN_PASSWORD`).

> ℹ️ Le script `init-sheet` est **idempotent** : on peut le relancer sans
> casser l'existant. Il ne crée que ce qui manque.

### 6. Déployer sur Vercel

1. Sur [vercel.com](https://vercel.com), **Add New → Project** → importer
   le dépôt `ascenzia-corp/feb-stocking`.
2. **Framework Preset** : Next.js (détecté automatiquement). Laisser les
   commandes par défaut (`next build`).
3. **Production branch** : choisir la branche déployée
   (`main` ou la branche feature qu'on veut publier).
4. **Environment Variables** : copier-coller toutes les variables du
   tableau plus bas.
   - Pour `GOOGLE_PRIVATE_KEY`, coller la valeur entière entre guillemets
     (le code remplace automatiquement les `\n` littéraux par des vrais
     retours à la ligne).
   - Pour `NEXTAUTH_URL`, mettre l'URL définitive (ex :
     `https://inventaire-feiz.vercel.app` ou un domaine custom).
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` ne sont **pas nécessaires** sur
     Vercel : ils ne servent qu'au script local d'init.
5. Cliquer sur **Deploy**.

### 7. Finaliser le callback Google OAuth

Une fois l'URL Vercel connue, retourner dans Google Cloud Console →
**Credentials** → ouvrir l'OAuth client → **Authorized redirect URIs**
→ ajouter :

```
https://<votre-domaine-vercel>/api/auth/callback/google
```

(et idem pour un éventuel domaine custom). Sans ça, le bouton « Se
connecter avec Google » renvoie un `redirect_uri_mismatch`.

### 8. Premier login en production

Aller sur l'URL Vercel → `/login` → se connecter avec
`ADMIN_EMAIL` / `ADMIN_PASSWORD`. Depuis **Administration →
Utilisateurs**, créer ensuite les comptes des responsables de pôle et
des lecteurs.

## Variables d'environnement

| Variable | Description | Où ? |
|---|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` du JSON du service account | local + Vercel |
| `GOOGLE_PRIVATE_KEY` | `private_key` du JSON, entre guillemets | local + Vercel |
| `GOOGLE_SPREADSHEET_ID` | ID du Spreadsheet (cf. URL) | local + Vercel |
| `NEXTAUTH_SECRET` | Secret aléatoire (`openssl rand -base64 32`) | local + Vercel |
| `NEXTAUTH_URL` | URL publique (`http://localhost:3000` en dev, URL Vercel en prod) | local + Vercel |
| `GOOGLE_CLIENT_ID` | OAuth Client ID Google (provider) | local + Vercel |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret Google (provider) | local + Vercel |
| `ADMIN_EMAIL` | (init only) email du premier admin | local |
| `ADMIN_PASSWORD` | (init only) mot de passe initial du premier admin | local |

⚠ Le service account doit avoir un accès **Éditeur** sur le Spreadsheet
(partagez le Spreadsheet avec son `client_email`).

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
