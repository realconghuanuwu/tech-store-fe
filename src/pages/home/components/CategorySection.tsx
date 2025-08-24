import SectionCarousel from "@/components/ui/SectionCarousel";
import { Card, Typography } from "antd";
import {
  Computer,
  Smartphone,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
} from "lucide-react";
import type { ReactNode } from "react";

const products: CategoryProduct[] = [
  {
    id: 1,
    name: "Phones",
    icon: <Smartphone size={32} />,
  },
  {
    id: 2,
    name: "Computers",
    icon: <Computer size={32} />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch size={32} />,
  },
  {
    id: 4,
    name: "Headphones",
    icon: <Headphones size={32} />,
  },
  {
    id: 5,
    name: "Camera",
    icon: <Camera size={32} />,
  },
  {
    id: 6,
    name: "Gaming",
    icon: <Gamepad2 size={32} />,
  },
  {
    id: 7,
    name: "Tablets",
    icon: <Computer size={32} />,
  },
  {
    id: 8,
    name: "Audio",
    icon: <Headphones size={32} />,
  },
  {
    id: 9,
    name: "Accessories",
    icon: <Watch size={32} />,
  },
  {
    id: 10,
    name: "Laptops",
    icon: <Computer size={32} />,
  },
  {
    id: 11,
    name: "Monitors",
    icon: <Computer size={32} />,
  },
];

interface CategoryProduct {
  id: number;
  name: string;
  icon: ReactNode;
}

export default function CategorySection() {
  return (
    <SectionCarousel
      title="Category"
      products={products}
      topRender={<CategorySectionTopRender />}
      renderItem={(item: CategoryProduct) => (
        <div
          key={item.id}
          className="w-48 h-40 flex justify-center items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] group rounded-lg p-4 hover:bg-c-main-red hover:text-white transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col justify-center items-center  gap-2">
            {item.icon}
            <p className="!group-hover:text-white">{item.name}</p>
          </div>
        </div>
      )}
      slidesPerView={6}
      spaceBetween={16}
      showNavigation={true}
      autoplay={false}
      loop={false}
    />
  );
}

function CategorySectionTopRender() {
  return (
    <div className="flex items-end gap-8">
      <h2 className="text-4xl font-semibold">Browse By Category</h2>
    </div>
  );
}
