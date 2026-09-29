import './RealEstateCard.css';
import betterpitchMarkWhiteSvg from '../../../assets/logo/betterpitch-mark-white.svg';

export default function RealEstateCard() {
  return (
    <>
      <div style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-230px", marginTop: "-338px", width: "460px", height: "580px", zIndex: "12", opacity: "0", transform: "translateX(1000.0000000000002px) translateY(267.9491924311228px) rotate(30deg)" }}>
        <div className="w-full h-full rounded-[28px] overflow-hidden">
          <div className="relative mx-auto w-full max-w-[640px] justify-self-end overflow-hidden rounded-[28px]" style={{ boxShadow: "0 30px 80px -20px rgba(200,30,114,0.45), 0 0 0 1px rgba(255,255,255,0.04)", background: "radial-gradient(85% 60% at 12% 0%,  rgba(255,130,229,0.50) 0%, transparent 55%),\n          radial-gradient(70% 55% at 92% 100%,rgba(255,60,153,0.42)  0%, transparent 60%),\n          radial-gradient(60% 50% at 50% 50%, rgba(200,30,108,0.30)   0%, transparent 65%),\n          linear-gradient(160deg, #a81867 0%, #c81871 40%, #68083f 100%)", height: "100%" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwLjYgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==\")" }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(52% 40% at 76% 14%, rgba(255,255,255,0.20) 0%, transparent 60%)", mixBlendMode: "screen" }} />
            <div className="absolute z-[5]" style={{ top: "6%", left: "7%", right: "7%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)" }}>
                <div className="lia-mm-live-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", flexShrink: "0" }} />
                <span style={{ fontSize: "11.5px", fontWeight: "500", color: "rgba(255,255,255,0.72)" }}>Better Pitch · Sending media</span>
              </div>
            </div>
            <div className="absolute z-[5] flex flex-col" style={{ top: "17%", left: "7%", right: "7%", gap: "10px" }}>
              <div className="lia-mm-rise-1" style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ maxWidth: "82%", padding: "11px 14px", borderRadius: "18px 18px 4px 18px", background: "rgba(255,255,255,0.94)", boxShadow: "0 6px 20px -4px rgba(0,0,0,0.30)" }}>
                  <p style={{ fontSize: "13px", lineHeight: "1.55", color: "#3a0a20", margin: "0" }}>Can you show me the 3BHK and the view?</p>
                </div>
              </div>
              <div className="lia-mm-rise-2" style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", flexShrink: "0", marginTop: "2px", background: "linear-gradient(135deg, #ff6099 0%, #e0307d 100%)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(255,40,121,0.45)" }}>
                  <img src={betterpitchMarkWhiteSvg} alt="Better Pitch" width="124" height="130" style={{ width: "48%", objectFit: "contain", filter: "drop-shadow(0 0 4px rgba(255,160,193,0.60))" }} />
                </div>
                <div style={{ maxWidth: "80%", padding: "11px 14px", borderRadius: "18px 18px 18px 4px", background: "rgba(70,12,40,0.78)", border: "1px solid rgba(255,255,255,0.13)", boxShadow: "0 6px 20px -4px rgba(0,0,0,0.40)" }}>
                  <p style={{ fontSize: "13px", lineHeight: "1.55", color: "rgba(255,255,255,0.90)", margin: "0" }}>{"Of course — here's a quick look 📸"}</p>
                </div>
              </div>
              <div className="lia-mm-rise-3" style={{ marginLeft: "38px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div className="lia-mm-thumb" style={{ position: "relative", overflow: "hidden", aspectRatio: "1 / 1", borderRadius: "13px", border: "1px solid rgba(255,255,255,0.16)", background: "linear-gradient(140deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.02) 100%), radial-gradient(80% 80% at 20% 30%, rgba(255,140,242,0.35) 0%, rgba(150,20,86,0.55) 70%)", animationDelay: "0s" }}>
                  <div className="lia-mm-sheen" />
                  <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image" aria-hidden="true">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <span style={{ position: "absolute", bottom: "6px", left: "7px", fontSize: "9.5px", fontWeight: "500", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                    Living room
                  </span>
                </div>
                <div className="lia-mm-thumb" style={{ position: "relative", overflow: "hidden", aspectRatio: "1 / 1", borderRadius: "13px", border: "1px solid rgba(255,255,255,0.16)", background: "linear-gradient(160deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.02) 100%), radial-gradient(80% 80% at 35% 40%, rgba(255,140,242,0.35) 0%, rgba(150,20,86,0.55) 70%)", animationDelay: "0.12s" }}>
                  <div className="lia-mm-sheen" />
                  <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image" aria-hidden="true">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <span style={{ position: "absolute", bottom: "6px", left: "7px", fontSize: "9.5px", fontWeight: "500", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                    Master bedroom
                  </span>
                </div>
                <div className="lia-mm-thumb" style={{ position: "relative", overflow: "hidden", aspectRatio: "1 / 1", borderRadius: "13px", border: "1px solid rgba(255,255,255,0.16)", background: "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.02) 100%), radial-gradient(80% 80% at 50% 50%, rgba(255,140,242,0.35) 0%, rgba(150,20,86,0.55) 70%)", animationDelay: "0.24s" }}>
                  <div className="lia-mm-sheen" />
                  <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="lia-mm-play" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.35)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#3a0a20" stroke="#3a0a20" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play" aria-hidden="true" style={{ marginLeft: "1.5px" }}>
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                      </svg>
                    </div>
                  </div>
                  <span style={{ position: "absolute", bottom: "6px", right: "7px", fontSize: "9.5px", fontWeight: "600", color: "rgba(255,255,255,0.92)", background: "rgba(0,0,0,0.45)", padding: "1.5px 5px", borderRadius: "5px" }}>
                    0:18
                  </span>
                  <span style={{ position: "absolute", bottom: "6px", left: "7px", fontSize: "9.5px", fontWeight: "500", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }} />
                </div>
                <div className="lia-mm-thumb" style={{ position: "relative", overflow: "hidden", aspectRatio: "1 / 1", borderRadius: "13px", border: "1px solid rgba(255,255,255,0.16)", background: "linear-gradient(200deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.02) 100%), radial-gradient(80% 80% at 65% 60%, rgba(255,140,242,0.35) 0%, rgba(150,20,86,0.55) 70%)", animationDelay: "0.36s" }}>
                  <div className="lia-mm-sheen" />
                  <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image" aria-hidden="true">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <span style={{ position: "absolute", bottom: "6px", left: "7px", fontSize: "9.5px", fontWeight: "500", color: "rgba(255,255,255,0.85)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                    City view
                  </span>
                </div>
              </div>
              <div className="lia-mm-rise-4" style={{ marginLeft: "38px", display: "inline-flex", alignItems: "center", gap: "6px", alignSelf: "flex-start", padding: "6px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontSize: "10.5px", fontWeight: "500", color: "rgba(255,255,255,0.75)" }}>4 photos · 1 video attached</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ boxShadow: "0 0 0 1px rgba(247,54,121,0.18), 0 32px 80px -16px rgba(247,54,121,0.35)" }} />
        <a href="https://youtu.be/h6zhExjEBfE?si=ltzbkKDjowHOnmSO" target="_blank" rel="noopener noreferrer" className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5 text-[11px] font-medium transition-transform hover:scale-[1.04]" style={{ color: "#fff", background: "rgba(14,10,13,0.55)", backdropFilter: "blur(10px) saturate(140%)", WebkitBackdropFilter: "blur(10px) saturate(140%)", border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 6px 18px -6px rgba(0,0,0,0.5)" }}>
          <span className="flex items-center justify-center rounded-full" style={{ width: "18px", height: "18px", background: "#ff0033" }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "1px" }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          Watch video
        </a>
      </div>
      <div style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-230px", width: "460px", zIndex: "30", pointerEvents: "none", opacity: "0", transform: "translateX(1000.0000000000002px) translateY(531.9491924311228px)" }}>
        <p className="text-center font-poppins text-[clamp(16px,2.2vw,32px)] font-semibold tracking-[-0.02em] text-foreground">Real Estate</p>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <div className="h-px w-8 bg-[#8736f7]/60 rounded-full" />
          <div className="h-1 w-1 rounded-full bg-[#8736f7]" />
          <div className="h-px w-8 bg-[#8736f7]/60 rounded-full" />
        </div>
        <p className="mt-2 text-center font-poppins text-[clamp(11px,1.1vw,15px)] leading-snug tracking-[-0.01em] text-foreground/55 px-4">
          Call every lead back fast, share property photos and book up to 5× more site visits.
        </p>
      </div>
    </>
  );
}
