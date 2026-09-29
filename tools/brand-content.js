/*
 * brand-content.js
 * ----------------
 * Better Pitch content layer. build-html.js runs the finished page through
 * apply() as its last step, so the replica's markup (tools/source-live.html,
 * partials.html, extra-sections.html) stays untouched and the whole rebrand
 * lives in this one file. Copy is adapted from https://www.ravan.ai/.
 *
 * Every rule states how many matches it expects; a mismatch aborts the build
 * so a changed source can never leave half-branded text behind.
 */

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const rules = [];
/* raw string */
const s = (from, to, n = 1) => rules.push([new RegExp(esc(from), "g"), to, n, from]);
/* regex */
const r = (re, to, n = 1) => rules.push([re, to, n, String(re)]);
/* text node: >from< */
const t = (from, to, n = 1) => rules.push([new RegExp(">" + esc(from) + "<", "g"), ">" + to + "<", n, from]);
/* heading + following paragraph (possibly with a divider element between) */
const pair = (h, p, h2, p2, n = 1) =>
  rules.push([
    new RegExp(">" + esc(h) + "</h3>((?:<[^>]+>)*?)<p([^>]*)>" + esc(p) + "<", "g"),
    ">" + h2 + "</h3>$1<p$2>" + p2 + "<",
    n,
    h,
  ]);

/* ============================== head ============================== */
s("<title>LIA – AI Voice Agent for Sales, Support, Search &amp; Conversational Commerce</title>",
  "<title>Better Pitch – The Most Natural Voice AI for Sales, Support &amp; Collections</title>");
r(/<meta name="description" content="[^"]*"\/>/,
  '<meta name="description" content="Better Pitch is an enterprise AI deployment company and the home of the most natural voice AI. Real emotion, 100+ languages &amp; dialects, sub-300ms responses. We deploy your entire calling workflow and run it for you."/>');
r(/<meta name="keywords" content="[^"]*"\/>/,
  '<meta name="keywords" content="Better Pitch,AI Voice Agent,Voice AI,AI Calling,Conversational AI,AI Sales Agent,Lead Qualification,AI Customer Support,Collections AI,EMI Reminders,Appointment Scheduling,Hinglish Voice AI,Multilingual Voice AI,Outbound Campaigns,Inbound Call Automation,Enterprise AI Deployment"/>');
