# Handoff — Refonte design · Inventaire Feiz e Breizh

## Vue d'ensemble

Refonte UX/UI de l'application interne **Inventaire Feiz e Breizh**
(repo : `ascenzia-corp/FeB-stocking`, Next.js 14 / React 18 / TypeScript / Tailwind / NextAuth / Google Sheets).

L'objectif est d'intégrer la charte graphique de l'association
(parchemin, encre, bordeaux liturgique, oriflamme, hermine) tout en
modernisant l'ergonomie. **Aucune dépendance ni page ne doit être
ajoutée** — on remplace uniquement les styles, les layouts et la
hiérarchie visuelle des écrans existants. Le périmètre fonctionnel
(rôles, entités, Google Sheets comme DB) reste identique.

---

## À propos des fichiers de design

Les fichiers HTML/JSX dans ce dossier sont **des références de design**
construites comme prototypes pour montrer l'aspect visuel et la
hiérarchie d'information voulus. **Ne pas les copier-coller dans le
codebase** : il s'agit de recréer ces designs dans l'environnement
Next.js / Tailwind existant, en suivant les patterns du projet.

Concrètement :
- Pas de React 18 UMD ni de Babel inline — utiliser les composants Next.js / TSX existants.
- Pas de classes utilitaires inventées (`.btn--bordeaux`, `.card`, etc.) — les traduire en classes Tailwind, avec les tokens étendus listés ci-dessous.
- Cormorant Garamond + Geist doivent être ajoutés via `next/font/google`.
- Le motif hermine est livré en PNG — l'utiliser comme `background-image`.

## Fidélité

**Haute fidélité (hi-fi).** Couleurs, typographies, tailles, espacements,
états et copywriting sont définitifs. Le développeur doit reproduire au
pixel près en utilisant Tailwind + les classes utilitaires existantes
du repo.

---

## Stack cible & contraintes

- **Framework** : Next.js 14 (App Router) — pas de changement.
- **Styling** : Tailwind CSS — étendre `tailwind.config.ts` avec les tokens ci-dessous au lieu d'ajouter des CSS globaux.
- **Polices** : ajouter via `next/font/google` (`Cormorant_Garamond`, `Geist`, `Geist_Mono`).
- **Icônes** : pas d'icon-pack externe. Garder les icônes line custom 24x24 stroke 1.5 (cf. `components.jsx` → `Icon`).
- **Composants** : créer un dossier `components/ui/` (Button, Input, Chip, Card, Sidebar, TopBar, DataTable, Stat, Timeline, etc.).
- **Assets** : copier le dossier `assets/` dans `public/brand/` du repo.

---

## Design tokens (à mettre dans `tailwind.config.ts`)

```ts
// tailwind.config.ts — extend.theme
colors: {
  // parchemin & encre
  parchment:       { DEFAULT: '#F4EDE0', light: '#FBF6EC', warm: '#EBE0CC', deep: '#E0D3B9' },
  ink:             { DEFAULT: '#1A1612', soft: '#3D342B', mid: '#6B5E4F', faint: '#9C8B73' },
  // accents liturgiques
  bordeaux:        { DEFAULT: '#6B1F2A', deep: '#4F1620', soft: '#8B2B38', wash: '#F2E1DF' },
  gold:            { DEFAULT: '#A47B3A', light: '#C9A05E', wash: '#F2E8D2' },
  sage:            { DEFAULT: '#5C6B4A', wash: '#E2E5D6' },
  // états sémantiques
  ok: '#4F6B3F', warn: '#A06A1A', danger: '#8B2B38',
},
fontFamily: {
  display: ['var(--font-cormorant)', 'EB Garamond', 'Georgia', 'serif'],
  ui:      ['var(--font-geist)', 'system-ui', 'sans-serif'],
  mono:    ['var(--font-geist-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
},
borderRadius: { sm: '3px', DEFAULT: '4px', md: '6px', lg: '8px' },
boxShadow: {
  sm: '0 1px 0 rgba(26,22,18,0.04), 0 2px 6px rgba(26,22,18,0.04)',
  md: '0 1px 0 rgba(26,22,18,0.04), 0 8px 24px -8px rgba(26,22,18,0.12)',
  lg: '0 1px 0 rgba(26,22,18,0.04), 0 24px 48px -16px rgba(26,22,18,0.22)',
},
```

