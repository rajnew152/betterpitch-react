/* =============================================================================
   manifesto.js — the "I create experiences…" sentence (port of the manifesto
   section of guillaumezhu.com). The stage pins while the sentence slides from
   right to left; every letter enters from the right edge displaced and rotated
   by a random amount and springs onto the baseline (elastic ease) as it
   travels across the viewport.
   ============================================================================= */
(function () {
  "use strict";

  function splitLetters(el) {
    if (el.dataset.split) return;
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = el.textContent.trim().split("").map((ch) =>
      ch === " " ? '<span aria-hidden="true">&nbsp;</span>' : `<span class="letter" aria-hidden="true">${ch}</span>`
    ).join("");
    el.dataset.split = "1";
  }

  /* the sentence appears twice on the page (before the industries wheel and after the
     Platform deck): every .mf section runs its own copy of the sequence */
  function init() {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll("section.mf").forEach(setup);
  }

  function setup(root) {

    const pinHeight = root.querySelector(".mf__pin-height");
    const container = root.querySelector(".mf__container");
    const text = root.querySelector(".mf__text");
    if (!pinHeight || !container || !text) return;

    splitLetters(text);
    const letters = text.querySelectorAll(".letter");

    /* reference: the slide covers the text overflow over 0.65px of scroll per px */
    const RATIO = 0.65;
    const overflow = () => text.scrollWidth - container.clientWidth;
    const travel = () => Math.max(overflow() * RATIO, 1);
    const sizePin = () => { pinHeight.style.height = `${window.innerHeight + travel()}px`; };
    sizePin();
    ScrollTrigger.addEventListener("refreshInit", sizePin);

    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      pinSpacing: false,
      anticipatePin: 1,
      refreshPriority: -1, // after the hero pin above it, which main.js creates later
    });

    const slide = gsap.to(text, {
      x: () => -overflow(),
      ease: "none",
      scrollTrigger: { trigger: pinHeight, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true, refreshPriority: -1 },
    });

    /* colour ramp by on-screen position: letters enter in the theme ink on the
       right and pick up the brand gradient of "Emotion / meets" as they travel
       left (violet → magenta → pink → orange), so the sentence reads orange →
       violet left to right like those words. The ink, the ramp stops and the
       stage colours come from css/manifesto.css. */
    let ramp = null, stageIn = null, stageOut = null, glowHold = 0;
    const build = () => {
      const cs = getComputedStyle(root), v = (n) => cs.getPropertyValue(n).trim();
      const ink = v("--mf-ink") || "#1f1d1d";
      const c4 = v("--mf-c4") || "#8b5cf6";
      const STOPS = [
        [0.0, v("--mf-c1") || "#ff6a3d"], [0.2, v("--mf-c2") || "#f73679"], [0.4, v("--mf-c3") || "#e232db"], [0.58, c4],
        [0.74, gsap.utils.interpolate(c4, ink, 0.45)], [0.88, ink], [1.0, ink],
      ];
      const mixers = STOPS.slice(1).map(([p, col], i) => [STOPS[i][0], p, gsap.utils.interpolate(STOPS[i][1], col)]);
      ramp = (p) => {
        if (p <= 0) return STOPS[0][1];
        if (p >= 1) return STOPS[STOPS.length - 1][1];
        const [a, b, mix] = mixers.find(([, b]) => p <= b);
        return mix((p - a) / (b - a));
      };
      /* share of the glow kept at the end of the slide (css --mf-glow-hold, 0 = fade out) */
      glowHold = Math.min(1, Math.max(0, parseFloat(v("--mf-glow-hold")) || 0));
      stageIn = gsap.utils.interpolate(v("--mf-above"), v("--mf-mid"));
      stageOut = gsap.utils.interpolate(v("--mf-mid"), v("--mf-below"));
      letters.forEach((l) => { l._mfColor = null; });
    };
    let centers = [];
    const measure = () => { centers = Array.from(letters, (l) => l.offsetLeft + l.offsetWidth / 2); };
    const smooth = (t) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };
    const EDGE = 0.14; // share of the slide spent blending in / out at each end
    const paint = () => {
      const x = gsap.getProperty(text, "x"), w = container.clientWidth;
      letters.forEach((l, i) => {
        const c = ramp((centers[i] + x) / w);
        if (l._mfColor !== c) { l.style.color = c; l._mfColor = c; }
      });
      /* stage: colour above → soft middle → colour below; glows only in between */
      const p = slide.progress();
      const inT = smooth(p / EDGE), outT = smooth((p - (1 - EDGE)) / EDGE);
      container.style.setProperty("--mf-stage", outT > 0 ? stageOut(outT) : stageIn(inT));
      container.style.setProperty("--mf-glow", (inT * (1 - outT * (1 - glowHold))).toFixed(3));
      container.style.setProperty("--mf-drift", p.toFixed(4));
    };
    build();
    measure();
    slide.eventCallback("onUpdate", paint);
    ScrollTrigger.addEventListener("refresh", () => { measure(); paint(); });
    /* theme toggle swaps the palette */
    new MutationObserver(() => { build(); paint(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    paint();

    letters.forEach((letter) => {
      gsap.from(letter, {
        yPercent: (Math.random() - 0.5) * 400,
        rotation: (Math.random() - 0.5) * 60,
        ease: "elastic.out(1.2, 1)",
        scrollTrigger: { trigger: letter, containerAnimation: slide, start: "left 100%", end: "left 0%", scrub: 0.5, refreshPriority: -2 },
      });
    });

    /* fonts change the sentence width */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
