"use client";

import { useState } from "react";
import { useNavigate } from "react-router";

import CommonPage from "@/components/ui/CommonPage";
import { PATH } from "@/constants/router.constant";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/Checkout";

export default function MyCartPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleStep = (step: number) => {
    setStep(step);
  };

  const breadcrumbItems = [
    {
      title: "Home",
      onClick: () => navigate(PATH.HOME),
    },
  ];

  if (step === 1) {
    breadcrumbItems.push({
      title: "My Cart",
      onClick: () => handleStep(1),
    });
  }

  if (step === 2) {
    breadcrumbItems.push({
      title: "My Cart",
      onClick: () => handleStep(1),
    });
    breadcrumbItems.push({
      title: "Checkout",
      onClick: () => handleStep(2),
    });
  }

  return (
    <CommonPage breadcrumbItems={breadcrumbItems}>
      {step === 1 && <CartPage onStep={handleStep} />}
      {step === 2 && <CheckoutPage />}
    </CommonPage>
  );
}
