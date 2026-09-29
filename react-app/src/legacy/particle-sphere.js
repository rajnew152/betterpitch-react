/* =============================================================================
   particle-sphere.js — the hero's voice visual: a slowly turning cloud of
   glowing dots with an "AI" mark gathered from dots at its centre (port of the
   "Particle Sphere" code component of aigentx.framer.website, same maths and
   the same settings as its hero instance).

   in     the dots assemble from a wide scatter (1.8s), then the mark forms
   out    the hero's pinned scroll reveal disperses the cloud (setScatter)
   hover  the sphere leans towards the pointer; over the sphere it brightens
          and spins a little faster
   click  a burst knocks the dots apart and they drift back, the mark flashes
   voice  the mic level (LiaVoice.activity) pulses the mark and the spin

   Same interface as js/waveform.js (setPaused / setThrottle / destroy), so
   js/hero.js drives it exactly like the old orb. Canvas 2D, no dependencies.
   ============================================================================= */
(function () {
  "use strict";

  const TAU = Math.PI * 2;
  const SPRITE = 64;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const easeOut = (t) => { const u = 1 - t; return 1 - u * u * u; };
  const smooth = (a, b, v) => {
    if (b <= a) return v < a ? 0 : 1;
    const t = clamp((v - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  function rng(seed) {
    let t = (Math.floor(seed) || 1) >>> 0;
    return function () {
      t = (t + 1831565813) >>> 0;
      let e = t;
      e = Math.imul(e ^ (e >>> 15), e | 1);
      e ^= e + Math.imul(e ^ (e >>> 7), e | 61);
      return ((e ^ (e >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* the reference hero instance, verbatim (radiusScale enlarged so the sphere
     fills the old orb's frame; the reference sits in a wider hero) */
  const CFG = {
    sphere: { particleCount: 4500, radiusScale: 0.84, dotSize: 6, sizeVariance: 0.55, perspective: 2.6, shellNoise: 0.05, overscan: 0.5, scaleDots: true, referenceSize: 640, seed: 7 },
    appearance: { coreMix: 0.16, softness: 0.55, brightness: 1, twinkleAmount: 0.18, twinkleSpeed: 0.6 },
    glow: { show: true, size: 1.5, intensity: 0.5 },
    logo: { show: true, text: "AI", size: 0.46, count: 1300, dotScale: 1.15, brightness: 1.4, jitter: 0.012, depth: 0.06, glow: 0.4, clearance: 0.45, formDelay: 1.1, formDuration: 1.7, breathe: 0.03 },
    rotation: { speed: 6, direction: -1 /* leftward */, tilt: -8, wobbleAmount: 2, wobbleSpeed: 0.15 },
    lighting: { intensity: 0.55, directionX: 0.15, directionY: 0.7, rim: 0.9, depthFade: 0.55 },
    scatter: { distance: 1.9, turbulence: 0.55, stagger: 0.45, driftX: 0, driftY: 0.15, fade: 1, spinBoost: 1.8, smoothing: 0.14 },
    ripple: { force: 0.6, reach: 0.4, recover: 0.3, swirl: 0.2, drift: 0.25, maxConcurrent: 3, spinKick: 0.8, markFlash: 0.4 },
    entrance: { duration: 1.8, delay: 0.15, spread: 1.25 },
    interaction: { strength: 6, smoothing: 0.08 },
    hover: { glow: 0.45, spin: 0.6, smoothing: 0.25 },
    performance: { maxPixelRatio: 1.5, mobileScale: 0.5 },
  };

  /* night: the site's night brand run (pink #F73679, violet #A855F7, soft pink-white
     highlights, magenta glow #E232DB) as added light on the dark hero.
     day: the site's own day brand run (pink #d81b60, magenta #b5179e, violet
     #6d28d9 highlights) drawn normally, so it sits on the light pink hero */
  const THEMES = {
    /* grad: the Better Pitch logo's gradient (assets/betterpitch.svg), left → right;
       the dots are coloured by where they sit across the sphere, like the logo.
       core: the white-pink sparkle dots (coreMix of them) */
    night: { core: "#FFE8F2", grad: [[0, "#FF8A3D"], [0.4, "#FF4D6D"], [0.72, "#E83FB8"], [1, "#B44DFF"]], halo: "#FF4D6D", composite: "lighter", haloScale: 0.75, brightness: 1.05 },
    day: { core: "#6D28D9", grad: [[0, "#E8621F"], [0.4, "#E0284F"], [0.72, "#C01F93"], [1, "#8F2FE0"]], halo: "#F06BA8", composite: "source-over", haloScale: 0.55, brightness: 1.1 },
  };
  const themeName = () => (document.documentElement.classList.contains("light") ? "day" : "night");
  const hexRgb = (h) => ({ r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16) });
  const rgba = (c, a) => `rgba(${c.r},${c.g},${c.b},${clamp(a, 0, 1)})`;

  function sprite(c, softness) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = SPRITE;
    const ctx = cv.getContext("2d");
    const h = SPRITE / 2;
    const g = ctx.createRadialGradient(h, h, 0, h, h, h);
    g.addColorStop(0, rgba(c, 1));
    g.addColorStop(0.05 + softness * 0.25, rgba(c, 0.5));
    g.addColorStop(0.35 + softness * 0.3, rgba(c, 0.12));
    g.addColorStop(1, rgba(c, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, SPRITE, SPRITE);
    return cv;
  }

  /* the shell: a fibonacci sphere with noise, each dot with its scatter vector */
  function buildShell(n, shellNoise, turbulence, driftX, driftY, coreMix, sizeVariance, seed) {
    const r = rng(seed), golden = Math.PI * (3 - Math.sqrt(5));
    const f = () => new Float32Array(n);
    const o = { count: n, nx: f(), ny: f(), nz: f(), sx: f(), sy: f(), sz: f(), seed: f(), alpha: f(), size: f(), sprite: new Uint8Array(n) };
    const jit = 0.012 + shellNoise * 0.5, last = n > 1 ? n - 1 : 1;
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / last) * 2, rad = Math.sqrt(Math.max(0, 1 - y * y)), th = golden * i;
      const w = 1 + (r() - 0.5) * 2 * shellNoise;
      const X = Math.cos(th) * rad * w + (r() - 0.5) * jit, Y = y * w + (r() - 0.5) * jit, Z = Math.sin(th) * rad * w + (r() - 0.5) * jit;
      o.nx[i] = X; o.ny[i] = Y; o.nz[i] = Z;
      const dx = X + (r() - 0.5) * 2 * turbulence, dy = Y + (r() - 0.5) * 2 * turbulence, dz = Z + (r() - 0.5) * 2 * turbulence;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1, m = 0.35 + r() ** 1.5 * 0.65;
      o.sx[i] = (dx / len) * m + driftX; o.sy[i] = (dy / len) * m - driftY; o.sz[i] = (dz / len) * m;
      o.seed[i] = r(); o.alpha[i] = 0.35 + r() * 0.65; o.size[i] = 1 - sizeVariance * 0.5 + r() * sizeVariance;
      o.sprite[i] = r() < coreMix ? 0 : r() < 0.62 ? 1 : 2;
    }
    return o;
  }

  /* the mark's pixels (a 180px rendering of the text), centred and normalised */
  function sampleMark(text) {
    const S = 180;
    const cv = document.createElement("canvas");
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const font = `700 ${S}px "Geist", "Inter", Arial, sans-serif`;
    ctx.font = font;
    const w = Math.max(8, Math.ceil(ctx.measureText(text).width) + 8), h = Math.ceil(S * 1.1);
    cv.width = w; cv.height = h;
    ctx.font = font;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(text, w / 2, h / 2);
    const d = ctx.getImageData(0, 0, w, h).data;
    const xs = [], ys = [];
    let x0 = w, x1 = -1, y0 = h, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3] < 128) continue;
      xs.push(x); ys.push(y);
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    if (!xs.length) return null;
    const half = Math.max(x1 - x0 + 1, y1 - y0 + 1) / 2, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const out = { xs: new Float32Array(xs.length), ys: new Float32Array(ys.length), count: xs.length };
    for (let i = 0; i < xs.length; i++) { out.xs[i] = (xs[i] - cx) / half; out.ys[i] = (ys[i] - cy) / half; }
    return out;
  }

  /* the mark's dots: each has a home on the sphere and a target in the mark */
  function buildMark(px, count, jitter, depth, turbulence, driftX, driftY, sizeVariance, seed) {
    const r = rng(seed + 991), n = Math.max(60, Math.round(count));
    const f = () => new Float32Array(n);
    const o = { count: n, hx: f(), hy: f(), hz: f(), tx: f(), ty: f(), tz: f(), sx: f(), sy: f(), sz: f(), seed: f(), alpha: f(), size: f(), sprite: new Uint8Array(n) };
    for (let i = 0; i < n; i++) {
      const k = Math.min(px.count - 1, Math.floor(r() * px.count));
      o.tx[i] = px.xs[k] + (r() - 0.5) * 2 * jitter;
      o.ty[i] = px.ys[k] + (r() - 0.5) * 2 * jitter;
      o.tz[i] = (r() - 0.5) * 2 * depth;
      const u = r() * 2 - 1, th = r() * TAU, rad = Math.sqrt(Math.max(0, 1 - u * u));
      o.hx[i] = Math.cos(th) * rad; o.hy[i] = u; o.hz[i] = Math.sin(th) * rad;
      const dx = o.hx[i] + (r() - 0.5) * 2 * turbulence, dy = o.hy[i] + (r() - 0.5) * 2 * turbulence, dz = o.hz[i] + (r() - 0.5) * 2 * turbulence;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1, m = 0.35 + r() ** 1.5 * 0.65;
      o.sx[i] = (dx / len) * m + driftX; o.sy[i] = (dy / len) * m - driftY; o.sz[i] = (dz / len) * m;
      o.seed[i] = r(); o.alpha[i] = 0.55 + r() * 0.45; o.size[i] = 1 - sizeVariance * 0.5 + r() * sizeVariance;
      o.sprite[i] = r() < 0.35 ? 0 : 1;
    }
    return o;
  }

  /* per-instance overrides of CFG, group by group (e.g. { sphere: { referenceSize } }) */
  function withOptions(opts) {
    if (!opts) return CFG;
    const out = {};
    for (const k of Object.keys(CFG)) out[k] = { ...CFG[k], ...(opts[k] || {}) };
    return out;
  }

  function create(wrapper, canvas, activity, opts) {
    const noop = { setPaused() {}, setThrottle() {}, setScatter() {}, destroy() {} };
    const ctx = canvas.getContext("2d");
    if (!ctx) return noop;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const C = withOptions(opts);

    const count = Math.max(120, Math.round(C.sphere.particleCount * (window.innerWidth < 768 ? C.performance.mobileScale : 1)));
    const shell = buildShell(count, C.sphere.shellNoise, C.scatter.turbulence, C.scatter.driftX, C.scatter.driftY, C.appearance.coreMix, C.sphere.sizeVariance, C.sphere.seed);
    /* voice shape: during a voice session the shell's dots leave the sphere for the
       voice-modulation orb (the site's circular waveform, drawn in dots): each dot
       has a fixed place on one curve — 0 main ring (30%), 1 orbit loops (45%, four
       loops), 2 the horizontal voice wave (15%), 3 faint outer arcs (10%) — at
       position u along it, with a little sideways spread j so lines read as dotted
       strokes */
    const wShape = (() => {
      const r = rng(C.sphere.seed + 313), n = shell.count;
      const grp = new Uint8Array(n), u = new Float32Array(n), j = new Float32Array(n), sub = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        const q = r();
        grp[i] = q < 0.3 ? 0 : q < 0.75 ? 1 : q < 0.9 ? 2 : 3;
        u[i] = r(); j[i] = (r() + r() + r() - 1.5) / 1.5; sub[i] = (r() * (grp[i] === 3 ? 3 : 4)) | 0;
      }
      return { grp, u, j, sub };
    })();
    const px = sampleMark(C.logo.text);
    const mark = px ? buildMark(px, C.logo.count * (window.innerWidth < 768 ? 0.7 : 1), C.logo.jitter, C.logo.depth, C.scatter.turbulence, C.scatter.driftX, C.scatter.driftY, C.sphere.sizeVariance, C.sphere.seed) : null;

    let theme = null, sprites = [], grads = [];
    const GRAD_N = 24;
    const gradAt = (stops, t) => {
      let k = 0;
      while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
      const [t0, a] = stops[k], [t1, b] = stops[k + 1], f = clamp((t - t0) / (t1 - t0), 0, 1);
      const A = hexRgb(a), B = hexRgb(b);
      return { r: Math.round(A.r + (B.r - A.r) * f), g: Math.round(A.g + (B.g - A.g) * f), b: Math.round(A.b + (B.b - A.b) * f) };
    };
    const setTheme = () => {
      theme = THEMES[themeName()];
      sprites = [sprite(hexRgb(theme.core), C.appearance.softness)];
      grads = [];
      for (let i = 0; i < GRAD_N; i++) grads.push(sprite(gradAt(theme.grad, i / (GRAD_N - 1)), C.appearance.softness));
    };
    setTheme();

    /* live state */
    let spin = 0, scatter = 0, scatterTarget = 0, entrance = 1, clock = 0, started = false;
    /* scroll reveal scatter and the voice-session scatter; the larger one wins */
    let scrollScatter = 0, voiceOn = false, spreadUntil = 0;
    /* voice session: the click spreads the cloud wide (VOICE_SPREAD for
       SPREAD_S seconds), then it gathers back without the mark and its dots
       ripple with the voice. voiceAmt / markAmt / level are smoothed each frame */
    const VOICE_SPREAD = 0.85, SPREAD_S = 0.95;
    let voiceAmt = 0, markAmt = 1, level = 0;
    /* ripple phases, advanced by speed × dt each frame (never time × speed: when the
       speed follows the level, that product jumps and the surface jerks) */
    let vPh1 = 0, vPh2 = 0;
    /* voice-shape clock and strengths (the original orb's o / i, per mode) */
    let wPh = 0, waveO = 0.04, waveI = 0.08;
    const retarget = () => { scatterTarget = Math.max(scrollScatter, voiceOn && clock < spreadUntil ? VOICE_SPREAD : 0); };
    let spinKick = 0, flash = 0, hoverAmt = 0, hovering = false;
    const par = { x: 0, y: 0, tx: 0, ty: 0 };
    /* hover lens: the pointer in canvas pixels (smoothed), and the gradient's angle —
       0 is the logo's left → right; hovering turns it so the colours flow round */
    const hp = { x: 0, y: 0, tx: 0, ty: 0, set: false };
    let gAng = 0;
    const bursts = [];
    let frame = { cx: 0, cy: 0, radius: 0, cosA: 1, sinA: 0, cosB: 1, sinB: 0 };

    function draw(time, scat, entr) {
      const ov = 1 + 2 * clamp(C.sphere.overscan, 0, 2);
      const cssW = canvas.clientWidth, cssH = canvas.clientHeight;
      if (cssW < 2 || cssH < 2) return;
      const dpr = Math.min(C.performance.maxPixelRatio, window.devicePixelRatio || 1);
      const W = Math.max(2, Math.round(cssW * dpr)), H = Math.max(2, Math.round(cssH * dpr));
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      const cx = W / 2, cy = H / 2;
      const R = (Math.min(W, H) / ov / 2) * clamp(C.sphere.radiusScale, 0.05, 1.4);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);

      const spread = entr * C.entrance.spread;
      const O = Math.max(scat, spread);
      const vis = 1 - clamp(entr, 0, 1);
      const comp = theme.composite;
      ctx.globalCompositeOperation = comp;

      /* halo */
      const haloI = C.glow.intensity * theme.haloScale * (1 + C.hover.glow * hoverAmt) * (1 + 1.2 * voiceAmt * level);
      if (C.glow.show && haloI > 0) {
        const e = (1 - smooth(0, 0.75, scat)) * (0.25 + vis * 0.75);
        if (e > 0.004) {
          const col = hexRgb(theme.halo), rr = R * C.glow.size, a = 0.5 * haloI * e;
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
          g.addColorStop(0, rgba(col, a)); g.addColorStop(0.4, rgba(col, a * 0.32));
          g.addColorStop(0.72, rgba(col, a * 0.08)); g.addColorStop(1, rgba(col, 0));
          ctx.globalAlpha = 1; ctx.fillStyle = g;
          ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
        }
      }

      /* orientation: spin + tilt + wobble + pointer parallax */
      const deg = Math.PI / 180;
      const wob = Math.sin(time * C.rotation.wobbleSpeed * TAU) * C.rotation.wobbleAmount * deg;
      const pitch = C.rotation.tilt * deg + wob + par.y * C.interaction.strength * deg;
      const yaw = spin + par.x * C.interaction.strength * deg;
      const cA = Math.cos(yaw), sA = Math.sin(yaw), cB = Math.cos(pitch), sB = Math.sin(pitch);
      frame = { cx, cy, radius: R, cosA: cA, sinA: sA, cosB: cB, sinB: sB };

      /* active bursts */
      const rp = C.ripple, U = [];
      for (const b of bursts) {
        if (b.age > rp.recover * 8) continue;
        const u = b.ix * cA + b.iz * sA, d = b.iz * cA - b.ix * sA;
        U.push({ ix: b.ix, iy: b.iy, iz: b.iz, vx: u, vy: b.iy * cB - d * sB, vz: b.iy * sB + d * cB, age: b.age, reachSq: rp.reach * rp.reach, cutoffSq: rp.reach * rp.reach * 6 });
      }
      const nU = U.length;

      let LX = C.lighting.directionX, LY = -C.lighting.directionY, LZ = 0.65;
      const ln = Math.sqrt(LX * LX + LY * LY + LZ * LZ) || 1; LX /= ln; LY /= ln; LZ /= ln;
      const persp = R * clamp(C.sphere.perspective, 1.1, 12);
      const dotK = C.sphere.scaleDots ? Math.min(cssW, cssH) / ov / Math.max(80, C.sphere.referenceSize) : 1;
      const dot = Math.max(0.35, C.sphere.dotSize * dpr * dotK);
      const bright = clamp(C.appearance.brightness * theme.brightness * (1 + 0.25 * hoverAmt) * (1 + 0.55 * voiceAmt * level), 0, 3);
      /* voice modulation: the surface rolls in bands (latitude + a diagonal wave)
         and swells with the level; faster and deeper the louder it gets */
      const vAmp = voiceAmt * (0.035 + 0.24 * level), vSwell = voiceAmt * 0.07 * level;
      const vT1 = vPh1, vT2 = vPh2;
      const voiceWarp = (x, y, z) => 1 + vSwell + vAmp * (0.6 * Math.sin(y * 7 + vT1) + 0.4 * Math.sin(x * 5 - z * 4 - vT2));
      const tw = clamp(C.appearance.twinkleAmount, 0, 1), twS = C.appearance.twinkleSpeed;
      const stg = clamp(C.scatter.stagger, 0, 0.85), stgR = 1 - stg, dist = C.scatter.distance, fade = clamp(C.scatter.fade, 0, 1);
      const rim = C.lighting.rim, dFade = clamp(C.lighting.depthFade, 0, 1), lI = clamp(C.lighting.intensity, 0, 1);

      const hasMark = C.logo.show && !!mark;
      const form = clamp((time - C.logo.formDelay) / Math.max(0.1, C.logo.formDuration), 0, 1);
      const mk = hasMark ? easeOut(form) * (1 - smooth(0, 0.5, scat)) * vis * markAmt : 0;
      const Z = R * clamp(C.logo.size, 0.05, 1.2) * (1 + C.logo.breathe * Math.sin(time * 0.35 * TAU));
      const clr = clamp(C.logo.clearance, 0, 1), clrR = Z * 1.25, clrSq = clrR * clrR;
      const thin = hasMark && clr > 0 && mk > 0.01;

      /* voice shape (see wShape): S is the original orb's canvas size in these
         pixels, ps its pixel scale (the formulas were written for a ~560px orb) */
      const morph = voiceAmt < 0.001 ? 0 : voiceAmt * voiceAmt * (3 - 2 * voiceAmt);
      const WS = R * 2.6, ps = WS / 560, wT = wPh;
      const ringR = 0.306 * WS, orbBase = 0.265 * WS;
      const outerR = [0.39 * WS, 0.43 * WS, 0.47 * WS];
      /* the outer arcs of the original are partial: [start, end] as a share of the turn */
      const outerSpan = [[0, 1], [0.04, 0.85], [0.275, 0.7]];
      const shapeAt = (e, out) => {
        const g = wShape.grp[e], u = wShape.u[e], jj = wShape.j[e] * 1.6 * ps, kk = wShape.sub[e];
        if (g === 0) {
          const a = u * TAU, r = ringR + 6 * level * ps + jj;
          out[0] = cx + Math.cos(a) * r; out[1] = cy + Math.sin(a) * r; out[2] = 1;
        } else if (g === 1) {
          const a = u * TAU, o = waveO;
          const amp = 1 + o * (1.15 + 0.08 * kk);
          const wob = (18 * Math.sin(3.2 * a - 1.35 * wT + 0.65 * kk) * amp
            + 10 * Math.cos(6.7 * a + 1.9 * wT - kk) * amp
            + Math.sin(12.4 * a - 1.5 * wT + 2 * kk) * (5 + 12 * o)) * ps;
          const r = orbBase + 12 * kk * ps + wob + Math.sin(wT * (1 + 2 * o) + kk) * (4 + 8 * o) * ps + jj;
          const sy = 0.94 + Math.sin(2 * a - wT) * (0.03 + 0.04 * o);
          out[0] = cx + Math.cos(a) * r; out[1] = cy + Math.sin(a) * r * sy; out[2] = 0.95 - 0.16 * kk;
        } else if (g === 2) {
          const x = (u - 0.5) * WS * 1.25, d = Math.abs(x), xp = x / ps, i = waveI;
          const y = Math.sin(0.08 * xp + wT * (7 + 6 * i)) * (10 + 20 * i) * ps * Math.exp(-d / (0.14 * WS))
            + Math.sin(0.34 * xp - wT * (11 + 9 * i)) * (4 + 8 * i) * ps * Math.exp(-d / (0.22 * WS));
          out[0] = cx + x; out[1] = cy + y + jj * 0.5;
          /* the wave's gradient fades out at both ends */
          out[2] = 0.9 * (1 - smooth(0.32, 0.62, d / WS));
        } else {
          const [a0, a1] = outerSpan[kk], a = (a0 + (a1 - a0) * u) * TAU, r = outerR[kk] + jj * 0.5;
          out[0] = cx + Math.cos(a) * r; out[1] = cy + Math.sin(a) * r; out[2] = 0.32 - 0.07 * kk;
        }
      };
      const tgt = [0, 0, 0];
      /* colour along the gradient direction, and the hover lens */
      const gdx = Math.cos(gAng), gdy = Math.sin(gAng), gSpan = 1 / (2.1 * R);
      const colorOf = (x, y, sd, spr) => {
        if (spr === 0) return sprites[0];
        const t = clamp(0.5 + ((x - cx) * gdx + (y - cy) * gdy) * gSpan + (sd - 0.5) * 0.08, 0, 1);
        return grads[Math.round(t * (GRAD_N - 1))];
      };
      const lens = hp.set ? hoverAmt : 0, lensR = R * 0.42, lensR2 = lensR * lensR, lensF = R * 0.17;
      const lensAt = (pos) => {
        const dx = pos[0] - hp.x, dy = pos[1] - hp.y, q = dx * dx + dy * dy;
        if (q >= lensR2) return 1;
        const d = Math.sqrt(q) || 1e-3, f = 1 - d / lensR, push = f * f * lensF * lens;
        pos[0] += (dx / d) * push; pos[1] += (dy / d) * push;
        return 1 + 0.9 * f * lens;
      };
      const lp = [0, 0];

      /* shell dots */
      const s = shell;
      for (let e = 0; e < s.count; e++) {
        const sd = s.seed[e];
        let p = O;
        if (stg > 0) p = (O - sd * stg) / stgR;
        p = clamp(p, 0, 1);
        const out = easeOut(p) * dist;
        const nx = s.nx[e], ny = s.ny[e], nz = s.nz[e];
        let ox = 0, oy = 0, oz = 0;
        for (let t = 0; t < nU; t++) {
          const b = U[t];
          const dx = nx - b.ix, dy = ny - b.iy, dz = nz - b.iz, q = dx * dx + dy * dy + dz * dz;
          if (q > b.cutoffSq) continue;
          const k = b.age / (rp.recover * (0.7 + sd * 0.6));
          if (k > 7) continue;
          const g = rp.force * Math.exp(-q / b.reachSq * 1.2) * k * Math.exp(1 - k);
          if (g < 5e-4) continue;
          const inv = 1 / (Math.sqrt(q) || 1e-4);
          ox += dx * inv * g; oy += dy * inv * g; oz += dz * inv * g;
          if (rp.swirl) {
            const w = g * rp.swirl * inv;
            ox += (b.iy * dz - b.iz * dy) * w; oy += (b.iz * dx - b.ix * dz) * w; oz += (b.ix * dy - b.iy * dx) * w;
          }
          if (rp.drift) { const w = g * rp.drift; ox += s.sx[e] * w; oy += s.sy[e] * w; oz += s.sz[e] * w; }
        }
        const vw = vAmp > 0.0005 ? voiceWarp(nx, ny, nz) : 1;
        const X = nx * vw + s.sx[e] * out + ox, Y = ny * vw + s.sy[e] * out + oy, Zp = nz * vw + s.sz[e] * out + oz;
        const rx = X * cA + Zp * sA, rz = Zp * cA - X * sA;
        const py = Y * cB - rz * sB, pz = Y * sB + rz * cB;
        /* lighting uses the resting position */
        const hx = nx * cA + nz * sA, hz0 = nz * cA - nx * sA;
        const hy = ny * cB - hz0 * sB, hz = ny * sB + hz0 * cB;
        const k = persp / (persp - pz * R);
        if (k <= 0) continue;
        let sx = cx + rx * R * k, sy = cy + py * R * k, sz = dot * s.size[e] * k;
        let shapeA = 1;
        if (morph > 0) {
          shapeAt(e, tgt);
          sx += (tgt[0] - sx) * morph; sy += (tgt[1] - sy) * morph;
          sz += (dot * s.size[e] * 0.95 - sz) * morph;
          shapeA = tgt[2];
        }
        let lensGlow = 1;
        if (lens > 0.01) { lp[0] = sx; lp[1] = sy; lensGlow = lensAt(lp); sx = lp[0]; sy = lp[1]; }
        if (sz < 0.35 || sx < -sz || sx > W + sz || sy < -sz || sy > H + sz) continue;
        const depth = 1 - dFade * (0.5 - hz * 0.5);
        const rimF = 1 + rim * (1 - Math.abs(hz));
        const lit = 1 - lI + lI * Math.max(0, hx * LX + hy * LY + hz * LZ);
        const twk = tw > 0 ? 1 - tw + tw * (0.5 + 0.5 * Math.sin(time * twS * TAU + sd * TAU)) : 1;
        let a = s.alpha[e] * bright * depth * rimF * lit * twk * vis;
        /* on the voice shape every dot is lit evenly, at its curve's strength */
        if (morph > 0) a += (s.alpha[e] * bright * 1.35 * twk * vis * shapeA - a) * morph;
        a *= lensGlow;
        if (fade > 0 && p > 0) a *= 1 - fade * smooth(0.25, 1, p);
        if (thin && hz > 0) {
          const dx = sx - cx, dy = sy - cy, q = dx * dx + dy * dy;
          if (q < clrSq) a *= 1 - clr * mk * (1 - q / clrSq);
        }
        if (a < 0.005) continue;
        const img = colorOf(sx, sy, sd, s.sprite[e]);
        ctx.globalAlpha = a > 1 ? 1 : a;
        ctx.drawImage(img, sx - sz / 2, sy - sz / 2, sz, sz);
      }

      /* the mark's bloom */
      if (mk > 0.01 && C.logo.glow > 0) {
        const col = hexRgb(theme.halo), rr = Z * 2.2, a = 0.5 * C.logo.glow * theme.haloScale * mk * (1 + flash);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        g.addColorStop(0, rgba(col, a)); g.addColorStop(0.45, rgba(col, a * 0.28)); g.addColorStop(1, rgba(col, 0));
        ctx.globalCompositeOperation = comp; ctx.globalAlpha = 1; ctx.fillStyle = g;
        ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
      }

      /* the mark's dots: fly from their home on the sphere into the letters */
      if (hasMark) {
        ctx.globalCompositeOperation = comp;
        const m = mark, zr = R > 0 ? Z / R : 0;
        const dScale = 1 + (C.logo.dotScale - 1) * mk;
        const mBright = (1 + (C.logo.brightness - 1) * mk) * (1 + flash * 0.8) * (1 + 0.2 * hoverAmt);
        const shX = par.x * R * 0.03 * mk, shY = par.y * R * 0.03 * mk;
        for (let e = 0; e < m.count; e++) {
          const sd = m.seed[e];
          let p = O;
          if (stg > 0) p = (O - sd * stg) / stgR;
          p = clamp(p, 0, 1);
          const out = easeOut(p) * dist;
          const hx = m.hx[e], hy = m.hy[e], hz = m.hz[e];
          let ox = 0, oy = 0, oz = 0;
          for (let t = 0; t < nU; t++) {
            const b = U[t];
            const dx = hx - b.ix, dy = hy - b.iy, dz = hz - b.iz, q = dx * dx + dy * dy + dz * dz;
            if (q > b.cutoffSq) continue;
            const k = b.age / (rp.recover * (0.7 + sd * 0.6));
            if (k > 7) continue;
            const g = rp.force * Math.exp(-q / b.reachSq * 1.2) * k * Math.exp(1 - k);
            if (g < 5e-4) continue;
            const inv = 1 / (Math.sqrt(q) || 1e-4);
            ox += dx * inv * g; oy += dy * inv * g; oz += dz * inv * g;
          }
          /* home position on the turning sphere */
          const vw = vAmp > 0.0005 ? voiceWarp(hx, hy, hz) : 1;
          const X = hx * vw + m.sx[e] * out + ox, Y = hy * vw + m.sy[e] * out + oy, Zp = hz * vw + m.sz[e] * out + oz;
          const rx = X * cA + Zp * sA, rz = Zp * cA - X * sA;
          const py = Y * cB - rz * sB;
          const kh = persp / (persp - (Y * sB + rz * cB) * R);
          if (kh <= 0) continue;
          const hsx = cx + rx * R * kh, hsy = cy + py * R * kh;
          /* burst push on the flat mark */
          let bx = 0, by = 0, bz = 0;
          if (nU > 0) {
            const tx = m.tx[e] * zr, ty = m.ty[e] * zr, tz = Math.sqrt(Math.max(0.02, 1 - tx * tx - ty * ty));
            for (let t = 0; t < nU; t++) {
              const b = U[t];
              const dx = tx - b.vx, dy = ty - b.vy, dz = tz - b.vz, q = dx * dx + dy * dy + dz * dz;
              if (q > b.cutoffSq) continue;
              const k = b.age / (rp.recover * (0.7 + sd * 0.6));
              if (k > 7) continue;
              const g = rp.force * Math.exp(-q / b.reachSq * 1.2) * k * Math.exp(1 - k);
              if (g < 5e-4) continue;
              const inv = 1 / (Math.sqrt(q) || 1e-4);
              bx += dx * inv * g; by += dy * inv * g; bz += dz * inv * g * 0.6;
            }
          }
          const kt = persp / (persp - (m.tz[e] + bz) * R);
          const tsx = cx + m.tx[e] * Z * kt + bx * R + shX, tsy = cy + m.ty[e] * Z * kt + by * R + shY;
          let sx = hsx + (tsx - hsx) * mk, sy = hsy + (tsy - hsy) * mk;
          const kk = kh + (kt - kh) * mk;
          const sz = dot * m.size[e] * kk * dScale;
          let lensGlow = 1;
          if (lens > 0.01) { lp[0] = sx; lp[1] = sy; lensGlow = lensAt(lp); sx = lp[0]; sy = lp[1]; }
          if (sz < 0.35 || sx < -sz || sx > W + sz || sy < -sz || sy > H + sz) continue;
          const lx = hx * cA + hz * sA, lz0 = hz * cA - hx * sA;
          const ly = hy * cB - lz0 * sB, lz = hy * sB + lz0 * cB;
          let shade = (1 - dFade * (0.5 - lz * 0.5)) * (1 + rim * (1 - Math.abs(lz))) * (1 - lI + lI * Math.max(0, lx * LX + ly * LY + lz * LZ));
          shade += (1 - shade) * mk;
          const twk = tw > 0 ? 1 - tw + tw * (0.5 + 0.5 * Math.sin(time * twS * TAU + sd * TAU)) : 1;
          let a = m.alpha[e] * bright * mBright * shade * twk * vis * (1 - morph) * lensGlow;
          if (fade > 0 && p > 0) a *= 1 - fade * smooth(0.25, 1, p);
          if (a < 0.005) continue;
          const img = colorOf(sx, sy, sd, m.sprite[e]);
          ctx.globalAlpha = a > 1 ? 1 : a;
          ctx.drawImage(img, sx - sz / 2, sy - sz / 2, sz, sz);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }

    /* ---- pointer: parallax anywhere, hover + click on the sphere itself ---- */
    const overSphere = (e) => {
      const r = canvas.getBoundingClientRect();
      if (r.width < 1 || !frame.radius) return null;
      const x = (e.clientX - r.left) * (canvas.width / r.width), y = (e.clientY - r.top) * (canvas.height / r.height);
      const u = (x - frame.cx) / frame.radius, v = (y - frame.cy) / frame.radius;
      return u * u + v * v <= 1 ? { u, v } : null;
    };
    const onMove = (e) => {
      const r = wrapper.getBoundingClientRect();
      par.tx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1);
      par.ty = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1);
      hovering = e.pointerType !== "touch" && !!overSphere(e);
      const c = canvas.getBoundingClientRect();
      if (c.width > 0) {
        hp.tx = (e.clientX - c.left) * (canvas.width / c.width);
        hp.ty = (e.clientY - c.top) * (canvas.height / c.height);
        if (!hp.set) { hp.x = hp.tx; hp.y = hp.ty; hp.set = true; }
      }
    };
    const onLeave = () => { hovering = false; };
    const onDown = (e) => {
      if (reduced || scatter > 0.5) return;
      const hit = overSphere(e);
      if (!hit) return;
      const { u, v } = hit, w = Math.sqrt(Math.max(0, 1 - u * u - v * v));
      const f = frame;
      const iy = v * f.cosB + w * f.sinB, d = -v * f.sinB + w * f.cosB;
      bursts.push({ ix: u * f.cosA - d * f.sinA, iy, iz: u * f.sinA + d * f.cosA, age: 0 });
      while (bursts.length > C.ripple.maxConcurrent) bursts.shift();
      spinKick += C.ripple.spinKick;
      flash = C.ripple.markFlash;
    };
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown, { passive: true });
    }
    const onTheme = () => { setTheme(); if (reduced || paused || !visible) draw(9, scatter, 0); };
    window.addEventListener("lia:themechange", onTheme);

    /* ---- loop ---- */
    let raf = 0, last = 0, visible = true, paused = false, throttle = 1, frameNo = 0;
    /* hold the assembly until the splash screen starts its exit, so it is seen */
    const splashUp = () => {
      const el = document.getElementById("site-preloader");
      return !!el && !el.style.clipPath;
    };
    function tick(now) {
      raf = 0;
      if (!visible || paused || document.hidden) { last = 0; return; }
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      if (!started) { if (splashUp()) return; started = true; }
      clock += dt;

      retarget();
      const E = C.entrance;
      entrance = 1 - easeOut(clamp((clock - E.delay) / Math.max(0.1, E.duration), 0, 1));
      scatter += (scatterTarget - scatter) * (1 - Math.exp(-(1 / C.scatter.smoothing) * dt));
      const ps = 1 - Math.exp(-(1 / C.interaction.smoothing) * dt);
      par.x += (par.tx - par.x) * ps; par.y += (par.ty - par.y) * ps;
      hoverAmt += ((hovering ? 1 : 0) - hoverAmt) * (1 - Math.exp(-(1 / C.hover.smoothing) * dt));
      const hs = 1 - Math.exp(-dt / 0.09);
      hp.x += (hp.tx - hp.x) * hs; hp.y += (hp.ty - hp.y) * hs;
      /* hovering turns the logo gradient round the sphere; letting go eases it back
         to the logo's left → right */
      if (hoverAmt > 0.02) gAng += dt * 0.9 * hoverAmt;
      else { const home = Math.round(gAng / TAU) * TAU; gAng += (home - gAng) * (1 - Math.exp(-dt / 0.8)); }
      for (let i = bursts.length - 1; i >= 0; i--) { bursts[i].age += dt; if (bursts[i].age > C.ripple.recover * 9) bursts.splice(i, 1); }
      spinKick *= Math.exp(-dt / 0.45);
      flash *= Math.exp(-dt / 0.35);
      /* the voice level drives the modulation; "processing" gets a thinking pulse,
         connecting / an idle mic a low murmur so the surface never stands still */
      const mode = activity ? activity.mode : "idle";
      let lvl = activity ? clamp(activity.intensity || 0, 0, 1) : 0;
      if (voiceOn) {
        if (mode === "processing") lvl = Math.max(lvl, 0.28 + 0.16 * Math.sin(clock * 4.2));
        else lvl = Math.max(lvl, 0.12 + 0.05 * Math.sin(clock * 2.1));
      }
      /* a soft follower: the speaking meter is spiky, the surface should breathe */
      level += (lvl - level) * (1 - Math.exp(-dt / 0.24));
      vPh1 += dt * (2 + 3 * level);
      vPh2 += dt * (1.4 + 2.2 * level);
      /* the original orb's clock (time += 0.016 + 0.009·level per frame at 60fps) and
         its orbit / wave strengths per mode */
      wPh += dt * (0.96 + 0.54 * level);
      const pulse = (f) => Math.abs(Math.sin(f * wPh));
      const oMode = mode === "listening" ? 0.24 + 0.18 * pulse(2.8)
        : mode === "speaking" ? 0.22 + 0.13 * pulse(1.1)
        : mode === "processing" ? 0.14 + 0.06 * pulse(1.8)
        : mode === "error" ? 0.18 + 0.05 * pulse(7.4) : 0.04;
      const oT = clamp(Math.max(level, oMode), 0, 1);
      waveO += (oT - waveO) * (1 - Math.exp(-dt / 0.18));
      const iT = mode === "speaking" || mode === "listening" ? Math.max(level, 0.2) : Math.max(level, 0.08);
      waveI += (iT - waveI) * (1 - Math.exp(-dt / 0.18));
      const vs = 1 - Math.exp(-dt / 0.35);
      voiceAmt += ((voiceOn && clock >= spreadUntil - 0.35 ? 1 : 0) - voiceAmt) * vs;
      markAmt += ((voiceOn ? 0 : 1) - markAmt) * (1 - Math.exp(-dt / (voiceOn ? 0.18 : 0.45)));
      if (!voiceOn && level * 0.6 > flash) flash = level * 0.6;
      const boost = 1 + C.scatter.spinBoost * scatter + C.hover.spin * hoverAmt + level * (voiceOn ? 1.6 : 1);
      spin += C.rotation.direction * (C.rotation.speed * (Math.PI / 180) * boost + spinKick) * dt;

      if (throttle > 1 && (frameNo++ % throttle)) return;
      draw(clock, scatter, entrance);
    }
    const resume = () => { if (!raf && visible && !paused && !document.hidden && !reduced) { last = 0; raf = requestAnimationFrame(tick); } };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; resume(); }, { rootMargin: "120px" });
    io.observe(wrapper);
    const ro = new ResizeObserver(() => { if (reduced || !raf) draw(reduced ? 9 : clock, scatter, reduced ? 0 : entrance); });
    ro.observe(wrapper);
    const onVis = () => resume();
    document.addEventListener("visibilitychange", onVis);

    if (reduced) requestAnimationFrame(() => draw(9, 0, 0));
    else resume();

    return {
      /* stop drawing while the hero reveal has faded the orb out */
      setPaused(p) { paused = !!p; resume(); },
      setThrottle(n) { throttle = Math.max(1, n | 0); },
      /* 0 = gathered, 1 = fully dispersed (the hero's scroll reveal) */
      setScatter(p) { scrollScatter = clamp(p, 0, 1); retarget(); },
      /* voice session: the click spreads the cloud across the hero, it gathers back
         without the "AI" mark and ripples with the voice; when the session ends the
         mark forms again from the sphere's dots */
      setVoice(on) {
        on = !!on;
        if (on === voiceOn) return;
        voiceOn = on;
        if (on) {
          spreadUntil = clock + SPREAD_S;
          spinKick += 1.2;
        }
        retarget();
        resume();
      },
      destroy() {
        cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("lia:themechange", onTheme);
        document.removeEventListener("visibilitychange", onVis);
      },
    };
  }

  /* the reference's flickering grid: faint cells light up and fade at random,
     never two within two cells of each other (spawn 0.4s, in 0.8s, hold 1.5s,
     out 0.8s) */
  function grid(el) {
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const CELL = 32, LIFE = 800 + 1500 + 800, MIN = 2, MAX = 20;
    const live = [];
    let timer = 0;
    const spawn = () => {
      const cols = Math.floor(el.clientWidth / CELL), rows = Math.floor(el.clientHeight / CELL);
      if (cols < 1 || rows < 1 || live.length >= MAX) return;
      for (let tries = 0; tries < 12; tries++) {
        const c = Math.floor(Math.random() * cols), r = Math.floor(Math.random() * rows);
        if (live.some((b) => Math.abs(b.c - c) < MIN && Math.abs(b.r - r) < MIN)) continue;
        const box = document.createElement("span");
        box.className = "bp-sphere-grid__box";
        box.style.left = c * CELL + "px"; box.style.top = r * CELL + "px";
        el.appendChild(box);
        const rec = { c, r };
        live.push(rec);
        setTimeout(() => { box.remove(); live.splice(live.indexOf(rec), 1); }, LIFE);
        return;
      }
    };
    const run = (on) => { clearInterval(timer); timer = on ? setInterval(spawn, 400) : 0; };
    new IntersectionObserver(([e]) => run(e.isIntersecting && !document.hidden)).observe(el);
  }

  window.LiaParticleSphere = { create, grid };
})();
