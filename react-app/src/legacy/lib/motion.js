/* =============================================================================
   motion.js — tiny animation toolkit that reproduces the framer-motion
   behaviours the reference site relies on (tween with cubic-bezier easing,
   in-view triggers, spring integration and useTransform-style interpolation).
   ============================================================================= */
(function (global) {
  "use strict";

  /* ---------- easing ---------- */
  function cubicBezier(x1, y1, x2, y2) {
    // Newton-Raphson solver, same approach as the framer-motion implementation.
    const A = (a1, a2) => 1 - 3 * a2 + 3 * a1;
    const B = (a1, a2) => 3 * a2 - 6 * a1;
    const C = (a1) => 3 * a1;
    const calc = (t, a1, a2) => ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
    const slope = (t, a1, a2) => 3 * A(a1, a2) * t * t + 2 * B(a1, a2) * t + C(a1);
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      let t = x;
      for (let i = 0; i < 8; i++) {
        const s = slope(t, x1, x2);
        if (s === 0) break;
        const cx = calc(t, x1, x2) - x;
        t -= cx / s;
      }
      return calc(t, y1, y2);
    };
  }
  const EASE = {
    linear: (t) => t,
    easeIn: cubicBezier(0.42, 0, 1, 1),
    easeOut: cubicBezier(0, 0, 0.58, 1),
    easeInOut: cubicBezier(0.42, 0, 0.58, 1),
  };
  function resolveEase(e) {
    if (!e) return EASE.easeOut;
    if (typeof e === "function") return e;
    if (Array.isArray(e)) return cubicBezier(e[0], e[1], e[2], e[3]);
    return EASE[e] || EASE.easeOut;
  }

  /* ---------- transform builder (framer order: translate, scale, rotate) ---------- */
  const UNITS = { x: "px", y: "px", rotate: "deg" };
  function unit(key, v) {
    if (typeof v === "string") return v;
    return v + (UNITS[key] || "");
  }
  function buildTransform(vals) {
    const parts = [];
    if (vals.x !== undefined && vals.x !== 0) parts.push(`translateX(${unit("x", vals.x)})`);
    if (vals.y !== undefined && vals.y !== 0) parts.push(`translateY(${unit("y", vals.y)})`);
    if (vals.scale !== undefined && vals.scale !== 1) parts.push(`scale(${vals.scale})`);
    if (vals.scaleX !== undefined && vals.scaleX !== 1) parts.push(`scaleX(${vals.scaleX})`);
    if (vals.scaleY !== undefined && vals.scaleY !== 1) parts.push(`scaleY(${vals.scaleY})`);
    if (vals.rotate !== undefined && vals.rotate !== 0) parts.push(`rotate(${unit("rotate", vals.rotate)})`);
    return parts.length ? parts.join(" ") : "none";
  }
  const TRANSFORM_KEYS = ["x", "y", "scale", "scaleX", "scaleY", "rotate"];

  function applyValues(el, vals) {
    let hasTransform = false;
    const t = {};
    for (const k in vals) {
      const v = vals[k];
      if (TRANSFORM_KEYS.includes(k)) { t[k] = v; hasTransform = true; }
      else if (k === "opacity") el.style.opacity = String(v);
      else if (k === "height") el.style.height = typeof v === "number" ? v + "px" : v;
      else if (k === "width") el.style.width = typeof v === "number" ? v + "px" : v;
      else if (k === "clipPath") { el.style.clipPath = v; el.style.webkitClipPath = v; }
      else if (k === "filter") el.style.filter = v;
      else el.style[k] = v;
    }
    if (hasTransform) {
      const cur = el.__mv || {};
      Object.assign(cur, t);
      el.__mv = cur;
      el.style.transform = buildTransform(cur);
    }
  }

  /* ---------- tween ---------- */
  const running = new Set();
  function tween(opts) {
    const duration = (opts.duration ?? 0.3) * 1000;
    const delay = (opts.delay ?? 0) * 1000;
    const ease = resolveEase(opts.ease);
    let raf = 0, start = 0, stopped = false;
    const ctl = {
      stop() { stopped = true; cancelAnimationFrame(raf); running.delete(ctl); },
      finished: null,
    };
    ctl.finished = new Promise((resolve) => {
      function frame(now) {
        if (stopped) return;
        if (!start) start = now;
        const elapsed = now - start - delay;
        if (elapsed < 0) { raf = requestAnimationFrame(frame); return; }
        const p = duration <= 0 ? 1 : Math.min(1, elapsed / duration);
        opts.onUpdate && opts.onUpdate(ease(p), p);
        if (p < 1) raf = requestAnimationFrame(frame);
        else { running.delete(ctl); opts.onComplete && opts.onComplete(); resolve(); }
      }
      raf = requestAnimationFrame(frame);
    });
    running.add(ctl);
    return ctl;
  }

  /* animate(el, {opacity:1, y:0}, {duration, delay, ease}) — reads the current
     values from the element's motion store (or `from`) and tweens to target. */
  function animate(el, to, opts = {}) {
    if (!el) return { stop() {}, finished: Promise.resolve() };
    if (el.__anim) el.__anim.stop();
    const from = {};
    const cur = el.__mv || (el.__mv = {});
    for (const k in to) {
      if (opts.from && opts.from[k] !== undefined) from[k] = opts.from[k];
      else if (TRANSFORM_KEYS.includes(k)) from[k] = cur[k] ?? (k.startsWith("scale") ? 1 : 0);
      else if (k === "opacity") from[k] = el.style.opacity === "" ? 1 : parseFloat(el.style.opacity);
      else if (k === "height") from[k] = el.getBoundingClientRect().height;
      else from[k] = 0;
    }
    const ctl = tween({
      duration: opts.duration, delay: opts.delay, ease: opts.ease,
      onUpdate(e) {
        const vals = {};
        for (const k in to) vals[k] = from[k] + (to[k] - from[k]) * e;
        applyValues(el, vals);
      },
      onComplete() {
        el.__anim = null;
        if (opts.onComplete) opts.onComplete();
      },
    });
    el.__anim = ctl;
    return ctl;
  }

  /* set(el, values) — write motion values immediately (like framer `initial`). */
  function set(el, vals) { if (el) applyValues(el, vals); }

  /* ---------- in-view (IntersectionObserver based, like framer whileInView) ---------- */
  function inView(el, cb, { once = false, margin = "0px", amount = "some" } = {}) {
    if (!el) return () => {};
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          cb(true, entry);
          if (once) io.unobserve(entry.target);
        } else if (!once) cb(false, entry);
      }
    }, { rootMargin: margin, threshold: typeof amount === "number" ? amount : amount === "all" ? 1 : 0 });
    io.observe(el);
    return () => io.disconnect();
  }

  /* whileInView helper: initial values, then animate to target when visible. */
  function reveal(el, from, to, opts = {}) {
    if (!el) return;
    set(el, from);
    inView(el, () => animate(el, to, opts), { once: true, margin: opts.margin || "0px" });
  }

  /* ---------- interpolation (framer useTransform semantics, clamped) ---------- */
  function interpolate(v, input, output) {
    const n = input.length;
    if (v <= input[0]) return output[0];
    if (v >= input[n - 1]) return output[n - 1];
    let i = 1;
    while (i < n - 1 && input[i] < v) i++;
    const t = (v - input[i - 1]) / (input[i] - input[i - 1] || 1);
    return output[i - 1] + (output[i] - output[i - 1]) * t;
  }
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  /* ---------- spring (framer useSpring defaults: mass 1) ---------- */
  function createSpring(initial, { stiffness = 100, damping = 10, mass = 1, restDelta = 0.01, restSpeed = 0.01 } = {}) {
    let value = initial, velocity = 0, target = initial;
    return {
      get value() { return value; },
      set target(t) { target = t; },
      get target() { return target; },
      jump(v) { value = v; target = v; velocity = 0; },
      step(dt) {
        // semi-implicit Euler, sub-stepped for stability
        const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
        const h = dt / steps;
        for (let i = 0; i < steps; i++) {
          const force = -stiffness * (value - target) - damping * velocity;
          velocity += (force / mass) * h;
          value += velocity * h;
        }
        if (Math.abs(velocity) < restSpeed && Math.abs(value - target) < restDelta) {
          value = target; velocity = 0; return true;
        }
        return false;
      },
    };
  }

  /* ---------- on-screen tracking for endless loops (one shared observer) ---------- */
  const onScreen = new WeakMap(), screenWatchers = new Map();
  const screenIO = "IntersectionObserver" in global ? new IntersectionObserver((entries) => {
    for (const e of entries) {
      onScreen.set(e.target, e.isIntersecting);
      (screenWatchers.get(e.target) || []).forEach((fn) => fn(e.isIntersecting));
    }
  }, { rootMargin: "100px 0px" }) : null;
  function watchScreen(el, fn) {
    if (!screenIO) return () => {};
    if (!screenWatchers.has(el)) { screenWatchers.set(el, new Set()); screenIO.observe(el); }
    screenWatchers.get(el).add(fn);
    return () => {
      const set = screenWatchers.get(el); if (!set) return;
      set.delete(fn);
      if (!set.size) { screenWatchers.delete(el); screenIO.unobserve(el); onScreen.delete(el); }
    };
  }

  /* ---------- keyframe loop (framer `animate: [..]` with repeat Infinity) ---------- */
  /* The phase is derived from the clock, so the loop simply stops requesting frames
     while its element is off-screen and resumes in phase when it comes back. */
  function keyframeLoop(el, key, frames, { duration = 1, delay = 0, ease = "easeInOut", repeatType = "loop", times } = {}) {
    const easeFn = resolveEase(ease);
    const n = frames.length;
    const t = times || frames.map((_, i) => i / (n - 1));
    let raf = 0, start = performance.now() + delay * 1000, stopped = false;
    const unwatch = watchScreen(el, (visible) => {
      if (stopped) return;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    function value(p) {
      let i = 1;
      while (i < n - 1 && t[i] < p) i++;
      const seg = (p - t[i - 1]) / (t[i] - t[i - 1] || 1);
      return frames[i - 1] + (frames[i] - frames[i - 1]) * easeFn(clamp(seg));
    }
    function frame(now) {
      if (stopped) return;
      let p = (now - start) / (duration * 1000);
      if (p < 0) p = 0;
      if (repeatType === "mirror") { p = p % 2; if (p > 1) p = 2 - p; }
      else p = p % 1;
      applyValues(el, { [key]: value(p) });
      raf = onScreen.get(el) === false ? 0 : requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return { stop() { stopped = true; cancelAnimationFrame(raf); raf = 0; unwatch(); } };
  }

  /* ---------- misc ---------- */
  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  global.LiaMotion = {
    cubicBezier, EASE, resolveEase, tween, animate, set, inView, reveal,
    interpolate, clamp, createSpring, keyframeLoop, buildTransform, prefersReducedMotion,
  };
})(window);
