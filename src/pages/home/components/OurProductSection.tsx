import ProductCard, {
  type ProductCardProps,
} from "@/components/ui/ProductCard";
import SectionCarousel from "@/components/ui/SectionCarousel";
import type { ProductRes } from "@/service/product/product.res";
import { useGetProducts } from "@/service/product/product.service";

// Custom Grid Component for 2-row layout
function ProductGrid({ products }: { products: ProductCardProps[] }) {
  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);

  return (
    <div className="product-grid-container">
      {/* First row */}
      <div className="product-grid-row">
        {firstRow.map((product, index) => (
          <div key={`first-row-${product.id || index}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {/* Second row */}
      <div className="product-grid-row">
        {secondRow.map((product, index) => (
          <div key={`second-row-${product.id || index}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurProductSection() {
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
  })); // Use mock data if API data is not available

  // Create groups of 8 products for 2-row layout
  const createProductGroups = (products: any[]) => {
    const groups = [];
    for (let i = 0; i < products?.length; i += 8) {
      const group = products.slice(i, i + 8);
      if (group?.length > 0) {
        groups.push(group);
      }
    }
    return groups;
  };

  const groupedProducts = createProductGroups(products);

  return (
    <SectionCarousel
      loading={isLoading}
      title="Our Products"
      products={groupedProducts}
      topRender={<BestSaleSectionTopRender />}
      renderItem={(productGroup: any[]) => (
        <ProductGrid products={productGroup} />
      )}
      slidesPerView={1}
      spaceBetween={16}
      showNavigation={true}
      autoplay={false}
      loop={false}
    />
  );
}

function BestSaleSectionTopRender() {
  return (
    <div className="flex items-end gap-8 mb-8">
      <h2 className="text-4xl font-semibold">Explore Our Products</h2>
    </div>
  );
}
