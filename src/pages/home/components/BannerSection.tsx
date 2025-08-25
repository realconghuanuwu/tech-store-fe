import { Image } from "antd";
import Banner1 from "@/assets/images/Frame 600.jpg";

export default function BannerSection() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <Image
          src={Banner1}
          alt="banner"
          rootClassName="!w-full !h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
