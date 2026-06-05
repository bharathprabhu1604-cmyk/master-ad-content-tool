/* Compliance, Tracker, Copy Bank, Guidelines, generic stubs. */

/* ================= SCREEN 6 — COMPLIANCE REVIEW ================= */
function ComplianceScreen({ store }) {
  const D = window.LAMF_DATA;
  const toast = useToast();
  const camps = store.campaigns.slice(0, 5);
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const rows = [];
  for (let i = 0; i < 15; i++) rows.push({ key: "HL" + (i + 1), type: "hl", i });
  for (let i = 0; i < 4; i++) rows.push({ key: "D" + (i + 1), type: "d", i });

  const verdicts = store.compliance;
  const setVerdict = (campId, rowKey, v) => store.setCompliance(campId, rowKey, v);
  const counts = { Approved: 0, Rejected: 0, Pending: 0 };
  camps.forEach(c => rows.forEach(r => {
    const v = (verdicts[c.id] || {})[r.key] || "Pending";
    counts[v] = (counts[v] || 0) + 1;
  }));

  const cellOf = (camp, r) => {
    const item = r.type === "hl" ? camp.headlines[r.i] : camp.descriptions[r.i];
    if (!item) return { text: "—", len: 0, pinned: false };
    return { text: item.text, len: item.text.length, pinned: item.pin != null };
  };
  const limit = (t) => t === "hl" ? 30 : 90;
  const VOPTS = ["Pending", "Approved", "Rejected", "Changes"];
  const vColor = { Pending: "#5b6573", Approved: "var(--green)", Rejected: "var(--red)", Changes: "var(--amber)" };

  return (
    <Page max={1600}>
      <div className="no-print">
        <PageHead title="Compliance Review — LAMF Ad Copy" sub={`Shriram Credit · SEBI & RBI Regulated NBFC · ${today}`}
          actions={<>
            <button className="btn" onClick={() => toast("Draft emailed to compliance@shriramcredit.com", "ok")}><Icon name="mail" size={15} /> Email to Compliance</button>
            <button className="btn btn-gold" onClick={() => window.print()}><Icon name="download" size={15} /> Export PDF</button>
          </>} />
        <div style={{ background: "var(--gold-tint)", border: "1px solid var(--gold-soft)", borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: "#7a6526", display: "flex", gap: 10, alignItems: "center" }}>
          <Icon name="info" size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />
          Please review all copy below and mark each row <b>Approved</b>, <b>Rejected</b>, or <b>Changes Required</b>. Pinned (★ gold) rows are mandatory placements. Status syncs back to the Dashboard.
        </div>
      </div>

      <div className="print-head" style={{ display: "none" }}>
        <h2 style={{ margin: 0 }}>COMPLIANCE REVIEW — LAMF Ad Copy</h2>
        <p style={{ margin: "2px 0 14px", color: "#555" }}>Shriram Credit · SEBI &amp; RBI Regulated NBFC · {today}</p>
      </div>

      <div className="card" style={{ overflow: "auto" }}>
        <table className="comp-tbl">
          <thead><tr>
            <th style={{ position: "sticky", left: 0, zIndex: 2, background: "#f7f8fa", minWidth: 56 }}>Row</th>
            {camps.map(c => <th key={c.id} style={{ minWidth: 220 }}>{c.name}</th>)}
            <th style={{ minWidth: 130 }}>Verdict (all)</th><th style={{ minWidth: 160 }}>Notes</th>
          </tr></thead>
          <tbody>
            {rows.map(r => {
              const anyPinned = camps.some(c => cellOf(c, r).pinned);
              return (
                <tr key={r.key} style={anyPinned ? { background: "var(--gold-tint)" } : {}}>
                  <td style={{ position: "sticky", left: 0, background: anyPinned ? "#faf3df" : "#fff", fontWeight: 700, fontFamily: "var(--mono)", fontSize: 12, color: anyPinned ? "var(--gold)" : "var(--ink-soft)" }}>
                    {anyPinned && "★ "}{r.key}
                  </td>
                  {camps.map(c => {
                    const cell = cellOf(c, r);
                    return (
                      <td key={c.id}>
                        <div style={{ fontSize: 12.5, lineHeight: 1.4, color: cell.text === "—" ? "var(--ink-faint)" : "var(--ink)" }}>{cell.text || "—"}</div>
                        {cell.text !== "—" && <span style={{ marginTop: 3, display: "inline-block" }}><CharPill len={cell.len} limit={limit(r.type)} /></span>}
                      </td>
                    );
                  })}
                  <td>
                    <select className="select no-print" style={{ fontSize: 12, padding: "5px 22px 5px 8px" }}
                      value={(verdicts.all || {})[r.key] || "Pending"}
                      onChange={e => { const v = e.target.value; camps.forEach(c => setVerdict(c.id, r.key, v)); store.setCompliance("all", r.key, v); }}>
                      {VOPTS.map(v => <option key={v}>{v}</option>)}
                    </select>
                  </td>
                  <td><input className="input no-print" placeholder="Add note…" style={{ fontSize: 12, padding: "5px 8px" }} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 18, padding: "14px 18px", display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, color: "var(--navy)" }}>Summary</span>
        {[["Approved", "var(--green)"], ["Rejected", "var(--red)"], ["Pending", "#5b6573"]].map(([k, col]) => (
          <span key={k} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 14 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: col }}></span>
            <b style={{ color: col }}>{counts[k] || 0}</b> <span style={{ color: "var(--ink-soft)" }}>{k}</span>
          </span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--ink-faint)" }}>{camps.length} campaigns × {rows.length} rows = {camps.length * rows.length} cells</span>
      </div>

      <style>{`.comp-tbl{width:100%;border-collapse:collapse;font-size:13px;}
        .comp-tbl th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-faint);
          font-weight:600;padding:10px 12px;border-bottom:1px solid var(--line-strong);background:#f7f8fa;}
        .comp-tbl td{padding:9px 12px;border-bottom:1px solid var(--line);border-right:1px solid var(--line);vertical-align:top;}
        .comp-tbl td:last-child{border-right:none;}
        @media print{ .no-print{display:none !important;} .sidebar,.topbar{display:none !important;}
          .print-head{display:block !important;} body{background:#fff;} .card{box-shadow:none;border:1px solid #ccc;}
          .comp-tbl{font-size:10px;} @page{size:landscape;margin:12mm;} }`}</style>
    </Page>
  );
}

/* ================= SCREEN 7 — CONTENT TRACKER ================= */
function TrackerScreen({ store }) {
  const D = window.LAMF_DATA;
  const [rows, setRows] = useState(() => store.trackerRows());
  const [fCh, setFCh] = useState("All"), [fSt, setFSt] = useState("All"), [fAs, setFAs] = useState("All");
  const channels = ["All", ...new Set(D.tracker.map(r => r[1]))];
  const assignees = ["All", ...new Set(D.tracker.map(r => r[5]))];
  const filtered = rows.filter(r =>
    (fCh === "All" || r.channel === fCh) && (fSt === "All" || r.status === fSt) && (fAs === "All" || r.assignee === fAs));
  const done = rows.filter(r => r.status === "Approved" || r.status === "Live").length;
  const pct = Math.round((done / rows.length) * 100);
  const setStatus = (id, s) => { setRows(rs => rs.map(r => r.id === id ? { ...r, status: s } : r)); store.saveTracker(rows.map(r => r.id === id ? { ...r, status: s } : r)); };

  return (
    <Page max={1500}>
      <PageHead title="Content Tracker" sub="Ad-copy production status across every channel & campaign"
        actions={<button className="btn btn-primary"><Icon name="plus" size={15} /> Add Task</button>} />
      <div className="card" style={{ padding: "14px 18px", marginBottom: 18, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{done} of {rows.length} ad units complete</span>
            <span style={{ fontFamily: "var(--mono)", fontWeight: 600, color: "var(--gold)" }}>{pct}%</span>
          </div>
          <div style={{ height: 8, background: "#eef0f3", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ width: pct + "%", height: "100%", background: "linear-gradient(90deg,var(--gold),#b8973f)", borderRadius: 5, transition: "width .4s" }}></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Icon name="filter" size={15} style={{ color: "var(--ink-faint)" }} />
          <select className="select" style={{ width: "auto", fontSize: 12.5 }} value={fCh} onChange={e => setFCh(e.target.value)}>{channels.map(c => <option key={c}>{c}</option>)}</select>
          <select className="select" style={{ width: "auto", fontSize: 12.5 }} value={fSt} onChange={e => setFSt(e.target.value)}><option>All</option>{D.statuses.map(s => <option key={s}>{s}</option>)}</select>
          <select className="select" style={{ width: "auto", fontSize: 12.5 }} value={fAs} onChange={e => setFAs(e.target.value)}>{assignees.map(a => <option key={a}>{a}</option>)}</select>
        </div>
      </div>

      <div className="card" style={{ overflow: "auto" }}>
        <table className="trk-tbl">
          <thead><tr>
            <th>#</th><th>Channel</th><th>Type</th><th>Campaign / Ad Unit</th><th>Assigned</th><th>Due</th><th>Status</th><th>Reviewer</th>
          </tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={{ fontFamily: "var(--mono)", color: "var(--ink-faint)" }}>{String(r.id).padStart(2, "0")}</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 12.5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: (D.channelMeta[r.channel] || {}).color || "#888" }}></span>{r.channel}</span></td>
                <td style={{ color: "var(--ink-soft)", fontSize: 12.5 }}>{r.type}</td>
                <td><div style={{ fontWeight: 600, color: "var(--navy)", fontSize: 13 }}>{r.campaign}</div><div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{r.unit}</div></td>
                <td style={{ fontSize: 12.5 }}>{r.assignee}</td>
                <td style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{r.due}</td>
                <td><StatusBadge status={r.status} onChange={s => setStatus(r.id, s)} size="sm" /></td>
                <td style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{r.reviewer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`.trk-tbl{width:100%;border-collapse:collapse;font-size:13px;}
        .trk-tbl th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-faint);
          font-weight:600;padding:10px 14px;border-bottom:1px solid var(--line-strong);white-space:nowrap;}
        .trk-tbl td{padding:10px 14px;border-bottom:1px solid var(--line);vertical-align:middle;}
        .trk-tbl tr:last-child td{border-bottom:none;} .trk-tbl tbody tr:hover{background:#fafbfc;}`}</style>
    </Page>
  );
}

/* ================= COPY BANK ================= */
function CopyBankScreen() {
  const C = window.LAMF_DATA.copyBank;
  const Block = ({ title, children }) => (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".03em" }}>{title}</div>
      {children}
    </div>
  );
  return (
    <Page>
      <PageHead title="Copy Bank" sub="Reusable, pre-approved LAMF building blocks — USPs, CTAs, power words & guardrails" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }} className="cb-grid">
        <Block title="USPs">
          {C.usps.map((u, i) => (
            <div key={i} style={{ padding: "8px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--navy)" }}>{u[0]}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{u[1]}</div>
            </div>
          ))}
        </Block>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Block title="Approved CTAs">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {C.ctas.map((c, i) => <span key={i} style={{ background: "var(--gold-tint)", border: "1px solid var(--gold-soft)", color: "#7a6526", borderRadius: 20, padding: "4px 11px", fontSize: 12.5, fontWeight: 500 }}>{c}</span>)}
            </div>
          </Block>
          <Block title="Power Words">
            {C.powerWords.map((p, i) => (
              <div key={i} style={{ padding: "6px 0", borderTop: i ? "1px solid var(--line)" : "none", display: "flex", gap: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 12.5, color: "var(--navy)", minWidth: 90 }}>{p[0]}</span>
                <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{p[1]}</span>
              </div>
            ))}
          </Block>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <Block title="⚠ Avoid / Do Not Use">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
            {C.avoid.map((a, i) => (
              <div key={i} style={{ background: "var(--red-bg)", borderRadius: 8, padding: "9px 11px" }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--red)" }}>{a[0]}</div>
                <div style={{ fontSize: 12, color: "#9a4040" }}>{a[1]}</div>
              </div>
            ))}
          </div>
        </Block>
      </div>
      <style>{`@media(max-width:900px){.cb-grid{grid-template-columns:1fr !important;}}`}</style>
    </Page>
  );
}

