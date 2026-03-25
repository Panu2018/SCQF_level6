import { useState, useEffect, useCallback } from "react";

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(val);

const formatNumber = (val) =>
  new Intl.NumberFormat("en-GB").format(val);

const parseNumber = (str) => parseFloat(str.replace(/[^0-9.]/g, "")) || 0;

function SliderInput({ label, value, min, max, step, onChange, format, prefix, suffix, hint }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.5rem" }}>
        <label style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>
          {label}
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {prefix && <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>{prefix}</span>}
          <input
            type="text"
            value={format ? format(value) : value}
            onChange={(e) => {
              const n = parseNumber(e.target.value);
              if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
            }}
            style={{
              background: "transparent", border: "none", borderBottom: "2px solid var(--accent)",
              color: "var(--fg)", fontFamily: "'Playfair Display', serif", fontSize: "1.25rem",
              fontWeight: 700, textAlign: "right", width: "120px", outline: "none", padding: "0 2px",
            }}
          />
          {suffix && <span style={{ fontSize: "0.9rem", color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}>{suffix}</span>}
        </div>
      </div>
      <div style={{ position: "relative", height: "6px", borderRadius: "3px", background: "var(--track)", cursor: "pointer" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--accent2), var(--accent))", borderRadius: "3px", transition: "width 0.1s" }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            position: "absolute", top: "50%", left: 0, width: "100%", height: "20px",
            transform: "translateY(-50%)", opacity: 0, cursor: "pointer", margin: 0,
          }}
        />
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%, -50%)",
          width: "18px", height: "18px", borderRadius: "50%", background: "var(--accent)",
          border: "3px solid var(--bg)", boxShadow: "0 0 0 2px var(--accent)", transition: "left 0.1s",
          pointerEvents: "none",
        }} />
      </div>
      {hint && <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.35rem", fontFamily: "'DM Sans', sans-serif" }}>{hint}</p>}
    </div>
  );
}

function ResultCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, var(--accent2), var(--accent))" : "var(--card2)",
      borderRadius: "16px", padding: "1.5rem 1.75rem",
      boxShadow: accent ? "0 8px 32px rgba(212,163,76,0.25)" : "none",
      flex: 1, minWidth: "140px",
    }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accent ? "rgba(255,255,255,0.75)" : "var(--muted)", marginBottom: "0.4rem" }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.65rem", fontWeight: 700, color: accent ? "#fff" : "var(--fg)", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: "0.72rem", color: accent ? "rgba(255,255,255,0.6)" : "var(--muted)", marginTop: "0.35rem", fontFamily: "'DM Sans', sans-serif" }}>{sub}</p>}
    </div>
  );
}

