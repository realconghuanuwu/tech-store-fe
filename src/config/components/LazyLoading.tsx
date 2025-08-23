import { Spin } from "antd";
import { Suspense, type LazyExoticComponent } from "react";

function LazyLoading({
  Component,
}: {
  Component: LazyExoticComponent<React.ComponentType<unknown>>;
}) {
  return (
    <Suspense fallback={<Spin />}>
      <Component />
    </Suspense>
  );
}

export default LazyLoading;
