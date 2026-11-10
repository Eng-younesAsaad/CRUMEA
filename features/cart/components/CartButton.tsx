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
        "relative flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-[#C89B68]/30 hover:border-[#C89B68] text-[#FAF6F0] hover:text-[#C89B68] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B68]",
        className
      )}
    >
      <ShoppingBag className="w-4 h-4 text-[#C89B68]" />
      <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
        Cart
      </span>
      {cart.totalCount > 0 && (
        <span
          id="cart-count"
          className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold bg-[#C89B68] text-[#1A110B] rounded-full shadow-sm"
        >
          {cart.totalCount}
        </span>
      )}
    </button>
  );
}
