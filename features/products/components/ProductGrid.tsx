import React from "react";
import { type Product } from "../products.types";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cookie } from "lucide-react";

export interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  onResetFilters?: () => void;
}

export function ProductGrid({
  products,
  emptyMessage = "No artisan treats match your criteria at this moment.",
  onResetFilters,
}: ProductGridProps): React.ReactElement {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 border border-dashed border-border rounded-2xl bg-card/50 max-w-lg mx-auto space-y-4">
        <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
          <Cookie className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-xl font-bold text-foreground">
            No Treats Found
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {emptyMessage}
          </p>
        </div>
        <div className="pt-2">
          {onResetFilters ? (
            <Button variant="primary" size="sm" onClick={onResetFilters}>
              Reset Filters
            </Button>
          ) : (
            <Button asChild variant="primary" size="sm">
              <Link href="/shop">Browse All Treats</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
