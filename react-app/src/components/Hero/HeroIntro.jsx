import HeroHeadline from './HeroHeadline.jsx';
import VoiceAgent from './VoiceAgent.jsx';
import ServiceRail from './ServiceRail.jsx';

export default function HeroIntro() {
  return (
    <div className="relative z-10 flex min-h-svh flex-col page-gutter pb-8 pt-5 lg:pb-10 lg:pt-6">
      <div className="relative grid flex-1 items-center gap-9 py-8 max-[359px]:gap-12 min-[640px]:max-[1279px]:grid-cols-1 min-[640px]:max-[1279px]:gap-0 min-[640px]:max-[1279px]:py-3 min-[1280px]:grid-cols-[minmax(14rem,0.95fr)_minmax(24rem,1.35fr)_minmax(14rem,0.95fr)] min-[1280px]:gap-4 min-[1280px]:py-4">
        <HeroHeadline />
        <VoiceAgent />
        <ServiceRail />
      </div>
    </div>
  );
}
