import React, { Suspense } from "react";
import Link from "next/link";
import { type Metadata } from "next";
import { getProducts } from "@/features/products/products.api";
import { detectModeFromSearchParams } from "@/lib/api/client";
import { ShopCatalogClient } from "@/features/products/components/ShopCatalogClient";
import { ProductSkeletonGrid } from "@/features/products/components/ProductSkeletonGrid";
import { type Product } from "@/features/products/products.types";

export const metadata: Metadata = {
  title: "Shop All Artisan Treats | CRUMÉA Luxury Bakery",
  description:
    "Explore our complete collection of handmade cookies, biscuits, flaky pastries, brownies, and embossed gift sets.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<React.ReactElement> {
  const resolvedParams = await searchParams;
  const mode = detectModeFromSearchParams(resolvedParams);

  const categoryParam = resolvedParams["category"];
  const initialCategory =
    typeof categoryParam === "string" ? categoryParam : "All";

  let products: Product[] = [];
  let hasServerError = false;

  try {
    products = await getProducts(mode);
  } catch (error) {
    console.error("Shop page failed to load products:", error);
    hasServerError = true;
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-muted-foreground font-light"
        >
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium" aria-current="page">
            Shop Catalog
          </span>
          {initialCategory !== "All" && (
            <>
              <span>/</span>
              <span className="text-gold font-semibold">{initialCategory}</span>
            </>
          )}
        </nav>

        {/* Header Hero */}
        <div className="space-y-2 border-b border-border/80 pb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            FRESH FROM OUR OVENS
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
            Artisan Pâtisserie Catalog
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl font-light leading-relaxed">
            Every treat is baked with stone-milled flour from Normandy, churned
            Brittany butter, and single-origin chocolate. Freshly baked every
            dawn.
          </p>
        </div>

        {/* Catalog client with all 4 states */}
        <Suspense fallback={<ProductSkeletonGrid count={8} />}>
          <ShopCatalogClient
            initialProducts={products}
            initialCategory={initialCategory}
            hasServerError={hasServerError}
          />
        </Suspense>
      </div>
    </div>
  );
}
