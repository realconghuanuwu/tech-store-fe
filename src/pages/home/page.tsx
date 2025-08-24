import FlashSection from "./components/FlashSection.";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import BestSaleSection from "./components/BestSaleSection";
import BannerSection from "./components/BannerSection";
import OurProductSection from "./components/OurProductSection";
import NewArrivalSection from "./components/NewArrivalSection";
import ServiceLabelSection from "./components/ServiceLabelSection";
import GoToTopButton from "@/components/ui/GoToTopButton";

export default function HomePage() {
  return (
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
  );
}
