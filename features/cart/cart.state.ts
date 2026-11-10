import { type CartItem, isCartItemList } from "./cart.types";

const CART_STORAGE_KEY = "crumea_cart";

export function getSavedCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (isCartItemList(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Fail silently on storage quota or security error
  }
}

export function addItemToCartState(
  current: CartItem[],
  productId: number,
  qtyToAdd: number = 1
): CartItem[] {
  const index = current.findIndex((item) => item.productId === productId);
  if (index === -1) {
    return [...current, { productId, qty: Math.max(1, qtyToAdd) }];
  }

  return current.map((item, i) =>
    i === index ? { ...item, qty: item.qty + Math.max(1, qtyToAdd) } : item
  );
}

export function updateItemQuantityInState(
  current: CartItem[],
  productId: number,
  delta: number
): CartItem[] {
  return current
    .map((item) => {
      if (item.productId === productId) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
}

export function removeItemFromCartState(
  current: CartItem[],
  productId: number
): CartItem[] {
  return current.filter((item) => item.productId !== productId);
}

export function clearCartState(): CartItem[] {
  saveCart([]);
  return [];
}
