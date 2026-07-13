/* global React */
/* eslint-disable */

// ============================================================
// Feiz e Breizh — Shared atoms & brand marks
// ============================================================

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Logo + Brand ----------------------------------------------------

function Oriflamme({ size = 56, tone = "dark" }) {
  // The actual logo banner asset. tone "dark" = black banner on light bg, "light" = light banner on dark bg
  const src = tone === "light" ? "assets/feb-logo-noir.png" : "assets/feb-logo.png";
  return (
    <img src={src} alt="Feiz e Breizh" style={{
      height: size,
      width: "auto",
      objectFit: "contain",
      filter: tone === "light" ? "invert(1) brightness(1.1)" : "none",
    }} />
  );
}

function Wordmark({ size = 24, color }) {
  // Stylised text wordmark using a Libra-ish display feel via Cormorant + italic 'e'
  return (
    <div style={{
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: size,
      letterSpacing: "0.01em",
      lineHeight: 1,
      color: color || "inherit",
      display: "flex",
      alignItems: "baseline",
      gap: size * 0.18,
    }}>
      <span style={{ fontVariant: "small-caps", letterSpacing: "0.04em" }}>Feiz</span>
      <span style={{ fontStyle: "italic", opacity: 0.7, fontSize: size * 0.82 }}>e</span>
      <span style={{ fontVariant: "small-caps", letterSpacing: "0.04em" }}>Breizh</span>
    </div>
  );
}

function HermineMark({ size = 18, color = "currentColor" }) {
  // Pure CSS hermine using the actual asset, recolored via filter or simply via opacity background
  return (
    <span style={{
      display: "inline-block",
      width: size,
      height: size * 1.6,
      backgroundImage: "url('assets/hermine.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      verticalAlign: "middle",
    }} />
  );
}

// Decorative double rule with center ornament
function OrnamentRule({ symbol = "✦", color }) {
  return (
    <div className="rule-ornament" style={color ? { color } : {}}>
      <span className="rule-ornament__sym">{symbol}</span>
    </div>
  );
}

// ---------- Icons (line) ----------------------------------------------------
// Tiny stroke icons — kept simple geometric (per guidance, no complex SVG)

