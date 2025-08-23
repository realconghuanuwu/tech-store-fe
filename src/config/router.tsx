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
        element: <div>About Page</div>,
      },
      {
        path: PATH.CONTACT,
        element: <div>Contact Page</div>,
      },
    ],
  },
  {
    path: "/",
    Component: PrivateRoute,
    children: [
      {
        path: PATH.USER_PROFILE,
        element: <div>User Profile Page</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <NotFound />,
  },
]);
