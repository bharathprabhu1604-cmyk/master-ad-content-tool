/* SCREEN 2 — Google Search Ad Writer (HERO). Left copy editor + right live previews. */

/* --- A single editable copy row (headline or description) --- */
function CopyRow({ idx, prefix, item, limit, onText, onPin, multiline }) {
  const len = item.text.length;
  const pinned = item.pin != null;
  return (
    <div style={{
      display: "flex", alignItems: multiline ? "flex-start" : "center", gap: 9, padding: "6px 8px",
      borderRadius: 8, background: pinned ? "var(--gold-tint)" : "transparent",
      boxShadow: pinned ? "inset 0 0 0 1px var(--gold-soft)" : "none", transition: "background .15s",
    }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)", width: 30, flexShrink: 0,
        fontWeight: 500, paddingTop: multiline ? 9 : 0 }}>{prefix}{idx + 1}</span>
      <button title={pinned ? `Pinned to position ${item.pin}` : "Pin position"} onClick={() => onPin(idx)}
        style={{ flexShrink: 0, border: "none", background: pinned ? "var(--gold)" : "#eef0f3",
          width: 26, height: 26, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
          color: pinned ? "var(--navy-900)" : "var(--ink-faint)", marginTop: multiline ? 6 : 0,
          boxShadow: pinned ? "0 1px 4px rgba(200,169,81,.4)" : "none" }}>
        {pinned ? <Icon name="pin" size={13} fill /> : <Icon name="pin" size={13} />}
        {pinned && <span style={{ position: "absolute", fontSize: 8, fontWeight: 800, marginTop: 18, marginLeft: 1 }}></span>}
      </button>
      {multiline ? (
        <textarea className="input" rows={2} value={item.text} onChange={e => onText(idx, e.target.value)}
          style={{ resize: "vertical", lineHeight: 1.45, fontSize: 13, minHeight: 52 }} />
      ) : (
        <input className="input" value={item.text} onChange={e => onText(idx, e.target.value)} style={{ fontSize: 13 }} />
      )}
      <span style={{ flexShrink: 0, marginTop: multiline ? 9 : 0 }}><CharPill len={len} limit={limit} /></span>
      {pinned && <span style={{ flexShrink: 0, fontFamily: "var(--mono)", fontSize: 10, fontWeight: 600, color: "var(--gold)",
        background: "#fff", border: "1px solid var(--gold-soft)", borderRadius: 5, padding: "2px 5px", marginTop: multiline ? 8 : 0 }}>
        PIN {item.pin}</span>}
    </div>
  );
}

