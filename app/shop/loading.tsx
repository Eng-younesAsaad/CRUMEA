import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductSkeletonGrid } from "@/features/products/components/ProductSkeletonGrid";

export default function ShopLoading(): React.ReactElement {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3 pb-6 border-b border-border/60">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-2/3 max-w-md" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>
        <Skeleton className="h-28 w-full rounded-2xl" />
        <ProductSkeletonGrid count={8} />
      </div>
    </div>
  );
}
