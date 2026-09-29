/* =============================================================================
   footer-cta.js — the visual in the CTA card revealed at the end of the
   "Ready when you are…" section (js/next.js opens the card with a circular
   clip): the same particle sphere with the "AI" mark as the hero's voice
   visual (js/particle-sphere.js — brand pink / magenta / violet, both themes)
   over its flickering grid, at the right of the card. It assembles when the
   card first comes on screen, turns slowly, leans towards the pointer, bursts
   where it is clicked and brightens on hover. It only draws while on screen.
   ============================================================================= */
(function () {
  "use strict";

  function init() {
    const card = document.getElementById("section-footer");
    const canvas = card && card.querySelector(".bp-cta__canvas");
    if (!canvas || !window.LiaParticleSphere) return;
    const holder = canvas.parentElement;
    /* no voice session here: the sphere just idles (no activity object). Dots are sized
       like the hero's (reference size), the glow is stronger and the mark forms a
       little sooner */
    LiaParticleSphere.create(holder, canvas, null, {
      sphere: { referenceSize: 620 },
      glow: { intensity: 0.7 },
      logo: { formDelay: 0.7, formDuration: 1.4, glow: 0.55 },
      entrance: { delay: 0.05, duration: 1.5 },
    });
    LiaParticleSphere.grid(holder.querySelector(".bp-sphere-grid"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
