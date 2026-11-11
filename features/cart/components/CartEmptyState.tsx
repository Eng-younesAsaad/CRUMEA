import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";

export function CartEmptyState(): React.ReactElement {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-secondary text-gold flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            YOUR BASKET IS EMPTY
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
            Awaiting Fresh Bakes
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-light">
            Your basket is currently empty. Explore our artisan tray of freshly
            baked cookies, pastries, and luxury gift sets!
          </p>
        </div>
        <div className="pt-2">
          <Button asChild variant="primary" size="lg" className="shadow-warm">
            <Link href="/shop" className="flex items-center gap-2">
              <span>Explore Bakery Treats</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
