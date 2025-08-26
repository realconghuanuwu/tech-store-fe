import CommonPage from "@/components/ui/CommonPage";
import { PATH } from "@/constants/router.constant";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AccountSidebar from "./components/AccountSidebar";
import EditProfile from "./components/EditProfile";
import AddressBook from "./components/AddressBook";
import PaymentOptions from "./components/PaymentOptions";
import OrderHistory from "./components/OrderHistory";
import Returns from "./components/Returns";
import Cancellations from "./components/Cancellations";
import { Button } from "antd";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("edit-profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const breadcrumbItems = [
    {
      title: "Home",
      onClick: () => navigate(PATH.HOME),
    },
    {
      title: "My Account",
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "edit-profile":
        return <EditProfile />;
      case "address-book":
        return <AddressBook />;
      case "payment-options":
        return <PaymentOptions />;
      case "order-history":
        return <OrderHistory />;
      case "returns":
        return <Returns />;
      case "cancellations":
        return <Cancellations />;
      default:
        return <EditProfile />;
    }
  };

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    // Close mobile menu when item is selected
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <CommonPage breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">My Account</h1>
            <Button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Sidebar */}
        <div
          className={`lg:block ${
            isMobileMenuOpen ? "block" : "hidden"
          } fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto`}
        >
          <AccountSidebar
            onMenuClick={handleMenuClick}
            selectedKey={selectedKey}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {renderContent()}
        </div>
      </div>
    </CommonPage>
  );
}