r(/(<meta (?:property="og|name="twitter):title" content=")[^"]*"/g, '$1Better Pitch – The Most Natural Voice AI"', 2);
r(/(<meta (?:property="og|name="twitter):description" content=")[^"]*"/g,
  '$1Voice AI agents with real emotion, 100+ languages and sub-300ms responses, deployed across your sales, support and collections workflows and run for you."', 2);
s('<link rel="icon" href="assets/favicon.ico" sizes="256x256" type="image/x-icon"/>', '<link rel="icon" href="assets/betterpitch.ico" sizes="256x256" type="image/x-icon"/>');
s('<link rel="icon" href="assets/favicon.svg"/>', '<link rel="icon" href="assets/betterpitch-icon.svg" type="image/svg+xml"/>');
s('<link rel="preload" as="image" href="assets/favicon.svg"/>', '<link rel="preload" as="image" href="assets/betterpitch.svg"/>');
s('<link rel="preload" as="image" href="assets/logo/lia%20white%201.png"/>', '<link rel="preload" as="image" href="assets/logo/betterpitch-mark-white.svg"/>');
s('<link rel="stylesheet" href="css/journey-fluid.css"/>', '<link rel="stylesheet" href="css/journey-fluid.css"/>\n<link rel="stylesheet" href="css/brand.css"/>\n<link rel="stylesheet" href="css/card-demo.css"/>\n<link rel="stylesheet" href="css/hero-palette.css"/>\n<link rel="stylesheet" href="css/perf.css"/>');
/* service-card live demo (form → voice chat); runs after main.js has tagged the cards */
s('<script src="js/main.js"></script>', '<script src="js/main.js"></script>\n<script src="js/card-demo.js"></script>');

/* ============================== logos ============================== */
s('<img src="assets/favicon.svg" alt="LIA" width="110" height="48"/>',
  '<img class="bp-logo-preloader" src="assets/betterpitch.svg" alt="Better Pitch" width="609" height="130"/>');
s('<img alt="LIA logo" width="120" height="52" decoding="async" class="h-auto w-[4.75rem] sm:w-[5.5rem]" style="color:transparent" src="assets/lia.svg"/>',
  '<img alt="Better Pitch logo" width="609" height="130" decoding="async" class="bp-logo-header h-auto" style="color:transparent" src="assets/betterpitch.svg"/>');
s('<img alt="LIA logo" width="120" height="52" decoding="async" class="h-auto w-[5rem] opacity-40" style="color:transparent" src="assets/lia.svg"/>',
  '<img alt="Better Pitch logo" width="609" height="130" decoding="async" class="bp-logo-menu h-auto opacity-40" style="color:transparent" src="assets/betterpitch.svg"/>');
s('<img alt="LIA" loading="lazy" width="80" height="40" decoding="async" data-nimg="1" style="color:transparent" src="assets/lia.svg"/>',
  '<img class="bp-logo-footer" alt="Better Pitch" loading="lazy" width="609" height="130" decoding="async" data-nimg="1" style="color:transparent" src="assets/betterpitch.svg"/>');
s('<img src="assets/logo/lia%20white%201.png" alt="LIA" width="344" height="148" style="width:60%;',
  '<img src="assets/logo/betterpitch-mark-white.svg" alt="Better Pitch" width="124" height="130" style="width:48%;', 5);
s('<img src="assets/logo/lia%20white%201.png" alt="LIA" width="344" height="148" style="width:62%;',
  '<img src="assets/logo/betterpitch-mark-white.svg" alt="Better Pitch" width="124" height="130" style="width:50%;');
s('<img src="assets/logo/lia%20white%201.png" alt="LIA" class="cp-fc-logo',
  '<img src="assets/logo/betterpitch-mark-white.svg" alt="Better Pitch" class="cp-fc-logo');
s("url(&#x27;assets/logo/lia%20white%201.png&#x27;)", "url(&#x27;assets/logo/betterpitch-stacked-white.svg&#x27;)", 2);
s('role="img" aria-label="LIA"', 'role="img" aria-label="Better Pitch"');

/* ============================== hero ============================== */
t("Meet LIA,<br/>Your Limitless<br/>Intelligent Agent", "Meet Better&nbsp;Pitch,<br/>Your Most Natural<br/>Voice Agent");
t("LIA AI conversational agent connects seamlessly across web, mobile, social media and in-store platforms, delivering consistent customer experiences. Backed by a secure, scalable infrastructure, LIA ensures easy customization, real-time insights and effortless integration with your systems.",
  "Better Pitch is the world’s most natural voice AI: real emotion, 100+ languages &amp; dialects, sub-300ms replies. We deploy your entire workflow — calls, follow-ups, CRM, dashboards — and run it for you. Trusted by 2,000+ businesses.");
t("LIA for", "Better Pitch for");
pair("HOTELS &amp; RESTAURANTS", "Reservations made easy, intelligent pre and post booking support and more!",
  "SALES &amp; LEADS", "Call new leads in minutes, qualify intent and route hot prospects to your closers!", 2);
pair("HEALTHCARE", "Effortless appointment bookings, patient record management, and smart FAQ handling!",
  "CUSTOMER SUPPORT", "Resolve common questions instantly and escalate complex calls with full context!", 2);
pair("AIRLINES", "Hassle-free flight bookings, live flight updates, baggage info, and more!",
  "COLLECTIONS &amp; EMI", "Compliant reminders with call windows, retries, dispositions and audit trails!", 2);
pair("CRUISE LINES", "Ask LIA for cabin recommendations, promotions, and more!",
  "APPOINTMENTS", "Confirm, remind and reschedule by phone to cut no-shows!", 2);
pair("FINTECH", "Automate all your financial needs with LIA!",
  "FEEDBACK &amp; CSAT", "Voice surveys that turn ratings into structured insights!", 2);
pair("REAL ESTATE", "Help clients find properties, book visits, and get answers faster!",
  "RECRUITMENT", "Screen candidates at scale and hand shortlists to your recruiters!", 2);
pair("EDUCATION", "Streamline enrollment inquiries, course guidance, student assistance, and more!",
  "E-COMMERCE COD &amp; RTO", "Confirm COD orders, follow up on NDRs and recover abandoned carts!", 2);
pair("RETAIL", "Deliver personalized shopping assistance, order tracking, promotions, and more!",
  "REAL ESTATE", "Book up to 5× more site visits from the same lead pool, faster!", 2);

/* ============================== features ============================== */
t("LIA · Assistant", "Better Pitch · Assistant");
t("How can I help today? Ask anything — from drafting a reply to summarizing a thread.",
  "Your demo is booked for Tue, 10:30 AM. Reply here if you need to reschedule.");
t("Conversational AI", "Emotion-Aware Voice AI");
t("Engage customers with natural, human-like conversations powered by advanced AI.",
  "Human-like conversations with real emotion, natural interruptions and sub-300ms replies.");
t("End-to-End Transactions", "End-to-End Outcomes");
t("Automate the entire booking flow from inquiry to confirmation with real-time availability.",
  "Judged on what happens after the call: the visit booked, the order confirmed, the promise kept.");
t("LIA · Responding in your language", "Better Pitch · In your language");
t("Multilingual Support", "100+ Languages &amp; Dialects");
t("Break language barriers by engaging customers in their own language, anywhere.",
  "Hindi, Hinglish, Tamil, Telugu and more, switching languages mid-call like your customers do.");
t("Voice Search", "Inbound &amp; Outbound Calls");
t("Enable hands-free discovery through natural voice commands for faster, effortless bookings.",
  "Answer every inbound line and run outbound campaigns with call windows, retries and concurrency.");
t("Mobile App &amp; Human Handover", "Human Handoff with Context");
t("Seamlessly transfer conversations to your team when needed, with full access via a mobile app.",
  "Sensitive or complex calls route to your team instantly, with the transcript and summary attached.");
t("Omnichannel Support", "Customer Support");
t("Connect with customers across WhatsApp, Instagram, Messenger and more all in one place.",
  "Resolve common questions from your knowledge base and escalate complex calls with full context.");
t("Smart Negotiation", "Sales &amp; Lead Qualification");
t("Guide every conversation to a win-win outcome with personalized offers that balance margin and customer satisfaction.",
  "Call new leads in minutes, qualify intent, handle objections and route hot prospects to your closers.");
t("Cross-selling &amp; Upselling", "Cart Recovery &amp; Upsell");
t("Increase revenue by recommending relevant add-ons and upgrades at the right moment in the journey.",
  "Confirm COD orders, recover abandoned carts and suggest the right add-on at the right moment.");
t("Built to Fit Business Workflows", "Sync Every Outcome");
t("Integrate LIA with your existing tools CRM, Booking, Payments, Slack and more.",
  "Send structured call outcomes into your CRM, calendars, helpdesk and internal systems.");
t("Interactive Dashboard", "Track Every Call");
t("Track performance, analyze customer interactions and uncover insights through powerful dashboards.",
  "Review transcripts, recordings, summaries, sentiment, dispositions and cost on every call.");
t("Chat with LIA", "Talk to Better Pitch");
t("Easy Customization", "Agent Builder");
t("Quickly customize LIA to match your brand with a flexible, widget-based design.",
  "Configure prompts, voices, accents, welcome messages and call behaviour for each workflow.");
t("LIA · Sending media", "Better Pitch · Sending media");
t("Multimedia Responses", "WhatsApp Follow-ups");
t("Bring conversations to life with photos, videos and location cards sent right inside the chat.",
  "Send payment links, photos and location cards on WhatsApp the moment a call ends.");

/* ---- the carousel shows the 8 Better Pitch services (see SERVICES below); the
        mock-up text inside the reused cards is adapted to each service ---- */
/* Appointments (assistant chat card) */
t("Create image", "Confirm");
t("Summarize text", "Reschedule");
t("Generate", "Remind me");
t("Translate", "Add to calendar");
/* Customer Support (inbox card) */
t("Can I arrange a late check-out?", "Where is my order #4821?");
t("Is breakfast included in the suite?", "How do I update my address?");
t("What time does check-in start?", "What are your support hours?");
t("Please book 2 nights starting Friday", "Please reset my account password");
t("Group booking enquiry — 8 guests", "Bulk order enquiry — 80 units");
/* Sales & Leads (voice card) */
t("Find me a flight to Tokyo next Friday", "Call me back about the premium plan");
/* Collections & EMI (flow card) */
t("Discover", "Remind");
t("Book", "Promise");
t("Paris, FR", "Loan XX4217");
t("Hôtel Lumière · Marais", "EMI reminder · R. Patil");
t("Sep 14", "Due Sep 14");
t("Sep 16", "Paid Sep 16");
s(">2</b> guests<", ">UPI</b> link sent<");
t("€420", "₹4,120");
/* Recruitment (human-handoff phone card) */
t("Hi! I can help with your booking. What dates work?", "Hi! Thanks for applying. When could you start?");
t("I&#x27;d like to change my flight to Friday", "I can start from next Monday");
t("Connecting you to a specialist…", "Connecting you to a recruiter…");
t("Sarah · Support", "Sarah · Recruiter");
/* E-commerce COD & RTO (add-ons card) */
t("Spa &amp; wellness add-on", "Express delivery");
t("+$45", "+₹49");
t("Airport transfer", "Gift wrap");
t("+$32", "+₹29");
t("Late checkout · 4pm", "Prepay &amp; skip COD");
t("+$18", "−₹20");
t("Your stay · Hôtel Lumière", "Your order · #4821");
t("3 personalized recommendations", "COD order confirmed by call");
t("+$95 value", "RTO risk ↓");
/* Feedback & CSAT (dashboard card) */
t("Conversations · last 30d", "CSAT responses · last 30d");
/* Real Estate (media card) */
t("Can you show me the rooftop pool and a room?", "Can you show me the 3BHK and the view?");
t("Rooftop pool", "Living room");
t("Deluxe suite", "Master bedroom");

/* Carousel cards, in order. `card` is the caption the reused card carries after
   the rules above; its card + caption pair is moved into this order and the
   caption rewritten. Cards not listed are dropped. */
const SERVICES = [
  { card: "Inbound &amp; Outbound Calls", title: "Sales &amp; Leads",
    text: "Call new leads within minutes, qualify intent, handle objections and route hot prospects to your closers." },
  { card: "Customer Support", title: "Customer Support",
    text: "Resolve common questions from your knowledge base and escalate complex calls with full context." },
  { card: "End-to-End Outcomes", title: "Collections &amp; EMI",
    text: "Compliant EMI reminders with call windows, retries, UPI payment links and a full audit trail." },
  { card: "Emotion-Aware Voice AI", title: "Appointments",
    text: "Confirm, remind and reschedule by phone to cut no-shows across clinics, sites and demos." },
  { card: "Track Every Call", title: "Feedback &amp; CSAT",
    text: "Voice surveys that capture ratings and open feedback, summarized into structured insights." },
  { card: "Human Handoff with Context", title: "Recruitment",
    text: "Screen candidates at scale with structured questions, availability capture and recruiter handoff." },
  { card: "Cart Recovery &amp; Upsell", title: "E-commerce COD &amp; RTO",
    text: "COD confirmation, NDR follow-up and cart recovery calls that cut return-to-origin losses." },
  { card: "WhatsApp Follow-ups", title: "Real Estate",
    text: "Call every lead back fast, share property photos and book up to 5× more site visits." },
];

function featureServices(html) {
  /* the wrapper holding the alternating card / caption elements of the carousel */
  const sticky = html.indexOf('<div class="sticky top-0 h-screen overflow-hidden bg-background hidden sm:block">');
  const open = '<div class="absolute inset-0">';
  const wrap = html.indexOf(open, sticky);
  if (sticky < 0 || wrap < 0) throw new Error("brand-content: feature carousel not found");
  const re = /<(\/?)div\b[^>]*>/g;
  re.lastIndex = wrap;
  let m, depth = 0, cur = -1, wrapEnd = -1;
  const kids = [];
  while ((m = re.exec(html))) {
    if (m[1]) {
      depth--;
      if (depth === 1) kids.push(html.slice(cur, re.lastIndex));
      if (depth === 0) { wrapEnd = m.index; break; }
    } else {
      depth++;
      if (depth === 2) cur = m.index;
    }
  }
  if (kids.length !== 24) throw new Error(`brand-content: expected 24 carousel elements, found ${kids.length}`);
  const pairs = [];
  for (let i = 0; i < kids.length; i += 2) pairs.push({ card: kids[i], caption: kids[i + 1] });
  const out = SERVICES.map((svc) => {
    const pair = pairs.find((p) => p.caption.includes(">" + svc.card + "</p>"));
    if (!pair) throw new Error("brand-content: no carousel card captioned " + svc.card);
    const caption = pair.caption
      .replace(">" + svc.card + "</p>", ">" + svc.title + "</p>")
      .replace(/(<p [^>]*>)[^<]*(<\/p><\/div>)$/, "$1" + svc.text + "$2");
    return pair.card + caption;
  });
  return html.slice(0, wrap + open.length) + out.join("") + html.slice(wrapEnd);
}

/* ============================== partners ============================== */
r(/(<span class="font-poppins font-bold text-foreground" style="[^"]*">)Trusted<\/span>(<span[^>]*>)by<\/span>(<span[^>]*>)teams<\/span>(<span[^>]*>)that<\/span><\/div>(<div[^>]*>)(<span[^>]*>)value<\/span>(<span[^>]*>)exceptional<\/span><\/div>(<div[^>]*>)(<span[^>]*>)digital<\/span>(<span[^>]*>)experiences\.<\/span>/,
  "$1Trusted</span>$2by</span>$3the</span>$4world’s</span></div>$5$7fastest-growing</span></div>$8$9companies.</span>");

/* ============================== removed: partner logos section ============================== */
r(/\n\n<!-- =+ -->\n<div id="section-gallery"[\s\S]*?(?=\n\n<!-- =+ -->\n<section id="section-cinematic-project")/, "");
r(/\n\s*<li><button type="button" data-section="section-gallery"[\s\S]*?<\/li>/, "");

/* ============================== added: manifesto sentence (guillaumezhu.com) ============================== */
/* between the feature carousel and the industries wheel; markup in tools/manifesto-section.html */
r(/(?=\n\n<!-- =+ -->\n<section id="section-cinematic-project")/,
  require("fs").readFileSync(require("path").join(__dirname, "manifesto-section.html"), "utf8").trimEnd().replace(/\$/g, "$$$$"));
s('<link rel="stylesheet" href="css/journey-fluid.css"/>', '<link rel="stylesheet" href="css/journey-fluid.css"/>\n<link rel="stylesheet" href="css/manifesto.css"/>');
/* after the hero/feature pins above it (ScrollTrigger refreshes in creation order) */
s('<script src="js/features.js"></script>', '<script src="js/features.js"></script>\n<script src="js/manifesto.js"></script>');

/* ============================== moved: journey + toolkit sections ============================== */
/* extra-sections.html is appended after the footer; the "Emotion / meets / outcomes." sentences and
   the Toolkit deck go between the industries wheel and the FAQ ("Ready when you are" stays at the end) */
r(/(\n\n<!-- =+ -->\n<section id="section-faq"[\s\S]*?)\n(<!-- =+ -->\n<!-- Appended sections replicated[\s\S]*?\n<section id="section-toolkit"[\s\S]*?\n<\/section>\n)/,
  "\n\n$2$1");

/* ============================== moved: FAQ below the ROI calculator ============================== */
r(/(\n\n<!-- =+ -->\n<section id="section-faq"[\s\S]*?)(\n\n<!-- =+ -->\n<section id="roi-calculator"[\s\S]*?)(?=\n\n<!-- =+ -->\n<section id="testimonials")/,
  "$2$1");
/* the side dots follow the page order */
r(/(\n *<li><button type="button" data-section="section-faq"[^\n]*)(\n *<li><button type="button" data-section="roi-calculator"[^\n]*)/,
  "$2$1");

/* the "Get Started" nav dot tracks the closing section, whose reveal card now holds the globe footer
   (tools/next-globe.js); js/section-nav.js observes section-next instead of section-footer */
s('data-section="section-footer" aria-label="Scroll to Get Started"', 'data-section="section-next" aria-label="Scroll to Get Started"');

/* ============================== added: red → magenta fill on the features marquee ============================== */
s('<link rel="stylesheet" href="css/manifesto.css"/>', '<link rel="stylesheet" href="css/manifesto.css"/>\n<link rel="stylesheet" href="css/marquee-fill.css"/>');
s('<script src="js/manifesto.js"></script>', '<script src="js/manifesto.js"></script>\n<script src="js/marquee-fill.js"></script>');

/* ============================== added: interactive dotted globe in the footer card ============================== */
s('<script src="js/footer.js"></script>', '<script src="js/footer.js"></script>\n<script src="js/globe-3d.js"></script>');

/* ============================== added: team cards over the "outcomes." gradient ============================== */
/* inside #section-journey's pin height, after the pinned stage; markup in tools/team-section.html */
r(/(<section id="section-journey"[\s\S]*?\n    <\/div>\n)(?=  <\/div>\n<\/section>)/,
  "$1" + require("fs").readFileSync(require("path").join(__dirname, "team-section.html"), "utf8").replace(/^\n+/, "").replace(/\$/g, "$$$$"));
s('<link rel="stylesheet" href="css/marquee-fill.css"/>', '<link rel="stylesheet" href="css/marquee-fill.css"/>\n<link rel="stylesheet" href="css/team.css"/>');
s('<script src="js/journey-fluid.js"></script>', '<script src="js/journey-fluid.js"></script>\n<script src="js/team.js"></script>');

/* ============================== industries wheel ============================== */
pair("Hospitality", "Reservations made easy, intelligent pre and post booking support and more!",
  "Hospitality", "Confirm bookings, answer pre-arrival questions and upsell stays in every guest’s language.");
pair("Real Estate", "Help customers discover properties, schedule viewings, answer buyer inquiries and guide them through every step.",
  "Real Estate", "Call every lead back in under 4 minutes, qualify intent and book 5× more site visits.");
pair("Education &amp; Related Service-Based Industries", "Simplify admissions, course inquiries and provide instant support with ease.",
  "EdTech &amp; Education", "Reach every enquiry within minutes, counsel on courses and book demo classes.");
pair("Travel &amp; Tourism", "From trip planning to bookings, LIA helps travelers explore, decide and book with ease.",
  "Contact Centres &amp; BPO", "Absorb peak volumes with AI agents on tier-1 calls and warm handoffs for the rest.");
pair("Cruise Lines", "Ask LIA for cabin recommendations, promotions, and more!",
  "Logistics", "Confirm deliveries, chase NDRs and cut return-to-origin losses with automated calls.");
pair("Airlines", "Hassle free flight bookings, live updates, and baggage information delivered instantly.",
  "Travel &amp; Airlines", "Rebookings, trip updates and baggage queries answered instantly, day or night.");
pair("FinTech", "Automate financial needs and handle inquiries with remarkable efficiency.",
  "BFSI &amp; NBFC", "40% higher EMI recovery with compliant call windows, dispositions and audit trails.");
pair("Healthcare", "Effortless appointment bookings, patient record management and smart FAQ handling!",
  "Healthcare", "Confirm, remind and reschedule appointments by phone to cut no-shows across clinics.");
pair("Others", "No matter the business, LIA adapts to any workflow, understands customer needs and provides instant, intelligent support.",
  "Your Industry", "Insurance, automotive, solar and beyond: every sector gets its own deployment playbook, built and run for you.");
pair("Retail &amp; eCommerce", "Skyrocket sales with smart upselling and personalized promotions tailored to each shopper&#x27;s preferences.",
  "D2C &amp; E-commerce", "COD confirmation, cart recovery and NDR calls that recovered 3.2× revenue for online brands.");

/* ============================== FAQ ============================== */
const FAQ = [
  ["Do I need technical expertise to use your AI agents?",
   "Not at all. LIA is built for everyone. No coding or ML background required. You can deploy, configure, and manage AI agents through an intuitive interface, and our team handles the heavy lifting during onboarding.",
   "What is Better Pitch?",
   "Better Pitch is a real-time voice AI platform that speaks 30+ languages and dialects, including Hindi, Hinglish, Tamil and Telugu, with sub-300ms latency. It runs outbound campaigns, inbound routing, IVR flows, bookings and post-call analytics out of the box."],
  ["What kind of tasks can your AI agents handle?",
   "From customer support and lead qualification to scheduling, data extraction and multi-step workflows. LIA&#x27;s Agents adapt to virtually any repeatable business process. If it can be described, it can be automated.",
   "Can Better Pitch switch languages mid-call?",
   "Yes. Better Pitch detects the language the caller responds in and adapts mid-call. It is especially strong at Hindi, Hinglish and English switching, which happens naturally in almost every Indian business call."],
  ["How secure is my data with LIA?",
   "Security is foundational. All data is encrypted in transit and at rest, access is role-scoped and we operate on SOC 2-compliant infrastructure. Your data is never used to train shared models.",
   "How secure is my data with Better Pitch?",
   "Every call is encrypted in transit and at rest, with role-based workspace permissions, audit-ready records and India data-residency options. We are SOC 2, GDPR and HIPAA ready, with CERT-In empanelled VAPT."],
  ["Can LIA customize solutions for my company?",
   "Yes. Every deployment is tailored: custom workflows, branded voice personas, industry-specific knowledge bases and deep integrations with your existing stack. Enterprise plans include a dedicated solutions architect.",
   "What can an agent do during a call?",
   "Every agent can end calls gracefully, transfer to a fixed or dynamic number, run IVR and press-digit flows, and trigger custom functions that call your APIs mid-call, then continue naturally with the response."],
  ["Can your solutions run on-premises?",
   "Absolutely. We offer fully on-prem and private-cloud deployments for organizations with strict data residency or compliance requirements. Reach out to discuss architecture options.",
   "Do I need a credit card to start?",
   "No. You can sign up and explore the full Better Pitch platform for free without a credit card. Paid plans start at ₹2,999/month, with GST invoices and cancel-anytime billing."],
];
for (const [q, a, q2, a2] of FAQ) { t(q, q2); t(a, a2); }
t("AI Employee FAQs.", "Voice AI FAQs.");
t("We know — AI tools, automation, workflows and Agents can feel overwhelming. LIA brings everything together into one connected experience.",
  "We know — AI calling raises real questions about languages, latency and compliance. Better Pitch brings the answers together in one place.");
t("Whether you&#x27;re managing finance, conversations or automation, we&#x27;re here to make it simple, clear and easy to use.",
  "Whether you run sales, support or collections, we’re here to make AI calling simple, clear and easy to deploy.");

/* ============================== ROI ============================== */
t("Discover how much money and time LIA puts back into your business.",
  "Discover how much money and time Better Pitch puts back into your business.");

/* ============================== results (testimonials slot) ============================== */
t("What clients say", "Results from live calls");
t("Real feedback from the airlines, hotels and insurers running LIA in production.",
  "Named results from live deployments, plus anonymized engagements where clients prefer confidentiality.");
const RESULTS = [
  ["With successful integration of Yana chatbot, powered by LIA, with our core systems like inventory management, reservation and ticketing... passengers getting a completely rich experience.",
   "3 properties closed in the first month on Better Pitch, with every site-visit lead called back, qualified and followed up automatically.",
   "Chamara Perera", "Imperial Realty", "Group Head of IT", "Real estate · Site visits &amp; follow-ups",
   "chamara-perera.jpeg", "result-real-estate.svg",
   '<img src="assets/logo/2.webp" alt="SriLankan Airlines" width="776" height="776" class="shrink-0 object-contain brightness-0 dark:invert h-14 w-14"/>'],
  ["Since partnering with LIA 18 months ago, The Galle Face Hotel has seen an increase in direct online bookings, add-ons and overall guest engagement through our website. We sincerely thank CodeGen, its management team and backend team for their responsiveness, support, and continued commitment.",
   "40% higher EMI recovery and zero compliance violations — 2M+ calls a month at ₹400 per recovery, with a full audit trail on every single call.",
   "Suresh Abbas", "NBFC Lender", "General Manager", "BFSI · Collections &amp; EMI reminders",
   "suresh-abbas.jpg", "result-nbfc.svg",
   '<img src="assets/logo/1.webp" alt="Galle Face Hotel" width="664" height="594" class="shrink-0 object-contain brightness-0 dark:invert h-14 w-14"/>'],
  ["The LIA team worked closely with us, taking on every challenge to personalize the solution to our needs. Their efforts helped deliver one of the first chatbot initiatives of its kind in Sri Lanka&#x27;s insurance industry.",
   "A major distributor closed inside the first 100-lead pilot, with Better Pitch qualifying every lead by phone and routing the hottest to sales.",
   "Suneth Jayamanne", "Publishing House", "Chief Information Officer", "Publishing · Lead qualification",
   "suneth-jayamanne.jpg", "result-publishing.svg",
   '<img src="assets/logo/hnb-life.png" alt="HNB Life" width="150" height="54" class="shrink-0 object-contain brightness-0 dark:invert h-8 w-auto max-w-[130px]"/>'],
];
for (const [q, q2, name, name2, role, role2, photo, photo2, logo] of RESULTS) {
  s("“<!-- -->" + q + "<!-- -->”", q2, 2);
  t(name, name2, 2);
  s('alt="' + name + '"', 'alt="' + name2 + '"', 2);
  t(role, role2, 2);
  s("assets/testimonials/" + photo, "assets/testimonials/" + photo2, 2);
  s(logo, '<img src="assets/logo/betterpitch-mark-white.svg" alt="Better Pitch" width="124" height="130" class="bp-result-mark shrink-0 object-contain brightness-0 dark:invert"/>', 2);
}

/* ============================== footer CTA ============================== */
t("Where clarity", "Where AI calling");
t("becomes progress.", "becomes revenue.");
t("From pricing to features, here are the answers to common questions about LIA",
  "Real-time AI phone agents for your sales, support, collections and scheduling teams.");
r(/(<a [^>]*href=")https:\/\/www\.lialive\.ai\/contact(">)Start your journey</, "$1#section-footer$2Book a demo<");
t("Built with clarity. Designed for flow.", "Voice AI agents for enterprise customer calls.");
t("Why LIA", "Why Better Pitch");
t("Testimonials", "Results", 2);
s("Scroll to Testimonials", "Scroll to Results");

/* ============================== replaced: results as a card deck (Toolkit-style) ============================== */
/* after the nav labels above (their "Testimonials" rule must not see the deck's title): the rewritten
   results marquee gives way to the fanned deck in tools/testimonials-section.html
   (css/testimonials.css, js/testimonials.js) */
r(/<section id="testimonials"[\s\S]*?<\/section>/,
  require("fs").readFileSync(require("path").join(__dirname, "testimonials-section.html"), "utf8").trimEnd().replace(/\$/g, "$$$$"));
s('<link rel="stylesheet" href="css/team.css"/>', '<link rel="stylesheet" href="css/team.css"/>\n<link rel="stylesheet" href="css/testimonials.css"/>');
s('<script src="js/toolkit.js"></script>', '<script src="js/toolkit.js"></script>\n<script src="js/testimonials.js"></script>');
/* click-to-flip cards (Platform + Testimonials) and the two stages' colour gradients */
s('<link rel="stylesheet" href="css/testimonials.css"/>', '<link rel="stylesheet" href="css/testimonials.css"/>\n<link rel="stylesheet" href="css/card-flip.css"/>');
s('<script src="js/testimonials.js"></script>', '<script src="js/testimonials.js"></script>\n<script src="js/card-flip.js"></script>');

/* ============================== menu ============================== */
t("AI Products", "Platform");
t("Aviation", "BFSI &amp; NBFC");
s('aria-label="View AI products"', 'aria-label="View the platform"');
s('aria-label="View Aviation industry page"', 'aria-label="View BFSI and NBFC industry page"');
s('aria-label="View Hospitality industry page">Hospitality<', 'aria-label="View Real Estate industry page">Real Estate<');
s('aria-label="Read the LIA blog"', 'aria-label="Read the Better Pitch blog"');

/* ============================== chat widget ============================== */
s('placeholder="LIA is infinite, ask anything..."', 'placeholder="Ask Better Pitch anything..."', 2);
t("Ask me anything — I&#x27;m LIA, your AI conversational agent.", "Ask me anything — I&#x27;m Better Pitch, your AI voice agent.");

/* ============================== appended sections ============================== */
t("Today", "Emotion");
t("I bridge", "meets");
t("the two.", "outcomes.");
t("Creative Front-end", "Engineering Stack");
t("Art Direction", "Design Studio");
/* Toolkit shows only the "Design Studio" (art-direction) deck: the front-end deck and its
   subtitle go, and js/toolkit.js / css/journey-toolkit.css run the art phases alone (.tk--art-only) */
s('<section id="section-toolkit" class="tk"', '<section id="section-toolkit" class="tk tk--art-only"');
r(/\n *<h3 class="tk__subtitle tk__subtitle--front">[^<]*<\/h3>/, "");
r(/\n\n      <!-- front-end deck -->\n      <div class="tk__wheel tk__wheel--frontend">[\s\S]*?\n      <\/div>\n/, "\n");
/* the deck's cards and heading carry the voice platform's capabilities (ravan.ai):
   card art in assets/toolkit/agni-*.svg, same 295x417 face as the design-tool cards */
s('<h2 class="tk__title">Toolkit</h2>', '<h2 class="tk__title">Platform</h2>');
t("Design Studio", "Enterprise AI deployment · India-native");
[
  ["figma.svg", "Figma — Design tool", "agni-agent-builder.svg", "Agent Builder — prompts, voices and accents"],
  ["photoshop.svg", "Photoshop — Image editing", "agni-knowledge-base.svg", "Knowledge Base — FAQs, policies and pricing"],
  ["illustrator.svg", "Illustrator — Vector graphics", "agni-tools.svg", "Tools — transfers, APIs and IVRs"],
  ["indesign.svg", "InDesign — Layout", "agni-calling.svg", "Calling — inbound and outbound"],
  ["aftereffects.svg", "After Effects — Motion design", "agni-analytics.svg", "Call Analytics — transcripts and sentiment"],
  ["capcut.svg", "CapCut — Video editing", "agni-webhooks.svg", "API and Webhooks — CRM and calendar sync"],
  ["lightroom.svg", "Lightroom — Photo editing", "agni-languages.svg", "30+ Languages — Hinglish-native, sub-300ms"],
].forEach(([from, fromAlt, to, toAlt]) =>
  s(`src="assets/toolkit/${from}" alt="${fromAlt}"`, `src="assets/toolkit/${to}" alt="${toAlt}"`));
/* every Platform card flips on click (js/card-flip.js, css/card-flip.css): the card art is the
   front face, a short explanation of the capability is the back */
const PLATFORM_BACKS = {
  "agni-agent-builder": ["Agent Builder", "Describe your agent in plain language: pick its voice, accent and persona, set goals and guardrails, and test it live before a single customer call."],
  "agni-knowledge-base": ["Knowledge Base", "Upload FAQs, policies, price lists and PDFs. The agent answers from your own documents, so every reply stays accurate and on-brand."],
  "agni-tools": ["Tools", "Warm-transfer to a human, trigger your APIs mid-call, navigate IVRs and send SMS or WhatsApp follow-ups, all as actions the agent takes."],
  "agni-calling": ["Calling", "Run outbound campaigns and answer inbound lines at scale, with retry rules, calling windows and DND compliance built in."],
  "agni-analytics": ["Call Analytics", "Every call is recorded, transcribed and scored for sentiment, intent and outcome, so you know what happened and what to do next."],
  "agni-webhooks": ["API & Webhooks", "Push call outcomes to your CRM, book slots in your calendar and stream live events to your own stack as each call happens."],
  "agni-languages": ["30+ Languages", "Hindi, Hinglish, Tamil, Telugu and more, with natural code-switching mid-sentence and replies in under 300 ms."],
};
r(/<img class="tk-card__motion" src="assets\/toolkit\/(agni-[a-z-]+)\.svg" alt="([^"]*)" draggable="false"\/>/g, (m, key, alt) => {
  const [title, text] = PLATFORM_BACKS[key];
  return `<div class="tk-card__motion tk-flip" data-flip="${key}"><div class="tk-flip__inner">` +
    `<img class="tk-flip__face" src="assets/toolkit/${key}.svg" alt="${alt}" draggable="false"/>` +
    `<div class="tk-flip__face tk-flip__back"><p class="tk-flip__title">${title.replace(/&/g, "&amp;")}</p>` +
    `<p class="tk-flip__text">${text}</p><p class="tk-flip__hint">Tap to flip back</p></div></div></div>`;
}, 7);
t("If our visions align,", "Ready when you are,");
t("let&rsquo;s shape what&rsquo;s next together.", "let&rsquo;s put your calls to work.");
t("If our visions align, let&rsquo;s shape what&rsquo;s next together.", "Ready when you are, let&rsquo;s put your calls to work.");
t("Open to joining", "Put Better Pitch");
t("a creative team", "on your phone lines");
t("Apprenticeship &middot; October 2026", "Book a 30-minute walkthrough");
r(/<a href="https:\/\/guillaumezhu\.com\/mentions-legales\/"[^>]*>Legal notice<\/a>/, '<a href="#section-footer" class="nx-footer__meta-link">Privacy Policy</a>');
t("&copy; 2026 Guillaume Zhu", "&copy; 2026 Better Pitch");
r(/<a href="#section-journey">Journey<\/a>\s*<a href="#section-toolkit">Toolkit<\/a>\s*<a [^>]*>Projects<\/a>\s*<a [^>]*>Playground<\/a>\s*<a [^>]*>Contact<\/a>/,
  '<a href="#features">Platform</a>\n                <a href="#section-cinematic-project">Industries</a>\n                <a href="#roi-calculator">ROI Calculator</a>\n                <a href="#testimonials">Results</a>\n                <a href="#section-faq">FAQs</a>');
