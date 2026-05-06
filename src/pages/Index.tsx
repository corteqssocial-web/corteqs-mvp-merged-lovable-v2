import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InternationalDiasporaHero from "@/components/InternationalDiasporaHero";
import DiasporaSearchBar from "@/components/DiasporaSearchBar";
import ConsultantCategories from "@/components/ConsultantCategories";
import FeaturedConsultants from "@/components/FeaturedConsultants";
import FeaturedEvents from "@/components/FeaturedEvents";
import AssociationsSection from "@/components/AssociationsSection";
import BusinessesSection from "@/components/BusinessesSection";
import Footer from "@/components/Footer";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import { useDiaspora } from "@/contexts/DiasporaContext";

const Index = () => {
  const { diaspora } = useDiaspora();
  const isInternational = diaspora !== "tr";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {!isInternational && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ambient-blob absolute left-[-8rem] top-28 h-72 w-72 rounded-full bg-turquoise/10 blur-3xl" />
          <div className="ambient-blob absolute right-[-7rem] top-40 h-80 w-80 rounded-full bg-gold/8 blur-3xl" />
          <div className="ambient-blob absolute left-[12%] top-[42rem] h-72 w-72 rounded-full bg-primary/7 blur-3xl" />
          <div className="ambient-blob absolute right-[8%] top-[68rem] h-72 w-72 rounded-full bg-turquoise/8 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(255,218,185,0.12),transparent_28%),linear-gradient(180deg,rgba(243,251,249,0.84)_0%,rgba(249,248,244,0.62)_38%,rgba(242,250,248,0.78)_100%)]" />
        </div>
      )}

      <Navbar />
      {isInternational ? (
        <>
          <InternationalDiasporaHero />
          <Footer />
        </>
      ) : (
        <>
          <HeroSection />
          <SectionErrorBoundary sectionName="DiasporaSearchBar">
            <DiasporaSearchBar />
          </SectionErrorBoundary>
          <ConsultantCategories />
          <FeaturedConsultants />
          <AssociationsSection />
          <BusinessesSection />
          <FeaturedEvents />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
