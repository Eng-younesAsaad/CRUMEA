"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "../products.types";
import { useCart } from "@/features/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, Plus, Minus, ShoppingBag } from "lucide-react";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): React.ReactElement {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewQty, setQuickViewQty] = useState(1);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product.id, 1);
  };

  const handleQuickViewAdd = (): void => {
    if (!product.inStock) return;
    addToCart(product.id, quickViewQty);
    setIsQuickViewOpen(false);
    setQuickViewQty(1);
  };

  const detailPath = `/products/${product.id}`;

  return (
    <>
      <Card className="group overflow-hidden flex flex-col justify-between border-border/80 hover:border-gold/80 hover:shadow-warm-md transition-all duration-300">
        <div>
          {/* Image presentation with badges & quick view action */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/30">
            <Link
              href={detailPath}
              aria-label={`View details for ${product.name}`}
              className="block w-full h-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
              <Badge
                variant="gold"
                className="text-[10px] tracking-wider uppercase backdrop-blur-sm"
              >
                {product.category}
              </Badge>
            </div>

            <div className="absolute top-3 right-3 pointer-events-none">
              <Badge
                variant={product.inStock ? "success" : "destructive"}
                className="text-[10px] font-semibold"
              >
                {product.inStock ? "● Fresh" : "Sold Out"}
              </Badge>
            </div>

            {/* Quick View trigger button */}
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(true)}
              aria-label={`Quick view ${product.name}`}
              className="absolute bottom-3 right-3 p-2 rounded-full bg-[#1A110B]/85 hover:bg-[#C89B68] text-[#FAF6F0] hover:text-[#1A110B] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Product details */}
          <CardContent className="p-4 pt-4">
            <h3 className="font-serif text-base sm:text-lg font-bold text-foreground leading-snug">
              <Link
                href={detailPath}
                className="hover:text-gold transition-colors line-clamp-1"
              >
                {product.name}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </CardContent>
        </div>

        {/* Footer with price & Add to Cart button */}
        <CardFooter className="p-4 pt-0 flex items-center justify-between gap-3 border-t border-border/40 mt-2">
          <div>
            <span className="text-[10px] tracking-wider uppercase text-muted-foreground block">
              Price
            </span>
            <span className="font-bold text-base sm:text-lg text-foreground">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 shadow-sm"
          >
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </Button>
        </CardFooter>
      </Card>

      {/* Quick View Modal */}
      <Modal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        title={product.name}
        description={`Artisan ${product.category} from our Parisian tray`}
        size="md"
        footer={
          <div className="flex items-center justify-between w-full gap-4">
            <div className="font-serif text-xl font-bold text-foreground">
              ${(product.price * quickViewQty).toFixed(2)}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsQuickViewOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleQuickViewAdd}
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
                onClick={() => setIsQuickViewOpen(false)}
                className="text-gold font-semibold hover:underline"
              >
                View Full Product Story &amp; Details →
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
