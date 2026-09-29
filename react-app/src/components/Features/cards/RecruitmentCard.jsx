import './RecruitmentCard.css';

export default function RecruitmentCard() {
  return (
    <>
      <div style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-230px", marginTop: "-338px", width: "460px", height: "580px", zIndex: "5", opacity: "0", transform: "translateX(1000.0000000000002px) translateY(267.9491924311228px) rotate(30deg)" }}>
        <div className="w-full h-full rounded-[28px] overflow-hidden">
          <div className="relative mx-auto w-full max-w-[640px] justify-self-end overflow-hidden rounded-[28px]" style={{ boxShadow: "0 30px 80px -20px rgba(160,20,80,0.45), 0 0 0 1px rgba(255,255,255,0.04)", background: "radial-gradient(90% 70% at 80% 0%, rgba(255,100,121,0.55) 0%, transparent 55%),\n          radial-gradient(70% 55% at 10% 100%, rgba(255,80,194,0.45) 0%, transparent 60%),\n          linear-gradient(145deg, #e82281 0%, #c0186c 45%, #8a0c51 100%)", height: "100%" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwLjYgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==\")" }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(50% 40% at 70% 15%, rgba(255,255,255,0.18) 0%, transparent 60%)", mixBlendMode: "screen" }} />
            <div className="lia-mh-phone absolute z-[5] overflow-hidden" style={{ width: "46%", top: "8%", left: "12%", aspectRatio: "9/19", borderRadius: "22px", background: "rgba(30,14,26,0.92)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 56px -12px rgba(40,0,26,0.70), inset 0 1px 0 rgba(255,255,255,0.08)", transformOrigin: "bottom center" }}>
              <div className="absolute" style={{ top: "9px", left: "50%", transform: "translateX(-50%)", width: "28%", height: "13px", borderRadius: "0 0 9px 9px", background: "#180a15", zIndex: "2" }} />
              <div className="absolute flex flex-col" style={{ top: "18%", left: "7%", right: "7%", gap: "10px" }}>
                <div className="lia-mh-msg-0 self-start rounded-[14px] rounded-tl-[4px]" style={{ background: "rgba(54,30,49,0.92)", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 12px", fontSize: "11.5px", color: "rgba(255,255,255,0.88)", lineHeight: "1.45", maxWidth: "90%" }}>
                  Hi! Thanks for applying. When could you start?
                </div>
                <div className="lia-mh-msg-1 self-end rounded-[14px] rounded-tr-[4px]" style={{ background: "#ff3de8", padding: "10px 12px", fontSize: "11.5px", color: "#fff", lineHeight: "1.45", maxWidth: "80%" }}>
                  I can start from next Monday
                </div>
                <div className="lia-mh-msg-2 self-start rounded-[14px] rounded-tl-[4px]" style={{ background: "rgba(54,30,49,0.92)", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 12px", fontSize: "11.5px", color: "rgba(255,255,255,0.65)", lineHeight: "1.45", maxWidth: "90%" }}>
                  Connecting you to a recruiter…
                </div>
              </div>
            </div>
            <div className="lia-mh-card absolute z-[6]" style={{ right: "3%", top: "30%", width: "52%", borderRadius: "16px", background: "rgba(36,18,31,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.10)", padding: "14px 16px", boxShadow: "0 20px 48px -10px rgba(50,0,32,0.65), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(247,54,121,0.18)", transform: "rotate(3deg)" }}>
              <div className="flex items-center" style={{ gap: "10px" }}>
                <div className="lia-mh-avatar shrink-0 flex items-center justify-center rounded-full text-white font-bold" style={{ width: "34px", height: "34px", fontSize: "13px", background: "radial-gradient(circle at 35% 30%, #ffb09d 0%, #ff446a 60%, #e01855 100%)", boxShadow: "0 0 12px rgba(255,68,106,0.55)" }}>
                  S
                </div>
                <div style={{ flex: "1" }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#fff" }}>Sarah · Recruiter</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.42)", marginTop: "2px" }}>Joining the conversation</div>
                </div>
              </div>
              <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "11px", color: "rgba(255,255,255,0.40)" }}>
                Channel ·
                {/*  */}
                {" "}
                <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: "600" }}>WhatsApp</span>
                {" "}
                <span style={{ color: "rgba(219,100,255,0.80)", fontWeight: "500" }}>2.3s avg response</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ boxShadow: "0 0 0 1px rgba(247,54,121,0.18), 0 32px 80px -16px rgba(247,54,121,0.35)" }} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-230px", width: "460px", zIndex: "30", pointerEvents: "none", opacity: "0", transform: "translateX(1000.0000000000002px) translateY(531.9491924311228px)" }}>
        <p className="text-center font-poppins text-[clamp(16px,2.2vw,32px)] font-semibold tracking-[-0.02em] text-foreground">Recruitment</p>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <div className="h-px w-8 bg-[#8736f7]/60 rounded-full" />
          <div className="h-1 w-1 rounded-full bg-[#8736f7]" />
          <div className="h-px w-8 bg-[#8736f7]/60 rounded-full" />
        </div>
        <p className="mt-2 text-center font-poppins text-[clamp(11px,1.1vw,15px)] leading-snug tracking-[-0.01em] text-foreground/55 px-4">
          Screen candidates at scale with structured questions, availability capture and recruiter handoff.
        </p>
      </div>
    </>
  );
}
