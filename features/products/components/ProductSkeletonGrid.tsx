import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProductSkeletonGridProps {
  count?: number;
}

export function ProductSkeletonGrid({
  count = 4,
}: ProductSkeletonGridProps): React.ReactElement {
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border/80 bg-card p-4 space-y-3"
        >
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <div className="space-y-2 pt-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/60">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
