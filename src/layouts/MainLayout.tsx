import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import GoToTopButton from "@/components/ui/GoToTopButton";

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[180px]  md:pt-[130px]">
        <Outlet />
      </main>
      <Footer />
      <GoToTopButton />
    </div>
  );
}

export default MainLayout;