function Icon({ name, size = 16, stroke = 1.5, style }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
  };
  switch (name) {
    case "search":
      return (<svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>);
    case "plus":
      return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case "chevron-down":
      return (<svg {...props}><path d="m6 9 6 6 6-6"/></svg>);
    case "chevron-right":
      return (<svg {...props}><path d="m9 6 6 6-6 6"/></svg>);
    case "chevron-left":
      return (<svg {...props}><path d="m15 6-6 6 6 6"/></svg>);
    case "arrow-right":
      return (<svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>);
    case "filter":
      return (<svg {...props}><path d="M4 5h16M7 12h10M10 19h4"/></svg>);
    case "more":
      return (<svg {...props}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>);
    case "edit":
      return (<svg {...props}><path d="M4 20h4l10-10-4-4L4 16v4Z"/><path d="m14 6 4 4"/></svg>);
    case "trash":
      return (<svg {...props}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>);
    case "user":
      return (<svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>);
    case "users":
      return (<svg {...props}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.5a3.5 3.5 0 0 1 0 7"/><path d="M21 20c0-2.5-1.5-4.7-3.7-5.6"/></svg>);
    case "box":
      return (<svg {...props}><path d="M3 7l9-4 9 4M3 7v10l9 4 9-4V7M3 7l9 4 9-4M12 11v10"/></svg>);
    case "tag":
      return (<svg {...props}><path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="8" cy="8" r="1.5"/></svg>);
    case "map-pin":
      return (<svg {...props}><path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>);
    case "category":
      return (<svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>);
    case "home":
      return (<svg {...props}><path d="M4 11 12 4l8 7v9h-5v-6h-6v6H4v-9Z"/></svg>);
    case "settings":
      return (<svg {...props}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>);
    case "log-out":
      return (<svg {...props}><path d="M15 4h4v16h-4"/><path d="M10 8l-4 4 4 4"/><path d="M6 12h10"/></svg>);
    case "clock":
      return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case "qr":
      return (<svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M20 14v3M14 20h3M20 20v1"/></svg>);
    case "print":
      return (<svg {...props}><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="9" rx="1"/><path d="M6 14h12v7H6z"/></svg>);
    case "download":
      return (<svg {...props}><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>);
    case "check":
      return (<svg {...props}><path d="m5 13 4 4 10-10"/></svg>);
    case "x":
      return (<svg {...props}><path d="M6 6l12 12M18 6 6 18"/></svg>);
    case "history":
      return (<svg {...props}><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v6l4 2"/></svg>);
    case "calendar":
      return (<svg {...props}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>);
    case "package":
      return (<svg {...props}><path d="M3 7v10l9 4 9-4V7l-9-4-9 4Z"/><path d="m3 7 9 4 9-4M12 11v10"/></svg>);
    case "sort":
      return (<svg {...props}><path d="M7 4v16M3 8l4-4 4 4M17 20V4M21 16l-4 4-4-4"/></svg>);
    case "shield":
      return (<svg {...props}><path d="M12 3 4 6v6c0 5 3.6 8.5 8 9 4.4-.5 8-4 8-9V6l-8-3Z"/></svg>);
    case "key":
      return (<svg {...props}><circle cx="8" cy="14" r="4"/><path d="m11 11 9-9M16 5l3 3M14 7l3 3"/></svg>);
    case "cross-celtic":
      return (<svg {...props} viewBox="0 0 24 24"><path d="M12 2v20M5 12h14"/><circle cx="12" cy="12" r="4"/></svg>);
    case "bell":
      return (<svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>);
    case "scan":
      return (<svg {...props}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10"/></svg>);
    case "import":
      return (<svg {...props}><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/></svg>);
    case "menu":
      return (<svg {...props}><path d="M4 6h16M4 12h16M4 18h16"/></svg>);
    case "external":
      return (<svg {...props}><path d="M14 4h6v6M20 4l-9 9M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>);
    default:
      return null;
  }
}

// ---------- Frame / artboard wrappers --------------------------------------

function ScreenFrame({ width = 1440, height, children, label, sub, bg = "var(--parchment)" }) {
  return (
    <div style={{
      width,
      ...(height ? { height } : {}),
      background: bg,
      color: "var(--ink)",
      fontFamily: "var(--font-ui)",
      overflow: "hidden",
      position: "relative",
    }}>
      {children}
    </div>
  );
}

// ---------- A reusable sidebar (live in screens) ---------------------------

function Sidebar({ active = "Équipements", role = "admin", user = { name: "Anne Le Goff", initials: "AL" } }) {
  const main = [
    { name: "Tableau de bord", icon: "home", count: null, key: "Tableau de bord" },
    { name: "Équipements", icon: "package", count: 487, key: "Équipements" },
    { name: "Prise rapide", icon: "scan", count: null, key: "Prise rapide" },
    { name: "Historique", icon: "history", count: null, key: "Historique" },
  ];
  const ref = [
    { name: "Pôles", icon: "users", count: 12, key: "Pôles" },
    { name: "Lieux", icon: "map-pin", count: 23, key: "Lieux" },
    { name: "Catégories", icon: "category", count: 18, key: "Catégories" },
  ];
  const admin = [
    { name: "Utilisateurs", icon: "shield", count: 34, key: "Utilisateurs" },
    { name: "Paramètres", icon: "settings", count: null, key: "Paramètres" },
  ];

  const renderItems = (items) => items.map(it => (
    <div key={it.key} className={"nav-item" + (active === it.key ? " active" : "")}>
      <Icon name={it.icon} size={15} stroke={1.5}/>
      <span>{it.name}</span>
      {it.count != null && <span className="nav-item__count">{it.count}</span>}
    </div>
  ));

  return (
    <aside className="sidebar">
      <div className="sidebar__hermine-pattern" />
      <div className="sidebar__brand">
        <img src="assets/feb-banner-noir.png" alt="" style={{ height: 52, width: "auto", filter: "invert(1) brightness(1.05)" }}/>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, letterSpacing: 0.5, color: "var(--parchment-light)" }}>
            Inventaire
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,237,224,0.5)", marginTop: 2 }}>
            Feiz e Breizh
          </div>
        </div>
      </div>
      <div className="sidebar__nav">
        {renderItems(main)}
        <div className="nav-section">Référentiels</div>
        {renderItems(ref)}
        <div className="nav-section">Administration</div>
        {renderItems(admin)}
      </div>
      <div className="sidebar__foot">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 4,
            background: "var(--bordeaux)", color: "var(--parchment-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, letterSpacing: 0.5,
          }}>{user.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "var(--parchment-light)", fontWeight: 500 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: "rgba(244,237,224,0.5)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {role === "admin" ? "Administrateur" : role === "responsable_pole" ? "Resp. pôle" : "Lecteur"}
            </div>
          </div>
          <Icon name="log-out" size={15} style={{ color: "rgba(244,237,224,0.5)" }}/>
        </div>
      </div>
    </aside>
  );
}

// ---------- TopBar ----------------------------------------------------------

function TopBar({ title, breadcrumb, action, search = true }) {
  return (
    <div className="topbar">
      <div>
        {breadcrumb && (
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mid)", marginBottom: 4 }}>
            {breadcrumb}
          </div>
        )}
        <div style={{ fontFamily: "var(--font-display)", fontVariantCaps: "all-small-caps", letterSpacing: "0.10em", fontSize: 22, fontWeight: 500, lineHeight: 1 }}>
          {title}
        </div>
      </div>
      {search && (
        <div className="searchbar" style={{ marginLeft: 24 }}>
          <Icon name="search" size={14} stroke={1.6}/>
          <span style={{ color: "var(--ink-faint)" }}>Rechercher un équipement, un lieu, une personne…</span>
          <div style={{ flex: 1 }}/>
          <kbd>⌘K</kbd>
        </div>
      )}
      <div style={{ flex: 1 }}/>
      <button className="btn btn--quiet btn--icon" title="Notifications">
        <Icon name="bell" size={16}/>
      </button>
      {action}
    </div>
  );
}

// ---------- Make available globally ----------------------------------------

Object.assign(window, {
  Oriflamme, Wordmark, HermineMark, OrnamentRule, Icon,
  ScreenFrame, Sidebar, TopBar,
});
