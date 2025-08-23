import { Carousel, Menu, Image, type MenuProps } from "antd";
import Banner1 from "@/assets/images/hero-section/frame.png";
import DefaultImage from "@/assets/images/default.png";
import BlobImage from "@/assets/images/1743831323104_blob.jpeg";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "2",
    label: "Woman's Fashion",
    children: [
      { key: "1", label: "Option 1" },
      { key: "2", label: "Option 2" },
      { key: "3", label: "Option 3" },
      { key: "4", label: "Option 4" },
    ],
  },
  {
    key: "1",
    label: "Electronics",
  },
  {
    key: "3",
    label: "Groceries & Pets",
  },
  {
    key: "4",
    label: "Health & Beauty",
  },
];

const carouselStyle: React.CSSProperties = {
  height: "400px",
  width: "100%",
  overflow: "hidden",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

export default function HeroSection() {
  return (
    <div className="flex bg-white">
      {/* Category Sidebar */}
      <div className="w-64">
        <Menu style={{ width: 256 }} mode="inline" items={items} />
      </div>

      {/* Promotional Banner */}
      <div className="flex-1 bg-white text-white relative overflow-hidden">
        <Carousel autoplay arrows autoplaySpeed={5000} style={carouselStyle}>
          <div style={carouselStyle}>
            <Image src={Banner1} alt="Tech Product 1" style={imageStyle} />
          </div>
          <div style={carouselStyle}>
            <Image src={DefaultImage} alt="Tech Product 2" style={imageStyle} />
          </div>
          <div style={carouselStyle}>
            <Image src={BlobImage} alt="Tech Product 3" style={imageStyle} />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
