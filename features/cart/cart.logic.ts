import { type Cart, type CartItem, type EnrichedCartItem } from "./cart.types";

export const FREE_SHIPPING_THRESHOLD = 50.0;
export const STANDARD_SHIPPING_FEE = 5.0;
export const TAX_RATE = 0.08;

export function calculateCartCount(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.qty, 0);
}

export function calculateCartTotal(items: CartItem[]): number {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  return Math.round(total * 100) / 100;
}

export function buildCart(items: CartItem[]): Cart {
  const enrichedItems: EnrichedCartItem[] = items.map((item) => {
    const lineTotal = Math.round(item.price * item.qty * 100) / 100;
    return {
      ...item,
      lineTotal,
      product: {
        id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        description: "",
        inStock: true,
        rating: 5,
        reviewCount: 0,
      },
    };
  });

  const totalCount = calculateCartCount(items);
  const subtotal = calculateCartTotal(items);

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
