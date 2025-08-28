import ProductCard, {
  type ProductCardProps,
} from "@/components/ui/ProductCard";
import SectionCarousel from "@/components/ui/SectionCarousel";
import type { ProductRes } from "@/service/product/product.res";
import { useGetProducts } from "@/service/product/product.service";

export default function BestSaleSection() {
  const { data, isLoading } = useGetProducts();

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

  return (
    <SectionCarousel
      loading={isLoading}
      title="This Month"
      products={products}
      topRender={<BestSaleSectionTopRender />}
      renderItem={(item: ProductCardProps) => <ProductCard product={item} />}
    />
  );
}

function BestSaleSectionTopRender() {
  return (
    <div className="flex items-end gap-8 mb-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Best Selling Products
      </h2>
    </div>
  );
}
