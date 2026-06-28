import { useState, useRef, useEffect } from "react";

// ─── COLORS ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#0a0a12", surface: "#13131f", card: "#1a1a2e", border: "#2a2a45",
  accent: "#f59e0b", accentD: "#78350f", green: "#10b981", red: "#ef4444",
  blue: "#3b82f6", purple: "#8b5cf6", cyan: "#06b6d4",
  text: "#f0f0f0", muted: "#666", white: "#fff",
};

const USERS = [
  { username: "admin", password: "dukan123" },
  { username: "malik", password: "malik456" },
];

// ─── SHARED STYLES ──────────────────────────────────────────────────────────
const inp = (x = {}) => ({ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, padding: "11px 13px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", ...x });
const btn = (bg = C.accent, fg = "#000") => ({ background: bg, color: fg, border: "none", borderRadius: 10, padding: "11px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "opacity .15s" });
const card = (x = {}) => ({ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px", ...x });

// ─── SHOP BACKGROUND SVG ────────────────────────────────────────────────────
function ShopBG() {
  return (
    <svg viewBox="0 0 400 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.13 }} preserveAspectRatio="xMidYMid slice">
      {/* Shop floor */}
      <rect x="0" y="160" width="400" height="60" fill="#f59e0b" opacity="0.3"/>
      {/* Counter */}
      <rect x="60" y="120" width="180" height="50" rx="4" fill="#f59e0b" opacity="0.6"/>
      <rect x="60" y="115" width="180" height="12" rx="3" fill="#fbbf24"/>
      {/* Shelves back */}
      <rect x="0" y="30" width="400" height="8" rx="2" fill="#888"/>
      <rect x="0" y="70" width="400" height="8" rx="2" fill="#888"/>
      <rect x="0" y="110" width="50" height="8" rx="2" fill="#888"/>
      <rect x="260" y="110" width="140" height="8" rx="2" fill="#888"/>
      {/* Products on shelves */}
      {[20,45,70,95,120,145,170,195,220,245,280,310,340,365].map((x,i)=>(
        <rect key={i} x={x} y={i%2===0?34:74} width={i%3===0?18:14} height={i%2===0?28:22} rx="3" fill={["#f59e0b","#10b981","#3b82f6","#8b5cf6","#ef4444"][i%5]} opacity="0.8"/>
      ))}
      {/* Shopkeeper */}
      <circle cx="190" cy="95" r="14" fill="#fbbf24"/>
      <rect x="178" y="109" width="24" height="30" rx="5" fill="#3b82f6"/>
      <rect x="170" y="112" width="10" height="20" rx="4" fill="#3b82f6"/>
      <rect x="202" y="112" width="10" height="20" rx="4" fill="#3b82f6"/>
      {/* Customer 1 */}
      <circle cx="290" cy="98" r="12" fill="#fbbf24"/>
      <rect x="279" y="110" width="22" height="28" rx="5" fill="#ef4444"/>
      <rect x="272" y="113" width="9" height="18" rx="4" fill="#ef4444"/>
      <rect x="301" y="113" width="9" height="18" rx="4" fill="#ef4444"/>
      {/* Shopping basket */}
      <rect x="305" y="125" width="20" height="14" rx="3" fill="#f59e0b" opacity="0.9"/>
      <path d="M305 125 Q315 118 325 125" stroke="#f59e0b" strokeWidth="2" fill="none"/>
      {/* Customer 2 */}
      <circle cx="340" cy="100" r="11" fill="#fbbf24"/>
      <rect x="330" y="111" width="20" height="26" rx="5" fill="#8b5cf6"/>
      {/* Dollar signs / coins */}
      <text x="145" y="148" fontSize="14" fill="#f59e0b" opacity="0.9">₹</text>
      <text x="165" y="152" fontSize="10" fill="#f59e0b" opacity="0.7">₹</text>
      <text x="130" y="155" fontSize="8" fill="#f59e0b" opacity="0.5">₹</text>
      {/* Stars / sparkles */}
      {[[30,20],[370,15],[200,10],[350,60],[15,85]].map(([x,y],i)=>(
        <text key={i} x={x} y={y} fontSize="10" fill="#f59e0b" opacity="0.4">✦</text>
      ))}
    </svg>
  );
}

// ─── LOGIN ──────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [dukanName, setDukanName] = useState("");
  const [u, setU] = useState(""); const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  function go() {
    if (!dukanName.trim()) { setErr("Dukan ka naam daalo"); return; }
    if (!u || !p) { setErr("Username aur password daalo"); return; }
    setLoading(true); setErr("");
    setTimeout(() => {
      const user = USERS.find(x => x.username === u && x.password === p);
      if (user) onLogin({ ...user, dukanName: dukanName.trim() });
      else { setErr("Username ya password galat hai"); setLoading(false); }
    }, 700);
  }

  return (
    <div style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1117 40%, #0a0f1e 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "system-ui,sans-serif", position: "relative", overflow: "hidden" }}>
      {/* Creative background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)", top: -100, left: -100 }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", bottom: -50, right: -80 }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", top: "40%", right: "10%" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {["🛒","💰","📦","🏪","💳","📊"].map((icon, i) => (
          <div key={i} style={{ position: "absolute", fontSize: 24, opacity: 0.07, left: `${8 + i * 15}%`, top: `${10 + (i % 3) * 28}%` }}>{icon}</div>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ background: `linear-gradient(135deg,#f59e0b,#d97706)`, borderRadius: 20, width: 68, height: 68, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 14px", boxShadow: "0 8px 32px #f59e0b44" }}>🏪</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: C.text, letterSpacing: -1 }}>Dukan <span style={{ color: C.accent }}>AI</span></div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Smart Shop Manager — India</div>
        </div>

        <div style={{ background: "rgba(13,13,30,0.96)", border: `1px solid ${C.border}`, borderRadius: 18, padding: "26px 22px", backdropFilter: "blur(12px)", boxShadow: "0 20px 60px #00000088" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 16 }}>Apni Dukan Mein Login Karo</div>

          {/* Dukan name */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 5 }}>Dukan ka Naam *</div>
            <input style={inp()} placeholder="Jaise: Ali General Store" value={dukanName} onChange={e => { setDukanName(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && go()} />
          </div>

          {/* Username */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 5 }}>Username</div>
            <input style={inp()} placeholder="apna username" value={u} onChange={e => { setU(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && go()} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 5 }}>Password</div>
            <div style={{ position: "relative" }}>
              <input style={inp({ paddingRight: 44 })} type={show ? "text" : "password"} placeholder="password daalo" value={p} onChange={e => { setP(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && go()} />
              <button onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16, padding: 0 }}>{show ? "🙈" : "👁"}</button>
            </div>
          </div>

          {err && <div style={{ background: "#2d0f0f", border: "1px solid #7f1d1d", borderRadius: 9, padding: "9px 12px", marginBottom: 14, fontSize: 12, color: C.red }}>❌ {err}</div>}

          <button onClick={go} disabled={loading} style={{ ...btn(loading ? C.accentD : C.accent), width: "100%", padding: 14, fontSize: 14 }}>
            {loading ? "Checking..." : "Login Karo →"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: "#444" }}>Demo: admin / dukan123</div>
      </div>
    </div>
  );
}

// ─── BARCODE SCANNER ────────────────────────────────────────────────────────
function BarcodeScanner({ onScan, onClose }) {
  const [manual, setManual] = useState("");
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null); const streamRef = useRef(null);

  async function startCam() {
    setScanning(true);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch { setScanning(false); alert("Camera nahi mila. Manual enter karo."); }
  }
  function stopCam() { streamRef.current?.getTracks().forEach(t => t.stop()); setScanning(false); }
  useEffect(() => () => streamRef.current?.getTracks().forEach(t => t.stop()), []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
      <div style={card({ maxWidth: 360, width: "100%", position: "relative" })}>
        <button onClick={() => { stopCam(); onClose(); }} style={{ position: "absolute", top: 12, right: 14, background: "none", border: "none", color: C.muted, fontSize: 22, cursor: "pointer" }}>✕</button>
        <div style={{ fontWeight: 800, fontSize: 15, color: C.accent, marginBottom: 16 }}>📷 Barcode / QR Scanner</div>
        {scanning
          ? <div style={{ marginBottom: 14 }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%", borderRadius: 10, border: `2px solid ${C.accent}` }} />
              <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 6 }}>Camera se barcode ke saamne raho</div>
              <button onClick={stopCam} style={{ ...btn(C.red, C.white), width: "100%", marginTop: 10 }}>Camera Band Karo</button>
            </div>
          : <button onClick={startCam} style={{ ...btn(C.blue, C.white), width: "100%", marginBottom: 14 }}>📷 Camera Se Scan Karo</button>
        }
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Ya manually barcode/SKU number daalo:</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={inp({ flex: 1 })} placeholder="Barcode number..." value={manual} onChange={e => setManual(e.target.value)} onKeyDown={e => e.key === "Enter" && manual.trim() && (onScan(manual.trim()), setManual(""))} />
            <button style={btn()} onClick={() => { if (manual.trim()) { onScan(manual.trim()); setManual(""); } }}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CALCULATOR ─────────────────────────────────────────────────────────────
function Calculator({ onClose }) {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null); const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(false); const [history, setHistory] = useState([]);

  function press(k) {
    if (k === "C") { setDisplay("0"); setPrev(null); setOp(null); setFresh(false); return; }
    if (k === "⌫") { setDisplay(d => d.length > 1 ? d.slice(0, -1) : "0"); return; }
    if (k === "%") { setDisplay(d => String(parseFloat(d) / 100)); return; }
    if (["+", "-", "×", "÷"].includes(k)) {
      if (prev !== null && op && !fresh) {
        const cur = parseFloat(display);
        const res = op === "+" ? prev + cur : op === "-" ? prev - cur : op === "×" ? prev * cur : prev / cur;
        setDisplay(String(parseFloat(res.toFixed(8)))); setPrev(parseFloat(res.toFixed(8)));
      } else { setPrev(parseFloat(display)); }
      setOp(k); setFresh(true); return;
    }
    if (k === "=") {
      if (prev === null || !op) return;
      const cur = parseFloat(display);
      const res = op === "+" ? prev + cur : op === "-" ? prev - cur : op === "×" ? prev * cur : prev / cur;
      const result = String(parseFloat(res.toFixed(8)));
      setHistory(h => [`${prev} ${op} ${cur} = ${result}`, ...h.slice(0, 4)]);
      setDisplay(result); setPrev(null); setOp(null); setFresh(false); return;
    }
    if (k === "." && (fresh ? false : display.includes("."))) return;
    if (fresh) { setDisplay(k === "." ? "0." : k); setFresh(false); }
    else setDisplay(d => d === "0" && k !== "." ? k : d + k);
  }

  const keys = [
    ["C", "%", "⌫", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
      <div style={card({ maxWidth: 320, width: "100%", position: "relative" })}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 14, background: "none", border: "none", color: C.muted, fontSize: 22, cursor: "pointer" }}>✕</button>
        <div style={{ fontWeight: 800, fontSize: 15, color: C.accent, marginBottom: 14 }}>🧮 Calculator</div>

        {/* History */}
        {history.length > 0 && (
          <div style={{ background: C.surface, borderRadius: 8, padding: "8px 12px", marginBottom: 10, maxHeight: 70, overflowY: "auto" }}>
            {history.map((h, i) => <div key={i} style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{h}</div>)}
          </div>
        )}

        {/* Display */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 4, minHeight: 60, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
          {op && <div style={{ fontSize: 11, color: C.muted }}>{prev} {op}</div>}
          <div style={{ fontSize: 32, fontWeight: 800, color: C.text, wordBreak: "break-all", lineHeight: 1.1 }}>{display}</div>
        </div>
        <div style={{ fontSize: 11, color: C.muted, textAlign: "right", marginBottom: 14 }}>₹ {parseFloat(display || 0).toLocaleString("en-IN")}</div>

        {/* Keys */}
        {keys.map((row, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: row.length === 3 ? "2fr 1fr 1fr" : "repeat(4,1fr)", gap: 8, marginBottom: 8 }}>
            {row.map(k => (
              <button key={k} onClick={() => press(k)} style={{
                ...btn(
                  k === "=" ? C.accent :
                  ["+", "-", "×", "÷", "%"].includes(k) ? "#2d2d2d" :
                  ["C", "⌫"].includes(k) ? "#2a1010" : C.surface,
                  k === "=" ? "#000" : ["C", "⌫"].includes(k) ? C.red : C.text
                ),
                padding: "15px 0", fontSize: 18, border: `1px solid ${C.border}`,
              }}>{k}</button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function DukanAI() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [udhaari, setUdhaari] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Stock form
  const [nName, setNName] = useState(""); const [nPrice, setNPrice] = useState("");
  const [nCost, setNCost] = useState(""); const [nQty, setNQty] = useState("");
  const [nBarcode, setNBarcode] = useState(""); const [nCategory, setNCategory] = useState("General");

  // Sell form
  const [sellId, setSellId] = useState(""); const [sellQty, setSellQty] = useState("1");
  const [sellCustomer, setSellCustomer] = useState("");

  // Customer form
  const [cName, setCName] = useState(""); const [cPhone, setCPhone] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");

  // Udhaari form
  const [uPerson, setUPerson] = useState(""); const [uAmt, setUAmt] = useState("");
  const [uNote, setUNote] = useState(""); const [uPhone, setUPhone] = useState("");
  const [payId, setPayId] = useState(""); const [payAmt, setPayAmt] = useState("");

  // UI
  const [showCalc, setShowCalc] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanTarget, setScanTarget] = useState("stock");
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());

  // AI Chat
  const [msgs, setMsgs] = useState([{ role: "assistant", text: `Namaste! Main Dukan AI hoon 🤖\nMujhse poochho: stock, sales, profit, udhaari — sab bata dunga!` }]);
  const [chatIn, setChatIn] = useState(""); const [aiLoad, setAiLoad] = useState(false);
  const chatEnd = useRef(null);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  // Stats
  const totalSales = sales.reduce((s, x) => s + x.revenue, 0);
  const totalProfit = sales.reduce((s, x) => s + x.profit, 0);
  const stockValue = products.reduce((s, p) => s + p.price * p.qty, 0);
  const lowStock = products.filter(p => p.qty <= 3);
  const totalUdhaari = udhaari.reduce((s, u) => s + u.remaining, 0);
  const avgMargin = products.length ? products.reduce((s, p) => s + ((p.price - p.cost) / p.price * 100), 0) / products.length : 0;
  const lowMarginProducts = products.filter(p => p.price > 0 && ((p.price - p.cost) / p.price * 100) < 15);

  // Monthly stats
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlySales = sales.filter(s => { const d = new Date(s.ts || Date.now()); return d.getMonth() === activeMonth && d.getFullYear() === activeYear; });
  const monthRevenue = monthlySales.reduce((s, x) => s + x.revenue, 0);
  const monthProfit = monthlySales.reduce((s, x) => s + x.profit, 0);
  const monthCost = monthlySales.reduce((s, x) => s + (x.revenue - x.profit), 0);

  function addProduct() {
    if (!nName || !nPrice || !nCost || !nQty) return;
    setProducts(p => [...p, { id: Date.now(), name: nName, price: +nPrice, cost: +nCost, qty: +nQty, barcode: nBarcode, category: nCategory }]);
    setNName(""); setNPrice(""); setNCost(""); setNQty(""); setNBarcode("");
  }

  function sellProduct() {
    const prod = products.find(p => p.id === +sellId);
    if (!prod || +sellQty > prod.qty) { alert(!prod ? "Product chunno" : "Itna stock nahi!"); return; }
    const qty = +sellQty;
    setSales(prev => [...prev, { id: Date.now(), ts: Date.now(), name: prod.name, qty, revenue: prod.price * qty, profit: (prod.price - prod.cost) * qty, customer: sellCustomer, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }]);
    setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, qty: p.qty - qty } : p));
    setSellId(""); setSellQty("1"); setSellCustomer("");
  }

  function addCustomer() {
    if (!cName.trim()) return;
    setCustomers(prev => [...prev, { id: Date.now(), name: cName.trim(), phone: cPhone }]);
    setCName(""); setCPhone("");
  }

  function addUdhaari() {
    if (!uPerson || !uAmt) return;
    setUdhaari(prev => [...prev, { id: Date.now(), name: uPerson, phone: uPhone, total: +uAmt, remaining: +uAmt, note: uNote, date: new Date().toLocaleDateString("en-IN"), payments: [] }]);
    setUPerson(""); setUPhone(""); setUAmt(""); setUNote("");
  }

  function payUdhaari() {
    if (!payId || !payAmt) return;
    setUdhaari(prev => prev.map(u => u.id === +payId ? { ...u, remaining: Math.max(0, u.remaining - +payAmt), payments: [...(u.payments || []), { amt: +payAmt, date: new Date().toLocaleDateString("en-IN") }] } : u));
    setPayId(""); setPayAmt("");
  }

  function handleScan(code) {
    setShowScanner(false);
    if (scanTarget === "stock") setNBarcode(code);
    else {
      const found = products.find(p => p.barcode === code);
      if (found) setSellId(String(found.id));
      else alert(`Barcode ${code} match nahi kiya. Pehle stock mein add karo.`);
    }
  }

  // Auto calc preview
  const sellPreview = (() => {
    const p = products.find(x => x.id === +sellId);
    const q = +sellQty || 0;
    if (!p || q === 0) return null;
    return { revenue: p.price * q, profit: (p.price - p.cost) * q, margin: ((p.price - p.cost) / p.price * 100).toFixed(1) };
  })();

  async function sendChat() {
    if (!chatIn.trim() || aiLoad) return;
    const q = chatIn.trim(); setChatIn("");
    setMsgs(prev => [...prev, { role: "user", text: q }]);
    setAiLoad(true);
    const ctx = `Tu Dukan AI hai. Tera naam hai "Dukan AI". Short aur helpful raho.
IMPORTANT - Language Rule: User jis bhi language mein likhe, TU USI LANGUAGE MEIN JAWAB DE.
- Agar user English mein likhe → reply English mein do
- Agar user Hindi mein likhe → reply Hindi mein do (pure Hindi, Devanagari script)
- Agar user Hinglish mein likhe → reply Hinglish mein do (Roman script Hindi-English mix)
Language detect karke automatically switch kar. Kabhi bhi galat language mein mat bolna.
Dukan: ${user?.dukanName} | Owner: ${user?.username}
Aaj: Sales ₹${totalSales.toFixed(0)} | Profit ₹${totalProfit.toFixed(0)} | Stock Value ₹${stockValue.toFixed(0)}
Monthly (${MONTHS[activeMonth]}): Revenue ₹${monthRevenue.toFixed(0)} | Profit ₹${monthProfit.toFixed(0)}
Udhaari baaki: ₹${totalUdhaari.toFixed(0)} (${udhaari.filter(u => u.remaining > 0).length} log)
Avg profit margin: ${avgMargin.toFixed(1)}%
Kam margin wale: ${lowMarginProducts.map(p => p.name).join(", ") || "koi nahi"}
Kam stock wale: ${lowStock.map(p => `${p.name}(${p.qty})`).join(", ") || "sab theek"}
Products: ${products.map(p => `${p.name} ₹${p.price} stock:${p.qty}`).join(" | ") || "koi nahi"}
Udhaari: ${udhaari.filter(u => u.remaining > 0).map(u => `${u.name}:₹${u.remaining}`).join(", ") || "sab clear"}`;
    try {
      const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // 👈 Yahan apni free Gemini API key daalo
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: ctx }] },
            contents: [{ role: "user", parts: [{ text: q }] }],
            generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
          })
        }
      );
      const d = await res.json();
      const reply = d?.candidates?.[0]?.content?.parts?.[0]?.text || "Koi reply nahi mila, dobara try karo.";
      setMsgs(prev => [...prev, { role: "assistant", text: reply }]);
    } catch { setMsgs(prev => [...prev, { role: "assistant", text: "Network error. Dobara try karo." }]); }
    setAiLoad(false);
  }

  // PDF export
  function exportPDF() {
    const content = `
      <html><head><style>
        body{font-family:Arial,sans-serif;color:#111;padding:30px;max-width:800px;margin:0 auto}
        h1{color:#d97706;border-bottom:3px solid #d97706;padding-bottom:10px}
        h2{color:#374151;margin-top:24px;font-size:16px;border-left:4px solid #d97706;padding-left:10px}
        table{width:100%;border-collapse:collapse;margin-top:10px}
        th{background:#1f2937;color:#fff;padding:10px;text-align:left;font-size:13px}
        td{padding:9px 10px;border-bottom:1px solid #e5e7eb;font-size:13px}
        tr:nth-child(even)td{background:#f9fafb}
        .stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:16px 0}
        .stat-box{background:#f3f4f6;border-radius:10px;padding:14px;text-align:center}
        .stat-val{font-size:22px;font-weight:800;color:#d97706}
        .stat-lbl{font-size:12px;color:#6b7280;margin-top:4px}
        .green{color:#059669;font-weight:700} .red{color:#dc2626;font-weight:700}
        .alert{background:#fef3c7;border:1px solid #fbbf24;border-radius:8px;padding:12px;margin:10px 0;font-size:13px}
        .footer{margin-top:40px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:16px}
      </style></head><body>
        <h1>🏪 ${user?.dukanName} — Monthly Report</h1>
        <p style="color:#6b7280;font-size:13px">Month: ${MONTHS[activeMonth]} ${activeYear} | Generated: ${new Date().toLocaleString("en-IN")}</p>

        <h2>📊 Monthly Summary</h2>
        <div class="stat-grid">
          <div class="stat-box"><div class="stat-val">₹${monthRevenue.toFixed(0)}</div><div class="stat-lbl">Total Revenue</div></div>
          <div class="stat-box"><div class="stat-val" style="color:#059669">₹${monthProfit.toFixed(0)}</div><div class="stat-lbl">Net Profit</div></div>
          <div class="stat-box"><div class="stat-val" style="color:#dc2626">₹${monthCost.toFixed(0)}</div><div class="stat-lbl">Total Cost</div></div>
          <div class="stat-box"><div class="stat-val">${monthlySales.length}</div><div class="stat-lbl">Total Transactions</div></div>
          <div class="stat-box"><div class="stat-val">${monthRevenue > 0 ? ((monthProfit/monthRevenue)*100).toFixed(1) : 0}%</div><div class="stat-lbl">Profit Margin</div></div>
          <div class="stat-box"><div class="stat-val">₹${totalUdhaari.toFixed(0)}</div><div class="stat-lbl">Udhaari Baaki</div></div>
        </div>

        ${lowMarginProducts.length > 0 ? `<div class="alert">⚠️ <strong>Profit Margin Alert:</strong> Ye products mein margin 15% se kam hai: ${lowMarginProducts.map(p => `${p.name} (${((p.price-p.cost)/p.price*100).toFixed(0)}%)`).join(", ")}</div>` : ""}
        ${lowStock.length > 0 ? `<div class="alert">📦 <strong>Kam Stock Alert:</strong> ${lowStock.map(p => `${p.name} (${p.qty} bache)`).join(", ")}</div>` : ""}

        <h2>💰 ${MONTHS[activeMonth]} Sales Detail</h2>
        ${monthlySales.length === 0 ? "<p style='color:#6b7280'>Is month koi sale nahi hui</p>" : `
        <table>
          <tr><th>Item</th><th>Qty</th><th>Revenue</th><th>Profit</th><th>Time</th></tr>
          ${monthlySales.map(s => `<tr><td>${s.name}</td><td>${s.qty}</td><td class="green">₹${s.revenue}</td><td class="green">₹${s.profit.toFixed(0)}</td><td>${s.time}</td></tr>`).join("")}
          <tr style="font-weight:800;background:#f3f4f6"><td colspan="2">TOTAL</td><td class="green">₹${monthRevenue.toFixed(0)}</td><td class="green">₹${monthProfit.toFixed(0)}</td><td></td></tr>
        </table>`}

        <h2>📦 Current Stock Status</h2>
        <table>
          <tr><th>Product</th><th>Price</th><th>Cost</th><th>Margin</th><th>Stock</th><th>Value</th></tr>
          ${products.map(p => {
            const margin = p.price > 0 ? ((p.price-p.cost)/p.price*100).toFixed(1) : 0;
            return `<tr><td>${p.name}</td><td>₹${p.price}</td><td>₹${p.cost}</td><td class="${margin < 15 ? "red" : "green"}">${margin}%</td><td class="${p.qty <= 3 ? "red" : ""}">${p.qty}</td><td>₹${(p.price*p.qty).toFixed(0)}</td></tr>`;
          }).join("") || "<tr><td colspan='6' style='text-align:center;color:#6b7280'>Koi product nahi</td></tr>"}
        </table>

        <h2>📋 Udhaari Register</h2>
        <table>
          <tr><th>Naam</th><th>Phone</th><th>Total</th><th>Baaki</th><th>Paid</th><th>Date</th></tr>
          ${udhaari.map(u => `<tr><td>${u.name}</td><td>${u.phone||"-"}</td><td>₹${u.total}</td><td class="${u.remaining>0?"red":"green"}">₹${u.remaining}</td><td class="green">₹${u.total-u.remaining}</td><td>${u.date}</td></tr>`).join("") || "<tr><td colspan='6' style='text-align:center;color:#6b7280'>Koi udhaari nahi</td></tr>"}
          ${udhaari.length > 0 ? `<tr style="font-weight:800;background:#f3f4f6"><td colspan="3">TOTAL BAAKI</td><td class="red">₹${totalUdhaari.toFixed(0)}</td><td colspan="2"></td></tr>` : ""}
        </table>

        <div class="footer">Dukan AI — Smart Shop Manager | ${user?.dukanName} | ${new Date().toLocaleDateString("en-IN")}</div>
      </body></html>
    `;
    const w = window.open("", "_blank");
    w.document.write(content);
    w.document.close();
    setTimeout(() => w.print(), 500);
  }

  if (!loggedIn) return <Login onLogin={u => { setUser(u); setLoggedIn(true); }} />;

  const TABS = [["dashboard","📊","Home"],["stock","📦","Stock"],["sell","💰","Sale"],["customers","👥","Customers"],["udhaari","📋","Udhaari"],["monthly","📈","Report"],["ai","🤖","AI"]];

  const filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone.includes(customerSearch));

  return (
    <div style={{ background: "linear-gradient(160deg, #0a0a1a 0%, #0d1117 60%, #0a0e1a 100%)", minHeight: "100vh", color: C.text, fontFamily: "system-ui,sans-serif", paddingBottom: 90, position: "relative" }}>
      {/* Subtle background decoration */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)", top: -200, right: -100 }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)", bottom: 100, left: -150 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
      {showCalc && <Calculator onClose={() => setShowCalc(false)} />}
      {showScanner && <BarcodeScanner onScan={handleScan} onClose={() => setShowScanner(false)} />}

      {/* HEADER */}
      <div style={{ background: "rgba(10,10,26,0.97)", borderBottom: `1px solid ${C.border}`, padding: "11px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: `linear-gradient(135deg,#f59e0b,#d97706)`, borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 12px #f59e0b33" }}>🏪</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.4 }}>{user?.dukanName}</div>
            <div style={{ fontSize: 10, color: C.muted }}>@{user?.username}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowCalc(true)} title="Calculator" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, width: 36, height: 36, fontSize: 16, cursor: "pointer", color: C.text }}>🧮</button>
          <button onClick={() => { setLoggedIn(false); setUser(null); setProducts([]); setSales([]); setUdhaari([]); setCustomers([]); }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 9, padding: "0 12px", height: 36, fontSize: 12, color: C.muted, cursor: "pointer" }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "14px 14px 0" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            {/* Hero with shop bg */}
            <div style={{ ...card({ padding: 0, marginBottom: 14, overflow: "hidden", position: "relative", minHeight: 130 }) }}>
              <ShopBG />
              <div style={{ position: "relative", zIndex: 1, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: C.muted }}>Aaj ka overview</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: C.accent, marginTop: 4 }}>₹{totalSales.toFixed(0)}</div>
                <div style={{ fontSize: 13, color: C.text }}>Total Sales · <span style={{ color: C.green }}>₹{totalProfit.toFixed(0)} munafa</span></div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>{sales.length} transactions · {products.length} products</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              {[["Stock Value", `₹${stockValue.toFixed(0)}`, C.blue],["Udhaari Baaki", `₹${totalUdhaari.toFixed(0)}`, C.red],["Avg Margin", `${avgMargin.toFixed(1)}%`, avgMargin < 20 ? C.red : C.green],["Customers", customers.length, C.purple]].map(([l, v, col]) => (
                <div key={l} style={card()}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: col }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            {(lowStock.length > 0 || lowMarginProducts.length > 0) && (
              <div style={{ marginBottom: 12 }}>
                {lowStock.length > 0 && (
                  <div style={{ background: "#1c1100", border: `1px solid ${C.accentD}`, borderRadius: 11, padding: "12px 14px", marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, color: C.accent, fontSize: 13, marginBottom: 6 }}>⚠️ Kam Stock — Mangao jaldi!</div>
                    {lowStock.map(p => <div key={p.id} style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>• {p.name} — <span style={{ color: C.red, fontWeight: 700 }}>{p.qty} bache</span></div>)}
                  </div>
                )}
                {lowMarginProducts.length > 0 && (
                  <div style={{ background: "#160a2a", border: "1px solid #5b21b6", borderRadius: 11, padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.purple, fontSize: 13, marginBottom: 6 }}>📉 Low Profit Margin Alert!</div>
                    {lowMarginProducts.map(p => <div key={p.id} style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>• {p.name} — sirf <span style={{ color: C.red, fontWeight: 700 }}>{((p.price-p.cost)/p.price*100).toFixed(1)}%</span> margin</div>)}
                  </div>
                )}
              </div>
            )}

            {/* Recent sales */}
            <div style={card()}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Aaj ki Sales</div>
              {sales.length === 0
                ? <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: "14px 0" }}>Abhi koi sale nahi hui</div>
                : sales.slice().reverse().slice(0, 6).map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <div><span style={{ fontWeight: 600 }}>{s.name}</span> <span style={{ color: C.muted }}>×{s.qty} · {s.time}</span>{s.customer && <span style={{ color: C.blue }}> · {s.customer}</span>}</div>
                    <div style={{ textAlign: "right" }}><div style={{ color: C.green, fontWeight: 700 }}>+₹{s.revenue}</div><div style={{ fontSize: 10, color: C.muted }}>₹{s.profit.toFixed(0)} munafa</div></div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* STOCK */}
        {tab === "stock" && (
          <div>
            <div style={card({ marginBottom: 12 })}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Naya Product Add Karo</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <input style={inp()} placeholder="Product naam *" value={nName} onChange={e => setNName(e.target.value)} />
                <select style={inp()} value={nCategory} onChange={e => setNCategory(e.target.value)}>
                  {["General","Food","Drinks","Household","Clothing","Electronics","Other"].map(c => <option key={c}>{c}</option>)}
                </select>
                <input style={inp()} placeholder="Bikne ki price ₹ *" type="number" value={nPrice} onChange={e => setNPrice(e.target.value)} />
                <input style={inp()} placeholder="Cost price ₹ *" type="number" value={nCost} onChange={e => setNCost(e.target.value)} />
                <input style={inp()} placeholder="Quantity *" type="number" value={nQty} onChange={e => setNQty(e.target.value)} />
                <div style={{ display: "flex", gap: 6 }}>
                  <input style={inp({ flex: 1 })} placeholder="Barcode" value={nBarcode} onChange={e => setNBarcode(e.target.value)} />
                  <button onClick={() => { setScanTarget("stock"); setShowScanner(true); }} style={{ ...btn(C.blue, C.white), padding: "0 10px", fontSize: 14 }}>📷</button>
                </div>
              </div>
              {nPrice && nCost && +nPrice > 0 && (
                <div style={{ background: C.surface, borderRadius: 8, padding: "8px 12px", marginBottom: 8, display: "flex", gap: 20, fontSize: 12 }}>
                  <span style={{ color: C.muted }}>Margin: <span style={{ color: (+nPrice - +nCost) / +nPrice * 100 < 15 ? C.red : C.green, fontWeight: 700 }}>{((+nPrice - +nCost) / +nPrice * 100).toFixed(1)}%</span></span>
                  <span style={{ color: C.muted }}>Munafa/pc: <span style={{ color: C.green, fontWeight: 700 }}>₹{(+nPrice - +nCost).toFixed(0)}</span></span>
                </div>
              )}
              <button style={{ ...btn(), width: "100%" }} onClick={addProduct}>+ Product Add Karo</button>
            </div>

            <div style={card()}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Stock List ({products.length} items · ₹{stockValue.toFixed(0)} value)</div>
              {products.length === 0
                ? <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: "18px 0" }}>Koi product nahi — upar add karo</div>
                : products.map(p => {
                  const margin = p.price > 0 ? (p.price - p.cost) / p.price * 100 : 0;
                  return (
                    <div key={p.id} style={{ padding: "11px 0", borderBottom: `1px solid ${C.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</span>
                            <span style={{ fontSize: 10, background: C.surface, padding: "2px 7px", borderRadius: 20, color: C.muted }}>{p.category}</span>
                            {margin < 15 && <span style={{ fontSize: 10, background: "#2d0050", color: C.purple, padding: "2px 7px", borderRadius: 20 }}>Low Margin</span>}
                          </div>
                          <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>Bikta ₹{p.price} · Cost ₹{p.cost} · <span style={{ color: margin < 15 ? C.red : C.green }}>{margin.toFixed(1)}%</span> margin</div>
                          {p.barcode && <div style={{ fontSize: 10, color: C.purple, marginTop: 2 }}>🔲 {p.barcode}</div>}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontWeight: 900, fontSize: 18, color: p.qty <= 3 ? C.red : C.green }}>{p.qty}</div>
                            <div style={{ fontSize: 10, color: C.muted }}>bache</div>
                          </div>
                          <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}>🗑</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}

        {/* SELL */}
        {tab === "sell" && (
          <div>
            <div style={card({ marginBottom: 12 })}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Sale Record Karo</div>
              {products.length === 0
                ? <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: "14px 0" }}>Pehle Stock mein products add karo</div>
                : <>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <select style={inp({ flex: 1 })} value={sellId} onChange={e => setSellId(e.target.value)}>
                      <option value="">Product chunno...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} — ₹{p.price} ({p.qty} bache)</option>)}
                    </select>
                    <button onClick={() => { setScanTarget("sell"); setShowScanner(true); }} style={{ ...btn(C.blue, C.white), padding: "0 12px", fontSize: 16 }}>📷</button>
                  </div>
                  <input style={inp({ marginBottom: 8 })} type="number" min="1" placeholder="Quantity" value={sellQty} onChange={e => setSellQty(e.target.value)} />

                  {/* Customer search */}
                  <div style={{ position: "relative", marginBottom: 8 }}>
                    <input style={inp()} placeholder="Customer naam (optional)" value={sellCustomer} onChange={e => setSellCustomer(e.target.value)} />
                    {sellCustomer && customers.filter(c => c.name.toLowerCase().includes(sellCustomer.toLowerCase())).length > 0 && (
                      <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, zIndex: 10, maxHeight: 150, overflowY: "auto" }}>
                        {customers.filter(c => c.name.toLowerCase().includes(sellCustomer.toLowerCase())).map(c => (
                          <div key={c.id} onClick={() => setSellCustomer(c.name)} style={{ padding: "9px 13px", cursor: "pointer", fontSize: 13, borderBottom: `1px solid ${C.border}` }}>
                            {c.name} {c.phone && <span style={{ color: C.muted, fontSize: 11 }}>· {c.phone}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Auto calculator preview */}
                  {sellPreview && (
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600 }}>🧮 Auto Calculator</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
                        <div><div style={{ fontSize: 18, fontWeight: 800, color: C.green }}>₹{sellPreview.revenue}</div><div style={{ fontSize: 10, color: C.muted }}>Customer dega</div></div>
                        <div><div style={{ fontSize: 18, fontWeight: 800, color: C.accent }}>₹{sellPreview.profit.toFixed(0)}</div><div style={{ fontSize: 10, color: C.muted }}>Tumhara munafa</div></div>
                        <div><div style={{ fontSize: 18, fontWeight: 800, color: sellPreview.margin < 15 ? C.red : C.purple }}>{sellPreview.margin}%</div><div style={{ fontSize: 10, color: C.muted }}>Margin</div></div>
                      </div>
                      {sellPreview.margin < 15 && <div style={{ fontSize: 11, color: C.red, marginTop: 8, textAlign: "center" }}>⚠️ Margin bahut kam hai! Price badhao.</div>}
                    </div>
                  )}

                  <button style={{ ...btn(C.green, "#000"), width: "100%" }} onClick={sellProduct}>✓ Sale Record Karo</button>
                </>
              }
            </div>

            {sales.length > 0 && (
              <div style={card()}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Aaj ki History</div>
                {sales.slice().reverse().map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <div><span style={{ fontWeight: 600 }}>{s.name}</span> ×{s.qty} <span style={{ color: C.muted }}>{s.time}</span>{s.customer && <span style={{ color: C.blue }}> · {s.customer}</span>}</div>
                    <div style={{ color: C.green, fontWeight: 700 }}>+₹{s.revenue}</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, fontWeight: 800, fontSize: 13 }}>
                  <span>Total</span><span style={{ color: C.accent }}>₹{totalSales.toFixed(0)} <span style={{ fontSize: 11, fontWeight: 400, color: C.muted }}>(munafa ₹{totalProfit.toFixed(0)})</span></span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CUSTOMERS */}
        {tab === "customers" && (
          <div>
            <div style={card({ marginBottom: 12 })}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>👥 Naya Customer Add Karo</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <input style={inp()} placeholder="Naam *" value={cName} onChange={e => setCName(e.target.value)} />
                <input style={inp()} placeholder="Phone number" value={cPhone} onChange={e => setCPhone(e.target.value)} />
              </div>
              <button style={{ ...btn(), width: "100%" }} onClick={addCustomer}>+ Customer Add Karo</button>
            </div>

            <div style={card()}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Customer Search</div>
              <input style={inp({ marginBottom: 12 })} placeholder="🔍 Naam ya phone se dhundho..." value={customerSearch} onChange={e => setCustomerSearch(e.target.value)} />

              {customers.length === 0
                ? <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: "14px 0" }}>Koi customer nahi abhi</div>
                : filteredCustomers.length === 0
                ? <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: "10px 0" }}>"{customerSearch}" nahi mila</div>
                : filteredCustomers.map(c => {
                  const custSales = sales.filter(s => s.customer === c.name);
                  const custUdhaari = udhaari.find(u => u.name === c.name);
                  return (
                    <div key={c.id} style={{ padding: "11px 0", borderBottom: `1px solid ${C.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>{c.phone || "Phone nahi"} · {custSales.length} purchases · ₹{custSales.reduce((s,x)=>s+x.revenue,0)} total</div>
                          {custUdhaari && custUdhaari.remaining > 0 && <div style={{ fontSize: 11, color: C.red, marginTop: 2 }}>📋 Udhaari baaki: ₹{custUdhaari.remaining}</div>}
                        </div>
                        <button onClick={() => setCustomers(prev => prev.filter(x => x.id !== c.id))} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}>🗑</button>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}

        {/* UDHAARI */}
        {tab === "udhaari" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div style={card()}><div style={{ fontSize: 11, color: C.muted }}>Total Diya</div><div style={{ fontSize: 20, fontWeight: 800, color: C.red }}>₹{udhaari.reduce((s,u)=>s+u.total,0).toFixed(0)}</div></div>
              <div style={card()}><div style={{ fontSize: 11, color: C.muted }}>Baaki Wapas</div><div style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>₹{totalUdhaari.toFixed(0)}</div></div>
            </div>

            <div style={card({ marginBottom: 12 })}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: C.red }}>📋 Naya Udhaari</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <input style={inp()} placeholder="Naam *" value={uPerson} onChange={e => setUPerson(e.target.value)} />
                <input style={inp()} placeholder="Phone" value={uPhone} onChange={e => setUPhone(e.target.value)} />
                <input style={inp()} placeholder="Amount ₹ *" type="number" value={uAmt} onChange={e => setUAmt(e.target.value)} />
                <input style={inp()} placeholder="Kya liya?" value={uNote} onChange={e => setUNote(e.target.value)} />
              </div>
              <button style={{ ...btn(C.red, C.white), width: "100%" }} onClick={addUdhaari}>+ Udhaari Add Karo</button>
            </div>

            {udhaari.filter(u => u.remaining > 0).length > 0 && (
              <div style={card({ marginBottom: 12 })}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: C.green }}>✓ Payment Aaya?</div>
                <select style={inp({ marginBottom: 8 })} value={payId} onChange={e => setPayId(e.target.value)}>
                  <option value="">Kaun aaya?</option>
                  {udhaari.filter(u => u.remaining > 0).map(u => <option key={u.id} value={u.id}>{u.name} — ₹{u.remaining} baaki</option>)}
                </select>
                <div style={{ display: "flex", gap: 8 }}>
                  <input style={inp({ flex: 1 })} placeholder="Kitne diye?" type="number" value={payAmt} onChange={e => setPayAmt(e.target.value)} />
                  <button style={btn(C.green, "#000")} onClick={payUdhaari}>✓ Liya</button>
                </div>
              </div>
            )}

            <div style={card()}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Sabke Hisaab ({udhaari.length})</div>
              {udhaari.length === 0
                ? <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: "14px 0" }}>Koi udhaari nahi — alhamdulillah!</div>
                : udhaari.map(u => (
                  <div key={u.id} style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{u.name} {u.phone && <span style={{ color: C.muted, fontSize: 11 }}>· {u.phone}</span>}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>{u.note && `${u.note} · `}{u.date}</div>
                        {u.payments?.length > 0 && <div style={{ fontSize: 10, color: C.green, marginTop: 2 }}>✓ Payments: {u.payments.map(p => `₹${p.amt} (${p.date})`).join(", ")}</div>}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 900, fontSize: 16, color: u.remaining === 0 ? C.green : C.red }}>₹{u.remaining}</div>
                        <div style={{ fontSize: 10, color: C.muted }}>of ₹{u.total}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 8, height: 5, background: C.border, borderRadius: 4 }}>
                      <div style={{ height: "100%", background: u.remaining === 0 ? C.green : C.accent, borderRadius: 4, width: `${((u.total - u.remaining) / u.total) * 100}%`, transition: "width 0.4s" }} />
                    </div>
                    {u.remaining === 0 && <div style={{ fontSize: 11, color: C.green, marginTop: 4 }}>✓ Sab clear ho gaya!</div>}
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* MONTHLY REPORT */}
        {tab === "monthly" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <select style={inp({ flex: 1 })} value={activeMonth} onChange={e => setActiveMonth(+e.target.value)}>
                {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <select style={inp({ width: 90 })} value={activeYear} onChange={e => setActiveYear(+e.target.value)}>
                {[2024, 2025, 2026].map(y => <option key={y}>{y}</option>)}
              </select>
              <button onClick={exportPDF} style={{ ...btn(C.blue, C.white), whiteSpace: "nowrap" }}>📄 PDF</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[["Revenue", `₹${monthRevenue.toFixed(0)}`, C.blue],["Profit", `₹${monthProfit.toFixed(0)}`, C.green],["Cost", `₹${monthCost.toFixed(0)}`, C.red]].map(([l, v, col]) => (
                <div key={l} style={card({ textAlign: "center" })}>
                  <div style={{ fontSize: 10, color: C.muted }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: col, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>

            {monthRevenue > 0 && (
              <div style={card({ marginBottom: 12 })}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Profit & Loss</div>
                {[["Revenue", monthRevenue, C.blue],["Cost", monthCost, C.red],["Net Profit", monthProfit, C.green]].map(([l, v, col]) => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: C.muted }}>{l}</span>
                      <span style={{ color: col, fontWeight: 700 }}>₹{v.toFixed(0)}</span>
                    </div>
                    <div style={{ height: 6, background: C.border, borderRadius: 4 }}>
                      <div style={{ height: "100%", background: col, borderRadius: 4, width: `${Math.min(100,(v/Math.max(monthRevenue,1))*100)}%` }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 10, padding: "10px 0", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                  <span>Profit Margin</span>
                  <span style={{ color: monthRevenue > 0 && (monthProfit/monthRevenue*100) < 15 ? C.red : C.green }}>{monthRevenue > 0 ? (monthProfit/monthRevenue*100).toFixed(1) : 0}%</span>
                </div>
              </div>
            )}

            {/* Alerts */}
            {lowMarginProducts.length > 0 && (
              <div style={{ background: "#160a2a", border: "1px solid #5b21b6", borderRadius: 11, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: C.purple, fontSize: 13, marginBottom: 6 }}>📉 Low Profit Margin Products</div>
                {lowMarginProducts.map(p => (
                  <div key={p.id} style={{ fontSize: 12, color: C.muted, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                    <span>{p.name}</span>
                    <span style={{ color: C.red, fontWeight: 700 }}>{((p.price-p.cost)/p.price*100).toFixed(1)}% — Price badhao ₹{Math.ceil(p.cost / 0.85)} karo</span>
                  </div>
                ))}
              </div>
            )}

            <div style={card()}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{MONTHS[activeMonth]} {activeYear} Sales ({monthlySales.length})</div>
              {monthlySales.length === 0
                ? <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: "14px 0" }}>Is month koi sale nahi</div>
                : monthlySales.slice().reverse().map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <div><span style={{ fontWeight: 600 }}>{s.name}</span> ×{s.qty} <span style={{ color: C.muted }}>{s.time}</span></div>
                    <div style={{ textAlign: "right" }}><div style={{ color: C.green, fontWeight: 700 }}>₹{s.revenue}</div><div style={{ fontSize: 10, color: C.muted }}>₹{s.profit.toFixed(0)} munafa</div></div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* AI CHAT */}
        {tab === "ai" && (
          <div>
            <div style={card({ marginBottom: 10 })}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>Quick sawaal 👇</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Aaj kitna kamaya?","Konsa item best chala?","Udhaari kiska zyada?","Kya kam stock mein?","Monthly summary do","Margin improve kaise karoon?"].map(q => (
                  <button key={q} onClick={() => setChatIn(q)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "5px 12px", fontSize: 11, color: C.muted, cursor: "pointer" }}>{q}</button>
                ))}
              </div>
            </div>

            <div style={{ ...card({ marginBottom: 10 }), height: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? C.accent : C.surface, color: m.role === "user" ? "#000" : C.text, fontSize: 13, lineHeight: 1.6, border: m.role === "assistant" ? `1px solid ${C.border}` : "none", whiteSpace: "pre-wrap" }}>{m.text}</div>
                </div>
              ))}
              {aiLoad && <div style={{ display: "flex" }}><div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "16px 16px 16px 4px", padding: "10px 14px", color: C.muted, fontSize: 13 }}>Soch raha hoon... 🤔</div></div>}
              <div ref={chatEnd} />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <input style={inp({ flex: 1 })} placeholder="Kuch bhi poochho..." value={chatIn} onChange={e => setChatIn(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} />
              <button style={btn()} onClick={sendChat} disabled={aiLoad}>{aiLoad ? "..." : "Puchho"}</button>
            </div>
          </div>
        )}
      </div>
      </div>{/* end zIndex wrapper */}

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,10,26,0.97)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 16px", zIndex: 20, backdropFilter: "blur(12px)" }}>
        {TABS.map(([t, icon, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 44 }}>
            <div style={{ fontSize: 18, filter: tab === t ? "none" : "grayscale(0.5)" }}>{icon}</div>
            <div style={{ fontSize: 9, fontWeight: tab === t ? 800 : 400, color: tab === t ? C.accent : C.muted }}>{label}</div>
            {tab === t && <div style={{ width: 20, height: 2, background: C.accent, borderRadius: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
