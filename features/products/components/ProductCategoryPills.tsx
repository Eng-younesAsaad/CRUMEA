import React from "react";
import { cn } from "@/lib/utils";

export interface ProductCategoryPillsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ProductCategoryPills({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductCategoryPillsProps): React.ReactElement {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 no-scrollbar">
      {categories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all select-none border",
              isSelected
                ? "bg-gold text-espresso border-gold shadow-sm font-bold"
                : "bg-secondary/40 text-muted-foreground border-border/70 hover:border-gold hover:text-foreground"
            )}
          >
            {cat === "All" ? "All Bakes" : cat}
          </button>
        );
      })}
    </div>
  );
}
