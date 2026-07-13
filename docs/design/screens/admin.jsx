/* global React, Icon, Sidebar, TopBar */
/* eslint-disable */

// ============================================================
// Admin · Utilisateurs + référentiel Pôles/Lieux
// ============================================================

function AdminScreen() {
  return (
    <div style={{ width: 1440, height: 980, display: "flex", background: "var(--parchment)", fontFamily: "var(--font-ui)", overflow: "hidden" }}>
      <Sidebar active="Utilisateurs" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar
          title="Administration"
          breadcrumb="Comptes · pôles · lieux · catégories"
          action={
            <>
              <button className="btn btn--ghost"><Icon name="external" size={14}/>Ouvrir la feuille</button>
              <button className="btn btn--primary"><Icon name="plus" size={14}/>Inviter</button>
            </>
          }
        />

        <div style={{ flex: 1, overflow: "auto", padding: "24px 36px 40px" }}>
          {/* Tabs */}
          <div className="tabs" style={{ marginBottom: 22 }}>
            <div className="tab active">Utilisateurs <span className="chip" style={{ marginLeft: 6, height: 18, fontSize: 10 }}>34</span></div>
            <div className="tab">Pôles <span className="chip" style={{ marginLeft: 6, height: 18, fontSize: 10 }}>12</span></div>
            <div className="tab">Lieux <span className="chip" style={{ marginLeft: 6, height: 18, fontSize: 10 }}>23</span></div>
            <div className="tab">Catégories <span className="chip" style={{ marginLeft: 6, height: 18, fontSize: 10 }}>18</span></div>
            <div className="tab">Paramètres</div>
          </div>

          {/* Role overview */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 22 }}>
            <RoleCard
              role="Administrateurs"
              count="4"
              tone="bordeaux"
              desc="Gèrent les comptes, pôles, lieux, catégories et l'inventaire complet."
              users={["A. Le Goff", "G. Quéméré", "M. Bourdiec", "P. Cariou"]}
            />
            <RoleCard
              role="Responsables de pôle"
              count="11"
              tone="ink"
              desc="Lecture globale · écriture restreinte au pôle dont ils ont la charge."
              users={["F. Le Bras", "Y. Pennec", "M.-A. Tanguy", "S. Riou", "+ 7"]}
            />
            <RoleCard
              role="Lecteurs"
              count="19"
              tone="quiet"
              desc="Bénévoles avec consultation seule — utile pour repérer un objet sans tout modifier."
              users={["L. Calvez", "T. Cadiou", "+ 17"]}
            />
          </div>

          {/* Users table */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div className="card-header">
              <div className="card-title">Liste des comptes</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "0 10px", height: 28,
                  border: "1px solid var(--hairline-strong)", borderRadius: 4,
                  fontSize: 12, color: "var(--ink-mid)",
                }}>
                  <Icon name="search" size={12}/> <span>Filtrer un nom, un email…</span>
                </div>
                <button className="btn btn--ghost btn--sm"><Icon name="filter" size={12}/>Filtres</button>
              </div>
            </div>
            <table className="dtable">
              <thead>
                <tr>
                  <th>Membre</th>
                  <th style={{ width: 200 }}>Email</th>
                  <th style={{ width: 180 }}>Rôle</th>
                  <th style={{ width: 180 }}>Pôle</th>
                  <th style={{ width: 140 }}>Auth.</th>
                  <th style={{ width: 130 }}>Dernière act.</th>
                  <th style={{ width: 40 }}/>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Anne Le Goff",        email: "anne.le-goff@feb.bzh",   role: "admin",          pole: "—",            auth: "google",       last: "à l'instant", you: true },
                  { name: "Père G. Quéméré",     email: "g.quemere@diocese56.fr", role: "admin",          pole: "—",            auth: "google",       last: "14 min" },
                  { name: "François Le Bras",     email: "f.lebras@feb.bzh",        role: "responsable",   pole: "Liturgie",     auth: "credentials",  last: "1 h" },
                  { name: "Marie-Anne Tanguy",    email: "ma.tanguy@feb.bzh",       role: "responsable",   pole: "Logistique",   auth: "google",       last: "1 h" },
                  { name: "Yves Pennec",          email: "y.pennec@feb.bzh",        role: "responsable",   pole: "Technique",    auth: "credentials",  last: "ce matin" },
                  { name: "Soizic Riou",          email: "s.riou@feb.bzh",          role: "responsable",   pole: "Sécurité",     auth: "google",       last: "hier" },
                  { name: "Loïc Calvez",          email: "l.calvez@gmail.com",      role: "lecteur",        pole: "—",            auth: "google",       last: "il y a 3 j" },
                  { name: "Tudual Cadiou",        email: "t.cadiou@gmail.com",      role: "lecteur",        pole: "—",            auth: "pending",      last: "—" },
                ].map(u => <UserRow key={u.email} u={u}/>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ role, count, desc, users, tone }) {
  const bg = tone === "bordeaux" ? "var(--bordeaux)" : tone === "ink" ? "var(--ink)" : "var(--parchment-light)";
  const fg = tone === "quiet" ? "var(--ink)" : "var(--parchment-light)";
  const sub = tone === "quiet" ? "var(--ink-mid)" : "rgba(244,237,224,0.7)";
  return (
    <div style={{
      borderRadius: 6,
      padding: 22,
      background: bg,
      color: fg,
      border: tone === "quiet" ? "1px solid var(--hairline)" : "0",
      position: "relative",
      overflow: "hidden",
    }}>
      {tone !== "quiet" && (
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('assets/hermine.png')", backgroundSize: 48, filter: "invert(1)", opacity: 0.06 }}/>
      )}
      <div style={{ position: "relative" }}>
        <div className="t-mono" style={{ color: sub }}>Rôle</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 4 }}>
          <div style={{ fontFamily: "var(--font-display)", fontVariantCaps: "all-small-caps", letterSpacing: "0.08em", fontSize: 22, fontWeight: 500 }}>{role}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 500, lineHeight: 1 }}>{count}</div>
        </div>
        <div style={{ fontSize: 12.5, color: sub, marginTop: 10, lineHeight: 1.55 }}>{desc}</div>
        <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {users.map((u, i) => (
            <span key={i} style={{
              padding: "3px 8px",
              borderRadius: 3,
              fontSize: 11,
              background: tone === "quiet" ? "var(--parchment-warm)" : "rgba(244,237,224,0.10)",
              color: tone === "quiet" ? "var(--ink-soft)" : "rgba(244,237,224,0.85)",
            }}>{u}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserRow({ u }) {
  const roleMap = {
    admin:       { label: "Administrateur",  cls: "chip--bordeaux" },
    responsable: { label: "Responsable",     cls: "chip--ink" },
    lecteur:     { label: "Lecteur",         cls: "chip" },
  };
  const authMap = {
    google:      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                   <span style={{ width: 10, height: 10, borderRadius: 2, background: "conic-gradient(from 0deg, #EA4335 0 25%, #FBBC05 0 50%, #34A853 0 75%, #4285F4 0)" }}/>
                   Google
                 </span>,
    credentials: <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                   <Icon name="key" size={11} style={{ color: "var(--ink-mid)" }}/>
                   Mot de passe
                 </span>,
    pending:     <span className="chip chip--gold" style={{ height: 18, fontSize: 10 }}>en attente</span>,
  };
  return (
    <tr style={u.you ? { background: "var(--bordeaux-wash)" } : {}}>
      <td>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{
            width: 30, height: 30, borderRadius: 4,
            background: u.role === "admin" ? "var(--bordeaux)" : "var(--parchment-warm)",
            color: u.role === "admin" ? "var(--parchment-light)" : "var(--ink)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, letterSpacing: 0.5,
          }}>{u.name.split(" ").map(s => s[0]).join("").replace(".","").slice(0,2)}</div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13 }}>{u.name}{u.you && <span style={{ marginLeft: 6, color: "var(--bordeaux)", fontSize: 11 }}>(vous)</span>}</div>
            <div style={{ fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>{u.email}</div>
          </div>
        </div>
      </td>
      <td className="cell-id">{u.email}</td>
      <td><span className={"chip " + roleMap[u.role].cls}>{roleMap[u.role].label}</span></td>
      <td style={{ color: "var(--ink-soft)" }}>{u.pole}</td>
      <td style={{ fontSize: 12, color: "var(--ink-soft)" }}>{authMap[u.auth]}</td>
      <td style={{ fontSize: 12, color: "var(--ink-mid)", fontFamily: "var(--font-mono)" }}>{u.last}</td>
      <td>
        <button className="btn btn--quiet btn--icon btn--sm"><Icon name="more" size={14}/></button>
      </td>
    </tr>
  );
}

window.AdminScreen = AdminScreen;
