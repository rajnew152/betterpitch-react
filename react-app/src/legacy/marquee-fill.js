/* =============================================================================
   marquee-fill.js — fills the outlined "OUR FEATURES / POWERED BY AI" marquee
   with a red → magenta gradient. Each line gets a gradient copy on top
   (css/marquee-fill.css) that sweeps in from left to right while the feature
   stage is revealed, then fades back to the plain outline as the first card
   comes in. Driven by the hero timeline's own (scrub-smoothed) time on
   desktop and by the #features block's scroll on phones; js/features.js is
   untouched.
   ============================================================================= */
(function () {
  "use strict";

  /* hero timeline time: the stage content fades in over .26–.72, the carousel
     starts at .74 and the first card is fully in around 1.0 */
  const IN_START = 0.5, IN_END = 0.76, OUT_START = 0.8, OUT_END = 1.02;

  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const smooth = (v) => v * v * (3 - 2 * v);

  let tries = 0;
  function init() {
    if (!window.gsap) return;
    /* the lines are tagged by LiaFeatures.init(), which main.js runs after us */
    const lines = Array.from(document.querySelectorAll(".lia-marquee-line"));
    if (!lines.length) { if (++tries < 300) requestAnimationFrame(init); return; }

    const fills = lines.map((line) => {
      /* clip window (css/marquee-fill.css) around the gradient copy */
      const clip = document.createElement("span");
      clip.className = "lia-marquee-fill-clip";
      clip.setAttribute("aria-hidden", "true");
      const f = document.createElement("span");
      f.className = "lia-marquee-fill";
      f.textContent = line.textContent;
      clip.appendChild(f);
      line.appendChild(clip);
      return { line, clip, f, last: "" };
    });

    const hero = document.getElementById("hero");
    const mobileWrap = document.getElementById("features") && document.getElementById("features").firstElementChild;
    let heroTl = null;

    /* perf: the phone sweep can only be non-zero while the (1400vh) #features
       block overlaps the viewport (-0.07·total < top < 0.6·vh), so while it is
       more than a viewport away the per-frame layout read below is skipped */
    let mobileNear = true;
    if (mobileWrap && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { mobileNear = e.isIntersecting; }, { rootMargin: "100% 0px" }).observe(mobileWrap);
    }

    /* returns [sweep 0..1, strength 0..1] */
    function state() {
      if (window.innerWidth < 640) {
        if (!mobileWrap || !mobileNear) return [0, 0];
        const r = mobileWrap.getBoundingClientRect(), vh = window.innerHeight;
        const total = mobileWrap.offsetHeight - vh;
        const enter = clamp01(1 - r.top / (vh * 0.6));
        const p = total > 0 ? -r.top / total : 0;
        return [smooth(enter), 1 - smooth(clamp01(p / 0.07))];
      }
      if (!heroTl && window.ScrollTrigger) {
        const st = ScrollTrigger.getAll().find((s) => s.trigger === hero && s.pin && s.animation);
        heroTl = st ? st.animation : null;
      }
      if (!heroTl) return [0, 0];
      const t = heroTl.time();
      const sweep = smooth(clamp01((t - IN_START) / (IN_END - IN_START)));
      const out = smooth(clamp01((t - OUT_START) / (OUT_END - OUT_START)));
      return [sweep, 1 - out];
    }

    function tick() {
      const [sweep, strength] = state();
      const vw = window.innerWidth;
      fills.forEach((o) => {
        let key;
        if (sweep <= 0 || strength <= 0) key = "off";
        else {
          /* sweep edge travels across the viewport, whatever the line's translate */
          const r = o.line.getBoundingClientRect();
          const soft = vw * 0.18;
          const edge = sweep >= 1 ? r.width + soft : Math.max(0, sweep * (vw + soft) - r.left);
          key = `${edge.toFixed(1)}|${strength.toFixed(3)}`;
          if (key !== o.last) {
            /* the window's soft right edge sits at `edge` (same place the old
               animated mask put it); the fill counter-moves so the text stays put */
            const shift = edge - (r.width + soft);
            o.clip.style.transform = `translate3d(${shift.toFixed(1)}px,0,0)`;
            o.f.style.transform = `translate3d(${(-shift).toFixed(1)}px,0,0)`;
            o.f.style.opacity = strength.toFixed(3);
          }
        }
        if (key === "off" && o.last !== "off") o.f.style.opacity = "0";
        o.last = key;
      });
    }

    gsap.ticker.add(tick);
    window.addEventListener("resize", () => { heroTl = null; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
