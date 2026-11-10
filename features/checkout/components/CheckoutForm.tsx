"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "../checkout.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Truck, CreditCard, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckoutFormProps {
  onSubmitSuccess: (data: CheckoutFormData) => void;
  subtotal: number;
}

export function CheckoutForm({
  onSubmitSuccess,
  subtotal,
}: CheckoutFormProps): React.ReactElement {
  const isFreeStandard = subtotal >= 50.0;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      deliveryMethod: "standard",
      paymentMethod: "card",
      notes: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitSuccess)}
      className="space-y-8"
      noValidate
      aria-label="Artisan Bakery Checkout Form"
    >
      {/* 1. Customer Contact Details */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-warm space-y-4">
        <div className="border-b border-border/60 pb-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            1. Customer Information
          </h2>
          <p className="text-xs text-muted-foreground font-light">
            We will send your order confirmation and dispatch updates here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="fullName" required>
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="e.g. Eleanor Beauchamp"
              error={Boolean(errors.fullName)}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p
                className="text-[11px] text-destructive font-medium"
                role="alert"
              >
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="eleanor@example.com"
              error={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p
                className="text-[11px] text-destructive font-medium"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" required>
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+33 1 42 68 00 00"
              error={Boolean(errors.phone)}
              {...register("phone")}
            />
            {errors.phone && (
              <p
                className="text-[11px] text-destructive font-medium"
                role="alert"
              >
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Delivery Address */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-warm space-y-4">
        <div className="border-b border-border/60 pb-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            2. Fresh Delivery Address
          </h2>
          <p className="text-xs text-muted-foreground font-light">
            Hand-delivered in insulated packaging to protect textures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-12 space-y-1.5">
            <Label htmlFor="address" required>
              Street Address &amp; Apartment
            </Label>
            <Input
              id="address"
              placeholder="e.g. 42 Rue de Saint-Honoré, Apt 3B"
              error={Boolean(errors.address)}
              {...register("address")}
            />
            {errors.address && (
              <p
                className="text-[11px] text-destructive font-medium"
                role="alert"
              >
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-7 space-y-1.5">
            <Label htmlFor="city" required>
              City
            </Label>
            <Input
              id="city"
              placeholder="e.g. Paris"
              error={Boolean(errors.city)}
              {...register("city")}
            />
            {errors.city && (
              <p
                className="text-[11px] text-destructive font-medium"
                role="alert"
              >
                {errors.city.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-5 space-y-1.5">
            <Label htmlFor="postalCode" required>
              Postal Code
            </Label>
            <Input
              id="postalCode"
              placeholder="e.g. 75001"
              error={Boolean(errors.postalCode)}
              {...register("postalCode")}
            />
            {errors.postalCode && (
              <p
                className="text-[11px] text-destructive font-medium"
                role="alert"
              >
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>
      </div>

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

      {/* 4. Payment Method Selection */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-warm space-y-4">
        <div className="border-b border-border/60 pb-3">
          <h2 className="font-serif text-xl font-bold text-foreground">
            4. Payment Option
          </h2>
          <p className="text-xs text-muted-foreground font-light">
            All card transactions are encrypted with 256-bit bank grade
            security.
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

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full py-4 text-sm font-bold uppercase tracking-[0.14em] shadow-warm-lg flex items-center justify-center gap-2"
      >
        <Lock className="w-4 h-4" />
        <span>
          {isSubmitting
            ? "Processing Order..."
            : "Confirm & Place Bakery Order"}
        </span>
      </Button>
    </form>
  );
}
