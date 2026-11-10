import { type Product } from "../products/products.types";
import { type Cart, type CartItem, type EnrichedCartItem } from "./cart.types";

export const FREE_SHIPPING_THRESHOLD = 50.0;
export const STANDARD_SHIPPING_FEE = 5.0;
export const TAX_RATE = 0.08;

export function calculateCartCount(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.qty, 0);
}

export function calculateCartTotal(items: CartItem[], products: Product[]): number {
  const productMap = new Map<number, Product>();
  for (const product of products) {
    productMap.set(product.id, product);
  }

  let total = 0;
  for (const item of items) {
    const prod = productMap.get(item.productId);
    if (prod) {
      total += prod.price * item.qty;
    }
  }

  return Math.round(total * 100) / 100;
}

export function buildCart(items: CartItem[], products: Product[]): Cart {
  const productMap = new Map<number, Product>();
  for (const product of products) {
    productMap.set(product.id, product);
  }

  const enrichedItems: EnrichedCartItem[] = [];
  let totalCount = 0;
  let subtotal = 0;

  for (const item of items) {
    const prod = productMap.get(item.productId);
    if (prod) {
      const lineTotal = Math.round(prod.price * item.qty * 100) / 100;
      enrichedItems.push({
        productId: item.productId,
        qty: item.qty,
        product: prod,
        lineTotal,
      });
      totalCount += item.qty;
      subtotal += lineTotal;
    }
  }

  subtotal = Math.round(subtotal * 100) / 100;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const finalTotal = Math.round((subtotal + shipping + tax) * 100) / 100;

  const progress =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? 100
      : Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const amountNeeded = Math.max(
    0,
    Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100
  );

  return {
    items: enrichedItems,
    totalCount,
    totalPrice: subtotal,
    subtotal,
    shipping,
    tax,
    finalTotal,
    freeShippingProgress: progress,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping: amountNeeded,
  };
}

