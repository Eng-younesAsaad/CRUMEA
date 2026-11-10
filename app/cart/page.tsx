"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/CartProvider";
import { CartItemRow } from "@/features/cart/components/CartItemRow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Trash2,
} from "lucide-react";

export default function CartPage(): React.ReactElement {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const isCartEmpty = cart.items.length === 0;

  const handleConfirmClear = (): void => {
    clearCart();
    setIsClearModalOpen(false);
  };

  if (isCartEmpty) {
    return (
      <div className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-secondary text-gold flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag className="w-10 h-10 opacity-70" />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              YOUR BASKET IS EMPTY
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
              Awaiting Fresh Bakes
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-light">
              Your basket is currently empty. Explore our artisan tray of
              freshly baked cookies, pastries, and luxury gift sets!
            </p>
          </div>
          <div className="pt-2">
            <Button asChild variant="primary" size="lg" className="shadow-warm">
              <Link href="/shop" className="flex items-center gap-2">
                <span>Explore Bakery Treats</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-muted-foreground font-light"
        >
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium" aria-current="page">
            Shopping Cart ({cart.totalCount} items)
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
              Your Shopping Cart
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-light">
              Fresh items reserved in your session for same-day packing.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsClearModalOpen(true)}
            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Cart</span>
          </Button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 rounded-2xl border border-border bg-card shadow-warm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold gap-1 mb-2">
            {cart.freeShippingProgress >= 100 ? (
              <span className="text-[#2E7D32] dark:text-[#81C784] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold" />
                You have unlocked Free Fresh Delivery!
              </span>
            ) : (
              <span className="text-muted-foreground">
                Add{" "}
                <strong className="text-foreground">
                  ${cart.amountNeededForFreeShipping.toFixed(2)}
                </strong>{" "}
                more to qualify for Free Shipping!
              </span>
            )}
            <span className="text-muted-foreground">
              ${cart.subtotal.toFixed(2)} / $
              {cart.freeShippingThreshold.toFixed(2)}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-border/60 overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${cart.freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Cart Layout: Items + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 p-6 rounded-2xl border border-border bg-card shadow-warm divide-y divide-border/60">
            {cart.items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}

            <div className="pt-4 flex justify-between items-center text-xs">
              <Link
                href="/shop"
                className="text-gold font-semibold hover:underline flex items-center gap-1"
              >
                <span>← Continue Browsing Bakery</span>
              </Link>
              <span className="text-muted-foreground">
                {cart.totalCount} items in tray
              </span>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <Card className="border-border shadow-warm-md">
              <CardHeader className="pb-4 border-b border-border/60">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 pt-4 text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-foreground">
                    ${cart.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Fresh Courier Delivery:</span>
                  <span className="font-semibold text-foreground">
                    {cart.shipping === 0
                      ? "FREE"
                      : `$${cart.shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Estimated Tax (8%):</span>
                  <span className="font-semibold text-foreground">
                    ${cart.tax.toFixed(2)}
                  </span>
                </div>

                <div className="pt-3 border-t border-border/80 flex justify-between items-center text-sm font-bold text-foreground">
                  <span>Estimated Total:</span>
                  <span className="font-serif text-xl text-gold">
                    ${cart.finalTotal.toFixed(2)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm"
                  onClick={() => router.push("/checkout")}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>
                    Guaranteed fresh delivery with temperature control
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Empty your cart?"
        description="Are you sure you want to remove all freshly baked treats from your cart? This cannot be undone."
        size="sm"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsClearModalOpen(false)}
            >
              Keep Items
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmClear}
            >
              Empty Cart
            </Button>
          </div>
        }
      >
        <p className="text-xs text-muted-foreground py-1">
          You currently have {cart.totalCount} items in your basket.
        </p>
      </Modal>
    </div>
  );
}
