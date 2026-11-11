import React from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type CheckoutFormData } from "../checkout.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerContactFields } from "./CustomerContactFields";

export interface ShippingAddressSectionProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

export function ShippingAddressSection({
  register,
  errors,
}: ShippingAddressSectionProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <CustomerContactFields register={register} errors={errors} />

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
    </div>
  );
}
