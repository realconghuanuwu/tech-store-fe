import {
  Button,
  Input,
  Select,
  Slider,
  Checkbox,
  List,
  Row,
  Col,
  Drawer,
} from "antd";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import CommonPage from "@/components/ui/CommonPage";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard, {
  type ProductCardProps,
} from "@/components/ui/ProductCard";
import { products as categoryProducts } from "@/pages/home/components/CategorySection";
import { useGetProducts } from "@/service/product/product.service";
import type { ProductRes } from "@/service/product/product.res";

const brands = [
  "All Brands",
  "HAVIT",
  "AK",
  "Samsung",
  "S-Series",
  "Pro",
  "Logitech",
  "IKEA",
  "JBL",
];

export default function ProductSearch() {
  const { data } = useGetProducts();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const products = data?.map((product: ProductRes) => ({
    id: product.id,
    name: product.title,
    image: product.image,
    originalPrice: product.price,
    salePrice: product.price,
    rating: product.rating.rate,
    reviews: product.rating.count,
    discount: 0,
  }));

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <List
          dataSource={[
            ...categoryProducts?.map((item) => ({
              key: item.name,
              label: item.name,
              icon: item.icon,
              className: "text-black",
            })),
          ]}
          renderItem={(item: any) => (
            <List.Item
              className="!px-0 !py-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={item.onClick}
            >
              <div
                className={`w-full py-4 px-4 flex items-center gap-3 ${
                  item.className || "text-black"
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            </List.Item>
          )}
          className="!border-0"
        />
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            range={{ draggableTrack: true }}
            max={1200}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>$1200</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.slice(1).map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox>
                <span className="text-sm text-gray-700 cursor-pointer">
                  {brand}
                </span>
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white">
        <h4 className="font-semibold mb-2">Special Offer!</h4>
        <p className="text-sm mb-4">Get up to 50% off on selected items</p>
        <Button type="default" size="small" className="w-full">
          Shop Now
        </Button>
      </div>
    </div>
  );

  return (
    <CommonPage breadcrumbItems={[{ title: "Home" }, { title: "Products" }]}>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <Button
            type="default"
            icon={<Filter className="w-4 h-4" />}
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2"
          >
            Filters
          </Button>
          <p className="text-sm text-gray-600">{products?.length} products</p>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Drawer */}
        <Drawer
          title={
            <div className="flex items-center justify-between">
              <span>Filters</span>
              <Button
                type="text"
                icon={<X className="w-4 h-4" />}
                onClick={() => setIsFilterDrawerOpen(false)}
              />
            </div>
          }
          placement="left"
          onClose={() => setIsFilterDrawerOpen(false)}
          open={isFilterDrawerOpen}
          width={280}
          className="lg:hidden"
        >
          <FilterSidebar />
        </Drawer>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <SectionHeader title="Phones" />
          </div>

          {/* Search Bar & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-sm text-gray-600 order-2 sm:order-1">
              Showing 12 of {products?.length} products
            </p>
            <div className="flex items-center gap-4 order-1 sm:order-2">
              <Select className="w-full sm:w-auto min-w-44">
                <Select.Option value="featured">Featured</Select.Option>
                <Select.Option value="price-low">
                  Price: Low to High
                </Select.Option>
                <Select.Option value="price-high">
                  Price: High to Low
                </Select.Option>
                <Select.Option value="rating">Highest Rated</Select.Option>
                <Select.Option value="newest">Newest</Select.Option>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <Row
            gutter={[
              { xs: 8, sm: 12, md: 16, lg: 16, xl: 24 },
              { xs: 16, sm: 20, md: 24, lg: 24, xl: 24 },
            ]}
            className="mb-6"
          >
            {products?.map((product) => (
              <Col key={product.id} xs={12} sm={8} md={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button type="default" className="px-8 bg-transparent">
              Load More Products
            </Button>
          </div>
        </div>
      </div>
    </CommonPage>
  );
}
