import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading(): React.ReactElement {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Skeleton className="h-4 w-48" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-6">
            <Skeleton className="aspect-square w-full rounded-3xl" />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-28" />
            <div className="space-y-2 py-4 border-t border-b border-border/60">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <Skeleton className="h-12 w-full rounded-xl" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
