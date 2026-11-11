import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

export function CheckoutHeader(): React.ReactElement {
  return (
    <div className="space-y-2">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <Link href="/cart" className="hover:text-foreground transition-colors">
          Cart
        </Link>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <span className="text-foreground font-medium">Checkout</span>
      </nav>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/50 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C89B68]">
            Secure Atelier Checkout
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-normal mt-1">
            Finalize Your Order
          </h1>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <ShieldCheck
            className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
          256-Bit Encrypted &amp; Hand-Packed Fresh
        </p>
      </div>
    </div>
  );
}
