import { Menu, Image, type MenuProps } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./HeroSection.css";
import { useNavigate } from "react-router";
import { PATH } from "@/constants/router.constant";

type MenuItem = Required<MenuProps>["items"][number];

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
};

const swiperStyle: React.CSSProperties = {
  height: "400px",
  width: "100%",
};

const mobileSwiperStyle: React.CSSProperties = {
  height: "250px",
  width: "100%",
};

const slideStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function HeroSection() {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Woman's Fashion",
      children: [
        { key: "1.1", label: "Option 1" },
        { key: "1.2", label: "Option 2" },
        { key: "1.3", label: "Option 3" },
        { key: "1.4", label: "Option 4" },
      ],
      onClick: () => {
        navigate(PATH.PRODUCT.ROOT);
      },
    },
    {
      key: "2",
      label: "Electronics",
      onClick: () => {
        navigate(PATH.PRODUCT.ROOT);
      },
    },
    {
      key: "3",
      label: "Groceries & Pets",
      onClick: () => {
        navigate(PATH.PRODUCT.ROOT);
      },
    },
    {
      key: "4",
      label: "Health & Beauty",
      onClick: () => {
        navigate(PATH.PRODUCT.ROOT);
      },
    },
  ];

  return (
    <div className="flex bg-white">
      {/* Category Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-64">
        <Menu style={{ width: 256 }} mode="inline" items={items} />
      </div>

      {/* Promotional Banner */}
      <div className="flex-1 bg-white text-white relative overflow-hidden hero-section">
        {/* Desktop Swiper */}
        <div className="hidden md:block">
          <Swiper
            style={swiperStyle}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            allowTouchMove={true}
            grabCursor={true}
          >
            <SwiperSlide style={slideStyle}>
              <Image
                src={
                  "https://file.hstatic.net/200000722513/file/gearvn-back-to-school-2025-header-pc_658a24f226a146f69278f2c4905c3b22.png"
                }
                alt="Tech Product 1"
                style={imageStyle}
                preview={false}
              />
            </SwiperSlide>
            <SwiperSlide style={slideStyle}>
              <Image
                src={
                  "https://file.hstatic.net/200000722513/file/gearvn-pc-gvn-t8-slider.jpg"
                }
                alt="Tech Product 2"
                style={imageStyle}
                preview={false}
              />
            </SwiperSlide>
            <SwiperSlide style={slideStyle}>
              <Image
                src={
                  "https://file.hstatic.net/200000722513/file/gearvn-gaming-gear-deal-hoi-slider-t8-jpg.jpg"
                }
                alt="Tech Product 3"
                style={imageStyle}
                preview={false}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            style={mobileSwiperStyle}
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            allowTouchMove={true}
            grabCursor={true}
          >
            <SwiperSlide style={slideStyle}>
              <Image
                src={
                  "https://file.hstatic.net/200000722513/file/gearvn-back-to-school-2025-header-pc_658a24f226a146f69278f2c4905c3b22.png"
                }
                alt="Tech Product 1"
                style={imageStyle}
                preview={false}
              />
            </SwiperSlide>
            <SwiperSlide style={slideStyle}>
              <Image
                src={
                  "https://file.hstatic.net/200000722513/file/gearvn-pc-gvn-t8-slider.jpg"
                }
                alt="Tech Product 2"
                style={imageStyle}
                preview={false}
              />
            </SwiperSlide>
            <SwiperSlide style={slideStyle}>
              <Image
                src={
                  "https://file.hstatic.net/200000722513/file/gearvn-gaming-gear-deal-hoi-slider-t8-jpg.jpg"
                }
                alt="Tech Product 3"
                style={imageStyle}
                preview={false}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
