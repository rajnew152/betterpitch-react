/* =============================================================================
   header-contrast.js — the header's gradient wordmark (orange → pink → purple)
   vanishes on the journey section's orange / purple gradient. While either
   gradient slice is behind the logo and mostly opaque, html gets the class
   "bp-logo-on-gradient" and css/brand.css turns the wordmark white.
   ============================================================================= */
(function () {
  "use strict";

  function init() {
    const logo = document.querySelector(".bp-logo-header");
    const slices = document.querySelectorAll("#section-journey .traj__visual");
    if (!logo || !slices.length) return;
    const html = document.documentElement;
    let raf = 0, on = false;

    const check = () => {
      raf = 0;
      const l = logo.getBoundingClientRect();
      const x = l.left + l.width / 2, y = l.top + l.height / 2;
      let hit = false;
      slices.forEach((s) => {
        if (hit) return;
        const r = s.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && parseFloat(getComputedStyle(s).opacity) > 0.5) hit = true;
      });
      if (hit !== on) { on = hit; html.classList.toggle("bp-logo-on-gradient", on); }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    if (window.ScrollTrigger) ScrollTrigger.addEventListener("refresh", queue);
    check();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
