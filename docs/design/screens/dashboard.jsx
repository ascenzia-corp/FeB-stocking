/* global React, Icon, Sidebar, TopBar, HermineMark, OrnamentRule */
/* eslint-disable */

// ============================================================
// Dashboard — desktop
// ============================================================

function DashboardScreen() {
  return (
    <div style={{ width: 1440, height: 980, display: "flex", background: "var(--parchment)", fontFamily: "var(--font-ui)", overflow: "hidden" }}>
      <Sidebar active="Tableau de bord" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar
          title="Tableau de bord"
          breadcrumb="Accueil"
          action={
            <button className="btn btn--primary"><Icon name="plus" size={14}/>Nouvel équipement</button>
          }
        />

        <div style={{ flex: 1, overflow: "auto", padding: "28px 36px 40px" }}>
          {/* Hero — greeting + pèlerinage countdown */}
          <div style={{
            background: "var(--ink)",
            color: "var(--parchment)",
            borderRadius: 8,
            padding: "32px 36px",
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 32,
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 60, filter: "invert(1)", opacity: 0.06 }}/>
            <div style={{ position: "relative" }}>
              <div className="t-eyebrow" style={{ color: "var(--gold-light)" }}>Demat, Anne</div>
              <div className="t-display" style={{ fontSize: 38, marginTop: 6, color: "var(--parchment-light)" }}>
                Préparons le <em style={{ color: "var(--gold-light)", fontWeight: 400 }}>Grand Pardon</em>.
              </div>
              <p style={{ color: "rgba(244,237,224,0.7)", fontSize: 14, marginTop: 12, lineHeight: 1.55, maxWidth: 480 }}>
                487 équipements suivis, 12 pôles, 23 lieux de rangement. La sacristie de Sainte-Anne est inventoriée à 92%.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                <button className="btn btn--bordeaux"><Icon name="scan" size={14}/>Lancer une prise rapide</button>
                <button className="btn btn--ghost" style={{ color: "var(--parchment)", borderColor: "rgba(244,237,224,0.25)" }}>
                  <Icon name="import" size={14}/>Importer une feuille
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderLeft: "1px solid rgba(244,237,224,0.15)", paddingLeft: 32 }}>
              <div className="t-eyebrow" style={{ color: "var(--gold-light)" }}>Prochain pèlerinage</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, marginTop: 4, color: "var(--parchment-light)" }}>
                Grand Pardon de Sainte-Anne
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 18 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 1, color: "var(--parchment-light)", fontWeight: 500, letterSpacing: "-0.02em" }}>67</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,237,224,0.5)", marginTop: 4 }}>jours restants</div>
                </div>
                <div style={{ flex: 1, paddingLeft: 18 }}>
                  <div style={{ height: 6, background: "rgba(244,237,224,0.12)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: "62%", height: "100%", background: "var(--gold-light)" }}/>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "rgba(244,237,224,0.6)" }}>
                    <span>Préparation</span>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--gold-light)" }}>62%</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 18, fontSize: 12, color: "rgba(244,237,224,0.6)", lineHeight: 1.6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--gold-light)" }}>26 juillet 2026</span> · Basilique Sainte-Anne-d'Auray
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            <StatTile label="Équipements" value="487" sub="+12 depuis 30 j" trend="up"/>
            <StatTile label="Détenus" value="84" sub="par 27 bénévoles" tone="bordeaux"/>
            <StatTile label="À vérifier" value="13" sub="6 prêts à clôturer" tone="gold"/>
            <StatTile label="Mouvements · 7j" value="42" sub="moyenne &raquo; 28" trend="up"/>
          </div>

          {/* Lower grid */}
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
            {/* Activity */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div className="card-header">
                <div className="card-title">Activité récente</div>
                <button className="btn btn--quiet btn--sm">Voir l'historique <Icon name="chevron-right" size={12}/></button>
              </div>
              <div>
                {[
                  { ts: "il y a 14 min", who: "F. Le Bras",        action: "a sorti",    item: "Croix de procession dorée",       chip: "Liturgie",   chipTone: "chip--bordeaux", from: "Sacristie · armoire B" },
                  { ts: "il y a 1 h",    who: "M.-A. Tanguy",     action: "a déplacé",   item: "Lot de 30 bannières blanches",    chip: "Logistique", chipTone: "chip--ink",       from: "Atelier → Local Vannes" },
                  { ts: "ce matin",      who: "Père G. Quéméré",  action: "a réservé",   item: "Calice de pèlerinage",            chip: "Liturgie",   chipTone: "chip--bordeaux", from: "Pour le 26 juillet" },
                  { ts: "hier · 18:42",  who: "Y. Pennec",        action: "a vérifié",   item: "Sono mobile JBL EON · 2 enceintes", chip: "Technique", chipTone: "chip--gold",     from: "Catégorie · Son" },
                  { ts: "hier · 14:10",  who: "A. Le Goff",       action: "a ajouté",    item: "12 brassards stewards rouge",     chip: "Sécurité",   chipTone: "chip--ink",       from: "Stock initial" },
                  { ts: "lundi",         who: "S. Riou",          action: "a rendu",     item: "Talkie-walkie Motorola T82 #04",  chip: "Sécurité",   chipTone: "chip--ink",       from: "À : stock" },
                ].map((e, i) => (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "32px 1fr auto",
                    gap: 14,
                    padding: "14px 20px",
                    borderTop: i === 0 ? "0" : "1px solid var(--hairline)",
                    alignItems: "center",
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 4,
                      background: "var(--parchment-warm)", color: "var(--ink)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, letterSpacing: 0.5,
                    }}>{e.who.split(" ").map(s => s[0]).join("").slice(0,2)}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                        <span style={{ fontWeight: 500 }}>{e.who}</span>
                        <span style={{ color: "var(--ink-mid)" }}> {e.action} </span>
                        <span style={{ fontWeight: 500 }}>{e.item}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                        <span className={"chip " + e.chipTone}>{e.chip}</span>
                        <span style={{ fontSize: 12, color: "var(--ink-mid)" }}>{e.from}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--font-mono)", textAlign: "right", letterSpacing: "0.04em" }}>{e.ts}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pôles + À votre attention */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Répartition par pôle</div>
                  <button className="btn btn--quiet btn--sm">Tous</button>
                </div>
                <div style={{ padding: "8px 20px 18px" }}>
                  {[
                    { name: "Liturgie",   v: 142, pct: 100 },
                    { name: "Logistique", v: 118, pct: 83 },
                    { name: "Sécurité",   v: 67,  pct: 47 },
                    { name: "Technique",  v: 58,  pct: 41 },
                    { name: "Hospitalité",v: 49,  pct: 35 },
                    { name: "Communication", v: 32, pct: 23 },
                    { name: "Pèlerins",   v: 21,  pct: 15 },
                  ].map((p, i) => (
                    <div key={p.name} style={{ padding: "8px 0", borderTop: i === 0 ? "0" : "1px dashed var(--hairline)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 13 }}>
                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                        <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-mid)", fontSize: 11 }}>{p.v}</span>
                      </div>
                      <div style={{ height: 4, background: "var(--parchment-warm)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                        <div style={{ width: p.pct + "%", height: "100%", background: i === 0 ? "var(--bordeaux)" : "var(--ink)", opacity: i === 0 ? 1 : 0.65 - i * 0.06 }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ background: "linear-gradient(180deg, var(--gold-wash) 0%, var(--parchment-light) 100%)" }}>
                <div className="card-header" style={{ borderBottomColor: "rgba(164,123,58,0.18)" }}>
                  <div className="card-title">À votre attention</div>
                  <span className="chip chip--gold">3</span>
                </div>
                <div style={{ padding: "4px 4px 12px" }}>
                  {[
                    "13 équipements n'ont pas été vus depuis plus de 90 jours",
                    "F. Le Bras détient 8 objets depuis le 12 mai",
                    "2 nouveaux comptes Google en attente d'autorisation",
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "10px 16px", alignItems: "flex-start" }}>
                      <span style={{ marginTop: 6 }} className="dot dot--warn"/>
                      <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-soft)" }}>{t}</div>
                      <Icon name="chevron-right" size={14} style={{ color: "var(--ink-faint)", marginTop: 2 }}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, sub, trend, tone = "default" }) {
  const accent = tone === "bordeaux" ? "var(--bordeaux)" : tone === "gold" ? "var(--gold)" : "var(--ink)";
  return (
    <div className="stat">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="stat__label">{label}</div>
        {trend === "up" && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ok)" }}>↗ trend</span>}
      </div>
      <div className="stat__value" style={{ color: accent }}>{value}</div>
      <div className="stat__sub" dangerouslySetInnerHTML={{ __html: sub }}/>
      {/* watermark hermine */}
      <div style={{
        position: "absolute", right: -8, bottom: -8, width: 56, height: 90,
        backgroundImage: "url('assets/hermine.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        opacity: 0.05,
        pointerEvents: "none",
      }}/>
    </div>
  );
}

window.DashboardScreen = DashboardScreen;
