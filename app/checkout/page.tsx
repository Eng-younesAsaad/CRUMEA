import React from "react";
import { type Metadata } from "next";
import { CheckoutView } from "@/features/checkout/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout | CRUMÉA Luxury Artisan Bakery",
  description:
    "Complete your order for fresh French pastries, cookies, and gift boxes.",
};

export default function CheckoutPage(): React.ReactElement {
  return <CheckoutView />;
}
