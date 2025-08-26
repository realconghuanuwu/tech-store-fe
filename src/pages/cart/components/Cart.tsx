"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button, Card, Input } from "antd";
import { useGetProducts } from "@/service/product/product.service";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage({
  onStep,
}: {
  onStep: (step: number) => void;
}) {
  const { data: products, isLoading } = useGetProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");

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

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    onStep(2);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <Card className="lg:col-span-2">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 py-4 border-b font-medium text-gray-900 bg-gray-50">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-center">Subtotal</div>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 py-6 border-b items-center hover:bg-gray-50"
          >
            {/* Product */}
            <div className="col-span-6 flex items-center gap-4 relative">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute -top-2 -left-2 bg-c-main-red text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-c-main-red transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <span className="font-medium text-gray-900">{item.name}</span>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center font-medium">
              ${item.price.toFixed(2)}
            </div>

            {/* Quantity */}
            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  type="text"
                  size="small"
                  className="h-10 w-10 p-0 border-0 hover:bg-gray-100 flex items-center justify-center"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center text-sm font-medium border-x px-2 py-2">
                  {item.quantity.toString().padStart(2, "0")}
                </span>
                <Button
                  type="text"
                  size="small"
                  className="h-10 w-10 p-0 border-0 hover:bg-gray-100 flex items-center justify-center"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="col-span-2 text-center font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Coupon Section */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Input
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1"
            size="large"
          />
          <Button
            className="bg-c-main-red hover:bg-c-main-red text-white border-c-main-red px-6 py-2"
            size="large"
          >
            Apply Coupon
          </Button>
        </div>
      </Card>

      {/* Cart Total */}
      <Card bodyStyle={{ padding: 0 }}>
        <div className="border border-gray-300 rounded-lg p-6 bg-white">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Cart Total
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between py-3 font-semibold text-lg">
              <span className="text-gray-900">Total:</span>
              <span className="text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full mt-6 bg-c-main-red hover:bg-c-main-red text-white border-c-main-red py-3 text-base font-medium"
            size="large"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}
