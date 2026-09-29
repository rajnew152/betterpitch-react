import './ServiceRail.css';

export default function ServiceRail() {
  return (
    <div className="order-3 ml-auto w-full max-w-[18.5rem] max-[1279px]:hidden lg:pt-6">
      <div className="flex flex-col text-left" style={{ opacity: "0", transform: "translateX(24px)" }}>
        <h2 className="mb-2 font-poppins text-lg font-bold text-foreground min-[640px]:max-[767px]:mb-1.5 min-[640px]:max-[767px]:text-sm lg:mb-3 lg:text-xl">
          Better Pitch for
        </h2>
        <div className="relative overflow-hidden" style={{ height: "clamp(480px, 72svh, 640px)" }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8" style={{ background: "linear-gradient(to bottom, rgb(var(--bg-rgb)) 0%, transparent 100%)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10" style={{ background: "linear-gradient(to top, rgb(var(--bg-rgb)) 0%, transparent 100%)" }} />
          <div className="hero-rail-scroll flex flex-col gap-5 min-[640px]:max-[767px]:gap-3 lg:gap-8">
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"SALES & LEADS"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Call new leads in minutes, qualify intent and route hot prospects to your closers!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                CUSTOMER SUPPORT
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Resolve common questions instantly and escalate complex calls with full context!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"COLLECTIONS & EMI"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Compliant reminders with call windows, retries, dispositions and audit trails!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                APPOINTMENTS
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Confirm, remind and reschedule by phone to cut no-shows!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"FEEDBACK & CSAT"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Voice surveys that turn ratings into structured insights!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                RECRUITMENT
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Screen candidates at scale and hand shortlists to your recruiters!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"E-COMMERCE COD & RTO"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Confirm COD orders, follow up on NDRs and recover abandoned carts!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                REAL ESTATE
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Book up to 5× more site visits from the same lead pool, faster!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"SALES & LEADS"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Call new leads in minutes, qualify intent and route hot prospects to your closers!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                CUSTOMER SUPPORT
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Resolve common questions instantly and escalate complex calls with full context!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"COLLECTIONS & EMI"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Compliant reminders with call windows, retries, dispositions and audit trails!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                APPOINTMENTS
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Confirm, remind and reschedule by phone to cut no-shows!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"FEEDBACK & CSAT"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Voice surveys that turn ratings into structured insights!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                RECRUITMENT
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Screen candidates at scale and hand shortlists to your recruiters!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                {"E-COMMERCE COD & RTO"}
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Confirm COD orders, follow up on NDRs and recover abandoned carts!
              </p>
            </article>
            <article className="border-l-2 border-foreground/20 py-1 pl-4 min-[640px]:max-[767px]:pl-2">
              <h3 className="mb-1.5 font-jura text-[0.78rem] font-medium uppercase tracking-[0.12em] text-foreground min-[640px]:max-[767px]:mb-1 min-[640px]:max-[767px]:text-[0.55rem] min-[640px]:max-[767px]:tracking-[0.08em] lg:text-[0.85rem]">
                REAL ESTATE
              </h3>
              <p className="font-inter text-[0.7rem] leading-5 text-foreground/60 min-[640px]:max-[767px]:text-[0.46rem] min-[640px]:max-[767px]:leading-[1.45] lg:text-[0.75rem]">
                Book up to 5× more site visits from the same lead pool, faster!
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
