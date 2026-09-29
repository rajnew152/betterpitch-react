/* =============================================================================
   gallery.js — "Trusted by teams…" partner logo fly-through. Scroll progress of
   the 700vh section → spring (stiffness 90, damping 22) → Catmull-Rom sampled
   logo positions, blur/opacity word reveal and the progress bar. Port of the
   site's LogoGallery component.
   ============================================================================= */
(function () {
  "use strict";
  const { interpolate, clamp, createSpring } = LiaMotion;

  /* Catmull-Rom spline sampler (identical to the original `l(arr, t)`) */
  function spline(arr, t) {
    const n = arr.length, d = t * (n - 1), i = Math.min(Math.floor(d), n - 2);
    const p0 = arr[Math.max(0, i - 1)], p1 = arr[i], p2 = arr[Math.min(n - 1, i + 1)], p3 = arr[Math.min(n - 1, i + 2)];
    const u = d - i, uu = u * u;
    return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * uu + uu * u * (-p0 + 3 * p1 - 3 * p2 + p3));
  }
  const PX = [960, 400, -250, -500, -380, 5, 390, 560, 270, -580, -580, -960];
  const PY = [540, 500, 270, 30, -190, -270, -190, 10, 255, 520, 580, 780];
  const PS = [0.28, 0.75, 0.83, 0.84, 0.8, 0.75, 0.8, 0.84, 0.88, 0.62, 0.35, 0.28];
  const PO = [0, 0.8, 0.86, 0.9, 0.8, 0.72, 0.8, 0.9, 0.88, 0.58, 0.22, 0];
  const PB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const WORDS = [
    { text: "Trusted", revealAt: 0, init: 0.45 }, { text: "by", revealAt: 0.05, init: 0.38 },
    { text: "teams", revealAt: 0.1, init: 0.28 }, { text: "that", revealAt: 0.16, init: 0.18 },
    { text: "value", revealAt: 0.23, init: 0.12 }, { text: "exceptional", revealAt: 0.3, init: 0.09, serif: true },
    { text: "digital", revealAt: 0.36, init: 0.07 }, { text: "experiences.", revealAt: 0.42, init: 0.07, serif: true },
  ];

  function init() {
    const root = document.getElementById("section-gallery");
    if (!root) return;
    const sticky = root.firstElementChild;
    const logos = Array.from(sticky.querySelectorAll(":scope > div[aria-hidden]"));
    const textBlock = sticky.querySelector(":scope > .select-none");
    const words = Array.from(textBlock.querySelectorAll("span"));
    const bar = sticky.querySelector(".origin-top");

    let vpScale = 1;
    const spring = createSpring(0.03, { stiffness: 90, damping: 22, restDelta: 0.001 });
    let last = performance.now(), raf = 0, settled = true;

    function measure() {
      const w = window.innerWidth;
      vpScale = w < 640 ? 0.33 : w < 768 ? 0.46 : w < 1024 ? 0.58 : Math.min(1, w / 1440);
      logos.forEach((el) => {
        const h = Math.round(280 * vpScale), m = Math.round(187 * vpScale);
        el.style.left = `calc(50% - ${h / 2}px)`; el.style.top = `calc(50% - ${m / 2}px)`;
        el.style.width = `${h}px`; el.style.height = `${m}px`;
        const img = el.firstElementChild; if (img) { img.width = h; img.height = m; }
      });
    }

    /* the section's page offset only changes with the layout (pin refresh, resize,
       fonts): cache it rather than forcing a layout on every scroll event */
    let rootTop = 0, rootTotal = 0;
    function measureRange() {
      rootTop = root.getBoundingClientRect().top + window.scrollY;
      rootTotal = root.offsetHeight - window.innerHeight;
    }
    function scrollProgress() {
      return clamp(rootTotal > 0 ? (window.scrollY - rootTop) / rootTotal : 0, 0, 1);
    }

    function render(f) {
      logos.forEach((el, i) => {
        const x = clamp(1.75 * f - 0.09 * i, 0, 1);
        const tx = spline(PX, x) * vpScale, ty = spline(PY, x) * vpScale;
        const sc = Math.max(0.1, spline(PS, x)), op = clamp(spline(PO, x), 0, 1), bl = Math.max(0, spline(PB, x));
        el.style.opacity = op.toFixed(4);
        el.style.filter = bl > 0.05 ? `blur(${bl.toFixed(1)}px)` : "none";
        el.style.zIndex = x > 0.32 && x < 0.59 ? 5 : 15;
        el.style.transform = `translateX(${tx.toFixed(4)}px) translateY(${ty.toFixed(4)}px) scale(${sc.toFixed(6)})`;
      });
      const to = interpolate(f, [0.62, 0.88], [1, 0]);
      const tb = interpolate(f, [0.62, 0.88], [0, 14]);
      const ty = interpolate(f, [0.62, 0.88], [0, -50]);
      textBlock.style.opacity = to.toFixed(4);
      textBlock.style.filter = tb > 0.05 ? `blur(${tb.toFixed(1)}px)` : "none";
      textBlock.style.transform = `translateY(${ty.toFixed(3)}px)`;
      words.forEach((el, i) => {
        const w = WORDS[i]; if (!w) return;
        const a = w.revealAt, b = Math.min(1, a + 0.09);
        const op = interpolate(f, [a, b], [w.init, 1]);
        const blur = interpolate(f, [a, b], [w.serif ? 10 : 18, 0]);
        const y = interpolate(f, [a, b], [10, 0]);
        el.style.opacity = op.toFixed(4);
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : "none";
        el.style.transform = `translateY(${y.toFixed(3)}px)`;
      });
      if (bar) bar.style.transform = `scaleY(${f.toFixed(4)})`;
    }

    function tick(now) {
      const dt = Math.min(0.064, (now - last) / 1000); last = now;
      settled = spring.step(dt);
      render(spring.value);
      raf = settled ? 0 : requestAnimationFrame(tick);
    }
    function update() {
      const target = 0.03 + 0.85 * scrollProgress();
      if (!raf && settled && target === spring.target) return; // at rest, nothing to redraw
      spring.target = target;
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    }

    measure();
    measureRange();
    const remeasure = () => { measureRange(); update(); };
    if (window.ScrollTrigger) ScrollTrigger.addEventListener("refresh", remeasure);
    if (window.ResizeObserver) new ResizeObserver(remeasure).observe(document.body);
    window.addEventListener("resize", () => { measure(); measureRange(); update(); });
    window.addEventListener("scroll", update, { passive: true });
    render(spring.value);
    update();
  }

  window.LiaGallery = { init };
})();
