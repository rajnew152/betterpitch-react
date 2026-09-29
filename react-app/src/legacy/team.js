/* =============================================================================
   team.js — the kora-style team panel at the end of the journey section. The
   journey keeps its own scroll length (the stylesheet's pin height); the panel
   sits after that, inside the same pin height, one viewport, so the gradient
   stage stays pinned underneath while the panel scrolls up over it. Clicking a
   member row opens the profile dialog (moved to <body>, so position:fixed is
   viewport-true inside the pinned scene). The panel recedes a little as the
   Toolkit arrives, like the journey stage itself does.
   ============================================================================= */
(function () {
  "use strict";

  function init() {
    const root = document.getElementById("section-journey");
    const team = root && root.querySelector(".traj__team");
    if (!root || !team) return;

    /* ---- member profile dialog ---- */
    const modal = team.querySelector(".team-modal");
    if (modal) {
      document.body.appendChild(modal);
      const members = modal.querySelectorAll(".team-modal__member");
      const closeBtn = modal.querySelector(".team-modal__close");
      const scrim = modal.querySelector(".team-modal__scrim");
      const card = modal.querySelector(".team-modal__card");
      let opener = null;
      /* the card grows out of (and shrinks back into) the row's "+" button: its
         offset from the viewport centre, where the flex-centred card sits */
      const aimAt = (row) => {
        if (!card) return;
        const plus = (row && row.querySelector(".team-row__plus")) || row;
        if (!plus) return;
        const r = plus.getBoundingClientRect();
        card.style.setProperty("--tm-from-x", Math.round(r.left + r.width / 2 - window.innerWidth / 2) + "px");
        card.style.setProperty("--tm-from-y", Math.round(r.top + r.height / 2 - window.innerHeight / 2) + "px");
      };
      const open = (id) => {
        members.forEach((m) => m.classList.toggle("is-active", m.dataset.member === id));
        aimAt(opener);
        if (card) card.scrollTop = 0;
        if (opener) opener.classList.add("is-opener");
        /* commit the start state before .is-open, so the entrance always plays */
        void modal.offsetWidth;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (closeBtn) closeBtn.focus({ preventScroll: true });
      };
      const close = () => {
        if (!modal.classList.contains("is-open")) return;
        aimAt(opener);
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (opener) {
          opener.classList.remove("is-opener");
          opener.focus({ preventScroll: true });
          opener = null;
        }
      };
      /* delegated at the document level: the rows live inside ScrollTrigger's
         pinned scene, whose pin-spacers re-parent elements — this keeps the
         click working no matter where the rows end up */
      document.addEventListener("click", (e) => {
        const row = e.target instanceof Element && e.target.closest(".team-row");
        if (!row) return;
        e.preventDefault();
        opener = row;
        open(row.dataset.member);
      });
      if (closeBtn) closeBtn.addEventListener("click", close);
      if (scrim) scrim.addEventListener("click", close);
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) close();
      });
    }

    /* ---- scroll choreography (same shape as the old card deck, for one panel) ---- */
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const pinHeight = root.querySelector(".traj__pin-height");
    const panel = team.querySelector(".team-panel");
    if (!pinHeight || !panel) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* the journey's pin length comes from the stylesheet; the panel starts where
       the "outcomes." hold ends and adds one viewport (js/journey.js subtracts the
       block again, so its own timeline keeps its original length) */
    const layout = () => {
      pinHeight.style.height = "";
      team.style.marginTop = "";
      if (reduced) { pinHeight.style.height = "auto"; return; }
      const base = pinHeight.offsetHeight;
      team.style.marginTop = (base - window.innerHeight) + "px";
      pinHeight.style.height = (base + team.offsetHeight) + "px";
    };
    layout();
    if (reduced) return;
    ScrollTrigger.addEventListener("refreshInit", layout);

    /* "Meet the team": pinned over the whole block; it rises and fades in with the
       panel, so title and panel arrive together */
    const heading = team.querySelector(".team-heading");
    const title = heading && heading.querySelector(".team-heading__title");
    if (heading && title) {
      gsap.set(heading, { zIndex: 2 });
      ScrollTrigger.create({
        trigger: heading,
        start: "top top",
        endTrigger: team,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
      gsap.fromTo(title, { autoAlpha: 0, y: 70, scale: 0.94, filter: "blur(8px)" }, {
        autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "power2.out",
        scrollTrigger: { trigger: panel, start: "top bottom", end: "top 30%", scrub: true, invalidateOnRefresh: true },
      });
      /* the "outcomes." sentence clears out of the way as the title comes in */
      const center = root.querySelector(".traj__center");
      if (center) {
        gsap.fromTo(center, { opacity: 1 }, {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "top 55%", scrub: true, invalidateOnRefresh: true },
        });
      }
    }

    gsap.set(panel, { zIndex: 1 });
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      endTrigger: team,
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    /* keep the panel (and the title) inside the orange / purple stage: whatever part
       of them falls outside the stage's on-screen box is clipped away, so during the
       hand-off (when the stage shrinks and scrolls off) nothing hangs outside it */
    const stage = root.querySelector(".traj__container");
    if (stage) {
      const clipEls = [heading, panel].filter(Boolean);
      let raf = 0;
      const clipToStage = () => {
        raf = 0;
        const c = stage.getBoundingClientRect();
        if (c.bottom < -50 || c.top > window.innerHeight + 50) return;
        clipEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          const t = Math.max(0, c.top - r.top), rt = Math.max(0, r.right - c.right);
          const b = Math.max(0, r.bottom - c.bottom), l = Math.max(0, c.left - r.left);
          el.style.clipPath = t || rt || b || l ? `inset(${t}px ${rt}px ${b}px ${l}px)` : "";
        });
      };
      const queue = () => { if (!raf) raf = requestAnimationFrame(clipToStage); };
      window.addEventListener("scroll", queue, { passive: true });
      ScrollTrigger.addEventListener("refresh", queue);
    }

    /* hand-off: the panel recedes a little as the Toolkit arrives (the gradient
       stage behind it shrinks into its rounded strip, see js/journey.js) */
    const toolkit = document.getElementById("section-toolkit");
    if (toolkit) {
      const inner = panel.querySelector(".team-panel__inner");
      const hand = gsap.timeline({
        scrollTrigger: { trigger: toolkit, start: "top bottom", end: "top 30%", scrub: true, invalidateOnRefresh: true },
      });
      if (inner) hand.to(inner, { scale: 0.96, transformOrigin: "center center", ease: "none" }, 0);
      if (heading) hand.to(heading, { opacity: 0, ease: "none" }, 0);
    }
  }

  window.LiaTeam = { init };
})();
