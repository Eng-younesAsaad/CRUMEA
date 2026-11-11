"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "../checkout.schema";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { ShippingAddressSection } from "./ShippingAddressSection";
import { DeliveryPaymentSection } from "./DeliveryPaymentSection";

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
      <ShippingAddressSection register={register} errors={errors} />

      <DeliveryPaymentSection
        control={control}
        register={register}
        isFreeStandard={isFreeStandard}
      />

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
