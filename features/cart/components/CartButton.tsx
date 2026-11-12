"use client";

import React from "react";
import { useCart } from "../CartProvider";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps): React.ReactElement {
  const { cart, toggleDrawer } = useCart();

  return (
    <button
      type="button"
      id="cart-toggle"
      onClick={toggleDrawer}
      aria-label={`Shopping cart with ${cart.totalCount} items`}
      className={cn(
        "relative flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-gold/30 hover:border-gold text-cream hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        className
      )}
    >
      <ShoppingBag className="w-4 h-4 text-gold" />
      <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
        Cart
      </span>
      {cart.totalCount > 0 && (
        <span
          id="cart-count"
          className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold bg-gold text-espresso rounded-full shadow-sm"
        >
          {cart.totalCount}
        </span>
      )}
    </button>
  );
}
