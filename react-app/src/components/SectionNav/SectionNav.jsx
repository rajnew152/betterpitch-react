/*
 * ===== section dots navigation (desktop, hover devices only) =====
 */
export default function SectionNav() {
  return (
    <nav id="section-nav" aria-label="Page sections" className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block" style={{ display: "none" }}>
      <span aria-hidden="true" className="fixed inset-y-0 right-0 w-5" />
      {" "}
      <span aria-hidden="true" className="absolute right-0 top-1/2 h-[70vh] w-9 -translate-y-1/2" />
      <ul className="relative flex flex-col items-end gap-0.5 py-2 pr-2.5" style={{ opacity: "0", transform: "translateX(8px)" }}>
        <li>
          <button type="button" data-section="hero" aria-label="Scroll to Home" className="group/item flex cursor-pointer items-center justify-end gap-2.5 py-[5px]">
            <span className="sn-label whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold tracking-wide backdrop-blur-xl transition-colors duration-200" style={{ display: "none" }}>
              Home
            </span>
            <span className="sn-dot h-[3px] rounded-full transition-all duration-300" />
          </button>
        </li>
        <li>
          <button type="button" data-section="features" aria-label="Scroll to Features" className="group/item flex cursor-pointer items-center justify-end gap-2.5 py-[5px]">
            <span className="sn-label whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold tracking-wide backdrop-blur-xl transition-colors duration-200" style={{ display: "none" }}>
              Features
            </span>
            <span className="sn-dot h-[3px] rounded-full transition-all duration-300" />
          </button>
        </li>
        <li>
          <button type="button" data-section="section-cinematic-project" aria-label="Scroll to Industries" className="group/item flex cursor-pointer items-center justify-end gap-2.5 py-[5px]">
            <span className="sn-label whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold tracking-wide backdrop-blur-xl transition-colors duration-200" style={{ display: "none" }}>
              Industries
            </span>
            <span className="sn-dot h-[3px] rounded-full transition-all duration-300" />
          </button>
        </li>
        <li>
          <button type="button" data-section="testimonials" aria-label="Scroll to Results" className="group/item flex cursor-pointer items-center justify-end gap-2.5 py-[5px]">
            <span className="sn-label whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold tracking-wide backdrop-blur-xl transition-colors duration-200" style={{ display: "none" }}>
              Results
            </span>
            <span className="sn-dot h-[3px] rounded-full transition-all duration-300" />
          </button>
        </li>
        <li>
          <button type="button" data-section="section-faq" aria-label="Scroll to FAQs" className="group/item flex cursor-pointer items-center justify-end gap-2.5 py-[5px]">
            <span className="sn-label whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold tracking-wide backdrop-blur-xl transition-colors duration-200" style={{ display: "none" }}>
              FAQs
            </span>
            <span className="sn-dot h-[3px] rounded-full transition-all duration-300" />
          </button>
        </li>
        <li>
          <button type="button" data-section="section-next" aria-label="Scroll to Get Started" className="group/item flex cursor-pointer items-center justify-end gap-2.5 py-[5px]">
            <span className="sn-label whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold tracking-wide backdrop-blur-xl transition-colors duration-200" style={{ display: "none" }}>
              Get Started
            </span>
            <span className="sn-dot h-[3px] rounded-full transition-all duration-300" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
