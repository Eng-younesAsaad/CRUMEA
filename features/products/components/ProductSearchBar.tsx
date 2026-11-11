import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export interface ProductSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductSearchBar({
  searchQuery,
  onSearchChange,
}: ProductSearchBarProps): React.ReactElement {
  return (
    <div className="relative flex items-center">
      <label htmlFor="shop-search-input" className="sr-only">
        Search artisan treats
      </label>
      <Search className="w-4 h-4 absolute left-3.5 text-muted-foreground pointer-events-none" />
      <Input
        id="shop-search-input"
        type="search"
        placeholder='Search "chocolate", "croissant", "almond"...'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 pr-8 h-10 text-xs sm:text-sm bg-background/80"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search input"
          className="absolute right-2.5 p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
