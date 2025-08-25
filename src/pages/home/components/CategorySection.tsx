import SectionCarousel from "@/components/ui/SectionCarousel";
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
    icon: <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 2,
    name: "Computers",
    icon: <Computer className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 4,
    name: "Headphones",
    icon: <Headphones className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 5,
    name: "Camera",
    icon: <Camera className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 6,
    name: "Gaming",
    icon: <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 7,
    name: "Tablets",
    icon: <Computer className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 8,
    name: "Audio",
    icon: <Headphones className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 9,
    name: "Accessories",
    icon: <Watch className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 10,
    name: "Laptops",
    icon: <Computer className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  {
    id: 11,
    name: "Monitors",
    icon: <Computer className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
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
          className="w-32 sm:w-40 md:w-48 h-28 sm:h-32 md:h-40 flex justify-center items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] group rounded-lg p-3 sm:p-4 hover:bg-c-main-red hover:text-white transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col justify-center items-center gap-1.5 sm:gap-2">
            <div className="text-gray-600 group-hover:text-white">
              {item.icon}
            </div>
            <p className="!group-hover:text-white text-sm sm:text-base font-medium text-center">
              {item.name}
            </p>
          </div>
        </div>
      )}
      slidesPerView={6}
      spaceBetween={16}
      showNavigation={true}
      autoplay={false}
      loop={false}
      customBreakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 14,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 16,
        },
      }}
    />
  );
}

function CategorySectionTopRender() {
  return (
    <div className="flex items-end gap-4 sm:gap-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Browse By Category
      </h2>
    </div>
  );
}
