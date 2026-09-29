import trajectoryBgUrl from "../assets/trajectory/background.webp"; /* React build: bundler-resolved asset URL */
/* =============================================================================
   journey-fluid.js — the liquid distortion of the orange / purple gradient in
   the "Today / I bridge / the two." section (port of createImageDistortionScene
   from guillaumezhu.com). Once the two gradient slices driven by js/journey.js
   meet and fill the stage, a WebGL canvas showing the same image takes over:
   the picture slowly flows on its own and is dragged by the pointer like a
   fluid. Self-contained: it only reads the slices' geometry, so journey.js is
   untouched. Falls back to the static slices when WebGL is unavailable.
   ============================================================================= */
(function () {
  "use strict";

  const IMAGE_URL = trajectoryBgUrl;

  /* same values as the reference scene + its trajectory "wake up" settings */
  const CFG = {
    radius: 0.42,          /* was 0.35: a wider pull under the pointer */
    velocityGain: 0.5,     /* was 0.25: the liquid drag reads on the smooth gradient */
    positionDamping: 0.1,
    velocityDamping: 0.15,
    strengthRise: 0.15,
    strengthDecay: 0.03,
    idleSpeed: 1,
    idleFrequency: [5, 20],
    idleStable: 0.012,
    zoomActive: 1.02,
    maxPixelRatio: 1.5,
    wakeSeconds: 1.4,
  };

  const VERT = `attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  const FRAG = `precision highp float;
uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_idleSpeed;
uniform float u_idleStrength;
uniform vec2 u_idleFrequency;
uniform vec2 u_mouse;
uniform vec2 u_velocity;
uniform float u_strength;
uniform float u_radius;
uniform float u_zoom;
uniform float u_interactionStrength;
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  float time = u_time * u_idleSpeed;

  vec2 idleFlow = vec2(
    sin(uv.y * u_idleFrequency.x + time) +
      sin(uv.x * 1.7 - time * 0.63) * 0.5,
    cos(uv.x * u_idleFrequency.y - time * 0.7) +
      cos(uv.y * 1.5 + time * 0.47) * 0.5
  ) / 1.5;

  vec2 mouseDelta = uv - u_mouse;
  mouseDelta.x *= u_resolution.x / u_resolution.y;
  float mouseInfluence = smoothstep(u_radius, 0.0, length(mouseDelta));
  vec2 mouseOffset = u_velocity * mouseInfluence * u_strength;

  /* the image is stretched to the stage, exactly like the CSS slices */
  vec2 imageUv = uv + idleFlow * u_idleStrength - mouseOffset * u_interactionStrength;
  imageUv = (imageUv - 0.5) / u_zoom + 0.5;
  gl_FragColor = texture2D(u_image, imageUv);
}`;

  const damp = (k, dt) => 1 - Math.pow(1 - k, dt * 60);

  /* ---- brand skin: the stock orange / purple picture is re-graded once per theme
     onto the Better Pitch palette: deep pink #E61746 → coral red #F53521 →
     bright orange #FE6328. Each pixel's warmth (red vs blue) picks its place on
     that run — the purple side becomes deep pink, the soft blend coral red and the
     orange side bright orange — and its brightness keeps the picture's folds and
     grain. Night is deeper and more contrasty with near-black wine shadows; day is
     a touch lighter and softer with rose shadows. Both keep the cream "outcomes."
     readable. The result feeds the CSS slices (--traj-bg) and the WebGL texture
     alike. */
  const SKINS = {
    /* night: the voice demo card's colours (css/card-demo.css) — crimson #e8173f →
       red #f4301f → orange #ff5a2c, with the card's magenta in the deep folds (the
       shadow tint), so like the card it is mostly red with a magenta depth */
    night: {
      stops: [[0, "#d4124c"], [0.3, "#e8173f"], [0.62, "#f4301f"], [1, "#ff5a2c"]],
      shadow: "#7a0a62", shadowMix: 0.5, contrast: 1.02, lift: -0.03,
    },
    day: {
      stops: [[0, "#c4133d"], [0.25, "#E61746"], [0.6, "#F53521"], [1, "#FE6328"]],
      shadow: "#6b0f24", shadowMix: 0.28, contrast: 1.03, lift: 0.02,
    },
  };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const currentTheme = () => (document.documentElement.classList.contains("light") ? "day" : "night");

  function gradeImage(img, skin) {
    const scale = Math.min(1, 2048 / img.naturalWidth);
    const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h);
    const px = data.data;

    /* 256-step lookup of the brand gradient */
    const stops = skin.stops.map(([t, c]) => [t, hex(c)]);
    const lut = new Float32Array(256 * 3);
    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      let k = 0;
      while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
      const [t0, a] = stops[k], [t1, b] = stops[k + 1];
      const f = clamp01((t - t0) / (t1 - t0));
      for (let c = 0; c < 3; c++) lut[i * 3 + c] = a[c] + (b[c] - a[c]) * f;
    }
    const sh = hex(skin.shadow);

    for (let i = 0; i < px.length; i += 4) {
      const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255;
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      /* warmth: orange ≈ +0.75, purple ≈ -0.45 */
      let t = clamp01((r - b + 0.45) / 1.2);
      t = t * t * (3 - 2 * t);
      const j = ((t * 255) | 0) * 3;
      /* brightness relative to what that hue usually has in the picture */
      const s = Math.min(1.25, Math.max(0.5, lum / (0.35 + 0.23 * t)));
      const dark = Math.max(0, 1 - s) * 2 * skin.shadowMix;
      for (let c = 0; c < 3; c++) {
        let v = lut[j + c] * s;
        v = v + (sh[c] - v) * dark;
        v = (v - 0.5) * skin.contrast + 0.5 + skin.lift;
        px[i + c] = clamp01(v) * 255;
      }
    }
    ctx.putImageData(data, 0, 0);
    return cv;
  }

  /* ---- the hero voice card's gradient (css/card-demo.css + the card's screen-blend
     highlight layer), painted at the stage's aspect so the slices and the fluid
     layer show exactly the card's colours: 158° orange → red → crimson → magenta
     base, orange / magenta / red / pink glows, then a soft white and a faint cyan
     highlight in screen blend. CSS lists the top layer first, so it is painted
     bottom-up. Radial sizes / positions are % of the box, as in CSS. */
  function paintCardGradient() {
    const w = 2048, h = Math.max(512, Math.round(w * (window.innerHeight / Math.max(1, window.innerWidth))));
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    const ctx = cv.getContext("2d");
    /* linear-gradient(158deg, …): CSS gradient line through the centre */
    const a = (158 * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a);
    const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2;
    const lin = ctx.createLinearGradient(w / 2 - dx * half, h / 2 - dy * half, w / 2 + dx * half, h / 2 + dy * half);
    [[0, "#ff5a2c"], [0.36, "#f4301f"], [0.66, "#e8173f"], [1, "#cf159f"]].forEach(([o, c]) => lin.addColorStop(o, c));
    ctx.fillStyle = lin;
    ctx.fillRect(0, 0, w, h);
    /* radial-gradient(RX% RY% at X% Y%, color 0%, transparent END%) */
    const radial = (rx, ry, x, y, rgb, alpha, end) => {
      const RX = rx * w, RY = ry * h;
      ctx.save();
      ctx.translate(x * w, y * h);
      ctx.scale(1, RY / RX);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, RX);
      g.addColorStop(0, `rgba(${rgb},${alpha})`);
      g.addColorStop(end, `rgba(${rgb},0)`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(-x * w, (-y * h) * (RX / RY), w, h * (RX / RY));
      ctx.restore();
    };
    radial(0.55, 0.45, 0.10, 0.08, "255,110,40", 0.7, 0.6);
    radial(0.60, 0.50, 1.00, 1.00, "236,26,44", 0.75, 0.6);
    radial(0.80, 0.62, 0.00, 1.00, "214,22,214", 0.9, 0.62);
    radial(0.70, 0.50, 0.88, 0.04, "255,150,200", 0.55, 0.6);
    /* colour through the middle band: the two blocks show this band while they
       meet (so they carry the card's range, not a flat red strip), and the
       extra structure is what the liquid distortion visibly swirls — a smooth
       gradient pushed around looks unchanged */
    radial(0.18, 0.22, 0.12, 0.52, "255,90,44", 0.45, 0.62);
    radial(0.26, 0.30, 0.30, 0.46, "247,54,121", 0.45, 0.62);
    radial(0.22, 0.28, 0.58, 0.56, "255,110,40", 0.5, 0.62);
    radial(0.24, 0.32, 0.84, 0.48, "214,22,214", 0.5, 0.62);
    /* (no thin light streaks: stretched by the flow they read as white lines above
       and below "outcomes.") */
    /* the card's highlight layer (mix-blend-mode: screen) */
    ctx.globalCompositeOperation = "screen";
    radial(0.38, 0.30, 0.18, 0.88, "80,230,255", 0.12, 0.6);
    radial(0.52, 0.42, 0.68, 0.18, "255,255,255", 0.22, 0.6);
    ctx.globalCompositeOperation = "source-over";
    return cv;
  }

  /* graded pictures per theme, made on demand and kept. Both themes now use the
     voice card's gradient (the card looks the same in either theme); the photo
     grading above is kept for reference but no longer called. */
  const graded = {};
  const skinListeners = [];
  function gradedFor(img, theme) {
    if (!graded[theme]) {
      const entry = { canvas: paintCardGradient(), url: null };
      graded[theme] = entry;
      entry.canvas.toBlob((blob) => {
        if (!blob) return;
        entry.url = URL.createObjectURL(blob);
        skinListeners.forEach((fn) => fn());
      }, "image/jpeg", 0.92);
    }
    return graded[theme];
  }

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(log || "shader compile failed");
  }

  function init() {
    const root = document.getElementById("section-journey");
    if (!root || root.dataset.fluid) return;
    const container = root.querySelector(".traj__container");
    const visuals = root.querySelector(".traj__visuals");
    const left = root.querySelector(".traj__visual--left");
    const right = root.querySelector(".traj__visual--right");
    if (!container || !visuals || !left || !right) return;
    root.dataset.fluid = "1";

    /* the picture, re-graded to the brand skin for the current theme: the CSS
       slices read it through --traj-bg, the WebGL layer uploads the same pixels */
    let texture = null, gl = null;
    const img = new Image();
    img.decoding = "async";
    const uploadSkin = () => {
      if (!img.naturalWidth) return;
      const entry = gradedFor(img, currentTheme());
      if (entry.url) root.style.setProperty("--traj-bg", `url("${entry.url}")`);
      if (gl && texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, entry.canvas);
      }
    };
    skinListeners.push(uploadSkin);
    window.addEventListener("lia:themechange", () => requestAnimationFrame(uploadSkin));
    /* perf: the texture is only drawn mid-page; fetching it after the window
       load event keeps it off the critical path (the preloader waits for load) */
    if (document.readyState === "complete") img.src = IMAGE_URL;
    else window.addEventListener("load", () => { img.src = IMAGE_URL; }, { once: true });

    /* no WebGL layer (reduced motion, no context, shader failure): the slices
       still get the graded picture */
    img.onload = uploadSkin;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = document.createElement("div");
    wrap.className = "traj__fluid";
    const canvas = document.createElement("canvas");
    canvas.className = "traj__fluid-canvas";
    wrap.appendChild(canvas);
    visuals.appendChild(wrap);

    gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!gl) { wrap.remove(); return; }

    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (err) {
      console.error("journey-fluid: unable to build the shader", err);
      wrap.remove();
      return;
    }

    const U = {};
    ["u_image", "u_resolution", "u_time", "u_idleSpeed", "u_idleStrength", "u_idleFrequency", "u_mouse",
      "u_velocity", "u_strength", "u_radius", "u_zoom", "u_interactionStrength"]
      .forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(prog);
    const aPos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(U.u_image, 0);
    gl.uniform1f(U.u_idleSpeed, CFG.idleSpeed);
    gl.uniform2fv(U.u_idleFrequency, CFG.idleFrequency);
    gl.uniform1f(U.u_radius, CFG.radius);

    img.onload = () => {
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      uploadSkin();
    };

    /* pointer state (same damping model as the reference) */
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const target = { x: 0.5, y: 0.5 }, pos = { x: 0.5, y: 0.5 }, prev = { x: 0.5, y: 0.5 };
    const vel = { x: 0, y: 0 }, smoothVel = { x: 0, y: 0 };
    let strength = 0, hovering = false, primed = true;

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      const r = container.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      if (primed) {
        pos.x = prev.x = target.x; pos.y = prev.y = target.y;
        vel.x = vel.y = smoothVel.x = smoothVel.y = 0; strength = 0; primed = false;
      }
      hovering = true;
    };
    const onLeave = () => { hovering = false; primed = true; };
    if (finePointer) {
      container.addEventListener("pointerenter", onMove, { passive: true });
      container.addEventListener("pointermove", onMove, { passive: true });
      container.addEventListener("pointerleave", onLeave);
    }

    let visible = false, raf = 0, last = 0, time = 0, wake = 0, shown = false;

    /* the canvas takes over only while both slices exactly fill the stage */
    function slicesFill() {
      const c = container.getBoundingClientRect();
      const l = left.getBoundingClientRect();
      const r = right.getBoundingClientRect();
      const near = (a, b) => Math.abs(a - b) <= 1;
      return parseFloat(getComputedStyle(left).opacity) > 0.99 &&
        near(l.left, c.left) && near(r.right, c.right) &&
        near(l.top, c.top) && near(l.bottom, c.bottom) &&
        near(r.top, c.top) && near(r.bottom, c.bottom) && l.right >= r.left - 1;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, CFG.maxPixelRatio);
      const w = Math.max(1, Math.round(container.clientWidth * dpr));
      const h = Math.max(1, Math.round(container.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function frame(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = last ? Math.min(Math.max((now - last) / 1000, 1 / 240), 1 / 30) : 1 / 60;
      last = now;

      const active = !!texture && slicesFill();
      /* strengths come from the scroll-scrubbed journey timeline; without it,
         wake up over time instead */
      const scrubbed = window.LiaJourney && window.LiaJourney.fluid;
      wake += ((active ? 1 : 0) - wake) * Math.min(1, dt / (CFG.wakeSeconds / 4));
      if (!active) wake = 0;
      const idleStrength = scrubbed ? scrubbed.idle : CFG.idleStable * wake;
      const interaction = scrubbed ? scrubbed.interaction : wake;
      const zoom = scrubbed ? scrubbed.zoom : 1 + (CFG.zoomActive - 1) * wake;

      if (active !== shown) {
        shown = active;
        wrap.style.opacity = active ? "1" : "0";
        if (!active) time = 0;
      }

      if (active) {
        time += dt;
        const pd = damp(CFG.positionDamping, dt);
        pos.x += (target.x - pos.x) * pd;
        pos.y += (target.y - pos.y) * pd;
        vel.x = (pos.x - prev.x) / dt * CFG.velocityGain;
        vel.y = (pos.y - prev.y) / dt * CFG.velocityGain;
        prev.x = pos.x; prev.y = pos.y;
        const vd = damp(CFG.velocityDamping, dt);
        smoothVel.x += (vel.x - smoothVel.x) * vd;
        smoothVel.y += (vel.y - smoothVel.y) * vd;
        const goal = hovering ? Math.min(Math.hypot(smoothVel.x, smoothVel.y) * 6, 1) : 0;
        strength += (goal - strength) * damp(strength < goal ? CFG.strengthRise : CFG.strengthDecay, dt);

        resize();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1f(U.u_idleStrength, idleStrength);
        gl.uniform1f(U.u_interactionStrength, finePointer ? interaction : 0);
        gl.uniform1f(U.u_zoom, zoom);
        gl.uniform2f(U.u_mouse, pos.x, pos.y);
        gl.uniform2f(U.u_velocity, smoothVel.x, smoothVel.y);
        gl.uniform1f(U.u_strength, strength);
        gl.uniform2f(U.u_resolution, canvas.width, canvas.height);
        gl.uniform1f(U.u_time, time);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(frame);
    }

    const start = () => { if (!raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); }).observe(container);
    document.addEventListener("visibilitychange", start);
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      visible = false;
      wrap.remove();
    });
  }

  window.LiaJourneyFluid = { init };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
