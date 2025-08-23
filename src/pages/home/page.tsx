import SectionCarousel from "@/components/ui/SectionCarousel";
import FlashSection from "./components/FlashSection.";
import HeroSection from "./components/HeroSection";
import { Card, Divider, Image } from "antd";
import CategorySection from "./components/CategorySection";
import BestSaleSection from "./components/BestSaleSection";

const products: any[] = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FlashSection />
      <Divider />
      <CategorySection />
      <BestSaleSection />
    </main>
  );
}