r(/<a [^>]*>LinkedIn<\/a>\s*<a [^>]*>GitHub<\/a>\s*<a href="mailto:[^"]*">Email<\/a>/,
  '<a href="#section-footer">Book a demo</a>\n                <a href="#section-footer">Talk to sales</a>\n                <a href="#hero">Try it live</a>');

/* ============================== links to the old sites ============================== */
const LINKS = {
  "solutions": "#features", "ai-products": "#features", "why-choose-lia": "#features",
  "pricing": "#roi-calculator", "faq": "#section-faq", "contact": "#section-footer",
  "industries/aviation": "#section-cinematic-project", "industries/hospitality": "#section-cinematic-project",
  "about": "#hero", "blog": "#section-faq", "privacy-policy": "#section-footer",
};
r(/href="https:\/\/www\.lialive\.ai\/([a-z\/-]*)"/g, (m, p) => 'href="' + (LINKS[p] || "#hero") + '"', 16);
r(/href="https:\/\/codegen\.co\.uk\/[^"]*"/g, 'href="#section-footer"', 2);

/* ============================== structured data ============================== */
const ORG = { "@context": "https://schema.org", "@type": "Organization", name: "Better Pitch",
  description: "Enterprise AI deployment company and home of the most natural voice AI: real emotion, 100+ languages and dialects, sub-300ms responses." };