/* --- Google desktop ad preview --- */
function GooglePreview({ ad, mobile }) {
  const hls = ad.headlines.filter(h => h.text.trim());
  // pinned first by position, then rest
  const pinned = hls.filter(h => h.pin).sort((a, b) => a.pin - b.pin);
  const unpinned = hls.filter(h => !h.pin);
  const ordered = [];
  const used = new Set();
  for (let pos = 1; pos <= 3; pos++) {
    const p = pinned.find(h => h.pin === pos && !used.has(h));
    if (p) { ordered.push(p); used.add(p); }
    else { const u = unpinned.find(h => !used.has(h)); if (u) { ordered.push(u); used.add(u); } }
  }
  const shownHls = mobile ? ordered.slice(0, 2) : ordered.slice(0, 3);
  const descs = ad.descriptions.filter(d => d.text.trim());
  const dPin = descs.filter(d => d.pin).sort((a, b) => a.pin - b.pin);
  const dRest = descs.filter(d => !d.pin);
  const shownD = [...dPin, ...dRest].slice(0, mobile ? 1 : 2);
  const host = "shriramcredit.com";
  const path = [ad.path1, ad.path2].filter(Boolean).join("/");

  return (
    <div style={{ fontFamily: "arial, sans-serif", color: "#202124", lineHeight: 1.4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
        <span style={{ fontWeight: 700, fontSize: 12 }}>Sponsored</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#1A2B4A", color: "#C8A951",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>S</div>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 14, color: "#202124", fontWeight: 500 }}>Shriram Credit</div>
          <div style={{ fontSize: 12, color: "#5f6368" }}>{host}{path ? " › " + path : ""}</div>
        </div>
      </div>
      <div style={{ fontSize: mobile ? 18 : 20, lineHeight: 1.25, color: "#1a0dab", fontWeight: 400, marginTop: 4 }}>
        {shownHls.map((h, i) => (
          <span key={i}>
            <span style={{ color: "#1a0dab" }}>{h.text}</span>
            {i < shownHls.length - 1 && <span style={{ color: "#5f6368", fontWeight: 400 }}>{" | "}</span>}
          </span>
        ))}
        {shownHls.length === 0 && <span style={{ color: "#9aa0a6" }}>Your headlines appear here…</span>}
      </div>
      <div style={{ fontSize: 14, color: "#4d5156", marginTop: 5, ...(mobile ? { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } : {}) }}>
        {shownD.map(d => d.text).join(" ") || "Your descriptions appear here…"}
      </div>
      {!mobile && (
        <div style={{ display: "flex", gap: 18, marginTop: 11, flexWrap: "wrap" }}>
          {window.LAMF_DATA.sitelinks.slice(0, 4).map((s, i) => (
            <div key={i} style={{ minWidth: 120 }}>
              <div style={{ color: "#1a0dab", fontSize: 14 }}>{s[0]}</div>
              <div style={{ color: "#4d5156", fontSize: 12, lineHeight: 1.3 }}>{s[1]}</div>
            </div>
          ))}
        </div>
      )}
      {mobile && (
        <button style={{ marginTop: 10, width: "100%", border: "1px solid #1a73e8", color: "#1a73e8",
          background: "#fff", borderRadius: 18, padding: "7px 0", fontWeight: 600, fontSize: 13 }}>
          Apply Now
        </button>
      )}
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div style={{ width: 248, margin: "0 auto", border: "9px solid #1c2531", borderRadius: 30,
      background: "#fff", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
      <div style={{ height: 22, background: "#1c2531", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ width: 60, height: 5, background: "#3a4456", borderRadius: 5, marginTop: 4 }}></div>
      </div>
      <div style={{ padding: "10px 11px 14px" }}>{children}</div>
    </div>
  );
}

function GoogleSearchScreen({ store }) {
  const D = window.LAMF_DATA;
  const toast = useToast();
  const [campId, setCampId] = store.useCampaign();
  const [variations, setVariations] = useState(1);
  const camp = store.getCampaign(campId);

  const updateHL = (i, text) => store.editCampaign(campId, c => { c.headlines[i].text = text; });
  const updateD = (i, text) => store.editCampaign(campId, c => { c.descriptions[i].text = text; });
  const pinHL = (i) => store.editCampaign(campId, c => {
    const cur = c.headlines[i].pin;
    if (cur != null) { c.headlines[i].pin = null; return; }
    const usedPins = c.headlines.filter(h => h.pin).map(h => h.pin);
    const next = [1, 2, 3].find(p => !usedPins.includes(p));
    if (!next) { toast("All 3 headline pins are in use — unpin one first", "warn"); return; }
    c.headlines[i].pin = next;
  });
  const pinD = (i) => store.editCampaign(campId, c => {
    const cur = c.descriptions[i].pin;
    if (cur != null) { c.descriptions[i].pin = null; return; }
    const usedPins = c.descriptions.filter(d => d.pin).map(d => d.pin);
    const next = [1, 2].find(p => !usedPins.includes(p));
    if (!next) { toast("Both description pins are in use — unpin one first", "warn"); return; }
    c.descriptions[i].pin = next;
  });
  const editField = (field, val) => store.editCampaign(campId, c => { c[field] = val; });

  const hlOver = camp.headlines.filter(h => h.text.length > D.limits.headline).length;
  const dOver = camp.descriptions.filter(d => d.text.length > D.limits.description).length;
  const hlFilled = camp.headlines.filter(h => h.text.trim()).length;

  const save = () => {
    const over = hlOver + dOver;
    if (over > 0) toast(`Saved — but ${over} field${over > 1 ? "s are" : " is"} over the limit`, "warn");
    else toast("Copy saved", "ok");
  };
  const copyToBing = () => { store.copyToBing(campId); toast("Ad copy duplicated to Microsoft Bing", "ok"); };

  return (
    <div className="screen-in">
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(360px,.85fr)", gap: 0, alignItems: "start" }}
        className="gs-grid">
        {/* LEFT — editor */}
        <div style={{ padding: "22px 24px", borderRight: "1px solid var(--line)", minHeight: "calc(100vh - 64px)" }}>
          {/* setup */}
          <div className="card" style={{ padding: 16, marginBottom: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="field-label">Campaign</label>
                <select className="select" value={campId} onChange={e => setCampId(e.target.value)}>
                  {D.campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div><label className="field-label">Ad Group</label><input className="input" value={camp.adGroup} onChange={e => editField("adGroup", e.target.value)} /></div>
              <div><label className="field-label">Account</label><input className="input" value={camp.account} onChange={e => editField("account", e.target.value)} /></div>
              <div><label className="field-label">Theme / Intent</label><input className="input" value={camp.theme} onChange={e => editField("theme", e.target.value)} /></div>
              <div>
                <label className="field-label">Status</label>
                <div style={{ paddingTop: 3 }}><StatusBadge status={camp.status} onChange={s => editField("status", s)} /></div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}><label className="field-label">Final URL</label><input className="input" value={camp.finalUrl} onChange={e => editField("finalUrl", e.target.value)} /></div>
              <div>
                <label className="field-label">Display Path 1 <span style={{ textTransform: "none", fontWeight: 500 }}>(≤15)</span></label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input className="input" maxLength={20} value={camp.path1} onChange={e => editField("path1", e.target.value)} />
                  <CharPill len={camp.path1.length} limit={15} />
                </div>
              </div>
              <div>
                <label className="field-label">Display Path 2 <span style={{ textTransform: "none", fontWeight: 500 }}>(≤15)</span></label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input className="input" maxLength={20} value={camp.path2} onChange={e => editField("path2", e.target.value)} />
                  <CharPill len={camp.path2.length} limit={15} />
                </div>
              </div>
            </div>
          </div>

          {/* headlines */}
          <SectionTitle hint={`${hlFilled} written · select up to 15 for the RSA`}
            right={<span className="badge st-review" style={{ fontSize: 11 }}><span className="dot"></span>{camp.headlines.filter(h => h.pin).length}/3 pinned</span>}>
            Headlines <span style={{ color: "var(--ink-faint)", fontWeight: 500, textTransform: "none" }}>· ≤30 chars</span>
          </SectionTitle>
          <div className="card" style={{ padding: 6, marginBottom: 18 }}>
            {camp.headlines.map((h, i) => (
              <CopyRow key={i} idx={i} prefix="HL" item={h} limit={D.limits.headline} onText={updateHL} onPin={pinHL} />
            ))}
          </div>

          {/* descriptions */}
          <SectionTitle hint="Select up to 4 for the RSA"
            right={<span className="badge st-review" style={{ fontSize: 11 }}><span className="dot"></span>{camp.descriptions.filter(d => d.pin).length}/2 pinned</span>}>
            Descriptions <span style={{ color: "var(--ink-faint)", fontWeight: 500, textTransform: "none" }}>· ≤90 chars</span>
          </SectionTitle>
          <div className="card" style={{ padding: 6, marginBottom: 18 }}>
            {camp.descriptions.map((d, i) => (
              <CopyRow key={i} idx={i} prefix="D" item={d} limit={D.limits.description} onText={updateD} onPin={pinD} multiline />
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" style={{ flex: 1, justifyContent: "center" }}
              onClick={() => setVariations(v => v + 1)}><Icon name="plus" size={15} /> Add New Ad Variation</button>
            <button className="btn btn-ghost" onClick={copyToBing}><Icon name="copy" size={15} /> Copy to Bing</button>
          </div>

          {variations > 1 && Array.from({ length: variations - 1 }).map((_, vi) => (
            <div key={vi} className="card" style={{ marginTop: 16, padding: 16, borderStyle: "dashed", background: "#fcfcfd" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)" }}>RSA Variation {vi + 2}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setVariations(v => v - 1)}><Icon name="trash" size={13} /> Remove</button>
              </div>
              <div className="empty-tip">New blank RSA block for <b>{camp.name}</b> — add headlines &amp; descriptions to A/B test against Variation 1. (Demo block)</div>
            </div>
          ))}
        </div>

        {/* RIGHT — previews */}
        <div style={{ padding: "22px 24px", position: "sticky", top: 64, alignSelf: "start" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)", textTransform: "uppercase", letterSpacing: ".02em" }}>Live Ad Preview</div>
            <button className="btn btn-primary btn-sm" onClick={save}><Icon name="check" size={14} /> Save Copy</button>
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", marginBottom: 7, textTransform: "uppercase", letterSpacing: ".05em" }}>Desktop · Google Search</div>
          <div className="card" style={{ padding: 16, marginBottom: 18 }}>
            <GooglePreview ad={camp} />
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", marginBottom: 7, textTransform: "uppercase", letterSpacing: ".05em" }}>Mobile</div>
          <div style={{ marginBottom: 20 }}>
            <PhoneFrame><GooglePreview ad={camp} mobile /></PhoneFrame>
          </div>

          {/* pinning guide */}
          <div className="card" style={{ padding: 14, background: "var(--navy)", border: "none", color: "#dfe5ee" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Icon name="pin" size={14} style={{ color: "var(--gold)" }} fill />
              <span style={{ fontWeight: 700, fontSize: 12.5, color: "#fff", textTransform: "uppercase", letterSpacing: ".03em" }}>Pinning Guide</span>
            </div>
            {D.pinningGuide.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 9, padding: "5px 0", borderTop: i ? "1px solid rgba(255,255,255,.08)" : "none", alignItems: "baseline" }}>
                <span style={{ color: p.pinned ? "var(--gold)" : "#8a96a8", fontWeight: 700, fontSize: 12, minWidth: 74, flexShrink: 0 }}>{p.slot}</span>
                <span style={{ fontSize: 12, lineHeight: 1.4 }}>{p.rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1080px) {
          .gs-grid { grid-template-columns: 1fr !important; }
          .gs-grid > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line); min-height: 0 !important; }
          .gs-grid > div:last-child { position: static !important; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { GoogleSearchScreen, GooglePreview });
