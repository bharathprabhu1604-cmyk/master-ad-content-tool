/* Left sidebar navigation. */
const NAV_GROUPS = [
  [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  ],
  [
    { id: "google", label: "Google Search", icon: "search" },
    { id: "extensions", label: "Extensions", icon: "plug" },
    { id: "display", label: "Display · PMax", icon: "display" },
    { id: "demandgen", label: "Demand Gen", icon: "spark" },
    { id: "meta", label: "Meta Facebook", icon: "facebook" },
    { id: "bing", label: "Microsoft Bing", icon: "bing" },
  ],
  [
    { id: "compliance", label: "Compliance Review", icon: "compliance" },
    { id: "tracker", label: "Content Tracker", icon: "chart" },
    { id: "copybank", label: "Copy Bank", icon: "copybank" },
    { id: "guidelines", label: "Guidelines", icon: "ruler" },
  ],
  [
    { id: "settings", label: "Settings", icon: "settings" },
  ],
];

const sidebarCss = `
.sidebar { width: var(--sidebar-w); flex-shrink: 0; background: var(--navy-900); color: #c7d0de;
  display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; }
.sidebar-logo { padding: 18px 20px 16px; display: flex; align-items: center; gap: 11px;
  border-bottom: 1px solid rgba(255,255,255,.07); }
.sidebar-mark { width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  background: linear-gradient(150deg, var(--gold), #b8973f); display: flex; align-items: center; justify-content: center;
  font-weight: 800; color: var(--navy-900); font-size: 16px; box-shadow: 0 2px 8px rgba(200,169,81,.35); }
.sidebar-brand { line-height: 1.15; }
.sidebar-brand .b1 { color: #fff; font-weight: 700; font-size: 13.5px; letter-spacing: -.1px; }
.sidebar-brand .b2 { color: var(--gold); font-weight: 600; font-size: 11px; letter-spacing: .04em; text-transform: uppercase; }
.nav { flex: 1; overflow-y: auto; padding: 10px 12px; }
.nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-color: transparent; }
.nav-group { padding: 6px 0; }
.nav-group + .nav-group { border-top: 1px solid rgba(255,255,255,.07); }
.nav-item { display: flex; align-items: center; gap: 11px; padding: 9px 12px; border-radius: 8px;
  color: #aab4c4; font-weight: 500; font-size: 13.5px; cursor: pointer; position: relative;
  border-left: 3px solid transparent; transition: background .13s, color .13s; margin: 1px 0; }
.nav-item:hover { background: rgba(255,255,255,.06); color: #e7ecf3; }
.nav-item .ic { opacity: .8; flex-shrink: 0; }
.nav-item.active { background: var(--navy-700); color: #fff; border-left-color: var(--gold); font-weight: 600; }
.nav-item.active .ic { opacity: 1; color: var(--gold); }
.nav-item .nav-count { margin-left: auto; font-size: 10.5px; font-family: var(--mono); background: rgba(255,255,255,.1);
  color: #cbd4e1; padding: 1px 6px; border-radius: 10px; }
.nav-item.active .nav-count { background: rgba(200,169,81,.22); color: var(--gold); }
.sidebar-foot { padding: 14px 18px; border-top: 1px solid rgba(255,255,255,.07); font-size: 11px; color: #6f7b8e; }
.sidebar-foot .reg { display: flex; align-items: center; gap: 6px; color: #93cda9; font-weight: 600; margin-bottom: 4px; }
@media (max-width: 860px) { .sidebar { display: none; } }
`;

function Sidebar({ active, onNav, counts }) {
  return (
    <aside className="sidebar">
      <style>{sidebarCss}</style>
      <div className="sidebar-logo">
        <div className="sidebar-mark">S</div>
        <div className="sidebar-brand">
          <div className="b1">Shriram Credit</div>
          <div className="b2">LAMF Ad Tool</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_GROUPS.map((group, gi) => (
          <div className="nav-group" key={gi}>
            {group.map(item => (
              <div key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => onNav(item.id)}>
                <Icon name={item.icon} size={17} className="ic" stroke={1.7} />
                <span>{item.label}</span>
                {counts && counts[item.id] != null && <span className="nav-count">{counts[item.id]}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="reg"><Icon name="compliance" size={13} /> SEBI &amp; RBI Regulated</div>
        Shriram Credit · since 1974
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar, NAV_GROUPS });
