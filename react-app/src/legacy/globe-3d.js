import mapUrl from "../assets/map.webp"; /* React build: bundler-resolved asset URL */
/* =============================================================================
   globe-3d.js — interactive dotted globe in the footer card, a faithful
   port of the Framer globe on bewildered-snow-284775.framer.app (a custom
   three.js component). Replicated here in raw WebGL: the ocean sphere with
   its noise-lit shader, the white land particles sampled from three-globe's
   earth-water.png mask (fallback: local assets/map.webp), the staggered
   fly-in assembly, per-dot pulsing, drag-to-spin with inertia, and the
   hover lens that magnifies dots under the pointer. If WebGL or the land
   mask is unavailable, the old flat map stays untouched.
   ============================================================================= */
(function () {
  "use strict";

  /* "night earth" look (after dribbble.com/shots/26986637-Interactive-Globe): a
     near-black planet seen from below its horizon, a thin bright atmosphere line
     along the limb that bleeds softly into the sky, faint orbit rings around it,
     sparse twinkling city lights on the land, a slow spin and a gentle parallax
     tilt that follows the pointer. Colours are the site's pink / magenta family
     where the reference is blue. */
  const DOT_DENSITY = 18000;          // land candidates = 3x this (sparse city lights)
  const BASE_SIZE = 4.2, SIZE_RANDOM = 0.9;
  const ROT_SPEED = 0.05;
  const OCEAN_HI = [1.000, 0.302, 0.553];   // #FF4D8D limb / atmosphere (hot pink)
  const OCEAN_DARK = [0.024, 0.008, 0.039]; // #060210 the planet's night side
  const OCEAN_LIGHT = [0.165, 0.039, 0.118]; // #2A0A1E faint plum lift towards the top
  const DOT_COLOR = [1.000, 0.878, 0.925];   // #FFE0EC pink-white city lights
  const HOVER_COLOR = [1.000, 0.580, 0.471]; // #FF9478 coral under the pointer
  const GLOW = [0.969, 0.212, 0.475];        // #F73679 sky glow / rings (brand pink)
  const PARALLAX = { x: 0.22, y: 0.12 };     // radians of tilt at the screen edges
  const LENS = { radius: 0.45, mag: 0.06, bulge: 0.06, scale: 1.6 };
  const CAM_Z = 2.9, FOV = 40 * Math.PI / 180, RADIUS = 0.99;
  const BAND = 0.24, MAX_W = 2600;
  /* sky headroom above the horizon (fraction of the holder width): the canvas is
     placed in the footer section, not inside the clipped globe circle, so the
     atmosphere and the orbit rings can bleed above the limb */
  const HEAD = 0.16;
  /* the sphere renders in a square this fraction of the 160vw holder wide
     (0.6 ≈ 96vw on screen), centred — small enough that its curvature reads
     as a real globe instead of a flat horizon */
  const SPHERE_W = 0.6;
  /* highest the planet's crest may reach, as a fraction of the section height
     measured from its bottom (js: resize caps the globe size with it) */
  const CREST = 0.72;

  const NOISE = `
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0;
      vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
      vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
      return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  /* ---- ocean sphere: verbatim port of the component's shader ---- */
  const OCEAN_VS = `
    attribute vec3 aPos;
    uniform mat4 uMV, uProj; uniform mat3 uNorm;
    varying vec3 vNormal, vPosition;
    void main(){
      vNormal = uNorm * aPos;
      vec4 mv = uMV * vec4(aPos, 1.0);
      vPosition = mv.xyz;
      gl_Position = uProj * mv;
    }`;
  const OCEAN_FS = `
    precision highp float;
    uniform float uTime, uAppear;
    uniform vec3 uColorHighlight, uColorDark, uColorLight;
    varying vec3 vNormal, vPosition;
    ${NOISE}
    void main(){
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(-vPosition);
      float ndv = max(dot(viewDir, normal), 0.0);
      /* night side: almost black, a faint plum lift towards the top of the disc
         with slow drifting cloud noise so the surface is not flat */
      float top = smoothstep(-0.4, 1.0, normal.y);
      float n1 = snoise(normal * 3.0 + uTime * 0.06) * 0.5 + 0.5;
      vec3 base = mix(uColorDark, uColorLight, top * 0.45 + n1 * 0.15);
      /* atmosphere: a thin bright line right at the limb plus a wider soft
         fresnel band inside it, both strongest at the top of the visible arc */
      float fres = pow(1.0 - ndv, 3.0);
      float limb = smoothstep(0.86, 1.0, 1.0 - ndv);
      float rimNoise = snoise(normal * 10.0 + uTime * 0.15) * 0.5 + 0.5;
      float weight = 0.55 + 0.45 * top;
      vec3 finalColor = base + uColorHighlight * (fres * 0.32 + limb * (0.9 + rimNoise * 0.3)) * weight;
      float easeAppear = 1.0 - pow(1.0 - clamp(uAppear * 1.5, 0.0, 1.0), 3.0);
      gl_FragColor = vec4(finalColor, easeAppear);
    }`;

  /* ---- sky: the atmosphere bleeding past the limb + faint orbit rings, drawn
     as a full-canvas quad in additive blending before the planet ---- */
  const SKY_VS = `
    attribute vec2 aPos;
    void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;
  const SKY_FS = `
    precision highp float;
    uniform vec2 uCenter; uniform float uRadius, uTime, uAppear;
    uniform vec3 uGlow;
    void main(){
      vec2 dir = (gl_FragCoord.xy - uCenter) / uRadius;
      float d = length(dir);                       /* 1.0 at the limb */
      float outside = smoothstep(0.99, 1.005, d);
      float top = smoothstep(-0.25, 1.0, dir.y);   /* brightest above the horizon */
      float halo = exp(-(d - 1.0) * 45.0) * outside;            /* tight bright edge */
      float glow = exp(-(d - 1.0) * 4.5) * outside;             /* wide soft bleed */
      float breathe = 0.92 + 0.08 * sin(uTime * 0.8);
      /* orbit rings: thin concentric lines, fading with distance, drifting slowly */
      float rings = 0.0;
      for (int i = 1; i <= 6; i++) {
        float rr = 1.0 + float(i) * 0.14 + 0.01 * sin(uTime * 0.3 + float(i));
        rings += 1.0 - smoothstep(0.0, 0.0045 + 0.001 * float(i), abs(d - rr));
      }
      rings *= 0.13 * (1.0 - smoothstep(1.0, 2.1, d)) * (0.35 + 0.65 * top);
      float a = (halo * 0.95 + glow * 0.7 * top) * breathe + rings;
      gl_FragColor = vec4(uGlow * a, clamp(a, 0.0, 1.0) * uAppear);
    }`;

  /* ---- land dots: verbatim port (assembly, pulse, hover lens) ---- */
  const DOTS_VS = `
    attribute vec3 aPos; attribute float aSize; attribute float aRandom;
    uniform mat4 uMV, uProj;
    uniform vec3 uHoverPos;
    uniform float uHoverActive, uHoverRadius, uTime, uAppear;
    uniform float uLensMag, uLensBulge, uLensScale, uPx;
    varying float vAlpha, vEffect;
    void main(){
      vec3 pos = aPos;
      float delay = aRandom * 0.5;
      float p = clamp((uAppear - delay) / 0.5, 0.0, 1.0);
      float easeP = 1.0 - pow(1.0 - p, 3.0);
      vec3 normal = normalize(pos);
      vec3 startPos = pos + normal * (1.0 - easeP) * (0.5 + aRandom * 0.5);
      pos = mix(startPos, pos, easeP);
      float dist = distance(pos, uHoverPos);
      float effect = 1.0 - smoothstep(0.0, uHoverRadius, dist);
      vEffect = effect * uHoverActive;
      if (vEffect > 0.0) {
        vec3 toCenter = pos - uHoverPos;
        float distToCenter = length(toCenter);
        if (distToCenter > 0.001) {
          vec3 tangentPush = normalize(toCenter - dot(toCenter, normal) * normal);
          float magnify = sin(effect * 3.14159) * uLensMag * uHoverActive;
          pos += tangentPush * magnify;
          float bulge = sin(effect * 1.570796) * uLensBulge * uHoverActive;
          pos += normal * bulge;
        }
      }
      vec4 mvPosition = uMV * vec4(pos, 1.0);
      gl_Position = uProj * mvPosition;
      /* city lights: each dot twinkles on its own slow rhythm */
      float pulse = sin(uTime * 1.4 + aRandom * 60.0) * 0.5 + 0.5;
      float scale = 1.0 + (effect * uLensScale * uHoverActive);
      scale *= easeP;
      gl_PointSize = (aSize * scale * (0.7 + 0.5 * pulse)) * (uPx / -mvPosition.z);
      vAlpha = (0.25 + 0.75 * aRandom) * (0.45 + 0.55 * pulse);
    }`;
  const DOTS_FS = `
    precision highp float;
    uniform vec3 uColor, uHoverColor;
    uniform float uOpacity, uAppear;
    varying float vAlpha, vEffect;
    void main(){
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 1.2);
      vec3 finalColor = mix(uColor, uHoverColor, vEffect);
      gl_FragColor = vec4(finalColor, strength * uOpacity * vAlpha * uAppear);
    }`;

  /* ------------------------------------------------------------- helpers */
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

  /* land mask: three-globe's earth-water.png (red < 128 = land), with the
     local map texture as an offline fallback */
  function loadMask(cb) {
    const read = (img, invert) => {
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const x = c.getContext("2d", { willReadFrequently: true });
      x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height).data;
      const W = c.width, H = c.height;
      if (invert) { // local dark map: bright pixels are land
        const lum = new Uint8Array(W * H);
        for (let i = 0; i < W * H; i++) lum[i] = (Math.max(d[i*4], d[i*4+1], d[i*4+2]) * d[i*4+3]) / 255;
        const thr = Math.max(24, Array.from(lum).sort((a, b) => a - b)[Math.floor(W * H * 0.66)]);
        return { W, H, land: (i) => lum[i] > thr };
      }
      return { W, H, land: (i) => d[i * 4] < 128 };
    };
    const remote = new Image();
    remote.crossOrigin = "anonymous";
    remote.onload = () => { try { cb(read(remote, false)); } catch (e) { local(); } };
    remote.onerror = local;
    /* perf: this third-party mask (~420 kB) is only used by the footer globe;
       fetching it after the window load event keeps it off the critical path */
    const fetchRemote = () => { remote.src = "https://unpkg.com/three-globe@2.31.1/example/img/earth-water.png"; };
    if (document.readyState === "complete") fetchRemote();
    else window.addEventListener("load", fetchRemote, { once: true });
    function local() {
      const img = new Image();
      img.onload = () => { try { cb(read(img, true)); } catch (e) { /* keep flat map */ } };
      img.src = mapUrl;
    }
  }

  /* fibonacci-sphere land dots, exactly as the reference builds them */
  function buildDots(mask) {
    const GA = Math.PI * (3 - Math.sqrt(5));
    const n = DOT_DENSITY * 3;
    const pos = [], size = [], rnd = [];
    for (let e = 0; e < n; e++) {
      const t = 1 - (e / (n - 1)) * 2;
      const c = Math.sqrt(1 - t * t);
      const l = GA * e;
      let x = Math.cos(l) * c, y = t, z = Math.sin(l) * c;
      x += (Math.random() - 0.5) * 0.008; y += (Math.random() - 0.5) * 0.008; z += (Math.random() - 0.5) * 0.008;
      const m = Math.sqrt(x * x + y * y + z * z); x /= m; y /= m; z /= m;
      const u = 0.5 + Math.atan2(x, z) / (2 * Math.PI);
      const v = 0.5 - Math.asin(y) / Math.PI;
      const px = Math.min(Math.floor(u * mask.W), mask.W - 1);
      const py = Math.min(Math.floor(v * mask.H), mask.H - 1);
      if (px >= 0 && py >= 0 && mask.land(py * mask.W + px)) {
        const r = Math.random();
        pos.push(x, y, z);
        size.push(Math.max(0.1, BASE_SIZE * (1 + (r - 0.5) * SIZE_RANDOM * 2)));
        rnd.push(r);
      }
    }
    return { pos: new Float32Array(pos), size: new Float32Array(size), rnd: new Float32Array(rnd), count: rnd.length };
  }

  /* lat-long sphere for the ocean */
  function buildSphere(seg) {
    const v = [], idx = [];
    for (let y = 0; y <= seg; y++) {
      const th = (y / seg) * Math.PI, st = Math.sin(th), ct = Math.cos(th);
      for (let x = 0; x <= seg; x++) {
        const ph = (x / seg) * 2 * Math.PI;
        v.push(st * Math.sin(ph), ct, st * Math.cos(ph));
      }
    }
    for (let y = 0; y < seg; y++) for (let x = 0; x < seg; x++) {
      const a = y * (seg + 1) + x, b = a + seg + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
    return { v: new Float32Array(v), idx: new Uint16Array(idx) };
  }

  /* ------------------------------------------------------------------ init */
  function init() {
    const texture = document.querySelector(".nx-footer .footer-globe-texture");
    const section = document.getElementById("section-footer");
    if (!texture || !section) return;
    const holder = texture.parentElement;
    loadMask((mask) => { try { start(holder, section, buildDots(mask)); } catch (e) { /* keep flat map */ } });
  }

  function start(holder, section, dots) {
    if (dots.count < 300) return;
    const canvas = document.createElement("canvas");
    canvas.className = "lia-globe3d-canvas";
    canvas.setAttribute("aria-hidden", "true");
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;
    /* the circle holder (160vw, translateY(86%)) clips at the horizon; the canvas
       sits in the section instead, matching the holder's width and bottom edge
       (+HEAD headroom above), so the sky can extend past the limb */
    section.appendChild(canvas);
    holder.classList.add("lia-globe3d-on");

    const oceanP = program(gl, OCEAN_VS, OCEAN_FS);
    const dotsP = program(gl, DOTS_VS, DOTS_FS);
    const skyP = program(gl, SKY_VS, SKY_FS);
    const sph = buildSphere(128); /* dense mesh: a clean round silhouette at this size */
    const buf = (data, target) => { const b = gl.createBuffer(); gl.bindBuffer(target || gl.ARRAY_BUFFER, b); gl.bufferData(target || gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); return b; };
    const bSphere = buf(sph.v), bIdx = buf(sph.idx, gl.ELEMENT_ARRAY_BUFFER);
    const bQuad = buf(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]));
    const bPos = buf(dots.pos), bSize = buf(dots.size), bRnd = buf(dots.rnd);
    const U = (p, n) => gl.getUniformLocation(p, n), A = (p, n) => gl.getAttribLocation(p, n);

    let D = 0, cw = 0, chh = 0, S = 0, headPx = 0;
    function resize() {
      /* D follows the holder's width (160vw), but the planet's top sits 0.14·D above
         the section's bottom: on short windows that ran past the section's top edge,
         which sliced the limb and its glow flat. Cap D so the dome's crest stays at
         most CREST of the section's height, leaving room for the atmosphere above. */
      D = Math.max(1, Math.min(holder.clientWidth || 1, (section.clientHeight * CREST) / 0.14));
      const k = Math.min(window.devicePixelRatio || 1, 1.5);
      cw = Math.min(MAX_W, Math.round(D * k));
      headPx = Math.round(D * HEAD * (cw / D));
      chh = Math.max(1, Math.round(D * BAND * (cw / D)) + headPx);
      S = Math.round(cw * SPHERE_W); /* the square viewport the sphere fills */
      canvas.width = cw; canvas.height = chh;
      /* CSS box: the holder's width, its top edge (section bottom − 0.14·D) minus
         the headroom, down to 0.10·D below the section (clipped, as before) */
      canvas.style.width = D + "px";
      canvas.style.height = (D * (BAND + HEAD)) + "px";
      canvas.style.bottom = (-0.10 * D) + "px";
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(holder);
    ro.observe(section);

    /* ---- interaction state, mirroring the reference loop ---- */
    let dragging = false, last = { x: 0, y: 0 }, B = { x: 0, y: 0 };
    let pe = 0, I = 0, rotY = 0, rotX = 0, appear = 0, scl = 0;

    canvas.addEventListener("pointerdown", (e) => {
      dragging = true; last = { x: e.clientX, y: e.clientY }; B = { x: 0, y: 0 };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      B.x = (e.clientX - last.x) * 0.005; B.y = (e.clientY - last.y) * 0.005;
      pe += B.x; I += B.y;
      last = { x: e.clientX, y: e.clientY };
    });
    const end = () => { dragging = false; };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);

    /* parallax: the planet tilts a little towards the pointer anywhere on the page */
    let parTX = 0, parTY = 0, parX = 0, parY = 0;
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      parTX = (e.clientX / window.innerWidth - 0.5) * 2 * PARALLAX.x;
      parTY = (e.clientY / window.innerHeight - 0.5) * 2 * PARALLAX.y;
    }, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let visible = false, raf = 0;
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }, { rootMargin: "120px 0px" }).observe(section);

    /* perspective + modelview for a camera at +Z looking at the origin */
    const f = 1 / Math.tan(FOV / 2);
    const near = 0.1, far = 10;
    const proj = new Float32Array([f, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, (2 * far * near) / (near - far), 0]);
    const mv = new Float32Array(16), nm = new Float32Array(9);
    const R = new Float32Array(9); /* row-major rotation R = Rx(rotX) * Ry(rotY) */
    function computeMV() {
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
      R[0] = cy;       R[1] = 0;  R[2] = sy;
      R[3] = sx * sy;  R[4] = cx; R[5] = -sx * cy;
      R[6] = -cx * sy; R[7] = sx; R[8] = cx * cy;
      const s = scl * RADIUS;
      /* column-major mat4 = translate(0,0,-CAM_Z) * R * scale(s) */
      mv.set([R[0] * s, R[3] * s, R[6] * s, 0,
              R[1] * s, R[4] * s, R[7] * s, 0,
              R[2] * s, R[5] * s, R[8] * s, 0,
              0, 0, -CAM_Z, 1]);
      nm.set([R[0], R[3], R[6], R[1], R[4], R[7], R[2], R[5], R[8]]);
    }


    /* the assembly animation waits for the circular reveal to start opening */
    const revealCard = document.querySelector(".nx-footer");
    let assembling = false;
    function revealOpen() {
      if (assembling) return true;
      const cp = revealCard && (revealCard.style.clipPath || revealCard.style.webkitClipPath);
      if (!cp) return (assembling = true); // no clip reveal on this layout → start now
      const m = cp.match(/circle\(\s*([\d.]+)px/);
      if (m && parseFloat(m[1]) > 2) assembling = true;
      return assembling;
    }

    function frame(now) {
      raf = 0;
      if (!visible) return;
      const time = now * 0.001;

      /* appear + scale + rotation easing: same constants as the reference */
      if (appear < 1 && revealOpen()) { appear += (1 - appear) * 0.008; if (appear > 0.999) appear = 1; }
      const targetScale = 0.85 + 0.15 * appear;
      scl += (targetScale - scl) * 0.08;
      if (!dragging) {
        pe += (reduced ? 0 : ROT_SPEED) * 0.016 + (1 - appear) * 0.015;
        pe += B.x; I += B.y; B.x *= 0.95; B.y *= 0.95;
      }
      I = Math.max(-0.6, Math.min(0.6, I));
      if (!reduced) { parX += (parTX - parX) * 0.04; parY += (parTY - parY) * 0.04; }
      rotY += (pe + parX - rotY) * 0.1;
      rotX += (I + parY - rotX) * 0.1;
      computeMV();

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      /* sky: additive glow + rings over the whole canvas, before the planet */
      gl.viewport(0, 0, cw, chh);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(skyP);
      /* the sphere's silhouette in canvas pixels: centre of the square viewport,
         radius from the camera geometry (tan(asin(r/d)) * f, in half-viewport units) */
      const rNdc = Math.tan(Math.asin((RADIUS * scl) / CAM_Z)) * f;
      gl.uniform2f(U(skyP, "uCenter"), cw / 2, chh - headPx - S / 2);
      gl.uniform1f(U(skyP, "uRadius"), rNdc * S / 2);
      gl.uniform1f(U(skyP, "uTime"), time);
      gl.uniform1f(U(skyP, "uAppear"), appear);
      gl.uniform3fv(U(skyP, "uGlow"), GLOW);
      const aQ = A(skyP, "aPos");
      gl.bindBuffer(gl.ARRAY_BUFFER, bQuad);
      gl.enableVertexAttribArray(aQ);
      gl.vertexAttribPointer(aQ, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.viewport(Math.round((cw - S) / 2), chh - headPx - S, S, S);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      /* colour blends normally; alpha accumulates (ONE, 1-a) so a translucent dot
         over the opaque sphere keeps the canvas opaque there — with plain
         SRC_ALPHA on alpha too, every dot punched a hole to the black page and
         the land read as grey */
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      /* ocean */
      gl.useProgram(oceanP);
      gl.uniformMatrix4fv(U(oceanP, "uMV"), false, mv);
      gl.uniformMatrix4fv(U(oceanP, "uProj"), false, proj);
      gl.uniformMatrix3fv(U(oceanP, "uNorm"), false, nm);
      gl.uniform1f(U(oceanP, "uTime"), time);
      gl.uniform1f(U(oceanP, "uAppear"), appear);
      gl.uniform3fv(U(oceanP, "uColorHighlight"), OCEAN_HI);
      gl.uniform3fv(U(oceanP, "uColorDark"), OCEAN_DARK);
      gl.uniform3fv(U(oceanP, "uColorLight"), OCEAN_LIGHT);
      const aS = A(oceanP, "aPos");
      gl.bindBuffer(gl.ARRAY_BUFFER, bSphere);
      gl.enableVertexAttribArray(aS);
      gl.vertexAttribPointer(aS, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bIdx);
      gl.depthMask(true);
      gl.drawElements(gl.TRIANGLES, sph.idx.length, gl.UNSIGNED_SHORT, 0);

      /* dots */
      gl.useProgram(dotsP);
      gl.uniformMatrix4fv(U(dotsP, "uMV"), false, mv);
      gl.uniformMatrix4fv(U(dotsP, "uProj"), false, proj);
      gl.uniform1f(U(dotsP, "uTime"), time);
      gl.uniform1f(U(dotsP, "uAppear"), appear);
      gl.uniform3fv(U(dotsP, "uColor"), DOT_COLOR);
      gl.uniform3fv(U(dotsP, "uHoverColor"), HOVER_COLOR);
      gl.uniform1f(U(dotsP, "uOpacity"), 0.9);
      gl.uniform3fv(U(dotsP, "uHoverPos"), [0, 0, 0]);
      gl.uniform1f(U(dotsP, "uHoverActive"), 0); /* hover lens disabled */
      gl.uniform1f(U(dotsP, "uHoverRadius"), LENS.radius);
      gl.uniform1f(U(dotsP, "uLensMag"), LENS.mag);
      gl.uniform1f(U(dotsP, "uLensBulge"), LENS.bulge);
      gl.uniform1f(U(dotsP, "uLensScale"), LENS.scale);
      /* the reference's gl_PointSize = size*(2/-z) was tuned for ~800px canvases;
         scale it with the sphere's viewport so the dots keep the same relative weight */
      gl.uniform1f(U(dotsP, "uPx"), 2 * (S / 800));
      const aP = A(dotsP, "aPos"), aSz = A(dotsP, "aSize"), aR = A(dotsP, "aRandom");
      gl.bindBuffer(gl.ARRAY_BUFFER, bPos);
      gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bSize);
      gl.enableVertexAttribArray(aSz); gl.vertexAttribPointer(aSz, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bRnd);
      gl.enableVertexAttribArray(aR); gl.vertexAttribPointer(aR, 1, gl.FLOAT, false, 0, 0);
      gl.depthMask(false);
      gl.drawArrays(gl.POINTS, 0, dots.count);
      gl.depthMask(true);

      raf = requestAnimationFrame(frame);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
