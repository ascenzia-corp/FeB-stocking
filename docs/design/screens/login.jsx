/* global React, Icon, Oriflamme, Wordmark, HermineMark, OrnamentRule */
/* eslint-disable */

// ============================================================
// Login screen — split panel, oriflamme cinematic on left
// ============================================================

function LoginScreen() {
  return (
    <div style={{
      width: 1440, height: 900,
      display: "grid", gridTemplateColumns: "560px 1fr",
      background: "var(--parchment)",
      fontFamily: "var(--font-ui)",
      overflow: "hidden",
    }}>
      {/* Left: cinematic oriflamme */}
      <div style={{
        background: "var(--ink)",
        position: "relative",
        overflow: "hidden",
        color: "var(--parchment)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
      }}>
        {/* Dense hermine field */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('assets/hermine.png')",
          backgroundSize: 72,
          backgroundRepeat: "repeat",
          filter: "invert(1)",
          opacity: 0.05,
        }}/>

        {/* Subtle radial glow behind banner */}
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 720, height: 720,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(164,123,58,0.10) 0%, rgba(0,0,0,0) 60%)",
          pointerEvents: "none",
        }}/>

        {/* Big banner — oriflamme only (no wordmark) */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <img src="assets/feb-banner-noir.png" alt="Oriflamme Feiz e Breizh"
               style={{ height: 640, width: "auto", filter: "invert(1) brightness(1.08)" }}/>
        </div>

        {/* Wordmark below, in our own type */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          top: "calc(50% + 360px)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontVariantCaps: "all-small-caps",
          letterSpacing: "0.32em",
          fontSize: 18,
          color: "rgba(244,237,224,0.85)",
          fontWeight: 500,
        }}>
          Feiz <span style={{ fontStyle: "italic", letterSpacing: 0, opacity: 0.6, margin: "0 4px" }}>e</span> Breizh
        </div>

        {/* Top tagline */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 28, height: 1, background: "rgba(244,237,224,0.4)" }}/>
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(244,237,224,0.6)" }}>
            Pèlerinage breton · Sainte-Anne-d'Auray
          </span>
        </div>

        {/* Bottom motto */}
        <div style={{ position: "relative" }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "rgba(244,237,224,0.85)",
            lineHeight: 1.35,
            maxWidth: 380,
          }}>
            « Itron Varia Wened, pedit evidomp »
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "rgba(244,237,224,0.5)", letterSpacing: "0.06em" }}>
            Notre-Dame d'Auray, priez pour nous.
          </div>
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(244,237,224,0.4)", letterSpacing: "0.10em" }}>
              INVENTAIRE · MMXXVI
            </span>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div style={{
        position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "48px 64px",
      }}>
        <div className="hermine-bg hermine-bg--light" style={{ position: "absolute", inset: 0 }}/>

        <div style={{ width: 380, position: "relative" }}>
          {/* Mini brand block */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <img src="assets/feb-banner.png" alt="" style={{ height: 52, width: "auto" }}/>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, lineHeight: 1 }}>Inventaire</div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mid)", marginTop: 3 }}>
                Feiz e Breizh
              </div>
            </div>
          </div>

          <div className="t-eyebrow">Connexion</div>
          <h1 className="t-display" style={{ fontSize: 36, marginTop: 4 }}>
            Bienvenue au<br/>chapitre.
          </h1>
          <p style={{ color: "var(--ink-mid)", fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>
            Accès réservé aux bénévoles inscrits. Les comptes sont créés par un administrateur — pas d'inscription libre.
          </p>

          {/* Google */}
          <button className="btn btn--ghost btn--lg" style={{ width: "100%", marginTop: 28, justifyContent: "center", gap: 10 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 18, height: 18, borderRadius: 2,
              background: "conic-gradient(from 0deg, #EA4335 0 25%, #FBBC05 0 50%, #34A853 0 75%, #4285F4 0)",
              opacity: 0.9,
            }}/>
            Continuer avec Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0", color: "var(--ink-faint)" }}>
            <span style={{ flex: 1, height: 1, background: "var(--hairline)" }}/>
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13, color: "var(--bordeaux)" }}>ou</span>
            <span style={{ flex: 1, height: 1, background: "var(--hairline)" }}/>
          </div>

          {/* Email/password */}
          <div>
            <label className="field-label">Adresse e-mail</label>
            <input className="input input--lg" defaultValue="anne.le-goff@feb.bzh"/>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label className="field-label">Mot de passe</label>
              <a href="#" style={{ fontSize: 11, color: "var(--bordeaux)", letterSpacing: "0.04em" }}>Oublié ?</a>
            </div>
            <input className="input input--lg" type="password" defaultValue="••••••••••••"/>
          </div>

          <button className="btn btn--primary btn--lg" style={{ width: "100%", marginTop: 24, justifyContent: "center" }}>
            Entrer dans l'application <Icon name="arrow-right" size={16}/>
          </button>

          <div style={{ marginTop: 28, padding: "14px 16px", border: "1px solid var(--hairline)", borderRadius: 6, background: "var(--parchment-light)", fontSize: 12, color: "var(--ink-mid)", display: "flex", gap: 10 }}>
            <Icon name="shield" size={16} style={{ color: "var(--bordeaux)", flexShrink: 0, marginTop: 1 }}/>
            <div>
              Votre adresse doit déjà figurer dans la feuille <span style={{ fontFamily: "var(--font-mono)" }}>Utilisateurs</span>. Si ce n'est pas le cas, contactez un responsable de pôle.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.LoginScreen = LoginScreen;
