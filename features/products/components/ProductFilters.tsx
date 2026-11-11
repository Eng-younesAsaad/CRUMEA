"use client";

import React from "react";
import { type ProductSortOption, isProductSortOption } from "../products.logic";
import { ProductCategoryPills } from "./ProductCategoryPills";
import { ProductSearchBar } from "./ProductSearchBar";
import { Button } from "@/components/ui/button";
import { RotateCcw, AlertTriangle } from "lucide-react";

export interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  selectedSort: ProductSortOption;
  onSortChange: (sort: ProductSortOption) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
  filteredProductsCount: number;
  onSimulateError?: () => void;
}

export function ProductFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
  selectedSort,
  onSortChange,
  onResetFilters,
  totalProductsCount,
  filteredProductsCount,
  onSimulateError,
}: ProductFiltersProps): React.ReactElement {
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    (selectedCategory !== "All" && selectedCategory.trim().length > 0) ||
    selectedSort !== "default";

  return (
    <div
      className="p-5 rounded-2xl border border-border/80 bg-card shadow-warm space-y-4"
      role="search"
      aria-label="Filter and sort artisan treats"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5">
          <ProductSearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-3">
          <label htmlFor="shop-category-select" className="sr-only">
            Select category
          </label>
          <select
            id="shop-category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-2">
          <label htmlFor="shop-sort-select" className="sr-only">
            Sort products
          </label>
          <select
            id="shop-sort-select"
            value={selectedSort}
            onChange={(e) => {
              const val = e.target.value;
              if (isProductSortOption(val)) {
                onSortChange(val);
              }
            }}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground cursor-pointer"
          >
            <option value="default">Default Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex items-center gap-2 justify-end">
          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="text-xs flex items-center gap-1.5 h-10 hover:border-gold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
          )}

          {onSimulateError && (
            <button
              type="button"
              onClick={onSimulateError}
              title="Test Error Boundary (Simulate 500)"
              aria-label="Simulate 500 error"
              className="p-2.5 rounded-md border border-border/80 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <ProductCategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
        <span>
          Showing{" "}
          <strong className="text-foreground">{filteredProductsCount}</strong>{" "}
          of {totalProductsCount} artisan treats
        </span>
        {hasActiveFilters && (
          <span className="text-gold font-medium">Filters active</span>
        )}
      </div>
    </div>
  );
}
