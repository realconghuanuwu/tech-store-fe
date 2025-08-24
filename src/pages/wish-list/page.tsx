import CommonPage from "@/components/ui/CommonPage";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ProductRes } from "@/service/product/product.res";
import { useGetProducts } from "@/service/product/product.service";
import { Button, Col, Row } from "antd";

export default function WishListPage() {
  const { data } = useGetProducts();

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
  return (
    <CommonPage>
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-medium mb-4">
          Wishlist ({products?.length})
        </p>
        <Button className="px-12 py-6">Move All To Cart</Button>
      </div>
      <Row gutter={[16, 16]}>
        {products?.map((product) => (
          <Col span={6}>
            <ProductCard key={product.id} product={product} hideRating />
          </Col>
        ))}
      </Row>
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-medium mb-4">
          Wishlist ({products?.length})
        </p>
      </div>

      <SectionHeader
        title="Just For You"
        className="my-6"
        right={<Button className="px-12 py-6">See All</Button>}
      />
      <Row gutter={[16, 16]} className="mb-6">
        {products?.map((product) => (
          <Col span={6}>
            <ProductCard key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </CommonPage>
  );
}
