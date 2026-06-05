/* Remaining screens: Extensions, Meta, Bing, Compliance, Tracker, CopyBank, Guidelines, + stubs. */

/* ---------- shared page wrapper ---------- */
function Page({ children, max = 1380, pad = "24px 28px" }) {
  return <div className="screen-in" style={{ padding: pad, maxWidth: max, margin: "0 auto" }}>{children}</div>;
}
function PageHead({ title, sub, actions }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
      <div>
        <div style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)", letterSpacing: "-.015em" }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: "var(--ink-faint)", marginTop: 2 }}>{sub}</div>}
      </div>
      {actions && <div style={{ display: "flex", gap: 9 }}>{actions}</div>}
    </div>
  );
}

/* ================= SCREEN 3 — EXTENSIONS ================= */
function ExtensionsScreen({ store }) {
  const D = window.LAMF_DATA;
  const toast = useToast();
  const TABS = ["Sitelinks", "Callouts", "Structured Snippets", "Image", "Promotion"];
  const [tab, setTab] = useState("Sitelinks");
  const [extra, setExtra] = useState({});
  const addRow = () => { setExtra(e => ({ ...e, [tab]: (e[tab] || 0) + 1 })); toast("New row added", "ok"); };

  const tabCss = `.exttab{padding:9px 15px;font-size:13px;font-weight:600;color:var(--ink-soft);border:none;background:none;
    border-bottom:2px solid transparent;cursor:pointer;} .exttab.on{color:var(--navy);border-bottom-color:var(--gold);}
    .exttbl{width:100%;border-collapse:collapse;font-size:13px;} .exttbl th{text-align:left;font-size:11px;text-transform:uppercase;
    letter-spacing:.05em;color:var(--ink-faint);font-weight:600;padding:9px 12px;border-bottom:1px solid var(--line);}
    .exttbl td{padding:9px 12px;border-bottom:1px solid var(--line);vertical-align:top;} .exttbl tr:last-child td{border-bottom:none;}
    .exttbl input{border:1px solid transparent;border-radius:6px;padding:5px 7px;font-size:13px;width:100%;background:transparent;}
    .exttbl input:hover{border-color:var(--line);} .exttbl input:focus{outline:none;border-color:var(--navy-600);background:#fff;box-shadow:0 0 0 3px rgba(26,43,74,.08);}`;

  return (
    <Page>
      <PageHead title="Ad Extensions Manager" sub="Sitelinks · Callouts · Structured Snippets · Images · Promotions — pre-loaded from LAMF workbook"
        actions={<button className="btn btn-primary" onClick={addRow}><Icon name="plus" size={15} /> Add Row</button>} />
      <style>{tabCss}</style>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 4, padding: "4px 10px 0", borderBottom: "1px solid var(--line)", overflowX: "auto" }}>
          {TABS.map(t => <button key={t} className={`exttab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>{t}</button>)}
        </div>

        {tab === "Sitelinks" && (
          <table className="exttbl"><thead><tr>
            <th>Account</th><th>Title (≤25)</th><th></th><th>Description 1 (≤35)</th><th></th><th>Description 2 (≤35)</th><th></th><th>Status</th>
          </tr></thead><tbody>
            {D.sitelinks.map((s, i) => (
              <tr key={i}>
                <td style={{ color: "var(--ink-faint)", whiteSpace: "nowrap", fontSize: 12 }}>LAMF Search</td>
                <td><input defaultValue={s[0]} /></td><td><CharPill len={s[0].length} limit={25} /></td>
                <td><input defaultValue={s[1]} /></td><td><CharPill len={s[1].length} limit={35} /></td>
                <td><input defaultValue={s[2]} /></td><td><CharPill len={s[2].length} limit={35} /></td>
                <td><StatusBadge status={i < 4 ? "Approved" : "Review"} size="sm" /></td>
              </tr>
            ))}
          </tbody></table>
        )}

        {tab === "Callouts" && (
          <table className="exttbl"><thead><tr><th style={{ width: 50 }}>#</th><th>Callout Text (≤25)</th><th>Chars</th><th>Status</th></tr></thead><tbody>
            {D.callouts.map((c, i) => (
              <tr key={i}>
                <td style={{ color: "var(--ink-faint)", fontFamily: "var(--mono)", fontSize: 12 }}>{String(i + 1).padStart(2, "0")}</td>
                <td><input defaultValue={c} /></td><td><CharPill len={c.length} limit={25} /></td>
                <td><StatusBadge status="Approved" size="sm" /></td>
              </tr>
            ))}
          </tbody></table>
        )}

        {tab === "Structured Snippets" && (
          <table className="exttbl"><thead><tr><th>Header</th><th>Values</th><th>Count</th></tr></thead><tbody>
            {D.snippets.map((s, i) => (
              <tr key={i}><td style={{ fontWeight: 600, color: "var(--navy)" }}>{s.header}</td>
                <td><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{s.values.map((v, j) =>
                  <span key={j} style={{ background: "#eef1f6", borderRadius: 6, padding: "3px 9px", fontSize: 12.5 }}>{v}</span>)}</div></td>
                <td style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)" }}>{s.values.length} vals</td></tr>
            ))}
          </tbody></table>
        )}

        {tab === "Image" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14, padding: 16 }}>
            {D.images.map((im, i) => (
              <div key={i} className="card" style={{ padding: 10 }}>
                <ImageSlot label={im[2]} note="drop creative" ratio={im[2] === "1200×1200" ? "1/1" : "1.91/1"} />
                <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8, color: "var(--navy)" }}>{im[0]}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{im[1]}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "Promotion" && (
          <table className="exttbl"><thead><tr><th>Occasion</th><th>Promo Text (≤25)</th><th>Chars</th><th>Start</th><th>End</th><th>Status</th></tr></thead><tbody>
            {D.promotions.map((p, i) => (
              <tr key={i}><td><input defaultValue={p[0]} /></td><td><input defaultValue={p[1]} /></td>
                <td><CharPill len={p[4]} limit={25} /></td><td style={{ color: "var(--ink-soft)" }}>{p[2] || "—"}</td>
                <td style={{ color: "var(--ink-soft)" }}>{p[3] || "—"}</td><td><StatusBadge status={i === 0 ? "Live" : "Not Started"} size="sm" /></td></tr>
            ))}
          </tbody></table>
        )}

        {extra[tab] > 0 && Array.from({ length: extra[tab] }).map((_, i) => (
          <div key={i} style={{ padding: "10px 16px", borderTop: "1px dashed var(--line-strong)", color: "var(--ink-faint)", fontSize: 12.5 }}>
            + New blank {tab} row — fill in the columns above. (Demo)
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ================= SCREEN 5 — BING (reuses Google preview) ================= */
function BingPreview({ ad }) {
  const hls = ad.headlines.filter(h => h.text.trim());
  const pinned = hls.filter(h => h.pin).sort((a, b) => a.pin - b.pin);
  const rest = hls.filter(h => !h.pin);
  const shown = [...pinned, ...rest].slice(0, 3);
  const descs = ad.descriptions.filter(d => d.text.trim());
  const path = [ad.path1, ad.path2].filter(Boolean).join("/");
  return (
    <div style={{ fontFamily: "'Segoe UI', arial, sans-serif", color: "#202124" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, fontSize: 12, color: "#5f6368" }}>
        <span style={{ fontWeight: 700, color: "#0078D4" }}>Ad</span>
        <span>·</span><span>shriramcredit.com{path ? "/" + path : ""}</span>
      </div>
      <div style={{ fontSize: 19, color: "#0078D4", lineHeight: 1.25 }}>
        {shown.map((h, i) => <span key={i}>{h.text}{i < shown.length - 1 ? <span style={{ color: "#5f6368" }}> | </span> : ""}</span>)}
        {shown.length === 0 && <span style={{ color: "#9aa0a6" }}>Headlines appear here…</span>}
      </div>
      <div style={{ fontSize: 14, color: "#4d5156", marginTop: 5 }}>{descs.slice(0, 2).map(d => d.text).join(" ") || "Descriptions appear here…"}</div>
    </div>
  );
}
function BingScreen({ store }) {
  const D = window.LAMF_DATA;
  const toast = useToast();
  const [campId, setCampId] = useState(store.bingFrom || D.campaigns[0].id);
  const camp = store.getCampaign(campId);
  const editField = (f, v) => store.editCampaign(campId, c => { c[f] = v; });
  const updateHL = (i, t) => store.editCampaign(campId, c => { c.headlines[i].text = t; });
  return (
    <div className="screen-in" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(340px,.9fr)", alignItems: "start" }}>
      <div style={{ padding: "22px 24px", borderRight: "1px solid var(--line)", minHeight: "calc(100vh - 64px)" }}>
        <PageHead title="Microsoft Bing — RSA" sub="Same RSA format as Google · 15 Headlines ≤30 · 4 Descriptions ≤90" />
        <div className="card" style={{ padding: 14, marginBottom: 16 }}>
          <label className="field-label">Campaign</label>
          <select className="select" value={campId} onChange={e => setCampId(e.target.value)}>
            {D.campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <SectionTitle hint="Identical to Google RSA limits — Bing recommends min 2 descriptions">Headlines · ≤30 chars</SectionTitle>
        <div className="card" style={{ padding: 6 }}>
          {camp.headlines.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 8px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)", width: 30 }}>HL{i + 1}</span>
              <input className="input" value={h.text} onChange={e => updateHL(i, e.target.value)} style={{ fontSize: 13 }} />
              <CharPill len={h.text.length} limit={30} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "22px 24px", position: "sticky", top: 64 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Bing Search Preview</div>
        <div className="card" style={{ padding: 16, marginBottom: 14, borderTop: "3px solid #0078D4" }}>
          <BingPreview ad={camp} />
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-soft)", background: "#eef4fb", border: "1px solid #d3e3f7", borderRadius: 8, padding: "10px 12px" }}>
          <b style={{ color: "#0066b8" }}>Reach note:</b> Also appears on Yahoo, MSN, DuckDuckGo &amp; the LinkedIn Audience Network.
        </div>
      </div>
    </div>
  );
}

/* ================= SCREEN 4 — META FACEBOOK ================= */
function MetaScreen({ store }) {
  const M = window.LAMF_DATA.meta;
  const toast = useToast();
  const TABS = ["Lead Gen", "Retargeting", "Awareness"];
  const [tab, setTab] = useState("Lead Gen");
  const [primary, setPrimary] = useState(M.primaryText.map(p => p.text));
  const [headlines, setHeadlines] = useState(M.headlines.slice());
  const [linkDesc, setLinkDesc] = useState(M.linkDesc.slice());
  const [ver, setVer] = useState(0);

  const fieldRow = (label, val, set, limit, multi, meta) => (
    <div style={{ marginBottom: 10, background: "#fff", border: "1px solid var(--line)", borderRadius: 8, padding: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>{label}{meta ? <span style={{ color: "var(--ink-faint)", fontWeight: 500 }}> · {meta}</span> : ""}</span>
        <CharPill len={val.length} limit={limit} />
      </div>
      {multi
        ? <textarea className="input" rows={2} value={val} onChange={e => set(e.target.value)} style={{ fontSize: 13, resize: "vertical" }} />
        : <input className="input" value={val} onChange={e => set(e.target.value)} style={{ fontSize: 13 }} />}
    </div>
  );

  return (
    <div className="screen-in" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(360px,.9fr)", alignItems: "start" }}>
      <div style={{ padding: "22px 24px", borderRight: "1px solid var(--line)", minHeight: "calc(100vh - 64px)" }}>
        <PageHead title="Meta — Facebook + Instagram" sub="Primary Text ≤125 (rec.) · Headline ≤40 · Link Description ≤30" />
        <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid var(--line)" }}>
          {TABS.map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 14px", fontSize: 13, fontWeight: 600,
            border: "none", background: "none", borderBottom: "2px solid " + (tab === t ? "var(--gold)" : "transparent"),
            color: tab === t ? "var(--navy)" : "var(--ink-soft)", cursor: "pointer" }}>{t}</button>)}
        </div>
        <div className="card" style={{ padding: 14, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label className="field-label">Ad Set</label><input className="input" defaultValue={M.adSet} /></div>
            <div><label className="field-label">Objective</label><input className="input" defaultValue={M.objective} /></div>
            <div style={{ gridColumn: "1/-1" }}><label className="field-label">Audience</label><input className="input" defaultValue={M.audience} /></div>
            <div><label className="field-label">CTA Button</label>
              <select className="select" defaultValue={M.cta}>{["Apply Now", "Learn More", "Get Offer", "Sign Up", "Get Quote"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="field-label">Placement</label><input className="input" defaultValue="Feed · Stories" /></div>
          </div>
        </div>

        <SectionTitle hint="Recommended ≤125 chars — truncated in feed">Primary Text · 5 versions</SectionTitle>
        {primary.map((v, i) => fieldRow(`Version ${i + 1}`, v, val => setPrimary(p => p.map((x, j) => j === i ? val : x)), M.limits.primary, true, M.primaryText[i].use))}

        <div style={{ height: 8 }}></div>
        <SectionTitle>Headline · 5 versions · ≤40</SectionTitle>
        {headlines.map((v, i) => fieldRow(`Headline ${i + 1}`, v, val => setHeadlines(h => h.map((x, j) => j === i ? val : x)), M.limits.headline))}

        <div style={{ height: 8 }}></div>
        <SectionTitle>Link Description · 5 versions · ≤30</SectionTitle>
        {linkDesc.map((v, i) => fieldRow(`Description ${i + 1}`, v, val => setLinkDesc(d => d.map((x, j) => j === i ? val : x)), M.limits.linkDesc))}
      </div>

      <div style={{ padding: "22px 24px", position: "sticky", top: 64 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: ".05em" }}>Facebook Feed Preview</div>
          <select className="select" style={{ width: "auto", fontSize: 12, padding: "4px 24px 4px 8px" }} value={ver} onChange={e => setVer(+e.target.value)}>
            {[0, 1, 2, 3, 4].map(i => <option key={i} value={i}>Version {i + 1}</option>)}
          </select>
        </div>
        <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 18 }}>
          <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1A2B4A", color: "#C8A951", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>S</div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>Shriram Credit</div>
              <div style={{ fontSize: 11.5, color: "#65676b" }}>Sponsored · <span style={{ fontSize: 11 }}>🌐</span></div>
            </div>
          </div>
          <div style={{ padding: "0 14px 12px", fontSize: 13.5, lineHeight: 1.45, color: "#1c1e21" }}>{primary[ver]}</div>
          <ImageSlot label="1200 × 628 px" note="upload creative" ratio="1.91/1" />
          <div style={{ padding: "11px 14px", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "#65676b", textTransform: "uppercase", letterSpacing: ".02em" }}>shriramcredit.com</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1c1e21", lineHeight: 1.25 }}>{headlines[ver]}</div>
              <div style={{ fontSize: 12, color: "#65676b" }}>{linkDesc[ver]}</div>
            </div>
            <button style={{ background: "#e4e6eb", border: "none", borderRadius: 6, padding: "8px 14px", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", color: "#1c1e21" }}>{M.cta}</button>
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Instagram Story</div>
        <div style={{ width: 150, margin: "0 auto" }}>
          <div style={{ aspectRatio: "9/16", borderRadius: 16, overflow: "hidden", position: "relative",
            background: "linear-gradient(160deg, #1A2B4A, #34496f)", border: "5px solid #1c2531", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--gold)", color: "var(--navy-900)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11 }}>S</div>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>shriramcredit</span>
            </div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center", lineHeight: 1.3, textShadow: "0 1px 6px rgba(0,0,0,.4)" }}>{headlines[ver]}</div>
            <button style={{ background: "var(--gold)", color: "var(--navy-900)", border: "none", borderRadius: 8, padding: "8px 0", fontWeight: 700, fontSize: 12 }}>{M.cta} ▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Page, PageHead, ExtensionsScreen, BingScreen, BingPreview, MetaScreen });
