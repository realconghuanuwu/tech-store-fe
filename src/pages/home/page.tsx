import FlashSection from "./components/FlashSection.";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import BestSaleSection from "./components/BestSaleSection";
import BannerSection from "./components/BannerSection";
import OurProductSection from "./components/OurProductSection";
import NewArrivalSection from "./components/NewArrivalSection";
import ServiceLabelSection from "./components/ServiceLabelSection";
import CommonPage from "@/components/ui/CommonPage";

export default function HomePage() {
  return (
    <CommonPage>
      <main className="min-h-screen">
        <div className="px-4 md:px-0">
          <HeroSection />
          <FlashSection />
          <CategorySection />
          <BestSaleSection />
          <OurProductSection />
          <NewArrivalSection />
          <BannerSection />
          <ServiceLabelSection />
        </div>
      </main>
    </CommonPage>
  );
}
