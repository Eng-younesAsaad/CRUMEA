import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "../products.types";
import { Badge } from "@/components/ui/badge";
import { ProductDetailActions } from "./ProductDetailActions";
import { ProductGrid } from "./ProductGrid";
import { ProductAssuranceBadges } from "./ProductAssuranceBadges";

export interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps): React.ReactElement {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-light"
        >
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-gold transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span
            className="text-foreground font-medium truncate max-w-xs"
            aria-current="page"
          >
            {product.name}
          </span>
        </nav>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden border border-border shadow-warm-lg bg-card">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge
                  variant="gold"
                  className="text-xs uppercase tracking-wider backdrop-blur-md"
                >
                  {product.category}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 px-1">
              <span className="font-serif italic text-gold">
                Handcrafted in Paris
              </span>
              <span>100% Artisan Batch</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Badge
                  variant={product.inStock ? "success" : "destructive"}
                  className="text-xs font-semibold"
                >
                  {product.inStock
                    ? "● Fresh & In Stock"
                    : "○ Sold Out for Today"}
                </Badge>
                <span className="text-xs text-muted-foreground font-light">
                  Batch #{product.id.toString().padStart(4, "0")}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
                {product.name}
              </h1>

              <div className="pt-2">
                <span className="font-serif text-3xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground ml-2 font-light">
                  Tax included
                </span>
              </div>
            </div>

            <div className="border-t border-b border-border/80 py-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                The Baker&apos;s Description
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <ProductDetailActions product={product} />

            <ProductAssuranceBadges />
          </div>
        </div>

        {/* Related Treats Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-border/80 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-1">
                  FROM THE SAME TRAY
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                  You May Also Savor
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
              >
                <span>Browse Full Tray</span>
                <span>→</span>
              </Link>
            </div>

            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
