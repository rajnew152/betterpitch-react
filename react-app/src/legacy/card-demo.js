/* =============================================================================
   card-demo.js — "Try it with your business" on every service card of the hero
   carousel. An enterprise enters its name and a short description, then talks
   to a voice agent that speaks for that business and runs the card's service
   script (sales call, support desk, EMI reminder, …).

   Voice runs entirely in the browser: Web Speech recognition hears the user
   (Chrome / Edge) and speech synthesis speaks the replies; a text box is the
   fallback everywhere. There is no backend in this project, so the agent's
   replies come from the per-service scripts below, personalised with the
   enterprise's name and description.
   ============================================================================= */
(function () {
  "use strict";

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;
  const LANG = /^en/i.test(navigator.language || "") ? navigator.language : "en-US";

  const ICON = {
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  };

  /* ------------------------------------------------------------ agent scripts */
  /* {name} = enterprise name, {about} = its description as a sentence */
  const SCRIPTS = {
    "Sales & Leads": {
      greet: "Hi! This is the assistant from {name}. {about} I'm calling about your enquiry. Do you have two minutes?",
      steps: [
        "Great. What are you looking for right now, and what's your timeline?",
        "Got it. Roughly what budget do you have in mind?",
        "That fits well with what we offer. Shall I book a quick call with our specialist, say tomorrow at 11 AM?",
        "Perfect, you're booked. You'll get a WhatsApp confirmation in a moment. Anything else I can help with?",
      ],
    },
    "Customer Support": {
      greet: "Hello, thanks for calling {name} support. {about} How can I help you today?",
      steps: [
        "I'm sorry to hear that. Could you share your order or account number so I can check?",
        "Thank you, I've found it. I've updated your request and you'll get a confirmation by SMS shortly.",
        "Is there anything else I can help you with today?",
      ],
    },
    "Collections & EMI": {
      greet: "Namaste, this is a courtesy call from {name}. {about} Your EMI of four thousand one hundred and twenty rupees is due. Is this a good time to talk?",
      steps: [
        "I understand, no rush. By when would you be able to make the payment?",
        "Noted, I've recorded that date. Shall I send a UPI payment link on WhatsApp?",
        "Done, the link is on its way. Thank you for your time, and have a good day.",
      ],
    },
    "Appointments": {
      greet: "Hi, this is {name}. {about} I'm calling to confirm your appointment on Tuesday at 10:30 AM. Will you be able to make it?",
      steps: [
        "No problem. Which day and time would work better for you?",
        "Done, I've moved your appointment. You'll get a reminder the day before.",
        "Is there anything else I can help you with?",
      ],
    },
    "Feedback & CSAT": {
      greet: "Hi, this is {name}. {about} We'd love your feedback on your recent experience. On a scale of one to five, how would you rate us?",
      steps: [
        "Thank you! What is the one thing we could do better?",
        "That's really helpful, I've shared it with the team.",
        "Thanks for your time. Have a great day!",
      ],
    },
    "Recruitment": {
      greet: "Hi, this is the recruiting assistant at {name}. {about} Thanks for applying! Do you have a few minutes for a quick screening?",
      steps: [
        "Great. Could you tell me about your current role and experience?",
        "Thanks. What is your notice period, and when could you start?",
        "Perfect. I'll share your profile with the hiring team, and they'll reach out within two days.",
      ],
    },
    "E-commerce COD & RTO": {
      greet: "Hi, this is {name}. {about} You placed a cash on delivery order number 4821. Can you confirm you'd like it delivered?",
      steps: [
        "Thank you, it's confirmed. Would you like to prepay online and save twenty rupees?",
        "Done. Your order ships today, and tracking will come on WhatsApp.",
        "Anything else I can help you with?",
      ],
    },
    "Real Estate": {
      greet: "Hi, this is {name}. {about} Thanks for your enquiry! Are you looking to buy or rent, and in which area?",
      steps: [
        "Lovely. What budget and size are you considering?",
        "I have a few matching options, and I'm sending photos on WhatsApp now. Would you like to book a site visit this weekend?",
        "Your site visit is booked for Saturday at 11 AM. See you there!",
      ],
    },
  };
  const FALLBACK = {
    greet: "Hi, this is {name}. {about} How can I help you today?",
    steps: ["Thanks, got it. Could you tell me a little more?", "Understood. I've noted that down for the team.", "Anything else I can help with?"],
  };

  /* questions any agent answers, whatever the step */
  const INTENTS = [
    [/\b(human|real person|representative|manager|someone else|talk to (a|an) (agent|person))\b/i,
      "Of course. I'm connecting you to a team member at {name} now, with this whole conversation attached."],
    [/\b(price|pricing|cost|how much|charges?|fees?)\b/i,
      "Pricing depends on what you need. {name} will send you a personalised quote on WhatsApp right after this call."],
    [/\b(who are you|what do you do|what does .* do|about (you|your company)|what is this)\b/i,
      "I'm the voice assistant for {name}. {about}"],
    [/\b(are you (a )?(bot|robot|ai|human))\b/i,
      "I'm an AI voice agent for {name}, powered by Better Pitch. I can hand you to a person any time."],
    [/\b(bye|goodbye|that'?s all|nothing else|no thanks?)\b/i,
      "Thank you for talking to {name}. Have a great day!"],
  ];

  const sentence = (s) => { s = s.trim().replace(/\s+/g, " "); if (!s) return ""; s = s[0].toUpperCase() + s.slice(1); return /[.!?]$/.test(s) ? s : s + "."; };
  const fill = (t, biz) => t.replace(/\{name\}/g, biz.name).replace(/\{about\}\s?/g, biz.about ? biz.about + " " : "").replace(/\s+/g, " ").trim();
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* one speaking / listening demo at a time across all cards */
  let active = null;

  /* while a demo is open the page holds still (the cards move with scroll), except
     for scrolling inside the chat transcript */
  let openDemo = null;
  const inLog = (t) => t instanceof Element && !!t.closest(".bp-demo__log");
  const holdWheel = (e) => { if (openDemo && !inLog(e.target)) { e.preventDefault(); e.stopImmediatePropagation(); } };
  const holdTouch = (e) => { if (openDemo && !inLog(e.target) && e.cancelable) e.preventDefault(); };
  const holdKeys = (e) => {
    if (!openDemo || /^(INPUT|TEXTAREA)$/.test(e.target && e.target.tagName)) return;
    if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) e.preventDefault();
  };
  window.addEventListener("wheel", holdWheel, { capture: true, passive: false });
  window.addEventListener("touchmove", holdTouch, { capture: true, passive: false });
  window.addEventListener("keydown", holdKeys, { capture: true });

  function pickVoice() {
    if (!synth) return null;
    const voices = synth.getVoices();
    return voices.find((v) => v.lang === LANG && /natural|google|microsoft/i.test(v.name))
      || voices.find((v) => v.lang === LANG) || voices.find((v) => /^en/i.test(v.lang)) || null;
  }

  function build(card, service) {
    const script = SCRIPTS[service] || FALLBACK;
    const root = document.createElement("div");
    root.className = "bp-demo";
    root.dataset.state = "idle";
    root.innerHTML = `
      <button type="button" class="bp-demo__open">${ICON.mic}<span>Try it with your business</span></button>
      <div class="bp-demo__panel" role="dialog" aria-label="Try ${esc(service)} with your business" aria-hidden="true">
        <div class="bp-demo__head">
          <div><div class="bp-demo__kicker">Live demo · ${esc(service)}</div><div class="bp-demo__title">Hear your own voice agent</div></div>
          <button type="button" class="bp-demo__close" aria-label="Close demo">✕</button>
        </div>
        <form class="bp-demo__form" novalidate>
          <label class="bp-demo__label">Enterprise name
            <input class="bp-demo__input" name="name" maxlength="60" autocomplete="organization" placeholder="e.g. Acme Realty"/>
          </label>
          <label class="bp-demo__label">Short description
            <textarea class="bp-demo__input" name="about" maxlength="180" rows="3" placeholder="e.g. We help families find apartments in Pune."></textarea>
          </label>
          <div class="bp-demo__error" aria-live="polite"></div>
          <button type="submit" class="bp-demo__primary">${ICON.phone}<span>Start voice chat</span></button>
        </form>
        <div class="bp-demo__chat">
          <div class="bp-demo__status"><span class="bp-demo__dot"></span><span class="bp-demo__status-text">Connecting…</span></div>
          <div class="bp-demo__log" aria-live="polite"></div>
          <div class="bp-demo__bar">
            <button type="button" class="bp-demo__icon bp-demo__mic" aria-label="Talk">${ICON.mic}</button>
            <input class="bp-demo__text" placeholder="Or type your reply…" maxlength="200"/>
            <button type="button" class="bp-demo__icon bp-demo__send" aria-label="Send">${ICON.send}</button>
          </div>
          <button type="button" class="bp-demo__end">End call</button>
        </div>
      </div>`;
    card.appendChild(root);

    const $ = (s) => root.querySelector(s);
    const panel = $(".bp-demo__panel"), form = $(".bp-demo__form"), err = $(".bp-demo__error");
    const log = $(".bp-demo__log"), statusText = $(".bp-demo__status-text");
    const mic = $(".bp-demo__mic"), text = $(".bp-demo__text");
    let biz = null, step = 0, rec = null, interim = null, callOn = false, session = 0;

    if (!SR) { mic.disabled = true; mic.title = "Voice input needs Chrome or Edge — type instead"; }

    const setState = (s, label) => { root.dataset.state = s; statusText.textContent = label; };
    const add = (who, msg) => {
      const el = document.createElement("div");
      el.className = `bp-demo__msg bp-demo__msg--${who}`;
      el.textContent = msg;
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
      return el;
    };

    function stopListening() {
      if (rec) { rec.onend = null; try { rec.abort(); } catch (e) { /* already stopped */ } rec = null; }
      if (interim) { interim.remove(); interim = null; }
    }
    function stopAll() {
      session++;
      callOn = false;
      stopListening();
      if (synth && active === root) synth.cancel();
      if (active === root) active = null;
      if (biz) setState("idle", SR ? "Tap the mic to talk" : "Type your reply below");
    }

    function speak(msg) {
      add("agent", msg);
      const mine = session;
      if (!synth) { afterSpeak(mine); return; }
      if (active && active !== root) active.__bpStop();
      active = root;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(msg);
      u.lang = LANG; u.rate = 1.02; u.pitch = 1;
      const v = pickVoice(); if (v) u.voice = v;
      setState("speaking", `${biz.name} agent is speaking…`);
      let done = false;
      const finish = () => { if (done) return; done = true; if (mine === session) afterSpeak(mine); };
      u.onend = u.onerror = finish;
      synth.speak(u);
      /* some browsers drop the end event (or have no voices at all): poll as a backstop */
      const started = performance.now();
      const cap = 2500 + msg.split(/\s+/).length * 480; // generous speaking-time ceiling
      const watch = () => {
        if (done || mine !== session) return;
        const t = performance.now() - started;
        if ((!synth.speaking && !synth.pending && t > 600) || t > cap) return finish();
        setTimeout(watch, 400);
      };
      setTimeout(watch, 400);
    }
    function afterSpeak(mine) {
      if (mine !== session) return;
      if (callOn && SR) listen(); else setState("idle", SR ? "Tap the mic to talk" : "Type your reply below");
    }

    function listen() {
      if (!SR) return;
      stopListening();
      if (active && active !== root) active.__bpStop();
      active = root;
      if (synth) synth.cancel();
      rec = new SR();
      rec.lang = LANG; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
      let finalText = "";
      rec.onresult = (e) => {
        let live = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) finalText += e.results[i][0].transcript; else live += e.results[i][0].transcript;
        }
        if (live) { if (!interim) interim = add("user", ""); interim.classList.add("bp-demo__msg--interim"); interim.textContent = live; log.scrollTop = log.scrollHeight; }
      };
      rec.onerror = (e) => {
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          callOn = false; add("note", "Microphone access was blocked — you can type your replies instead.");
        }
      };
      rec.onend = () => {
        rec = null;
        if (interim) { interim.remove(); interim = null; }
        if (finalText.trim()) handle(finalText.trim());
        else if (callOn) setState("idle", "Didn't catch that — tap the mic to talk");
        else setState("idle", "Tap the mic to talk");
        if (!finalText.trim()) callOn = false;
      };
      setState("listening", "Listening… speak now");
      try { rec.start(); } catch (e) { setState("idle", "Tap the mic to talk"); }
    }

    function reply(said) {
      for (const [re, t] of INTENTS) if (re.test(said)) return fill(t, biz);
      const t = script.steps[Math.min(step, script.steps.length - 1)];
      step++;
      return fill(t, biz);
    }
    function handle(said) {
      add("user", said);
      setState("thinking", "Thinking…");
      const mine = session;
      setTimeout(() => { if (mine === session) speak(reply(said)); }, 550);
    }

    function open() {
      if (openDemo && openDemo !== root) openDemo.__bpClose();
      openDemo = root;
      /* bring the card to the centre of its arc so it stays put while in use */
      const y = window.LiaFeatures && LiaFeatures.scrollForCard ? LiaFeatures.scrollForCard(card) : null;
      if (y !== null && Math.abs(y - window.scrollY) > 2) window.scrollTo({ top: y, behavior: "smooth" });
      root.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      setTimeout(() => (biz ? text : form.elements.name).focus({ preventScroll: true }), 60);
    }
    function close() {
      stopAll();
      if (openDemo === root) openDemo = null;
      root.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
    }
    function reset() {
      stopAll();
      biz = null; step = 0; log.innerHTML = "";
      root.classList.remove("is-chatting");
      setTimeout(() => form.elements.name.focus({ preventScroll: true }), 60);
    }
    root.__bpStop = stopAll;
    root.__bpClose = close;

    $(".bp-demo__open").addEventListener("click", open);
    $(".bp-demo__close").addEventListener("click", close);
    $(".bp-demo__end").addEventListener("click", reset);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim().replace(/\s+/g, " ");
      const about = sentence(form.elements.about.value);
      if (!name) { err.textContent = "Please enter your enterprise name."; form.elements.name.focus({ preventScroll: true }); return; }
      if (!about) { err.textContent = "Add a short description so the agent can introduce you."; form.elements.about.focus({ preventScroll: true }); return; }
      err.textContent = "";
      biz = { name, about }; step = 0; log.innerHTML = ""; session++;
      root.classList.add("is-chatting");
      add("note", `${service} agent for ${name}`);
      callOn = !!SR;            // a voice call keeps listening after each reply
      speak(fill(script.greet, biz));
    });
    mic.addEventListener("click", () => {
      if (!biz || !SR) return;
      if (root.dataset.state === "listening") { callOn = false; stopListening(); setState("idle", "Tap the mic to talk"); return; }
      callOn = true;
      listen();
    });
    const sendTyped = () => {
      const v = text.value.trim();
      if (!v || !biz) return;
      text.value = "";
      callOn = false;
      stopListening();
      if (synth) synth.cancel();
      handle(v);
    };
    $(".bp-demo__send").addEventListener("click", sendTyped);
    text.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); sendTyped(); } });
    root.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    /* the card left the screen (parked by features.js): stop talking */
    new MutationObserver(() => { if (card.classList.contains("lia-card-parked")) close(); })
      .observe(card, { attributes: true, attributeFilter: ["class"] });
  }

  function init() {
    const cards = Array.from(document.querySelectorAll(".lia-feature-card"));
    if (!cards.length) return false;
    cards.forEach((card) => {
      if (card.querySelector(".bp-demo")) return;
      const caption = card.nextElementSibling;
      const title = caption && caption.querySelector("p");
      const service = title ? title.textContent.trim() : "Voice agent";
      build(card, service);
    });
    if (synth && synth.onvoiceschanged === null) synth.onvoiceschanged = () => {};
    return true;
  }

  /* features.js tags the cards during boot; wait for it */
  function boot(tries) {
    if (init() || tries > 120) return;
    requestAnimationFrame(() => boot(tries + 1));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => boot(0));
  else boot(0);
  window.addEventListener("beforeunload", () => { if (synth) synth.cancel(); });

  window.BpCardDemo = { init };
})();
