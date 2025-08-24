import { Spin } from "antd";

export default function Loading({
  fullScreen = true,
}: {
  fullScreen?: boolean;
}) {
  return (
    <div
      className={`flex ${
        fullScreen ? "fixed inset-0 z-[100] h-screen w-screen" : ""
      } items-center justify-center bg-white/50`}
    >
      <Spin size="large" />
    </div>
  );
}
