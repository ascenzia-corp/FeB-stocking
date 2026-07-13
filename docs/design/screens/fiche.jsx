/* global React, Icon, Sidebar, TopBar */
/* eslint-disable */

// ============================================================
// Fiche équipement — éditoriale
// ============================================================

function FicheScreen() {
  return (
    <div style={{ width: 1440, height: 980, display: "flex", background: "var(--parchment)", fontFamily: "var(--font-ui)", overflow: "hidden" }}>
      <Sidebar active="Équipements" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Custom topbar with back button */}
        <div className="topbar">
          <button className="btn btn--quiet btn--icon"><Icon name="chevron-left" size={18}/></button>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mid)" }}>
              Équipements / <span style={{ fontFamily: "var(--font-mono)" }}>FEB-0142</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontVariantCaps: "all-small-caps", letterSpacing: "0.10em", fontSize: 22, fontWeight: 500, lineHeight: 1, marginTop: 2 }}>
              Croix de procession dorée
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <button className="btn btn--ghost"><Icon name="qr" size={14}/>Étiquette QR</button>
          <button className="btn btn--ghost"><Icon name="edit" size={14}/>Modifier</button>
          <button className="btn btn--bordeaux">Marquer comme rendu</button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "28px 36px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Hero card */}
              <div className="card card--raised" style={{ overflow: "hidden", position: "relative" }}>
                <div className="ornament-corner ornament-corner--tl"/>
                <div className="ornament-corner ornament-corner--tr"/>
                <div className="ornament-corner ornament-corner--bl"/>
                <div className="ornament-corner ornament-corner--br"/>
                <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 0 }}>
                  {/* Image placeholder */}
                  <div style={{
                    background: "var(--ink)",
                    color: "var(--parchment)",
                    minHeight: 260,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 56, filter: "invert(1)", opacity: 0.06 }}/>
                    <div style={{
                      position: "absolute", inset: 18,
                      border: "1px solid rgba(244,237,224,0.25)",
                      borderRadius: 4,
                      pointerEvents: "none",
                    }}/>
                    <div style={{ textAlign: "center", position: "relative" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 60, color: "var(--gold-light)" }}>✠</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(244,237,224,0.5)", letterSpacing: "0.14em", marginTop: 8 }}>
                        photo · à téléverser
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "28px 32px" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span className="chip chip--bordeaux">Pôle Liturgie</span>
                      <span className="chip">Catégorie · Liturgie</span>
                      <span className="chip chip--bordeaux"><span className="dot dot--warn"/>Détenu</span>
                    </div>
                    <div className="t-eyebrow" style={{ marginTop: 18 }}>Référence <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-mid)", fontStyle: "normal" }}>FEB-0142</span></div>
                    <h1 className="t-display" style={{ fontSize: 36, marginTop: 4, lineHeight: 1.1 }}>
                      Croix de procession <em style={{ color: "var(--bordeaux)", fontWeight: 400 }}>dorée</em>
                    </h1>
                    <p style={{ marginTop: 12, color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6, maxWidth: 480 }}>
                      Croix processionnelle en laiton doré, hampe en bois de chêne. Acquise pour le pèlerinage de 2019. Sortie habituelle : entrée de procession, suivie par le chœur.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabs + content */}
              <div className="card" style={{ overflow: "hidden" }}>
                <div style={{ padding: "0 20px" }}>
                  <div className="tabs">
                    <div className="tab active">Détails</div>
                    <div className="tab">Mouvements <span className="chip" style={{ marginLeft: 6, height: 18, fontSize: 10 }}>14</span></div>
                    <div className="tab">Notes</div>
                    <div className="tab">Photos</div>
                  </div>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
                    <Detail label="Désignation"      value="Croix de procession dorée"/>
                    <Detail label="Référence"        value="FEB-0142" mono/>
                    <Detail label="Catégorie"        value="Liturgie"/>
                    <Detail label="Pôle responsable" value="Liturgie"/>
                    <Detail label="Lieu de rangement" value="Sacristie · Armoire B · Étagère 3"/>
                    <Detail label="Détenu par"        value="François Le Bras (Liturgie)"/>
                    <Detail label="Sortie le"        value="12 mai 2026"/>
                    <Detail label="Retour prévu"     value="28 juillet 2026"/>
                    <Detail label="Quantité"         value="1"/>
                    <Detail label="État physique"    value="Bon — voir notes 2024"/>
                    <Detail label="Acquisition"      value="Octobre 2019 · don famille Le Goff"/>
                    <Detail label="Valeur estimée"   value="≈ 480 €"/>
                  </div>
                  <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px dashed var(--hairline)" }}>
                    <div className="field-label">Notes internes</div>
                    <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 6 }}>
                      « La hampe a été restaurée en 2024 par Yves P. — vérifier les fixations en haut avant chaque grande procession. La croix est lourde, prévoir un porteur expérimenté. »
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — timeline + actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Réservations</div>
                  <button className="btn btn--quiet btn--sm">+ Réserver</button>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{
                    border: "1px solid var(--hairline-strong)",
                    borderRadius: 4,
                    padding: 14,
                    background: "var(--gold-wash)",
                    display: "flex", gap: 12,
                  }}>
                    <div style={{
                      textAlign: "center",
                      borderRight: "1px dashed rgba(164,123,58,0.4)",
                      paddingRight: 12,
                      minWidth: 64,
                    }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1, fontWeight: 500, color: "var(--bordeaux)" }}>26</div>
                      <div className="t-mono" style={{ marginTop: 4 }}>JUI 2026</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontVariantCaps: "all-small-caps", letterSpacing: "0.08em" }}>Grand Pardon · Procession</div>
                      <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
                        Réservée par <strong>Père G. Quéméré</strong> · 8h–13h
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">Mouvements</div>
                  <button className="btn btn--quiet btn--sm">Tout voir</button>
                </div>
                <div style={{ padding: "8px 0 12px" }}>
                  <Timeline items={[
                    { date: "12 mai · 14:22", who: "F. Le Bras", txt: "a sorti pour répétition (sacristie → église)", tone: "bordeaux" },
                    { date: "3 mai · 09:10",  who: "A. Le Goff", txt: "a vérifié l'état après nettoyage" },
                    { date: "28 juil. 2025", who: "F. Le Bras", txt: "a rendu après le Grand Pardon" },
                    { date: "20 juil. 2025", who: "Père G. Q.", txt: "a réservé pour le pèlerinage 2025", tone: "bordeaux" },
                    { date: "Avr. 2024",      who: "Y. Pennec",  txt: "a restauré la hampe" },
                  ]}/>
                </div>
              </div>

              <div className="card" style={{
                background: "var(--ink)",
                color: "var(--parchment-light)",
                border: "0",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 48, filter: "invert(1)", opacity: 0.06 }}/>
                <div style={{ padding: 20, position: "relative" }}>
                  <div className="t-eyebrow" style={{ color: "var(--gold-light)" }}>QR code</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 4 }}>Imprimer une étiquette</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
                    <div style={{
                      width: 72, height: 72,
                      background: "var(--parchment-light)",
                      color: "var(--ink)",
                      borderRadius: 4,
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gridTemplateRows: "repeat(7, 1fr)",
                      gap: 1,
                      padding: 4,
                    }}>
                      {Array.from({ length: 49 }).map((_, i) => {
                        // pseudo-random qr pattern
                        const filled = [0,1,2,3,4,5,6,7,9,10,13,14,17,18,19,21,23,24,28,29,30,31,34,36,37,39,42,44,45,46,47,48].includes(i);
                        const corner = (i < 3) || (i % 7 < 3 && i < 21) || (i > 27 && i % 7 < 3 && i < 42);
                        return <div key={i} style={{ background: filled ? "var(--ink)" : "transparent" }}/>;
                      })}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(244,237,224,0.65)", lineHeight: 1.55 }}>
                      Scannez sur le terrain pour ouvrir la fiche, marquer une sortie ou un retour en deux tapes.
                    </div>
                  </div>
                  <button className="btn btn--ghost" style={{ marginTop: 14, width: "100%", justifyContent: "center", color: "var(--parchment-light)", borderColor: "rgba(244,237,224,0.25)" }}>
                    <Icon name="print" size={14}/>Imprimer la planche
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, mono }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginTop: 4, fontFamily: mono ? "var(--font-mono)" : undefined }}>
        {value}
      </div>
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 0, padding: "10px 20px", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: it.tone === "bordeaux" ? "var(--bordeaux)" : "var(--ink-mid)",
              marginTop: 6,
            }}/>
            {i !== items.length - 1 && (
              <div style={{ position: "absolute", left: 3.5, top: 16, bottom: -10, width: 1, background: "var(--hairline-strong)" }}/>
            )}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--ink-mid)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>{it.date}</div>
            <div style={{ fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 500 }}>{it.who}</span>{" "}
              <span style={{ color: "var(--ink-soft)" }}>{it.txt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

window.FicheScreen = FicheScreen;
