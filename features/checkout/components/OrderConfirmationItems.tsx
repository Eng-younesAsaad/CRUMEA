import React from "react";
import Image from "next/image";
import { type ConfirmedOrder } from "../checkout.schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface OrderConfirmationItemsProps {
  order: ConfirmedOrder;
}

export function OrderConfirmationItems({
  order,
}: OrderConfirmationItemsProps): React.ReactElement {
  return (
    <Card className="border-gold/20 bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-lg font-serif">
          Artisan Treats in this Order
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border/40">
          {order.items.map((item) => (
            <li key={item.id} className="p-4 sm:p-5 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/60">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base text-foreground truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Qty: {item.qty} &times; ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-serif font-semibold text-foreground text-base">
                  ${item.lineTotal.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="p-5 bg-muted/30 border-t border-border/40 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Shipping</span>
            <span>
              {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Estimated Tax (8%)</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-serif font-bold text-foreground pt-2 border-t border-border/40">
            <span>Final Total</span>
            <span className="text-gold">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
