import './Hero.css';
import HeroIntro from './HeroIntro.jsx';
import FeatureCarousel from '../Features/FeatureCarousel.jsx';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 hero-atmosphere" />
      <HeroIntro />
      <FeatureCarousel />
      <div className="absolute inset-x-0 bottom-0 h-px bg-foreground/22" />
    </section>
  );
}
