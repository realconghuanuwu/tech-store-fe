import FlashSection from "./components/FlashSection.";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import BestSaleSection from "./components/BestSaleSection";
import BannerSection from "./components/BannerSection";
import OurProductSection from "./components/OurProductSection";
import NewArrivalSection from "./components/NewArrivalSection";
import ServiceLabelSection from "./components/ServiceLabelSection";
import GoToTopButton from "@/components/ui/GoToTopButton";
import CommonPage from "@/components/ui/CommonPage";

export default function HomePage() {
  return (
    <CommonPage>
      <main>
        <HeroSection />
        <FlashSection />
        <CategorySection />
        <BestSaleSection />
        <BannerSection />
        <OurProductSection />
        <NewArrivalSection />
        <ServiceLabelSection />
        <GoToTopButton />
      </main>
    </CommonPage>
  );
}
