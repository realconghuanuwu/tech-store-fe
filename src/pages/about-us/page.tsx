import CommonPage from "@/components/ui/CommonPage";
import { PATH } from "@/constants/router.constant";
import {
  ChevronRight,
  Store,
  DollarSign,
  Users,
  TrendingUp,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useNavigate } from "react-router";
import AboutUsCard from "./components/AboutUsCard";

export default function AboutUsPage() {
  const navigate = useNavigate();

  const breadcrumbItems = [
    {
      title: "Home",
      onClick: () => navigate(PATH.HOME),
    },
    {
      title: "About",
    },
  ];
  return (
    <CommonPage breadcrumbItems={breadcrumbItems}>
      <main className="flex-1">
        {/* Our Story Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">Our Story</h1>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Launched in 2015, Exclusive is South Asia's premier online
                  shopping marketplace with an active presence in Bangladesh.
                  Supported by wide range of tailored marketing, data and
                  service solutions, Exclusive has 10,500 sellers and 300 brands
                  and serves 3 millions customers across the region.
                </p>
                <p>
                  Exclusive has more than 1 Million products to offer, growing
                  at a very fast. Exclusive offers a diverse assortment in
                  categories ranging from consumer.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg p-8 h-96">
                <div className="w-full h-full bg-pink-300/30 rounded-lg flex items-center justify-center text-white">
                  <span className="text-lg">Shopping Women Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AboutUsCard
              title="10.5k"
              icon={Store}
              description="Sellers active our site"
            />

            <AboutUsCard
              title="33k"
              icon={DollarSign}
              description="Monthly Product Sale"
            />

            <AboutUsCard
              title="45.5k"
              icon={Users}
              description="Customer active in our site"
            />

            <AboutUsCard
              title="25k"
              icon={TrendingUp}
              description="Annual gross sale in our site"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-6 h-80">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Tom Cruise Photo</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Tom Cruise</h3>
              <p className="text-muted-foreground mb-3">Founder & Chairman</p>
              <div className="flex justify-center gap-3">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-blue-500 cursor-pointer" />
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-pink-500 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-blue-600 cursor-pointer" />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-6 h-80">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Emma Watson Photo</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Emma Watson</h3>
              <p className="text-muted-foreground mb-3">Managing Director</p>
              <div className="flex justify-center gap-3">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-blue-500 cursor-pointer" />
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-pink-500 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-blue-600 cursor-pointer" />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-6 h-80">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Will Smith Photo</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Will Smith</h3>
              <p className="text-muted-foreground mb-3">Product Designer</p>
              <div className="flex justify-center gap-3">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-blue-500 cursor-pointer" />
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-pink-500 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-blue-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </CommonPage>
  );
}
