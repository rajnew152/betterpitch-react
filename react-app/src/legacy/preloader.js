/* =============================================================================
   preloader.js — full-screen logo splash shown on the homepage. Stays for at
   least 900ms and until the window has loaded (max 4s), then exits with a
   clip-path circle wipe (0.85s, cubic-bezier(.76,0,.24,1)).
   ============================================================================= */
(function () {
  "use strict";
  function init() {
    const el = document.getElementById("site-preloader");
    if (!el) return Promise.resolve();
    document.body.style.overflow = "hidden";

    const t0 = performance.now();
    let minElapsed = false, loaded = document.readyState === "complete";
    return new Promise((resolve) => {
      function tryExit() {
        if (!minElapsed || !loaded) return;
        document.body.style.overflow = "";
        LiaMotion.tween({
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1],
          onUpdate(e) {
            const r = 150 * (1 - e);
            el.style.clipPath = `circle(${r}% at 50% 50%)`;
            el.style.webkitClipPath = `circle(${r}% at 50% 50%)`;
          },
          onComplete() { el.remove(); resolve(); },
        });
      }
      setTimeout(() => { minElapsed = true; tryExit(); }, Math.max(0, 900 - (performance.now() - t0)));
      if (!loaded) window.addEventListener("load", () => { loaded = true; tryExit(); }, { once: true });
      setTimeout(() => { loaded = true; tryExit(); }, 4000);
    });
  }
  window.LiaPreloader = { init };
})();