function AmortizationBar({ principal, interest }) {
  const total = principal + interest;
  const pp = (principal / total) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>Loan breakdown</span>
      </div>
      <div style={{ display: "flex", height: "10px", borderRadius: "5px", overflow: "hidden", marginBottom: "0.75rem" }}>
        <div style={{ width: `${pp}%`, background: "var(--accent2)", transition: "width 0.5s ease" }} />
        <div style={{ width: `${100 - pp}%`, background: "var(--accent)", transition: "width 0.5s ease" }} />
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[["Principal", formatCurrency(principal), "var(--accent2)"], ["Total Interest", formatCurrency(interest), "var(--accent)"]].map(([l, v, c]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: c, flexShrink: 0 }} />
            <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}>{l}: </span>
            <span style={{ fontSize: "0.78rem", color: "var(--fg)", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RepaymentToggle({ value, onChange }) {
  const opts = [{ v: "repayment", l: "Repayment" }, { v: "interest", l: "Interest Only" }];
  return (
    <div style={{ display: "flex", background: "var(--card2)", borderRadius: "12px", padding: "4px", gap: "4px", marginBottom: "2rem" }}>
      {opts.map((o) => (
        <button key={o.v} onClick={() => onChange(o.v)} style={{
          flex: 1, padding: "0.6rem", border: "none", borderRadius: "9px", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600,
          background: value === o.v ? "var(--accent)" : "transparent",
          color: value === o.v ? "#fff" : "var(--muted)",
          transition: "all 0.2s",
        }}>{o.l}</button>
      ))}
    </div>
  );
}

export default function MortgageCalculator() {
  const [price, setPrice] = useState(450000);
  const [deposit, setDeposit] = useState(90000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [type, setType] = useState("repayment");
  const [showTable, setShowTable] = useState(false);

  const loanAmount = Math.max(0, price - deposit);
  const depositPct = price > 0 ? ((deposit / price) * 100).toFixed(1) : 0;
  const monthlyRate = rate / 100 / 12;
  const n = term * 12;

  const monthlyPayment = type === "repayment"
    ? monthlyRate === 0 ? loanAmount / n
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    : loanAmount * monthlyRate;

  const totalPaid = type === "repayment" ? monthlyPayment * n : monthlyPayment * n + loanAmount;
  const totalInterest = totalPaid - loanAmount;

  // Amortization schedule (first 12 rows shown)
  const schedule = useCallback(() => {
    if (type !== "repayment") return [];
    const rows = [];
    let bal = loanAmount;
    for (let i = 1; i <= Math.min(n, 120); i++) {
      const int = bal * monthlyRate;
      const prin = monthlyPayment - int;
      bal = Math.max(0, bal - prin);
      rows.push({ month: i, payment: monthlyPayment, interest: int, principal: prin, balance: bal });
    }
    return rows;
  }, [loanAmount, monthlyRate, monthlyPayment, n, type]);

  const ltv = price > 0 ? ((loanAmount / price) * 100).toFixed(1) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0f0e0b;
          --card: #1a1915;
          --card2: #222118;
          --fg: #f0ead8;
          --muted: #7a7260;
          --accent: #d4a34c;
          --accent2: #7c9e6e;
          --track: #2a2820;
        }
        input[type=range] { -webkit-appearance: none; appearance: none; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--track); border-radius: 3px; }
        .fade-in { animation: fadeIn 0.6s ease forwards; opacity: 0; }
        @keyframes fadeIn { to { opacity: 1; } }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.7 } }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", fontFamily: "'DM Sans', sans-serif", padding: "2rem 1rem" }}>
        {/* Header */}
        <div className="fade-in" style={{ maxWidth: "720px", margin: "0 auto 2.5rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--card2)", border: "1px solid var(--track)", borderRadius: "100px", padding: "0.35rem 1rem", marginBottom: "1.25rem" }}>
            <div className="pulse" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent2)" }} />
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>Mortgage Calculator</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "0.75rem" }}>
            Plan Your <span style={{ color: "var(--accent)" }}>Property</span> Purchase
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Calculate monthly repayments, total costs, and get a full amortisation breakdown for your UK mortgage.
          </p>
        </div>

        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Main card */}
          <div className="fade-in stagger-1" style={{ background: "var(--card)", borderRadius: "24px", padding: "2rem", border: "1px solid var(--track)" }}>
            <RepaymentToggle value={type} onChange={setType} />

            <SliderInput label="Property Value" value={price} min={50000} max={2000000} step={5000}
              format={v => formatNumber(v)} prefix="£"
              onChange={setPrice}
              hint="Enter the full purchase price of the property" />

            <SliderInput label="Deposit" value={deposit} min={0} max={price} step={1000}
              format={v => formatNumber(v)} prefix="£"
              suffix={`${depositPct}%`}
              onChange={setDeposit}
              hint={`LTV: ${ltv}% · Minimum 5% deposit required for most lenders`} />

            <SliderInput label="Interest Rate" value={rate} min={0.5} max={15} step={0.05}
              suffix="%" onChange={setRate}
              hint="Current average 2-year fixed rate is approx. 4.5%" />

            <SliderInput label="Mortgage Term" value={term} min={5} max={40} step={1}
              suffix="yrs" onChange={setTerm}
              hint="Most mortgages run 25–35 years" />
          </div>

          {/* Results */}
          <div className="fade-in stagger-2" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <ResultCard label="Monthly Payment" value={formatCurrency(monthlyPayment)} sub={type === "interest" ? "+ capital at end" : "principal + interest"} accent />
            <ResultCard label="Loan Amount" value={formatCurrency(loanAmount)} sub={`${ltv}% loan-to-value`} />
            <ResultCard label="Total Repayable" value={formatCurrency(totalPaid)} sub={`over ${term} years`} />
          </div>

          {/* Breakdown bar */}
          <div className="fade-in stagger-3" style={{ background: "var(--card)", borderRadius: "24px", padding: "1.75rem 2rem", border: "1px solid var(--track)" }}>
            <AmortizationBar principal={loanAmount} interest={totalInterest} />
          </div>

          {/* Affordability notice */}
          {ltv > 90 && (
            <div className="fade-in" style={{ background: "#2a1a10", border: "1px solid #5a3010", borderRadius: "16px", padding: "1rem 1.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.2rem" }}>⚠️</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#e8a060", marginBottom: "0.2rem" }}>High LTV Warning</p>
                <p style={{ fontSize: "0.8rem", color: "#a07050", lineHeight: 1.5 }}>Your LTV is above 90%. Fewer lenders offer mortgages at this level, and rates are typically higher. A larger deposit will improve your options.</p>
              </div>
            </div>
          )}

          {/* Amortisation table toggle */}
          {type === "repayment" && (
            <div className="fade-in stagger-4" style={{ background: "var(--card)", borderRadius: "24px", border: "1px solid var(--track)", overflow: "hidden" }}>
              <button onClick={() => setShowTable(v => !v)} style={{
                width: "100%", padding: "1.25rem 2rem", background: "transparent", border: "none",
                cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                color: "var(--fg)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600,
              }}>
                <span>Amortisation Schedule <span style={{ color: "var(--muted)", fontWeight: 400 }}>(first 10 years)</span></span>
                <span style={{ color: "var(--accent)", fontSize: "1.2rem", transform: showTable ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>↓</span>
              </button>

              {showTable && (
                <div style={{ overflowX: "auto", padding: "0 1rem 1.5rem" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                    <thead>
                      <tr>
                        {["Month", "Payment", "Principal", "Interest", "Balance"].map(h => (
                          <th key={h} style={{ textAlign: "right", padding: "0.5rem 0.75rem", color: "var(--muted)", fontWeight: 500, letterSpacing: "0.05em", fontSize: "0.72rem", textTransform: "uppercase", borderBottom: "1px solid var(--track)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {schedule().map((row, i) => (
                        <tr key={row.month} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                          <td style={{ textAlign: "right", padding: "0.45rem 0.75rem", color: "var(--muted)" }}>{row.month}</td>
                          <td style={{ textAlign: "right", padding: "0.45rem 0.75rem" }}>{formatCurrency(row.payment)}</td>
                          <td style={{ textAlign: "right", padding: "0.45rem 0.75rem", color: "var(--accent2)" }}>{formatCurrency(row.principal)}</td>
                          <td style={{ textAlign: "right", padding: "0.45rem 0.75rem", color: "var(--accent)" }}>{formatCurrency(row.interest)}</td>
                          <td style={{ textAlign: "right", padding: "0.45rem 0.75rem", fontWeight: 600 }}>{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Footer note */}
          <p className="fade-in stagger-5" style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.6, paddingBottom: "1rem" }}>
            For illustrative purposes only. Figures shown are estimates and do not constitute financial advice.
            Always consult a qualified mortgage adviser before making any decision.
          </p>
        </div>
      </div>
    </>
  );
}
