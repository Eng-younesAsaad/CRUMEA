"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useCart } from "../CartProvider";
import { CartItemRow } from "./CartItemRow";
import { CartDrawerFooter } from "./CartDrawerFooter";
import { CartDrawerClearModal } from "./CartDrawerClearModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/context/ToastContext";
import { X, ShoppingBag, Sparkles } from "lucide-react";

export function CartDrawer(): React.ReactElement {
  const { cart, isDrawerOpen, closeDrawer, clearCart } = useCart();
  const { error } = useToast();
  const router = useRouter();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const isCartEmpty = cart.items.length === 0;

  const handleCheckoutClick = (): void => {
    if (isCartEmpty) {
      error("Your cart is empty. Please add items before checking out.");
      return;
    }
    closeDrawer();
    router.push("/checkout");
  };

  const handleConfirmClear = (): void => {
    clearCart();
    setIsClearModalOpen(false);
  };

  return (
    <>
      <DialogPrimitive.Root
        open={isDrawerOpen}
        onOpenChange={(open) => {
          if (!open) closeDrawer();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            aria-describedby="cart-drawer-desc"
            className="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-md bg-card text-card-foreground shadow-2xl border-l border-border duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <DialogPrimitive.Title className="font-serif text-xl font-bold tracking-tight text-foreground">
                  Your Basket ({cart.totalCount})
                </DialogPrimitive.Title>
              </div>
              <DialogPrimitive.Close className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <X className="w-5 h-5" />
                <span className="sr-only">Close cart drawer</span>
              </DialogPrimitive.Close>
            </div>

            <p id="cart-drawer-desc" className="sr-only">
              Shopping cart item list, subtotal, and checkout actions
            </p>

            <div className="px-6 py-3.5 bg-secondary/50 border-b border-border/80">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                {cart.freeShippingProgress >= 100 ? (
                  <span className="text-[#2E7D32] dark:text-[#81C784] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    Unlocked Free Fresh Delivery!
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Add{" "}
                    <strong className="text-foreground">
                      ${cart.amountNeededForFreeShipping.toFixed(2)}
                    </strong>{" "}
                    more for Free Delivery
                  </span>
                )}
                <span className="text-muted-foreground">
                  ${cart.subtotal.toFixed(2)} / $
                  {cart.freeShippingThreshold.toFixed(2)}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-border/60 overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${cart.freeShippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 divide-y divide-border/60">
              {isCartEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-gold">
                    <ShoppingBag className="w-8 h-8 opacity-70" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      Your Basket is Empty
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Fill it with our freshly baked cookies, buttery pastries,
                      and artisan gift sets!
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    onClick={closeDrawer}
                  >
                    <Link href="/shop">Explore Bakery</Link>
                  </Button>
                </div>
              ) : (
                <div className="py-2">
                  {cart.items.map((item) => (
                    <CartItemRow
                      key={item.productId}
                      item={item}
                      onNavigate={closeDrawer}
                    />
                  ))}
                </div>
              )}
            </div>

            {!isCartEmpty && (
              <CartDrawerFooter
                cart={cart}
                onCheckout={handleCheckoutClick}
                onClose={closeDrawer}
                onOpenClear={() => setIsClearModalOpen(true)}
              />
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <CartDrawerClearModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleConfirmClear}
        totalCount={cart.totalCount}
      />
    </>
  );
}
