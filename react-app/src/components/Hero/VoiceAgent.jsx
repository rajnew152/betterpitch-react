export default function VoiceAgent() {
  return (
    <div className="relative z-20 order-1 flex flex-col items-center justify-center min-[1280px]:order-2" style={{ opacity: "0", transform: "scale(0.95)" }}>
      <div className="bp-sphere-module relative flex w-full max-w-[min(96vw,calc(100svh-9rem),54rem)] flex-col items-center max-[359px]:max-w-[min(100vw,calc(100svh-8rem),54rem)] min-[640px]:max-[1279px]:max-w-[min(88%,calc(100svh-15rem))] min-[1280px]:max-w-[min(46rem,calc(100svh-10rem))]" style={{ transformOrigin: "50% 50%" }}>
        {/* voice-level rings container (js/voice.js); the particle sphere needs no rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" />
        {/* aigentx-style particle sphere with the "AI" mark (js/particle-sphere.js, */}
        {/* css/particle-sphere.css) over the reference's flickering grid */}
        <div className="bp-sphere-grid" aria-hidden="true" />
        <div className="relative aspect-square w-full">
          <canvas className="bp-sphere-canvas" aria-hidden="true" />
        </div>
        <div className="bp-sphere-controls absolute left-1/2 top-1/2 flex w-[46%] max-w-[12rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2.5 text-center min-[640px]:max-[1023px]:max-w-[8rem] min-[640px]:max-[1023px]:gap-2 lg:w-[42%] lg:gap-3">
          <div className="pointer-events-none flex items-center gap-1.5">
            <span className="block w-[0.18rem] rounded-full bg-foreground shadow-[0_0_14px_rgba(var(--fg-rgb),0.95)] md:w-[0.22rem]" style={{ height: "14px" }} />
            <span className="block w-[0.18rem] rounded-full bg-foreground shadow-[0_0_14px_rgba(var(--fg-rgb),0.95)] md:w-[0.22rem]" style={{ height: "19px" }} />
            <span className="block w-[0.18rem] rounded-full bg-foreground shadow-[0_0_14px_rgba(var(--fg-rgb),0.95)] md:w-[0.22rem]" style={{ height: "24px" }} />
            <span className="block w-[0.18rem] rounded-full bg-foreground shadow-[0_0_14px_rgba(var(--fg-rgb),0.95)] md:w-[0.22rem]" style={{ height: "14px" }} />
            <span className="block w-[0.18rem] rounded-full bg-foreground shadow-[0_0_14px_rgba(var(--fg-rgb),0.95)] md:w-[0.22rem]" style={{ height: "19px" }} />
            <span className="block w-[0.18rem] rounded-full bg-foreground shadow-[0_0_14px_rgba(var(--fg-rgb),0.95)] md:w-[0.22rem]" style={{ height: "24px" }} />
            <span className="block w-[0.18rem] rounded-full bg-foreground shadow-[0_0_14px_rgba(var(--fg-rgb),0.95)] md:w-[0.22rem]" style={{ height: "14px" }} />
          </div>
          <div className="pointer-events-none flex flex-col items-center gap-1.5">
            <p className="font-jura text-[0.8rem] font-medium leading-none tracking-[0.1em] text-foreground/90 min-[640px]:max-[1023px]:text-[0.72rem] lg:text-base">
              Voice input unsupported
            </p>
          </div>
          <button type="button" aria-label="Start voice input" className="pointer-events-auto relative mt-7 flex h-11 w-11 items-center justify-center rounded-full border bg-[#110121]/90 light:bg-[#f7f4fd]/95 text-foreground shadow-[0_0_24px_rgba(200,40,255,0.4)] light:shadow-[0_0_24px_rgba(200,40,255,0.16)] backdrop-blur-md transition-colors min-[640px]:max-[1023px]:mt-4 min-[640px]:max-[1023px]:h-9 min-[640px]:max-[1023px]:w-9 lg:mt-12 lg:h-12 lg:w-12 border-[#a420d1]" tabIndex="0">
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(215,60,255,0.4),transparent_70%)] light:bg-[radial-gradient(circle,rgba(215,60,255,0.15),transparent_70%)]" />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic relative h-5 w-5 text-[#f2a8ff] light:text-[#6b21a8]" aria-hidden="true">
              <path d="M12 19v3" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <rect x="9" y="2" width="6" height="13" rx="3" />
            </svg>
          </button>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-full mt-3 h-0 w-0 md:mt-4 lg:mt-1" />
      </div>
    </div>
  );
}
