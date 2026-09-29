import Hero from './components/Hero/Hero.jsx';
import FeaturesMobile from './components/Features/FeaturesMobile.jsx';
import ManifestoIntro from './components/Manifesto/ManifestoIntro.jsx';
import Industries from './components/Industries/Industries.jsx';
import Journey from './components/Journey/Journey.jsx';
import Platform from './components/Platform/Platform.jsx';
import Faq from './components/Faq/Faq.jsx';
import Testimonials from './components/Testimonials/Testimonials.jsx';
import Footer from './components/Footer/Footer.jsx';
import HeroCaption from './components/Hero/HeroCaption.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import SectionNav from './components/SectionNav/SectionNav.jsx';
import Chat from './components/Chat/Chat.jsx';

/*
 * Page markup, in the same order as the static site's <body>.
 * The tree is static: it renders once and is never re-rendered, because the
 * scroll scenes / widgets in src/legacy/ (the site's original behaviour
 * scripts) take over these nodes after the first commit (see main.jsx).
 */
export default function App() {
  return (
    <>
      <Hero />
      <FeaturesMobile />
      <ManifestoIntro />
      <Industries />
      <Journey />
      <Platform />
      <Testimonials />
      <Faq />
      <Footer />
      {/* client-only UI (portals on the reference site) */}
      <HeroCaption />
      <Navbar />
      <SectionNav />
      <Chat />
    </>
  );
}
