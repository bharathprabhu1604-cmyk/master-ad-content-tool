/* Shared components, icons, helpers. Exported to window for cross-file use. */
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

/* ---------------- Icons (simple line set) ---------------- */
const ICONS = {
  dashboard: "M3 3h7v8H3zM14 3h7v5h-7zM14 11h7v10h-7zM3 14h7v7H3z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5",
  plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4",
  display: "M3 4h18v12H3zM8 20h8M12 16v4",
  star: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.8 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z",
  facebook: "M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.5-3H14V8.5c0-.4.2-.5.6-.5z",
  bing: "M7 3l4 1.5V16l4-2-1.6-.6L12 10l5 1.8v3.4L9 21l-2-1V3z",
  compliance: "M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  copybank: "M5 4h10l4 4v12H5zM14 4v5h5M8 13h8M8 17h5",
  ruler: "M4 14l10-10 6 6L10 20zM8 8l2 2M11 5l2 2M5 11l2 2",
  settings: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 13a7.8 7.8 0 0 0 0-2l2-1.5-2-3.5-2.4 1a7.8 7.8 0 0 0-1.7-1L15 3H9l-.3 2.5a7.8 7.8 0 0 0-1.7 1l-2.4-1-2 3.5L2.6 11a7.8 7.8 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7.8 7.8 0 0 0 1.7 1L9 21h6l.3-2.5a7.8 7.8 0 0 0 1.7-1l2.4 1 2-3.5z",
  pin: "M9 3h6l-1 6 3 3v2h-5v5l-1 2-1-2v-5H4v-2l3-3z",
  plus: "M12 5v14M5 12h14",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9zM10.5 21a2 2 0 0 0 3 0",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
  download: "M12 3v12M7 10l5 5 5-5M4 20h16",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  filter: "M3 5h18l-7 8v6l-4-2v-4z",
  check: "M5 12l5 5L20 6",
  chevron: "M9 6l6 6-6 6",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  doc: "M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6",
  info: "M12 8h.01M11 12h1v5h1M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  lock: "M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10H5z",
  trash: "M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14",
  spark: "M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3",
};
function Icon({ name, size = 18, stroke = 1.7, className = "", style = {}, fill = false }) {
  const d = ICONS[name] || "";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style}
      fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ---------------- char util ---------------- */
function charClass(len, limit) {
  const amber = limit <= 30 ? limit - 3 : (limit <= 90 ? limit - 5 : limit - 25);
  if (len > limit) return "red";
  if (len >= amber) return "amber";
  return "green";
}
function CharPill({ len, limit }) {
  const c = charClass(len, limit);
  return <span className={`pill pill-${c}`}>{len}/{limit}</span>;
}

/* ---------------- Status badge w/ dropdown ---------------- */
const STATUS_CLASS = {
  "Not Started": "st-notstarted", "In Progress": "st-inprogress",
  "Review": "st-review", "Approved": "st-approved", "Live": "st-live",
};
function StatusBadge({ status, onChange, size }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const statuses = window.LAMF_DATA.statuses;
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span className={`badge ${STATUS_CLASS[status]} ${onChange ? "clickable" : ""}`}
        style={size === "sm" ? { fontSize: 11, padding: "2px 8px" } : {}}
        onClick={onChange ? () => setOpen(o => !o) : undefined}>
        <span className="dot"></span>{status}
        {onChange && <Icon name="chevron" size={11} style={{ transform: "rotate(90deg)", opacity: .55, marginLeft: 1 }} />}
      </span>
      {open && (
        <div className="menu" style={{ top: "calc(100% + 5px)", left: 0 }}>
          {statuses.map(s => (
            <div key={s} className="menu-item" onClick={() => { onChange(s); setOpen(false); }}>
              <span className={`badge ${STATUS_CLASS[s]}`} style={{ pointerEvents: "none" }}><span className="dot"></span>{s}</span>
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

/* ---------------- Toast system ---------------- */
const ToastCtx = createContext(() => {});
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, kind = "ok") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.kind === "warn" ? "warn" : t.kind === "err" ? "err" : ""}`}>
            <Icon name={t.kind === "ok" ? "check" : t.kind === "warn" ? "info" : "info"} size={16}
              style={{ color: t.kind === "ok" ? "var(--gold)" : t.kind === "warn" ? "var(--amber)" : "var(--red)" }} />
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => useContext(ToastCtx);

/* ---------------- Section header ---------------- */
function SectionTitle({ children, hint, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".02em", color: "var(--navy)", textTransform: "uppercase" }}>{children}</div>
        {hint && <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 2 }}>{hint}</div>}
      </div>
      {right}
    </div>
  );
}

/* ---------------- Image placeholder ---------------- */
function ImageSlot({ label, ratio = "1.91 / 1", note }) {
  return (
    <div style={{
      aspectRatio: ratio, width: "100%", borderRadius: 8, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 6, color: "var(--ink-faint)",
      background: "repeating-linear-gradient(135deg, #f0f1f4, #f0f1f4 10px, #e9ebef 10px, #e9ebef 20px)",
      border: "1px dashed var(--line-strong)",
    }}>
      <Icon name="display" size={20} style={{ opacity: .6 }} />
      <span style={{ fontFamily: "var(--mono)", fontSize: 11 }}>{label}</span>
      {note && <span style={{ fontFamily: "var(--mono)", fontSize: 10, opacity: .8 }}>{note}</span>}
    </div>
  );
}

Object.assign(window, { Icon, ICONS, CharPill, charClass, StatusBadge, STATUS_CLASS, ToastProvider, useToast, SectionTitle, ImageSlot });
