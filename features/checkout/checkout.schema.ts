import { z } from "zod";

const phoneRegex = /^(\+?[0-9\s-]{7,15})$/;

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be under 80 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .regex(
      phoneRegex,
      "Please enter a valid phone number (e.g. +33 1 42 68 00 00)"
    ),
  address: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .max(120, "Address is too long"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City name is too long"),
  postalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(15, "Postal code is too long"),
  deliveryMethod: z.enum(["standard", "express"], {
    errorMap: () => ({ message: "Please select a delivery method" }),
  }),
  paymentMethod: z.enum(["card", "cod"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
  notes: z
    .string()
    .max(250, "Special instructions must not exceed 250 characters")
    .optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export interface ConfirmedOrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  lineTotal: number;
  image: string;
}

export interface ConfirmedOrder {
  orderNumber: string;
  orderDate: string;
  customer: CheckoutFormData;
  items: ConfirmedOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
