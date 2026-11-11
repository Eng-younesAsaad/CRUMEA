import React from "react";
import Link from "next/link";
import { getProducts } from "@/features/products/products.api";
import { type Product } from "@/features/products/products.types";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export async function FeaturedTreatsSection(): Promise<React.ReactElement> {
  let products: Product[] = [];
  try {
    products = await getProducts("normal");
  } catch (error) {
    console.error("Failed to load featured products for home page:", error);
    products = [];
  }

  const featured = products.slice(0, 4);

  return (
    <section
      className="py-16 sm:py-20 bg-background border-b border-border/80"
      aria-labelledby="featured-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-1">
              CHEF&apos;S MORNING SELECTION
            </p>
            <h2
              id="featured-title"
              className="font-serif text-3xl sm:text-4xl font-normal text-foreground"
            >
              Featured Artisan Treats
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider hover:border-gold hover:text-gold"
          >
            <Link href="/shop">
              <span>View Full Tray ({products.length || "All"})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={featured} />

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/shop">View Full Tray →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
