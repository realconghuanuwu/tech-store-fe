import { Heart, Eye, Star } from "lucide-react";
import { Button, Card, Image } from "antd";

import Product1 from "@/assets/flash-section/gaming-headset.png";
import Product2 from "@/assets/flash-section/gaming-monitor-display.png";
import SectionCarousel from "@/components/ui/SectionCarousel";

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

export default function FlashSection() {
  return (
    <SectionCarousel
      title="Flash Sales"
      products={products}
      renderItem={(product) => <FlashCardRenderItem product={product} />}
      topRender={<FlashCardTopRender />}
      bottomRender={<FlashCardBottomRender />}
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
    <div className="flex items-end gap-8 mb-8">
      <h2 className="text-4xl font-semibold">Flash Sales</h2>

      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-600">Days</div>
          <div className="text-2xl font-bold">{formatTime(countdown.days)}</div>
        </div>
        <div className="text-2xl font-bold text-c-main-red">:</div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Hours</div>
          <div className="text-2xl font-bold">
            {formatTime(countdown.hours)}
          </div>
        </div>
        <div className="text-2xl font-bold text-c-main-red">:</div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Minutes</div>
          <div className="text-2xl font-bold">
            {formatTime(countdown.minutes)}
          </div>
        </div>
        <div className="text-2xl font-bold text-c-main-red">:</div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Seconds</div>
          <div className="text-2xl font-bold">
            {formatTime(countdown.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlashCardBottomRender() {
  return (
    <div className="text-center mt-8">
      <Button className="!py-6 !px-8  !bg-c-main-red !border-none !text-white">
        View All Products
      </Button>
    </div>
  );
}

function FlashCardRenderItem({ product }: { product: Product }) {
  return (
    <Card key={product.id}>
      <div className="relative bg-gray-100 rounded-t-lg overflow-hidden">
        <Image
          width={270}
          height={250}
          src={product.image}
          alt={product.name}
          className="object-contain"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-c-main-red text-white px-2 py-1 rounded text-sm font-medium">
          -{product.discount}%
        </div>

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button size="small" className="!rounded-full !size-8 ">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="small" className="!rounded-full !size-8">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button - Shows on Hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          Add To Cart
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-c-main-red font-semibold">
            ${product.salePrice}
          </span>
          <span className="text-gray-500 line-through">
            ${product.originalPrice}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < product.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviews})
          </span>
        </div>
      </div>
    </Card>
  );
}