/* ================= GUIDELINES ================= */
function GuidelinesScreen() {
  const D = window.LAMF_DATA;
  const [ch, setCh] = useState("All");
  const channels = ["All", ...new Set(D.guidelines.map(g => g[0]))];
  const rows = D.guidelines.filter(g => ch === "All" || g[0] === ch);
  return (
    <Page>
      <PageHead title="Ad Copy Guidelines" sub="Character limits, asset counts & compliance rules by channel"
        actions={<select className="select" style={{ width: "auto" }} value={ch} onChange={e => setCh(e.target.value)}>{channels.map(c => <option key={c}>{c}</option>)}</select>} />
      <div className="card" style={{ overflow: "auto", marginBottom: 18 }}>
        <table className="trk-tbl">
          <thead><tr><th>Channel</th><th>Format</th><th>Asset</th><th>Min</th><th>Max</th><th>Char / Size Limit</th><th>Notes</th></tr></thead>
          <tbody>{rows.map((g, i) => (
            <tr key={i}><td style={{ fontWeight: 600, color: "var(--navy)" }}>{g[0]}</td><td style={{ color: "var(--ink-soft)" }}>{g[1]}</td>
              <td>{g[2]}</td><td style={{ fontFamily: "var(--mono)" }}>{g[3]}</td><td style={{ fontFamily: "var(--mono)" }}>{g[4]}</td>
              <td><span className="pill pill-green" style={{ background: "#eef1f6", color: "var(--navy)" }}>{g[5]}</span></td>
              <td style={{ fontSize: 12, color: "var(--ink-soft)", maxWidth: 320 }}>{g[6]}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".03em" }}>LAMF Copy Rules — Compliance</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
          {D.copyRules.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 11, padding: "4px 0" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, color: "var(--gold)", background: "var(--gold-tint)", borderRadius: 5, padding: "3px 7px", height: "fit-content", whiteSpace: "nowrap" }}>{r[0]}</span>
              <div><div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--navy)" }}>{r[1]}</div><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{r[2]}</div></div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ================= GENERIC STUB ================= */
function StubScreen({ title, sub, icon, bullets }) {
  return (
    <Page max={760}>
      <div className="card" style={{ padding: "48px 40px", textAlign: "center", marginTop: 30 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: "var(--gold-tint)", color: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <Icon name={icon} size={28} />
        </div>
        <div style={{ fontSize: 21, fontWeight: 700, color: "var(--navy)", letterSpacing: "-.01em" }}>{title}</div>
        <div style={{ fontSize: 14, color: "var(--ink-faint)", marginTop: 6, maxWidth: 420, marginInline: "auto" }}>{sub}</div>
        {bullets && (
          <div style={{ display: "inline-flex", flexDirection: "column", gap: 9, marginTop: 22, textAlign: "left" }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13, color: "var(--ink-soft)" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--gold-tint)", color: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="check" size={11} /></span>{b}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 26, fontSize: 12, color: "var(--ink-faint)", fontFamily: "var(--mono)" }}>Screen scaffolded · ready to build out next</div>
      </div>
    </Page>
  );
}

Object.assign(window, { ComplianceScreen, TrackerScreen, CopyBankScreen, GuidelinesScreen, StubScreen });
