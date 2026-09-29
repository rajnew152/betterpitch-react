/* =============================================================================
   section-nav.js — the right-hand dots navigation (desktop, hover-capable
   devices). Tracks the section in the middle of the viewport, expands the
   labels on hover with the same staggered entrance/exit as the original.
   ============================================================================= */
(function () {
  "use strict";
  const { animate, set } = LiaMotion;
  const SECTIONS = ["hero", "features", "section-gallery", "section-cinematic-project", "section-faq", "testimonials", "section-next"];

  function init() {
    const nav = document.getElementById("section-nav");
    if (!nav) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = LiaMotion.prefersReducedMotion();
    const list = nav.querySelector("ul");
    const buttons = Array.from(nav.querySelectorAll("button"));
    let expanded = false, closeTimer = 0, active = "hero", scrolledPastHero = false;

    function show() {
      nav.style.display = mq.matches ? "" : "none";
      if (mq.matches) animate(list, { opacity: 1, x: 0 }, { duration: 0.5, delay: 0.4, ease: "easeOut" });
    }
    set(list, { opacity: 0, x: 8 });
    show();
    mq.addEventListener("change", show);

    function effectiveActive() { return active === "hero" && scrolledPastHero ? "features" : active; }
    function paint() {
      const cur = effectiveActive();
      buttons.forEach((b) => {
        const on = b.dataset.section === cur;
        b.querySelector(".sn-label").toggleAttribute("data-active", on);
        b.querySelector(".sn-dot").toggleAttribute("data-active", on);
        if (on) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      });
    }

    /* active section: the element crossing the vertical centre of the viewport */
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { active = e.target.id; paint(); }
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
    SECTIONS.map((id) => document.getElementById(id)).filter(Boolean).forEach((el) => io.observe(el));

    /* the threshold only moves when the layout does (pins refresh, resize, fonts),
       so it is measured then instead of forcing a layout on every scroll frame */
    let raf = 0, threshold = null;
    const measure = () => {
      const g = document.getElementById("section-gallery") || document.getElementById("section-cinematic-project");
      threshold = g ? Math.max(g.getBoundingClientRect().top + window.scrollY - window.innerHeight, 1) : null;
    };
    const check = () => {
      raf = 0;
      if (threshold === null) return;
      const next = window.scrollY > 0.22 * threshold;
      if (next !== scrolledPastHero) { scrolledPastHero = next; paint(); }
    };
    const remeasure = () => { measure(); check(); };
    window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(check); }, { passive: true });
    window.addEventListener("resize", remeasure);
    if (window.ScrollTrigger) ScrollTrigger.addEventListener("refresh", remeasure);
    if (window.ResizeObserver) new ResizeObserver(remeasure).observe(document.body);
    measure(); check(); paint();

    /* expand / collapse labels */
    function openLabels() {
      clearTimeout(closeTimer);
      if (expanded) return;
      expanded = true;
      buttons.forEach((b, i) => {
        const label = b.querySelector(".sn-label");
        label.style.display = "";
        set(label, reduced ? { opacity: 0 } : { opacity: 0, x: 14 });
        animate(label, { opacity: 1, x: 0 }, { duration: 0.25, delay: reduced ? 0 : 0.03 * i, ease: "easeOut" });
      });
    }
    function closeLabels() {
      expanded = false;
      buttons.forEach((b) => {
        const label = b.querySelector(".sn-label");
        animate(label, { opacity: 0, x: reduced ? 0 : 10 }, { duration: 0.15, onComplete() { if (!expanded) label.style.display = "none"; } });
      });
    }
    const scheduleClose = () => { clearTimeout(closeTimer); closeTimer = setTimeout(closeLabels, 260); };
    nav.addEventListener("mouseenter", openLabels);
    nav.addEventListener("mouseleave", scheduleClose);
    nav.addEventListener("focusin", openLabels);
    nav.addEventListener("focusout", (e) => { if (!nav.contains(e.relatedTarget)) scheduleClose(); });

    buttons.forEach((b) => {
      const label = b.querySelector(".sn-label");
      b.addEventListener("mouseenter", () => { if (!reduced && b.dataset.section !== effectiveActive()) animate(label, { x: -4 }, { duration: 0.2, ease: "easeOut" }); });
      b.addEventListener("mouseleave", () => { if (!reduced) animate(label, { x: 0 }, { duration: 0.2, ease: "easeOut" }); });
      b.addEventListener("click", () => {
        const id = b.dataset.section;
        if (id === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
        else if (id === "features" && window.LiaHero && LiaHero.featureScroll) LiaHero.featureScroll();
        else {
          const el = document.getElementById(id);
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
        }
      });
    });
  }

  window.LiaSectionNav = { init };
})();
