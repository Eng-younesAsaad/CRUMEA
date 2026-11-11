import React from "react";
import { MapPin, CreditCard, Clock, PackageCheck } from "lucide-react";
import { type ConfirmedOrder } from "../checkout.schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface OrderConfirmationDetailsProps {
  order: ConfirmedOrder;
}

export function OrderConfirmationDetails({
  order,
}: OrderConfirmationDetailsProps): React.ReactElement {
  const isExpress = order.customer.deliveryMethod === "express";
  const isCard = order.customer.paymentMethod === "card";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recipient & Delivery */}
      <Card className="border-[#C89B68]/20 bg-card/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-base font-serif flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C89B68]" aria-hidden="true" />
            Delivery Destination
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3 text-sm">
          <div>
            <p className="font-medium text-foreground text-base">
              {order.customer.fullName}
            </p>
            <p className="text-muted-foreground">{order.customer.email}</p>
            <p className="text-muted-foreground">{order.customer.phone}</p>
          </div>
          <div className="pt-2 border-t border-border/40">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
              Shipping Address
            </p>
            <p className="text-foreground">{order.customer.address}</p>
            <p className="text-foreground">
              {order.customer.city}, {order.customer.postalCode}
            </p>
          </div>
          <div className="pt-2 border-t border-border/40">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
              Method
            </p>
            <Badge variant={isExpress ? "gold" : "outline"} className="text-xs">
              {isExpress
                ? "Artisan Same-Day Express"
                : "Standard Courier (2-4 Days)"}
            </Badge>
          </div>
          {order.customer.notes && (
            <div className="pt-2 border-t border-border/40">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
                Baker&apos;s Note
              </p>
              <p className="text-xs italic text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/30">
                &ldquo;{order.customer.notes}&rdquo;
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment & Schedule */}
      <Card className="border-[#C89B68]/20 bg-card/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-base font-serif flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#C89B68]" aria-hidden="true" />
            Payment &amp; Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
              Payment Option
            </p>
            <p className="font-medium text-foreground">
              {isCard
                ? "Credit / Debit Card (Prepaid)"
                : "Cash on Delivery (Pay at Door)"}
            </p>
          </div>
          <div className="pt-2 border-t border-border/40">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
              Order Timestamp
            </p>
            <p className="text-foreground flex items-center gap-2">
              <Clock
                className="w-3.5 h-3.5 text-[#C89B68]"
                aria-hidden="true"
              />
              {order.orderDate}
            </p>
          </div>
          <div className="pt-2 border-t border-border/40">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
              Kitchen Status
            </p>
            <div className="flex items-center gap-2">
              <PackageCheck
                className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span className="font-medium text-foreground">
                In Bakery Atelier (Preparing)
              </span>
            </div>
          </div>
          <div className="pt-3 border-t border-border/40 bg-[#C89B68]/10 -mx-6 -mb-6 p-4 rounded-b-xl flex items-center justify-between">
            <span className="font-serif text-base text-foreground">
              Total Settled:
            </span>
            <span className="font-serif text-xl font-bold text-[#C89B68]">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
