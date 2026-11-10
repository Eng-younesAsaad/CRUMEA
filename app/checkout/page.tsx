"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/features/cart/CartProvider";
import { useToast } from "@/lib/context/ToastContext";
import {
  type CheckoutFormData,
  type ConfirmedOrder,
  type ConfirmedOrderItem,
} from "@/features/checkout/checkout.schema";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { OrderConfirmation } from "@/features/checkout/components/OrderConfirmation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Truck,
  ChevronRight,
} from "lucide-react";

export default function CheckoutPage(): React.ReactElement {
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
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      qty: item.qty,
      lineTotal: item.lineTotal,
      image: item.product.image,
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

  // 1. Confirmed Order View
  if (confirmedOrder) {
    return (
      <main className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <OrderConfirmation order={confirmedOrder} />
        </div>
      </main>
    );
  }

  // 2. Empty Cart Guard
  if (cart.items.length === 0) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-background">
        <div className="max-w-md w-full text-center space-y-5 bg-card/60 backdrop-blur-sm p-8 rounded-2xl border border-border">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C89B68]/15 text-[#C89B68]">
            <ShoppingBag className="w-8 h-8" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-muted-foreground">
            You cannot proceed to checkout without any artisan treats in your
            basket.
          </p>
          <div className="pt-2">
            <Button asChild variant="primary" size="lg" className="w-full">
              <Link href="/shop">Browse the Bakery</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // 3. Checkout Form + Order Summary
  return (
    <main className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb & Heading */}
        <div className="space-y-2">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link
              href="/cart"
              className="hover:text-foreground transition-colors"
            >
              Cart
            </Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-foreground font-medium">Checkout</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/50 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C89B68]">
                Secure Atelier Checkout
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-normal mt-1">
                Finalize Your Order
              </h1>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck
                className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              256-Bit Encrypted &amp; Hand-Packed Fresh
            </p>
          </div>
        </div>

        {/* 2-Column Split: Form (Left) & Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm
              onSubmitSuccess={handleOrderSuccess}
              subtotal={subtotal}
            />
          </div>

          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <Card className="border-[#C89B68]/30 shadow-md bg-card/90 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-muted/40 pb-4 border-b border-border/50">
                <CardTitle className="font-serif text-lg flex items-center justify-between">
                  <span>Order Summary</span>
                  <Badge variant="outline" className="text-xs font-mono">
                    {cart.totalCount} {cart.totalCount === 1 ? "item" : "items"}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                {/* Scrollable Mini-List of Items */}
                <ul className="divide-y divide-border/40 max-h-72 overflow-y-auto pr-1">
                  {cart.items.map((item) => (
                    <li
                      key={item.productId}
                      className="py-3 first:pt-0 last:pb-0 flex items-center gap-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/50">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-foreground truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.qty} &times; ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-sm font-serif font-semibold text-foreground">
                        ${item.lineTotal.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Subtotal, Shipping, Tax, Total */}
                <div className="pt-4 border-t border-border/60 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground items-center">
                    <span className="flex items-center gap-1.5">
                      <Truck
                        className="w-3.5 h-3.5 text-[#C89B68]"
                        aria-hidden="true"
                      />
                      Standard Courier
                    </span>
                    <span className="font-medium text-foreground">
                      {standardShipping === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          FREE
                        </span>
                      ) : (
                        `$${standardShipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-medium text-foreground">
                      ${estimatedTax.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between items-baseline font-serif">
                    <span className="text-base text-foreground font-semibold">
                      Estimated Total
                    </span>
                    <span className="text-2xl text-[#C89B68] font-bold">
                      ${estimatedTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Note */}
                {subtotal < 50.0 ? (
                  <div className="p-3 bg-[#C89B68]/10 rounded-lg border border-[#C89B68]/20 text-xs text-muted-foreground">
                    Add{" "}
                    <strong className="text-foreground">
                      ${(50.0 - subtotal).toFixed(2)}
                    </strong>{" "}
                    more to qualify for complimentary artisan shipping.
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-lg border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
                    <Sparkles
                      className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    Complimentary standard shipping unlocked!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quality Commitments */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck
                  className="w-4 h-4 text-[#C89B68]"
                  aria-hidden="true"
                />
                The CRUMÉA Freshness Guarantee
              </p>
              <p>
                Each batch is baked to order on the morning of dispatch. Never
                frozen, shipped in climate-monitored luxury gift packaging.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
