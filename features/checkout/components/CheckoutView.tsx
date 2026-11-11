"use client";

import React, { useState } from "react";
import { useCart } from "@/features/cart/CartProvider";
import { useToast } from "@/lib/context/ToastContext";
import {
  type CheckoutFormData,
  type ConfirmedOrder,
  type ConfirmedOrderItem,
} from "../checkout.schema";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummaryCard } from "./CheckoutSummaryCard";
import { OrderConfirmation } from "./OrderConfirmation";
import { CheckoutEmptyState } from "./CheckoutEmptyState";
import { CheckoutHeader } from "./CheckoutHeader";

export function CheckoutView(): React.ReactElement {
  const { cart, clearCart } = useCart();
  const { success } = useToast();
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );

  const subtotal = cart.totalPrice;
  const standardShipping = subtotal >= 50.0 || subtotal === 0 ? 0 : 5.0;
  const estimatedTax = Number((subtotal * 0.08).toFixed(2));
  const estimatedTotal = Number(
    (subtotal + standardShipping + estimatedTax).toFixed(2)
  );

  function handleOrderSuccess(formData: CheckoutFormData): void {
    const orderLines: ConfirmedOrderItem[] = cart.items.map((item) => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      qty: item.qty,
      lineTotal: item.lineTotal,
      image: item.image,
    }));

    const shippingFee =
      formData.deliveryMethod === "express" ? 9.5 : subtotal >= 50.0 ? 0 : 5.0;

    const total = Number((subtotal + shippingFee + estimatedTax).toFixed(2));
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `CRU-${randomSuffix}`;

    const newOrder: ConfirmedOrder = {
      orderNumber,
      orderDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      customer: formData,
      items: orderLines,
      subtotal,
      shipping: shippingFee,
      tax: estimatedTax,
      total,
    };

    setConfirmedOrder(newOrder);
    clearCart(true);
    success(`Order #${orderNumber} placed successfully!`);
  }

  if (confirmedOrder) {
    return (
      <main className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <OrderConfirmation order={confirmedOrder} />
        </div>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return <CheckoutEmptyState />;
  }

  return (
    <main className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <CheckoutHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm
              onSubmitSuccess={handleOrderSuccess}
              subtotal={subtotal}
            />
          </div>
          <div className="lg:col-span-5">
            <CheckoutSummaryCard
              cart={cart}
              subtotal={subtotal}
              standardShipping={standardShipping}
              estimatedTax={estimatedTax}
              estimatedTotal={estimatedTotal}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
