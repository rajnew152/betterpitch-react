/* =============================================================================
   theme.js — light / dark switching (next-themes behaviour: `class` attribute
   on <html>, storage key "theme", default "dark", system detection disabled).
   ============================================================================= */
(function () {
  "use strict";
  const root = document.documentElement;

  function current() {
    return root.classList.contains("light") ? "light" : "dark";
  }

  function apply(theme) {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) { /* ignore */ }
    syncControls();
    window.dispatchEvent(new CustomEvent("lia:themechange", { detail: { theme } }));
  }

  function syncControls() {
    const dark = current() === "dark";
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      const sun = btn.querySelector(".lucide-sun");
      const moon = btn.querySelector(".lucide-moon");
      // classes mirror the React component: sun visible in light, moon in dark
      if (sun) { sun.classList.toggle("scale-0", dark); sun.classList.toggle("rotate-45", dark); sun.classList.toggle("opacity-0", dark); sun.classList.toggle("scale-100", !dark); sun.classList.toggle("rotate-0", !dark); sun.classList.toggle("opacity-100", !dark); }
      if (moon) { moon.classList.toggle("scale-100", dark); moon.classList.toggle("rotate-0", dark); moon.classList.toggle("opacity-100", dark); moon.classList.toggle("scale-0", !dark); moon.classList.toggle("-rotate-45", !dark); moon.classList.toggle("opacity-0", !dark); }
      const wrap = btn.closest(".sm-extra");
      if (wrap) wrap.style.color = dark ? "#ffffff" : "#0a0a0f";
    }
    // menu button colour follows the theme when the menu is closed
    const toggle = document.querySelector("#staggered-menu .sm-toggle");
    if (toggle && toggle.getAttribute("aria-expanded") !== "true") {
      toggle.style.color = dark ? "#ffffff" : "#0a0a0f";
    }
  }

  /* header contrast: the Menu / Get in touch / theme controls switch to light ink
     over dark sections and dark ink over light ones (css/palette.css), whatever the
     theme; over images, canvases and gradients they keep the theme's colours */
  function toneAt(x, y) {
    for (const el of document.elementsFromPoint(x, y)) {
      if (el.closest("#staggered-menu")) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.5) continue;
      if (el.tagName === "CANVAS") return el.classList.contains("tk-card__cream") ? (root.classList.contains("light") ? "light" : "dark") : null;
      if (el.tagName === "IMG" || el.tagName === "VIDEO") return null;
      const c = cs.backgroundColor.match(/[\d.]+/g);
      if (c && (c.length < 4 || +c[3] >= 0.5)) {
        const lum = (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
        return lum < 0.45 ? "dark" : "light";
      }
      if (cs.backgroundImage !== "none") return null;
    }
    return null;
  }
  function watchHeaderTone() {
    const probe = document.querySelector("#staggered-menu .sm-get-in-touch");
    if (!probe) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = probe.getBoundingClientRect();
      const tone = toneAt(r.left + r.width / 2, r.top + r.height / 2);
      root.classList.toggle("bp-hdr-on-dark", tone === "dark");
      root.classList.toggle("bp-hdr-on-light", tone === "light");
    };
    /* re-check once the scroll (and the pinned scenes it drives) has settled */
    let settle = 0;
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
      clearTimeout(settle);
      settle = setTimeout(() => { if (!raf) raf = requestAnimationFrame(update); }, 180);
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    window.addEventListener("lia:themechange", queue);
    window.addEventListener("load", queue);
    queue();
  }

  function init() {
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", () => apply(current() === "dark" ? "light" : "dark"));
    syncControls();
    watchHeaderTone();
  }

  window.LiaTheme = { init, apply, current, isDark: () => current() === "dark" };
})();
