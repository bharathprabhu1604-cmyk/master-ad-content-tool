/* SCREEN 1 — Dashboard. */
const CHANNEL_ICON = { google: "search", meta: "facebook", bing: "bing" };

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className="card" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>{label}</span>
        <div style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          background: accent === "gold" ? "var(--gold-tint)" : "#eef1f6", color: accent === "gold" ? "var(--gold)" : "var(--navy)" }}>
          <Icon name={icon} size={16} />
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: "var(--navy)", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>{sub}</div>
    </div>
  );
}

function progressOf(camp, D) {
  const filled = camp.headlines.filter(h => h.text.trim()).length;
  return Math.round((filled / 15) * 100);
}

function CampaignCard({ camp, onNav, onStatus, store }) {
  const D = window.LAMF_DATA;
  const pct = progressOf(camp, D);
  const filled = camp.headlines.filter(h => h.text.trim()).length;
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow .15s, transform .15s" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ padding: "15px 16px 12px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#eef1f6", color: "var(--blue)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="search" size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", letterSpacing: "-.01em" }}>{camp.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>Google Search · RSA</div>
            </div>
          </div>
          <StatusBadge status={camp.status} onChange={s => onStatus(camp.id, s)} size="sm" />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 5, color: "var(--ink-soft)" }}>
            <span>Headlines written</span>
            <span style={{ fontFamily: "var(--mono)", fontWeight: 500 }}>{filled}/15</span>
          </div>
          <div style={{ height: 6, background: "#eef0f3", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: pct + "%", height: "100%", borderRadius: 4,
              background: pct >= 100 ? "var(--green)" : "linear-gradient(90deg, var(--navy), var(--navy-600))", transition: "width .4s" }}></div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid var(--line)" }}>
        <button className="cardact" onClick={() => onNav("google", camp.id)}><Icon name="edit" size={14} /> Edit Copy</button>
        <button className="cardact" onClick={() => onNav("google", camp.id)}><Icon name="eye" size={14} /> Preview</button>
        <button className="cardact" onClick={() => onNav("compliance")}><Icon name="send" size={14} /> Compliance</button>
      </div>
      <style>{`.cardact{flex:1;border:none;background:#fff;padding:9px 4px;font-size:12px;font-weight:600;color:var(--ink-soft);
        display:flex;align-items:center;justify-content:center;gap:5px;border-right:1px solid var(--line);transition:background .12s;}
        .cardact:last-child{border-right:none;} .cardact:hover{background:#f5f6f8;color:var(--navy);}`}</style>
    </div>
  );
}

function DashboardScreen({ store, onNav }) {
  const D = window.LAMF_DATA;
  const camps = store.campaigns;
  const totalHL = camps.reduce((n, c) => n + c.headlines.filter(h => h.text.trim()).length, 0);
  const totalD = camps.reduce((n, c) => n + c.descriptions.filter(d => d.text.trim()).length, 0);
  const approved = camps.filter(c => c.status === "Approved" || c.status === "Live").length;
  const pending = camps.length - approved;

  const activity = [
    { who: "Priya Nair", act: "edited headlines on", what: "Personal Loan Intercept", when: "12 min ago", icon: "edit" },
    { who: "A. Mehta", act: "approved extensions for", what: "All Campaigns", when: "1 hr ago", icon: "check" },
    { who: "Rohan Das", act: "sent for review", what: "Low-Interest Loan", when: "3 hrs ago", icon: "send" },
    { who: "Sara Iyer", act: "added 5 callouts to", what: "Copy Bank", when: "Yesterday", icon: "plus" },
    { who: "System", act: "flagged 2 headlines over limit on", what: "Instant Cash", when: "Yesterday", icon: "info" },
  ];

  return (
    <div className="screen-in" style={{ padding: "24px 28px", maxWidth: 1380, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 22, alignItems: "start" }} className="dash-grid">
        <div>
          {/* stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }} className="stat-grid">
            <StatCard label="Total Campaigns" value={camps.length} sub="Google Search · RSA" icon="search" />
            <StatCard label="Headlines Written" value={totalHL} sub={`across ${camps.length} campaigns`} icon="edit" accent="gold" />
            <StatCard label="Descriptions" value={totalD} sub="ready for RSA" icon="doc" />
            <StatCard label="Compliance" value={`${approved}/${camps.length}`} sub={`${pending} pending review`} icon="compliance" accent="gold" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", letterSpacing: "-.01em" }}>Campaigns</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>LAMF @ 10.5%* p.a. · Loan Against Mutual Funds</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => onNav("google")}><Icon name="plus" size={14} /> New Campaign</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {camps.map(c => (
              <CampaignCard key={c.id} camp={c} store={store} onNav={onNav}
                onStatus={(id, s) => store.editCampaign(id, x => { x.status = s; })} />
            ))}
          </div>
        </div>

        {/* right rail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 88 }} className="dash-rail">
          {/* compliance summary */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".03em" }}>Compliance Summary</div>
            {D.statuses.map(s => {
              const n = camps.filter(c => c.status === s).length;
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0" }}>
                  <StatusBadge status={s} size="sm" />
                  <span style={{ fontFamily: "var(--mono)", fontWeight: 600, fontSize: 13, color: n ? "var(--navy)" : "var(--ink-faint)" }}>{n}</span>
                </div>
              );
            })}
            <button className="btn btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={() => onNav("compliance")}>
              <Icon name="compliance" size={14} /> Open Compliance Review
            </button>
          </div>

          {/* activity */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".03em" }}>Activity Feed</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {activity.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: "#eef1f6", color: "var(--navy)", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={a.icon} size={13} /></div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.45 }}>
                    <b style={{ color: "var(--navy)" }}>{a.who}</b> <span style={{ color: "var(--ink-soft)" }}>{a.act}</span> <b style={{ color: "var(--ink)" }}>{a.what}</b>
                    <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 1 }}>{a.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 1080px){ .dash-grid{grid-template-columns:1fr !important;} .dash-rail{position:static !important;}
        .stat-grid{grid-template-columns:repeat(2,1fr) !important;} }`}</style>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
