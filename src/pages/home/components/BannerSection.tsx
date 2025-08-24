import { Image } from "antd";
import Banner1 from "@/assets/images/Frame 600.jpg";

export default function BannerSection() {
  return (
    <div className="w-full">
      <Image
        src={Banner1}
        alt="banner"
        rootClassName="!w-full !h-auto object-cover"
      />
    </div>
  );
}
