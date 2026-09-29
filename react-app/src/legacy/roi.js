/* =============================================================================
   roi.js — ROI calculator: state, formulas, gauge and animated counters
   (port of the reference RoiCalculator component; identical maths).

   Motion (styles: components/RoiCalculator/RoiCalculator.css):
   - intro, once in view: the title rises word by word out of a mask, the
     controls stagger in with their fills sweeping to value, the gauge ticks
     light up left to right, the track draws, then the arc, dot and every
     number count up together; result rows and stats follow
   - on input: every figure tweens from what is shown to the new value, and the
     dot rides the arc with it (it no longer jumps); badges and the headline
     number pulse on change
   - ambient: the dot's glow breathes, slider fills carry a slow sheen
   ============================================================================= */
(function () {
  "use strict";
  const { tween } = LiaMotion;
  const AGENT_OPTIONS = [5, 18, 38, 75, 150];
  const EASE = [0.22, 1, 0.36, 1];
  const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
  const num = (v) => new Intl.NumberFormat("en-US").format(v);
  const fmtK = (v) => (v >= 1000 ? `${Math.round(v / 1000)}K` : String(v));
  const fmtSalary = (v) => { const t = v / 1000; return `$${t === Math.floor(t) ? t : t.toFixed(1)}K`; };
  const pt = (deg, r = 112) => { const a = (deg * Math.PI) / 180; return { x: 100 + r * Math.cos(a), y: -20 + r * Math.sin(a) }; };
  const ARC_LEN = (Math.abs(-160) / 360) * 2 * Math.PI * 112;
  const ZERO = { automatedMonthly: 0, monthlySavings: 0, year1: 0, fiveYear: 0, hoursSaved: 0, agentsReassigned: 0, pctPayroll: 0, progress: 0 };

  /* restart a one-shot CSS animation class */
  const bump = (el, cls = "roi-bump") => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  function init() {
    const section = document.getElementById("roi-calculator");
    if (!section) return;
    const reduced = LiaMotion.prefersReducedMotion();
    const grid = section.querySelector(".grid");
    const leftCol = grid.children[0], rightCol = grid.children[1];
    const heading = leftCol.children[0], controlsWrap = leftCol.children[1];
    const controls = Array.from(controlsWrap.children);
    const sliders = [controls[0], controls[2], controls[3]].map((c) => ({
      track: c.querySelector(".relative"), fill: c.querySelector(".relative > div"), badge: c.querySelector(".relative > .absolute.right-3"), input: c.querySelector("input[type=range]"),
    }));
    const agentButtons = Array.from(controls[1].querySelectorAll("button"));
    const gaugeSvg = rightCol.querySelector("svg");
    const arc = gaugeSvg.querySelector('path[stroke="url(#arc-grad)"]');
    const track = gaugeSvg.querySelector(".roi-gauge-track");
    const ticks = Array.from(gaugeSvg.querySelectorAll("line"));
    const dots = Array.from(gaugeSvg.querySelectorAll("circle"));
    const [mainCard, statsCard] = Array.from(rightCol.children);
    const summary = rightCol.querySelector(".text-center");
    const bigNumber = summary.querySelector("p");
    const monthly = summary.querySelector("p:last-child");
    const rowWraps = Array.from(rightCol.querySelectorAll(".space-y-4.border-t > div"));
    const rows = rowWraps.map((r) => r.querySelector("span:last-child"));
    const statCells = Array.from(statsCard.children);
    const stats = Array.from(statsCard.querySelectorAll(".font-poppins"));
    const chip = statCells[1] && statCells[1].querySelector(".absolute");

    const state = { conversations: 10000, agents: 38, salary: 4167, minutes: 8 };
    const formats = [fmtK, fmtSalary, (v) => `${v}m`];
    const keys = ["conversations", "salary", "minutes"];

    function compute() {
      const { conversations: e, agents: i, salary: s, minutes: d } = state;
      const automated = Math.round(0.85 * e);
      const monthlySavings = Math.round(((s * i) / Math.max(1, e)) * automated * 0.2);
      const year1 = 12 * monthlySavings;
      const reassigned = Math.max(1, Math.round(0.24 * i));
      const payroll = s * i * 12;
      const pct = payroll > 0 ? Math.round((year1 / payroll) * 100) : 0;
      return { automatedMonthly: automated, monthlySavings, year1, fiveYear: 5 * year1, hoursSaved: Math.round((e * d * 0.35 * 12) / 60), agentsReassigned: reassigned, pctPayroll: pct, progress: Math.min(1, year1 / 6e5) };
    }

    /* ---------------------------------------------------------------- markup */
    /* the reveal is CSS-driven: clear the reference's inline starting styles */
    [heading, controlsWrap, rightCol].forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
    sliders.forEach((s) => { s.fill.classList.add("roi-fill"); s.track.classList.add("roi-track"); });
    dots[0] && dots[0].classList.add("roi-dot-glow");
    dots.forEach((c) => c.classList.add("roi-dot"));
    bigNumber.classList.add("roi-big");
    const title = heading.querySelector("h2");

    let staggerEls = [];
    const stage = (el, cls, delay) => { if (!el) return; el.classList.add(cls); el.style.setProperty("--roi-d", `${delay}s`); staggerEls.push(el); };

    if (!reduced) {
      section.classList.add("roi-anim");
      title.innerHTML = title.textContent.trim().split(/\s+/)
        .map((w) => `<span class="roi-mask"><span class="roi-mask__in">${w}</span></span>`).join(" ");
      title.querySelectorAll(".roi-mask__in").forEach((w, i) => w.style.setProperty("--roi-d", `${i * 0.09}s`));
      stage(heading.querySelector("p"), "roi-a", 0.22);
      controls.forEach((c, i) => stage(c, "roi-a", 0.32 + i * 0.1));
      [0, 2, 3].forEach((ci, i) => sliders[i].fill.style.setProperty("--roi-fill-d", `${0.5 + ci * 0.1}s`));
      agentButtons.forEach((b, i) => stage(b, "roi-pop", 0.5 + i * 0.06));
      stage(mainCard, "roi-a", 0.18);
      stage(statsCard, "roi-a", 0.42);
      /* ticks light up left to right across the dial */
      ticks.forEach((l) => {
        const x = Math.min(+l.getAttribute("x1"), +l.getAttribute("x2"));
        stage(l, "roi-tick", 0.4 + Math.max(0, Math.min(1, (x + 25) / 250)) * 0.9);
      });
      if (track) { track.setAttribute("pathLength", "1"); stage(track, "roi-draw", 0.35); }
      stage(summary, "roi-a", 0.6);
      rowWraps.forEach((r, i) => {
        stage(r, "roi-a", 0.8 + i * 0.1);
        stage(r.querySelector(".h-px"), "roi-line", 0.9 + i * 0.1);
      });
      statCells.forEach((c, i) => stage(c, "roi-a", 0.7 + i * 0.12));
      stage(chip, "roi-spin", 1.05);
    }

    /* ------------------------------------------------------------- painting */
    function paintControls() {
      sliders.forEach((s, i) => {
        const input = s.input, v = state[keys[i]];
        const pct = ((v - +input.min) / (+input.max - +input.min)) * 100;
        s.fill.style.width = `calc(${pct}% + 24px)`;
        const text = formats[i](v);
        if (s.badge.textContent !== text) { s.badge.textContent = text; if (started) bump(s.badge); }
        input.value = v;
      });
      agentButtons.forEach((b, i) => {
        const on = AGENT_OPTIONS[i] === state.agents;
        b.classList.toggle("bg-[#6d28d9]", on);
        b.classList.toggle("text-white", on);
        b.classList.toggle("shadow-[0_0_18px_rgba(109,40,217,0.45)]", on);
        b.classList.toggle("bg-foreground/[0.05]", !on);
        b.classList.toggle("text-foreground/35", !on);
        b.classList.toggle("hover:text-foreground/60", !on);
      });
    }

    let shown = { ...ZERO };
    function paint(v) {
      arc.setAttribute("stroke-dashoffset", String(ARC_LEN * (1 - v.progress)));
      const p = pt(170 + -160 * v.progress);
      const showDot = p.x > 3 && p.x < 197;
      dots.forEach((c) => { c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.style.display = showDot ? "" : "none"; });
      bigNumber.textContent = usd(Math.round(v.year1));
      monthly.textContent = `That's ${usd(Math.round(v.monthlySavings))} saved every month!`;
      rows[0].textContent = `${num(Math.round(v.automatedMonthly))} tickets`;
      rows[1].textContent = usd(Math.round(v.fiveYear));
      rows[2].textContent = `${Math.round(v.pctPayroll)}% of annual payroll`;
      stats[0].textContent = num(Math.round(v.hoursSaved));
      stats[1].textContent = num(Math.round(v.agentsReassigned));
    }

    let started = reduced, figures = null;
    function render({ duration = 0.9, delay = 0 } = {}) {
      paintControls();
      if (!started) return;
      const target = compute();
      figures && figures.stop();
      if (reduced) { shown = target; paint(target); return; }
      const from = { ...shown };
      if (Math.round(from.year1) !== target.year1 && duration < 1.5) bump(bigNumber, "roi-glow");
      figures = tween({
        duration, delay, ease: EASE,
        onUpdate(e) {
          const cur = {};
          for (const k in target) cur[k] = from[k] + (target[k] - from[k]) * e;
          shown = cur;
          paint(cur);
        },
      });
    }

    /* ---------------------------------------------------------------- input */
    sliders.forEach((s, i) => {
      s.input.addEventListener("input", () => { state[keys[i]] = Number(s.input.value); render({ duration: 0.6 }); });
      const on = () => s.track.classList.add("is-dragging");
      const off = () => s.track.classList.remove("is-dragging");
      s.input.addEventListener("pointerdown", on);
      ["pointerup", "pointercancel", "change", "blur"].forEach((ev) => s.input.addEventListener(ev, off));
    });
    agentButtons.forEach((b, i) => {
      b.addEventListener("click", () => { if (state.agents !== AGENT_OPTIONS[i]) { state.agents = AGENT_OPTIONS[i]; render(); } });
      b.addEventListener("pointerdown", () => LiaMotion.animate(b, { scale: 0.93 }, { duration: 0.1 }));
      b.addEventListener("pointerup", () => LiaMotion.animate(b, { scale: 1 }, { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }));
      b.addEventListener("pointerleave", () => LiaMotion.animate(b, { scale: 1 }, { duration: 0.15 }));
    });

    /* ---------------------------------------------------------------- intro */
    paint(ZERO);
    render();
    if (reduced) return;
    LiaMotion.inView(section, () => {
      section.classList.add("is-in");
      started = true;
      render({ duration: 1.8, delay: 0.55 });
      /* once everything has landed, drop the intro styles so hovers and presses
         answer instantly instead of waiting on the stagger delays */
      setTimeout(() => {
        section.classList.remove("roi-anim", "is-in");
        staggerEls.forEach((el) => el.style.removeProperty("--roi-d"));
        staggerEls = [];
      }, 2800);
    }, { once: true, margin: "0px 0px -20% 0px" });
  }

  window.LiaRoi = { init };
})();