Hairlines récurrentes : `border-ink/10` (faible) et `border-ink/20` (forte).

### Type system

| Usage                | Famille    | Réglages                                                                |
|----------------------|------------|-------------------------------------------------------------------------|
| Display titres       | Cormorant  | `font-medium tracking-[-0.01em] leading-[1.05]`                         |
| Titres section       | Cormorant  | `font-medium small-caps tracking-[0.14em] lowercase` (font-variant-caps:all-small-caps) |
| Eyebrow              | Cormorant  | `italic tracking-[0.02em] text-bordeaux text-[13px]`                    |
| Body UI              | Geist      | 13/14/15 px selon contexte                                              |
| Label                | Geist      | `text-[11px] uppercase tracking-[0.10em] text-ink-mid`                  |
| Mono (IDs, dates)    | Geist Mono | `text-[11px] uppercase tracking-[0.04em] text-ink-mid`                  |

Activer les chiffres tabulaires globalement : `font-variant-numeric: tabular-nums`.

### Espacement & rythme

Density "balanced" (par défaut) : padding cartes 18–22 px, gaps grilles 14–24 px.
Hauteurs : boutons 36 px (default), inputs 36 px, lignes de table 14 px de padding vertical.

### Motif Hermine (filigrane)

```css
/* surface claire */
background-image: url('/brand/hermine.png');
background-size: 56px;
opacity: 0.04;

/* surface sombre — inversée */
filter: invert(1);
opacity: 0.05–0.06;
background-size: 60–72px;
```

Le PNG est blanc sur transparent ; les valeurs ci-dessus marchent telles
quelles sur les deux surfaces.

---

## Logo & marques

| Asset (dans `public/brand/`) | Quand l'utiliser                                        |
|------------------------------|---------------------------------------------------------|
| `feb-logo.png`               | Logo complet (wordmark + oriflamme) — vitrines à grande taille (login hero, page “À propos”, splash) |
| `feb-banner.png`             | Oriflamme seule (sans wordmark) — fond clair, petites tailles, headers/sidebars |
| `feb-banner-noir.png`        | Oriflamme seule — fond sombre, à inverser avec `filter: invert(1)` |
| `hermine.png`                | Motif moucheture — toujours comme background-image filigrane |

⚠️ Ne **jamais** mettre `feb-logo.png` sous 100 px de haut — le wordmark
devient illisible. En dessous, utiliser `feb-banner.png` + wordmark texte
en CSS.

---

## Écrans à refaire

Chaque écran existant dans le repo a son équivalent dans `screens/`.
Voir aussi les screenshots d'aperçu dans le dossier `previews/` (si fourni).

### 1. Login (`/login`)
- **Fichier de réf.** : `screens/login.jsx`
- Layout : split 560px (panneau noir, oriflamme grand format) + 1fr (formulaire).
- Panneau noir : pattern d'hermines à 5%, oriflamme `feb-banner-noir.png` à 640px de haut, inversée, centrée. Wordmark "FEIZ · e · BREIZH" en petites caps au-dessous. Tagline en haut, citation bretonne en bas.
- Panneau clair : filigrane hermine, mini-brand block (oriflamme 52px + "Inventaire / FEIZ E BREIZH"), titre display "Bienvenue au chapitre.", bouton Google, séparateur "ou" en italique bordeaux, champs email/mdp, bouton primaire "Entrer dans l'application", bloc d'avertissement "Votre adresse doit déjà figurer dans la feuille Utilisateurs".

### 2. Sidebar globale (composant transverse)
- **Fichier de réf.** : `components.jsx` → `Sidebar`
- Largeur : 248px. Fond `ink`, hermines en filigrane (invert, 5%).
- Bloc brand top (oriflamme 52px + "Inventaire / FEIZ E BREIZH").
- Sections nav : `Principal` (Tableau de bord, Équipements, Prise rapide, Historique) · `Référentiels` (Pôles, Lieux, Catégories) · `Administration` (Utilisateurs, Paramètres).
- Item actif : barre verticale or à gauche (`gold-light`), fond `parchment/10`, texte clair.
- Pied : avatar carré bordeaux + nom + rôle ("Administrateur", "Resp. pôle", "Lecteur") + icône logout.

