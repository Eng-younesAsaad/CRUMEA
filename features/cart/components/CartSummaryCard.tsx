import React from "react";
import { useRouter } from "next/navigation";
import { type Cart } from "../cart.types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export interface CartSummaryCardProps {
  cart: Cart;
}

export function CartSummaryCard({
  cart,
}: CartSummaryCardProps): React.ReactElement {
  const router = useRouter();

  return (
    <Card className="border-border shadow-warm-md">
      <CardHeader className="pb-4 border-b border-border/60">
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3.5 pt-4 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Subtotal:</span>
          <span className="font-semibold text-foreground">
            ${cart.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-muted-foreground">
          <span>Fresh Courier Delivery:</span>
          <span className="font-semibold text-foreground">
            {cart.shipping === 0 ? "FREE" : `$${cart.shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-muted-foreground">
          <span>Estimated Tax (8%):</span>
          <span className="font-semibold text-foreground">
            ${cart.tax.toFixed(2)}
          </span>
        </div>

        <div className="pt-3 border-t border-border/80 flex justify-between items-center text-sm font-bold text-foreground">
          <span>Estimated Total:</span>
          <span className="font-serif text-xl text-gold">
            ${cart.finalTotal.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm"
          onClick={() => router.push("/checkout")}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
          <span>Guaranteed fresh delivery with temperature control</span>
        </div>
      </CardFooter>
    </Card>
  );
}
