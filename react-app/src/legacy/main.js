/* =============================================================================
   main.js — boot sequence.
   ============================================================================= */
(function () {
  "use strict";

  /* on reload the site forces the scroll position back to the top */
  (function resetScrollOnReload() {
    const nav = performance.getEntriesByType("navigation")[0];
    if (!nav || nav.type !== "reload") return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    top();
    requestAnimationFrame(() => { top(); requestAnimationFrame(top); });
    window.addEventListener("load", () => { top(); window.history.scrollRestoration = prev; }, { once: true });
  })();

  function boot() {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      /* mobile browsers resize the viewport every time the URL bar collapses;
         without this every pinned scene re-lays-out mid-scroll and stutters */
      ScrollTrigger.config({ ignoreMobileResize: true });
    }
    LiaTheme.init();
    const preloading = LiaPreloader.init();
    LiaMenu.init();
    LiaHero.init();
    LiaFeatures.init();
    LiaGallery.init();
    LiaWheel.init();
    LiaFaq.init();
    LiaRoi.init();
    LiaFooter.init();
    if (window.LiaJourney) LiaJourney.init();   // guillaumezhu.com sections (journey + toolkit before the FAQ, next after the footer)
    if (window.LiaTeam) LiaTeam.init();         // contributor cards inside the journey pin
    if (window.LiaToolkit) LiaToolkit.init();
    if (window.LiaTestimonials) LiaTestimonials.init(); // results deck, built like the toolkit
    if (window.LiaNext) LiaNext.init();
    LiaSectionNav.init();
    LiaChat.init();
    if (window.LiaSmoothScroll) LiaSmoothScroll.init(); // after LiaWheel so its handler runs first

    /* endless CSS marquees pause while off-screen (see css/perf.css) */
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.target.classList.toggle("lia-offscreen", !e.isIntersecting));
      }, { rootMargin: "100px 0px" });
      document.querySelectorAll(".hero-rail-scroll, .lia-slide-track").forEach((el) => io.observe(el));
    }

    /* in-page anchor links (footer / menu) */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      if (a.__wired) return; a.__wired = true;
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").slice(1);
        const el = id && document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        if (id === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
        else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
      });
    });

    const refresh = () => window.ScrollTrigger && ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    preloading.then(refresh);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
