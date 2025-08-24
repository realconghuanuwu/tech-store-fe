import { type ReactNode, useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Card, Skeleton } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/utils/function";

interface SectionCarouselProps<T> {
  title: string;
  products: T[] | any;
  topRender?: ReactNode;
  renderItem: (item: T) => ReactNode;
  bottomRender?: ReactNode;
  loading?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  grid?: {
    rows: number;
    fill: "row" | "column";
  };
}

// Skeleton component for product cards
const ProductSkeleton = () => (
  <Card bodyStyle={{ padding: 0, margin: 0 }} className="w-64">
    <div className="p-4">
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  </Card>
);

export default function SectionCarousel<T>({
  title,
  products,
  topRender,
  renderItem,
  bottomRender,
  loading = false,
  slidesPerView = 4,
  spaceBetween = 16,
  showNavigation = true,
  showPagination = false,
  autoplay = false,
  autoplayDelay = 3000,
  loop = false,
  grid,
}: SectionCarouselProps<T>) {
  // Generate unique ID for this carousel instance
  const carouselId = useId();
  const prevButtonClass = `swiper-button-prev-${carouselId}`;
  const nextButtonClass = `swiper-button-next-${carouselId}`;
  const paginationClass = `swiper-pagination-${carouselId}`;

  // Generate skeleton items when loading
  const skeletonItems = Array.from(
    { length: grid ? grid.rows * slidesPerView : 6 },
    (_, index) => (
      <SwiperSlide key={`${carouselId}-skeleton-${index}`}>
        <ProductSkeleton />
      </SwiperSlide>
    )
  );

  return (
    <section className="py-16 mx-auto">
      {/* Section Header */}
      <SectionHeader title={title} />

      {/* Flash Sales Title and Countdown */}
      <div
        className={cn(
          "flex items-center justify-between gap-2 mb-8",
          !topRender && "justify-end"
        )}
      >
        {topRender && topRender}

        {showNavigation && (
          <div className="flex items-center gap-2">
            <Button
              size="small"
              className={`${prevButtonClass} !rounded-full !size-8 p-3 !bg-gray-100`}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              size="small"
              className={`${nextButtonClass} !rounded-full !size-8 p-3 !bg-gray-100`}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Products Carousel with Swiper */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Grid]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={{
            nextEl: `.${nextButtonClass}`,
            prevEl: `.${prevButtonClass}`,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  el: `.${paginationClass}`,
                }
              : false
          }
          autoplay={
            autoplay
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }
              : false
          }
          loop={loop}
          grid={grid}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
              grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 14,
              grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
            },
            1024: {
              slidesPerView: slidesPerView,
              spaceBetween: spaceBetween,
              grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
            },
          }}
          className="!pb-8"
        >
          {loading
            ? skeletonItems
            : products?.map((item: T, index: number) => (
                <SwiperSlide key={`${carouselId}-slide-${index}`}>
                  <div className="p-1">{renderItem(item)}</div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Custom pagination */}
        {showPagination && (
          <div className={`${paginationClass} flex justify-center mt-4`} />
        )}
      </div>

      {bottomRender && bottomRender}
    </section>
  );
}
