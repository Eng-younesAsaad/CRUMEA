import { type Product } from "../products/products.types";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  category: string;
  qty: number;
}

export interface EnrichedCartItem extends CartItem {
  lineTotal: number;
  product: Product;
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
    "name" in value &&
    typeof value.name === "string" &&
    "price" in value &&
    typeof value.price === "number" &&
    "image" in value &&
    typeof value.image === "string" &&
    "category" in value &&
    typeof value.category === "string" &&
    "qty" in value &&
    typeof value.qty === "number" &&
    value.qty > 0
  );
}

export function isCartItemList(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem);
}
