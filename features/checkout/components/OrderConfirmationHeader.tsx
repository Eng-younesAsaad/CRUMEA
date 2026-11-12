import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface OrderConfirmationHeaderProps {
  orderNumber: string;
}

export function OrderConfirmationHeader({
  orderNumber,
}: OrderConfirmationHeaderProps): React.ReactElement {
  return (
    <div className="text-center space-y-3 bg-gradient-to-b from-gold/15 via-transparent to-transparent p-8 rounded-2xl border border-gold/30">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-espresso mb-2 shadow-lg shadow-gold/20">
        <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
      </div>
      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold">
        Order Confirmed &bull; Fresh from the Oven
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
        Merci Beaucoup!
      </h1>
      <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
        Your order has been received and sent directly to our pastry chefs. We
        will handcraft your treats with passion and precision.
      </p>
      <div className="inline-flex items-center gap-2 pt-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          Order Reference:
        </span>
        <Badge variant="gold" className="text-sm font-mono px-3 py-1 font-bold">
          #{orderNumber}
        </Badge>
      </div>
    </div>
  );
}
