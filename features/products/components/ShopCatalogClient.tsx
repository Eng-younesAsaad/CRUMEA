"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Product } from "../products.types";
import {
  filterAndSortProducts,
  extractCategories,
  type ProductSortOption,
} from "../products.logic";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { ShopCatalogErrorState } from "./ShopCatalogErrorState";
import { ShopCatalogEmptyState } from "./ShopCatalogEmptyState";

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

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  useEffect(() => {
    const urlQuery = searchParams.get("query");
    if (urlQuery !== null) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

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

  if (simulatedError) {
    return (
      <ShopCatalogErrorState
        onRetry={() => {
          setSimulatedError(false);
          router.replace("/shop");
        }}
      />
    );
  }

  if (initialProducts.length === 0) {
    return <ShopCatalogEmptyState />;
  }

  return (
    <div className="space-y-8">
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

      <ProductGrid
        products={filteredProducts}
        emptyMessage={`No artisan treats matched "${searchQuery || selectedCategory}". Try selecting another category or resetting filters.`}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
