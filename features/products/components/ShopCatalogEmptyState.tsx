import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ShopCatalogEmptyState(): React.ReactElement {
  const router = useRouter();

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
