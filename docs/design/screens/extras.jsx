/* global React, Icon */
/* eslint-disable */

// ============================================================
// Extras — Command palette + QR labels + empty state
// ============================================================

function CmdKScreen() {
  return (
    <div style={{
      width: 1100, height: 720,
      background: "var(--ink)",
      borderRadius: 8,
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-ui)",
    }}>
      {/* Faux app background (blurred dashboard hint) */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 64, filter: "invert(1)", opacity: 0.05 }}/>
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,22,18,0.55)" }}/>

      {/* Palette */}
      <div style={{
        position: "absolute",
        top: 80, left: "50%", transform: "translateX(-50%)",
        width: 720,
        background: "var(--parchment-light)",
        color: "var(--ink)",
        borderRadius: 10,
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }}>
        {/* search */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px", borderBottom: "1px solid var(--hairline)" }}>
          <Icon name="search" size={18} style={{ color: "var(--ink-mid)" }}/>
          <input style={{
            flex: 1, border: 0, outline: 0, background: "transparent",
            fontSize: 18, fontFamily: "var(--font-display)", letterSpacing: "0.01em",
          }} defaultValue="croix" />
          <kbd style={{
            fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 8px",
            background: "var(--parchment-warm)", border: "1px solid var(--hairline)", borderRadius: 3,
            color: "var(--ink-mid)",
          }}>esc</kbd>
        </div>

        {/* groups */}
        <div style={{ maxHeight: 480, overflow: "auto" }}>
          <Group label="Équipements · 3 résultats">
            <CmdItem icon="package" title="Croix de procession dorée" sub="FEB-0142 · Liturgie · Sacristie B" chip="Détenu" tone="bordeaux" selected/>
            <CmdItem icon="package" title="Croix de procession en bois" sub="FEB-0143 · Liturgie · Sacristie A"/>
            <CmdItem icon="package" title="Lot de 12 petites croix breton" sub="FEB-0210 · Liturgie · Local Vannes"/>
          </Group>
          <Group label="Actions">
            <CmdItem icon="plus" title="Ajouter un équipement" shortcut="N"/>
            <CmdItem icon="scan" title="Lancer une prise rapide" shortcut="S"/>
            <CmdItem icon="external" title="Ouvrir la feuille Google" shortcut="G G"/>
          </Group>
          <Group label="Naviguer">
            <CmdItem icon="home" title="Tableau de bord"/>
            <CmdItem icon="users" title="Pôles" sub="12 pôles"/>
            <CmdItem icon="map-pin" title="Lieux" sub="23 lieux de rangement"/>
          </Group>
        </div>

        {/* footer */}
        <div style={{
          display: "flex", alignItems: "center", gap: 18,
          padding: "10px 24px",
          background: "var(--parchment-warm)",
          borderTop: "1px solid var(--hairline)",
          fontSize: 11, color: "var(--ink-mid)",
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <kbd style={kbd}>↑</kbd><kbd style={kbd}>↓</kbd> Naviguer
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <kbd style={kbd}>↵</kbd> Ouvrir
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <kbd style={kbd}>⌘</kbd><kbd style={kbd}>K</kbd> Rechercher partout
          </span>
          <div style={{ flex: 1 }}/>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--bordeaux)" }}>Feiz e Breizh · Inventaire</span>
        </div>
      </div>
    </div>
  );
}

const kbd = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  padding: "1px 6px",
  background: "var(--parchment-light)",
  border: "1px solid var(--hairline-strong)",
  borderRadius: 3,
  color: "var(--ink)",
};

