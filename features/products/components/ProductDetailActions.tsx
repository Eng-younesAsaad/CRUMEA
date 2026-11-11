"use client";

import React, { useState } from "react";
import { type Product } from "../products.types";
import { useCart } from "@/features/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingBag } from "lucide-react";

export interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({
  product,
}: ProductDetailActionsProps): React.ReactElement {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleIncrement = (): void => {
    setQty((prev) => prev + 1);
  };

  const handleDecrement = (): void => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleAdd = (): void => {
    if (!product.inStock) return;
    addToCart(product, qty);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border/80">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Quantity Stepper */}
        {product.inStock && (
          <div className="inline-flex items-center justify-between rounded-xl border border-border bg-card p-1 shadow-sm shrink-0">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={qty <= 1}
              aria-label={`Decrease quantity of ${product.name}`}
              className="p-2.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-12 text-center text-sm font-bold text-foreground select-none"
              aria-label={`Selected quantity: ${qty}`}
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Increase quantity of ${product.name}`}
              className="p-2.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="flex-1 py-3.5 px-8 font-bold text-xs uppercase tracking-wider shadow-warm-md flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>
            {product.inStock
              ? `Add ${qty > 1 ? `(${qty})` : ""} to Basket — $${(product.price * qty).toFixed(2)}`
              : "Sold Out for Today"}
          </span>
        </Button>
      </div>

      <p className="text-[11px] text-muted-foreground font-light flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        <span>Carefully boxed in climate-controlled luxury packaging</span>
      </p>
    </div>
  );
}
