/* =============================================================================
   wheel.js — "Built for every industry" cinematic wheel. Pinned section whose
   ten glass segments rotate a full turn with scroll (GSAP ScrollTrigger,
   scrub .9) while each label counter-rotates; Prev/Next nudge the wheel by
   36° (power3.out, .95s). Also ports the site's wheel-smoothing handler that
   slows mouse-wheel scrolling while the section is pinned.
   ============================================================================= */
(function () {
  "use strict";
  const WHEEL_SLOWDOWN = 2;   // scroll length multiplier: 2 = the wheel turns 50% slower

  function init() {
    const section = document.getElementById("section-cinematic-project");
    if (!section || !window.gsap) return;
    const wheel = section.querySelector("[data-cinematic-wheel]");
    const details = Array.from(section.querySelectorAll("[data-cinematic-wheel-detail]"));
    const buttons = section.querySelectorAll(".top-\\[78\\%\\] button");
    if (!wheel || !details.length) return;

    /* extra motion on the icon tiles (styles: components/Industries/Industries.css):
       two sonar pings behind the icon, a spark orbiting it, and a "live call"
       badge in the corner that rings now and then. --bp-i staggers the tiles so
       the wheel never pulses in unison. */
    const PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    details.forEach((d, i) => {
      const tile = d.firstElementChild;
      if (!tile || tile.querySelector(".bp-ind-ping")) return;
      tile.style.setProperty("--bp-i", String(i));
      tile.insertAdjacentHTML("afterbegin",
        '<span class="bp-ind-ping" aria-hidden="true"></span><span class="bp-ind-ping bp-ind-ping--late" aria-hidden="true"></span><span class="bp-ind-orbit" aria-hidden="true"></span>');
      tile.insertAdjacentHTML("beforeend", `<span class="bp-ind-call" aria-hidden="true">${PHONE}</span>`);
    });

    /* the tile loops cost a style pass every frame (this page's stylesheet is large),
       which is what made scrolling the wheel stutter. They pause while the page is
       scrolling through the section (the wheel turn stays smooth) and resume ~0.2s
       after it settles; tiles off-screen stay paused. */
    let scrollIdle = 0, inView = false;
    const onWheelScroll = () => {
      if (!inView) return;
      if (!section.classList.contains("bp-ind-scrolling")) section.classList.add("bp-ind-scrolling");
      clearTimeout(scrollIdle);
      scrollIdle = setTimeout(() => section.classList.remove("bp-ind-scrolling"), 200);
    };
    window.addEventListener("scroll", onWheelScroll, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(section);
      const tileIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.target.classList.toggle("bp-ind-off", !e.isIntersecting));
      });
      details.forEach((d) => d.firstElementChild && tileIO.observe(d.firstElementChild));
    }

    /* keep the whole globe on screen: the wheel has fixed pixel sizes, so on a short
       window its lower rim falls below the viewport; scale the wheel block (ring,
       hub, logo, labels) down from its top edge until the full circle fits */
    const stage = wheel.parentElement;
    function fitGlobe() {
      stage.style.scale = "";
      const top = stage.getBoundingClientRect().top;
      let bottom = -Infinity;
      wheel.querySelectorAll(".cps-wheel-glass").forEach((g) => { bottom = Math.max(bottom, g.getBoundingClientRect().bottom); });
      const room = section.getBoundingClientRect().top + window.innerHeight * 0.985 - top;
      const s = bottom > top ? Math.min(1, room / (bottom - top)) : 1;
      if (s < 1) { stage.style.transformOrigin = "50% 0"; stage.style.scale = s.toFixed(4); }
    }
    fitGlobe();
    window.addEventListener("resize", fitGlobe);

    /* the turn is written straight to the transforms. It used to be tweened through
       inherited custom properties (--scroll-rotation, --manual-rotation, …), and
       every change re-styled the wheel's whole subtree (60 SVG paths + 10 labels):
       ~12ms of style recalc per frame, which halved the frame rate while scrubbing */
    const rot = { scroll: 0, manual: 0 };
    function applyRotation() {
      const deg = rot.manual + rot.scroll;
      wheel.style.transform = `rotate(${deg}deg)`;
      const counter = `rotate(${-deg}deg)`;
      for (const d of details) d.style.transform = counter;
    }
    applyRotation();

    let manual = 0;
    function nudge(dir) {
      manual += -(36 * dir);
      gsap.to(rot, { manual, duration: 0.95, ease: "power3.out", overwrite: "auto", onUpdate: applyRotation });
    }
    if (buttons[0]) buttons[0].addEventListener("click", () => nudge(1));
    if (buttons[1]) buttons[1].addEventListener("click", () => nudge(-1));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let trigger = null;
    gsap.context(() => {
      trigger = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          /* WHEEL_SLOWDOWN × the original pin length: the wheel turns half as far per scroll */
          end: () => `+=${WHEEL_SLOWDOWN * (window.innerWidth < 768 ? Math.max(1.8 * window.innerHeight, 1100) : window.innerWidth < 1024 ? Math.max(2.2 * window.innerHeight, 1500) : Math.max(2.65 * window.innerHeight, 1900))}`,
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(rot, { scroll: -360, duration: 1, onUpdate: applyRotation }, 0)
        .scrollTrigger ?? null;
    }, section);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    /* wheel smoothing while pinned (fine pointers only). Wheel notches set a target
       the page glides towards; inside the pinned range the glide speed is capped so
       the wheel turns slowly. Speed itself is eased (never jumps), so there is no
       judder at the range edges and no back-and-forth between competing updates. */
    if (window.matchMedia("(pointer: coarse)").matches) return;
    /* one glide for the whole run of pinned scenes: the wheel, the journey
       ("Emotion" / "meets" / "outcomes." / team) and the Platform deck. Handing the
       page back and forth between this glide and smooth-scroll at each section edge
       changed the speed abruptly; now the run is slower and even from the wheel to
       the end of the Platform pin. */
    let deckST = null;
    const deckEnd = () => {
      if (!deckST || !deckST.pin) deckST = ScrollTrigger.getAll().find((st) => st.pin && st.trigger && st.trigger.closest && st.trigger.closest("#section-toolkit")) || null;
      return deckST ? deckST.end : 0;
    };
    const range = () => (trigger && trigger.end > trigger.start ? { start: trigger.start, end: Math.max(trigger.end, deckEnd()) } : null);
    const NOTCH = 0.8;    // share of each wheel notch travelled inside the run (a little slower than native)
    const SPEED = 1.4;    // top glide speed inside the run, in viewport heights per second
    const FOLLOW = 9;     // 1/s — how quickly the page closes the gap to the target
    const RESPONSE = 9;   // 1/s — how quickly the scroll speed adapts
    const LEAD = 0.3;     // the target never runs more than this many viewports ahead of the page:
                          // notches no longer pile up, so the page stops soon after the wheel does
    const APPROACH = 5;   // 1/s — extra speed allowed per px still to go before the pinned range
    let desired = window.scrollY, lastSet = null, raf = null, lastT = 0, vel = 0;
    let seenY = window.scrollY, seenT = performance.now(), seenVel = 0; // current page speed, px/s
    const stop = () => { if (raf !== null) cancelAnimationFrame(raf); raf = null; lastSet = null; vel = 0; };
    const step = (now) => {
      const dt = Math.min(Math.max((now - lastT) / 1000, 1 / 240), 0.05); lastT = now;
      const r = range(); if (!r) return void stop();
      const y = window.scrollY;
      if (lastSet !== null && Math.abs(y - lastSet) > 2) { stop(); desired = y; return; } // scrollbar / keyboard took over
      const inside = y >= r.start - 1 && y < r.end;
      const cap = window.innerHeight * SPEED;
      /* approaching the pinned range, the speed limit tightens with the distance left,
         so the page has already eased down to the wheel's pace when it pins (braking
         only once inside made the page lurch as the wheel arrived) */
      const d0 = desired - y;
      const toEdge = d0 > 0 && y < r.start ? r.start - y : d0 < 0 && y >= r.end ? y - r.end : Infinity;
      const vmax = inside ? cap : cap + toEdge * APPROACH;
      const d = desired - y;
      const want = Math.max(-vmax, Math.min(vmax, d * FOLLOW));
      vel += (want - vel) * (1 - Math.exp(-RESPONSE * dt));
      // at least 1px per frame: the browser truncates scroll positions to whole pixels
      let next = y + (Math.abs(vel * dt) < 1 ? Math.sign(d) : vel * dt);
      /* reaching (or crossing) the target ends the glide there — never overshoot */
      if (Math.abs(d) < 1 || (next - desired) * (y - desired) <= 0) { window.scrollTo(0, desired); return void stop(); }
      lastSet = next; window.scrollTo(0, next);
      raf = requestAnimationFrame(step);
    };
    const scrollable = (target) => {
      let t = target instanceof Element ? target : null;
      while (t && t !== document.body && t !== document.documentElement) {
        const o = getComputedStyle(t).overflowY; // style read before the layout read
        if ((o === "auto" || o === "scroll") && t.scrollHeight > t.clientHeight + 1) return true;
        t = t.parentElement;
      }
      return false;
    };
    const onWheel = (e) => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY) || scrollable(e.target)) return;
      if (document.body.style.overflow === "hidden") return; // menu / chat open
      /* the journey sentences ("Emotion" / "meets" / "outcomes.") move one step per
         scroll (js/journey.js): step aside for those notches and end this glide */
      if (window.LiaJourney && LiaJourney.claimsWheel && LiaJourney.claimsWheel(e)) { stop(); desired = window.scrollY; return; }
      const r = range(); if (!r) return;
      let dy = e.deltaY;
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) dy *= 16; else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) dy *= window.innerHeight;
      const raw = dy;
      /* measure from where the page is already heading: smooth-scroll's pending glide
         (so notches still in flight count, and are carried over rather than dropped) */
      const y = window.scrollY;
      const pending = raf === null && window.LiaSmoothScroll && LiaSmoothScroll.pending ? LiaSmoothScroll.pending() : null;
      const from = raf !== null ? desired : pending !== null && pending !== undefined ? pending : y;
      const lo = Math.min(y, from + dy), hi = Math.max(y, from + dy);
      /* own every notch that touches the pinned range, and keep owning them until the
         current glide has finished so the hand-back to smooth-scroll is seamless */
      if (!(raf !== null || (hi > r.start && lo < r.end)) || !e.cancelable) return;
      e.preventDefault();
      /* inside the run a notch travels less (outside it, e.g. finishing a glide past
         the edge, it keeps its full length) */
      if (y >= r.start - 1 && y < r.end) dy = raw * NOTCH;
      const maxY = Math.max(0, (document.scrollingElement || document.documentElement).scrollHeight - window.innerHeight);
      const lead = window.innerHeight * LEAD;
      desired = Math.min(Math.max(from + dy, y - lead, 0), y + lead, maxY);
      if (raf === null) {
        /* continue at the speed the page is already moving (e.g. smooth-scroll's glide) */
        vel = performance.now() - seenT < 100 ? seenVel : 0;
        lastT = performance.now(); lastSet = null; raf = requestAnimationFrame(step);
      }
    };
    /* while idle, keep the target in sync with wherever the page is (smooth-scroll,
       scrollbar, keyboard, anchor links) */
    const onScroll = () => {
      const y = window.scrollY, now = performance.now(), dt = (now - seenT) / 1000;
      if (dt > 0.001) { seenVel = dt < 0.1 ? seenVel * 0.5 + ((y - seenY) / dt) * 0.5 : 0; seenY = y; seenT = now; }
      if (raf === null) desired = y;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  window.LiaWheel = { init };
})();
