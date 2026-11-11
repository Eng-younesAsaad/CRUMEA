"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "../products.types";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingBag } from "lucide-react";

export interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (qty: number) => void;
}

export function ProductQuickViewModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: ProductQuickViewModalProps): React.ReactElement {
  const [quickViewQty, setQuickViewQty] = useState(1);
  const detailPath = `/products/${product.id}`;

  const handleAdd = (): void => {
    onAddToCart(quickViewQty);
    setQuickViewQty(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      description={`Artisan ${product.category} from our Parisian tray`}
      size="md"
      footer={
        <div className="flex items-center justify-between w-full gap-4">
          <div className="font-serif text-xl font-bold text-foreground">
            ${(product.price * quickViewQty).toFixed(2)}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                Add {quickViewQty > 1 ? `(${quickViewQty})` : ""} to Cart
              </span>
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-border bg-secondary/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold">{product.category}</Badge>
              <Badge variant={product.inStock ? "success" : "destructive"}>
                {product.inStock ? "Fresh & In Stock" : "Sold Out Today"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.inStock && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Select Quantity
              </label>
              <div className="inline-flex items-center rounded-lg border border-border bg-background shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setQuickViewQty((prev) => Math.max(1, prev - 1))
                  }
                  disabled={quickViewQty <= 1}
                  className="p-2 hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-foreground">
                  {quickViewQty}
                </span>
                <button
                  type="button"
                  onClick={() => setQuickViewQty((prev) => prev + 1)}
                  className="p-2 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 text-[11px] text-muted-foreground border-t border-border/60">
            <Link
              href={detailPath}
              onClick={onClose}
              className="text-gold font-semibold hover:underline"
            >
              View Full Product Story &amp; Details →
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
