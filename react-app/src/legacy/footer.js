/* =============================================================================
   footer.js — CTA reveals, shooting stars and the off-screen animation pause
   for the footer globe (port of the reference Footer component).
   ============================================================================= */
(function () {
  "use strict";
  const { reveal, animate } = LiaMotion;
  const STAR_DELAYS = [0.5, 2.8, 5.2, 1.5, 7, 3.9];

  function init() {
    const root = document.getElementById("section-footer");
    if (!root) return;

    /* pause every animation while the footer is far off-screen */
    new IntersectionObserver(([e]) => root.classList.toggle("lia-footer-offscreen", !e.isIntersecting), { rootMargin: "300px 0px" }).observe(root);

    /* shooting stars: the six rotated wrappers */
    const stars = Array.from(root.querySelectorAll(":scope > .pointer-events-none.absolute.light\\:hidden[style*='rotate(']"));
    stars.forEach((el, i) => {
      el.classList.add("footer-shooting-star");
      el.style.setProperty("--star-delay", `${STAR_DELAYS[i] ?? 0}s`);
    });

    /* CTA block */
    const cta = root.querySelector(":scope > .relative.z-20.flex.flex-col");
    if (cta) {
      const [badge, h2, p, a] = cta.children;
      reveal(badge, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, { duration: 0.55, ease: "easeOut" });
      reveal(h2, { opacity: 0, y: 22 }, { opacity: 1, y: 0 }, { duration: 0.7, ease: "easeOut", delay: 0.07 });
      reveal(p, { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { duration: 0.65, ease: "easeOut", delay: 0.15 });
      reveal(a, { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { duration: 0.6, ease: "easeOut", delay: 0.22 });
      a.addEventListener("mouseenter", () => animate(a, { scale: 1.04 }, { duration: 0.2, ease: "easeOut" }));
      a.addEventListener("mouseleave", () => animate(a, { scale: 1 }, { duration: 0.2, ease: "easeOut" }));
      a.addEventListener("pointerdown", () => animate(a, { scale: 0.97 }, { duration: 0.1 }));
      a.addEventListener("pointerup", () => animate(a, { scale: 1.04 }, { duration: 0.15 }));
    }

    /* footer links that target sections on this page */
    root.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href").slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
      });
    });
  }

  window.LiaFooter = { init };
})();
