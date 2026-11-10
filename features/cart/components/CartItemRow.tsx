"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type EnrichedCartItem } from "../cart.types";
import { useCart } from "../CartProvider";
import { Minus, Plus, Trash2 } from "lucide-react";

export interface CartItemRowProps {
  item: EnrichedCartItem;
  onNavigate?: () => void;
}

export function CartItemRow({
  item,
  onNavigate,
}: CartItemRowProps): React.ReactElement {
  const { updateQuantity, removeItem } = useCart();
  const { product } = item;

  return (
    <article
      className="flex items-start gap-3.5 py-4 border-b border-border/60 last:border-0"
      data-product-id={product.id}
    >
      <Link
        href={`/products/${product.id}`}
        onClick={onNavigate}
        className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border/80 bg-secondary/30 block group"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="64px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${product.id}`}
          onClick={onNavigate}
          className="font-serif text-sm font-semibold text-foreground hover:text-gold transition-colors line-clamp-1 block"
        >
          {product.name}
        </Link>
        <span className="text-xs text-muted-foreground block mt-0.5">
          ${product.price.toFixed(2)} each
        </span>

        <div className="flex items-center justify-between gap-2 mt-2.5">
          {/* Quantity Stepper */}
          <div className="inline-flex items-center rounded-full border border-border bg-background shadow-sm">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, -1)}
              disabled={item.qty <= 1}
              aria-label={`Decrease quantity of ${product.name}`}
              className="p-1 rounded-l-full hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span
              className="w-7 text-center text-xs font-semibold text-foreground select-none"
              aria-label={`Quantity: ${item.qty}`}
            >
              {item.qty}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, 1)}
              aria-label={`Increase quantity of ${product.name}`}
              className="p-1 rounded-r-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-foreground">
              ${item.lineTotal.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(product.id)}
              aria-label={`Remove ${product.name} from basket`}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
