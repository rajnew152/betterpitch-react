/* palette: better-pitch warm (tools/palette.js; original in tools/palette-originals/) */
/* =============================================================================
   voice.js — hero voice-agent UI. The reference site streams audio to a
   private websocket backend (wss://lia-voice-uat…) via /api/voice-token. That
   service is not part of the replica, so the exact same state machine
   (idle → connecting → listening → processing → speaking → idle / error) is
   driven locally with the Web Speech API (recognition + synthesis) and a
   microphone level analyser. Every visual state of the original is reproduced.
   ============================================================================= */
(function () {
  "use strict";
  const { keyframeLoop, animate, set, clamp } = LiaMotion;
  const H = [0.8, 1.25, 1.8, 1.3, 0.95, 1.45, 1];
  const REPLY = "Thanks for trying Better Pitch. This page is a front-end preview, so the live voice agent is not connected here. Explore the features below to see what Better Pitch can do.";

  const activity = { intensity: 0, mode: "idle" };
  const state = {
    mode: "idle", userPreview: "", assistantPreview: "", errorText: "",
    supported: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
  };
  let ui = null;
  let stream = null, audioCtx = null, analyser = null, levelRaf = 0, outRaf = 0;
  let recognition = null, utterance = null, listenTimer = 0, speakWords = [], wordTimer = 0, revealed = 0;
  let barLoops = [], glowLoops = [], captionHide = 0, captionRaf = 0, captionShown = false, captionSuppressed = false;

  function statusText() {
    const m = state.mode;
    return m === "listening" ? "Listening..." : m === "processing" ? "Loading..." : m === "speaking" ? "Better Pitch is replying"
      : m === "error" ? "Voice unavailable" : state.supported ? "Tap the mic to talk" : "Voice input unsupported";
  }

  /* ---------- microphone level → activity.intensity (same maths as the site) ---------- */
  function startLevelMeter(s) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { activity.intensity = 0.22; return; }
    audioCtx = new AC();
    analyser = audioCtx.createAnalyser();
    const src = audioCtx.createMediaStreamSource(s);
    const data = new Uint8Array(512);
    analyser.fftSize = 512; analyser.smoothingTimeConstant = 0.84;
    src.connect(analyser);
    const loop = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (const v of data) { const n = (v - 128) / 128; sum += n * n; }
      activity.intensity = clamp(5.4 * Math.sqrt(sum / data.length), 0.08, 1);
      levelRaf = requestAnimationFrame(loop);
    };
    levelRaf = requestAnimationFrame(loop);
  }
  function stopLevelMeter() {
    cancelAnimationFrame(levelRaf); levelRaf = 0;
    if (audioCtx) { audioCtx.close().catch(() => {}); audioCtx = null; }
    analyser = null;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    activity.intensity = 0;
  }
  function startOutputMeter() {
    const t0 = performance.now();
    const loop = () => {
      const t = (performance.now() - t0) / 1000;
      // simulated playback level (the site reads it from the audio element)
      const lvl = 0.35 + 0.3 * Math.abs(Math.sin(t * 6.3)) * Math.abs(Math.sin(t * 1.7 + 0.4));
      activity.intensity = clamp(1.6 * lvl, 0.1, 1);
      outRaf = requestAnimationFrame(loop);
    };
    outRaf = requestAnimationFrame(loop);
  }
  function stopOutputMeter() { cancelAnimationFrame(outRaf); outRaf = 0; activity.intensity = 0; }

  /* ---------- mode transitions ---------- */
  /* the hero swaps its visual on this (js/hero.js: particle sphere ↔ voice orb) */
  const announce = (m) => window.dispatchEvent(new CustomEvent("lia:voicemode", { detail: { mode: m } }));

  function setMode(m) {
    if (state.mode === m) { render(); announce(m); return; }
    const prev = state.mode;
    state.mode = m;
    activity.mode = m;
    if (m === "idle" || m === "error") activity.intensity = 0;
    if (m === "listening") {
      if (stream) startLevelMeter(stream);
    } else if (prev === "listening") stopLevelMeter();
    if (m === "speaking") startOutputMeter(); else if (prev === "speaking") stopOutputMeter();
    render();
    announce(m);
  }

  async function startVoice() {
    if (!state.supported) {
      state.errorText = "This browser does not support voice input.";
      setMode("error");
      return;
    }
    state.errorText = ""; state.userPreview = ""; state.assistantPreview = "";
    setMode("connecting");
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      state.errorText = "Please check microphone access and try again.";
      setMode("error");
      return;
    }
    setMode("listening");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    let transcript = "";
    if (SR) {
      recognition = new SR();
      recognition.lang = "en-US"; recognition.interimResults = true; recognition.continuous = false;
      recognition.onresult = (ev) => {
        let text = "";
        for (let i = 0; i < ev.results.length; i++) text += ev.results[i][0].transcript;
        transcript = text.replace(/\s+/g, " ").trim();
        state.userPreview = transcript; render();
      };
      recognition.onerror = () => {};
      recognition.onend = () => {
        recognition = null;
        if (state.mode !== "listening") return;
        if (transcript) finishListening(); else stopVoice();
      };
      try { recognition.start(); } catch (e) { /* ignore */ }
    } else {
      listenTimer = setTimeout(() => state.mode === "listening" && finishListening(), 4500);
    }
  }

  function finishListening() {
    clearTimeout(listenTimer);
    setMode("processing");
    setTimeout(() => {
      if (state.mode !== "processing") return;
      speak(REPLY);
    }, 700);
  }

  function speak(text) {
    state.assistantPreview = text;
    speakWords = text.trim().split(/\s+/).filter(Boolean);
    revealed = 0;
    setMode("speaking");
    wordTimer = setInterval(() => { revealed = Math.min(revealed + 1, speakWords.length); render(); }, 320);
    const end = () => { if (state.mode === "speaking") stopVoice(); };
    if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
      utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1; utterance.pitch = 1;
      utterance.onend = end; utterance.onerror = end;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(end, speakWords.length * 320 + 900);
    }
  }

  function stopVoice() {
    clearTimeout(listenTimer); clearInterval(wordTimer);
    if (recognition) { try { recognition.abort(); } catch (e) {} recognition = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    utterance = null;
    stopLevelMeter(); stopOutputMeter();
    state.userPreview = ""; state.assistantPreview = "";
    setMode("idle");
  }

  function toggleVoice() {
    const m = state.mode;
    if (m === "listening" || m === "processing" || m === "speaking") stopVoice();
    else startVoice();
  }

  /* ---------- rendering of the hero overlay ---------- */
  function captionSource() {
    const m = state.mode;
    const text = m === "speaking" ? speakWords.slice(0, revealed).join(" ")
      : m === "processing" || m === "listening" ? state.userPreview
      : m === "error" ? (state.errorText || "Please check microphone access and try again.") : "";
    const words = text.trim().split(/\s+/).filter(Boolean).slice(-9).join(" ");
    const speaker = m === "speaking" ? "Better Pitch" : m === "listening" || m === "processing" ? "You" : null;
    return { text: words, speaker };
  }

  let lastCapTop = null, lastCapLeft = null;
  function positionCaption() {
    const cap = ui.caption, anchor = ui.anchor;
    if (!cap || !anchor || !captionShown) return;
    const r = anchor.getBoundingClientRect();
    const top = Math.min(r.top, window.innerHeight - 140), left = r.left;
    // only touch the DOM when the anchor actually moved
    if (top !== lastCapTop) { cap.style.top = `${top}px`; lastCapTop = top; }
    if (left !== lastCapLeft) { cap.style.left = `${left}px`; lastCapLeft = left; }
    captionRaf = requestAnimationFrame(positionCaption);
  }

  function hideCaption(delay) {
    clearTimeout(captionHide);
    captionHide = setTimeout(() => {
      captionShown = false;
      cancelAnimationFrame(captionRaf);
      animate(ui.caption, { opacity: 0, y: 4 }, { duration: 0.25, ease: "easeOut", onComplete() { if (!captionShown) ui.caption.style.display = "none"; } });
    }, delay);
  }

  /* the caption belongs to the orb: hide it while the scroll reveal has faded the orb out */
  function setCaptionSuppressed(s) {
    s = !!s;
    if (s === captionSuppressed) return;
    captionSuppressed = s;
    if (s) { if (captionShown) hideCaption(0); }
    else renderCaption();
  }

  function renderCaption() {
    const cap = ui.caption;
    if (!cap) return;
    const { text, speaker } = captionSource();
    clearTimeout(captionHide);
    if (captionSuppressed) { if (captionShown) hideCaption(0); return; }
    if (text) {
      cap.querySelector(".hero-caption-speaker").textContent = speaker || "";
      cap.querySelector(".hero-caption-speaker").style.display = speaker ? "" : "none";
      cap.querySelector(".hero-caption-text").textContent = text;
      if (!captionShown) {
        captionShown = true;
        cap.style.display = "";
        set(cap, { opacity: 0, y: 8 });
        animate(cap, { opacity: 1, y: 0 }, { duration: 0.25, ease: "easeOut" });
        cancelAnimationFrame(captionRaf); lastCapTop = lastCapLeft = null; positionCaption();
      }
    } else if (captionShown) {
      // the site keeps the last caption for 3s, then AnimatePresence exits it
      hideCaption(3000);
    }
  }

  function startBarLoops() {
    barLoops.forEach((l) => l.stop());
    const m = state.mode;
    const active = m === "listening" || m === "speaking";
    const duration = m === "speaking" ? 1.85 : m === "listening" ? 0.88 : m === "processing" ? 1.3 : 2.1;
    barLoops = ui.bars.map((bar, t) => {
      const frames = active ? [0.42, H[t], 0.56, 1.08] : m === "error" ? [0.3, 0.95, 0.45, 0.9]
        : m === "processing" ? [0.5, 0.9, 1.15, 1.35, 1.05, 0.82, 0.58] : [0.32, 0.56, 0.78, 0.96, 0.7, 0.52, 0.4];
      return keyframeLoop(bar, "scaleY", frames, { duration, delay: 0.06 * t, ease: "easeInOut", repeatType: "mirror" });
    });
  }
  function startGlowLoops() {
    glowLoops.forEach((l) => l.stop());
    const m = state.mode;
    const active = m === "listening" || m === "speaking";
    const duration = active ? 1 : 2.2;
    glowLoops = [
      keyframeLoop(ui.glow, "opacity", active ? [0.3, 0.8, 0.4] : [0.2, 0.5, 0.2], { duration, ease: "easeInOut" }),
      keyframeLoop(ui.glow, "scale", active ? [0.95, 1.25, 0.98] : [0.9, 1.1, 0.95], { duration, ease: "easeInOut" }),
    ];
  }

  const MIC = '<path d="M12 19v3"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><rect x="9" y="2" width="6" height="13" rx="3"></rect>';
  const PAUSE = '<rect x="14" y="3" width="5" height="18" rx="1"></rect><rect x="5" y="3" width="5" height="18" rx="1"></rect>';

  let lastMode = null;
  function render() {
    if (!ui) return;
    const m = state.mode;
    ui.status.textContent = statusText();
    if (m !== lastMode) {
      lastMode = m;
      // connecting spinner vs. the normal stack
      ui.stack.style.display = m === "connecting" ? "none" : "";
      ui.spinner.style.display = m === "connecting" ? "" : "none";
      // processing dots
      ui.dots.style.display = m === "processing" ? "" : "none";
      // button border + icon + label
      ui.button.classList.remove("border-[#c832ff]", "border-rose-500/70", "border-[#a420d1]");
      ui.button.classList.add(m === "listening" ? "border-[#c832ff]" : m === "error" ? "border-rose-500/70" : "border-[#a420d1]");
      ui.button.setAttribute("aria-label", m === "listening" ? "Stop voice input" : m === "speaking" ? "Stop reply" : "Start voice input");
      ui.icon.innerHTML = m === "speaking" ? PAUSE : MIC;
      ui.icon.setAttribute("class", `lucide ${m === "speaking" ? "lucide-pause" : "lucide-mic"} relative h-5 w-5 text-[#f2a8ff] light:text-[#6b21a8]`);
      // sonar rings while LIA speaks
      ui.sonar.style.display = m === "speaking" ? "" : "none";
      if (m !== "connecting") { startBarLoops(); startGlowLoops(); }
    }
    renderCaption();
  }

  function init(hero) {
    const y = hero.querySelector(".relative.z-20.order-1 > div");
    if (!y) return;
    const overlay = y.querySelector(":scope > .absolute.left-1\\/2.top-1\\/2");
    const stack = overlay; // bars, status text and mic button live directly in the overlay
    const stackChildren = Array.from(overlay.children);

    const spinner = document.createElement("div");
    spinner.setAttribute("role", "status"); spinner.setAttribute("aria-label", "Connecting");
    spinner.className = "h-9 w-9 animate-spin rounded-full border-2 border-[#a420d1]/20 border-t-[#c832ff] light:border-[#a420d1]/15 light:border-t-[#a420d1] lg:h-10 lg:w-10";
    spinner.style.display = "none";
    overlay.appendChild(spinner);

    const textCol = stack.querySelector(".pointer-events-none.flex.flex-col");
    const dots = document.createElement("div");
    dots.className = "flex items-center gap-1 hero-processing-dots";
    dots.innerHTML = '<span class="block h-1 w-1 rounded-full bg-foreground/70"></span><span class="block h-1 w-1 rounded-full bg-foreground/70"></span><span class="block h-1 w-1 rounded-full bg-foreground/70"></span>';
    dots.style.display = "none";
    textCol.appendChild(dots);

    const sonar = document.createElement("div");
    sonar.className = "pointer-events-none absolute inset-0 flex items-center justify-center";
    sonar.innerHTML = [0, 1, 2, 3].map((i) => `<div class="absolute rounded-full border border-violet-400/60" style="width:64%;height:64%;animation:lia-sonar 5s ease-out ${(1.25 * i).toFixed(3)}s infinite"></div>`).join("");
    sonar.style.display = "none";
    const rings = y.querySelector(":scope > .pointer-events-none.absolute.inset-0");
    rings.insertAdjacentElement("afterend", sonar);

    const button = stack.querySelector("button");
    ui = {
      overlay, stack: { style: { set display(v) { stackChildren.forEach((c) => { c.style.display = v; }); } } },
      spinner, dots, sonar, button,
      bars: Array.from(stack.querySelectorAll(".flex.items-center.gap-1\\.5 > span")),
      status: stack.querySelector("p"),
      glow: button.querySelector("span"),
      icon: button.querySelector("svg"),
      anchor: y.querySelector(":scope > .top-full"),
      caption: document.getElementById("hero-caption"),
    };
    ui.bars.forEach((b) => { b.style.transformOrigin = "50% 50%"; });

    /* button: whileHover scale 1.05 / whileTap .98 + click */
    button.addEventListener("mouseenter", () => animate(button, { scale: 1.05 }, { duration: 0.2, ease: "easeOut" }));
    button.addEventListener("mouseleave", () => animate(button, { scale: 1 }, { duration: 0.2, ease: "easeOut" }));
    button.addEventListener("pointerdown", () => animate(button, { scale: 0.98 }, { duration: 0.1, ease: "easeOut" }));
    button.addEventListener("pointerup", () => animate(button, { scale: 1.05 }, { duration: 0.15, ease: "easeOut" }));
    button.addEventListener("click", toggleVoice);

    /* rings react to the voice level (intensity), identical constants */
    const ringEls = Array.from(rings.children);
    const cfg = [[0.2, 0.88, 0.065, 18], [0.46, 1, 0.048, 24], [0.4, 0.94, 0.03, 32], [0.03, 0.38, 0.04, 14], [0.01, 0.24, 0.032, 9]];
    let smoothed = 0, ringsVisible = true, ringRaf = 0, lastRingKey = "";
    const ringLoop = () => {
      const lvl = clamp(activity.intensity);
      const mode = activity.mode;
      smoothed = 0.65 * smoothed + 0.35 * lvl;
      // idle most of the time: skip the style writes when nothing changed
      const key = mode + ":" + smoothed.toFixed(3);
      if (key === lastRingKey) { if (ringsVisible) ringRaf = requestAnimationFrame(ringLoop); return; }
      lastRingKey = key;
      ringEls.forEach((el, i) => {
        if (mode === "speaking") { el.style.opacity = "0.07"; el.style.transform = "scale(1)"; el.style.boxShadow = ""; return; }
        const [a, b, sc, sh] = cfg[i] || [0.1, 0.5, 0.03, 10];
        el.style.opacity = (a + smoothed * (b - a)).toFixed(3);
        el.style.transform = `scale(${(1 + smoothed * sc).toFixed(4)})`;
        el.style.boxShadow = smoothed > 0.05
          ? `0 0 ${(smoothed * sh).toFixed(1)}px rgba(255,70,109,${(0.6 * smoothed).toFixed(3)}),0 0 ${(smoothed * sh * 2).toFixed(1)}px rgba(255,30,111,${(0.28 * smoothed).toFixed(3)})`
          : "";
      });
      if (ringsVisible) ringRaf = requestAnimationFrame(ringLoop);
    };
    new IntersectionObserver(([e]) => { const was = ringsVisible; ringsVisible = e.isIntersecting; if (ringsVisible && !was) ringLoop(); }, { threshold: 0 }).observe(rings);
    ringLoop();

    render();
    window.addEventListener("beforeunload", stopVoice);
  }

  window.LiaVoice = { init, activity, state, startVoice, stopVoice, toggleVoice, setCaptionSuppressed };
})();
