"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Product } from "../products.types";
import {
  filterAndSortProducts,
  extractCategories,
  type ProductSortOption,
} from "../products.logic";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export interface ShopCatalogClientProps {
  initialProducts: Product[];
  initialCategory?: string;
  hasServerError?: boolean;
}

export function ShopCatalogClient({
  initialProducts,
  initialCategory = "All",
  hasServerError = false,
}: ShopCatalogClientProps): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? ""
  );
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] =
    useState<ProductSortOption>("default");
  const [simulatedError, setSimulatedError] = useState(hasServerError);

  const categories = useMemo(() => {
    return extractCategories(initialProducts);
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(
      initialProducts,
      searchQuery,
      selectedCategory,
      selectedSort
    );
  }, [initialProducts, searchQuery, selectedCategory, selectedSort]);

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = (): void => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSort("default");
    router.replace("/shop", { scroll: false });
  };

  // State 1: Error State (either server error or simulated diagnostic 500 error)
  if (simulatedError) {
    return (
      <div className="py-12 flex justify-center">
        <Card className="max-w-md w-full border-destructive/40 text-center p-6 space-y-4 shadow-warm">
          <CardHeader className="p-0 space-y-2">
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">
              Catalog Temporarily Unavailable
            </CardTitle>
            <CardDescription>
              We encountered a simulated 500 API diagnostic error while fetching
              fresh treats.
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-0 justify-center gap-3 pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setSimulatedError(false);
                router.replace("/shop");
              }}
              className="flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try again</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // State 2: Catalog is completely empty from API (?mode=empty)
  if (initialProducts.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto text-gold text-2xl">
          🥐
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            The Display Case is Empty
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our bakers are currently firing up the ovens for the next morning
            batch. Please check back shortly or reset diagnostic modes.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.replace("/shop")}
        >
          Reload Normal Catalog
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter and Sort Bar */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onResetFilters={handleResetFilters}
        totalProductsCount={initialProducts.length}
        filteredProductsCount={filteredProducts.length}
        onSimulateError={() => setSimulatedError(true)}
      />

      {/* State 3 & 4: Filtered Products or No-Match */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage={`No artisan treats matched "${searchQuery || selectedCategory}". Try selecting another category or resetting filters.`}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
