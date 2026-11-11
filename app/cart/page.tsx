import React from "react";
import { type Metadata } from "next";
import { CartView } from "@/features/cart/components/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart | CRUMÉA Luxury Artisan Bakery",
  description:
    "Review your selected freshly baked artisan cookies, pastries, and treats.",
};

export default function CartPage(): React.ReactElement {
  return <CartView />;
}
