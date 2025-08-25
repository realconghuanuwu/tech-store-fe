import { Button, Card, Image, Rate } from "antd";
import { Eye, Heart, Star } from "lucide-react";
import { PATH } from "@/constants/router.constant";
import { useNavigate } from "react-router";

export interface ProductCardProps {
  key?: string | number;
  id?: number;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  product,
  hideRating = false,
}: {
  product: ProductCardProps;
  hideRating?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <Card
      key={product.key}
      bodyStyle={{ padding: 0, margin: 0 }}
      className="w-full"
    >
      <div className="relative bg-gray-100 rounded-t-lg overflow-hidden group">
        <Image
          width="100%"
          height={200}
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-32 sm:h-40 md:h-48 lg:h-52"
        />

        {/* Discount Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-c-main-red text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-medium">
          -{product.discount}%
        </div>

        {/* Action Icons */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
          <Button size="small" className="!rounded-full !size-6 sm:!size-8">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Add to Cart Button - Shows on Hover */}
        <div className="absolute bottom-0 text-center bg-black rounded-b-lg text-white py-1.5 sm:py-2 w-full !z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-xs sm:text-sm">
          Add To Cart
        </div>
      </div>

      <div
        className="p-3 sm:p-4 hover:cursor-pointer"
        onClick={() =>
          navigate(
            PATH.PRODUCT.DETAIL.replace(":id", product.id?.toString() ?? "")
          )
        }
      >
        <h3 className="font-medium text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <span className="text-c-main-red font-semibold text-sm sm:text-base">
            ${product.salePrice}
          </span>
          <span className="text-gray-500 line-through text-xs sm:text-sm">
            ${product.originalPrice}
          </span>
        </div>

        {!hideRating && (
          <div className="flex items-center gap-1">
            <Rate
              className="text-[12px] sm:text-[14px] md:text-[16px]"
              allowHalf
              defaultValue={product.rating}
              disabled
            />
            <span className="text-xs sm:text-sm text-gray-600 ml-1">
              ({product.reviews})
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
