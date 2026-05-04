export function EtatBadge({ etat }: { etat: string }) {
  const cls =
    etat === "Bon"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : etat === "À vérifier"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : etat === "Hors service"
          ? "bg-burgundy/10 text-burgundy border-burgundy/30"
          : "bg-ink/5 text-ink/70 border-ink/10";
  return (
    <span className={`badge border ${cls}`}>{etat || "—"}</span>
  );
}
