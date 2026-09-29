import './FeatureCarousel.css';
import SalesLeadsCard from './cards/SalesLeadsCard.jsx';
import CustomerSupportCard from './cards/CustomerSupportCard.jsx';
import CollectionsCard from './cards/CollectionsCard.jsx';
import AppointmentsCard from './cards/AppointmentsCard.jsx';
import FeedbackCard from './cards/FeedbackCard.jsx';
import RecruitmentCard from './cards/RecruitmentCard.jsx';
import EcommerceCard from './cards/EcommerceCard.jsx';
import RealEstateCard from './cards/RealEstateCard.jsx';

export default function FeatureCarousel() {
  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex min-h-svh items-center overflow-hidden bg-background" style={{ opacity: 0, visibility: "hidden" }}>
      <div className="w-full">
        <div data-hero-reveal-progress-content="" className="relative bg-background" style={{ height: "100vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden bg-background hidden sm:block">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(80,33,172,0.12),transparent_55%),radial-gradient(circle_at_20%_70%,rgba(241,61,232,0.05),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(50,125,255,0.05),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background to-transparent" />
            <div className="pointer-events-none select-none absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="font-poppins font-black block" style={{ fontSize: "clamp(72px, 17vw, 260px)", lineHeight: "0.9", whiteSpace: "nowrap", color: "transparent", WebkitTextStroke: "1.5px rgba(247,54,121,0.35)", transform: "none" }}>
                {"OUR FEATURES   ✦   OUR FEATURES   ✦   OUR FEATURES   ✦   OUR FEATURES   ✦   OUR FEATURES   ✦   OUR FEATURES   ✦   OUR FEATURES"}
              </div>
              <div className="font-poppins font-black block" style={{ fontSize: "clamp(72px, 17vw, 260px)", lineHeight: "0.9", whiteSpace: "nowrap", color: "transparent", WebkitTextStroke: "1.5px rgba(247,54,121,0.35)", transform: "none" }}>
                {"POWERED BY AI   ✦   POWERED BY AI   ✦   POWERED BY AI   ✦   POWERED BY AI   ✦   POWERED BY AI   ✦   POWERED BY AI   ✦   POWERED BY AI"}
              </div>
            </div>
            <div className="absolute inset-0">
              <SalesLeadsCard />
              <CustomerSupportCard />
              <CollectionsCard />
              <AppointmentsCard />
              <FeedbackCard />
              <RecruitmentCard />
              <EcommerceCard />
              <RealEstateCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
