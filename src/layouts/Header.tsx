import { PATH } from "@/constants/router.constant";
import { Button, Input, Dropdown } from "antd";
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
} from "lucide-react";
import { NavLink } from "react-router";
import type { MenuProps } from "antd";

export default function Header() {
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

  return (
    <header className="w-full">
      {/* Top promotional banner */}
      <div className="bg-black text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 text-center">
            <span className="text-sm">
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
              <span className="text-sm">English</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">Exclusive</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-semibold">
            <CNavLink to={PATH.HOME}>Home</CNavLink>
            <CNavLink to={PATH.CONTACT}>Contact</CNavLink>
            <CNavLink to={PATH.ABOUT}>About</CNavLink>
            <CNavLink to={PATH.REGISTER}>Sign Up</CNavLink>
          </nav>

          {/* Search and actions */}
          <div className="flex items-center">
            {/* Search bar */}
            <Input
              type="text"
              placeholder="What are you looking for?"
              prefix={<Search size={16} className="text-gray-400" />}
              className="!w-56"
            />

            {/* Action icons */}
            <Button type="link" className="hover:bg-gray-100">
              <Heart size={20} className="text-gray-700" />
            </Button>
            <Button type="link" className="hover:bg-gray-100">
              <ShoppingCart size={20} className="text-gray-700" />
            </Button>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
                className: "!bg-white !border !border-gray-200 !shadow-lg",
              }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button type="link" className="hover:bg-gray-100">
                <User size={20} className="text-gray-700" />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
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
