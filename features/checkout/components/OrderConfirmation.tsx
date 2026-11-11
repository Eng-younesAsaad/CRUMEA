"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ConfirmedOrder } from "../checkout.schema";
import { Button } from "@/components/ui/button";
import { OrderConfirmationHeader } from "./OrderConfirmationHeader";
import { OrderConfirmationDetails } from "./OrderConfirmationDetails";
import { OrderConfirmationItems } from "./OrderConfirmationItems";

export interface OrderConfirmationProps {
  order: ConfirmedOrder;
}

export function OrderConfirmation({
  order,
}: OrderConfirmationProps): React.ReactElement {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-4" aria-live="polite">
      <OrderConfirmationHeader orderNumber={order.orderNumber} />

      <OrderConfirmationDetails order={order} />

      <OrderConfirmationItems order={order} />

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          asChild
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Link href="/shop" className="inline-flex items-center gap-2">
            <span>Browse More Treats</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
