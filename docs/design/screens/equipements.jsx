/* global React, Icon, Sidebar, TopBar */
/* eslint-disable */

// ============================================================
// Liste des équipements — desktop
// ============================================================

const EQUIPMENT = [
  { id: "FEB-0142", name: "Croix de procession dorée",         cat: "Liturgie",        pole: "Liturgie",      lieu: "Sacristie · Armoire B",      holder: "F. Le Bras", since: "12 mai 2026", state: "sortie" },
  { id: "FEB-0218", name: "Calice de pèlerinage en argent",     cat: "Liturgie",        pole: "Liturgie",      lieu: "Sacristie · Coffre",          holder: null,         since: "—",            state: "stock" },
  { id: "FEB-0073", name: "Lot de 30 bannières blanches",       cat: "Tissus",          pole: "Logistique",    lieu: "Local Vannes · Étagère 4",    holder: null,         since: "—",            state: "stock" },
  { id: "FEB-0091", name: "Sono mobile JBL EON · enceinte 1",   cat: "Son",             pole: "Technique",     lieu: "Atelier · Rack droit",        holder: "Y. Pennec",  since: "ce matin",    state: "verification" },
  { id: "FEB-0092", name: "Sono mobile JBL EON · enceinte 2",   cat: "Son",             pole: "Technique",     lieu: "Atelier · Rack droit",        holder: "Y. Pennec",  since: "ce matin",    state: "verification" },
  { id: "FEB-0301", name: "12 brassards stewards · rouge",       cat: "Habillement",     pole: "Sécurité",      lieu: "Local Auray · Caisse 2",      holder: null,         since: "—",            state: "stock" },
  { id: "FEB-0099", name: "Talkie-walkie Motorola T82 · n°04",   cat: "Communication",   pole: "Sécurité",      lieu: "Local Auray · Tiroir radios", holder: null,         since: "—",            state: "stock" },
  { id: "FEB-0188", name: "Encensoir en laiton",                 cat: "Liturgie",        pole: "Liturgie",      lieu: "Sacristie · Armoire A",       holder: null,         since: "—",            state: "stock" },
  { id: "FEB-0245", name: "Tonnelle 3×3m · blanche",             cat: "Mobilier",        pole: "Logistique",    lieu: "Local Vannes · Hangar",       holder: null,         since: "—",            state: "stock" },
  { id: "FEB-0246", name: "Tonnelle 3×3m · grise",               cat: "Mobilier",        pole: "Logistique",    lieu: "Local Vannes · Hangar",       holder: "M.-A. Tanguy", since: "il y a 1 h", state: "sortie" },
  { id: "FEB-0410", name: "Statue Notre-Dame d'Auray (35cm)",     cat: "Liturgie",        pole: "Liturgie",      lieu: "Sacristie · Vitrine 1",       holder: null,         since: "—",            state: "fragile" },
  { id: "FEB-0023", name: "Lot de 100 livrets pèlerin",           cat: "Imprimés",        pole: "Communication", lieu: "Bureau · Étagère haute",      holder: null,         since: "—",            state: "stock" },
];

