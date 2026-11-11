import React from "react";
import Link from "next/link";
import { type Cart } from "../cart.types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface CartDrawerFooterProps {
  cart: Cart;
  onCheckout: () => void;
  onClose: () => void;
  onOpenClear: () => void;
}

export function CartDrawerFooter({
  cart,
  onCheckout,
  onClose,
  onOpenClear,
}: CartDrawerFooterProps): React.ReactElement {
  return (
    <div className="p-6 border-t border-border bg-card space-y-3.5">
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex justify-between items-center text-sm font-bold text-foreground">
          <span>Subtotal:</span>
          <span className="font-serif text-base text-gold">
            ${cart.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span>Fresh Delivery:</span>
          <span>
            {cart.shipping === 0 ? "FREE" : `$${cart.shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <Button
          type="button"
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          onClick={onCheckout}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="flex-1"
            size="sm"
            onClick={onClose}
          >
            <Link href="/cart">Full Cart View</Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-destructive"
            onClick={onOpenClear}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
