"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../CartProvider";
import { CartItemRow } from "./CartItemRow";
import { CartSummaryCard } from "./CartSummaryCard";
import { CartEmptyState } from "./CartEmptyState";
import { CartFreeShippingBar } from "./CartFreeShippingBar";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Trash2 } from "lucide-react";

export function CartView(): React.ReactElement {
  const { cart, clearCart } = useCart();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  if (cart.items.length === 0) {
    return <CartEmptyState />;
  }

  const handleConfirmClear = (): void => {
    clearCart();
    setIsClearModalOpen(false);
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

        <CartFreeShippingBar
          freeShippingProgress={cart.freeShippingProgress}
          amountNeededForFreeShipping={cart.amountNeededForFreeShipping}
          subtotal={cart.subtotal}
          freeShippingThreshold={cart.freeShippingThreshold}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

          <div className="lg:col-span-4">
            <CartSummaryCard cart={cart} />
          </div>
        </div>
      </div>

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
