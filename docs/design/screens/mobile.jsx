/* global React, Icon */
/* eslint-disable */

// ============================================================
// Mobile screens — vue terrain
// ============================================================

function MobileFrame({ children, label }) {
  return (
    <div style={{
      width: 390,
      height: 844,
      borderRadius: 44,
      background: "var(--ink)",
      padding: 10,
      boxShadow: "0 24px 60px -20px rgba(26,22,18,0.35)",
      position: "relative",
    }}>
      <div style={{
        width: "100%", height: "100%",
        background: "var(--parchment)",
        borderRadius: 36,
        overflow: "hidden",
        position: "relative",
        fontFamily: "var(--font-ui)",
        color: "var(--ink)",
      }}>
        {/* status bar */}
        <div style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          fontSize: 14,
          fontWeight: 600,
          paddingTop: 12,
        }}>
          <span>9:41</span>
          <span style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 11 }}>
            <span>●●●●</span>
            <span style={{ marginLeft: 4 }}>􀙇</span>
            <span style={{
              width: 24, height: 11, border: "1.2px solid var(--ink)", borderRadius: 3, position: "relative", marginLeft: 4,
            }}>
              <span style={{ position: "absolute", inset: 1.5, background: "var(--ink)", borderRadius: 1, width: "70%" }}/>
            </span>
          </span>
        </div>
        {/* Dynamic Island */}
        <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 118, height: 36, borderRadius: 18, background: "var(--ink)" }}/>
        {children}
      </div>
    </div>
  );
}

function MobileDashboard() {
  return (
    <MobileFrame>
      <div style={{ height: "calc(100% - 44px)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "8px 20px 14px", display: "flex", alignItems: "center", gap: 12 }}>
          <img src="assets/feb-banner.png" style={{ height: 34, width: "auto" }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mid)" }}>Feiz e Breizh</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, letterSpacing: 0.5 }}>Inventaire</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 4,
            background: "var(--bordeaux)", color: "var(--parchment-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13,
          }}>AL</div>
        </div>

        <div style={{ padding: "0 20px", flex: 1, overflow: "auto" }}>
          {/* Greeting */}
          <div className="t-eyebrow">Demat, Anne</div>
          <div className="t-display" style={{ fontSize: 26, marginTop: 4, lineHeight: 1.1 }}>
            <em style={{ color: "var(--bordeaux)", fontWeight: 400 }}>Grand Pardon</em><br/>dans 67 jours.
          </div>

          {/* Quick scan */}
          <button style={{
            marginTop: 18, width: "100%",
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 18px",
            background: "var(--ink)", color: "var(--parchment-light)",
            border: 0, borderRadius: 8,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 44, filter: "invert(1)", opacity: 0.07 }}/>
            <Icon name="scan" size={22} style={{ position: "relative" }}/>
            <div style={{ textAlign: "left", position: "relative" }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Scanner un QR</div>
              <div style={{ fontSize: 11, opacity: 0.65 }}>Prise rapide · sortie ou retour</div>
            </div>
            <div style={{ flex: 1 }}/>
            <Icon name="arrow-right" size={16} style={{ position: "relative", opacity: 0.6 }}/>
          </button>

          {/* Stats row */}
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <MiniStat label="Total" value="487"/>
            <MiniStat label="Détenus" value="84" tone="bordeaux"/>
            <MiniStat label="À vérifier" value="13" tone="gold"/>
            <MiniStat label="Mvt. · 7j" value="42"/>
          </div>

          {/* Activity */}
          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div className="card-title" style={{ fontSize: 14 }}>Activité récente</div>
            <span style={{ fontSize: 11, color: "var(--bordeaux)" }}>Tout voir</span>
          </div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 1, background: "var(--hairline)", border: "1px solid var(--hairline)", borderRadius: 6, overflow: "hidden" }}>
            {[
              { who: "F. Le Bras", action: "a sorti", item: "Croix de procession", chip: "Liturgie" },
              { who: "M.-A. Tanguy", action: "a déplacé", item: "30 bannières", chip: "Logistique" },
              { who: "Y. Pennec", action: "a vérifié", item: "Sono JBL", chip: "Technique" },
            ].map((e, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "var(--parchment-light)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 4,
                  background: "var(--parchment-warm)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 10,
                }}>{e.who.split(" ").map(s=>s[0]).join("").replace(".","").slice(0,2)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>
                    <strong>{e.who}</strong> <span style={{ color: "var(--ink-mid)" }}>{e.action}</span> <strong>{e.item}</strong>
                  </div>
                  <span className="chip" style={{ marginTop: 4, height: 18, fontSize: 10 }}>{e.chip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          height: 76,
          borderTop: "1px solid var(--hairline)",
          background: "var(--parchment-light)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 56px 1fr 1fr",
          alignItems: "center",
          paddingBottom: 20,
        }}>
          <TabBarItem icon="home" label="Accueil" active/>
          <TabBarItem icon="package" label="Stock"/>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: "var(--bordeaux)", color: "var(--parchment-light)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px -4px rgba(107,31,42,0.4)" }}>
              <Icon name="scan" size={20}/>
            </div>
          </div>
          <TabBarItem icon="clock" label="Activité"/>
          <TabBarItem icon="user" label="Compte"/>
        </div>
      </div>
    </MobileFrame>
  );
}

