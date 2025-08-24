"use client";

import { useState, useEffect } from "react";
import { Button, Card, Input, Checkbox, Radio, Space, Result } from "antd";
import { useGetProducts } from "@/service/product/product.service";
import { PATH } from "@/constants/router.constant";
import { useNavigate } from "react-router";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface BillingForm {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  saveInfo: boolean;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [billingForm, setBillingForm] = useState<BillingForm>({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  });
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);

  // Initialize cart with sample products when data loads
  useEffect(() => {
    if (products && products.length > 0) {
      // Get first two products as sample cart items
      const sampleItems: CartItem[] = [
        {
          id: products[0].id,
          name: products[0].title,
          price: products[0].price,
          quantity: 1,
          image: products[0].image,
        },
        {
          id: products[1].id,
          name: products[1].title,
          price: products[1].price,
          quantity: 2,
          image: products[1].image,
        },
      ];
      setCartItems(sampleItems);
    }
  }, [products]);

  const handleBillingFormChange = (field: keyof BillingForm, value: any) => {
    setBillingForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    setIsSuccessOrder(true);
  };

  if (isSuccessOrder) {
    return (
      <Result
        status="success"
        title="Order placed successfully"
        subTitle="Order number: 2017182818828182881 Order takes 3-4 days, please wait."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => navigate(PATH.HOME)}
          >
            Go Home
          </Button>,
        ]}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section: Billing Details */}
      <div className="lg:col-span-1">
        <Card className="h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Billing Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={billingForm.firstName}
                onChange={(e) =>
                  handleBillingFormChange("firstName", e.target.value)
                }
                placeholder="First Name"
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <Input
                value={billingForm.companyName}
                onChange={(e) =>
                  handleBillingFormChange("companyName", e.target.value)
                }
                placeholder="Company Name"
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <Input
                value={billingForm.streetAddress}
                onChange={(e) =>
                  handleBillingFormChange("streetAddress", e.target.value)
                }
                placeholder="Street Address"
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <Input
                value={billingForm.apartment}
                onChange={(e) =>
                  handleBillingFormChange("apartment", e.target.value)
                }
                placeholder="Apartment, floor, etc."
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Town/City <span className="text-red-500">*</span>
              </label>
              <Input
                value={billingForm.townCity}
                onChange={(e) =>
                  handleBillingFormChange("townCity", e.target.value)
                }
                placeholder="Town/City"
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                value={billingForm.phoneNumber}
                onChange={(e) =>
                  handleBillingFormChange("phoneNumber", e.target.value)
                }
                placeholder="Phone Number"
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                value={billingForm.emailAddress}
                onChange={(e) =>
                  handleBillingFormChange("emailAddress", e.target.value)
                }
                placeholder="Email Address"
                size="large"
              />
            </div>

            <div className="pt-4">
              <Checkbox
                checked={billingForm.saveInfo}
                onChange={(e) =>
                  handleBillingFormChange("saveInfo", e.target.checked)
                }
                className="text-sm"
              >
                Save this information for faster check-out next time
              </Checkbox>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Section: Order Summary and Payment */}
      <div className="lg:col-span-1">
        <Card className="h-fit">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Order Summary
          </h3>

          {/* Product List */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b border-gray-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between py-2 font-semibold text-lg">
              <span className="text-gray-900">Total:</span>
              <span className="text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Payment Methods
            </h4>

            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="space-y-3"
            >
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <Radio value="bank" className="text-base">
                  Bank
                </Radio>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    OP
                  </div>
                </div>
              </div>

              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <Radio value="cash" className="text-base">
                  Cash on delivery
                </Radio>
              </div>
            </Radio.Group>
          </div>

          {/* Coupon Section */}
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
              size="large"
            />
            <Button
              className="bg-red-500 hover:bg-red-600 text-white border-red-500 px-6"
              size="large"
            >
              Apply Coupon
            </Button>
          </div>

          {/* Place Order Button */}
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white border-red-500 py-3 text-base font-medium"
            size="large"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Card>
      </div>
    </div>
  );
}
