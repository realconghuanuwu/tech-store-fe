import { Button } from "antd";

import Product1 from "@/assets/flash-section/gaming-headset.png";
import Product2 from "@/assets/flash-section/gaming-monitor-display.png";
import SectionCarousel from "@/components/ui/SectionCarousel";
import ProductCard from "@/components/ui/ProductCard";
import { useGetProducts } from "@/service/product/product.service";
import type { ProductRes } from "@/service/product/product.res";

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

export default function FlashSection() {
  const { data, isLoading, error } = useGetProducts();

  const products = data?.map((product: ProductRes) => ({
    id: product.id,
    name: product.title,
    image: product.image,
    originalPrice: product.price,
    salePrice: product.price,
    rating: product.rating.rate,
    reviews: product.rating.count,
  }));

  return (
    <SectionCarousel
      loading={isLoading}
      title="Flash Sales"
      products={products}
      renderItem={(product: Product) => <ProductCard product={product} />}
      topRender={<FlashCardTopRender />}
      bottomRender={<FlashCardBottomRender />}
      loop={true}
      autoplay={true}
      autoplayDelay={5000}
    />
  );
}

const formatTime = (time: number) => {
  return time.toString().padStart(2, "0");
};

// Mock countdown timer - in real app, this would be dynamic
const countdown = {
  days: 3,
  hours: 23,
  minutes: 19,
  seconds: 56,
};

function FlashCardTopRender() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Flash Sales
      </h2>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-600">Days</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold">
            {formatTime(countdown.days)}
          </div>
        </div>
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-c-main-red">
          :
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Hours</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold">
            {formatTime(countdown.hours)}
          </div>
        </div>
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-c-main-red">
          :
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Minutes</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold">
            {formatTime(countdown.minutes)}
          </div>
        </div>
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-c-main-red">
          :
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Seconds</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold">
            {formatTime(countdown.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlashCardBottomRender() {
  return (
    <div className="text-center">
      <Button className="!py-4 sm:!py-6 !px-6 sm:!px-8 !bg-c-main-red !border-none !text-white !text-sm sm:!text-base">
        View All Products
      </Button>
    </div>
  );
}
