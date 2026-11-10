import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound(): React.ReactElement {
  return (
    <div className="py-20 text-center px-4 max-w-lg mx-auto space-y-6">
      <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto text-2xl font-serif">
        🥐
      </div>
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          TREAT NOT FOUND
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
          Crumb Already Enjoyed
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
          The requested bakery item does not exist in our atelier catalog, or
          was a limited seasonal bake that has ended its run.
        </p>
      </div>
      <div className="pt-2 flex justify-center gap-3">
        <Button asChild variant="primary" size="sm">
          <Link href="/shop">Browse Bakery Catalog</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
