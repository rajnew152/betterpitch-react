import './FeedbackCard.css';

export default function FeedbackCard() {
  return (
    <>
      <div style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-230px", marginTop: "-338px", width: "460px", height: "580px", zIndex: "10", opacity: "0", transform: "translateX(1000.0000000000002px) translateY(267.9491924311228px) rotate(30deg)" }}>
        <div className="w-full h-full rounded-[28px] overflow-hidden">
          <div className="relative mx-auto w-full max-w-[640px] justify-self-end overflow-hidden rounded-[28px]" style={{ boxShadow: "0 30px 80px -20px rgba(180,10,82,0.50), 0 0 0 1px rgba(255,255,255,0.04)", background: "radial-gradient(60% 50% at 90% 10%, rgba(255,60,93,0.50) 0%, transparent 52%),\n          radial-gradient(70% 55% at 5% 90%,  rgba(220,20,104,0.42)  0%, transparent 55%),\n          radial-gradient(85% 65% at 50% 50%, rgba(160,20,74,0.32)  0%, transparent 65%),\n          linear-gradient(148deg, #72083a 0%, #b80a5c 45%, #60083a 100%)", height: "100%" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwLjYgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==\")" }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(52% 40% at 75% 15%, rgba(255,255,255,0.16) 0%, transparent 60%)", mixBlendMode: "screen" }} />
            <div className="lia-db-panel absolute z-[5] flex flex-col" style={{ left: "6%", right: "6%", top: "10%", bottom: "8%", background: "rgba(28,8,23,0.78)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "20px", padding: "16px", gap: "12px", boxShadow: "0 24px 60px -16px rgba(60,0,39,0.65), inset 0 1px 0 rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div className="lia-db-stats-row flex" style={{ gap: "8px" }}>
                <div className="lia-db-stat-0 flex-1 flex flex-col" style={{ minWidth: "0", background: "rgba(30,8,28,0.55)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: "4px" }}>
                    Conversations
                  </span>
                  <span className="lia-db-stat-value" style={{ fontSize: "22px", fontWeight: "700", color: "#fff", lineHeight: "1", marginBottom: "4px" }}>12,908</span>
                  <span style={{ fontSize: "11px", color: "#34d97b", fontWeight: "500" }}>▲ 18.6%</span>
                </div>
                <div className="lia-db-stat-1 flex-1 flex flex-col" style={{ minWidth: "0", background: "rgba(30,8,28,0.55)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: "4px" }}>CSAT</span>
                  <span className="lia-db-stat-value" style={{ fontSize: "22px", fontWeight: "700", color: "#fff", lineHeight: "1", marginBottom: "4px" }}>96%</span>
                  <span style={{ fontSize: "11px", color: "#34d97b", fontWeight: "500" }}>▲ 2.4%</span>
                </div>
                <div className="lia-db-stat-2 flex-1 flex flex-col" style={{ minWidth: "0", background: "rgba(30,8,28,0.55)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px 14px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: "4px" }}>Avg Resp.</span>
                  <span className="lia-db-stat-value" style={{ fontSize: "22px", fontWeight: "700", color: "#fff", lineHeight: "1", marginBottom: "4px" }}>1.5s</span>
                  <span style={{ fontSize: "11px", color: "#f87171", fontWeight: "500" }}>▼ 0.8s</span>
                </div>
              </div>
              <div className="lia-db-chart flex flex-col" style={{ flex: "1 1 0", background: "rgba(24,6,21,0.60)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "12px 14px 10px", overflow: "hidden" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: "8px", flexShrink: "0" }}>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.50)", letterSpacing: "0.02em" }}>CSAT responses · last 30d</span>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#34d97b" }}>+18.6%</span>
                </div>
                <div style={{ flex: "1 1 0", position: "relative", minHeight: "0" }}>
                  <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
                    <path className="lia-db-chart-fill" d="M0,55 C30,52 60,48 90,40 S150,25 180,20 S240,10 300,5 L300,70 L0,70 Z" fill="rgba(0,200,180,0.18)" />
                    <path className="lia-db-chart-line" d="M0,55 C30,52 60,48 90,40 S150,25 180,20 S240,10 300,5" fill="none" stroke="rgba(0,220,200,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" strokeDashoffset="600" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col" style={{ gap: "3px", flexShrink: "0" }}>
                <div className="lia-db-row-0 flex" style={{ gap: "3px" }}>
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#08a898" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a43" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                </div>
                <div className="lia-db-row-1 flex" style={{ gap: "3px" }}>
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#08a898" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#8e2a5b" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a43" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#08a898" }} />
                </div>
                <div className="lia-db-row-2 flex" style={{ gap: "3px" }}>
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a43" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#08a898" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a43" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#8e2a5b" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                </div>
                <div className="lia-db-row-3 flex" style={{ gap: "3px" }}>
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#8e2a5b" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#08a898" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a43" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#8e2a5b" }} />
                </div>
                <div className="lia-db-row-4 flex" style={{ gap: "3px" }}>
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#08a898" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a43" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#8e2a5b" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#6e1a62" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#0c7a7a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#550f6a" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#08a898" }} />
                  <div style={{ flex: "1 1 0", minWidth: "0", height: "14px", borderRadius: "3px", background: "#4b0d42" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ boxShadow: "0 0 0 1px rgba(247,54,121,0.18), 0 32px 80px -16px rgba(247,54,121,0.35)" }} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-230px", width: "460px", zIndex: "30", pointerEvents: "none", opacity: "0", transform: "translateX(1000.0000000000002px) translateY(531.9491924311228px)" }}>
        <p className="text-center font-poppins text-[clamp(16px,2.2vw,32px)] font-semibold tracking-[-0.02em] text-foreground">{"Feedback & CSAT"}</p>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <div className="h-px w-8 bg-[#8736f7]/60 rounded-full" />
          <div className="h-1 w-1 rounded-full bg-[#8736f7]" />
          <div className="h-px w-8 bg-[#8736f7]/60 rounded-full" />
        </div>
        <p className="mt-2 text-center font-poppins text-[clamp(11px,1.1vw,15px)] leading-snug tracking-[-0.01em] text-foreground/55 px-4">
          Voice surveys that capture ratings and open feedback, summarized into structured insights.
        </p>
      </div>
    </>
  );
}
