import React from "react";
import Link from "next/link";

export interface ShopCatalogHeaderProps {
  initialCategory: string;
}

export function ShopCatalogHeader({
  initialCategory,
}: ShopCatalogHeaderProps): React.ReactElement {
  return (
    <>
      <nav
        aria-label="Breadcrumbs"
        className="flex items-center gap-2 text-xs text-muted-foreground font-light"
      >
        <Link href="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium" aria-current="page">
          Shop Catalog
        </span>
        {initialCategory !== "All" && (
          <>
            <span>/</span>
            <span className="text-gold font-semibold">{initialCategory}</span>
          </>
        )}
      </nav>

      <div className="space-y-2 border-b border-border/80 pb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          FRESH FROM OUR OVENS
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
          Artisan Pâtisserie Catalog
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl font-light leading-relaxed">
          Every treat is baked with stone-milled flour from Normandy, churned
          Brittany butter, and single-origin chocolate. Freshly baked every
          dawn.
        </p>
      </div>
    </>
  );
}
