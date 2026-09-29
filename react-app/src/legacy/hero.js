/* =============================================================================
   hero.js — hero entrance animations and the pinned scroll "reveal" timeline
   (GSAP ScrollTrigger). While the hero is pinned the centre orb scales up, a
   features stage fades in (no circular wipe) and, on ≥640px viewports, the
   remaining timeline time drives the feature-card carousel (see features.js).
   Values are the ones used by the reference site.
   ============================================================================= */
(function () {
  "use strict";
  const { animate, set, clamp, prefersReducedMotion } = LiaMotion;
  const progressListeners = [];
  const CARD_SLOWDOWN = 2.1; // >1 = feature cards move slower per scroll distance
  let hero, left, center, orbWrap, overlay, rail, reveal, timeline = null, ctx = null;
  let waveform = null, breakpointKey = "";

  function widthKey() {
    const w = window.innerWidth;
    return w < 640 ? "sm" : w < 768 ? "md" : w < 1024 ? "lg" : "xl";
  }

  function notify(p) { progressListeners.forEach((fn) => fn(p)); }

  function buildTimeline() {
    if (ctx) { ctx.revert(); ctx = null; timeline = null; }
    const railLoopEl = rail && rail.querySelector(".hero-rail-scroll");
    if (railLoopEl) railLoopEl.classList.remove("lia-faded");
    if (!reveal) return;
    const featuresEl = document.getElementById("features");
    if (featuresEl) featuresEl.style.marginTop = "";

    if (prefersReducedMotion()) {
      gsap.set(reveal, { autoAlpha: 1, clipPath: "none", webkitClipPath: "none" });
      gsap.set([left, rail, overlay], { autoAlpha: 0 });
      return;
    }

    ctx = gsap.context(() => {
      const inner = reveal.firstElementChild;
      const hasProgressContent = reveal.querySelector("[data-hero-reveal-progress-content]") !== null && window.innerWidth >= 640;
      const wheel = null, panel = null, details = [];
      const mobileFeatures = !hasProgressContent && window.innerWidth < 640 ? featuresEl : null;
      if (mobileFeatures) mobileFeatures.style.marginTop = "-100svh";

      /* no circular wipe: the features stage simply fades in over the hero */
      gsap.set(reveal, { autoAlpha: 0, clipPath: "none", webkitClipPath: "none" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => {
            const e = window.innerWidth < 768, a = window.innerWidth < 1024;
            const vh = window.innerHeight;
            const mult = hasProgressContent ? (e ? 2.6 : a ? 3.4 : 6.2) : (e || a ? 1 : 1.35);
            const min = hasProgressContent ? (e ? 1500 : a ? 1900 : 3400) : (e ? 500 : a ? 560 : 760);
            // stretch the pin so the feature cards travel slower (the intro reveal keeps its pace)
            const stretch = hasProgressContent ? (0.74 + 3.25 * CARD_SLOWDOWN) / (0.74 + 3.25) : 1;
            return `+=${Math.max(vh * mult, min) * stretch}`;
          },
          scrub: 1.05,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to([left, rail], { autoAlpha: 0, y: -36, duration: 0.22 }, 0)
        .to(overlay, { autoAlpha: 0, scale: 0.76, duration: 0.24 }, 0)
        .to(orbWrap, { scale: () => (window.innerWidth < 640 ? 2.35 : window.innerWidth < 1024 ? 2.85 : 3.55), duration: 0.72 }, 0)
        .to(reveal, { autoAlpha: 1, ease: "power1.inOut", duration: 0.5 }, 0.12)
        .fromTo(inner, { autoAlpha: 0, scale: 0.92, y: 44 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.46 }, 0.26)
        .to(orbWrap, { autoAlpha: 0, duration: 0.24 }, 0.68);

      // the orb is fully faded out from time 0.92 on: stop its canvas loop and hide its caption;
      // while it is being scaled/faded (0.05–0.92) the canvas draws at half rate
      const railLoop = rail && rail.querySelector(".hero-rail-scroll");
      const syncWaveform = () => {
        const t = tl.time();
        // the rail is fully faded out (autoAlpha 0) from time 0.22 on: pause its marquee
        if (railLoop) railLoop.classList.toggle("lia-faded", t >= 0.22);
        if (waveform) {
          waveform.setPaused(t >= 0.92);
          waveform.setThrottle(t > 0.05 ? 2 : 1);
          // the sphere disperses as the reveal scales it up and fades it out
          if (waveform.setScatter) waveform.setScatter(clamp(t / 0.85, 0, 1));
        }
        if (window.LiaVoice) LiaVoice.setCaptionSuppressed(t >= 0.92);
      };
      if (hasProgressContent) {
        tl.to({}, { duration: 3.25 * CARD_SLOWDOWN }, 0.74).eventCallback("onUpdate", () => {
          const d = tl.duration();
          notify(clamp((tl.time() - 0.74) / (d - 0.74), 0, 1));
          syncWaveform();
        });
        window.LiaHero.featureScroll = () => {
          const st = tl.scrollTrigger;
          if (!st) return;
          const f = Math.min(1, 0.89 / tl.duration());
          window.scrollTo({ top: st.start + f * (st.end - st.start), behavior: "smooth" });
        };
        /* scroll position at which the feature carousel reaches progress p (inverse of notify above) */
        window.LiaHero.scrollForProgress = (p) => {
          const st = tl.scrollTrigger;
          if (!st) return null;
          const d = tl.duration();
          return st.start + ((0.74 + p * (d - 0.74)) / d) * (st.end - st.start);
        };
      } else {
        tl.eventCallback("onUpdate", syncWaveform);
        window.LiaHero.featureScroll = null;
        window.LiaHero.scrollForProgress = null;
        notify(0);
      }
      timeline = tl;
    }, hero);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  function init() {
    hero = document.getElementById("hero");
    if (!hero) return;
    const grid = hero.querySelector(".page-gutter > .grid");
    left = grid.children[0];
    center = grid.children[1];
    rail = grid.children[2];
    orbWrap = center.firstElementChild;
    overlay = orbWrap.querySelector(":scope > .absolute.left-1\\/2.top-1\\/2");
    reveal = hero.querySelector(":scope > .pointer-events-auto.absolute.inset-0.z-20");

    /* compositor hints for everything the pinned timeline animates every frame */
    [left, rail, overlay].forEach((el) => { el.style.willChange = "transform, opacity"; });
    orbWrap.style.willChange = "transform, opacity";
    if (reveal) {
      reveal.style.willChange = "clip-path, opacity";
      const stage = reveal.querySelector("[data-hero-reveal-progress-content] > .sticky");
      if (stage) { stage.style.contain = "paint"; stage.style.willChange = "transform"; }
    }

    /* entrance (framer `initial` → `animate`) */
    const intro = left.querySelector(".hero-intro-fade-up");
    if (intro) {
      const anims = intro.getAnimations ? intro.getAnimations() : [];
      if (anims[0]) anims[0].finished.then(() => { intro.style.animation = "none"; }).catch(() => {});
    } else {
      const block = left.firstElementChild;
      set(block, { opacity: 0, y: 28 });
      animate(block, { opacity: 1, y: 0 }, { duration: 0.8, ease: "easeOut" });
    }
    set(center, { opacity: 0, scale: 0.95 });
    animate(center, { opacity: 1, scale: 1 }, { duration: 0.9, ease: "easeOut", delay: 0.12 });
    const railInner = rail.querySelector(".flex.flex-col.text-left");
    set(railInner, { opacity: 0, x: 24 });
    animate(railInner, { opacity: 1, x: 0 }, { duration: 0.85, ease: "easeOut", delay: 0.2 });

    /* waveform canvas + voice UI */
    const canvasWrap = orbWrap.querySelector(".aspect-square");
    const canvas = canvasWrap && (canvasWrap.querySelector(".bp-sphere-canvas") || canvasWrap.querySelector("canvas"));
    /* the voice visual: the particle sphere with the "AI" mark (js/particle-sphere.js);
       the old torus orb (js/waveform.js) stays as the fallback */
    if (canvas && window.LiaParticleSphere) {
      waveform = LiaParticleSphere.create(canvasWrap, canvas, LiaVoice.activity);
      LiaParticleSphere.grid(orbWrap.querySelector(".bp-sphere-grid"));
      /* clicking the mic spreads the sphere out, it gathers back without the "AI"
         mark and ripples with the voice; the mark returns when the session ends
         (an error shows the voice state for 4s) */
      let errT = 0;
      const voiceOn = (on) => {
        orbWrap.classList.toggle("is-voice", on);
        if (waveform.setVoice) waveform.setVoice(on);
      };
      window.addEventListener("lia:voicemode", (e) => {
        const m = e.detail && e.detail.mode;
        clearTimeout(errT);
        voiceOn(m !== "idle");
        if (m === "error") errT = setTimeout(() => voiceOn(false), 4000);
      });
    } else if (canvas && window.LiaWaveform) waveform = LiaWaveform.create(canvasWrap, canvas, LiaVoice.activity, false);
    if (window.LiaVoice) LiaVoice.init(hero);

    /* the reveal stage must not be interactive before it is wiped in */
    buildTimeline();
    breakpointKey = widthKey();
    let resizeT = 0;
    window.addEventListener("resize", () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        const k = widthKey();
        if (k !== breakpointKey) { breakpointKey = k; buildTimeline(); window.dispatchEvent(new CustomEvent("lia:breakpoint")); }
      }, 150);
    });
  }

  window.LiaHero = {
    init,
    onProgress(fn) { progressListeners.push(fn); },
    featureScroll: null,
    get timeline() { return timeline; },
  };
})();
