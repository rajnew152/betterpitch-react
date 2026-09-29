import './Industries.css';
import betterpitchWhiteSvg from '../../assets/logo/betterpitch-white.svg';

export default function Industries() {
  return (
    <section id="section-cinematic-project" className="relative isolate min-h-screen w-full overflow-hidden bg-[#231041] text-foreground light:bg-[#f3effc]">
      <div className="relative h-screen w-full overflow-hidden bg-[#231041] light:bg-[#f3effc]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(63,24,188,0.92),transparent_28%),radial-gradient(circle_at_66%_36%,rgba(226,50,219,0.72),transparent_30%),linear-gradient(180deg,#231041_0%,#180d32_30%,#0a0518_58%,#000000_100%)] light:bg-[radial-gradient(circle_at_28%_22%,rgba(63,24,188,0.10),transparent_28%),radial-gradient(circle_at_66%_36%,rgba(226,50,219,0.08),transparent_30%),linear-gradient(180deg,#f8f6fc_0%,#f4f1fa_25%,#fbf9fd_55%,#ffffff_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/90 to-transparent light:from-white light:via-white/90 light:to-transparent" />
        <div className="absolute left-1/2 top-[80px] h-[510px] w-[980px] -translate-x-1/2 sm:top-[-0px] sm:h-[614px] sm:w-[1180px] lg:top-[4px] lg:h-[542px] lg:w-[1090px] 2xl:top-[-40px] 2xl:h-[718px] 2xl:w-[1380px]">
          <div className="pointer-events-none absolute inset-x-[12%] bottom-[6%] h-40 rounded-[50%] bg-violet-700/18 light:bg-violet-400/12 blur-[70px]" />
          <div data-cinematic-wheel="true" className="absolute inset-0" style={{ "--manual-rotation": "0deg", "--scroll-rotation": "0deg", transform: "rotate(calc(var(--manual-rotation) + var(--scroll-rotation)))", transformOrigin: "50% -26%", willChange: "transform" }}>
            <svg className="h-full w-full overflow-visible" viewBox="0 0 1000 520" aria-hidden="true">
              <defs>
                <clipPath id="cinematic-wheel-segment-0">
                  <path d="M 744.1234 616.3346 A 790 790 0 0 1 255.8766 616.3346 L 425.8359 93.2536 A 240 240 0 0 0 574.1641 93.2536 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-1">
                  <path d="M 255.8766 616.3346 A 790 790 0 0 1 -139.1234 329.3503 L 305.8359 6.0685 A 240 240 0 0 0 425.8359 93.2536 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-2">
                  <path d="M -139.1234 329.3503 A 790 790 0 0 1 -290.0000 -135.0000 L 260.0000 -135.0000 A 240 240 0 0 0 305.8359 6.0685 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-3">
                  <path d="M -290.0000 -135.0000 A 790 790 0 0 1 -139.1234 -599.3503 L 305.8359 -276.0685 A 240 240 0 0 0 260.0000 -135.0000 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-4">
                  <path d="M -139.1234 -599.3503 A 790 790 0 0 1 255.8766 -886.3346 L 425.8359 -363.2536 A 240 240 0 0 0 305.8359 -276.0685 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-5">
                  <path d="M 255.8766 -886.3346 A 790 790 0 0 1 744.1234 -886.3346 L 574.1641 -363.2536 A 240 240 0 0 0 425.8359 -363.2536 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-6">
                  <path d="M 744.1234 -886.3346 A 790 790 0 0 1 1139.1234 -599.3503 L 694.1641 -276.0685 A 240 240 0 0 0 574.1641 -363.2536 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-7">
                  <path d="M 1139.1234 -599.3503 A 790 790 0 0 1 1290.0000 -135.0000 L 740.0000 -135.0000 A 240 240 0 0 0 694.1641 -276.0685 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-8">
                  <path d="M 1290.0000 -135.0000 A 790 790 0 0 1 1139.1234 329.3503 L 694.1641 6.0685 A 240 240 0 0 0 740.0000 -135.0000 Z" />
                </clipPath>
                <clipPath id="cinematic-wheel-segment-9">
                  <path d="M 1139.1234 329.3503 A 790 790 0 0 1 744.1234 616.3346 L 574.1641 93.2536 A 240 240 0 0 0 694.1641 6.0685 Z" />
                </clipPath>
                {/* segment fill: the voice demo card's gradient (css/card-demo.css), per segment —
                    base: linear-gradient(158deg, #ff5a2c 0%, #f4301f 36%, #e8173f 66%, #cf159f 100%) */}
                <linearGradient id="cinematicGlassBase" x1="31%" y1="3%" x2="69%" y2="97%">
                  <stop offset="0%" stopColor="#ff5a2c" stopOpacity="1" />
                  <stop offset="36%" stopColor="#f4301f" stopOpacity="1" />
                  <stop offset="66%" stopColor="#e8173f" stopOpacity="1" />
                  <stop offset="100%" stopColor="#cf159f" stopOpacity="1" />
                </linearGradient>
                {/* radial-gradient(80% 62% at 0% 100%, rgba(214, 22, 214, 0.9), transparent 62%) */}
                <radialGradient id="cinematicColorBleed" cx="0%" cy="100%" r="80%">
                  <stop offset="0%" stopColor="#d616d6" stopOpacity="0.9" />
                  <stop offset="62%" stopColor="#d616d6" stopOpacity="0" />
                  <stop offset="100%" stopColor="#d616d6" stopOpacity="0" />
                </radialGradient>
                {/* radial-gradient(70% 50% at 88% 4%, rgba(255, 150, 200, 0.55), transparent 60%) */}
                <radialGradient id="cinematicSpecular" cx="88%" cy="4%" r="70%">
                  <stop offset="0%" stopColor="#ff96c8" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#ff96c8" stopOpacity="0" />
                  <stop offset="100%" stopColor="#ff96c8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cinematicRimGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
                  <stop offset="38%" stopColor="#e23632" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#bc1863" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <g className="cps-wheel-glass">
                <path d="M 744.1234 616.3346 A 790 790 0 0 1 255.8766 616.3346 L 425.8359 93.2536 A 240 240 0 0 0 574.1641 93.2536 Z" fill="url(#cinematicGlassBase)" />
                <path d="M 744.1234 616.3346 A 790 790 0 0 1 255.8766 616.3346 L 425.8359 93.2536 A 240 240 0 0 0 574.1641 93.2536 Z" fill="url(#cinematicColorBleed)" />
                <path d="M 744.1234 616.3346 A 790 790 0 0 1 255.8766 616.3346 L 425.8359 93.2536 A 240 240 0 0 0 574.1641 93.2536 Z" fill="url(#cinematicSpecular)" />
                <path d="M 744.1234 616.3346 A 790 790 0 0 1 255.8766 616.3346 L 425.8359 93.2536 A 240 240 0 0 0 574.1641 93.2536 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 744.1234 616.3346 A 790 790 0 0 1 255.8766 616.3346 L 425.8359 93.2536 A 240 240 0 0 0 574.1641 93.2536 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M 744.1234 616.3346 A 790 790 0 0 1 255.8766 616.3346 L 425.8359 93.2536 A 240 240 0 0 0 574.1641 93.2536 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M 255.8766 616.3346 A 790 790 0 0 1 -139.1234 329.3503 L 305.8359 6.0685 A 240 240 0 0 0 425.8359 93.2536 Z" fill="url(#cinematicGlassBase)" />
                <path d="M 255.8766 616.3346 A 790 790 0 0 1 -139.1234 329.3503 L 305.8359 6.0685 A 240 240 0 0 0 425.8359 93.2536 Z" fill="url(#cinematicColorBleed)" />
                <path d="M 255.8766 616.3346 A 790 790 0 0 1 -139.1234 329.3503 L 305.8359 6.0685 A 240 240 0 0 0 425.8359 93.2536 Z" fill="url(#cinematicSpecular)" />
                <path d="M 255.8766 616.3346 A 790 790 0 0 1 -139.1234 329.3503 L 305.8359 6.0685 A 240 240 0 0 0 425.8359 93.2536 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 255.8766 616.3346 A 790 790 0 0 1 -139.1234 329.3503 L 305.8359 6.0685 A 240 240 0 0 0 425.8359 93.2536 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M 255.8766 616.3346 A 790 790 0 0 1 -139.1234 329.3503 L 305.8359 6.0685 A 240 240 0 0 0 425.8359 93.2536 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M -139.1234 329.3503 A 790 790 0 0 1 -290.0000 -135.0000 L 260.0000 -135.0000 A 240 240 0 0 0 305.8359 6.0685 Z" fill="url(#cinematicGlassBase)" />
                <path d="M -139.1234 329.3503 A 790 790 0 0 1 -290.0000 -135.0000 L 260.0000 -135.0000 A 240 240 0 0 0 305.8359 6.0685 Z" fill="url(#cinematicColorBleed)" />
                <path d="M -139.1234 329.3503 A 790 790 0 0 1 -290.0000 -135.0000 L 260.0000 -135.0000 A 240 240 0 0 0 305.8359 6.0685 Z" fill="url(#cinematicSpecular)" />
                <path d="M -139.1234 329.3503 A 790 790 0 0 1 -290.0000 -135.0000 L 260.0000 -135.0000 A 240 240 0 0 0 305.8359 6.0685 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M -139.1234 329.3503 A 790 790 0 0 1 -290.0000 -135.0000 L 260.0000 -135.0000 A 240 240 0 0 0 305.8359 6.0685 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M -139.1234 329.3503 A 790 790 0 0 1 -290.0000 -135.0000 L 260.0000 -135.0000 A 240 240 0 0 0 305.8359 6.0685 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M -290.0000 -135.0000 A 790 790 0 0 1 -139.1234 -599.3503 L 305.8359 -276.0685 A 240 240 0 0 0 260.0000 -135.0000 Z" fill="url(#cinematicGlassBase)" />
                <path d="M -290.0000 -135.0000 A 790 790 0 0 1 -139.1234 -599.3503 L 305.8359 -276.0685 A 240 240 0 0 0 260.0000 -135.0000 Z" fill="url(#cinematicColorBleed)" />
                <path d="M -290.0000 -135.0000 A 790 790 0 0 1 -139.1234 -599.3503 L 305.8359 -276.0685 A 240 240 0 0 0 260.0000 -135.0000 Z" fill="url(#cinematicSpecular)" />
                <path d="M -290.0000 -135.0000 A 790 790 0 0 1 -139.1234 -599.3503 L 305.8359 -276.0685 A 240 240 0 0 0 260.0000 -135.0000 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M -290.0000 -135.0000 A 790 790 0 0 1 -139.1234 -599.3503 L 305.8359 -276.0685 A 240 240 0 0 0 260.0000 -135.0000 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M -290.0000 -135.0000 A 790 790 0 0 1 -139.1234 -599.3503 L 305.8359 -276.0685 A 240 240 0 0 0 260.0000 -135.0000 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M -139.1234 -599.3503 A 790 790 0 0 1 255.8766 -886.3346 L 425.8359 -363.2536 A 240 240 0 0 0 305.8359 -276.0685 Z" fill="url(#cinematicGlassBase)" />
                <path d="M -139.1234 -599.3503 A 790 790 0 0 1 255.8766 -886.3346 L 425.8359 -363.2536 A 240 240 0 0 0 305.8359 -276.0685 Z" fill="url(#cinematicColorBleed)" />
                <path d="M -139.1234 -599.3503 A 790 790 0 0 1 255.8766 -886.3346 L 425.8359 -363.2536 A 240 240 0 0 0 305.8359 -276.0685 Z" fill="url(#cinematicSpecular)" />
                <path d="M -139.1234 -599.3503 A 790 790 0 0 1 255.8766 -886.3346 L 425.8359 -363.2536 A 240 240 0 0 0 305.8359 -276.0685 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M -139.1234 -599.3503 A 790 790 0 0 1 255.8766 -886.3346 L 425.8359 -363.2536 A 240 240 0 0 0 305.8359 -276.0685 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M -139.1234 -599.3503 A 790 790 0 0 1 255.8766 -886.3346 L 425.8359 -363.2536 A 240 240 0 0 0 305.8359 -276.0685 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M 255.8766 -886.3346 A 790 790 0 0 1 744.1234 -886.3346 L 574.1641 -363.2536 A 240 240 0 0 0 425.8359 -363.2536 Z" fill="url(#cinematicGlassBase)" />
                <path d="M 255.8766 -886.3346 A 790 790 0 0 1 744.1234 -886.3346 L 574.1641 -363.2536 A 240 240 0 0 0 425.8359 -363.2536 Z" fill="url(#cinematicColorBleed)" />
                <path d="M 255.8766 -886.3346 A 790 790 0 0 1 744.1234 -886.3346 L 574.1641 -363.2536 A 240 240 0 0 0 425.8359 -363.2536 Z" fill="url(#cinematicSpecular)" />
                <path d="M 255.8766 -886.3346 A 790 790 0 0 1 744.1234 -886.3346 L 574.1641 -363.2536 A 240 240 0 0 0 425.8359 -363.2536 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 255.8766 -886.3346 A 790 790 0 0 1 744.1234 -886.3346 L 574.1641 -363.2536 A 240 240 0 0 0 425.8359 -363.2536 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M 255.8766 -886.3346 A 790 790 0 0 1 744.1234 -886.3346 L 574.1641 -363.2536 A 240 240 0 0 0 425.8359 -363.2536 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M 744.1234 -886.3346 A 790 790 0 0 1 1139.1234 -599.3503 L 694.1641 -276.0685 A 240 240 0 0 0 574.1641 -363.2536 Z" fill="url(#cinematicGlassBase)" />
                <path d="M 744.1234 -886.3346 A 790 790 0 0 1 1139.1234 -599.3503 L 694.1641 -276.0685 A 240 240 0 0 0 574.1641 -363.2536 Z" fill="url(#cinematicColorBleed)" />
                <path d="M 744.1234 -886.3346 A 790 790 0 0 1 1139.1234 -599.3503 L 694.1641 -276.0685 A 240 240 0 0 0 574.1641 -363.2536 Z" fill="url(#cinematicSpecular)" />
                <path d="M 744.1234 -886.3346 A 790 790 0 0 1 1139.1234 -599.3503 L 694.1641 -276.0685 A 240 240 0 0 0 574.1641 -363.2536 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 744.1234 -886.3346 A 790 790 0 0 1 1139.1234 -599.3503 L 694.1641 -276.0685 A 240 240 0 0 0 574.1641 -363.2536 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M 744.1234 -886.3346 A 790 790 0 0 1 1139.1234 -599.3503 L 694.1641 -276.0685 A 240 240 0 0 0 574.1641 -363.2536 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M 1139.1234 -599.3503 A 790 790 0 0 1 1290.0000 -135.0000 L 740.0000 -135.0000 A 240 240 0 0 0 694.1641 -276.0685 Z" fill="url(#cinematicGlassBase)" />
                <path d="M 1139.1234 -599.3503 A 790 790 0 0 1 1290.0000 -135.0000 L 740.0000 -135.0000 A 240 240 0 0 0 694.1641 -276.0685 Z" fill="url(#cinematicColorBleed)" />
                <path d="M 1139.1234 -599.3503 A 790 790 0 0 1 1290.0000 -135.0000 L 740.0000 -135.0000 A 240 240 0 0 0 694.1641 -276.0685 Z" fill="url(#cinematicSpecular)" />
                <path d="M 1139.1234 -599.3503 A 790 790 0 0 1 1290.0000 -135.0000 L 740.0000 -135.0000 A 240 240 0 0 0 694.1641 -276.0685 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 1139.1234 -599.3503 A 790 790 0 0 1 1290.0000 -135.0000 L 740.0000 -135.0000 A 240 240 0 0 0 694.1641 -276.0685 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M 1139.1234 -599.3503 A 790 790 0 0 1 1290.0000 -135.0000 L 740.0000 -135.0000 A 240 240 0 0 0 694.1641 -276.0685 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M 1290.0000 -135.0000 A 790 790 0 0 1 1139.1234 329.3503 L 694.1641 6.0685 A 240 240 0 0 0 740.0000 -135.0000 Z" fill="url(#cinematicGlassBase)" />
                <path d="M 1290.0000 -135.0000 A 790 790 0 0 1 1139.1234 329.3503 L 694.1641 6.0685 A 240 240 0 0 0 740.0000 -135.0000 Z" fill="url(#cinematicColorBleed)" />
                <path d="M 1290.0000 -135.0000 A 790 790 0 0 1 1139.1234 329.3503 L 694.1641 6.0685 A 240 240 0 0 0 740.0000 -135.0000 Z" fill="url(#cinematicSpecular)" />
                <path d="M 1290.0000 -135.0000 A 790 790 0 0 1 1139.1234 329.3503 L 694.1641 6.0685 A 240 240 0 0 0 740.0000 -135.0000 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 1290.0000 -135.0000 A 790 790 0 0 1 1139.1234 329.3503 L 694.1641 6.0685 A 240 240 0 0 0 740.0000 -135.0000 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M 1290.0000 -135.0000 A 790 790 0 0 1 1139.1234 329.3503 L 694.1641 6.0685 A 240 240 0 0 0 740.0000 -135.0000 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
              <g className="cps-wheel-glass">
                <path d="M 1139.1234 329.3503 A 790 790 0 0 1 744.1234 616.3346 L 574.1641 93.2536 A 240 240 0 0 0 694.1641 6.0685 Z" fill="url(#cinematicGlassBase)" />
                <path d="M 1139.1234 329.3503 A 790 790 0 0 1 744.1234 616.3346 L 574.1641 93.2536 A 240 240 0 0 0 694.1641 6.0685 Z" fill="url(#cinematicColorBleed)" />
                <path d="M 1139.1234 329.3503 A 790 790 0 0 1 744.1234 616.3346 L 574.1641 93.2536 A 240 240 0 0 0 694.1641 6.0685 Z" fill="url(#cinematicSpecular)" />
                <path d="M 1139.1234 329.3503 A 790 790 0 0 1 744.1234 616.3346 L 574.1641 93.2536 A 240 240 0 0 0 694.1641 6.0685 Z" className="cps-wheel-divider" fill="none" stroke="#411022" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 1139.1234 329.3503 A 790 790 0 0 1 744.1234 616.3346 L 574.1641 93.2536 A 240 240 0 0 0 694.1641 6.0685 Z" fill="none" stroke="url(#cinematicRimGlow)" strokeOpacity="0.9" strokeWidth="0.7" />
                <path d="M 1139.1234 329.3503 A 790 790 0 0 1 744.1234 616.3346 L 574.1641 93.2536 A 240 240 0 0 0 694.1641 6.0685 Z" className="cps-wheel-hairline" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="0.4" />
              </g>
            </svg>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "50.0000%", top: "81.7308%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 lucide-building-2 h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M10 12h4" />
                    <path d="M10 8h4" />
                    <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                    <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  Hospitality
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Confirm bookings, answer pre-arrival questions and upsell stays in every guest’s language.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "17.0840%", top: "61.1634%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  Real Estate
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Call every lead back in under 4 minutes, qualify intent and book 5× more site visits.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "-3.2592%", top: "7.3172%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                    <path d="M22 10v6" />
                    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  {"EdTech & Education"}
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Reach every enquiry within minutes, counsel on courses and book demo classes.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "-3.2592%", top: "-59.2403%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  {"Contact Centres & BPO"}
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Absorb peak volumes with AI agents on tier-1 calls and warm handoffs for the rest.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "17.0840%", top: "-113.0864%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ship h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M12 10.189V14" />
                    <path d="M12 2v3" />
                    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
                    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  Logistics
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Confirm deliveries, chase NDRs and cut return-to-origin losses with automated calls.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "50.0000%", top: "-133.6538%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plane h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  {"Travel & Airlines"}
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Rebookings, trip updates and baggage queries answered instantly, day or night.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "82.9160%", top: "-113.0864%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M10 18v-7" />
                    <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" />
                    <path d="M14 18v-7" />
                    <path d="M18 18v-7" />
                    <path d="M3 22h18" />
                    <path d="M6 18v-7" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  {"BFSI & NBFC"}
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  40% higher EMI recovery with compliant call windows, dispositions and audit trails.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "103.2592%", top: "-59.2403%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" pathLength="100" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  Healthcare
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Confirm, remind and reschedule appointments by phone to cut no-shows across clinics.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "103.2592%", top: "7.3172%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx="4" cy="20" r="2" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  Your Industry
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  Insurance, automotive, solar and beyond: every sector gets its own deployment playbook, built and run for you.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[220px] 2xl:w-[250px]" style={{ left: "82.9160%", top: "61.1634%" }}>
              <div data-cinematic-wheel-detail="true" className="flex flex-col items-center text-center text-foreground drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] light:drop-shadow-none" style={{ "--manual-counter-rotation": "0deg", "--scroll-counter-rotation": "0deg", transform: "rotate(calc(var(--manual-counter-rotation) + var(--scroll-counter-rotation)))", willChange: "transform" }}>
                <div className="mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-violet-200/20 bg-gradient-to-br from-[#3f18bc]/50 to-[#07030f]/80 shadow-[inset_0_0_18px_rgba(177,92,255,0.12),0_0_24px_rgba(168,85,247,0.34)] light:border-violet-200/70 light:bg-gradient-to-br light:from-white light:to-[#f3effc] light:shadow-[inset_0_0_18px_rgba(177,92,255,0.06),0_4px_20px_rgba(120,80,200,0.16)] sm:h-[80px] sm:w-[80px] lg:h-[84px] lg:w-[84px] 2xl:h-[92px] 2xl:w-[92px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag h-8 w-8 text-[#b15cff] drop-shadow-[0_0_12px_rgba(177,92,255,0.9)] light:text-[#7c3aed] light:drop-shadow-none sm:h-9 sm:w-9 2xl:h-10 2xl:w-10" aria-hidden="true">
                    <path d="M16 10a4 4 0 0 1-8 0" />
                    <path d="M3.103 6.034h17.794" />
                    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-foreground light:text-[#1e1442] sm:text-[1.05rem] lg:text-[1.1rem] 2xl:text-[1.25rem]">
                  {"D2C & E-commerce"}
                </h3>
                <span className="mt-1.5 block h-0.5 w-10 bg-gradient-to-r from-[#ffb066] via-fuchsia-400 to-transparent" />
                <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-foreground/60 light:text-[#4b4560]/85 sm:text-[0.80rem] sm:leading-5 lg:text-[0.87rem] 2xl:text-[0.92rem]">
                  COD confirmation, cart recovery and NDR calls that recovered 3.2× revenue for online brands.
                </p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[-295px] h-[490px] w-[570px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#0c0422] via-[#080318] to-[#030110] shadow-[0_20px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(63,24,188,0.10),inset_0_0_30px_rgba(63,24,188,0.05)] ring-1 ring-violet-900/15 light:from-white light:via-white light:to-white light:shadow-none light:ring-0 sm:top-[-352px] sm:h-[610px] sm:w-[695px] lg:top-[-322px] lg:h-[576px] lg:w-[628px] 2xl:top-[-420px] 2xl:h-[750px] 2xl:w-[830px]" />
          <div className="pointer-events-none absolute left-1/2 top-[10px] z-10 -translate-x-1/2 text-center sm:top-[95px] lg:top-[70px] 2xl:top-[110px]">
            <p className="text-[0.55rem] font-medium uppercase tracking-[0.32em] text-foreground/35 light:text-[#4b4560]/70 sm:text-[0.6rem]">Built for every industry</p>
            <div role="img" aria-label="Better Pitch" className="mx-auto mt-6 bg-white light:bg-[#3f18bc]" style={{ width: "clamp(112px, 10.5vw, 216px)", aspectRatio: "609 / 130", WebkitMaskImage: `url("${betterpitchWhiteSvg}")`, maskImage: `url("${betterpitchWhiteSvg}")`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
            <p className="mt-5 text-[0.55rem] uppercase tracking-[0.22em] text-foreground/38 light:text-[#4b4560]/60 sm:mt-7 sm:text-[0.62rem]">Voice AI Platform</p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-[78%] z-20 flex items-center justify-between px-3 sm:px-6 lg:px-4">
          <button type="button" className="pointer-events-auto flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-full px-4 py-2 text-[0.78rem] font-semibold tracking-wide text-foreground/70 transition-all duration-300 hover:bg-violet-500/20 hover:text-foreground hover:shadow-[0_0_16px_rgba(139,92,246,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:text-[0.88rem] lg:text-[0.95rem]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5 rotate-180 sm:h-4 sm:w-4" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            <span>Prev</span>
          </button>
          <button type="button" className="pointer-events-auto flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-full px-4 py-2 text-[0.78rem] font-semibold tracking-wide text-foreground/70 transition-all duration-300 hover:bg-violet-500/20 hover:text-foreground hover:shadow-[0_0_16px_rgba(139,92,246,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:text-[0.88rem] lg:text-[0.95rem]">
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
