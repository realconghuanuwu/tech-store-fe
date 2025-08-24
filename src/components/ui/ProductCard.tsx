import { Button, Card, Image } from "antd";
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
          className="object-contain w-full"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-c-main-red text-white px-2 py-1 rounded text-sm font-medium">
          -{product.discount}%
        </div>

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button size="small" className="!rounded-full !size-8">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="small" className="!rounded-full !size-8">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button - Shows on Hover */}
        <div className="absolute bottom-0 text-center bg-black  rounded-b-lg text-white py-2 w-full !z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
          Add To Cart
        </div>
      </div>

      <div
        className="p-4 hover:cursor-pointer"
        onClick={() =>
          navigate(
            PATH.PRODUCT.DETAIL.replace(":id", product.id?.toString() ?? "")
          )
        }
      >
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-c-main-red font-semibold">
            ${product.salePrice}
          </span>
          <span className="text-gray-500 line-through">
            ${product.originalPrice}
          </span>
        </div>

        {!hideRating && (
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
        )}
      </div>
    </Card>
  );
}