### 3. Top bar (composant transverse)
- **Fichier de réf.** : `components.jsx` → `TopBar`
- Hauteur 64px, fond `parchment-light`, hairline bas.
- À gauche : breadcrumb (eyebrow uppercase mono) + titre small-caps.
- Centre : search bar — placeholder, raccourci `⌘K`.
- À droite : icône notif + action principale (variable selon la page).

### 4. Tableau de bord (`/dashboard`)
- **Fichier de réf.** : `screens/dashboard.jsx`
- Hero strip noir : greeting "Demat, {prenom}" + titre display + sous-texte de contexte + 2 CTA (Prise rapide / Importer). Bordure verticale à droite avec compte à rebours "Prochain pèlerinage" + barre de progression or.
- Grille de 4 stats : Équipements / Détenus (accent bordeaux) / À vérifier (accent gold) / Mouvements 7j. Filigrane hermine en bas-droite de chaque tuile.
- 2 colonnes :
  - **Activité récente** (carte) : flux de 6 entrées (avatar 32px carré, "Qui a fait quoi sur quoi" + chip pôle + lieu, timestamp mono à droite).
  - **Répartition par pôle** : liste de pôles avec barre horizontale (premier en bordeaux, suivants en encre dégradée).
  - **À votre attention** (carte gold wash) : 3 alertes avec dot warn.

### 5. Liste équipements (`/equipements`)
- **Fichier de réf.** : `screens/equipements.jsx`
- Barre de filtres : input search + chips filtre déroulants (Pôle, Lieu, Catégorie, État) + Reset + Trier. Bordure pointillée pour les filtres non actifs, solide pour les actifs.
- Compteur de résultats à gauche, toggle vue (Liste / Tableau / Cartes) à droite.
- Table : checkbox / Référence (mono) / Désignation (gras) / Catégorie (chip) / Pôle / Lieu (avec icône pin) / Détenu par (avatar mini + nom + date mono) / État (chip avec dot coloré) / actions (`…`).
- Ligne sélectionnée : fond `bordeaux/wash`, checkbox bordeaux.
- Pagination en bas (page 1/41, bouton actif inversé).

### 6. Fiche équipement (`/equipements/[id]`)
- **Fichier de réf.** : `screens/fiche.jsx`
- Top bar avec bouton retour + breadcrumb + actions (Étiquette QR, Modifier, **Marquer comme rendu** primaire bordeaux).
- Hero card avec ornements aux 4 coins (1.5px de bordure encadrant 22×22 au coin), grille 300px image + texte. Image : noir avec hermines filigrane et placeholder croix `✠`. Texte : chips (Pôle, Catégorie, État), eyebrow référence mono, titre display avec mot-accent en bordeaux italique, paragraphe descriptif.
- Onglets : Détails (actif) · Mouvements (avec compteur) · Notes · Photos.
- Grille 2 colonnes de paires label/valeur (Désignation, Référence mono, Catégorie, Pôle resp., Lieu, Détenu par, Sortie le, Retour prévu, Quantité, État, Acquisition, Valeur estimée).
- Notes internes sous séparateur pointillé.
- Colonne droite :
  - Carte **Réservations** : bloc gold wash avec date en gros + label événement.
  - Carte **Mouvements** : timeline verticale (dot + ligne, date mono, qui + action).
  - Carte **QR** : fond noir, mini-QR + texte + bouton "Imprimer la planche".

### 7. Administration (`/admin/utilisateurs`)
- **Fichier de réf.** : `screens/admin.jsx`
- Onglets : Utilisateurs · Pôles · Lieux · Catégories · Paramètres.
- 3 cartes de rôle (Administrateurs bordeaux / Responsables ink / Lecteurs clair) — chacune avec count, description, chips utilisateurs.
- Table comptes : Membre (avatar + nom + email mono) / Email / Rôle (chip) / Pôle / Auth (logo Google ou icône clé pour mot de passe, chip gold "en attente" si en attente) / Dernière act. (mono) / `…`.

### 8. Vues mobiles
- **Fichier de réf.** : `screens/mobile.jsx`
- **Accueil** : header avec mini-brand + avatar, greeting display, gros bouton noir "Scanner un QR" (avec hermines filigrane et CTA "Prise rapide"), 4 mini-stats en grille 2×2, liste activité, tab bar bas (Accueil / Stock / **Scan** central en cercle bordeaux / Activité / Compte).
- **Prise rapide** : viewport scanner plein écran noir, cadre `gold-light` 280×280 avec coins blancs renforcés, sheet bas avec champ référence manuel + 2 boutons "Marquer sortie / retour".
- **Fiche mobile** : back nav, carte hero ornementée, bloc "Détenu par" bordeaux wash, liste détails avec icônes, barre d'actions bas (Réserver / Rendre).

