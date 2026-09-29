/*
 * Client-only UI. On the reference site these nodes are created in the
 * browser (React portals / hydration), so they are absent from the SSR DOM.
 * ===== voice caption (portal under body, positioned by js/voice.js) =====
 */
export default function HeroCaption() {
  return (
    <p id="hero-caption" className="pointer-events-none fixed z-[999] max-w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden whitespace-nowrap text-center text-[0.78rem] leading-snug text-foreground/80 [text-shadow:0_1px_8px_rgba(var(--bg-rgb),0.9)] md:max-w-[28rem] md:text-[0.88rem]" style={{ opacity: "0", display: "none" }}>
      <span className="hero-caption-speaker mr-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-violet-400/70" />
      <span className="hero-caption-text" aria-live="polite" />
    </p>
  );
}
