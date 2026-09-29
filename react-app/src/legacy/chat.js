import markWhiteUrl from "../assets/logo/betterpitch-mark-white.svg"; /* React build: bundler-resolved asset URL */
/* palette: better-pitch warm (tools/palette.js; original in tools/palette-originals/) */
/* =============================================================================
   chat.js — floating chat launcher (orb → input pill) and the full-screen chat
   overlay. The reference site streams answers from a private LIA backend; the
   replica reproduces the complete UI, message flow, history and streaming
   presentation with a local reply.
   ============================================================================= */
(function () {
  "use strict";
  const { animate, set, createSpring, tween } = LiaMotion;
  const HISTORY_KEY = "bp-chat-history";
  const REPLY = "Thanks for reaching out! This page is a front-end preview of Better Pitch, so the live assistant is not connected here. On a live deployment I can qualify leads, answer support questions, book appointments and more — feel free to explore the features on this page.";

  function init() {
    const launcher = document.getElementById("chat-launcher");
    const backdrop = document.getElementById("chat-backdrop");
    const morph = document.getElementById("chat-morph");
    const overlay = document.getElementById("chat-overlay");
    if (!launcher || !morph || !overlay) return;

    const orbInner = morph.querySelector(".cp-orb-inner");
    const pillInner = morph.querySelector(".cp-pill-inner");
    const pillInput = pillInner.querySelector("input");
    const pillSend = pillInner.querySelector(".cp-send-btn");
    const pillHistory = pillInner.querySelector(".cp-history-btn");
    const pillVoice = pillInner.querySelector(".cp-voice-btn");
    const badge = launcher.querySelector(".cp-badge");
    const rings = launcher.querySelectorAll(".cp-ring");
    const greeting = overlay.querySelector(".fc-greeting");
    const messagesEl = overlay.querySelector(".fc-messages");
    const textarea = overlay.querySelector(".fc-textarea");
    const fcSend = overlay.querySelector(".fc-send-btn");
    const fcVoice = overlay.querySelector(".fc-voice-btn");
    const fcClose = overlay.querySelector(".fc-close");
    const fcRetry = overlay.querySelector(".fc-retry");

    let messages = [], sessions = loadSessions(), expanded = false, panelOpen = false, streaming = null, savedScroll = 0;

    function loadSessions() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch (e) { return []; } }
    function saveSession() {
      if (!messages.length) return;
      const first = messages.find((m) => m.role === "user");
      sessions = [{ id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()), startedAt: Date.now(), preview: (first ? first.text : "Chat").slice(0, 80), messages }, ...sessions].slice(0, 20);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions)); } catch (e) { /* ignore */ }
    }

    /* ---------- launcher morph (framer layout spring: stiffness 340, damping 30) ---------- */
    const targetWidth = () => Math.min(window.innerWidth - 32, 896);
    const spring = createSpring(62, { stiffness: 340, damping: 30, restDelta: 0.5, restSpeed: 0.5 });
    let raf = 0, lastT = 0;
    function tickWidth(now) {
      const dt = Math.min(0.064, (now - lastT) / 1000); lastT = now;
      const done = spring.step(dt);
      morph.style.width = `${spring.value}px`;
      raf = done ? 0 : requestAnimationFrame(tickWidth);
      /* phones park the resting orb in the corner (css/mobile.css); it stays centred
         until the pill has fully shrunk back */
      if (done && !expanded) launcher.classList.remove("is-expanded");
    }
    function setExpanded(next) {
      if (expanded === next) return;
      expanded = next;
      if (next) launcher.classList.add("is-expanded");
      spring.target = next ? targetWidth() : 62;
      if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tickWidth); }
      morph.style.cursor = next ? "default" : "pointer";
      backdrop.style.display = next ? "" : "none";
      // whileHover is disabled while expanded → framer animates the scale back to 1
      if (next) animate(morph, { scale: 1 }, { duration: 0.2, ease: "easeOut" });
      rings.forEach((r) => animate(r, { opacity: next ? 0 : 1 }, { duration: 0.2 }));
      if (next) {
        animate(orbInner, { opacity: 0 }, { duration: 0.12, onComplete() { orbInner.style.display = "none"; } });
        pillInner.style.display = ""; set(pillInner, { opacity: 0 });
        animate(pillInner, { opacity: 1 }, { duration: 0.18, delay: 0.12 });
        setTimeout(() => pillInput.focus(), 80);
      } else {
        animate(pillInner, { opacity: 0 }, { duration: 0.12, onComplete() { pillInner.style.display = "none"; } });
        orbInner.style.display = ""; set(orbInner, { opacity: 0 });
        animate(orbInner, { opacity: 1 }, { duration: 0.12, delay: 0.12 });
        pillInput.value = ""; syncPillSend();
      }
      updateBadge();
    }
    morph.addEventListener("click", () => { if (!expanded) setExpanded(true); });
    morph.addEventListener("mouseenter", () => { if (!expanded) animate(morph, { scale: 1.06 }, { duration: 0.2, ease: "easeOut" }); });
    morph.addEventListener("mouseleave", () => animate(morph, { scale: 1 }, { duration: 0.2, ease: "easeOut" }));
    morph.addEventListener("pointerdown", () => { if (!expanded) animate(morph, { scale: 0.96 }, { duration: 0.1 }); });
    morph.addEventListener("pointerup", () => { if (!expanded) animate(morph, { scale: 1.06 }, { duration: 0.15 }); });
    backdrop.addEventListener("click", () => setExpanded(false));
    window.addEventListener("scroll", () => { if (expanded && document.activeElement !== pillInput && !pillInput.value.trim()) setExpanded(false); }, { passive: true });

    function syncPillSend() {
      const has = !!pillInput.value.trim();
      pillSend.disabled = !has;
      pillSend.style.background = has ? "linear-gradient(145deg, #ed3a7e 0%, #b62158 100%)" : "rgba(217,40,105,0.20)";
      pillSend.style.boxShadow = has ? "0 0 22px rgba(237,58,126,0.65), inset 0 1px 0 rgba(255,255,255,0.16)" : "none";
    }
    pillInput.addEventListener("input", syncPillSend);
    pillInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && pillInput.value.trim()) sendFromPill();
      if (e.key === "Escape") setExpanded(false);
    });
    pillSend.addEventListener("click", sendFromPill);
    pillSend.addEventListener("pointerdown", () => animate(pillSend, { scale: 0.88 }, { duration: 0.1 }));
    pillSend.addEventListener("pointerup", () => animate(pillSend, { scale: 1 }, { duration: 0.15 }));
    pillHistory.addEventListener("click", () => { setExpanded(false); openPanel(); });
    const gotoVoice = () => {
      setExpanded(false);
      if (panelOpen) closePanel();
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      if (window.LiaVoice) LiaVoice.startVoice();
    };
    pillVoice.addEventListener("click", gotoVoice);
    fcVoice.addEventListener("click", gotoVoice);

    function updateBadge() {
      const n = messages.length;
      badge.style.display = n > 0 && !expanded ? "" : "none";
      badge.textContent = n > 9 ? "9+" : String(n);
      pillHistory.disabled = messages.length === 0 && sessions.length === 0;
    }

    /* keyboard-safe offset (visualViewport) */
    if (window.visualViewport) {
      const vv = window.visualViewport;
      const upd = () => { const off = Math.max(0, window.innerHeight - vv.height - vv.offsetTop); launcher.style.transform = `translateX(-50%) translateY(-${off}px)`; };
      vv.addEventListener("resize", upd); vv.addEventListener("scroll", upd); upd();
    }

    async function sendFromPill() {
      const text = pillInput.value.trim();
      if (!text) return;
      pillInput.value = ""; syncPillSend();
      setExpanded(false);
      openPanel();
      await sendMessage(text);
    }

    /* ---------- full-screen panel ---------- */
    function openPanel() {
      if (panelOpen) return;
      panelOpen = true;
      savedScroll = window.scrollY;
      document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; document.body.style.top = `-${savedScroll}px`; document.body.style.width = "100%";
      launcher.style.display = "none"; backdrop.style.display = "none";
      overlay.style.display = ""; set(overlay, { opacity: 0 });
      animate(overlay, { opacity: 1 }, { duration: 0.3, ease: [0.16, 1, 0.3, 1] });
      renderMessages();
      if (!messages.length) { set(greeting, { opacity: 0, y: 20 }); animate(greeting, { opacity: 1, y: 0 }, { duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }); }
      setTimeout(() => textarea.focus(), 280);
    }
    function closePanel() {
      if (!panelOpen) return;
      panelOpen = false;
      if (messages.length) saveSession();
      animate(overlay, { opacity: 0 }, { duration: 0.3, ease: [0.16, 1, 0.3, 1], onComplete() { overlay.style.display = "none"; } });
      document.body.style.overflow = ""; document.body.style.position = ""; document.body.style.top = ""; document.body.style.width = "";
      window.scrollTo(0, savedScroll);
      launcher.style.display = "";
      updateBadge();
    }
    fcClose.addEventListener("click", closePanel);
    [fcClose, fcRetry].forEach((b) => {
      b.addEventListener("mouseenter", () => animate(b, { scale: 1.1 }, { duration: 0.2 }));
      b.addEventListener("mouseleave", () => animate(b, { scale: 1 }, { duration: 0.2 }));
    });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && panelOpen) closePanel(); });

    const AVATAR = '<div class="cp-avatar shrink-0" style="width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center"><img src="' + markWhiteUrl + '" alt="Better Pitch" style="width:20px;height:20px;object-fit:contain"/></div>';
    const USER_STYLE = "max-width:72%;background:rgba(var(--fg-rgb), 0.06);border:1px solid rgba(var(--fg-rgb), 0.10);border-bottom-right-radius:4px;padding:10px 16px;color:rgba(var(--fg-rgb), 0.82)";
    const BOT_STYLE = "max-width:80%;background:rgba(var(--fg-rgb), 0.038);border:1px solid rgba(var(--fg-rgb), 0.07);border-left:2px solid rgba(211,38,49,0.5);border-bottom-left-radius:4px;padding:12px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(var(--fg-rgb), 0.05);color:rgba(var(--fg-rgb), 0.78)";
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    function messageNode(m) {
      const row = document.createElement("div");
      row.className = `flex items-end gap-3 ${m.role === "user" ? "justify-end" : "flex-row"}`;
      row.innerHTML = `${m.role === "assistant" ? AVATAR : ""}<div class="cp-msg-text text-[14px] leading-[1.65] rounded-[18px] ${m.role === "assistant" ? "cp-msg-blur" : ""}" style="${m.role === "user" ? USER_STYLE : BOT_STYLE}"><p>${esc(m.text)}</p></div>`;
      set(row, { opacity: 0, y: 10 });
      animate(row, { opacity: 1, y: 0 }, { duration: 0.22, ease: "easeOut" });
      return row;
    }
    function renderMessages() {
      const hasMsgs = messages.length > 0;
      greeting.style.display = hasMsgs ? "none" : "";
      messagesEl.style.display = hasMsgs ? "" : "none";
      messagesEl.innerHTML = "";
      messages.forEach((m) => messagesEl.appendChild(messageNode(m)));
      fcRetry.style.display = messages.length && messages[messages.length - 1].role === "assistant" ? "" : "none";
      const pending = messages.length && messages[messages.length - 1].role === "user";
      textarea.disabled = !!pending; syncFcSend();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
    function syncFcSend() {
      const has = !!textarea.value.trim(), pending = messages.length && messages[messages.length - 1].role === "user";
      fcSend.disabled = !has || !!pending;
      fcSend.classList.toggle("cp-send-idle-icon", !has);
      fcSend.style.cssText = has ? "background:linear-gradient(145deg, #ed3a7e 0%, #b62158 100%);box-shadow:0 0 22px rgba(237,58,126,0.65), inset 0 1px 0 rgba(255,255,255,0.16);color:#fff" : "background:rgba(217,40,105,0.20);border:1px solid rgba(217,40,105,0.22)";
    }
    textarea.addEventListener("input", () => { textarea.style.height = "auto"; textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; syncFcSend(); });
    textarea.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendFromPanel(); } });
    fcSend.addEventListener("click", sendFromPanel);
    fcSend.addEventListener("pointerdown", () => animate(fcSend, { scale: 0.88 }, { duration: 0.1 }));
    fcSend.addEventListener("pointerup", () => animate(fcSend, { scale: 1 }, { duration: 0.15 }));
    fcRetry.addEventListener("click", () => {
      let idx = -1;
      for (let i = messages.length - 1; i >= 0; i--) if (messages[i].role === "user") { idx = i; break; }
      if (idx < 0) return;
      messages = messages.slice(0, idx + 1);
      renderMessages(); respond();
    });

    async function sendFromPanel() {
      const text = textarea.value.trim();
      if (!text || (messages.length && messages[messages.length - 1].role === "user")) return;
      textarea.value = ""; textarea.style.height = "auto";
      await sendMessage(text);
    }
    async function sendMessage(text) {
      messages.push({ role: "user", text });
      renderMessages(); updateBadge();
      await respond();
    }

    /* typing indicator → streamed reply (same 20ms/12% chunk reveal as the site) */
    function respond() {
      return new Promise((resolve) => {
        const row = document.createElement("div");
        row.className = "flex items-end gap-3";
        row.innerHTML = `${AVATAR}<div class="cp-msg-blur flex items-center gap-1.5 rounded-[18px] px-4 py-3.5" style="background:rgba(var(--fg-rgb), 0.038);border:1px solid rgba(var(--fg-rgb), 0.07);border-left:2px solid rgba(211,38,49,0.5);border-bottom-left-radius:4px"><span class="cp-typing-dot block h-1.5 w-1.5 rounded-full"></span><span class="cp-typing-dot block h-1.5 w-1.5 rounded-full"></span><span class="cp-typing-dot block h-1.5 w-1.5 rounded-full"></span></div>`;
        set(row, { opacity: 0, y: 8 }); animate(row, { opacity: 1, y: 0 }, { duration: 0.22 });
        messagesEl.appendChild(row); messagesEl.scrollTop = messagesEl.scrollHeight;
        setTimeout(() => {
          const bubble = row.lastElementChild;
          bubble.className = "cp-msg-text cp-msg-blur text-[14px] leading-[1.65] rounded-[18px]";
          bubble.style.cssText = BOT_STYLE;
          bubble.innerHTML = '<p></p><span class="cp-caret"></span>';
          const p = bubble.firstElementChild;
          let shown = 0;
          streaming = setInterval(() => {
            const left = REPLY.length - shown;
            if (left <= 0) {
              clearInterval(streaming); streaming = null;
              bubble.querySelector(".cp-caret").remove();
              messages.push({ role: "assistant", text: REPLY });
              renderMessages(); updateBadge(); resolve();
              return;
            }
            shown += Math.min(6, Math.max(1, Math.ceil(0.12 * left)));
            p.textContent = REPLY.slice(0, shown);
            messagesEl.scrollTop = messagesEl.scrollHeight;
          }, 20);
        }, 900);
      });
    }

    updateBadge();
  }

  window.LiaChat = { init };
})();
