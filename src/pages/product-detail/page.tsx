import { useState } from "react";
import { Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { Button, Spin } from "antd";
import CommonPage from "@/components/ui/CommonPage";
import CImage from "@/components/CImage";
import { PATH } from "@/constants/router.constant";
import { useNavigate, useParams } from "react-router";
import {
  useGetProductById,
  useGetProducts,
} from "@/service/product/product.service";
import type { ProductRes } from "@/service/product/product.res";
import SectionCarousel from "@/components/ui/SectionCarousel";
import ProductCard, {
  type ProductCardProps,
} from "@/components/ui/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = id as string;
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Fetch product data from API
  const { data: product, isLoading, error } = useGetProductById(productId);
  const { data } = useGetProducts();

  const products = data?.map((product: ProductRes) => ({
    id: product.id,
    name: product.title,
    image: product.image,
    originalPrice: product.price,
    salePrice: product.price,
    discount: product.price,
    rating: product.rating.rate,
    reviews: product.rating.count,
  }));

  const productImages = [
    product?.image || "/placeholder.svg",
    "/white-gaming-controller-side-view.png",
    "/black-gaming-controller.png",
    "/gaming-controller-back.png",
  ];

  const colors = [
    { name: "Red", value: "#EF4444" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Black", value: "#000000" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const breadcrumbItems = [
    {
      title: "Home",
      onClick: () => navigate(PATH.HOME),
    },
    {
      title: product?.category || "Product",
      onClick: () => navigate(PATH.HOME),
    },
    {
      title: product?.title || "Product Detail",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <CommonPage breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center min-h-[400px]">
          <Spin size="large" />
        </div>
      </CommonPage>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <CommonPage breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate(PATH.HOME)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </CommonPage>
    );
  }

  return (
    <CommonPage breadcrumbItems={breadcrumbItems}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
            <CImage
              src={productImages[selectedImage] || ""}
              alt={product.title}
              showPreview={true}
              className="w-full !h-[400px] object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-gray-50 rounded-lg p-4 flex items-center justify-center size-20 border-2 transition-colors ${
                  selectedImage === index
                    ? "border-red-500"
                    : "border-transparent"
                }`}
              >
                <CImage
                  src={image || ""}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  showPreview={false}
                  className="w-[60px] h-[60px]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({product.rating.count} Reviews)
                </span>
              </div>
              <span className="text-green-600 text-sm">In Stock</span>
            </div>
            <p className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <hr className="border-gray-200" />

          {/* Colors */}
          <div>
            <h3 className="font-medium mb-3">Colours:</h3>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === index
                      ? "border-gray-800 scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-medium mb-3">Size:</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  type={selectedSize === size ? "primary" : "default"}
                  onClick={() => setSelectedSize(size)}
                  className={`${
                    selectedSize === size
                      ? "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded">
              <Button
                type="text"
                onClick={() => handleQuantityChange(-1)}
                icon={<Minus className="w-4 h-4" />}
                className="border-0 hover:bg-gray-100"
              />
              <span className="px-4 py-2 border-x min-w-[60px] text-center">
                {quantity}
              </span>
              <Button
                type="text"
                onClick={() => handleQuantityChange(1)}
                icon={<Plus className="w-4 h-4" />}
                className="border-0 hover:bg-gray-100"
              />
            </div>

            <Button
              type="primary"
              size="large"
              className="bg-red-500 hover:bg-red-600 border-red-500 px-8"
            >
              Buy Now
            </Button>

            <Button
              type="default"
              icon={<Heart className="w-5 h-5" />}
              className="border-gray-300 hover:border-gray-400"
            />
          </div>

          {/* Delivery Information */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium">Return Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionCarousel
        loading={isLoading}
        title="Related Item"
        products={products}
        renderItem={(item: ProductCardProps) => <ProductCard product={item} />}
      />
    </CommonPage>
  );
}
