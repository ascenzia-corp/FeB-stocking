/* global React, Icon, Oriflamme, Wordmark, HermineMark, OrnamentRule */
/* eslint-disable */

// ============================================================
// Section · Système visuel (vitrine charte)
// ============================================================

function SystemBoard() {
  const swatches = [
    { name: "Parchemin",       hex: "#F4EDE0", role: "Fond principal",        var: "--parchment" },
    { name: "Parchemin clair", hex: "#FBF6EC", role: "Surfaces / cartes",     var: "--parchment-light" },
    { name: "Parchemin chaud", hex: "#EBE0CC", role: "Surfaces basses",       var: "--parchment-warm" },
    { name: "Encre",           hex: "#1A1612", role: "Texte, navigation",     var: "--ink" },
    { name: "Encre douce",     hex: "#3D342B", role: "Texte secondaire",      var: "--ink-soft" },
    { name: "Bordeaux",        hex: "#6B1F2A", role: "Accent — actions",      var: "--bordeaux" },
    { name: "Bordeaux profond",hex: "#4F1620", role: "Hover, focus actif",    var: "--bordeaux-deep" },
    { name: "Or sourd",        hex: "#A47B3A", role: "Highlights, watermark", var: "--gold" },
  ];

  return (
    <div style={{ padding: 56, background: "var(--parchment)", color: "var(--ink)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48 }}>
        {/* Left rail — brand */}
        <div>
          <div style={{ position: "sticky", top: 24 }}>
            <Oriflamme size={220}/>
            <div style={{ marginTop: 24 }}>
              <div className="t-eyebrow">Charte graphique · v1</div>
              <div className="t-display" style={{ fontSize: 36, marginTop: 6 }}>
                Inventaire<br/>
                <em style={{ fontWeight: 400 }}>Feiz e Breizh</em>
              </div>
              <p style={{ color: "var(--ink-mid)", fontSize: 14, lineHeight: 1.6, marginTop: 18, maxWidth: 280 }}>
                Une identité simple, sobre, taillée pour un outil interne. Parchemin sous la main, encre profonde, accent grenat pour les actions. L'hermine en filigrane rappelle l'oriflamme sans alourdir l'interface.
              </p>
            </div>
          </div>
        </div>

        {/* Right rail — system */}
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

          {/* Palette */}
          <section>
            <div className="t-smallcaps" style={{ fontSize: 12, color: "var(--ink-mid)" }}>I · Palette</div>
            <div className="t-display" style={{ fontSize: 28, marginTop: 4 }}>Encre sur parchemin</div>
            <div style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}>
              {swatches.map(s => (
                <div key={s.name} style={{
                  border: "1px solid var(--hairline)",
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "var(--parchment-light)",
                }}>
                  <div style={{ background: s.hex, height: 96, position: "relative" }}>
                    {s.hex === "#F4EDE0" || s.hex === "#FBF6EC" || s.hex === "#EBE0CC" ? null : (
                      <span style={{ position: "absolute", bottom: 8, right: 10, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em" }}>{s.hex}</span>
                    )}
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2 }}>{s.role}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-faint)", marginTop: 6, letterSpacing: "0.04em" }}>
                      {s.hex.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Type */}
          <section>
            <div className="t-smallcaps" style={{ fontSize: 12, color: "var(--ink-mid)" }}>II · Typographie</div>
            <div className="t-display" style={{ fontSize: 28, marginTop: 4 }}>Cormorant Garamond × Geist</div>

            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div style={{ padding: 24, border: "1px solid var(--hairline)", borderRadius: 6, background: "var(--parchment-light)" }}>
                <div className="t-mono">Cormorant Garamond · Display</div>
                <div className="t-display" style={{ fontSize: 56, marginTop: 16 }}>Inventaire</div>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "var(--bordeaux)", marginTop: 4 }}>matériel & pèlerinage</div>
                <div style={{ marginTop: 18, fontFamily: "var(--font-display)", fontVariantCaps: "all-small-caps", letterSpacing: "0.14em", fontSize: 15 }}>
                  Pôles · Lieux · Catégories
                </div>
              </div>
              <div style={{ padding: 24, border: "1px solid var(--hairline)", borderRadius: 6, background: "var(--parchment-light)" }}>
                <div className="t-mono">Geist · UI</div>
                <div style={{ fontSize: 28, fontWeight: 600, marginTop: 16, letterSpacing: "-0.015em" }}>487 équipements</div>
                <div style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.55 }}>
                  Suivi du matériel détenu, prêté, stocké à Sainte-Anne-d'Auray. Les responsables de pôle ajoutent et déplacent en toute autonomie.
                </div>
                <div className="t-label" style={{ marginTop: 18 }}>Label · 11/0.12em</div>
              </div>
            </div>

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {[
                ["72 / 56 / 42", "Display"],
                ["28 / 22 / 17", "Heading"],
                ["15 / 13",      "Body"],
                ["11",            "Label"],
                ["10",            "Mono"],
              ].map(([sizes, label]) => (
                <div key={label} style={{ padding: "12px 14px", border: "1px solid var(--hairline)", borderRadius: 6 }}>
                  <div className="t-mono">{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6 }}>{sizes}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Hermine & ornement */}
          <section>
            <div className="t-smallcaps" style={{ fontSize: 12, color: "var(--ink-mid)" }}>III · Hermines & ornements</div>
            <div className="t-display" style={{ fontSize: 28, marginTop: 4 }}>Le motif breton, retenu</div>

            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 16 }}>
              <div style={{ height: 220, position: "relative", overflow: "hidden", borderRadius: 6, background: "var(--ink)" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 56, filter: "invert(1)", opacity: 0.08 }}/>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center", color: "var(--parchment)" }}>
                    <div className="t-smallcaps" style={{ fontSize: 12, color: "rgba(244,237,224,0.5)" }}>Tapis d'hermines · 5%</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, marginTop: 4 }}>Pour les surfaces sombres</div>
                  </div>
                </div>
              </div>
              <div style={{ height: 220, position: "relative", overflow: "hidden", borderRadius: 6, background: "var(--parchment-light)", border: "1px solid var(--hairline)" }}>
                <div className="hermine-bg" style={{ position: "absolute", inset: 0 }}/>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center", color: "var(--ink-soft)" }}>
                    <div className="t-smallcaps" style={{ fontSize: 12, color: "var(--ink-mid)" }}>Filigrane · 4%</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, marginTop: 4 }}>Pour les surfaces claires</div>
                  </div>
                </div>
              </div>
              <div style={{ height: 220, padding: 18, borderRadius: 6, background: "var(--parchment-light)", border: "1px solid var(--hairline)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className="t-mono">Mouchet., échelles</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", gap: 12 }}>
                  {[20, 32, 48, 72].map(s => (
                    <div key={s} style={{ textAlign: "center" }}>
                      <img src="assets/hermine.png" style={{ height: s, width: "auto", filter: "brightness(0)" }}/>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-faint)", marginTop: 4 }}>{s}px</div>
                    </div>
                  ))}
                </div>
                <OrnamentRule symbol="✦"/>
              </div>
            </div>
          </section>

          {/* Components */}
          <section>
            <div className="t-smallcaps" style={{ fontSize: 12, color: "var(--ink-mid)" }}>IV · Composants</div>
            <div className="t-display" style={{ fontSize: 28, marginTop: 4 }}>Boutons, badges, champs</div>

            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Buttons */}
              <div style={{ padding: 20, border: "1px solid var(--hairline)", borderRadius: 6, background: "var(--parchment-light)" }}>
                <div className="t-mono">Boutons</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
                  <button className="btn btn--primary"><Icon name="plus" size={14}/>Ajouter</button>
                  <button className="btn btn--bordeaux">Confirmer</button>
                  <button className="btn btn--ghost"><Icon name="filter" size={14}/>Filtrer</button>
                  <button className="btn btn--quiet">Annuler</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
                  <button className="btn btn--primary btn--sm">SM</button>
                  <button className="btn btn--primary">Default</button>
                  <button className="btn btn--primary btn--lg">Large</button>
                </div>
              </div>
              {/* Chips */}
              <div style={{ padding: 20, border: "1px solid var(--hairline)", borderRadius: 6, background: "var(--parchment-light)" }}>
                <div className="t-mono">Chips & statuts</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                  <span className="chip">Liturgie</span>
                  <span className="chip chip--bordeaux">Détenu · F. Le Bras</span>
                  <span className="chip chip--gold">À vérifier</span>
                  <span className="chip chip--ok"><span className="dot dot--ok"/> En stock</span>
                  <span className="chip chip--ink">Pôle Logistique</span>
                </div>
              </div>
              {/* Fields */}
              <div style={{ padding: 20, border: "1px solid var(--hairline)", borderRadius: 6, background: "var(--parchment-light)" }}>
                <div className="t-mono">Champs</div>
                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label className="field-label">Nom</label>
                    <input className="input" defaultValue="Croix de procession"/>
                  </div>
                  <div>
                    <label className="field-label">Pôle</label>
                    <input className="input" defaultValue="Liturgie"/>
                  </div>
                </div>
              </div>
              {/* Card preview */}
              <div style={{ padding: 20, border: "1px solid var(--hairline)", borderRadius: 6, background: "var(--parchment-light)" }}>
                <div className="t-mono">Carte avec ornement</div>
                <div className="card" style={{ marginTop: 14, padding: 18 }}>
                  <div className="ornament-corner ornament-corner--tl"/>
                  <div className="ornament-corner ornament-corner--tr"/>
                  <div className="ornament-corner ornament-corner--bl"/>
                  <div className="ornament-corner ornament-corner--br"/>
                  <div className="t-eyebrow">Pôle Liturgie</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, marginTop: 4 }}>Calice de procession</div>
                  <div style={{ color: "var(--ink-mid)", fontSize: 13, marginTop: 8 }}>Sacristie · armoire B · étagère 3</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

window.SystemBoard = SystemBoard;
