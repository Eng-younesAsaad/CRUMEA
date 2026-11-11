import React from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type CheckoutFormData } from "../checkout.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CustomerContactFieldsProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

export function CustomerContactFields({
  register,
  errors,
}: CustomerContactFieldsProps): React.ReactElement {
  return (
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
  );
}
