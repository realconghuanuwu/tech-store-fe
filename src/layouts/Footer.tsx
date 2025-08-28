import { IMAGE } from "@/constants/image.constant";
import { Button, Image, Input, List } from "antd";
import {
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-12 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Image
              src={IMAGE.LOGO}
              alt="logo"
              className="!w-full !h-14"
              preview={false}
            />
            <div className="space-y-3">
              <h4 className="text-lg">Subscribe</h4>
              <p className="text-sm text-gray-300">
                Get 10% off your first order
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent text-white placeholder:text-gray-400 rounded-r-none"
                />
                <Button className="bg-transparent border group  border-l-0  rounded-l-none">
                  <ArrowRight className="h-4 w-4 text-white group-hover:text-black" />
                </Button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Support</h3>
            <List
              className="text-sm text-gray-300"
              split={false}
              dataSource={[
                {
                  icon: <MapPin className="h-4 w-4 text-white" />,
                  text: "Tân Quý, Tân Phú, TP.HCM",
                },
                {
                  icon: <Mail className="h-4 w-4 flex-shrink-0 text-white" />,
                  text: "huanluongcong@gmail.com",
                },
                {
                  icon: <Phone className="h-4 w-4 flex-shrink-0 text-white" />,
                  text: "0987654321",
                },
              ]}
              renderItem={(item) => (
                <List.Item className="flex !justify-start gap-2">
                  {item.icon}
                  <p className="text-white">{item.text}</p>
                </List.Item>
              )}
            />
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Account</h3>
            <List
              className="text-sm"
              split={false}
              dataSource={[
                { title: "My Account", link: "#" },
                {
                  title: "Login / Register",
                  link: "#",
                },
                { title: "Cart", link: "#" },
                { title: "Wishlist", link: "#" },
                { title: "Shop", link: "#" },
              ]}
              renderItem={(item) => (
                <List.Item className="py-1 px-0 border-0">
                  <Link
                    to={item.link}
                    className={`text-white hover:text-white transition-colors no-underline`}
                  >
                    {item.title}
                  </Link>
                </List.Item>
              )}
            />
          </div>

          {/* Quick Link Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Link</h3>
            <List
              className="text-sm"
              split={false}
              dataSource={[
                { title: "Privacy Policy", link: "#" },
                { title: "Terms Of Use", link: "#" },
                { title: "FAQ", link: "#" },
                { title: "Contact", link: "#" },
              ]}
              renderItem={(item) => (
                <List.Item className="py-1 px-0 border-0">
                  <Link
                    to={item.link}
                    className="text-white hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </List.Item>
              )}
            />
          </div>

          {/* Download App Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Download App</h3>
            <div className="space-y-3">
              <p className="text-xs text-gray-400">
                Save $3 with App New User Only
              </p>

              {/* QR Code and App Store buttons */}
              <div className="flex gap-3">
                <div className="w-24 h-24 bg-white rounded flex items-center justify-center">
                  {/* QR Code placeholder */}
                  <div className="text-xs text-black">QR Code</div>
                </div>
                <div className="flex flex-col gap-2">
                  {/* Google Play button placeholder */}
                  <div className="w-32 h-10 bg-gray-800 border border-gray-600 rounded flex items-center justify-center text-xs">
                    Google Play
                  </div>
                  {/* App Store button placeholder */}
                  <div className="w-32 h-10 bg-gray-800 border border-gray-600 rounded flex items-center justify-center text-xs">
                    App Store
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 pt-2">
                <Link to="#" className="text-white">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-white">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © Copyright 2025. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
