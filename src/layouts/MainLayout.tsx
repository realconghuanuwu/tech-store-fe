import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