function Group({ label, children }) {
  return (
    <div style={{ padding: "10px 8px" }}>
      <div style={{ padding: "4px 16px 8px", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-mid)", fontWeight: 500 }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function CmdItem({ icon, title, sub, chip, tone, shortcut, selected }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "10px 16px",
      borderRadius: 6,
      background: selected ? "var(--bordeaux-wash)" : "transparent",
      border: selected ? "1px solid rgba(107,31,42,0.15)" : "1px solid transparent",
      margin: "1px 0",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 4,
        background: "var(--parchment-warm)",
        color: "var(--ink-soft)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={14}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2 }}>{sub}</div>}
      </div>
      {chip && <span className={"chip chip--" + tone}>{chip}</span>}
      {shortcut && (
        <span style={{ display: "flex", gap: 4 }}>
          {shortcut.split(" ").map((k, i) => <kbd key={i} style={kbd}>{k}</kbd>)}
        </span>
      )}
      {selected && <Icon name="chevron-right" size={14} style={{ color: "var(--bordeaux)" }}/>}
    </div>
  );
}

// ============================================================
// QR labels print sheet
// ============================================================

function QrSheet() {
  const items = [
    "FEB-0142", "FEB-0143", "FEB-0144", "FEB-0145",
    "FEB-0218", "FEB-0219", "FEB-0220", "FEB-0221",
    "FEB-0073", "FEB-0074", "FEB-0075", "FEB-0076",
  ];
  return (
    <div style={{
      width: 794, height: 1123, /* A4 portrait at 96dpi */
      background: "var(--parchment-light)",
      padding: 56,
      fontFamily: "var(--font-ui)",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 20px 40px -10px rgba(26,22,18,0.15)",
    }}>
      <div className="hermine-bg hermine-bg--light" style={{ position: "absolute", inset: 0 }}/>

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src="assets/feb-banner.png" style={{ height: 52, width: "auto" }}/>
          <div>
            <div className="t-eyebrow">Inventaire · Étiquettes</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontVariantCaps: "all-small-caps", letterSpacing: "0.08em", lineHeight: 1 }}>
              Sacristie · Armoire B
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ textAlign: "right" }}>
            <div className="t-mono">Planche · 12 étiquettes</div>
            <div style={{ fontSize: 11, color: "var(--ink-mid)" }}>Format A4 · 65×35mm</div>
          </div>
        </div>

        <div className="rule-ornament" style={{ marginTop: 22 }}>
          <span className="rule-ornament__sym">✦</span>
        </div>

        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {items.map(id => (
            <div key={id} style={{
              border: "1px dashed var(--hairline-strong)",
              borderRadius: 4,
              padding: 14,
              display: "flex", alignItems: "center", gap: 12,
              background: "var(--parchment-light)",
            }}>
              {/* mini qr */}
              <div style={{
                width: 64, height: 64,
                padding: 3, background: "var(--parchment-light)", border: "1px solid var(--hairline)",
                display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gridTemplateRows: "repeat(9, 1fr)", gap: 1,
              }}>
                {Array.from({ length: 81 }).map((_, i) => {
                  const seed = (id.charCodeAt(4) * 13 + i * 7) % 9;
                  const filled = seed < 4;
                  return <div key={i} style={{ background: filled ? "var(--ink)" : "transparent" }}/>;
                })}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.06em" }}>{id}</div>
                <div style={{ fontFamily: "var(--font-display)", fontVariantCaps: "all-small-caps", letterSpacing: "0.06em", fontSize: 14, fontWeight: 500, marginTop: 2, lineHeight: 1.2 }}>
                  Croix de procession
                </div>
                <div style={{ fontSize: 10, color: "var(--ink-mid)", marginTop: 4 }}>Liturgie · Sacristie B</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: -28, left: 0, right: 0, display: "flex", justifyContent: "space-between", color: "var(--ink-faint)", fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase" }}>
          <span>Feiz e Breizh · Inventaire</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>imprimé · 20.V.2026</span>
          <span>Page 1 / 41</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Empty state — when category is empty
// ============================================================

function EmptyState() {
  return (
    <div style={{
      width: 720, height: 540,
      background: "var(--parchment-light)",
      border: "1px solid var(--hairline)",
      borderRadius: 8,
      padding: 56,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center",
      fontFamily: "var(--font-ui)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="hermine-bg hermine-bg--light" style={{ position: "absolute", inset: 0 }}/>

      <div style={{ position: "relative" }}>
        <img src="assets/hermine.png" style={{ height: 96, opacity: 0.18, filter: "saturate(0)" }}/>

        <div className="rule-ornament" style={{ width: 320, margin: "28px auto 0" }}>
          <span className="rule-ornament__sym">✦</span>
        </div>

        <div className="t-display" style={{ fontSize: 36, marginTop: 22 }}>
          Aucun équipement dans cette catégorie
        </div>
        <p style={{ color: "var(--ink-mid)", fontSize: 14, lineHeight: 1.6, marginTop: 14, maxWidth: 420, margin: "14px auto 0" }}>
          La catégorie <strong style={{ color: "var(--ink)" }}>Drapeaux & étendards</strong> est vide. Ajoutez votre premier équipement ou importez depuis la feuille Google.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 26 }}>
          <button className="btn btn--ghost"><Icon name="import" size={14}/>Importer une feuille</button>
          <button className="btn btn--primary"><Icon name="plus" size={14}/>Ajouter un équipement</button>
        </div>
      </div>
    </div>
  );
}

window.CmdKScreen = CmdKScreen;
window.QrSheet = QrSheet;
window.EmptyState = EmptyState;