function EquipementsScreen() {
  return (
    <div style={{ width: 1440, height: 980, display: "flex", background: "var(--parchment)", fontFamily: "var(--font-ui)", overflow: "hidden" }}>
      <Sidebar active="Équipements" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar
          title="Équipements"
          breadcrumb="Inventaire · 487 références"
          action={
            <>
              <button className="btn btn--ghost"><Icon name="download" size={14}/>Exporter</button>
              <button className="btn btn--primary"><Icon name="plus" size={14}/>Ajouter</button>
            </>
          }
        />

        <div style={{ flex: 1, overflow: "auto", padding: "24px 36px 40px" }}>
          {/* Filter bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 18px",
            background: "var(--parchment-light)",
            border: "1px solid var(--hairline)",
            borderRadius: 6,
            marginBottom: 18,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, color: "var(--ink-mid)" }}>
              <Icon name="search" size={14}/>
              <input className="input" style={{ height: 32, border: 0, background: "transparent", padding: 0 }} placeholder="Filtrer par nom, référence, détenteur…" defaultValue="croix"/>
            </div>
            <div style={{ height: 22, width: 1, background: "var(--hairline)" }}/>
            <FilterChip label="Pôle" value="Liturgie"/>
            <FilterChip label="Lieu"/>
            <FilterChip label="Catégorie"/>
            <FilterChip label="État" value="En stock"/>
            <button className="btn btn--quiet btn--sm" style={{ color: "var(--bordeaux)" }}>Réinitialiser</button>
            <div style={{ height: 22, width: 1, background: "var(--hairline)" }}/>
            <button className="btn btn--ghost btn--sm"><Icon name="sort" size={13}/>Trier</button>
          </div>

          {/* Result summary + bulk */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: 12, color: "var(--ink-mid)" }}>
            <span><strong style={{ color: "var(--ink)" }}>{EQUIPMENT.length}</strong> résultats · groupés par pôle</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn--quiet btn--sm">Liste</button>
              <button className="btn btn--quiet btn--sm" style={{ background: "var(--parchment-warm)", color: "var(--ink)" }}>Tableau</button>
              <button className="btn btn--quiet btn--sm">Cartes</button>
            </div>
          </div>

          {/* Table */}
          <div className="card" style={{ overflow: "hidden" }}>
            <table className="dtable">
              <thead>
                <tr>
                  <th style={{ width: 28, paddingRight: 0 }}>
                    <span style={{ display: "inline-block", width: 14, height: 14, border: "1.5px solid var(--ink-mid)", borderRadius: 2 }}/>
                  </th>
                  <th style={{ width: 110 }}>Référence</th>
                  <th>Désignation</th>
                  <th style={{ width: 130 }}>Catégorie</th>
                  <th style={{ width: 130 }}>Pôle</th>
                  <th style={{ width: 220 }}>Lieu</th>
                  <th style={{ width: 160 }}>Détenu par</th>
                  <th style={{ width: 110, textAlign: "right" }}>État</th>
                  <th style={{ width: 28 }}/>
                </tr>
              </thead>
              <tbody>
                {EQUIPMENT.map((e, i) => (
                  <Row key={e.id} e={e} selected={i === 0}/>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, fontSize: 12, color: "var(--ink-mid)" }}>
            <span>Page 1 / 41 · 50 par page</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn--quiet btn--sm"><Icon name="chevron-left" size={12}/></button>
              {["1","2","3","4","5","…","41"].map(p => (
                <button key={p} className="btn btn--quiet btn--sm" style={p === "1" ? { background: "var(--ink)", color: "var(--parchment-light)" } : {}}>{p}</button>
              ))}
              <button className="btn btn--quiet btn--sm"><Icon name="chevron-right" size={12}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, value }) {
  return (
    <button className="btn btn--ghost btn--sm" style={{
      fontWeight: 400,
      borderStyle: value ? "solid" : "dashed",
      color: value ? "var(--ink)" : "var(--ink-mid)",
    }}>
      <span style={{ color: "var(--ink-mid)" }}>{label}</span>
      {value && <><span style={{ width: 1, height: 14, background: "var(--hairline-strong)" }}/><span>{value}</span></>}
      <Icon name="chevron-down" size={12}/>
    </button>
  );
}

function Row({ e, selected }) {
  const stateMap = {
    stock:        { label: "En stock",       cls: "chip--ok",       dot: "dot--ok" },
    sortie:       { label: "Détenu",         cls: "chip--bordeaux", dot: "dot--warn" },
    verification: { label: "À vérifier",     cls: "chip--gold",     dot: "dot--warn" },
    fragile:      { label: "Fragile",        cls: "chip",           dot: "dot--danger" },
  }[e.state];
  return (
    <tr style={selected ? { background: "var(--bordeaux-wash)" } : {}}>
      <td>
        <span style={{
          display: "inline-block", width: 14, height: 14,
          border: "1.5px solid " + (selected ? "var(--bordeaux)" : "var(--ink-mid)"),
          borderRadius: 2,
          background: selected ? "var(--bordeaux)" : "transparent",
          position: "relative",
        }}>
          {selected && <Icon name="check" size={10} style={{ position: "absolute", inset: 0, color: "var(--parchment-light)" }}/>}
        </span>
      </td>
      <td className="cell-id">{e.id}</td>
      <td>
        <div className="cell-strong">{e.name}</div>
      </td>
      <td><span className="chip">{e.cat}</span></td>
      <td>
        <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>{e.pole}</span>
      </td>
      <td style={{ fontSize: 13, color: "var(--ink-soft)" }}>
        <Icon name="map-pin" size={12} style={{ verticalAlign: -2, color: "var(--ink-faint)", marginRight: 6 }}/>
        {e.lieu}
      </td>
      <td>
        {e.holder ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 3,
              background: "var(--parchment-warm)", color: "var(--ink)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 10, letterSpacing: 0.5,
            }}>{e.holder.split(" ").map(s=>s[0]).join("").replace(".","").slice(0,2)}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{e.holder}</div>
              <div style={{ fontSize: 10, color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>{e.since}</div>
            </div>
          </div>
        ) : <span style={{ color: "var(--ink-faint)" }}>—</span>}
      </td>
      <td style={{ textAlign: "right" }}>
        <span className={"chip " + stateMap.cls}>
          <span className={"dot " + stateMap.dot}/>
          {stateMap.label}
        </span>
      </td>
      <td>
        <button className="btn btn--quiet btn--icon btn--sm"><Icon name="more" size={14}/></button>
      </td>
    </tr>
  );
}

window.EquipementsScreen = EquipementsScreen;
