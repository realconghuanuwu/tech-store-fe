import { IMAGE } from "@/constants/image.constant";

export default function LeftBanner() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-center bg-no-repeat bg-contain bg-[#cbe4e9]"
      style={{ backgroundImage: `url(${IMAGE.LOGIN_BANNER})` }}
    ></div>
  );
}
