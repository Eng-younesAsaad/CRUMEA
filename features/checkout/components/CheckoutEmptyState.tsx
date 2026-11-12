import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function CheckoutEmptyState(): React.ReactElement {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-5 bg-card/60 backdrop-blur-sm p-8 rounded-2xl border border-border">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/15 text-gold">
          <ShoppingBag className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-muted-foreground">
          You cannot proceed to checkout without any artisan treats in your
          basket.
        </p>
        <div className="pt-2">
          <Button asChild variant="primary" size="lg" className="w-full">
            <Link href="/shop">Browse the Bakery</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
