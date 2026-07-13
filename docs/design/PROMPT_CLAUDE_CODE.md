# Prompt à coller dans Claude Code

Copier-coller le bloc ci-dessous dans Claude Code, après avoir
extrait le zip `design_handoff/` à la racine du repo `FeB-stocking`
(ou dans un sous-dossier comme `docs/design/`).

---

```text
Je viens de déposer un dossier `design_handoff/` à la racine du repo.

Ta mission : intégrer cette refonte design dans l'application Next.js
existante, sans toucher au périmètre fonctionnel.

Avant d'écrire du code :

1. Lis intégralement `design_handoff/README.md` — il décrit les tokens,
   les écrans, les composants et les contraintes.
2. Liste les écrans existants dans `app/` (App Router) et fais-moi un
   plan de refactor écran-par-écran avec les fichiers à toucher.
3. Identifie les composants partagés à créer dans `components/ui/`
   (Button, Input, Chip, Card, Sidebar, TopBar, DataTable, StatTile,
   Timeline, OrnamentRule, HermineBg, Avatar).
4. Vérifie que `tailwind.config.ts`, `next/font` et la structure
   `public/` sont prêts à recevoir les tokens et les assets.

Puis attends ma validation avant d'attaquer.

Quand on attaque :

- Étendre `tailwind.config.ts` avec les tokens du README (section
  "Design tokens"). Pas de variables CSS globales — tout passe par
  Tailwind.
- Charger Cormorant Garamond et Geist via `next/font/google` dans
  `app/layout.tsx`, exposer les en variables CSS `--font-cormorant`,
  `--font-geist`, `--font-geist-mono`, puis les référencer dans
  `tailwind.config.ts`.
- Copier `design_handoff/assets/` dans `public/brand/`. Référencer les
  images par `/brand/...`.
- Reconstruire les composants partagés en TSX dans `components/ui/`
  avec exactement le visuel des références JSX (cf. `components.jsx`
  pour Sidebar/TopBar/Icon, et `screens/*.jsx` pour les variantes).
- Refaire chaque écran existant en suivant l'ordre du README
  (login → sidebar → top bar → dashboard → liste → fiche → admin →
  mobile responsive → ⌘K → état vide → planche QR).
- Garder les routes, les schémas Zod, les actions serveur, les
  hooks NextAuth et la couche googleapis tels quels. C'est *un
  redesign*, pas une réécriture.
- Pour les éléments design-only (timeline mouvements, bloc
  réservation de la fiche, QR de la planche d'étiquettes) : les
  laisser en placeholder statique, lisible, branché à `null` ou à
  un fixture en attendant l'implémentation backend.
- Penser mobile : tous les écrans doivent être responsive (voir
  `screens/mobile.jsx` pour les patterns de référence — tab bar
  bottom, FAB central, sheet de saisie manuelle).
- Avant d'ouvrir une PR, faire tourner `pnpm build` (ou `npm run
  build`) et `pnpm lint`.

Commence par le plan.
```

---

## Notes pratiques

- Si tu utilises **Cursor** ou **Windsurf**, le même prompt fonctionne ;
  ces outils savent lire les références JSX dans `design_handoff/`.
- Pour réviser visuellement chaque écran au fur et à mesure, ouvrir le
  prototype d'origine en parallèle sur Designer (`index.html`) — c'est
  la source de vérité pour les pixels.
- Si Claude Code propose d'ajouter une dépendance lourde (Radix UI
  complet, framer-motion, etc.), refuser : le projet est explicitement
  low-ops. Les composants peuvent tous se construire en Tailwind
  natif + quelques utilitaires Headless UI au besoin.
