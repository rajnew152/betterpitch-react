/* =============================================================================
   waveform.js — the hero's voice orb: a torus of glowing particles whose
   surface ripples with the voice level, drawn with raw WebGL. `activity` is a
   mutable object with
   { intensity: 0..1, mode: "idle"|"listening"|"processing"|"speaking"|"error" }.
   The torus faces the viewer, so the status text and mic button (the overlay in
   VoiceAgent.jsx) sit in its hole. Colours follow the brand gradient
   (orange → pink → magenta → violet, top to bottom), deeper in the light theme.
   ============================================================================= */
(function () {
  "use strict";
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  const MAJOR = 0.68;   // torus radius (centre of the tube)
  const MINOR = 0.3;    // tube radius
  const SEG_U = 250;    // particles around the ring
  const SEG_V = 104;    // particles around the tube
  const CAM = 4.0;      // camera distance, for a little perspective
  const SCALE = 0.86;   // outer edge of the resting torus in clip space

  const DARK = [[255, 122, 58], [247, 54, 121], [226, 50, 219], [139, 92, 246]];
  const LIGHT = [[232, 80, 47], [216, 27, 96], [181, 23, 158], [109, 40, 217]];

  const VS = `
    attribute vec2 aUV;
    attribute float aRnd;
    uniform float uT, uAmp, uSpin, uScale, uPx;
    uniform vec2 uTilt;
    uniform vec3 uC0, uC1, uC2, uC3;
    varying vec3 vCol;
    varying float vAlpha;
    const float R = ${MAJOR.toFixed(3)}, r = ${MINOR.toFixed(3)}, D = ${CAM.toFixed(2)};
    vec3 grad(float t) {
      if (t < 0.333) return mix(uC0, uC1, t / 0.333);
      if (t < 0.666) return mix(uC1, uC2, (t - 0.333) / 0.333);
      return mix(uC2, uC3, (t - 0.666) / 0.334);
    }
    void main() {
      float u = aUV.x, v = aUV.y;
      /* organic ripple: a few travelling waves over the surface */
      float n = sin(3.0 * u + 2.0 * v + uT * 0.9) * 0.5
              + sin(5.0 * u - 3.0 * v - uT * 1.3) * 0.3
              + sin(7.0 * u + uT * 0.7) * sin(4.0 * v - uT) * 0.35;
      float tube = r + uAmp * n + 0.01 * (aRnd - 0.5);
      float ring = R + uAmp * 0.35 * sin(4.0 * u + uT * 0.6);
      vec3 nrm = vec3(cos(v) * cos(u), cos(v) * sin(u), sin(v));
      vec3 p = vec3(ring * cos(u), ring * sin(u), 0.0) + tube * nrm;

      /* spin around the viewing axis, then tilt towards the pointer */
      float cs = cos(uSpin), sn = sin(uSpin);
      mat3 rz = mat3(cs, sn, 0.0, -sn, cs, 0.0, 0.0, 0.0, 1.0);
      float cx = cos(uTilt.y), sx = sin(uTilt.y);
      mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cx, sx, 0.0, -sx, cx);
      float cy = cos(uTilt.x), sy = sin(uTilt.x);
      mat3 ry = mat3(cy, 0.0, -sy, 0.0, 1.0, 0.0, sy, 0.0, cy);
      mat3 m = ry * rx * rz;
      vec3 q = m * p;
      vec3 qn = m * nrm;

      float persp = D / (D - q.z);
      vec2 xy = q.xy * persp * uScale;
      gl_Position = vec4(xy, 0.0, 1.0);
      gl_PointSize = uPx * persp * (0.75 + 0.5 * aRnd);

      /* colour by height on screen, brightness by how much the surface faces us */
      vCol = grad(clamp(0.5 - xy.y * 0.58, 0.0, 1.0));
      float facing = clamp(qn.z, -1.0, 1.0);
      vAlpha = (0.3 + 0.7 * smoothstep(-0.6, 0.9, facing)) * (0.55 + 0.45 * aRnd);
    }`;

  const FS = `
    precision mediump float;
    varying vec3 vCol;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.15, d) * vAlpha;
      gl_FragColor = vec4(vCol * a, a);
    }`;

  function program(gl, vs, fs) {
    const mk = (t, s) => { const h = gl.createShader(t); gl.shaderSource(h, s); gl.compileShader(h);
      if (!gl.getShaderParameter(h, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(h); return h; };
    const p = gl.createProgram();
    gl.attachShader(p, mk(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw gl.getProgramInfoLog(p);
    return p;
  }

  /* jittered grid over the torus surface, so the dots read as organic, not ruled */
  function buildParticles() {
    const n = SEG_U * SEG_V;
    const uv = new Float32Array(n * 2), rnd = new Float32Array(n);
    let i = 0;
    for (let a = 0; a < SEG_U; a++) for (let b = 0; b < SEG_V; b++, i++) {
      uv[i * 2] = ((a + Math.random() * 0.8) / SEG_U) * Math.PI * 2;
      uv[i * 2 + 1] = ((b + Math.random() * 0.8) / SEG_V) * Math.PI * 2;
      rnd[i] = Math.random();
    }
    return { uv, rnd, count: n };
  }

  function create(wrapper, canvas, activity /* , showCore */) {
    const noop = { setPaused() {}, setThrottle() {}, destroy() {} };
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return noop;
    let prog;
    try { prog = program(gl, VS, FS); } catch (e) { return noop; }

    const parts = buildParticles();
    const buf = (data) => { const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); return b; };
    const bUV = buf(parts.uv), bRnd = buf(parts.rnd);
    const aUV = gl.getAttribLocation(prog, "aUV"), aRnd = gl.getAttribLocation(prog, "aRnd");
    const U = {};
    ["uT", "uAmp", "uSpin", "uScale", "uPx", "uTilt", "uC0", "uC1", "uC2", "uC3"].forEach((k) => { U[k] = gl.getUniformLocation(prog, k); });

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, bUV);
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, bRnd);
    gl.enableVertexAttribArray(aRnd);
    gl.vertexAttribPointer(aRnd, 1, gl.FLOAT, false, 0, 0);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);

    const pointer = { x: 0, y: 0, active: false };
    let raf = 0, size = 0, dpr = 1, visible = true, time = 0, paused = false, running = false, throttle = 1, frameNo = 0;
    let tiltX = 0, tiltY = 0, spin = 0, amp = 0.05, lastTheme = null;

    function resize() {
      const w = Math.max(1, Math.floor(wrapper.offsetWidth));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = w;
      canvas.width = w * dpr; canvas.height = w * dpr;
      canvas.style.width = w + "px"; canvas.style.height = w + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function applyTheme(light) {
      const c = light ? LIGHT : DARK;
      ["uC0", "uC1", "uC2", "uC3"].forEach((k, i) => gl.uniform3f(U[k], c[i][0] / 255, c[i][1] / 255, c[i][2] / 255));
      /* additive glow on the dark ground; plain "over" blending on the light one,
         where adding light to near-white would wash the dots out */
      if (light) gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      else gl.blendFunc(gl.ONE, gl.ONE);
    }

    function frame() {
      if (paused || !visible) { running = false; return; }
      running = true;
      // while the scroll reveal scales/fades the orb, draw every other frame
      if (throttle > 1 && (frameNo++ % throttle) !== 0) { raf = requestAnimationFrame(frame); return; }

      const light = document.documentElement.classList.contains("light");
      if (light !== lastTheme) { applyTheme(light); lastTheme = light; }

      const s = clamp(activity.intensity);
      const mode = activity.mode;
      const t = time;
      const o = clamp(Math.max(s,
        mode === "listening" ? 0.24 + 0.18 * Math.abs(Math.sin(2.8 * t))
        : mode === "speaking" ? 0.22 + 0.13 * Math.abs(Math.sin(1.1 * t))
        : mode === "processing" ? 0.14 + 0.06 * Math.abs(Math.sin(1.8 * t))
        : mode === "error" ? 0.18 + 0.05 * Math.abs(Math.sin(7.4 * t))
        : 0.04));
      amp += (0.045 + 0.12 * o - amp) * 0.12;

      /* resting tilt with a slow drift; the pointer leans the torus towards it */
      const px = pointer.active ? clamp(pointer.x / (size / 2), -1, 1) : 0;
      const py = pointer.active ? clamp(pointer.y / (size / 2), -1, 1) : 0;
      tiltX += (0.12 * Math.sin(0.23 * t) + 0.45 * px - tiltX) * 0.05;
      tiltY += (0.22 + 0.1 * Math.cos(0.19 * t) + 0.45 * py - tiltY) * 0.05;
      spin += 0.0025 + (mode === "processing" ? 0.01 : 0) + 0.006 * o;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(U.uT, t);
      gl.uniform1f(U.uAmp, amp);
      gl.uniform1f(U.uSpin, spin);
      gl.uniform1f(U.uScale, SCALE / (MAJOR + MINOR));
      gl.uniform1f(U.uPx, Math.max(1.5, 0.0032 * size * dpr));
      gl.uniform2f(U.uTilt, tiltX, tiltY);
      gl.drawArrays(gl.POINTS, 0, parts.count);

      time += 0.016 + 0.012 * s;
      raf = requestAnimationFrame(frame);
    }
    const resume = () => { if (!running && !paused && visible) { cancelAnimationFrame(raf); frame(); } };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left - r.width / 2;
      pointer.y = e.clientY - r.top - r.height / 2;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    }, { threshold: 0 });
    io.observe(wrapper);
    /* the overlay (text + mic) is a sibling covering the centre: listen on their parent */
    const hover = wrapper.parentElement || wrapper;
    hover.addEventListener("pointermove", onMove);
    hover.addEventListener("pointerleave", onLeave);
    resize();
    frame();

    return {
      /* stop drawing while the orb is faded out by the scroll reveal */
      setPaused(p) { paused = !!p; resume(); },
      setThrottle(n) { throttle = Math.max(1, n | 0); },
      destroy() {
        cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
        hover.removeEventListener("pointermove", onMove); hover.removeEventListener("pointerleave", onLeave);
        gl.deleteBuffer(bUV); gl.deleteBuffer(bRnd); gl.deleteProgram(prog);
      },
    };
  }

  window.LiaWaveform = { create, clamp };
})();
