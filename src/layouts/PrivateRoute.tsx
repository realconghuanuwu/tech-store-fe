import Loading from "@/components/ui/Loading";
import { Navigate, useLocation } from "react-router";
import MainLayout from "./MainLayout";
import { useAccountStore } from "@/stores/account.store";
import { PATH } from "@/constants/router.constant";

export default function PrivateRoute() {
  const location = useLocation();
  const { isLoggedIn } = useAccountStore();

  if (isLoggedIn === undefined) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loading />
      </div>
    );
  }

  return isLoggedIn ? (
    <MainLayout />
  ) : (
    <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
  );
}
