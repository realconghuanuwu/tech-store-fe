import Loading from "@/components/ui/Loading";
import { Suspense, type LazyExoticComponent } from "react";

function LazyLoading({
  Component,
}: {
  Component: LazyExoticComponent<React.ComponentType<unknown>>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

export default LazyLoading;
