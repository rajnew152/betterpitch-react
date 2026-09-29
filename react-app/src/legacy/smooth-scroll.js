/* =============================================================================
   smooth-scroll.js — inertial mouse-wheel scrolling. Wheel notches are turned
   into a target position that the page eases towards every frame, so the
   pinned scroll scenes and scrubbed timelines receive a continuous stream of
   small scroll steps instead of 100px jumps. Native scrolling is kept for
   touch, keyboard, scrollbar and any nested scrollable element; the industries
   wheel's own scroll handler keeps priority inside its pinned range.
   ============================================================================= */
(function () {
  "use strict";
  const EASE_PER_FRAME = 0.16; // fraction of the remaining distance covered per 60fps frame
  /* where the current glide is heading (null when idle): the industries wheel's
     handler picks it up when it takes over, so the notches still in flight are
     not dropped at the hand-off (that stalled the page as the wheel arrived) */
  let pendingTarget = () => null;

  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let target = null, raf = 0, last = 0, lastSet = null;
    pendingTarget = () => (raf ? target : null);
    const maxY = () => Math.max(0, (document.scrollingElement || document.documentElement).scrollHeight - window.innerHeight);
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; target = null; lastSet = null; };

    function scrollableAncestor(node) {
      let t = node instanceof Element ? node : null;
      while (t && t !== document.body && t !== document.documentElement) {
        // overflow first: it is a style read, scrollHeight would force a layout
        const o = getComputedStyle(t).overflowY;
        if ((o === "auto" || o === "scroll") && t.scrollHeight > t.clientHeight + 1) return true;
        t = t.parentElement;
      }
      return false;
    }

    function step(now) {
      // rAF timestamps can precede the performance.now() taken in the wheel handler
      const dt = Math.min(Math.max((now - last) / 1000, 1 / 120), 0.05);
      last = now;
      const y = window.scrollY;
      // something else moved the page (keyboard, scrollbar, the wheel section) → let it
      if (lastSet !== null && Math.abs(y - lastSet) > 1.5) return stop();
      const d = target - y;
      const k = 1 - Math.pow(1 - EASE_PER_FRAME, dt * 60);
      // the browser truncates scroll positions to whole pixels: step at least 1px
      // and finish (snap) once within a pixel, otherwise the glide never ends
      const next = Math.abs(d) < 1 ? target : y + Math.sign(d) * Math.max(Math.abs(d * k), 1);
      lastSet = next;
      window.scrollTo(0, next);
      if (next === target) { raf = 0; target = null; lastSet = null; }
      else raf = requestAnimationFrame(step);
    }

    window.addEventListener("wheel", (e) => {
      if (e.defaultPrevented) return stop(); // the industries wheel took this event
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (document.body.style.overflow === "hidden") return; // menu / chat / preloader open
      if (scrollableAncestor(e.target)) return;
      let dy = e.deltaY;
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) dy *= 16;
      else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) dy *= window.innerHeight;
      if (!e.cancelable) return;
      e.preventDefault();
      if (target === null) target = window.scrollY;
      target = Math.min(Math.max(target + dy, 0), maxY());
      if (!raf) { last = performance.now(); lastSet = null; raf = requestAnimationFrame(step); }
    }, { passive: false });
  }

  window.LiaSmoothScroll = { init, pending: () => pendingTarget() };
})();
