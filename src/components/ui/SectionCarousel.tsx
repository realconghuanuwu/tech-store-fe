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
  right?: ReactNode;
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
  customBreakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

// Skeleton component for product cards
const ProductSkeleton = () => (
  <Card bodyStyle={{ padding: 0, margin: 0 }} className="w-full sm:w-64">
    <div className="p-4">
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  </Card>
);

export default function SectionCarousel<T>({
  title,
  products,
  topRender,
  right,
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
  customBreakpoints,
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

  // Default breakpoints if customBreakpoints is not provided
  const defaultBreakpoints = {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 8,
      grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
    },
    480: {
      slidesPerView: 1.5,
      spaceBetween: 10,
      grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
    },
    640: {
      slidesPerView: 2.2,
      spaceBetween: 12,
      grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
    },
    768: {
      slidesPerView: 3.2,
      spaceBetween: 14,
      grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
    },
    1024: {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      grid: grid ? { rows: grid.rows, fill: grid.fill } : undefined,
    },
  };

  // Use custom breakpoints if provided, otherwise use default
  const breakpoints = customBreakpoints || defaultBreakpoints;

  return (
    <section className="py-8 sm:py-12 lg:py-16 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <SectionHeader title={title} right={right} />

      {/* Flash Sales Title and Countdown */}
      <div
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2 mb-6 sm:mb-8",
          !topRender && "justify-end"
        )}
      >
        {topRender && topRender}

        {showNavigation && (
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              size="small"
              className={`${prevButtonClass} !rounded-full !size-7 p-2 sm:p-3 !bg-gray-100 hover:!bg-gray-200`}
            >
              <ChevronLeft size={14} className="!w-4 !h-4" />
            </Button>
            <Button
              size="small"
              className={`${nextButtonClass} !rounded-full !size-7 p-2 sm:p-3 !bg-gray-100 hover:!bg-gray-200`}
            >
              <ChevronRight size={14} className="!w-4 !h-4" />
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
          breakpoints={breakpoints}
          className="!pb-6 sm:!pb-8"
        >
          {loading
            ? skeletonItems
            : products?.map((item: T, index: number) => (
                <SwiperSlide key={`${carouselId}-slide-${index}`}>
                  <div className="p-0.5 sm:p-1">{renderItem(item)}</div>
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