function MiniStat({ label, value, tone }) {
  const color = tone === "bordeaux" ? "var(--bordeaux)" : tone === "gold" ? "var(--gold)" : "var(--ink)";
  return (
    <div style={{ padding: "12px 14px", background: "var(--parchment-light)", border: "1px solid var(--hairline)", borderRadius: 6 }}>
      <div className="t-mono" style={{ fontSize: 9 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, lineHeight: 1, marginTop: 6, color }}>{value}</div>
    </div>
  );
}

function TabBarItem({ icon, label, active }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: active ? "var(--ink)" : "var(--ink-faint)" }}>
      <Icon name={icon} size={18}/>
      <span style={{ fontSize: 10, fontWeight: active ? 500 : 400 }}>{label}</span>
    </div>
  );
}

// ---------- Prise rapide (scan workflow) -----------------------------------

function MobilePriseRapide() {
  return (
    <MobileFrame>
      <div style={{ height: "calc(100% - 44px)", display: "flex", flexDirection: "column", background: "var(--ink)", color: "var(--parchment)" }}>
        <div style={{ position: "absolute", top: 44, left: 0, right: 0, bottom: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 60, filter: "invert(1)", opacity: 0.04, pointerEvents: "none" }}/>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px 4px", position: "relative" }}>
          <button style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(244,237,224,0.08)", color: "var(--parchment-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="x" size={16}/>
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div className="t-eyebrow" style={{ color: "var(--gold-light)" }}>Prise rapide</div>
            <div style={{ fontFamily: "var(--font-display)", fontVariantCaps: "all-small-caps", letterSpacing: "0.10em", fontSize: 17, fontWeight: 500, marginTop: 2 }}>Scanner un QR</div>
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(244,237,224,0.08)", color: "var(--parchment-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="settings" size={16}/>
          </button>
        </div>

        {/* Scanner viewport */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", position: "relative" }}>
          <div style={{
            width: 280, height: 280,
            border: "2px solid var(--gold-light)",
            borderRadius: 12,
            position: "relative",
            background: "rgba(0,0,0,0.3)",
          }}>
            {/* Corners */}
            {[
              { top: -2, left: -2, bd: "tl" },
              { top: -2, right: -2, bd: "tr" },
              { bottom: -2, left: -2, bd: "bl" },
              { bottom: -2, right: -2, bd: "br" },
            ].map((c, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 28, height: 28,
                ...c,
                borderTop: c.bd.includes("t") ? "3px solid var(--parchment-light)" : 0,
                borderBottom: c.bd.includes("b") ? "3px solid var(--parchment-light)" : 0,
                borderLeft: c.bd.includes("l") ? "3px solid var(--parchment-light)" : 0,
                borderRight: c.bd.includes("r") ? "3px solid var(--parchment-light)" : 0,
                borderRadius: 6,
              }}/>
            ))}
            {/* Scan line */}
            <div style={{
              position: "absolute", left: 12, right: 12,
              top: "60%",
              height: 2,
              background: "linear-gradient(90deg, transparent, var(--gold-light), transparent)",
              boxShadow: "0 0 20px var(--gold-light)",
            }}/>
            {/* Mini QR */}
            <div style={{
              position: "absolute", top: "30%", left: "30%",
              width: 80, height: 80,
              background: "var(--parchment-light)",
              padding: 4,
              display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: "repeat(7, 1fr)",
              gap: 1,
            }}>
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} style={{ background: [0,1,2,4,6,7,8,11,13,14,16,18,20,22,25,28,29,30,34,36,37,39,42,44,46,48].includes(i) ? "var(--ink)" : "transparent" }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom hint + manual */}
        <div style={{
          background: "var(--parchment-light)",
          color: "var(--ink)",
          borderTopLeftRadius: 24, borderTopRightRadius: 24,
          padding: "20px 24px 32px",
          position: "relative",
        }}>
          <div style={{ width: 40, height: 4, background: "var(--hairline-strong)", borderRadius: 2, margin: "0 auto 16px" }}/>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div className="t-eyebrow">Visez un QR</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, marginTop: 2 }}>… ou saisissez la référence</div>
            </div>
            <Icon name="qr" size={20} style={{ color: "var(--bordeaux)" }}/>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <input className="input" style={{ flex: 1 }} placeholder="FEB-0…" defaultValue="FEB-0142"/>
            <button className="btn btn--bordeaux">Ouvrir</button>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <button className="btn btn--ghost" style={{ flex: 1, justifyContent: "center" }}>
              <span className="dot dot--warn"/>Marquer sortie
            </button>
            <button className="btn btn--ghost" style={{ flex: 1, justifyContent: "center" }}>
              <span className="dot dot--ok"/>Marquer retour
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

