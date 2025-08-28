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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <p className="text-xl sm:text-2xl font-medium">
          Wishlist ({products?.length})
        </p>
        <Button className="w-full sm:w-auto px-8 py-5">Move All To Cart</Button>
      </div>
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 16, lg: 24, xl: 24 },
          { xs: 8, sm: 12, md: 16, lg: 24, xl: 24 },
        ]}
      >
        {products?.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <ProductCard product={product} hideRating />
          </Col>
        ))}
      </Row>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 my-6">
        <p className="text-xl sm:text-2xl font-medium">
          Wishlist ({products?.length})
        </p>
      </div>

      <SectionHeader
        title="Just For You"
        className="my-6"
        right={<Button className="w-full sm:w-auto px-12 py-6">See All</Button>}
      />
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 16, lg: 24, xl: 24 },
          { xs: 8, sm: 12, md: 16, lg: 24, xl: 24 },
        ]}
        className="mb-6"
      >
        {products?.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </CommonPage>
  );
}
