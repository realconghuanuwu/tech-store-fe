import { List, Divider } from "antd";
import { useNavigate, useLocation } from "react-router";
import { PATH } from "@/constants/router.constant";

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  key: string;
  label: string;
}

const menuSections: MenuSection[] = [
  {
    title: "Manage My Account",
    items: [
      { key: "edit-profile", label: "My Profile" },
      { key: "address-book", label: "Address Book" },
      { key: "payment-options", label: "My Payment Options" },
    ],
  },
  {
    title: "My Orders",
    items: [
      { key: "order-history", label: "Order History" },
      { key: "returns", label: "My Returns" },
      { key: "cancellations", label: "My Cancellations" },
    ],
  },
  {
    title: "My Wishlist",
    items: [{ key: "wishlist", label: "My Wishlist" }],
  },
];

interface AccountSidebarProps {
  onMenuClick: (key: string) => void;
  selectedKey: string;
}

export default function AccountSidebar({
  onMenuClick,
  selectedKey,
}: AccountSidebarProps) {
  const navigate = useNavigate();
  const handleMenuClick = (key: string) => {
    if (key === "wishlist") {
      navigate(PATH.WISH_LIST);
    } else {
      onMenuClick(key);
    }
  };

  return (
    <div className="w-64 lg:w-64 bg-white border-r border-gray-200 min-h-screen lg:min-h-screen max-h-screen lg:max-h-none overflow-y-auto">
      <div className="p-4 lg:p-6">
        {/* Desktop Title - Hidden on mobile */}
        <div className="hidden lg:block mb-6">
          <h2 className="text-xl font-semibold text-gray-900">My Account</h2>
        </div>

        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            {/* Section Title */}
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>
            </div>

            {/* Section Items */}
            <List
              size="small"
              dataSource={section.items}
              renderItem={(item) => (
                <List.Item
                  className={`px-3 py-3 lg:py-2 rounded-md cursor-pointer transition-colors ${
                    selectedKey === item.key
                      ? "!text-c-main-red bg-red-50 border-l-4 border-red-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => handleMenuClick(item.key)}
                >
                  <span className="text-sm lg:text-sm font-medium">
                    {item.label}
                  </span>
                </List.Item>
              )}
            />

            {/* Divider between sections (except for last section) */}
            {sectionIndex < menuSections.length - 1 && (
              <Divider className="my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
