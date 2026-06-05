/* App store (state + localStorage), topbar, routing, mount. */
const { useState: uS, useEffect: uE, useRef: uR, useCallback: uC, useMemo } = React;
const LS_KEY = "lamf_tool_v1";

function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

function useStore() {
  const D = window.LAMF_DATA;
  const [campaigns, setCampaigns] = uS(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (saved && saved.campaigns) return saved.campaigns;
    } catch (e) {}
    return deepClone(D.campaigns);
  });
  const [compliance, setCompliance] = uS(() => {
    try { const s = JSON.parse(localStorage.getItem(LS_KEY) || "null"); if (s && s.compliance) return s.compliance; } catch (e) {}
    return {};
  });
  const [tracker, setTracker] = uS(() => {
    try { const s = JSON.parse(localStorage.getItem(LS_KEY) || "null"); if (s && s.tracker) return s.tracker; } catch (e) {}
    return null;
  });
  const [activeCampaign, setActiveCampaign] = uS(campaigns[0].id);
  const bingFromRef = uR(null);

  // persist
  uE(() => {
    const t = setTimeout(() => {
      localStorage.setItem(LS_KEY, JSON.stringify({ campaigns, compliance, tracker }));
    }, 200);
    return () => clearTimeout(t);
  }, [campaigns, compliance, tracker]);

  const getCampaign = uC(id => campaigns.find(c => c.id === id) || campaigns[0], [campaigns]);
  const editCampaign = uC((id, fn) => {
    setCampaigns(cs => cs.map(c => {
      if (c.id !== id) return c;
      const copy = deepClone(c); fn(copy); return copy;
    }));
  }, []);
  const copyToBing = uC(id => { bingFromRef.current = id; }, []);

  const trackerRows = uC(() => {
    if (tracker) return tracker;
    return D.tracker.map(r => ({ id: r[0], channel: r[1], type: r[2], campaign: r[3], unit: r[4], assignee: r[5], due: r[6], status: r[7], reviewer: r[8] }));
  }, [tracker]);
  const saveTracker = uC(rows => setTracker(rows), []);

  const setComplianceVal = uC((campId, rowKey, v) => {
    setCompliance(c => ({ ...c, [campId]: { ...(c[campId] || {}), [rowKey]: v } }));
  }, []);

  const resetAll = uC(() => {
    localStorage.removeItem(LS_KEY);
    setCampaigns(deepClone(D.campaigns)); setCompliance({}); setTracker(null);
  }, []);

  return {
    campaigns, getCampaign, editCampaign, copyToBing, bingFrom: bingFromRef.current,
    compliance, setCompliance: setComplianceVal,
    trackerRows, saveTracker, resetAll,
    useCampaign: () => [activeCampaign, setActiveCampaign],
  };
}

const SCREEN_META = {
  dashboard: { crumb: "Overview", title: "Dashboard" },
  google: { crumb: "Channels · Google", title: "Google Search Ad Writer" },
  extensions: { crumb: "Channels · Google", title: "Ad Extensions" },
  display: { crumb: "Channels · Google", title: "Display · Performance Max" },
  demandgen: { crumb: "Channels · Google", title: "Demand Gen" },
  meta: { crumb: "Channels · Meta", title: "Facebook + Instagram" },
  bing: { crumb: "Channels · Microsoft", title: "Bing Ad Writer" },
  compliance: { crumb: "Review", title: "Compliance Review" },
  tracker: { crumb: "Review", title: "Content Tracker" },
  copybank: { crumb: "Resources", title: "Copy Bank" },
  guidelines: { crumb: "Resources", title: "Guidelines" },
  settings: { crumb: "Account", title: "Settings" },
};

function Topbar({ screen, store }) {
  const D = window.LAMF_DATA;
  const meta = SCREEN_META[screen] || { crumb: "", title: "" };
  return (
    <div className="topbar">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="crumb">Shriram Credit · LAMF{meta.crumb ? " · " + meta.crumb : ""}</div>
        <h1>{meta.title}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: "var(--gold-tint)", border: "1px solid var(--gold-soft)",
          borderRadius: 20, padding: "5px 12px", fontSize: 12.5, fontWeight: 600, color: "#7a6526" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)" }}></span>
          LAMF @ 10.5%* p.a.
        </div>
        <button className="btn btn-ghost btn-sm" title="Notifications" style={{ padding: 8 }}><Icon name="bell" size={17} /></button>
        <div style={{ width: 1, height: 24, background: "var(--line)" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--navy)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>PN</div>
          <div style={{ lineHeight: 1.2 }} className="user-meta">
            <div style={{ fontWeight: 600, fontSize: 13 }}>Priya Nair</div>
            <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>Content Lead</div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){.user-meta{display:none;}}`}</style>
    </div>
  );
}

function App() {
  const store = useStore();
  const [screen, setScreen] = uS(() => (location.hash || "").replace("#", "") || "google");
  const [, setCampaign] = store.useCampaign();

  uE(() => { location.hash = screen; }, [screen]);
  uE(() => {
    const onHash = () => { const s = (location.hash || "").replace("#", ""); if (s && SCREEN_META[s]) setScreen(s); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav = (id, campId) => {
    if (campId) setCampaign(campId);
    setScreen(id);
    document.querySelector(".content-scroll")?.scrollTo(0, 0);
  };

  const counts = {
    google: store.campaigns.length,
    compliance: store.campaigns.filter(c => c.status !== "Approved" && c.status !== "Live").length,
    tracker: store.trackerRows().length,
  };

  let view;
  switch (screen) {
    case "dashboard": view = <DashboardScreen store={store} onNav={nav} />; break;
    case "google": view = <GoogleSearchScreen store={store} />; break;
    case "extensions": view = <ExtensionsScreen store={store} />; break;
    case "meta": view = <MetaScreen store={store} />; break;
    case "bing": view = <BingScreen store={store} />; break;
    case "compliance": view = <ComplianceScreen store={store} />; break;
    case "tracker": view = <TrackerScreen store={store} />; break;
    case "copybank": view = <CopyBankScreen />; break;
    case "guidelines": view = <GuidelinesScreen />; break;
    case "display": view = <StubScreen title="Display · Performance Max" icon="display"
      sub="Responsive Display + PMax asset groups — short headlines, long headlines, descriptions & image assets."
      bullets={["10 short headlines (≤30) + 5 long headlines (≤90)", "5 descriptions (≤90)", "Landscape, square & portrait image assets", "Auto-combination preview across placements"]} />; break;
    case "demandgen": view = <StubScreen title="Demand Gen" icon="spark"
      sub="Visually-rich Demand Gen campaigns across Discover, Gmail & YouTube feeds."
      bullets={["5 headlines (≤40) + 5 descriptions per variation", "Single image, carousel & video formats", "Discover / Gmail / YouTube preview tabs"]} />; break;
    case "settings": view = <StubScreen title="Settings" icon="settings"
      sub="Workspace, team, brand defaults & data."
      bullets={["Team members & role permissions", "Brand voice & compliance defaults", "Default rate, regulator & disclaimer text", "Export & integration settings"]} />; break;
    default: view = <DashboardScreen store={store} onNav={nav} />;
  }

  // settings reset button hook (small extra)
  return (
    <div className="app">
      <Sidebar active={screen} onNav={nav} counts={counts} />
      <div className="main">
        <Topbar screen={screen} store={store} />
        <div className="content-scroll">{view}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider><App /></ToastProvider>
);
