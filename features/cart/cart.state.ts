import { type Product } from "../products/products.types";
import { type CartItem, isCartItem } from "./cart.types";

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
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validItems: CartItem[] = [];
    for (const item of parsed) {
      if (isCartItem(item)) {
        validItems.push(item);
      }
    }
    return validItems;
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
    // Fail silently on storage quota or security restrictions
  }
}

export function addItemToCartState(
  current: CartItem[],
  product: Product,
  qtyToAdd: number = 1
): CartItem[] {
  const index = current.findIndex((item) => item.productId === product.id);
  const qty = Math.max(1, qtyToAdd);

  if (index === -1) {
    return [
      ...current,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        qty,
      },
    ];
  }

  return current.map((item, i) =>
    i === index ? { ...item, qty: item.qty + qty } : item
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
