import React from "react";
import { type Control, Controller } from "react-hook-form";
import { type CheckoutFormData } from "../checkout.schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaymentMethodRadioProps {
  control: Control<CheckoutFormData>;
}

export function PaymentMethodRadio({
  control,
}: PaymentMethodRadioProps): React.ReactElement {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-warm space-y-4">
      <div className="border-b border-border/60 pb-3">
        <h2 className="font-serif text-xl font-bold text-foreground">
          4. Payment Option
        </h2>
        <p className="text-xs text-muted-foreground font-light">
          All card transactions are encrypted with 256-bit bank grade security.
        </p>
      </div>

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <label
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                field.value === "card"
                  ? "border-gold bg-gold/10 ring-1 ring-gold"
                  : "border-border hover:border-gold/50 bg-background/50"
              )}
            >
              <RadioGroupItem value="card" id="pay-card" className="mt-1" />
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sm text-foreground">
                  <CreditCard className="w-4 h-4 text-gold" />
                  <span>Credit / Debit Card</span>
                </div>
                <span className="text-xs text-muted-foreground font-light block">
                  Visa, Mastercard, Amex, Apple Pay
                </span>
              </div>
            </label>

            <label
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                field.value === "cod"
                  ? "border-gold bg-gold/10 ring-1 ring-gold"
                  : "border-border hover:border-gold/50 bg-background/50"
              )}
            >
              <RadioGroupItem value="cod" id="pay-cod" className="mt-1" />
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sm text-foreground">
                  <Truck className="w-4 h-4 text-gold" />
                  <span>Cash on Delivery</span>
                </div>
                <span className="text-xs text-muted-foreground font-light block">
                  Pay with cash or contactless card upon arrival
                </span>
              </div>
            </label>
          </RadioGroup>
        )}
      />
    </div>
  );
}
