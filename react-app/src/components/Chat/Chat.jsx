import betterpitchMarkWhiteSvg from '../../assets/logo/betterpitch-mark-white.svg';

/*
 * ===== chat launcher pill + fullscreen chat (client-only bundle) =====
 */
export default function Chat() {
  return (
    <>
      <div id="chat-backdrop" className="fixed inset-0 z-[39]" style={{ display: "none" }} />
      <div id="chat-launcher" className="fixed bottom-10 left-1/2 z-40" style={{ transform: "translateX(-50%) translateY(0px)", transition: "transform 0.2s ease" }}>
        <span className="cp-ring" style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-31px", marginTop: "-31px", zIndex: "-1" }} />
        {" "}
        <span className="cp-ring cp-ring-2" style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-31px", marginTop: "-31px", zIndex: "-1" }} />
        <div id="chat-morph" className="cp-morph" style={{ width: "62px", height: "62px", borderRadius: "9999px", overflow: "hidden", cursor: "pointer" }}>
          <div className="cp-orb-inner absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square h-[22px] w-[22px] cp-orb-icon" aria-hidden="true">
              <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="cp-pill-inner absolute inset-0 flex items-center" style={{ paddingLeft: "26px", paddingRight: "10px", gap: "10px", opacity: "0", display: "none" }}>
            <button type="button" className="cp-history-btn cp-pill-icon-btn shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-violet-400/50 transition-all hover:bg-violet-500/10 hover:text-violet-300 disabled:pointer-events-none disabled:opacity-30" aria-label="Chat history" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-[17px] w-[17px]" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </button>
            <div className="shrink-0" style={{ width: "1px", height: "20px", background: "rgba(250,139,189,0.15)" }} />
            <input type="text" className="cp-pill-input flex-1 min-w-0 bg-transparent text-[13.5px] tracking-[-0.01em] text-white/78 placeholder:text-white/26 outline-none font-poppins" placeholder="Ask Better Pitch anything..." defaultValue="" />
            <div className="shrink-0" style={{ width: "1px", height: "20px", background: "rgba(250,139,189,0.18)" }} />
            <button type="button" className="cp-voice-btn cp-pill-icon-btn shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-violet-400/55 transition-all hover:bg-violet-500/12 hover:text-violet-300" aria-label="Go to voice chat">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic h-[17px] w-[17px]" aria-hidden="true">
                <path d="M12 19v3" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <rect x="9" y="2" width="6" height="13" rx="3" />
              </svg>
            </button>
            {" "}
            <button type="button" className="cp-send-btn shrink-0 flex h-9 w-9 items-center justify-center rounded-full transition-all disabled:opacity-22" aria-label="Send message" disabled style={{ background: "rgba(217,40,105,0.20)", boxShadow: "none" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-[16px] w-[16px] text-white" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <span className="cp-badge absolute -right-1 -top-1 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-500 text-[9px] font-semibold text-white pointer-events-none" style={{ display: "none" }} />
      </div>
      <div id="chat-overlay" className="fc-overlay-bg fixed inset-0 z-[10000] flex flex-col overflow-hidden" style={{ display: "none", opacity: "0" }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", top: "-22%", left: "-14%", width: "62%", height: "62%", borderRadius: "50%", background: "radial-gradient(circle, rgba(217,40,105,0.22) 0%, transparent 70%)", filter: "blur(48px)", animation: "fc-drift-a 20s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-28%", right: "-16%", width: "68%", height: "68%", borderRadius: "50%", background: "radial-gradient(circle, rgba(235,37,221,0.15) 0%, transparent 70%)", filter: "blur(56px)", animation: "fc-drift-b 25s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "28%", left: "22%", width: "52%", height: "52%", borderRadius: "50%", background: "radial-gradient(circle, rgba(211,38,49,0.11) 0%, transparent 70%)", filter: "blur(64px)", animation: "fc-drift-c 17s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px 180px" }} />
        <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
          <button type="button" className="fc-retry cp-round-btn-glass flex h-9 w-9 items-center justify-center rounded-full transition-colors" aria-label="Retry last answer" style={{ display: "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw h-[15px] w-[15px]" aria-hidden="true">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </button>
          {" "}
          <button type="button" className="fc-close cp-round-btn-glass flex h-9 w-9 items-center justify-center rounded-full transition-colors" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-[15px] w-[15px]" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden px-6 lg:px-8">
            <div className="fc-greeting flex flex-1 flex-col justify-center py-10">
              <p className="mb-2 text-5xl font-light italic" style={{ fontFamily: "Georgia, serif", color: "rgba(var(--fg-rgb), 0.16)" }}>Hello</p>
              <h2 className="fc-greeting-heading mb-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-[2.6rem]">
                How can I help
                <br />
                you today?
              </h2>
              <p className="mb-10 max-w-xs text-[13px] leading-relaxed" style={{ color: "rgba(var(--fg-rgb), 0.30)" }}>
                {"Ask me anything — I'm Better Pitch, your AI voice agent."}
              </p>
            </div>
            <div className="fc-messages flex flex-1 flex-col gap-4 overflow-y-auto pb-4 pt-16 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 light:scrollbar-thumb-black/10" style={{ display: "none" }} />
            <div className="shrink-0 pb-8 pt-3">
              <div className="cp-morph flex items-center gap-3 px-4 py-3" style={{ borderRadius: "9999px" }}>
                <img src={betterpitchMarkWhiteSvg} alt="Better Pitch" className="cp-fc-logo shrink-0" style={{ width: "22px", height: "22px", objectFit: "contain", opacity: "0.75" }} />
                {" "}
                <textarea className="fc-textarea flex-1 resize-none bg-transparent py-0 text-[13.5px] focus:outline-none disabled:opacity-40" placeholder="Ask Better Pitch anything..." rows="1" aria-label="Chat input" style={{ color: "rgba(var(--fg-rgb), 0.85)", caretColor: "rgba(250,139,189,1)", maxHeight: "120px", overflowY: "auto", fontFamily: "inherit" }} />
                {" "}
                <button type="button" className="fc-voice-btn cp-pill-icon-btn shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-violet-400/55 transition-all hover:bg-violet-500/12 hover:text-violet-300" aria-label="Go to voice chat">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic h-[16px] w-[16px]" aria-hidden="true">
                    <path d="M12 19v3" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <rect x="9" y="2" width="6" height="13" rx="3" />
                  </svg>
                </button>
                {" "}
                <button type="button" className="fc-send-btn flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all disabled:pointer-events-none disabled:opacity-25 cp-send-idle-icon" aria-label="Send message" disabled style={{ background: "rgba(217,40,105,0.20)", border: "1px solid rgba(217,40,105,0.22)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
