/* =============================================================================
   features.js — the feature cards travelling along an arc while the hero is
   pinned (≥640px) or while the standalone #features block scrolls (<640px).
   Port of the site's FeatureCarousel: 41-point arc keyframes, per-card timing
   windows (start .02 + .072·i, length .18) and the outlined text marquee.
   ============================================================================= */
(function () {
  "use strict";
  const { interpolate, clamp } = LiaMotion;

  /* arc keyframes: angle 60°→120° on a 2000px radius */
  const E = Array.from({ length: 41 }, (_, i) => i / 40);
  const L = E.map((e) => {
    const a = 60 + 60 * e, t = (a * Math.PI) / 180;
    return { x: 2000 * Math.cos(t), y: 2000 * (1 - Math.sin(t)), rotate: 90 - a };
  });
  const G = L.map((p) => p.x), X = L.map((p) => p.y), U = L.map((p) => p.rotate);

  let stageNodes = [], cards = [], marquee = [], desktopSticky, mobileSticky, mobileWrap, revealContent;
  let mode = null, progress = 0, offscreenRoot = null, offscreenIO = null;
  let metrics = { cw: 460, ch: 580, yOffset: -48, arcScale: 1 };

  function computeMetrics() {
    const w = window.innerWidth, h = window.innerHeight;
    metrics = {
      cw: w < 640 ? Math.round(0.84 * w) : w < 1024 ? Math.round(0.6 * w) : Math.min(460, Math.max(260, Math.round(0.36 * w))),
      ch: w < 640 ? Math.round(0.44 * h) : w < 1024 ? Math.round(0.52 * h) : Math.min(580, Math.max(320, Math.round(0.58 * h))),
      yOffset: w < 640 ? 0 : w < 1024 ? -44 : -48,
      arcScale: w < 640 ? 0.22 : w < 1024 ? 0.5 : 1,
    };
  }

  function render() {
    const { cw, ch, yOffset, arcScale } = metrics;
    const p = progress;
    /* per-card windows spread over the same .02–.992 progress span whatever the card
       count (12 cards → the original start .02 + .072·i, length .18); the fades scale
       with the window so the arc looks equally busy */
    const step = 0.972 / (cards.length + 1.5), win = 2.5 * step, k = win / 0.18;
    const sizeKey = cw + "," + ch + "," + yOffset;
    cards.forEach((c, t) => {
      const start = 0.02 + step * t, end = start + win, mid = start + win / 2;
      if (c.mKey !== start + ":" + win) { c.m = E.map((e) => start + win * e); c.mKey = start + ":" + win; }
      const m = c.m;
      const x = interpolate(p, m, G);
      const y = interpolate(p, m, X) * arcScale;
      const rot = interpolate(p, m, U) * arcScale;
      const opacity = interpolate(p, [start, start + 0.04 * k, end - 0.04 * k, end], [0, 1, 1, 0]);
      const capOpacity = interpolate(p, [mid - 0.07 * k, mid - 0.015 * k, mid + 0.015 * k, mid + 0.07 * k], [0, 1, 1, 0]);
      const capY = y + ch / 2 + 22 + yOffset;
      // cards fully outside their window are parked: hidden from painting, their
      // inner CSS animations paused, and no style writes until they come back
      const parked = opacity === 0 && capOpacity === 0;
      if (parked && c.parked) return;
      if (parked !== c.parked) {
        c.card.classList.toggle("lia-card-parked", parked);
        c.caption.classList.toggle("lia-card-parked", parked);
        c.parked = parked;
      }
      const cs = c.card.style, ps = c.caption.style;
      if (c.sizeKey !== sizeKey) {
        cs.marginLeft = `${-cw / 2}px`; cs.marginTop = `${-ch / 2 + yOffset}px`; cs.width = `${cw}px`; cs.height = `${ch}px`;
        ps.marginLeft = `${-cw / 2}px`; ps.width = `${cw}px`;
        c.sizeKey = sizeKey;
      }
      cs.opacity = opacity.toFixed(4);
      cs.transform = `translateX(${x.toFixed(4)}px) translateY(${y.toFixed(4)}px) rotate(${rot.toFixed(4)}deg)`;
      ps.opacity = capOpacity.toFixed(4);
      ps.transform = `translateX(${x.toFixed(4)}px) translateY(${capY.toFixed(4)}px)`;
    });
    if (marquee[0]) marquee[0].style.transform = `translateX(${interpolate(p, [0, 1], [0, -900]).toFixed(2)}px)`;
    if (marquee[1]) marquee[1].style.transform = `translateX(${interpolate(p, [0, 1], [0, 900]).toFixed(2)}px)`;
  }

  function setProgress(p) { progress = clamp(p, 0, 1); render(); }

  /* the second marquee line slides right as the cards travel; give it one extra
     segment hanging off the left edge (width measured from its text) so its
     visible start still lines up with the first line's inset */
  function alignMarquee() {
    const line = marquee[1], text = line && line.firstChild;
    if (!text || text.nodeType !== 3) return;
    const word = text.data.trim().split("✦")[0].trim();
    const next = text.data.indexOf(word, text.data.indexOf(word) + 1);
    if (!word || next < 0) return;
    const r = document.createRange();
    r.setStart(text, 0); r.setEnd(text, next);
    line.style.setProperty("--marquee-lead", `${r.getBoundingClientRect().width.toFixed(2)}px`);
  }

  /* mobile: progress from the #features block's own scroll range */
  let scrollRaf = 0;
  function mobileScroll() {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = 0;
      const r = mobileWrap.getBoundingClientRect();
      const total = mobileWrap.offsetHeight - window.innerHeight;
      setProgress(total > 0 ? -r.top / total : 0);
    });
  }

  function watchOffscreen(root) {
    if (offscreenIO) offscreenIO.disconnect();
    if (offscreenRoot) offscreenRoot.classList.remove("lia-fc-offscreen");
    offscreenRoot = root;
    offscreenIO = new IntersectionObserver(([e]) => root.classList.toggle("lia-fc-offscreen", !e.isIntersecting), { rootMargin: "300px 0px -1px 0px" });
    offscreenIO.observe(root);
  }

  function layout() {
    computeMetrics();
    const next = window.innerWidth < 640 ? "mobile" : "desktop";
    if (next !== mode) {
      mode = next;
      const target = next === "mobile" ? mobileSticky : desktopSticky;
      stageNodes.forEach((n) => target.appendChild(n));
      window.removeEventListener("scroll", mobileScroll);
      if (next === "mobile") {
        mobileWrap.style.height = "320vh";
        window.addEventListener("scroll", mobileScroll, { passive: true });
        watchOffscreen(mobileWrap);
        mobileScroll();
      } else {
        mobileWrap.style.height = "1400vh";
        watchOffscreen(revealContent);
        setProgress(progress);
      }
    }
    render();
  }

  function init() {
    revealContent = document.querySelector("[data-hero-reveal-progress-content]");
    const features = document.getElementById("features");
    if (!revealContent || !features) return;
    desktopSticky = revealContent.querySelector(":scope > .sticky");
    mobileWrap = features.firstElementChild;
    mobileSticky = mobileWrap.querySelector(":scope > .sticky");
    stageNodes = Array.from(desktopSticky.children);
    const marqueeWrap = desktopSticky.querySelector(".select-none");
    marquee = marqueeWrap ? Array.from(marqueeWrap.children) : [];
    const cardWrap = desktopSticky.lastElementChild;
    const kids = Array.from(cardWrap.children);
    for (let i = 0; i + 1 < kids.length; i += 2) {
      kids[i].classList.add("lia-feature-card");
      kids[i + 1].classList.add("lia-feature-caption");
      cards.push({ card: kids[i], caption: kids[i + 1], parked: false });
    }
    marquee.forEach((m) => m.classList.add("lia-marquee-line"));

    if (window.LiaHero) LiaHero.onProgress((p) => { if (mode === "desktop") setProgress(p); });
    layout();
    alignMarquee();
    if (document.fonts) document.fonts.ready.then(alignMarquee);
    window.addEventListener("resize", () => { computeMetrics(); layout(); alignMarquee(); });
    window.addEventListener("lia:breakpoint", layout);
  }

  /* scroll position at which the given card sits centred on the arc (used by the card demos) */
  function scrollForCard(el) {
    const t = cards.findIndex((c) => c.card === el);
    if (t < 0) return null;
    const step = 0.972 / (cards.length + 1.5), mid = 0.02 + step * t + 1.25 * step;
    if (mode === "mobile") {
      return mobileWrap.getBoundingClientRect().top + window.scrollY + mid * (mobileWrap.offsetHeight - window.innerHeight);
    }
    return window.LiaHero && LiaHero.scrollForProgress ? LiaHero.scrollForProgress(mid) : null;
  }

  window.LiaFeatures = { init, setProgress, scrollForCard };
})();
