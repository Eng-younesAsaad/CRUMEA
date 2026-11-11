import React from "react";
import Image from "next/image";
import { type Cart } from "@/features/cart/cart.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Sparkles, ShieldCheck } from "lucide-react";

export interface CheckoutSummaryCardProps {
  cart: Cart;
  subtotal: number;
  standardShipping: number;
  estimatedTax: number;
  estimatedTotal: number;
}

export function CheckoutSummaryCard({
  cart,
  subtotal,
  standardShipping,
  estimatedTax,
  estimatedTotal,
}: CheckoutSummaryCardProps): React.ReactElement {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <Card className="border-[#C89B68]/30 shadow-md bg-card/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-muted/40 pb-4 border-b border-border/50">
          <CardTitle className="font-serif text-lg flex items-center justify-between">
            <span>Order Summary</span>
            <Badge variant="outline" className="text-xs font-mono">
              {cart.totalCount} {cart.totalCount === 1 ? "item" : "items"}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          <ul className="divide-y divide-border/40 max-h-72 overflow-y-auto pr-1">
            {cart.items.map((item) => (
              <li
                key={item.productId}
                className="py-3 first:pt-0 last:pb-0 flex items-center gap-3"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.qty} &times; ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="text-sm font-serif font-semibold text-foreground">
                  ${item.lineTotal.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-border/60 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground items-center">
              <span className="flex items-center gap-1.5">
                <Truck
                  className="w-3.5 h-3.5 text-[#C89B68]"
                  aria-hidden="true"
                />
                Standard Courier
              </span>
              <span className="font-medium text-foreground">
                {standardShipping === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    FREE
                  </span>
                ) : (
                  `$${standardShipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Tax (8%)</span>
              <span className="font-medium text-foreground">
                ${estimatedTax.toFixed(2)}
              </span>
            </div>
            <div className="pt-3 border-t border-border flex justify-between items-baseline font-serif">
              <span className="text-base text-foreground font-semibold">
                Estimated Total
              </span>
              <span className="text-2xl text-[#C89B68] font-bold">
                ${estimatedTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {subtotal < 50.0 ? (
            <div className="p-3 bg-[#C89B68]/10 rounded-lg border border-[#C89B68]/20 text-xs text-muted-foreground">
              Add{" "}
              <strong className="text-foreground">
                ${(50.0 - subtotal).toFixed(2)}
              </strong>{" "}
              more for complimentary artisan shipping.
            </div>
          ) : (
            <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-lg border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
              <Sparkles
                className="w-3.5 h-3.5 text-emerald-600"
                aria-hidden="true"
              />
              Complimentary standard shipping unlocked!
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-2 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#C89B68]" aria-hidden="true" />
          The CRUMÉA Freshness Guarantee
        </p>
        <p>
          Each batch is baked to order on the morning of dispatch. Shipped in
          climate-monitored luxury gift packaging.
        </p>
      </div>
    </aside>
  );
}
