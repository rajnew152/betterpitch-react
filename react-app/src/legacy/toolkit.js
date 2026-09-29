/* =============================================================================
   toolkit.js — the "Toolkit" card deck (port of the toolkit section of
   guillaumezhu.com). Every card sits on the rim of a huge invisible wheel; the
   pinned scroll progress deals the front-end cards out one by one along the
   rim, gathers them back into a stack, flips the top card (Shopify to Figma)
   while the subtitle changes, then deals the art-direction deck the same way.
   The art deck ends on a "Transition" card: the deck gathers behind it, a wavy
   cream front rises inside it, then it grows until it covers the whole stage.
   Cards are clickable once dealt: a bounce ripples out from the clicked card.
   Thresholds are the ones of the reference.
   ============================================================================= */
(function () {
  "use strict";
  const STEP = 3.5;                    // degrees between two cards on the rim
  const POP_FROM = 0.94;               // scale a card is dealt in from
  const POP_EASE = "elastic.out(0.6, 0.3)";
  const POP_DUR = 0.5;
  const FRONT_DEAL_END = 0.3;          // front-end deck dealt out
  const FRONT_STACK_END = 0.35;        // gathered back into a stack
  const FLIP_END = 0.45;               // Shopify card flipped to Figma
  const ART_DEAL_END = 0.75;           // art-direction deck dealt out
  const ART_STACK_END = 0.8;           // gathered behind the transition card
  const CREAM_END = 0.95;              // transition card filled with cream
  const GROW_EASE = "power3.in";       // then it grows over the stage until 1
  const CREAM = "#f5e7df";             // fallback for --gz-cream

  /* ---- cream fill of the transition card: 2D port of the reference shader, a
     front rising from the bottom that wobbles with value noise mid-way ---- */
  function creamReveal(canvas, reduced) {
    const ctx = canvas && canvas.getContext && canvas.getContext("2d");
    if (!ctx) return { setProgress() {}, resize() {}, onDraw() {} };
    const fract = (v) => v - Math.floor(v);
    function hash(x, y, z) {
      x = fract(x * 0.3183099 + 0.1) * 17;
      y = fract(y * 0.3183099 + 0.1) * 17;
      z = fract(z * 0.3183099 + 0.1) * 17;
      return fract(x * y * z * (x + y + z));
    }
    function noise(x, y) {
      const ix = Math.floor(x), iy = Math.floor(y);
      let fx = x - ix, fy = y - iy;
      fx = fx * fx * (3 - 2 * fx);
      fy = fy * fy * (3 - 2 * fy);
      const bottom = hash(ix, iy, 0) + (hash(ix + 1, iy, 0) - hash(ix, iy, 0)) * fx;
      const top = hash(ix, iy + 1, 0) + (hash(ix + 1, iy + 1, 0) - hash(ix, iy + 1, 0)) * fx;
      return bottom + (top - bottom) * fy;
    }
    /* --tk-cover (css/palette.css) is the cover colour; the reference cream otherwise */
    /* the cover colour depends on the day / night theme, so it is re-read on toggle */
    const readColor = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      return rootStyle.getPropertyValue("--tk-cover").trim() || rootStyle.getPropertyValue("--gz-cream").trim() || CREAM;
    };
    let color = readColor();
    window.addEventListener("lia:themechange", () => { color = readColor(); draw(now()); });
    const t0 = performance.now();
    const now = () => (performance.now() - t0) / 1000;
    let progress = 0, raf = null, w = 1, h = 1;
    /* onDraw(front): told the cream's outline after every frame: "none", "full", or
       the wavy front as [u 0..1 across, v 0..1 down] points (the ROI layer follows it) */
    let hook = null;

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      if (progress <= 0) { if (hook) hook("none"); return; }
      ctx.fillStyle = color;
      if (progress >= 1) { ctx.fillRect(0, 0, w, h); if (hook) hook("full"); return; }
      const front = -0.08 + 1.16 * progress;             // mix(-0.08, 1.08, p)
      const wobble = Math.sin(progress * Math.PI) * 0.15; // noise envelope * strength
      const steps = 48;
      const pts = [];
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const n = noise(u * 2 - time * 0.45, time * 0.35) - 0.5;
        const v = 1 - (front + n * wobble);
        ctx.lineTo(u * w, h * v);
        pts.push([u, v]);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
      if (hook) hook(pts);
    }
    function loop() { draw(now()); raf = requestAnimationFrame(loop); }
    function stop() { if (raf !== null) cancelAnimationFrame(raf); raf = null; }
    function setProgress(p) {
      p = gsap.utils.clamp(0, 1, p);
      if (p === progress) return;
      progress = p;
      if (!reduced && p > 0 && p < 1) { if (raf === null) raf = requestAnimationFrame(loop); return; }
      stop();
      draw(now());
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(canvas.clientWidth, 1);
      h = Math.max(canvas.clientHeight, 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(now());
    }
    resize();
    return { setProgress, resize, onDraw(fn) { hook = fn; } };
  }

  function init() {
    const root = document.getElementById("section-toolkit");
    if (!root || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const pinHeight = root.querySelector(".tk__pin-height");
    const container = root.querySelector(".tk__container");
    const frontWheel = root.querySelector(".tk__wheel--frontend");
    const frontSlots = Array.from(root.querySelectorAll(".tk__wheel--frontend .tk__slot"));
    const artWheel = root.querySelector(".tk__wheel--art");
    const artSlots = Array.from(root.querySelectorAll(".tk__wheel--art .tk__slot"));
    const flipSlot = root.querySelector(".tk__slot--transition");
    const flipper = flipSlot && flipSlot.querySelector(".tk-card__flipper");
    const subFront = root.querySelector(".tk__subtitle--front");
    const subArt = root.querySelector(".tk__subtitle--art");
    const header = root.querySelector(".tk__header");
    const subWrap = root.querySelector(".tk__subtitle-wrap");
    const creamCard = root.querySelector(".tk-card--transition");
    const creamSlot = creamCard && creamCard.closest(".tk__slot");
    if (!pinHeight || !container || !artWheel || !artSlots.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* without the front-end deck (removed by tools/brand-content.js) the stage opens
       straight on the art-direction deck: the pin progress is mapped onto the art phases */
    const artOnly = !frontWheel || !frontSlots.length;

    const norm = (v, a, b) => gsap.utils.clamp(0, 1, (v - a) / (b - a));
    const TOP_Z = frontSlots.length + artSlots.length + 10;
    let stacked = false;
    let ripple = null, rippleSlot = null, rippleZ = 0;
    const cream = creamReveal(creamCard && creamCard.querySelector(".tk-card__cream"), reduced);
    let grown = false;

    /* ---- keep the cards clear of the subtitle: on short or narrow viewports the
       stylesheet position lets them overlap, so the deck moves down and, if it
       still does not fit, the cards shrink until it does ---- */
    function fit() {
      root.style.removeProperty("--tk-wheel-top");
      root.style.removeProperty("--tk-card-w");
      const probe = artSlots[0].querySelector(".tk-card");
      if (!header || !subWrap || !probe) return;
      const stageH = container.clientHeight;
      const h = probe.offsetHeight;
      const center = artWheel.offsetTop;
      const fontSize = parseFloat(getComputedStyle(subWrap).fontSize) || 20;
      const textBottom = header.offsetTop + subWrap.offsetTop + fontSize * 1.3;
      const gap = Math.max(20, stageH * 0.03);
      const lift = (hh) => Math.max(hh * 0.06, 24 + hh * 0.035); // hover lift / click bounce
      if (center - h / 2 - lift(h) >= textBottom + gap) return;
      const bottom = stageH - Math.max(16, stageH * 0.03);
      const newH = Math.max(80, Math.min(h, (bottom - textBottom - gap - 24) / 1.06));
      const minCenter = textBottom + gap + lift(newH) + newH / 2;
      const newCenter = Math.min(Math.max(center, minCenter), Math.max(minCenter, bottom - newH / 2));
      if (newH < h) root.style.setProperty("--tk-card-w", (newH * 295 / 417).toFixed(2) + "px");
      root.style.setProperty("--tk-wheel-top", newCenter.toFixed(2) + "px");
    }

    /* ---- scale at which the transition card covers the whole stage ---- */
    let coverKey = "", coverS = 8;
    function coverScale() {
      const key = window.innerWidth + "x" + window.innerHeight;
      if (key === coverKey) return coverS;
      const r = creamCard.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const needW = Math.max(cx, window.innerWidth - cx) * 2;
      const needH = Math.max(cy, window.innerHeight - cy) * 2;
      coverS = Math.max(needW / Math.max(creamCard.offsetWidth, 1), needH / Math.max(creamCard.offsetHeight, 1)) * 1.1;
      coverKey = key;
      return coverS;
    }

    function fan(slots, wheel) {
      slots.forEach((s, i) => { s.classList.add("is-visible"); gsap.set(s, { rotation: i * STEP, zIndex: i + 1, scale: 1 }); });
      gsap.set(wheel, { rotation: -((slots.length - 1) * STEP) / 2, autoAlpha: 1, pointerEvents: "auto" });
      wheel.classList.add("is-interactive");
    }
    function resetFront() {
      if (artOnly) return;
      frontSlots.forEach((s, i) => { s.classList.toggle("is-visible", i === 0); gsap.set(s, { rotation: i * STEP, zIndex: i + 1, scale: 1 }); });
      frontWheel.classList.add("is-interactive");
      gsap.set(frontWheel, { rotation: 0, autoAlpha: 1, pointerEvents: "auto" });
    }
    function resetArt() {
      artSlots.forEach((s, i) => { s.classList.toggle("is-visible", i === 0); gsap.set(s, { rotation: i * STEP, zIndex: i + 1, scale: 1 }); });
      artWheel.classList.remove("is-interactive");
      gsap.set(artWheel, { rotation: 0, autoAlpha: 0, pointerEvents: "none" });
      if (creamCard) gsap.set(creamCard, { clearProps: "transform,transition" });
      grown = false;
      cream.setProgress(0);
    }
    function resetFlip() {
      if (flipper) gsap.set(flipper, { rotationY: 0 });
      if (subFront) gsap.set(subFront, { autoAlpha: 1 });
      if (subArt) gsap.set(subArt, { autoAlpha: 0 });
    }

    /* ---- click ripple: the clicked card bounces, its neighbours follow weaker and later ---- */
    function bounce(targets, strength) {
      const tl = gsap.timeline();
      tl.to(targets, { y: 6 * strength, scale: 1 - 0.03 * strength, duration: 0.08, ease: "power2.in" });
      tl.to(targets, { y: -24 * strength, scale: 1 + 0.07 * strength, duration: 0.18, ease: "power3.out" });
      tl.to(targets, { y: 0, scale: 1, duration: 0.42, ease: "elastic.out(0.8, 0.35)" });
      return tl;
    }
    function rippleFrom(slots, index) {
      if (!slots[index].classList.contains("is-visible")) return null;
      const tl = gsap.timeline({ paused: true });
      slots.forEach((s, i) => {
        if (!s.classList.contains("is-visible")) return;
        const d = Math.abs(i - index);
        tl.add(bounce(s.querySelectorAll(".tk-card__motion"), Math.max(0.25, 1 - d * 0.18)), d * 0.045);
      });
      return tl;
    }
    function releaseRipple() {
      if (!rippleSlot) return;
      const hovered = window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches && rippleSlot.matches(":hover");
      gsap.set(rippleSlot, { zIndex: hovered ? TOP_Z : rippleZ });
      rippleSlot = null; rippleZ = 0;
    }
    function killRipple() {
      if (ripple) ripple.kill();
      releaseRipple();
      const motions = root.querySelectorAll(".tk-card__motion");
      gsap.killTweensOf(motions, "y,scale");
      gsap.set(motions, { y: 0, scale: 1 });
      ripple = null;
    }
    function wireInteractions(slots) {
      slots.forEach((slot, i) => {
        const card = slot.querySelector(".tk-card");
        if (!card) return;
        card.addEventListener("pointerenter", (e) => { if (e.pointerType !== "touch") gsap.set(slot, { zIndex: TOP_Z }); });
        card.addEventListener("pointerleave", (e) => { if (e.pointerType !== "touch" && slot !== rippleSlot) gsap.set(slot, { zIndex: i + 1 }); });
        card.addEventListener("click", () => {
          killRipple();
          const tl = rippleFrom(slots, i);
          if (!tl) return;
          ripple = tl; rippleSlot = slot; rippleZ = i + 1;
          gsap.set(slot, { zIndex: TOP_Z });
          tl.eventCallback("onComplete", () => { if (ripple === tl) { releaseRipple(); ripple = null; } });
          tl.play();
        });
      });
    }

    fit();
    resetFront(); resetArt(); resetFlip();
    wireInteractions(frontSlots); wireInteractions(artSlots);

    /* the manifesto ("Now see what every call is worth.") lives on the cover: it
       opens inside the transition card, then the pin holds on for as long as the
       sentence needs to slide across the stage (css/manifesto.css .tk__cover) */
    const cover = container.querySelector(".tk__cover");
    const coverText = cover && cover.querySelector(".mf__text");
    const coverBg = container.querySelector(".tk__cover-bg");

    if (reduced) {
      /* no cover animation: the manifesto becomes its own static section */
      if (cover) {
        const sec = document.createElement("section");
        sec.id = "section-manifesto";
        sec.className = "mf";
        sec.setAttribute("aria-label", "Manifesto");
        cover.classList.remove("tk__cover");
        sec.appendChild(cover);
        root.after(sec);
      }
      pinHeight.style.height = "100vh";
      if (artOnly) { gsap.set(frontWheel, { autoAlpha: 0 }); fan(artSlots, artWheel); if (subArt) gsap.set(subArt, { autoAlpha: 1 }); }
      else fan(frontSlots, frontWheel);
      window.addEventListener("resize", fit);
      return;
    }

    /* deal cards out one by one (count grows with progress) or take them back */
    function deal(slots, wheel, count, state) {
      if (count !== state.count) {
        if (count > state.count) {
          for (let i = state.count + 1; i <= count; i++) {
            slots[i].classList.add("is-visible");
            gsap.fromTo(slots[i], { scale: POP_FROM }, { scale: 1, ease: POP_EASE, duration: POP_DUR });
          }
        } else {
          for (let i = state.count; i > count; i--) slots[i].classList.remove("is-visible");
        }
        state.count = count;
      }
      if (count !== state.rot) {
        gsap.to(wheel, { rotation: -(count * STEP) / 2, ease: POP_EASE, duration: POP_DUR, overwrite: true });
        state.rot = count;
      }
    }
    /* gather the dealt cards back into a single stack (t: 0 fanned, 1 stacked) */
    function gather(slots, wheel, t) {
      gsap.killTweensOf(wheel);
      slots.forEach((s, i) => gsap.set(s, { rotation: i * STEP * (1 - t) }));
      gsap.set(wheel, { rotation: -((slots.length - 1) * STEP) / 2 * (1 - t) });
    }

    const front = { count: 0, rot: 0 }, art = { count: 0, rot: 0 };

    /* art deck only: deal over the first ART_ONLY_DEAL of the pin, hold the full fan
       open until ART_ONLY_HOLD (so it can be seen and clicked), then gather / fill / grow */
    const ART_ONLY_DEAL = 0.42, ART_ONLY_HOLD = 0.58;
    const FAN_OPEN = ART_DEAL_END - 0.001;
    function artMap(p) {
      if (p < ART_ONLY_DEAL) return FLIP_END + (p / ART_ONLY_DEAL) * (FAN_OPEN - FLIP_END);
      if (p < ART_ONLY_HOLD) return FAN_OPEN;
      return ART_DEAL_END + ((p - ART_ONLY_HOLD) / (1 - ART_ONLY_HOLD)) * (1 - ART_DEAL_END);
    }
    let artGathered = false;

    function update(p) {
      if (ripple) killRipple();
      if (artOnly) p = artMap(p);

      const artPhase = p >= FLIP_END;
      const artInteractive = artPhase && p < ART_STACK_END;
      gsap.set(artWheel, { autoAlpha: artPhase ? 1 : 0, pointerEvents: artInteractive ? "auto" : "none" });
      artWheel.classList.toggle("is-interactive", artInteractive);
      if (!artOnly) {
        gsap.set(frontWheel, { autoAlpha: artPhase ? 0 : 1, pointerEvents: artPhase ? "none" : "auto" });
        frontWheel.classList.toggle("is-interactive", !artPhase);
      }

      if (!artOnly) {
        /* 1. deal the front-end deck */
        const dealt = Math.min(Math.floor(Math.min(p / FRONT_DEAL_END, 1) * frontSlots.length), frontSlots.length - 1);
        deal(frontSlots, frontWheel, dealt, front);
        if (p < FRONT_DEAL_END) {
          if (stacked) {
            frontSlots.forEach((s, i) => s.classList.toggle("is-visible", i <= front.count));
            stacked = false;
          }
          return;
        }

        /* 2. gather it into a stack, leaving only the flip card */
        gather(frontSlots, frontWheel, norm(p, FRONT_DEAL_END, FRONT_STACK_END));
        if (p >= FRONT_STACK_END && !stacked) {
          frontSlots.forEach((s) => { if (s !== flipSlot) s.classList.remove("is-visible"); });
          if (flipSlot) flipSlot.classList.add("is-visible");
          stacked = true;
        }
        if (p < FRONT_STACK_END && stacked) {
          frontSlots.forEach((s, i) => s.classList.toggle("is-visible", i <= front.count));
          stacked = false;
        }
      }

      /* 3. flip Shopify to Figma while the subtitle swaps */
      const flip = norm(p, FRONT_STACK_END, FLIP_END);
      if (flipper) gsap.set(flipper, { rotationY: 180 * flip });
      if (subFront) gsap.set(subFront, { autoAlpha: 1 - norm(flip, 0, 0.5) });
      if (subArt) gsap.set(subArt, { autoAlpha: norm(flip, 0.5, 1) });

      /* scrolled back out of the gather: re-open the fan (slot angles, the wheel's
         turn, the transition card back to its own place in the stack) */
      if (p < ART_DEAL_END && artGathered) {
        artSlots.forEach((s, i) => gsap.set(s, { rotation: i * STEP }));
        if (creamSlot) gsap.set(creamSlot, { zIndex: artSlots.indexOf(creamSlot) + 1 });
        art.rot = -1; // makes deal() turn the wheel back to the fan's centre
        artGathered = false;
      }

      /* 4. deal the art-direction deck (the transition card comes last) */
      const artDealt = Math.min(Math.floor(norm(p, FLIP_END, ART_DEAL_END) * artSlots.length), artSlots.length - 1);
      deal(artSlots, artWheel, artDealt, art);

      /* 5. gather the art deck behind the transition card */
      if (p >= ART_DEAL_END) {
        gather(artSlots, artWheel, norm(p, ART_DEAL_END, ART_STACK_END));
        if (creamSlot) gsap.set(creamSlot, { zIndex: artSlots.length + 20 });
        artGathered = true;
      }
      if (!creamCard) return;

      /* 6. the cream front rises inside the transition card */
      cream.setProgress(norm(p, ART_STACK_END, CREAM_END));

      /* 7. the manifesto section comes out of the card: the cover layer takes the
         card's place (same rounded outline, same colour) and opens into a window that
         grows until it fills the stage (openWindow() below). The card itself stays
         put underneath; the layer hides it while shown */
      if (grown) { gsap.set(creamCard, { clearProps: "opacity,transition" }); grown = false; }
    }

    ScrollTrigger.addEventListener("refreshInit", () => { fit(); coverKey = ""; });
    ScrollTrigger.addEventListener("refresh", () => cream.resize());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    /* ---- the manifesto cover layer ------------------------------------------ */
    /* the sentence: split into letters, each with its own random entry offset and
       tilt that springs out (elastic) as the letter travels in from the right edge
       (same feel as js/manifesto.js, driven by this pin instead of its own) */
    const SLIDE_RATIO = 0.65;   // px of scroll per px of slide, as js/manifesto.js
    const OPEN_AT = 0.58;       // share of the stage the sentence has already travelled when the window is fully open (it flies in while the section comes out of the card)
    const EDGE = 0.14;          // share of the slide spent blending the stage out
    const elastic = gsap.parseEase("elastic.out(1.2, 1)");
    let letters = [], centers = [], lefts = [], ramp = null, stageIn = null, stageOut = null;
    if (coverText && !coverText.dataset.split) {
      coverText.setAttribute("aria-label", coverText.textContent.trim());
      coverText.innerHTML = coverText.textContent.trim().split("").map((ch) =>
        ch === " " ? '<span aria-hidden="true">&nbsp;</span>' : `<span class="letter" aria-hidden="true">${ch}</span>`
      ).join("");
      coverText.dataset.split = "1";
    }
    if (coverText) {
      letters = Array.from(coverText.querySelectorAll(".letter")).map((el) => ({
        el, y: (Math.random() - 0.5) * 400, r: (Math.random() - 0.5) * 60, t: -1, color: null,
      }));
    }
    const overflow = () => (coverText ? coverText.scrollWidth - cover.clientWidth : 0);
    const slideStart = () => -OPEN_AT * cover.clientWidth;
    const holdPx = () => (cover ? Math.max((overflow() + slideStart()) * SLIDE_RATIO, 1) : 0);
    function buildPalette() {
      if (!cover) return;
      const cs = getComputedStyle(cover), v = (n) => cs.getPropertyValue(n).trim();
      const ink = v("--mf-ink") || "#f5e7df";
      const c4 = v("--mf-c4") || "#8b5cf6";
      const STOPS = [
        [0.0, v("--mf-c1") || "#ff6a3d"], [0.2, v("--mf-c2") || "#f73679"], [0.4, v("--mf-c3") || "#e232db"], [0.58, c4],
        [0.74, gsap.utils.interpolate(c4, ink, 0.45)], [0.88, ink], [1.0, ink],
      ];
      const mixers = STOPS.slice(1).map(([p, col], i) => [STOPS[i][0], p, gsap.utils.interpolate(STOPS[i][1], col)]);
      ramp = (p) => {
        if (p <= 0) return STOPS[0][1];
        if (p >= 1) return STOPS[STOPS.length - 1][1];
        const [a, b, mix] = mixers.find(([, bb]) => p <= bb);
        return mix((p - a) / (b - a));
      };
      /* the stage starts on the card colour (--mf-above = --tk-cover) and deepens as it opens */
      stageIn = gsap.utils.interpolate(v("--mf-above"), v("--mf-mid"));
      stageOut = gsap.utils.interpolate(v("--mf-mid"), v("--mf-below"));
      letters.forEach((l) => { l.color = null; });
    }
    function measureCover() {
      centers = letters.map((l) => l.el.offsetLeft + l.el.offsetWidth / 2);
      lefts = letters.map((l) => l.el.offsetLeft);
    }
    const smooth = (t) => { t = gsap.utils.clamp(0, 1, t); return t * t * (3 - 2 * t); };
    /* s: 0..1 slide progress; open: 0..1 how far the card has opened */
    /* pre: 0..1 while the window opens — the first letters fly in as the section
       comes out of the card, reaching slideStart() exactly when it fills the stage */
    function paintCover(s, open, solid, pre) {
      if (!coverText) return;
      const w = cover.clientWidth;
      const x = s <= 0 && pre !== undefined ? slideStart() * pre : slideStart() + (-overflow() - slideStart()) * s;
      coverText.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      letters.forEach((l, i) => {
        const c = ramp((centers[i] + x) / w);
        if (l.color !== c) { l.el.style.color = c; l.color = c; }
        const t = gsap.utils.clamp(0, 1, (w - (lefts[i] + x)) / w);
        if (Math.abs(t - l.t) < 0.0005) return;
        l.t = t;
        const k = 1 - elastic(t);
        l.el.style.transform = t >= 1 ? "" : `translate3d(0,${(l.y * k).toFixed(2)}%,0) rotate(${(l.r * k).toFixed(2)}deg)`;
      });
      const outT = smooth((s - (1 - EDGE)) / EDGE);
      cover.style.setProperty("--mf-stage", outT > 0 ? stageOut(outT) : solid ? stageIn(1) : stageIn(open));
      /* the glow waits until the card is mostly open: while the card is small its
         sides would cut the glow in straight lines */
      cover.style.setProperty("--mf-glow", (smooth((open - 0.55) / 0.45) * (1 - outT)).toFixed(3));
      cover.style.setProperty("--mf-drift", s.toFixed(4));
    }

    let coverShown = false;
    function showCover(on) {
      if (!cover || on === coverShown) return;
      cover.classList.toggle("is-on", on);
      /* the card-shaped backdrop is not used: only the sentence comes onto the stage */
      if (coverBg) coverBg.classList.remove("is-on");
      coverShown = on;
    }

    /* the pin runs the deck, then holds on while the sentence slides */
    const baseHeight = () => { pinHeight.style.height = ""; return pinHeight.offsetHeight; };
    function sizePin() { if (cover) pinHeight.style.height = `${baseHeight() + holdPx()}px`; }
    if (cover) {
      buildPalette();
      sizePin();
      measureCover();
      ScrollTrigger.addEventListener("refreshInit", sizePin);
      ScrollTrigger.addEventListener("refresh", () => { measureCover(); letters.forEach((l) => { l.t = -1; }); });
      window.addEventListener("lia:themechange", () => { buildPalette(); ScrollTrigger.update(); });
    }
    /* the cream's latest outline (from the canvas), redrawn every frame while it wobbles */
    let creamPhase = false, creamFront = "none";
    if (cover) cream.onDraw((front) => { creamFront = front; if (creamPhase) creamClip(); });

    /* the card-to-stage window's state (openWindow() below): declared before the
       ScrollTrigger, whose creation already calls progress() */
    const WIN_EASE = gsap.parseEase("power2.inOut");
    const WIN_FOLLOW = 0.11;                 // s — how closely the window trails the scroll
    let winTarget = 0, winShown = 0, winRaf = 0, winLast = 0, slideS = 0;

    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      pinSpacing: false,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => progress(self),
      onRefresh: (self) => progress(self),
    });
    /* the deck uses the pin minus the hold; the hold belongs to the sentence */
    function progress(self) {
      if (!cover) { update(self.progress); return; }
      const hold = holdPx();
      const range = Math.max(self.end - self.start - hold, 1);
      const y = self.scroll() - self.start;
      const p = gsap.utils.clamp(0, 1, y / range);
      update(p);
      creamPhase = false;
      if (y >= range) { slideS = gsap.utils.clamp(0, 1, (y - range) / hold); openWindow(1); }
      else if (p >= CREAM_END) { slideS = 0; openWindow(norm(p, CREAM_END, 1)); }
      /* the cover colour rises inside the card as before; the window waits for it */
      else { slideS = 0; openWindow(0); }
    }

    /* ---- the manifesto opens with the transition card. While the cover colour
       rises inside the card, the layer is clipped to its wavy front (so it carries
       the stage in); while the card then grows over the stage, the layer is
       clipped to the card's rounded outline and scaled with it (contain-fit
       around the card's centre), reaching full screen together ---- */
    function coverGeometry() {
      const r = creamCard.getBoundingClientRect(), s = container.getBoundingClientRect();
      const f = Math.min(1, r.width / s.width, r.height / s.height);
      const ox = r.left + r.width / 2 - s.left, oy = r.top + r.height / 2 - s.top;
      /* the clip lives in the layer's own (unscaled) coordinates: map on-screen
         points back through the scale about (ox, oy) */
      const lx = (x) => ox + (x - s.left - ox) / f, ly = (yy) => oy + (yy - s.top - oy) / f;
      cover.style.transformOrigin = `${ox}px ${oy}px`;
      cover.style.transform = `scale(${f.toFixed(4)})`;
      return { r, s, f, lx, ly };
    }
    /* ---- the window: the manifesto section comes out of the transition card and
       fills the stage. At 0 the layer is the card: clipped to the card's rounded
       outline, on the card's own solid colour, its content a contain-fit miniature
       of the full stage about the card's centre. Towards 1 the outline grows to the
       stage's edges, the corners square off and the content scales up to full size,
       all on one ease. The shown value follows the scroll through a short easing, so
       wheel steps glide; scrolling back shrinks it into the card again. ---- */
    function openWindow(g) {
      winTarget = gsap.utils.clamp(0, 1, g);
      /* a jump (reload, section-nav link) lands straight on the new state */
      if (Math.abs(winTarget - winShown) > 0.5) winShown = winTarget;
      if (!winRaf) { winLast = 0; winRaf = requestAnimationFrame(winTick); }
      applyWindow();
    }
    function winTick(now) {
      winRaf = 0;
      const dt = winLast ? Math.min(0.05, (now - winLast) / 1000) : 1 / 60;
      winLast = now;
      winShown += (winTarget - winShown) * (1 - Math.exp(-dt / WIN_FOLLOW));
      if (Math.abs(winTarget - winShown) < 0.0004) winShown = winTarget;
      applyWindow();
      if (winShown !== winTarget) winRaf = requestAnimationFrame(winTick);
    }
    function applyWindow() {
      if (coverBg) { coverBg.style.clipPath = ""; coverBg.classList.remove("is-on"); }
      /* nothing opened yet: the card is the card */
      if (winShown <= 0 && winTarget <= 0) {
        showCover(false);
        cover.style.clipPath = cover.style.transform = cover.style.transformOrigin = "";
        creamCard.style.visibility = "";
        return;
      }
      showCover(true);
      creamCard.style.visibility = "hidden";
      const e = WIN_EASE(winShown);
      const sw = container.clientWidth, sh = container.clientHeight;
      if (e >= 1) {
        cover.style.clipPath = cover.style.transform = cover.style.transformOrigin = "";
      } else {
        const sr = container.getBoundingClientRect(), r = creamCard.getBoundingClientRect();
        const L0 = r.left - sr.left, T0 = r.top - sr.top, R0 = L0 + r.width, B0 = T0 + r.height;
        /* the window's outline, on screen (stage coordinates) */
        const L = L0 * (1 - e), T = T0 * (1 - e), Rr = R0 + (sw - R0) * e, B = B0 + (sh - B0) * e;
        const rx = r.width * 0.068 * (1 - e), ry = r.height * 0.048 * (1 - e);
        /* the content: a miniature of the full stage, scaled about the card's centre
           just enough to cover the card on every side (the card sits off the stage's
           centre, so the nearest stage edge decides), growing to 1. The window and
           the layer's edges both move linearly to the stage's edges, so the layer
           covers the window for the whole grow */
        const ox = L0 + r.width / 2, oy = T0 + r.height / 2;
        const f0 = Math.min(1, Math.max(
          (r.width / 2) / Math.max(1, Math.min(ox, sw - ox)),
          (r.height / 2) / Math.max(1, Math.min(oy, sh - oy))));
        const sc = f0 + (1 - f0) * e;
        /* the clip lives in the layer's own (unscaled) coordinates */
        const ux = (x) => ox + (x - ox) / sc, uy = (y) => oy + (y - oy) / sc;
        cover.style.transformOrigin = `${ox.toFixed(1)}px ${oy.toFixed(1)}px`;
        cover.style.transform = `scale(${sc.toFixed(5)})`;
        const pos = (v) => Math.max(0, v).toFixed(2);
        cover.style.clipPath = `inset(${pos(uy(T))}px ${pos(sw - ux(Rr))}px ${pos(sh - uy(B))}px ${pos(ux(L))}px round ${(rx / sc).toFixed(2)}px / ${(ry / sc).toFixed(2)}px)`;
      }
      /* the stage inside the window is solid from the first frame (the card's colour,
         --tk-cover = --mf-mid), so the hand-off from the card is seamless */
      /* the words fly in early in the grow (ease-out), so they read in the window */
      paintCover(slideS, winShown, true, 1 - (1 - e) * (1 - e));
    }

    function creamClip() {
      creamCard.style.visibility = "";
      if (creamFront === "none") { showCover(false); return; }
      showCover(true);
      const { r, s, lx, ly } = coverGeometry();
      const rx = r.width * 0.068, ry = r.height * 0.048;
      /* the card's rounded outline: how far below its top edge the outline starts at x */
      const edgeTop = (x) => {
        const d = x < r.left + rx ? r.left + rx - x : x > r.right - rx ? x - (r.right - rx) : 0;
        return d ? ry - ry * Math.sqrt(Math.max(0, 1 - (d / rx) ** 2)) : 0;
      };
      const pts = [];
      const wave = creamFront === "full" ? Array.from({ length: 49 }, (_, i) => [i / 48, 0]) : creamFront;
      for (const [u, v] of wave) {
        const x = r.left + u * r.width;
        pts.push([x, r.top + Math.max(v * r.height, edgeTop(x))]);
      }
      /* the bottom corners of the card, right then left */
      for (let k = 0; k <= 6; k++) {
        const a = (Math.PI / 2) * (k / 6);
        pts.push([r.right - rx + rx * Math.cos(a), r.bottom - ry + ry * Math.sin(a)]);
      }
      for (let k = 0; k <= 6; k++) {
        const a = Math.PI / 2 + (Math.PI / 2) * (k / 6);
        pts.push([r.left + rx + rx * Math.cos(a), r.bottom - ry + ry * Math.sin(a)]);
      }
      cover.style.clipPath = "polygon(" + pts.map(([x, y]) => `${lx(x).toFixed(1)}px ${ly(y).toFixed(1)}px`).join(",") + ")";
      if (coverBg) coverBg.style.clipPath = "polygon(" + pts.map(([x, y]) => `${(x - s.left).toFixed(1)}px ${(y - s.top).toFixed(1)}px`).join(",") + ")";
    }
  }

  window.LiaToolkit = { init };
})();
