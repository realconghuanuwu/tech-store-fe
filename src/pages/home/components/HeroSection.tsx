import { ChevronRight } from "lucide-react";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

export default function HeroSection() {
  return (
    <div className="flex bg-white">
      {/* Category Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 py-6">
        <nav className="space-y-1">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span className="text-sm font-medium">{category}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </a>
          ))}
        </nav>
      </div>

      {/* Promotional Banner */}
      <div className="flex-1 bg-black text-white relative overflow-hidden">
        <div className="flex items-center h-full">
          {/* Content */}
          <div className="flex-1 px-12 py-16">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 mr-3">
                {/* Apple logo placeholder */}
                <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black text-xs font-bold">🍎</span>
                </div>
              </div>
              <span className="text-sm text-gray-300">iPhone 14 Series</span>
            </div>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Up to 10%
              <br />
              off Voucher
            </h2>

            <button className="flex items-center text-white hover:text-gray-300 transition-colors group">
              <span className="text-sm font-medium mr-2 border-b border-white pb-1">
                Shop Now
              </span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Product Image Placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-80 h-80 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                iPhone Image Placeholder
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
