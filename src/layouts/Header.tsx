import { PATH } from "@/constants/router.constant";
import { Button, Input, Dropdown, Badge, Drawer, List } from "antd";
import {
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  User,
  Package,
  XCircle,
  Star,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { useState } from "react";
import { products } from "@/pages/home/components/CategorySection";
import { IMAGE } from "@/constants/image.constant";
import { Image } from "antd";

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languageItems: MenuProps["items"] = [
    {
      key: "en",
      label: "English",
    },
    {
      key: "vi",
      label: "Tiếng Việt",
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "account",
      label: "Manage My Account",
      icon: <User size={16} className="text-gray-600" />,
      onClick: () => navigate(PATH.USER_PROFILE),
    },
    {
      key: "orders",
      label: "My Order",
      icon: <Package size={16} className="text-gray-600" />,
    },
    {
      key: "cancellations",
      label: "My Cancellations",
      icon: <XCircle size={16} className="text-gray-600" />,
    },
    {
      key: "reviews",
      label: "My Reviews",
      icon: <Star size={16} className="text-gray-600" />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogOut size={16} className="text-gray-600" />,
    },
  ];

  const handleLanguageChange = ({ key }: { key: string }) => {
    console.log("Selected language:", key);
    // TODO: Implement language change logic
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    console.log("User menu clicked:", key);
    // TODO: Implement user menu actions
  };

  const handleToWishList = () => {
    navigate(PATH.WISH_LIST);
  };

  const handleToCart = () => {
    navigate(PATH.CART);
  };

  const handleGoHome = () => {
    navigate(PATH.HOME);
  };

  const handleMobileNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full fixed-header shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      {/* Top promotional banner */}
      <div className="bg-black text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 text-center">
            <span className="text-xs sm:text-sm">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
              <span className="font-semibold underline ml-2 cursor-pointer">
                ShopNow
              </span>
            </span>
          </div>
          <Dropdown
            menu={{ items: languageItems, onClick: handleLanguageChange }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-xs sm:text-sm">English</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div>
            <Image
              src={IMAGE.LOGO}
              alt="logo"
              className="!w-full !h-14"
              preview={false}
            />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 font-semibold">
            <CNavLink to={PATH.HOME}>Home</CNavLink>
            <CNavLink to={PATH.CONTACT}>Contact</CNavLink>
            <CNavLink to={PATH.ABOUT}>About</CNavLink>
            <CNavLink to={PATH.REGISTER}>Sign Up</CNavLink>
          </nav>

          {/* Search and actions */}
          <div className="flex items-center gap-2">
            {/* Search bar - Desktop */}
            <div className="hidden sm:block">
              <Input
                type="text"
                placeholder="What are you looking for?"
                prefix={<Search size={16} className="text-gray-400" />}
                className="!w-56"
              />
            </div>

            {/* Action icons */}
            <Button
              type="link"
              className="hover:bg-gray-100 p-2"
              onClick={handleToWishList}
            >
              <Badge count={4} size="small">
                <Heart size={18} className="text-gray-700 sm:w-5 sm:h-5" />
              </Badge>
            </Button>
            <Button
              type="link"
              className="hover:bg-gray-100 p-2"
              onClick={handleToCart}
            >
              <Badge count={2} size="small">
                <ShoppingCart
                  size={18}
                  className="text-gray-700 sm:w-5 sm:h-5"
                />
              </Badge>
            </Button>

            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button type="link" className="hover:bg-gray-100 p-2">
                <User size={18} className="text-gray-700 sm:w-5 sm:h-5" />
              </Button>
            </Dropdown>

            {/* Mobile menu button */}
            <Button
              type="link"
              className="md:hidden hover:bg-gray-100 p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} className="text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="sm:hidden mt-4">
          <Input
            type="text"
            placeholder="What are you looking for?"
            prefix={<Search size={16} className="text-gray-400" />}
            className="w-full"
          />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        className="md:hidden"
      >
        <div className="flex flex-col">
          {/* Mobile Navigation Links */}
          <List
            dataSource={[
              { key: PATH.HOME, label: "Home" },
              { key: PATH.CONTACT, label: "Contact" },
              { key: PATH.ABOUT, label: "About" },
              { key: PATH.REGISTER, label: "Sign Up" },
            ]}
            renderItem={(item) => (
              <List.Item
                className="!px-0 !py-0 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleMobileNavClick(item.key)}
              >
                <div className="w-full py-4 px-4 text-black font-semibold">
                  {item.label}
                </div>
              </List.Item>
            )}
            className="!border-0"
          />

          {/* Mobile User Menu */}
          <div className="mt-4">
            <div className="px-4 py-3 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700">Category</h3>
            </div>
            <List
              dataSource={[
                ...products?.map((item) => ({
                  key: item.name,
                  label: item.name,
                  icon: item.icon,
                  className: "text-black",
                  onClick: () => setMobileMenuOpen(false),
                })),
                {
                  key: "logout",
                  label: "Logout",
                  onClick: () => setMobileMenuOpen(false),
                  className: "text-red-600",
                },
              ]}
              renderItem={(item) => (
                <List.Item
                  className="!px-0 !py-0 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={item.onClick}
                >
                  <div
                    className={`w-full py-4 px-4 flex items-center gap-3 ${
                      item.className || "text-black"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                </List.Item>
              )}
              className="!border-0"
            />
          </div>
        </div>
      </Drawer>
    </header>
  );
}

function CNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-gray-900 hover:text-gray-600 transition-colors underline"
          : "text-gray-900 hover:text-gray-600 transition-colors no-underline"
      }
    >
      {children}
    </NavLink>
  );
}
