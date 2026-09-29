/* =============================================================================
   journey.js — the "Today / I bridge / the two." pinned sentence sequence
   (port of the trajectory section of guillaumezhu.com). One sentence at a time
   slides through the centre of a pinned stage while two slices of a gradient
   image enter from the sides, meet in the middle and finally grow to fill the
   viewport. When the Toolkit section scrolls in, the stage stays full-bleed (no
   shrink into a rounded strip) so no dark band shows around its edges.
   ============================================================================= */
(function () {
  "use strict";
  const CREAM = "#f5e7df", DARK = "#1f1d1d", BLACK = "#000000";
  /* scroll-scrubbed strengths read by js/journey-fluid.js */
  const fluid = { idle: 0, interaction: 0, zoom: 1 };

  function splitLetters(el) {
    if (el.dataset.split) return;
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = el.textContent.trim().split("").map((ch) =>
      ch === " " ? "<span>&nbsp;</span>" : `<span class="letter" aria-hidden="true">${ch}</span>`
    ).join("");
    el.dataset.split = "1";
  }

  function init() {
    const root = document.getElementById("section-journey");
    if (!root || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const pinHeight = root.querySelector(".traj__pin-height");
    const container = root.querySelector(".traj__container");
    const center = root.querySelector(".traj__center");
    const sentences = Array.from(root.querySelectorAll(".traj__sentence"));
    const left = root.querySelector(".traj__visual--left");
    const right = root.querySelector(".traj__visual--right");
    if (!pinHeight || !container || !sentences.length || !left || !right) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* the team cards (js/team.js) extend the pin height by their own height; the
       sentence timeline keeps the length the stylesheet gives the pin height */
    const team = root.querySelector(".traj__team");
    const sentenceEnd = () => "+=" + (pinHeight.offsetHeight - (team ? team.offsetHeight : 0) - window.innerHeight);

    sentences.forEach(splitLetters);

    /* gradient words (css/journey-toolkit.css): give every letter the word width
       and its own offset so the letters together show one continuous gradient.
       offsetLeft ignores transforms, so the scroll animation never skews it. */
    const gradWords = sentences.filter((s) => s.classList.contains("is-today") || s.classList.contains("is-dialogue"));
    const sizeGradient = () => gradWords.forEach((s) => {
      const letters = Array.from(s.querySelectorAll(".letter"));
      if (!letters.length) return;
      const x0 = letters[0].offsetLeft;
      const last = letters[letters.length - 1];
      const w = last.offsetLeft + last.offsetWidth - x0;
      letters.forEach((l) => {
        l.style.setProperty("--gw", w + "px");
        l.style.setProperty("--gx", (l.offsetLeft - x0) + "px");
      });
    });
    sizeGradient();
    ScrollTrigger.addEventListener("refreshInit", sizeGradient);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeGradient);
    const first = sentences[0];
    const last = sentences[sentences.length - 1];

    /* the two slices show one full-viewport image: size it to the stage (not 100vw,
       which includes the scrollbar) so the halves line up at the seam */
    const sizeBackground = () => {
      const size = `${container.clientWidth}px ${container.clientHeight}px`;
      left.style.backgroundSize = size;
      right.style.backgroundSize = size;
    };
    sizeBackground();
    ScrollTrigger.addEventListener("refreshInit", sizeBackground);
    /* also follow the stage's own size (the scrollbar appearing after the preloader,
       window / zoom changes) so the halves never drift apart at the seam */
    if (window.ResizeObserver) new ResizeObserver(sizeBackground).observe(container);

    const halfW = () => container.clientWidth / 2 + 1;
    const sliceW = () => container.clientWidth * 0.48;
    const sliceH = () => container.clientHeight * (window.innerWidth <= 768 ? 0.26 : 0.3);
    const fullH = () => container.clientHeight;

    if (reduced) {
      /* static end state: the final sentence on the full gradient */
      pinHeight.style.height = "100vh";
      gsap.set(container, { backgroundColor: BLACK });
      gsap.set([left, right], { xPercent: 0, yPercent: -50, opacity: 1, width: halfW, height: fullH, borderRadius: 0 });
      gsap.set(sentences, { autoAlpha: 0 });
      gsap.set(last, { autoAlpha: 1, color: CREAM });
      return;
    }

    gsap.set(left, { xPercent: -101, yPercent: -50 });
    gsap.set(right, { xPercent: 101, yPercent: -50 });

    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      pinSpacing: false,
      anticipatePin: 1,
    });

    /* one step per scroll: when a scroll gesture ends between two resting points
       ("Emotion" centred, "meets" centred, "outcomes." on the full gradient), the
       page glides on to the next one in the scroll direction */
    const snapPoints = () => {
      const d = tl.duration() || 1;
      return [0, tl.labels.meetsRest, tl.labels.fluidPlay, d].filter((t) => t !== undefined).map((t) => t / d);
    };
    const snapStep = (value, self) => {
      const pts = snapPoints(), eps = 0.002;
      if (self.direction >= 0) return pts.find((p) => p >= value - eps) ?? 1;
      for (let i = pts.length - 1; i >= 0; i--) if (pts[i] <= value + eps) return pts[i];
      return 0;
    };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight, start: "top top", end: sentenceEnd, scrub: true, invalidateOnRefresh: true,
        snap: { snapTo: snapStep, duration: { min: 0.5, max: 1.2 }, delay: 0.12, ease: "power2.inOut" },
      },
    });
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let playSentence = null;
    const below = { yPercent: 50, y: () => container.clientHeight * 0.5 };
    const above = { yPercent: -50, y: () => -container.clientHeight * 0.5 };
    const rest = { yPercent: 0, y: 0 };

    /* no empty dark screen between the wheel hand-off and "Emotion": the first
       sentence performs its staggered rise while the stage scrolls into view, so it
       is already centred by the time the pin starts. It is scrubbed by the scroll
       (lightly smoothed) rather than played in real time: a timed play / reverse
       on enter / leave-back stopped and reversed mid-rise whenever the scroll
       changed direction, tearing the letters apart ("Emo" high, "ti" low) */
    const entry = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 85%", end: "top top", scrub: 0.6, invalidateOnRefresh: true },
    });
    entry.fromTo(first, below, { ...rest, duration: 1, ease: "power2.out", immediateRender: true });
    entry.fromTo(first.querySelectorAll("span"), below, { ...rest, duration: 1, ease: "power2.out", stagger: 0.02, immediateRender: true }, "<");
    /* short hold on "Emotion" before it hands over to "meets" (was 1: almost three
       screens of scrolling on one word). css/journey-toolkit.css shortened the pin by
       the same 0.65 of a unit, so every later step keeps its pace */
    tl.to({}, { duration: 0.35 });
    tl.addLabel("firstOut");
    /* the entry and the scrubbed exit below write the same y / yPercent on the same
       letters. Once the scroll reaches the exit — a fast scroll while the entry's
       smoothing is still catching up, a reload or a section-nav jump into the pin —
       the entry must finish at once, or it keeps pulling "Emotion" back to the
       centre over "meets" */
    const pastEntry = () => tl.time() > tl.labels.firstOut;
    const releaseEntry = () => {
      const lag = entry.scrollTrigger && entry.scrollTrigger.getTween();
      if (!lag || !lag.isActive() || !pastEntry()) return;
      lag.progress(1);
      /* the entry may have written last this frame: redraw the scrubbed state now
         (a nudge and back, events suppressed) instead of waiting for the next scroll */
      const t = tl.time();
      tl.time(t + 0.0001, true).time(t, true);
    };

    sentences.forEach((s, i) => {
      const next = sentences[i + 1];
      if (!next) return;
      const dialogue = next.classList.contains("is-dialogue");
      const both = next.classList.contains("is-both");

      if (dialogue) {
        /* the stage turns cream while the current sentence is centred. The final
           sentence keeps its cream letters (as on the reference once its letters
           carry the cream fill), so cream-on-cream it only reads through the
           gradient cards as they slide in and meet */
        /* smooth dark -> cream crossfade (was an instant set): the stage and the
           centred sentence fade together over a stretch of scroll */
        /* fits inside the (shortened) "Emotion" hold, so "meets" follows straight on */
        tl.to(container, { backgroundColor: CREAM, duration: 0.3, ease: "sine.inOut" }, "<+=0.05");
        tl.to(sentences.filter((el) => !el.classList.contains("is-both")), { color: DARK, duration: 0.3, ease: "sine.inOut" }, "<");
      }
      if (both) {
        tl.fromTo(left, { xPercent: -101, opacity: 0 }, { xPercent: -30, opacity: 1, ease: "power3.out" }, "<+=0.15");
        tl.fromTo(right, { xPercent: 101, opacity: 0 }, { xPercent: 30, opacity: 1, ease: "power3.out" }, "<");
      }

      tl.fromTo(s, rest, { ...above, ease: "power3.in", immediateRender: false });
      tl.fromTo(s.querySelectorAll("span"), rest, { ...above, stagger: 0.02, ease: "power3.in", immediateRender: false }, "<+=0.1");
      tl.fromTo(next, below, { ...rest, ease: "power3.out", immediateRender: true }, "<+=0.10");
      tl.fromTo(next.querySelectorAll("span"), below, { ...rest, ease: "power3.out", stagger: 0.02, immediateRender: true }, "<");
      if (dialogue) tl.addLabel("meetsRest");   // "meets" centred: a snap point

      if (both) {
        /* the inner (meeting) corners square off as the blocks slide together, so they
           join in one clean edge instead of leaving notches at the top and bottom */
        tl.fromTo(left, { xPercent: -30, width: sliceW, borderRadius: 24 }, { xPercent: 0, width: halfW, borderRadius: 0, ease: "power3.inOut", immediateRender: false }, "<");
        tl.fromTo(right, { xPercent: 30, width: sliceW, borderRadius: 24 }, { xPercent: 0, width: halfW, borderRadius: 0, ease: "power3.inOut", immediateRender: false }, "<");
        tl.set(next, { color: CREAM }, ">-=0.05");
        tl.fromTo([left, right], { height: sliceH }, { height: fullH, ease: "power3.inOut", immediateRender: false }, ">+=0.2");
        /* hold on the full-screen gradient: the reference's neutral hold, then the
           "wake up" (fluid distortion starts, the text turns into an outline),
           then the play phase where hovering the letters fills them again */
        tl.to({}, { duration: 0.05 });
        tl.addLabel("fluidWake");
        tl.to(fluid, { idle: 0.01, duration: 0.14, ease: "sine.inOut" }, "fluidWake");
        tl.to(fluid, { idle: 0.012, duration: 0.14, ease: "sine.inOut" }, ">");
        tl.to(fluid, { interaction: 1, zoom: 1.02, duration: 0.28, ease: "sine.inOut" }, "fluidWake");
        if (finePointer) {
          tl.fromTo(next, { "--traj-fill": 1, "--traj-stroke": "0px" },
            { "--traj-fill": 0, "--traj-stroke": "1.5px", duration: 0.28, ease: "sine.inOut", immediateRender: false }, "fluidWake");
        }
        tl.addLabel("fluidPlay");
        tl.to({}, { duration: 0.27 });
        tl.set(container, { backgroundColor: BLACK }, ">");
        playSentence = next;
      }
    });

    /* hover-to-fill is live from the play phase on, including the section's end
       and the hand-off, where the outlined text is still on screen */
    /* ---- one wheel scroll = one step. Inside the sentence range, a wheel notch (or
       trackpad swipe) glides the page to the next resting point in its direction —
       "Emotion" → "meets" → "outcomes." — instead of creeping through the long pin;
       further wheel input during the glide (and its trackpad inertia) is absorbed.
       Registered before js/smooth-scroll.js, which then leaves the event alone
       (defaultPrevented). Past the last step the page scrolls on normally. */
    if (finePointer && !reduced) {
      const GLIDE = 0.95;   // s per step
      const stepY = () => {
        const st = tl.scrollTrigger;
        if (!st) return [];
        return snapPoints().map((p) => st.start + p * (st.end - st.start));
      };
      let gliding = false, quietUntil = 0, raf = 0;
      const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      function glideTo(to) {
        const from = window.scrollY, t0 = performance.now();
        gliding = true;
        cancelAnimationFrame(raf);
        const step = (now) => {
          const k = Math.min(1, (now - t0) / (GLIDE * 1000));
          window.scrollTo(0, Math.round(from + (to - from) * easeInOut(k)));
          if (k < 1) raf = requestAnimationFrame(step);
          else { gliding = false; quietUntil = performance.now() + 220; }
        };
        raf = requestAnimationFrame(step);
      }
      const scrollable = (node) => {
        let t = node instanceof Element ? node : null;
        while (t && t !== document.body && t !== document.documentElement) {
          const o = getComputedStyle(t).overflowY;
          if ((o === "auto" || o === "scroll") && t.scrollHeight > t.clientHeight + 1) return true;
          t = t.parentElement;
        }
        return false;
      };
      /* what this section does with a wheel event: null = not ours, "absorb" = swallow
         (a glide or its trackpad inertia is running), or a scroll position to glide to.
         Pure (no side effects), so js/wheel.js can ask first and step aside: its slow
         run-wide glide otherwise claims these notches before this handler sees them */
      function plan(e) {
        if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || !e.deltaY) return null;
        if (document.body.style.overflow === "hidden" || scrollable(e.target)) return null;
        const ys = stepY();
        if (ys.length < 2) return null;
        const y = window.scrollY, first = ys[0], last = ys[ys.length - 1];
        if (gliding || performance.now() < quietUntil) return y >= first - window.innerHeight - 4 && y <= last + 4 ? "absorb" : null;
        const down = e.deltaY > 0;
        /* the stretch between the previous section and "Emotion" (one viewport: the
           stage scrolling in while "Emotion" rises) is crossed in one scroll: down from
           anywhere in it lands on "Emotion", up from "Emotion" lands back at the
           previous section (it took ~12 wheel notches before) */
        const zone = window.innerHeight;
        if (down && y < first - 2 && y >= first - zone - 2) return first;
        if (!down && y <= first + 2 && y > first - zone + 2) return Math.max(0, first - zone);
        /* scrolling back up from below lands exactly on the last resting point */
        if (!down && y > last + 2 && y - last < zone * 0.5) return last;
        if (y < first - 2 || y > last + 2) return null;   // outside the sentences
        const target = down ? ys.find((v) => v > y + 2) : [...ys].reverse().find((v) => v < y - 2);
        return target === undefined ? null : target;      // past the last step: scroll on
      }
      window.LiaJourney.claimsWheel = (e) => plan(e) !== null;
      window.addEventListener("wheel", (e) => {
        if (e.defaultPrevented) return;
        const p = plan(e);
        if (p === null || !e.cancelable) return;
        e.preventDefault();
        if (p === "absorb") quietUntil = Math.max(quietUntil, performance.now() + 120);
        else glideTo(p);
      }, { passive: false });
    }

    let togglePlay = null;
    if (playSentence && finePointer) {
      togglePlay = () => {
        const t = tl.labels.fluidPlay;
        playSentence.classList.toggle("is-pointer-play", t !== undefined && tl.time() >= t);
      };
      ScrollTrigger.addEventListener("refresh", togglePlay);
      togglePlay();
    }
    /* the final sentence shows only through the gradient cards, as on the reference
       (cream letters on a cream page): it rises into the cards while they slide in,
       is hidden in the gap between them, and reads whole once they fill the stage.
       One mask layer per card, in the sentence's own (unscaled) coordinates, with
       the card's opacity so the letters fade in with it. */
    const setMask = (el, image, pos, size) => {
      el.style.maskImage = el.style.webkitMaskImage = image;
      el.style.maskPosition = el.style.webkitMaskPosition = pos;
      el.style.maskSize = el.style.webkitMaskSize = size;
      el.style.maskRepeat = el.style.webkitMaskRepeat = image ? "no-repeat" : "";
    };
    function maskToCards() {
      if (!last.classList.contains("is-both")) return;
      const s = last.getBoundingClientRect();
      const k = s.width / Math.max(1, last.offsetWidth);   // the hand-off scales the centre
      const c = container.getBoundingClientRect();
      const cards = [left, right].map((el) => ({ b: el.getBoundingClientRect(), o: parseFloat(getComputedStyle(el).opacity) || 0 }));
      const near = (a, b) => Math.abs(a - b) <= 1;
      const [L, R] = cards;
      const fill = L.o > 0.99 && R.o > 0.99 && near(L.b.left, c.left) && near(R.b.right, c.right) &&
        near(L.b.top, c.top) && near(L.b.bottom, c.bottom) && L.b.right >= R.b.left - 1;
      if (fill || !s.width) { setMask(last, "", "", ""); return; }
      const layers = cards.filter((q) => q.o > 0.001 && q.b.width > 0.5 && q.b.height > 0.5);
      if (!layers.length) { setMask(last, "linear-gradient(transparent, transparent)", "0 0", "100% 100%"); return; }
      setMask(last,
        layers.map((q) => `linear-gradient(rgba(0,0,0,${q.o.toFixed(3)}), rgba(0,0,0,${q.o.toFixed(3)}))`).join(", "),
        layers.map((q) => `${((q.b.left - s.left) / k).toFixed(1)}px ${((q.b.top - s.top) / k).toFixed(1)}px`).join(", "),
        layers.map((q) => `${(q.b.width / k).toFixed(1)}px ${(q.b.height / k).toFixed(1)}px`).join(", "));
    }
    ScrollTrigger.addEventListener("refresh", maskToCards);
    maskToCards();

    /* one onUpdate per timeline (eventCallback replaces): checked from both sides, so
       the entry lets go whether the scroll moves on or the rise is still ticking */
    tl.eventCallback("onUpdate", () => { releaseEntry(); if (togglePlay) togglePlay(); maskToCards(); });
    entry.eventCallback("onUpdate", releaseEntry);

    /* hand-off: as the Toolkit section arrives the centre eases back and the title firms up.
       The stage no longer shrinks into a rounded strip: that exposed a black band around
       its edges while scrolling on, so it stays full-bleed into the next section */
    const toolkit = document.getElementById("section-toolkit");
    if (toolkit) {
      const title = toolkit.querySelector(".tk__title");
      const hand = gsap.timeline({
        scrollTrigger: { trigger: toolkit, start: "top bottom", end: "top 30%", scrub: true, invalidateOnRefresh: true },
      });
      hand.to(center, { scale: 0.9, transformOrigin: "center center", ease: "none" }, 0);
      if (title) hand.fromTo(title, { fontWeight: 500 }, { fontWeight: 700, ease: "none" }, 0);
    }
  }

  window.LiaJourney = { init, fluid };
})();
