"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { type Cart, type CartItem } from "./cart.types";
import { type Product } from "../products/products.types";
import { buildCart } from "./cart.logic";
import {
  getSavedCart,
  saveCart,
  addItemToCartState,
  updateItemQuantityInState,
  removeItemFromCartState,
  clearCartState,
} from "./cart.state";
import { useToast } from "@/lib/context/ToastContext";

interface CartContextType {
  items: CartItem[];
  cart: Cart;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addToCart: (product: Product, qty?: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  removeItem: (productId: number) => void;
  clearCart: (silent?: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { success, info } = useToast();

  // Load saved cart snapshot from localStorage on mount
  useEffect(() => {
    const saved = getSavedCart();
    setItems(saved);
  }, []);

  // Pure synchronous derived cart computation - zero network useEffect
  const cart = useMemo(() => {
    return buildCart(items);
  }, [items]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  const addToCart = useCallback(
    (product: Product, qty: number = 1) => {
      setItems((prev) => {
        const updated = addItemToCartState(prev, product, qty);
        saveCart(updated);
        return updated;
      });
      success(`Added ${qty} × ${product.name} to your cart`);
      openDrawer();
    },
    [success, openDrawer]
  );

  const updateQuantity = useCallback((productId: number, delta: number) => {
    setItems((prev) => {
      const updated = updateItemQuantityInState(prev, productId, delta);
      saveCart(updated);
      return updated;
    });
  }, []);

  const removeItem = useCallback(
    (productId: number) => {
      setItems((prev) => {
        const updated = removeItemFromCartState(prev, productId);
        saveCart(updated);
        return updated;
      });
      info("Item removed from your basket");
    },
    [info]
  );

  const clearCart = useCallback(
    (silent: boolean = false) => {
      clearCartState();
      setItems([]);
      if (!silent) {
        info("Your cart has been cleared");
      }
    },
    [info]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
