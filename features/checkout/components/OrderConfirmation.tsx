"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  PackageCheck,
  Clock,
  MapPin,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import type { ConfirmedOrder } from "../checkout.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface OrderConfirmationProps {
  order: ConfirmedOrder;
}

export function OrderConfirmation({
  order,
}: OrderConfirmationProps): React.ReactElement {
  const isExpress = order.customer.deliveryMethod === "express";
  const isCard = order.customer.paymentMethod === "card";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-4" aria-live="polite">
      {/* Celebration Header */}
      <div className="text-center space-y-3 bg-gradient-to-b from-[#C89B68]/15 via-transparent to-transparent p-8 rounded-2xl border border-[#C89B68]/30">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C89B68] text-[#1A110B] mb-2 shadow-lg shadow-[#C89B68]/20">
          <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C89B68]">
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
          <Badge
            variant="gold"
            className="text-sm font-mono px-3 py-1 font-bold"
          >
            #{order.orderNumber}
          </Badge>
        </div>
      </div>

      {/* Two Column Logistics Breakdown */}
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
              <div className="flex items-center gap-2">
                <Badge
                  variant={isExpress ? "gold" : "outline"}
                  className="text-xs"
                >
                  {isExpress
                    ? "Artisan Same-Day Express"
                    : "Standard Courier (2-4 Days)"}
                </Badge>
              </div>
            </div>
            {order.customer.notes ? (
              <div className="pt-2 border-t border-border/40">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
                  Baker&apos;s Note
                </p>
                <p className="text-xs italic text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/30">
                  &ldquo;{order.customer.notes}&rdquo;
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Payment & Schedule */}
        <Card className="border-[#C89B68]/20 bg-card/80 backdrop-blur-sm shadow-sm">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-serif flex items-center gap-2">
              <CreditCard
                className="w-4 h-4 text-[#C89B68]"
                aria-hidden="true"
              />
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

      {/* Itemized Order Breakdown */}
      <Card className="border-[#C89B68]/20 bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-lg font-serif">
            Artisan Treats in this Order
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border/40">
            {order.items.map((item) => (
              <li key={item.id} className="p-4 sm:p-5 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base text-foreground truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Qty: {item.qty} &times; ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-serif font-semibold text-foreground text-base">
                    ${item.lineTotal.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="p-5 bg-muted/30 border-t border-border/40 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Shipping</span>
              <span>
                {order.shipping === 0
                  ? "FREE"
                  : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Estimated Tax (8%)</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-foreground pt-2 border-t border-border/40">
              <span>Final Total</span>
              <span className="text-[#C89B68]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          asChild
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Link href="/shop" className="inline-flex items-center gap-2">
            Browse More Treats
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
