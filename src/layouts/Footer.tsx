import { Button, Input } from "antd";
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

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Exclusive</h3>
            <div className="space-y-3">
              <h4 className="text-lg">Subscribe</h4>
              <p className="text-sm text-gray-300">
                Get 10% off your first order
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-white text-white placeholder:text-gray-400 rounded-r-none"
                />
                <Button className="bg-transparent border border-white border-l-0 hover:bg-white hover:text-black rounded-l-none">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Support</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  111 Bijoy sarani, Dhaka,
                  <br />
                  DH 1515, Bangladesh.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <p>exclusive@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <p>+88015-88888-9999</p>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Account</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Link</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
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
                <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                  {/* QR Code placeholder */}
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    QR Code
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {/* Google Play button placeholder */}
                  <div className="w-24 h-8 bg-gray-800 border border-gray-600 rounded flex items-center justify-center text-xs">
                    Google Play
                  </div>
                  {/* App Store button placeholder */}
                  <div className="w-24 h-8 bg-gray-800 border border-gray-600 rounded flex items-center justify-center text-xs">
                    App Store
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 pt-2">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
