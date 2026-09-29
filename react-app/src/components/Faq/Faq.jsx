import './Faq.css';

/* The first FAQS_VISIBLE questions show by default; "View more" (legacy/faq.js)
   reveals the rest. Answers only restate what the site already says about the
   product (languages, latency, security, call actions, integrations, analytics). */
const FAQS_VISIBLE = 7;
const FAQS = [
  ["What is Better Pitch?", "Better Pitch is a real-time voice AI platform that speaks 30+ languages and dialects, including Hindi, Hinglish, Tamil and Telugu, with sub-300ms latency. It runs outbound campaigns, inbound routing, IVR flows, bookings and post-call analytics out of the box."],
  ["Can Better Pitch switch languages mid-call?", "Yes. Better Pitch detects the language the caller responds in and adapts mid-call. It is especially strong at Hindi, Hinglish and English switching, which happens naturally in almost every Indian business call."],
  ["How secure is my data with Better Pitch?", "Every call is encrypted in transit and at rest, with role-based workspace permissions, audit-ready records and India data-residency options. We are SOC 2, GDPR and HIPAA ready, with CERT-In empanelled VAPT."],
  ["What can an agent do during a call?", "Every agent can end calls gracefully, transfer to a fixed or dynamic number, run IVR and press-digit flows, and trigger custom functions that call your APIs mid-call, then continue naturally with the response."],
  ["Do I need a credit card to start?", "No. You can sign up and explore the full Better Pitch platform for free without a credit card. Paid plans start at ₹2,999/month, with GST invoices and cancel-anytime billing."],
  ["How natural does the agent sound?", "Callers hear real emotion, natural pacing and replies in under 300ms, so conversations flow the way a good human call does, without awkward pauses or robotic scripts."],
  ["Does Better Pitch work with my CRM?", "Yes. Through APIs and webhooks every call, outcome and next step syncs to your CRM and calendar, and agents can look up or update your systems mid-call."],
  ["What does the agent know about my business?", "You give it a knowledge base of your FAQs, policies and pricing. The agent answers from that content on every call and stays on-script for your brand."],
  ["Can a call be handed over to a human?", "Yes. When a caller needs a person, the agent transfers to a fixed number or routes dynamically to the right team, so hot leads and escalations reach a human fast."],
  ["What happens after each call?", "Every call is recorded, transcribed and scored for sentiment and outcome, so you can see what happened on each call, spot trends across campaigns and decide what to do next."],
  ["Which industries use Better Pitch?", "Teams in real estate, BFSI and collections, healthcare, EdTech, D2C and e-commerce, hospitality, logistics and contact centres run their sales, support and collections calls on Better Pitch."],
  ["Who sets up and runs the agents?", "We do. Better Pitch deploys your entire calling workflow (calls, follow-ups, CRM and dashboards) and runs it for you, working alongside your team from pilot to scale."],
];

export default function Faq() {
  return (
    <section id="section-faq" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-violet-700/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-indigo-700/8 blur-[100px]" />
      <div className="relative page-container">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          <div className="lg:pt-1 bp-faq-intro">
            <h2 className="font-poppins text-[1.85rem] font-bold leading-[1.15] text-foreground sm:text-[2.1rem] md:text-[2.4rem] bp-faq-title" style={{ opacity: "0", transform: "translateY(24px)" }}>
              Voice AI FAQs.
              {/*  */}
              {" "}
              <span className="block">{"Let's clear things up."}</span>
            </h2>
            <div className="mt-7 space-y-4 text-sm leading-7 text-foreground/40 bp-faq-copy" style={{ opacity: "0", transform: "translateY(18px)" }}>
              <p>We know — AI calling raises real questions about languages, latency and compliance. Better Pitch brings the answers together in one place.</p>
              <p>Whether you run sales, support or collections, we’re here to make AI calling simple, clear and easy to deploy.</p>
              <div className="bp-faq-help">
                <p className="bp-faq-help__title">Still have a question?</p>
                <p className="bp-faq-help__text">Talk to our team. We’ll walk you through how Better Pitch fits your calls.</p>
                <a className="bp-faq-help__btn" href="#section-footer">
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="origin-left h-px w-full bg-foreground/[0.07] mb-0" style={{ opacity: "0", transform: "scaleX(0)" }} />
            {FAQS.map(([q, a], i) => (
              <div key={q} className={i >= FAQS_VISIBLE ? "bp-faq-extra" : undefined} style={{ opacity: "0", transform: "translateY(18px)" }}>
                <button className="group relative flex w-full items-center justify-between gap-6 py-5 text-left bp-faq-q">
                  <span className="pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left bg-gradient-to-r from-violet-500/60 via-indigo-400/40 to-transparent" style={{ transform: "scaleX(0)" }} />
                  <span className="text-base font-medium transition-colors duration-200 text-foreground/75 group-hover:text-foreground">{q}</span>
                  <span className="shrink-0 text-foreground/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div className="overflow-hidden" style={{ height: "0px", opacity: "0" }}>
                  <p className="pb-5 text-sm leading-7 text-foreground/45 bp-faq-a">{a}</p>
                </div>
                <div className="h-px w-full bg-foreground/[0.07]" />
              </div>
            ))}
            <div className="mt-8" style={{ opacity: "0", transform: "translateY(12px)" }}>
              <a className="inline-flex items-center gap-2.5 rounded-full border border-foreground/10 px-6 py-3 text-sm font-medium text-foreground/60 transition-all hover:border-violet-500/40 hover:text-foreground/90 bp-faq-more" href="#section-faq" aria-expanded="false">
                <span className="bp-faq-more__label">View more</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
