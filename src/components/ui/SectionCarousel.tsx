import { useState, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye, Star } from "lucide-react";
import { Button, Card, Image } from "antd";

import Product1 from "@/assets/flash-section/gaming-headset.png";
import Product2 from "@/assets/flash-section/gaming-monitor-display.png";
import SectionHeader from "@/components/ui/SectionHeader";

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    image: Product1,
    originalPrice: 160,
    salePrice: 120,
    discount: 40,
    rating: 5,
    reviews: 88,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    image: Product2,
    originalPrice: 1160,
    salePrice: 960,
    discount: 35,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    image: "/gaming-monitor-display.png",
    originalPrice: 400,
    salePrice: 370,
    discount: 30,
    rating: 5,
    reviews: 99,
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    image: "/comfortable-office-chair.png",
    originalPrice: 400,
    salePrice: 375,
    discount: 25,
    rating: 4,
    reviews: 99,
  },
  {
    id: 5,
    name: "S-Series Comfort Chair",
    image: "/modern-office-chair.png",
    originalPrice: 400,
    salePrice: 375,
    discount: 25,
    rating: 4,
    reviews: 99,
  },
  {
    id: 6,
    name: "Gaming Headset Pro",
    image: "/gaming-headset.png",
    originalPrice: 200,
    salePrice: 150,
    discount: 25,
    rating: 5,
    reviews: 120,
  },
];

interface SectionCarouselProps<T> {
  title: string;
  products: T[];
  topRender?: ReactNode;
  renderItem: (item: T) => ReactNode;
  bottomRender?: ReactNode;
}

export default function SectionCarousel<T>({
  title,
  products,
  topRender,
  renderItem,
  bottomRender,
}: SectionCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 4;

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth =
        scrollContainerRef.current.scrollWidth / products.length;
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <section className="py-16 px-4  mx-auto">
      {/* Section Header */}
      <SectionHeader
        title={title}
        right={
          <div className="flex items-center gap-2">
            <Button
              size="small"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="!rounded-full !size-8  !bg-gray-100"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              size="small"
              onClick={handleNext}
              disabled={currentIndex >= products.length - itemsPerView}
              className="!rounded-full !size-8 !bg-gray-100"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        }
      />

      {/* Flash Sales Title and Countdown */}
      {topRender && topRender}

      {/* Products Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((item) => renderItem(item))}
      </div>

      {bottomRender && bottomRender}
    </section>
  );
}
