import React from "react";
import {
  type Control,
  type UseFormRegister,
  Controller,
} from "react-hook-form";
import { type CheckoutFormData } from "../checkout.schema";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethodRadio } from "./PaymentMethodRadio";
import { cn } from "@/lib/utils";

export interface DeliveryPaymentSectionProps {
  control: Control<CheckoutFormData>;
  register: UseFormRegister<CheckoutFormData>;
  isFreeStandard: boolean;
}

export function DeliveryPaymentSection({
  control,
  register,
  isFreeStandard,
}: DeliveryPaymentSectionProps): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* 3. Delivery Method Selection */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-warm space-y-4">
        <div className="border-b border-border/60 pb-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            3. Delivery Speed
          </h2>
          <p className="text-xs text-muted-foreground font-light">
            Select your preferred fresh courier window.
          </p>
        </div>

        <Controller
          name="deliveryMethod"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 gap-3"
            >
              <label
                className={cn(
                  "flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all",
                  field.value === "standard"
                    ? "border-gold bg-gold/10 ring-1 ring-gold"
                    : "border-border hover:border-gold/50 bg-background/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value="standard"
                    id="del-standard"
                    className="mt-1"
                  />
                  <div>
                    <span className="font-bold text-sm text-foreground block">
                      Standard Courier Delivery
                    </span>
                    <span className="text-xs text-muted-foreground font-light block mt-0.5">
                      Temperature-controlled courier (1-2 business days)
                    </span>
                  </div>
                </div>
                <span className="font-bold text-xs uppercase tracking-wider text-gold">
                  {isFreeStandard ? "FREE" : "$5.00"}
                </span>
              </label>

              <label
                className={cn(
                  "flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all",
                  field.value === "express"
                    ? "border-gold bg-gold/10 ring-1 ring-gold"
                    : "border-border hover:border-gold/50 bg-background/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value="express"
                    id="del-express"
                    className="mt-1"
                  />
                  <div>
                    <span className="font-bold text-sm text-foreground block">
                      Same-Day Morning Artisan Express
                    </span>
                    <span className="text-xs text-muted-foreground font-light block mt-0.5">
                      Dispatched immediately after baking (within 4 hours)
                    </span>
                  </div>
                </div>
                <span className="font-bold text-xs uppercase tracking-wider text-gold">
                  $9.50
                </span>
              </label>
            </RadioGroup>
          )}
        />
      </div>

      {/* 4. Payment Option */}
      <PaymentMethodRadio control={control} />

      {/* 5. Special Instructions & Notes */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-warm space-y-3">
        <Label htmlFor="notes">
          Special Baking / Delivery Instructions (Optional)
        </Label>
        <Textarea
          id="notes"
          placeholder="e.g. Please leave at front desk, gift message: 'Joyeux Anniversaire Sophie!'"
          maxLength={250}
          {...register("notes")}
        />
        <p className="text-[11px] text-muted-foreground font-light">
          Maximum 250 characters. Included as a handwritten calligraphy note.
        </p>
      </div>
    </div>
  );
}
