/* =============================================================================
   testimonials.js — the Results wall (#testimonials), a slothUI-style
   testimonial masonry: card columns drifting vertically in alternating
   directions, which can also be dragged (drift + drag below). The loop is
   seamless: each column's card set is repeated until one half of the
   track covers the wall, then that half is duplicated, so the -50% translate
   always lands on identical content. .is-ready starts the animation; without
   JS the wall simply stands still — never a gap.
   ============================================================================= */
(function () {
  "use strict";

  function init() {
    const root = document.getElementById("testimonials");
    if (!root || !root.classList.contains("tw")) return;
    const wall = root.querySelector(".tw__wall");
    const tracks = Array.from(root.querySelectorAll(".tw__track"));
    if (!wall || !tracks.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallax = !reduced && window.gsap && window.ScrollTrigger;
    /* scroll parallax travel: each column moves within [-2 * amp, 0] */
    const amp = () => (parallax ? Math.round((wall.clientHeight || window.innerHeight) * 0.1) : 0);

    function build() {
      const wallH = wall.clientHeight || window.innerHeight;
      tracks.forEach((track) => {
        const set = track.querySelector(".tw__set");
        if (!set) return;
        /* a hidden column (display:none at this width) has no height yet: leave it,
           it is built once it shows (the ResizeObserver below) — measuring it now
           would clone the set hundreds of times and leave it with no loop */
        if (!set.offsetHeight) return;
        track.querySelectorAll(".tw__set[aria-hidden]").forEach((c) => c.remove());
        /* one half must cover the wall on its own (plus the parallax travel), or the
           loop scrolls a hole into view */
        const per = Math.max(1, Math.ceil((wallH + 2 * amp()) / Math.max(1, set.offsetHeight)));
        for (let i = 1; i < per * 2; i++) {
          const clone = set.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          track.appendChild(clone);
        }
      });
      root.classList.add("is-ready");
    }

    build();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { build(); measure(); });

    /* ---- drift + drag: each column drifts on its own (speed / phase from its
       inline --tw-dur / --tw-off) and can be grabbed with a mouse or pen and slid
       up or down; on release it coasts with the flick's momentum and eases back
       into its drift. Hovering a column slows it to a stop, as before. The offset
       wraps over one half of the track, so the loop stays seamless. Touch keeps
       native page scrolling (a vertical drag there scrolls the page). */
    const TILT = (6 * Math.PI) / 180;   // the wall's rotate(6deg): drag along the tilted column
    const EASE_BACK = 2.2;              // 1/s — how fast a flick settles back into the drift
    const cols = Array.from(root.querySelectorAll(".tw__col")).map((col) => {
      const track = col.querySelector(".tw__track");
      const cs = getComputedStyle(col);
      const dur = parseFloat(cs.getPropertyValue("--tw-dur")) || 50;
      const off = Math.abs(parseFloat(cs.getPropertyValue("--tw-off")) || 0);
      const up = !col.classList.contains("tw__col--down");
      return { col, track, dur, off, up, loop: 1, pos: 0, vel: 0, drift: 0, hover: false, drag: null };
    }).filter((c) => c.track);

    function measure() {
      cols.forEach((c) => {
        if (!c.track.offsetHeight) return;   // hidden column: measured once it shows
        const loop = Math.max(1, c.track.offsetHeight / 2);
        const phase = c.loop > 1 ? c.pos / c.loop : -((c.up ? c.off : c.dur - c.off) / c.dur) % 1;
        c.loop = loop;
        c.drift = (c.up ? -1 : 1) * (loop / c.dur);   // px/s
        c.pos = phase * loop;
        if (!c.drag && c.vel === 0) c.vel = reduced ? 0 : c.drift;
      });
    }
    const wrap = (c) => { c.pos %= c.loop; if (c.pos > 0) c.pos -= c.loop; };   // keep within (-loop, 0]
    const paint = (c) => { c.track.style.transform = `translate3d(0,${c.pos.toFixed(2)}px,0)`; };
    measure();
    cols.forEach((c) => { wrap(c); paint(c); });

    let visible = true, raf = 0, last = 0;
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      cols.forEach((c) => {
        if (c.drag) return;
        const target = reduced || c.hover ? 0 : c.drift;
        c.vel += (target - c.vel) * (1 - Math.exp(-EASE_BACK * dt));
        c.pos += c.vel * dt;
        wrap(c);
        paint(c);
      });
      raf = visible ? requestAnimationFrame(frame) : 0;
    }
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { rootMargin: "100px 0px" }).observe(root);
    }
    start();

    cols.forEach((c) => {
      const { col } = c;
      col.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") c.hover = true; });
      col.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") c.hover = false; });
      col.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "touch" || e.button !== 0) return;
        e.preventDefault();   // no text selection / native image drag
        col.setPointerCapture(e.pointerId);
        c.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: 0, v: 0 };
        c.vel = 0;
        col.classList.add("is-dragging");
      });
      col.addEventListener("pointermove", (e) => {
        const d = c.drag;
        if (!d || e.pointerId !== d.id) return;
        const dx = e.clientX - d.x, dy = e.clientY - d.y;
        const along = dy * Math.cos(TILT) - dx * Math.sin(TILT);
        const now = performance.now(), dt = Math.max(1, now - d.t) / 1000;
        d.v = d.v * 0.6 + (along / dt) * 0.4;   // smoothed flick speed, px/s
        d.moved += Math.abs(along);
        d.x = e.clientX; d.y = e.clientY; d.t = now;
        c.pos += along;
        wrap(c);
        paint(c);
      });
      const end = (e) => {
        const d = c.drag;
        if (!d || e.pointerId !== d.id) return;
        /* a pause before letting go means no flick */
        c.vel = performance.now() - d.t > 80 ? 0 : Math.max(-4000, Math.min(4000, d.v));
        c.drag = null;
        col.classList.remove("is-dragging");
        if (d.moved > 6) col.__twDragged = true;   // swallow the click that ends a drag
        start();
      };
      col.addEventListener("pointerup", end);
      col.addEventListener("pointercancel", end);
      col.addEventListener("click", (e) => {
        if (col.__twDragged) { e.preventDefault(); e.stopPropagation(); col.__twDragged = false; }
      }, true);
    });

    /* a column that becomes visible (or changes size) after load, e.g. the 4th
       column appearing when the window widens past 1280px: build its loop and
       measure it then, so every column drifts exactly like the others */
    if ("ResizeObserver" in window) {
      const seen = new Map();
      let pending = 0;
      const ro = new ResizeObserver((entries) => {
        let changed = false;
        entries.forEach((e) => {
          const h = Math.round(e.contentRect.height), w = Math.round(e.contentRect.width);
          const key = w + "x" + h, was = seen.get(e.target);
          seen.set(e.target, key);
          if (was !== undefined && was !== key && (w === 0) !== (was.startsWith("0x"))) changed = true;
        });
        if (changed && !pending) pending = requestAnimationFrame(() => { pending = 0; build(); measure(); cols.forEach((c) => { wrap(c); paint(c); }); start(); });
      });
      cols.forEach((c) => ro.observe(c.col));
    }

    let timer = 0, lastH = wall.clientHeight;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Math.abs(wall.clientHeight - lastH) < 2) return;
        lastH = wall.clientHeight;
        build();
        measure();
      }, 200);
    });

    /* scroll parallax: while the wall scrolls through, the columns glide up / down
       in alternating directions on top of their drift (smoothed scrub). The shift
       stays within [-2 * amp, 0], so the track (the drift's own transform) always
       covers the column — never a gap at the top or bottom */
    if (parallax) {
      root.querySelectorAll(".tw__col").forEach((col) => {
        const down = col.classList.contains("tw__col--down");
        gsap.fromTo(col,
          { y: () => (down ? -2 * amp() : 0) },
          {
            y: () => (down ? 0 : -2 * amp()),
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
          });
      });
    }

    /* the wall no longer pins, so the page got shorter: re-measure the scroll scenes */
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  window.LiaTestimonials = { init };
})();
