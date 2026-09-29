import betterpitchSvg from '../../assets/betterpitch.svg';

/*
 * ===== header + staggered menu (portal) =====
 */
export default function Navbar() {
  return (
    <div id="staggered-menu" className="sm-scope fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none z-[9000]">
      <div className="staggered-menu-wrapper pointer-events-none relative w-full h-full" style={{ "--sm-accent": "#f73679" }} data-position="right">
        <div className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]" aria-hidden="true">
          <div className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: "#40081c" }} />
          <div className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: "#24020c" }} />
        </div>
        <header className="absolute top-0 left-0 w-full flex items-center justify-between page-gutter pt-5 pointer-events-none z-20 lg:pt-6" aria-label="Main navigation">
          <div className="pointer-events-auto select-none">
            <a href="#hero" data-home-link="">
              <img alt="Better Pitch logo" width="609" height="130" decoding="async" className="bp-logo-header h-auto" style={{ color: "transparent" }} src={betterpitchSvg} />
            </a>
          </div>
          <div className="pointer-events-auto flex items-center gap-4">
            <button type="button" aria-label="Open menu" aria-expanded="false" aria-controls="staggered-menu-panel" className="sm-toggle relative inline-flex items-center gap-[0.5rem] bg-transparent border-0 cursor-pointer font-bold text-[10px] sm:text-[12px] tracking-[0.22em] uppercase text-white leading-none overflow-visible transition-opacity hover:opacity-70">
              <span className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap" aria-hidden="true">
                <span className="sm-toggle-textInner flex flex-col leading-none">
                  <span className="block h-[1em] leading-none">Menu</span>
                  <span className="block h-[1em] leading-none">Close</span>
                </span>
              </span>
              {" "}
              <span className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center will-change-transform" aria-hidden="true">
                <span className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform" />
                <span className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform" />
              </span>
            </button>
            {" "}
            <a href="#section-footer" className="sm-get-in-touch relative inline-flex h-7 sm:h-8 items-center justify-center rounded-full px-3 sm:px-5 text-[10px] sm:text-[12px] font-bold tracking-[0.18em] uppercase">
              Get in touch
            </a>
            {" "}
            <span className="sm-extra" style={{ color: "#ffffff", pointerEvents: "auto" }}>
              <button type="button" id="theme-toggle" aria-label="Switch to light mode" className="relative inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-current/15 bg-current/[0.04] text-current transition-colors hover:bg-current/[0.09] top-[3px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun absolute transition-all duration-300 scale-0 rotate-45 opacity-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                {" "}
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon absolute transition-all duration-300 scale-100 rotate-0 opacity-100" aria-hidden="true">
                  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                </svg>
              </button>
            </span>
          </div>
        </header>
        <aside id="staggered-menu-panel" className="sm-panel absolute top-0 right-0 h-full flex flex-col overflow-y-auto z-10 pointer-events-auto" aria-hidden="true">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/20 to-transparent" />
            <div className="absolute right-[-6rem] top-24 h-52 w-52 rounded-full bg-fuchsia-600/8 blur-3xl" />
          </div>
          <div className="relative flex-1 flex flex-col justify-between px-10 sm:px-12 lg:px-14 pt-24 pb-10">
            <ul className="sm-panel-list list-none m-0 p-0 flex flex-col" role="list">
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <a className="sm-panel-item relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-block no-underline" href="#features" aria-label="View solutions" data-index="1">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">Solutions</span>
                  </a>
                </div>
              </li>
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <a className="sm-panel-item relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-block no-underline" href="#features" aria-label="View the platform" data-index="2">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">Platform</span>
                  </a>
                </div>
              </li>
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <button type="button" className="sm-panel-item sm-panel-toggle relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-flex items-center gap-[0.35em] bg-transparent border-0 p-0 text-left" aria-label="Browse industries" aria-expanded="false" aria-controls="sm-submenu-2" data-index="3">
                    <span className="sm-panel-itemLabel inline-flex items-center gap-[0.3em] will-change-transform [transform-origin:50%_100%]">
                      Industries
                      <svg className="sm-panel-chevron" width="0.42em" height="0.42em" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="sm-sub-wrap">
                  <div className="sm-sub-clip" inert>
                    <ul id="sm-submenu-2" className="sm-sub-list list-none m-0 flex flex-col" role="list">
                      <li>
                        <a className="sm-sub-item block font-poppins no-underline" href="#section-cinematic-project" aria-label="View BFSI and NBFC industry page">
                          {"BFSI & NBFC"}
                        </a>
                      </li>
                      <li>
                        <a className="sm-sub-item block font-poppins no-underline" href="#section-cinematic-project" aria-label="View Real Estate industry page">
                          Real Estate
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <a className="sm-panel-item relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-block no-underline" href="#hero" aria-label="Learn about us" data-index="4">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">About us</span>
                  </a>
                </div>
              </li>
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <a className="sm-panel-item relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-block no-underline" href="#section-faq" aria-label="Read the Better Pitch blog" data-index="5">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">BLOG</span>
                  </a>
                </div>
              </li>
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <a className="sm-panel-item relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-block no-underline" href="#roi-calculator" aria-label="View pricing plans" data-index="6">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">Pricing</span>
                  </a>
                </div>
              </li>
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <a className="sm-panel-item relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-block no-underline" href="#section-faq" aria-label="Frequently asked questions" data-index="7">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">FAQ</span>
                  </a>
                </div>
              </li>
              <li className="sm-panel-itemWrap relative">
                <div className="overflow-hidden">
                  <a className="sm-panel-item relative font-poppins font-bold cursor-pointer leading-[1.05] tracking-[-1.5px] uppercase inline-block no-underline" href="#section-footer" aria-label="Contact us" data-index="8">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">Contact</span>
                  </a>
                </div>
              </li>
            </ul>
            <div className="pt-8 border-t border-white/[0.06]">
              <img alt="Better Pitch logo" width="609" height="130" decoding="async" className="bp-logo-menu h-auto opacity-40" style={{ color: "transparent" }} src={betterpitchSvg} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
