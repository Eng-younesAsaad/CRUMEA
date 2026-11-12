import React from "react";
import { Sparkles } from "lucide-react";

export interface CartFreeShippingBarProps {
  freeShippingProgress: number;
  amountNeededForFreeShipping: number;
  subtotal: number;
  freeShippingThreshold: number;
}

export function CartFreeShippingBar({
  freeShippingProgress,
  amountNeededForFreeShipping,
  subtotal,
  freeShippingThreshold,
}: CartFreeShippingBarProps): React.ReactElement {
  return (
    <div className="p-4 rounded-2xl border border-border bg-card shadow-warm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold gap-1 mb-2">
        {freeShippingProgress >= 100 ? (
          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold" />
            You have unlocked Free Fresh Delivery!
          </span>
        ) : (
          <span className="text-muted-foreground">
            Add{" "}
            <strong className="text-foreground">
              ${amountNeededForFreeShipping.toFixed(2)}
            </strong>{" "}
            more to qualify for Free Shipping!
          </span>
        )}
        <span className="text-muted-foreground">
          ${subtotal.toFixed(2)} / ${freeShippingThreshold.toFixed(2)}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-border/60 overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-300"
          style={{ width: `${freeShippingProgress}%` }}
        />
      </div>
    </div>
  );
}