const SITE = { "@context": "https://schema.org", "@type": "WebSite", name: "Better Pitch" };
const APP = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Better Pitch Voice AI",
  applicationCategory: "BusinessApplication", operatingSystem: "Web",
  description: "Voice AI agents for sales, support, collections, scheduling, feedback, recruitment and commerce calls.",
  offers: { "@type": "Offer", price: "2999", priceCurrency: "INR" } };
const decode = (h) => h.replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
const FAQLD = { "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ.map(([, , q, a]) => ({ "@type": "Question", name: decode(q), acceptedAnswer: { "@type": "Answer", text: decode(a) } })) };
let ld = 0;
r(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
  () => '<script type="application/ld+json">' + JSON.stringify([ORG, SITE, APP, FAQLD][ld++]) + "</script>", 4);

/* ============================== apply ============================== */
/* ============================== moved: manifesto after the Platform deck ============================== */
/* the "Emotion wins the conversation…" sentence plays right after the Platform deck's light cover
   (where the ROI calculator used to fade in); the ROI calculator follows it as its own section */
r(/(\n\n<!-- =+ -->\n<!-- "I create experiences…" manifesto[\s\S]*?\n<\/section>\n)([\s\S]*?<section id="section-toolkit"[\s\S]*?\n<\/section>\n)/,
  "$2$1");
/* ============================== added: a second copy of the manifesto ============================== */
/* the same sentence also plays between the feature carousel and the industries wheel (its original
   spot); js/manifesto.js drives every .mf section, js/section-seams.js feathers the wheel into it */
r(/\n(?=<!-- =+ -->\n<section id="section-cinematic-project")/,
  require("fs").readFileSync(require("path").join(__dirname, "manifesto-section.html"), "utf8").trimEnd()
    .replace("Plays after the Platform deck, before the ROI calculator; inserted by  ", "Second copy, between the feature carousel and the industries wheel; by  ")
    .replace('id="section-manifesto"', 'id="section-manifesto-intro"')
    /* the intro copy keeps the original line; the ROI copy leads into the calculator */
    .replace("Now see what every call is worth.", "We deploy your entire calling workflow and run it for you.")
    .replace(/\$/g, "$$$$") + "\n\n");

function apply(html) {
  ld = 0;
  for (const [re, to, n, label] of rules) {
    const found = [...html.matchAll(re.global ? re : new RegExp(re.source, re.flags + "g"))].length;
    if (found !== n) throw new Error(`brand-content: expected ${n} match(es), found ${found}: ${label.slice(0, 90)}`);
    html = html.replace(re, to);
  }
  html = featureServices(html);
  /* anything brand-like left in visible text or attributes is reported */
  const visible = html.replace(/<script[\s\S]*?<\/script>|<!--[\s\S]*?-->/g, "").replace(/class="[^"]*"/g, "");
  const left = visible.match(/.{0,40}(\bLIA\b|\bLia\b|lialive|CodeGen|codegen|Ravan|ravan|Guillaume|guillaumezhu).{0,40}/g);
  if (left) console.warn("brand-content: leftovers\n  " + left.join("\n  "));
  return html;
}

module.exports = { apply };
