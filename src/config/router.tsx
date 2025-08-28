import { createBrowserRouter } from "react-router";
import { PATH } from "../constants/router.constant";
import { lazy } from "react";
import LazyLoading from "./components/LazyLoading";
import PrivateRoute from "@/layouts/PrivateRoute";
import PublicRoute from "@/layouts/PublicRoute";
import NotFound from "@/components/ui/error-handle/NotFound";

const HomePage = lazy(() => import("@/pages/home/page"));
const LoginPage = lazy(() => import("@/pages/auth/login/page"));
const RegisterPage = lazy(() => import("@/pages/auth/register/page"));
const WishListPage = lazy(() => import("@/pages/wish-list/page"));
const CartPage = lazy(() => import("@/pages/cart/page"));
const UserProfilePage = lazy(() => import("@/pages/user-profile/page"));
const AboutUsPage = lazy(() => import("@/pages/about-us/page"));
const ContactPage = lazy(() => import("@/pages/contact/page"));
const ProductDetailPage = lazy(() => import("@/pages/product-detail/page"));
const ProductPage = lazy(() => import("@/pages/products/page"));

export const router = createBrowserRouter([
  // Public routes - accessible to everyone without authentication
  {
    path: "/",
    Component: PublicRoute,
    children: [
      {
        index: true,
        element: <LazyLoading Component={HomePage} />,
      },
      {
        path: PATH.LOGIN,
        element: <LazyLoading Component={LoginPage} />,
      },
      {
        path: PATH.REGISTER,
        element: <LazyLoading Component={RegisterPage} />,
      },
      {
        path: PATH.FORGOT_PASSWORD,
        element: <div>Forgot Password Page</div>,
      },
      {
        path: PATH.RESET_PASSWORD,
        element: <div>Reset Password Page</div>,
      },
      {
        path: PATH.ABOUT,
        element: <LazyLoading Component={AboutUsPage} />,
      },
      {
        path: PATH.CONTACT,
        element: <LazyLoading Component={ContactPage} />,
      },
      {
        path: PATH.PRODUCT.DETAIL,
        element: <LazyLoading Component={ProductDetailPage} />,
      },
      {
        path: PATH.WISH_LIST,
        element: <LazyLoading Component={WishListPage} />,
      },
      {
        path: PATH.CART,
        element: <LazyLoading Component={CartPage} />,
      },
      {
        path: PATH.USER_PROFILE,
        element: <LazyLoading Component={UserProfilePage} />,
      },
      {
        path: PATH.PRODUCT.ROOT,
        element: <LazyLoading Component={ProductPage} />,
      },
    ],
  },
  // {
  //   path: "/",
  //   Component: PrivateRoute,
  //   children: [

  //   ],
  // },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <NotFound />,
  },
]);
