import { type Product } from "../products/products.types";

export interface CartItem {
  productId: number;
  qty: number;
}

export interface EnrichedCartItem extends CartItem {
  product: Product;
  lineTotal: number;
}

export interface Cart {
  items: EnrichedCartItem[];
  totalCount: number;
  totalPrice: number;
  subtotal: number;
  shipping: number;
  tax: number;
  finalTotal: number;
  freeShippingProgress: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

export function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "productId" in value &&
    typeof value.productId === "number" &&
    "qty" in value &&
    typeof value.qty === "number" &&
    value.qty > 0
  );
}

export function isCartItemList(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem);
}
