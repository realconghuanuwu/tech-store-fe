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
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
