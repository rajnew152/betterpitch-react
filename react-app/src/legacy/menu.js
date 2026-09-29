/* =============================================================================
   menu.js — header + staggered slide-in menu (port of the site's StaggeredMenu
   component: GSAP timelines for the coloured pre-layers, the panel, the item
   labels, the +/× icon and the "Menu/Close" text roller).
   ============================================================================= */
(function () {
  "use strict";
  const POSITION = "right";
  const OPEN_COLOR = "#ffffff";

  function init() {
    const scope = document.getElementById("staggered-menu");
    if (!scope || !window.gsap) return;

    const panel = scope.querySelector(".sm-panel");
    const prelayers = Array.from(scope.querySelectorAll(".sm-prelayer"));
    const prelayerWrap = scope.querySelector(".sm-prelayers");
    const toggle = scope.querySelector(".sm-toggle");
    const icon = scope.querySelector(".sm-icon");
    const [lineH, lineV] = scope.querySelectorAll(".sm-icon-line");
    const textInner = scope.querySelector(".sm-toggle-textInner");
    const menuColor = () => (window.LiaTheme && LiaTheme.isDark() ? "#ffffff" : "#0a0a0f");

    let open = false, busy = false;
    let openTl = null, closeTween = null, iconTl = null, colorTween = null, textTween = null;
    const offscreen = POSITION === "left" ? -100 : 100;

    /* initial state (useLayoutEffect in the original) */
    gsap.set([panel, ...prelayers], { xPercent: offscreen, opacity: 1 });
    gsap.set(prelayerWrap, { xPercent: 0, opacity: 1 });
    gsap.set(lineH, { transformOrigin: "50% 50%", rotate: 0 });
    gsap.set(lineV, { transformOrigin: "50% 50%", rotate: 90 });
    gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
    gsap.set(textInner, { yPercent: 0 });
    gsap.set(toggle, { color: menuColor() });
    scope.classList.add("sm-ready");

    function buildOpenTimeline() {
      openTl && openTl.kill();
      closeTween && (closeTween.kill(), (closeTween = null));
      const labels = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
      const layers = prelayers.map((el) => ({ el, start: offscreen }));
      if (labels.length) gsap.set(labels, { yPercent: 140, rotate: 10 });
      const tl = gsap.timeline({ paused: true });
      layers.forEach((l, i) => {
        tl.fromTo(l.el, { xPercent: l.start }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
      });
      const panelAt = (layers.length ? (layers.length - 1) * 0.07 : 0) + (layers.length ? 0.08 : 0);
      tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: 0.65, ease: "power4.out" }, panelAt);
      if (labels.length) {
        tl.to(labels, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1, from: "start" } }, panelAt + 0.0975);
      }
      openTl = tl;
      return tl;
    }

    function playOpen() {
      if (busy) return;
      busy = true;
      const tl = buildOpenTimeline();
      tl.eventCallback("onComplete", () => { busy = false; });
      tl.play(0);
    }

    function playClose() {
      openTl && (openTl.kill(), (openTl = null));
      closeTween && closeTween.kill();
      closeTween = gsap.to([...prelayers, panel], {
        xPercent: offscreen, duration: 0.32, ease: "power3.in", overwrite: "auto",
        onComplete() {
          const labels = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
          if (labels.length) gsap.set(labels, { yPercent: 140, rotate: 10 });
          setSubmenu(null);
          busy = false;
        },
      });
    }

    function animateIcon(opening) {
      iconTl && iconTl.kill();
      if (opening) {
        gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
        iconTl = gsap.timeline({ defaults: { ease: "power4.out" } })
          .to(lineH, { rotate: 45, duration: 0.5 }, 0)
          .to(lineV, { rotate: -45, duration: 0.5 }, 0);
      } else {
        iconTl = gsap.timeline({ defaults: { ease: "power3.inOut" } })
          .to(lineH, { rotate: 0, duration: 0.35 }, 0)
          .to(lineV, { rotate: 90, duration: 0.35 }, 0)
          .to(icon, { rotate: 0, duration: 0.001 }, 0);
      }
    }

    function animateColor(opening) {
      colorTween && colorTween.kill();
      colorTween = gsap.to(toggle, { color: opening ? OPEN_COLOR : menuColor(), delay: 0.18, duration: 0.3, ease: "power2.out" });
    }

    function animateText(opening) {
      textTween && textTween.kill();
      const from = opening ? "Menu" : "Close";
      const to = opening ? "Close" : "Menu";
      const seq = [from];
      let cur = from;
      for (let i = 0; i < 3; i++) { cur = cur === "Menu" ? "Close" : "Menu"; seq.push(cur); }
      if (cur !== to) seq.push(to);
      seq.push(to);
      textInner.innerHTML = seq.map((s) => `<span class="block h-[1em] leading-none">${s}</span>`).join("");
      gsap.set(textInner, { yPercent: 0 });
      const n = seq.length;
      textTween = gsap.to(textInner, { yPercent: -((n - 1) / n) * 100, duration: 0.5 + 0.07 * n, ease: "power4.out" });
    }

    function setOpen(next) {
      open = next;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.setAttribute("aria-hidden", String(!open));
      scope.firstElementChild.toggleAttribute("data-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    function doToggle() {
      const next = !open;
      setOpen(next);
      if (next) playOpen(); else playClose();
      animateIcon(next); animateColor(next); animateText(next);
    }
    function close() {
      if (!open) return;
      setOpen(false); playClose(); animateIcon(false); animateColor(false); animateText(false);
    }

    toggle.addEventListener("click", doToggle);
    document.addEventListener("mousedown", (e) => {
      if (!open) return;
      if (!panel.contains(e.target) && !toggle.contains(e.target)) close();
    });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    /* submenu (Industries) */
    const subToggle = panel.querySelector(".sm-panel-toggle");
    const subWrap = panel.querySelector(".sm-sub-wrap");
    const subClip = panel.querySelector(".sm-sub-clip");
    const chevron = panel.querySelector(".sm-panel-chevron");
    function setSubmenu(label) {
      const expanded = label !== null;
      if (subToggle) subToggle.setAttribute("aria-expanded", String(expanded));
      if (subWrap) subWrap.toggleAttribute("data-expanded", expanded);
      if (chevron) chevron.toggleAttribute("data-expanded", expanded);
      if (subClip) subClip.toggleAttribute("inert", !expanded);
    }
    if (subToggle) {
      subToggle.addEventListener("click", () => setSubmenu(subToggle.getAttribute("aria-expanded") === "true" ? null : "Industries"));
    }
    panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

    /* logo -> smooth scroll to top on the homepage */
    const home = scope.querySelector("[data-home-link]");
    if (home) home.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

    window.addEventListener("lia:themechange", () => { if (!open) gsap.set(toggle, { color: menuColor() }); });

    window.LiaMenu = { open: () => !open && doToggle(), close, isOpen: () => open };
  }

  window.LiaMenu = { init };
})();
