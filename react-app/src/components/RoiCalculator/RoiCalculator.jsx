import './RoiCalculator.css';

export default function RoiCalculator() {
  return (
    <section id="roi-calculator" className="relative bg-background py-20 sm:py-28">
      <div className="page-container">
        <div className="grid gap-16 md:grid-cols-[1fr_1.15fr] md:gap-10 xl:gap-16">
          <div className="lg:self-center">
            <div style={{ opacity: "0", transform: "translateY(20px)" }}>
              <h2 className="font-poppins text-[2rem] font-bold leading-tight text-foreground sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3rem]">Calculate ROI</h2>
              <p className="mt-3 max-w-sm text-[14px] leading-[1.8] text-foreground/38">Discover how much money and time Better Pitch puts back into your business.</p>
            </div>
            <div className="mt-10 space-y-8" style={{ opacity: "0", transform: "translateY(16px)" }}>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-foreground/65">Customer Conversations (Monthly)</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/15 text-[9px] text-foreground/30 select-none">i</div>
                </div>
                <div className="relative flex h-[48px] items-center overflow-hidden rounded-full" style={{ background: "rgba(var(--fg-rgb), 0.05)" }}>
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: "calc(19.19191919191919% + 24px)", minWidth: "48px", background: "linear-gradient(90deg, #b62158, #ed3a7e)" }} />
                  <div className="absolute right-3 z-10 rounded-full px-3 py-1.5 text-[13px] font-bold text-foreground/90" style={{ background: "rgba(var(--fg-rgb), 0.07)" }}>
                    10K
                  </div>
                  <input type="range" min="500" max="50000" step="500" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" defaultValue="10000" />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-foreground/65">Number of Agents</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/15 text-[9px] text-foreground/30 select-none">i</div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="flex-1 rounded-full py-[11px] text-[13px] font-semibold transition-colors duration-200 bg-foreground/[0.05] text-foreground/35 hover:text-foreground/60" tabIndex="0">
                    1–10
                  </button>
                  <button type="button" className="flex-1 rounded-full py-[11px] text-[13px] font-semibold transition-colors duration-200 bg-foreground/[0.05] text-foreground/35 hover:text-foreground/60" tabIndex="0">
                    11–25
                  </button>
                  <button type="button" className="flex-1 rounded-full py-[11px] text-[13px] font-semibold transition-colors duration-200 bg-[#6d28d9] text-white shadow-[0_0_18px_rgba(109,40,217,0.45)]" tabIndex="0">
                    26–50
                  </button>
                  <button type="button" className="flex-1 rounded-full py-[11px] text-[13px] font-semibold transition-colors duration-200 bg-foreground/[0.05] text-foreground/35 hover:text-foreground/60" tabIndex="0">
                    51–100
                  </button>
                  <button type="button" className="flex-1 rounded-full py-[11px] text-[13px] font-semibold transition-colors duration-200 bg-foreground/[0.05] text-foreground/35 hover:text-foreground/60" tabIndex="0">
                    100+
                  </button>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-foreground/65">{"Agent's Salary (Monthly)"}</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/15 text-[9px] text-foreground/30 select-none">i</div>
                </div>
                <div className="relative flex h-[48px] items-center overflow-hidden rounded-full" style={{ background: "rgba(var(--fg-rgb), 0.05)" }}>
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: "calc(22.62142857142857% + 24px)", minWidth: "48px", background: "linear-gradient(90deg, #b62158, #ed3a7e)" }} />
                  <div className="absolute right-3 z-10 rounded-full px-3 py-1.5 text-[13px] font-bold text-foreground/90" style={{ background: "rgba(var(--fg-rgb), 0.07)" }}>
                    $4.2K
                  </div>
                  <input type="range" min="1000" max="15000" step="250" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" defaultValue="4167" />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-foreground/65">Average Resolution Time (Minutes)</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/15 text-[9px] text-foreground/30 select-none">i</div>
                </div>
                <div className="relative flex h-[48px] items-center overflow-hidden rounded-full" style={{ background: "rgba(var(--fg-rgb), 0.05)" }}>
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: "calc(24.137931034482758% + 24px)", minWidth: "48px", background: "linear-gradient(90deg, #b62158, #ed3a7e)" }} />
                  <div className="absolute right-3 z-10 rounded-full px-3 py-1.5 text-[13px] font-bold text-foreground/90" style={{ background: "rgba(var(--fg-rgb), 0.07)" }}>
                    8m
                  </div>
                  <input type="range" min="1" max="30" step="1" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" defaultValue="8" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4" style={{ opacity: "0", transform: "translateY(20px)" }}>
            <div className="overflow-hidden rounded-3xl" style={{ background: "rgba(var(--fg-rgb), 0.04)" }}>
              <svg viewBox="0 0 200 118" className="w-full" style={{ overflow: "hidden" }}>
                <defs>
                  <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#951d49" />
                    <stop offset="50%" stopColor="#d92869" />
                    <stop offset="100%" stopColor="#ea3367" />
                  </linearGradient>
                  <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(246,92,156,0.7)" />
                    <stop offset="100%" stopColor="rgba(217,40,105,0)" />
                  </radialGradient>
                  <radialGradient id="outer-ring-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(217,40,105,0.18)" />
                    <stop offset="100%" stopColor="rgba(217,40,105,0)" />
                  </radialGradient>
                </defs>
                <line x1="-20.146575999999996" y1="1.1850559999999994" x2="-31.964271999999994" y2="3.2688319999999997" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="-19.422750000000008" y1="4.9438759999999995" x2="-24.317125000000004" y2="5.966166000000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-18.581438000000006" y1="8.678052000000001" x2="-23.441333" y2="9.853382" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-17.623493999999994" y1="12.384045999999998" x2="-22.44412899999999" y2="13.711261" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-16.54965" y1="16.058076" x2="-21.326274999999995" y2="17.535866" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-15.361004000000008" y1="19.696725999999998" x2="-20.088914000000003" y2="21.323640999999995" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-14.058898" y1="23.296214" x2="-18.733442999999994" y2="25.070649000000003" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-12.644552000000004" y1="26.853124" x2="-17.261132000000003" y2="28.773334" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-11.119186" y1="30.363917999999998" x2="-15.673250999999993" y2="32.428013" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-9.484508000000005" y1="33.825058" x2="-20.253476000000006" y2="39.119326" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="-7.742103999999998" y1="37.23325" x2="-12.157764" y2="39.578875000000004" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-5.893559999999994" y1="40.5852" x2="-10.233459999999994" y2="43.0682" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-3.9407059999999916" y1="43.87737" x2="-8.200570999999997" y2="46.495295" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-1.8856159999999988" y1="47.10670999999999" x2="-6.061256" y2="49.856984999999995" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="0.26975799999999595" y1="50.270048" x2="-3.8175470000000047" y2="53.149968" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="2.5233419999999995" y1="53.364090000000004" x2="-1.4716029999999876" y2="56.37081500000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="4.872818000000009" y1="56.38602999999999" x2="0.9741630000000043" y2="59.516605" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="7.315989999999999" y1="59.332696" x2="3.5174650000000014" y2="62.584036" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="9.850418000000005" y1="62.20128199999999" x2="0.9832459999999941" y2="70.286654" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12.47354" y1="64.988982" x2="8.886389999999992" y2="68.472137" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="15.182916000000006" y1="67.69299" x2="11.706806" y2="71.286965" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="17.975617999999997" y1="70.310622" x2="14.613962999999998" y2="74.011877" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="20.849205999999995" y1="72.839438" x2="17.60532099999999" y2="76.64433299999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="23.800752000000003" y1="75.276754" x2="20.677831999999995" y2="79.181539" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="26.827206000000004" y1="77.620374" x2="23.828321000000003" y2="81.621209" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="29.925762000000006" y1="79.867858" x2="27.053866999999997" y2="83.960803" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="33.093248" y1="82.017132" x2="30.351168" y2="86.198162" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="36.326614000000006" y1="84.065878" x2="30.063658000000004" y2="94.30186599999999" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="39.622688" y1="86.01214399999999" x2="37.148208" y2="90.356904" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="42.978176000000005" y1="87.8541" x2="40.641216" y2="92.27435" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="46.389784" y1="89.589916" x2="44.192644" y2="94.081306" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="49.854096" y1="91.21776200000001" x2="47.798936" y2="95.775867" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="53.36794" y1="92.73617399999999" x2="51.45679" y2="97.356509" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="56.927534" y1="94.14356599999999" x2="55.162269" y2="98.821581" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="60.529584" y1="95.43871800000001" x2="58.911944000000005" y2="100.169813" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="64.170552" y1="96.620166" x2="62.702132" y2="101.39968099999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="67.846778" y1="97.68669" x2="64.684166" y2="109.26243" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="71.554602" y1="98.63755800000001" x2="70.388807" y2="103.49975300000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="75.290364" y1="99.471428" x2="74.277674" y2="104.367798" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="79.05052599999999" y1="100.187812" x2="78.191941" y2="105.113542" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="82.831428" y1="100.785978" x2="82.127798" y2="105.736223" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="86.629044" y1="101.265072" x2="86.081054" y2="106.23495199999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="90.439958" y1="101.62485" x2="90.048153" y2="106.60947499999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="94.260144" y1="101.864946" x2="94.024904" y2="106.85941100000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="98.086064" y1="101.984994" x2="98.00762399999999" y2="106.984379" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="101.913936" y1="101.984994" x2="102.102192" y2="113.983518" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="105.739856" y1="101.864946" x2="105.975096" y2="106.85941100000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="109.560042" y1="101.62485" x2="109.951847" y2="106.60947499999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="113.370956" y1="101.265072" x2="113.918946" y2="106.23495199999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="117.168572" y1="100.785978" x2="117.872202" y2="105.736223" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="120.94947400000001" y1="100.187812" x2="121.808059" y2="105.113542" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="124.709636" y1="99.471428" x2="125.722326" y2="104.367798" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="128.445398" y1="98.63755800000001" x2="129.61119300000001" y2="103.49975300000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="132.153222" y1="97.68669" x2="133.470977" y2="102.50991499999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="135.829448" y1="96.620166" x2="139.353656" y2="108.091002" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="139.470416" y1="95.43871800000001" x2="141.088056" y2="100.169813" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="143.072466" y1="94.14356599999999" x2="144.837731" y2="98.821581" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="146.63206" y1="92.73617399999999" x2="148.54321" y2="97.356509" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="150.145904" y1="91.21776200000001" x2="152.201064" y2="95.775867" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="153.610216" y1="89.589916" x2="155.807356" y2="94.081306" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="157.02182399999998" y1="87.8541" x2="159.358784" y2="92.27435" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="160.37731200000002" y1="86.01214399999999" x2="162.851792" y2="90.356904" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="163.673386" y1="84.065878" x2="166.282951" y2="88.330873" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="166.90675199999998" y1="82.017132" x2="173.48774400000002" y2="92.051604" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="170.07423799999998" y1="79.867858" x2="172.946133" y2="83.960803" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="173.172794" y1="77.620374" x2="176.17167899999998" y2="81.621209" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="176.199248" y1="75.276754" x2="179.322168" y2="79.181539" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="179.15079400000002" y1="72.839438" x2="182.394679" y2="76.64433299999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="182.024382" y1="70.310622" x2="185.386037" y2="74.011877" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="184.817084" y1="67.69299" x2="188.293194" y2="71.286965" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="187.52646" y1="64.988982" x2="191.11361" y2="68.472137" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="190.149582" y1="62.20128199999999" x2="193.84423700000002" y2="65.57018699999999" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="192.68401" y1="59.332696" x2="201.80047" y2="67.13591199999999" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="195.127182" y1="56.38602999999999" x2="199.025837" y2="59.516605" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="197.476658" y1="53.364090000000004" x2="201.471603" y2="56.37081500000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="199.730242" y1="50.270048" x2="203.817547" y2="53.149968" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="201.885616" y1="47.10670999999999" x2="206.06125600000001" y2="49.856984999999995" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="203.94070599999998" y1="43.87737" x2="208.200571" y2="46.495295" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="205.89355999999998" y1="40.5852" x2="210.23345999999998" y2="43.0682" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="207.74210399999998" y1="37.23325" x2="212.157764" y2="39.578875000000004" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="209.484508" y1="33.825058" x2="213.97157800000002" y2="36.031003" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="211.119186" y1="30.363917999999998" x2="222.048942" y2="35.317746" stroke="rgba(var(--fg-rgb), 0.14)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="212.644552" y1="26.853124" x2="217.261132" y2="28.773334" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="214.058898" y1="23.296214" x2="218.733443" y2="25.070649000000003" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="215.361004" y1="19.696725999999998" x2="220.088914" y2="21.323640999999995" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="216.54964999999999" y1="16.058076" x2="221.326275" y2="17.535866" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="217.623494" y1="12.384045999999998" x2="222.44412899999998" y2="13.711261" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="218.581438" y1="8.678052000000001" x2="223.441333" y2="9.853382" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="219.42275" y1="4.9438759999999995" x2="224.317125" y2="5.966166000000001" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="220.14657599999998" y1="1.1850559999999994" x2="225.070616" y2="2.0532959999999996" stroke="rgba(var(--fg-rgb), 0.055)" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M -18.18 0.84 A 120 120 0 0 0 218.18 0.84" fill="none" stroke="rgba(var(--fg-rgb), 0.025)" strokeWidth="1" strokeLinecap="round" />
                <path d="M -10.30 -0.55 A 112 112 0 0 0 210.30 -0.55" className="roi-gauge-track" fill="none" stroke="#301e2a" strokeWidth="14" strokeLinecap="round" />
                <path d="M -2.42 -1.94 A 104 104 0 0 0 202.42 -1.94" fill="none" stroke="rgba(var(--fg-rgb), 0.018)" strokeWidth="1" strokeLinecap="round" />
                <line x1="-0.45041600000000415" y1="-2.287904000000001" x2="9.397663999999992" y2="-4.0243839999999995" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="0.348550000000003" y1="1.7619040000000012" x2="4.256450000000001" y2="0.9084960000000031" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="1.310614000000001" y1="5.776011999999998" x2="5.180785999999998" y2="4.765187999999998" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="2.434348" y1="9.747892" x2="6.260452000000001" y2="8.581308" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="3.717814000000004" y1="13.671118" x2="7.493586000000008" y2="12.350681999999999" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="5.1589719999999915" y1="17.53906" x2="8.878227999999993" y2="16.066940000000002" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="6.755476000000002" y1="21.3457" x2="10.412123999999991" y2="19.7243" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="8.504674000000009" y1="25.084509999999995" x2="17.474804000000006" y2="20.66446" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="10.403812000000002" y1="28.749574000000003" x2="13.917388000000003" y2="26.837826" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="12.449523999999997" y1="32.33467" x2="15.882875999999996" y2="30.28233" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="14.638750000000002" y1="35.834188000000005" x2="17.98625" y2="33.644612" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="16.967715999999996" y1="39.242212" x2="20.223883999999998" y2="36.918988000000006" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="19.432648" y1="42.553234" x2="22.592152" y2="40.100166" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="22.029567999999998" y1="45.761746" x2="25.087232" y2="43.182854000000006" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="24.754192000000003" y1="48.86264799999999" x2="32.131232" y2="42.111408" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="27.601929999999996" y1="51.85073800000001" x2="30.441069999999996" y2="49.033062" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="30.568395999999993" y1="54.72112" x2="33.29120399999999" y2="51.79088" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="33.648489999999995" y1="57.469204000000005" x2="36.25051" y2="54.431196" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="36.837214" y1="60.090298000000004" x2="39.314186" y2="56.949501999999995" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="40.129468" y1="62.580321999999995" x2="42.477332000000004" y2="59.341877999999994" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="43.519642" y1="64.935094" x2="45.734558" y2="61.60430600000001" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="47.002432" y1="67.150738" x2="52.198271999999996" y2="58.606548000000004" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="50.572024" y1="69.223684" x2="52.510376" y2="65.724716" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="54.222502" y1="71.150566" x2="56.017698" y2="67.576034" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="57.94795" y1="72.928018" x2="59.59705" y2="69.283782" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="61.742248" y1="74.553388" x2="63.242551999999996" y2="70.845412" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="65.599276" y1="76.023922" x2="66.948324" y2="72.258278" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="69.512608" y1="77.337172" x2="70.708192" y2="73.520028" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="73.47592" y1="78.490996" x2="76.07632" y2="68.835016" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="77.482582" y1="79.483456" x2="78.365618" y2="75.582144" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="81.526168" y1="80.31312399999999" x2="82.250632" y2="76.37927599999999" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="85.599946" y1="80.978368" x2="86.164654" y2="77.018432" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="89.697388" y1="81.47837200000001" x2="90.101412" y2="77.498828" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="93.81166" y1="81.812116" x2="94.05434" y2="77.819484" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="97.936132" y1="81.97909" x2="98.017068" y2="77.97991" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="102.063868" y1="81.97909" x2="101.86152799999999" y2="71.98114" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="106.18834" y1="81.812116" x2="105.94566" y2="77.819484" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="110.302612" y1="81.47837200000001" x2="109.898588" y2="77.498828" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="114.400054" y1="80.978368" x2="113.835346" y2="77.018432" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="118.473832" y1="80.31312399999999" x2="117.749368" y2="76.37927599999999" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="122.517418" y1="79.483456" x2="121.634382" y2="75.582144" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="126.52408" y1="78.490996" x2="125.48392" y2="74.628604" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="130.487392" y1="77.337172" x2="127.49843200000001" y2="67.79431199999999" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="134.400724" y1="76.023922" x2="133.051676" y2="72.258278" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="138.257752" y1="74.553388" x2="136.757448" y2="70.845412" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="142.05205" y1="72.928018" x2="140.40295" y2="69.283782" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="145.777498" y1="71.150566" x2="143.982302" y2="67.576034" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="149.427976" y1="69.223684" x2="147.489624" y2="65.724716" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="152.997568" y1="67.150738" x2="150.91923200000002" y2="63.733062000000004" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="156.480358" y1="64.935094" x2="150.943068" y2="56.608124000000004" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="159.870532" y1="62.580321999999995" x2="157.522668" y2="59.341877999999994" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="163.16278599999998" y1="60.090298000000004" x2="160.685814" y2="56.949501999999995" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="166.35151000000002" y1="57.469204000000005" x2="163.74949" y2="54.431196" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="169.431604" y1="54.72112" x2="166.708796" y2="51.79088" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="172.39807000000002" y1="51.85073800000001" x2="169.55893" y2="49.033062" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="175.245808" y1="48.86264799999999" x2="172.294992" y2="46.16215199999999" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="177.97043200000002" y1="45.761746" x2="170.32627200000002" y2="39.314516000000005" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="180.567352" y1="42.553234" x2="177.407848" y2="40.100166" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="183.032284" y1="39.242212" x2="179.776116" y2="36.918988000000006" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="185.36124999999998" y1="35.834188000000005" x2="182.01375000000002" y2="33.644612" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="187.550476" y1="32.33467" x2="184.117124" y2="30.28233" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="189.59618799999998" y1="28.749574000000003" x2="186.08261199999998" y2="26.837826" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="191.49532599999998" y1="25.084509999999995" x2="187.907274" y2="23.31649" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="193.244524" y1="21.3457" x2="184.10290400000002" y2="17.2922" stroke="rgba(var(--fg-rgb), 0.10)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="194.841028" y1="17.53906" x2="191.12177200000002" y2="16.066940000000002" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="196.282186" y1="13.671118" x2="192.506414" y2="12.350681999999999" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="197.565652" y1="9.747892" x2="193.739548" y2="8.581308" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="198.689386" y1="5.776011999999998" x2="194.819214" y2="4.765187999999998" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="199.65145" y1="1.7619040000000012" x2="195.74355" y2="0.9084960000000031" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <line x1="200.45041600000002" y1="-2.287904000000001" x2="196.51118400000001" y2="-2.982496000000001" stroke="rgba(var(--fg-rgb), 0.04)" strokeWidth="0.7" strokeLinecap="round" />
                <path d="M -10.30 -0.55 A 112 112 0 0 0 210.30 -0.55" fill="none" stroke="url(#arc-grad)" strokeWidth="14" strokeLinecap="round" strokeDasharray="312.76300195738384" strokeDashoffset="312.76300195738384" />
                <circle cx="111.98087595613404" cy="91.35734646319357" r="18" fill="url(#dot-glow)" />
                <circle cx="111.98087595613404" cy="91.35734646319357" r="9" fill="#d92869" opacity="0.45" />
                <circle cx="111.98087595613404" cy="91.35734646319357" r="7" fill="#ed3a7e" />
                <circle cx="111.98087595613404" cy="91.35734646319357" r="3.5" fill="#fdb5d7" />
              </svg>
              <div className="px-8 pb-3 pt-1 text-center">
                <p className="font-poppins text-[3rem] font-bold leading-none text-foreground sm:text-[3.5rem]">$323,028</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/32">Year 1 Savings</p>
                <p className="mt-1.5 text-[12px] text-foreground/30">
                  {"That's "}
                  {/*  */}
                  $26,919
                  {/*  */}
                  {" saved every month!"}
                </p>
              </div>
              <div className="space-y-4 border-t border-foreground/[0.06] px-8 py-6">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/45">Automated Tickets / Month</span>
                  <div className="h-px flex-1 bg-foreground/[0.08]" />
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/82">8,500 tickets</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/45">5-Year Projection</span>
                  <div className="h-px flex-1 bg-foreground/[0.08]" />
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/82">$1,615,140</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/45">Payroll Offset</span>
                  <div className="h-px flex-1 bg-foreground/[0.08]" />
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/82">17% of annual payroll</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 overflow-hidden rounded-3xl" style={{ background: "rgba(var(--fg-rgb), 0.04)" }}>
              <div className="px-7 py-7">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/35">Hours Saved / Year</p>
                <p className="font-poppins text-[2.8rem] font-bold leading-none text-foreground">5,600</p>
                <p className="mt-2 text-[11px] text-foreground/28">
                  35
                  {/*  */}
                  % time reduction
                </p>
              </div>
              <div className="relative border-l border-foreground/[0.07] px-7 py-7">
                <div className="absolute left-0 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-bold text-white/70" style={{ background: "#2e1826", border: "1px solid rgba(255,255,255,0.08)" }}>
                  »
                </div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/35">Agents Reassigned</p>
                <p className="font-poppins text-[2.8rem] font-bold leading-none text-foreground">9</p>
                <p className="mt-2 text-[11px] text-foreground/28">To higher-value work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
