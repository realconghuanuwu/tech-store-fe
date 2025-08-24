import CommonPage from "@/components/ui/CommonPage";
import { PATH } from "@/constants/router.constant";
import { useNavigate } from "react-router";
import { useState } from "react";
import AccountSidebar from "./components/AccountSidebar";
import EditProfile from "./components/EditProfile";
import AddressBook from "./components/AddressBook";
import PaymentOptions from "./components/PaymentOptions";
import OrderHistory from "./components/OrderHistory";
import Returns from "./components/Returns";
import Cancellations from "./components/Cancellations";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("edit-profile");

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
  };

  return (
    <CommonPage breadcrumbItems={breadcrumbItems}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AccountSidebar
          onMenuClick={handleMenuClick}
          selectedKey={selectedKey}
        />

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 px-6">{renderContent()}</div>
      </div>
    </CommonPage>
  );
}
