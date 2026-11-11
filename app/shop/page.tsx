import React, { Suspense } from "react";
import { type Metadata } from "next";
import { getProducts } from "@/features/products/products.api";
import { detectModeFromSearchParams } from "@/lib/api/client";
import { ShopCatalogClient } from "@/features/products/components/ShopCatalogClient";
import { ShopCatalogHeader } from "@/features/products/components/ShopCatalogHeader";
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
        <ShopCatalogHeader initialCategory={initialCategory} />

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