// ---------- Mobile fiche ----------------------------------------------------

function MobileFiche() {
  return (
    <MobileFrame>
      <div style={{ height: "calc(100% - 44px)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* hero card */}
        <div style={{ padding: "8px 16px 0" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-mid)", fontSize: 12, padding: "6px 0" }}>
            <Icon name="chevron-left" size={14}/>Équipements
          </button>
        </div>

        <div style={{ padding: "8px 16px 14px" }}>
          <div className="card" style={{ overflow: "hidden", position: "relative" }}>
            <div className="ornament-corner ornament-corner--tl"/>
            <div className="ornament-corner ornament-corner--tr"/>
            <div className="ornament-corner ornament-corner--bl"/>
            <div className="ornament-corner ornament-corner--br"/>
            <div style={{ background: "var(--ink)", color: "var(--parchment)", height: 140, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 44, filter: "invert(1)", opacity: 0.07 }}/>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, color: "var(--gold-light)" }}>✠</div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span className="chip chip--bordeaux">Liturgie</span>
                <span className="chip chip--bordeaux"><span className="dot dot--warn"/>Détenu</span>
              </div>
              <div className="t-eyebrow" style={{ marginTop: 12, fontSize: 11 }}>FEB-0142</div>
              <h2 className="t-display" style={{ fontSize: 24, marginTop: 4, lineHeight: 1.1 }}>
                Croix de procession <em style={{ color: "var(--bordeaux)", fontWeight: 400 }}>dorée</em>
              </h2>
            </div>
          </div>
        </div>

        {/* Holder card */}
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ padding: 14, background: "var(--bordeaux-wash)", border: "1px solid rgba(107,31,42,0.15)", borderRadius: 6, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 4,
              background: "var(--bordeaux)", color: "var(--parchment-light)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14,
            }}>FB</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--bordeaux-deep)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Détenu par</div>
              <div style={{ fontWeight: 500, fontSize: 14, marginTop: 2 }}>François Le Bras · Liturgie</div>
              <div style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2 }}>Sorti le 12 mai · retour prévu 28 juil.</div>
            </div>
          </div>
        </div>

        {/* Quick info list */}
        <div style={{ padding: "0 16px", flex: 1, overflow: "auto" }}>
          {[
            ["Lieu",       "Sacristie · Armoire B · Étag. 3", "map-pin"],
            ["Catégorie",  "Liturgie", "tag"],
            ["Quantité",   "1 · pièce unique", "package"],
            ["Acquisition","Octobre 2019", "calendar"],
          ].map(([k, v, ic], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--hairline)" }}>
              <Icon name={ic} size={16} style={{ color: "var(--ink-mid)" }}/>
              <div style={{ flex: 1 }}>
                <div className="t-mono" style={{ fontSize: 9 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{v}</div>
              </div>
              <Icon name="chevron-right" size={14} style={{ color: "var(--ink-faint)" }}/>
            </div>
          ))}
        </div>

        {/* Bottom action bar */}
        <div style={{ padding: 16, borderTop: "1px solid var(--hairline)", background: "var(--parchment-light)", display: "flex", gap: 8, paddingBottom: 30 }}>
          <button className="btn btn--ghost" style={{ flex: 1, justifyContent: "center" }}>Réserver</button>
          <button className="btn btn--bordeaux" style={{ flex: 1, justifyContent: "center" }}>Rendre</button>
        </div>
      </div>
    </MobileFrame>
  );
}

window.MobileDashboard = MobileDashboard;
window.MobilePriseRapide = MobilePriseRapide;
window.MobileFiche = MobileFiche;