### 9. Détails et écrans secondaires
- **Fichier de réf.** : `screens/extras.jsx`
- **Recherche globale ⌘K** : overlay 720px, groupe "Équipements" (résultats avec icône+titre+sub+chip), "Actions" (raccourcis kbd), "Naviguer". Item sélectionné en bordeaux wash. Footer avec raccourcis (`↑↓ ↵ ⌘K`).
- **Planche QR A4** : page imprimable, header avec oriflamme + titre lieu, rule ornamentale `✦`, grille 3×4 de cartes étiquettes (mini-QR 64px + référence mono + désignation small-caps + lieu).
- **État vide** : centré, hermine désaturée 96px, rule ornamentale, titre display, texte explicatif, 2 CTA.

---

## États & interactions

- **Hover boutons primaires** : `bg-bordeaux` (au lieu de `bg-ink`)
- **Hover ghost** : `bg-parchment-light border-ink`
- **Focus inputs** : `border-ink ring-2 ring-ink/8`
- **Focus-visible général** : `outline: 2px solid bordeaux; outline-offset: 2px`
- **Hover lignes table** : `bg-parchment`
- **Sélection** : `bg-bordeaux-wash`, checkbox bordeaux pleine
- **Transitions** : `transition-all duration-120 ease-out` partout
- **Loading** : placeholders parchemin warm (pas de skeletons gris)

---

## Rôles & permissions (rappel — pas de changement)

| Rôle              | Lecture       | Écriture                           | Admin                            |
|-------------------|---------------|------------------------------------|----------------------------------|
| `admin`           | Tout          | Tout                               | Comptes / pôles / lieux / cats   |
| `responsable_pole`| Tout          | Uniquement les équipements de son pôle | —                            |
| `lecteur`         | Tout          | —                                  | —                                |

L'UI doit masquer ou désactiver (avec tooltip) les actions
non-autorisées — pas de réponse 403 visible à l'utilisateur.

---

## Speaker notes pour la session Claude Code

Voir le fichier `PROMPT_CLAUDE_CODE.md` à la racine du handoff — c'est le prompt à coller tel quel pour démarrer la session.

## Inventaire des fichiers de référence

```
design_handoff/
├─ README.md                  ← ce fichier
├─ PROMPT_CLAUDE_CODE.md      ← prompt d'amorçage
├─ tokens/
│  └─ tailwind.config.snippet.ts
├─ styles.css                 ← référence (à traduire en Tailwind)
├─ components.jsx             ← Sidebar, TopBar, Icon, Oriflamme — référence visuelle
├─ screens/
│  ├─ system.jsx              ← vitrine charte (palette/typo/composants)
│  ├─ login.jsx
│  ├─ dashboard.jsx
│  ├─ equipements.jsx
│  ├─ fiche.jsx
│  ├─ admin.jsx
│  ├─ mobile.jsx
│  └─ extras.jsx
└─ assets/
   ├─ feb-logo.png            ← logo complet (wordmark + oriflamme)
   ├─ feb-banner.png          ← oriflamme seule, fond clair
   ├─ feb-banner-noir.png     ← oriflamme seule, fond sombre
   ├─ feb-logo-noir.png       ← logo complet, fond sombre
   └─ hermine.png             ← motif moucheture
```

---

## Hors-périmètre

- Pas de nouvelle entité, pas de schéma de Sheets modifié.
- Pas d'historique de mouvements en DB (les "mouvements" affichés dans la fiche sont à laisser en placeholder static jusqu'à ce que la feature soit décidée — voir l'esprit du projet : low-cost, low-ops).
- Pas de réservations en base — le bloc Réservation de la fiche est design-only pour l'instant.
- Le QR code de la fiche peut être généré côté client (`qrcode` lib npm) ou laissé en placeholder visuel.
- Le scanner mobile (`/prise-rapide`) peut utiliser `react-qr-scanner` ou `html5-qrcode` en seconde phase — laisser l'écran fonctionnel sur saisie manuelle pour commencer.
