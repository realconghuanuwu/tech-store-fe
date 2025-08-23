import { PATH } from "@/constants/router.constant";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-6xl mb-16">
            <nav className="flex items-center text-sm text-gray-500">
              <Link to={PATH.HOME} className="hover:text-gray-700">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900">404 Error</span>
            </nav>
          </div>

          <div className="text-center max-w-2xl">
            <h1 className="text-8xl md:text-9xl font-bold text-black mb-8">
              404 Not Found
            </h1>

            <p className="text-gray-600 text-lg mb-12">
              Your visited page not found. You may go home page.
            </p>

            <Link
              to={PATH.HOME}
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded transition-colors duration-200"
            >
              Back to home page
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
