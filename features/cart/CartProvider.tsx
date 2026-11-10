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
import { getProducts } from "../products/products.api";
import { useToast } from "@/lib/context/ToastContext";

interface CartContextType {
  items: CartItem[];
  cart: Cart;
  products: Product[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addToCart: (productId: number, qty?: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  removeItem: (productId: number) => void;
  clearCart: (silent?: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  initialProducts = [],
}: {
  children: React.ReactNode;
  initialProducts?: Product[];
}): React.ReactElement {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { success, info } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = getSavedCart();
    setItems(saved);
  }, []);

  // Fetch products if not provided
  useEffect(() => {
    if (products.length === 0) {
      getProducts("normal")
        .then((fetched) => {
          setProducts(fetched);
        })
        .catch(() => {
          // Handled gracefully
        });
    }
  }, [products.length]);

  // Derived cart state pure computation on every render
  const cart = useMemo(() => {
    return buildCart(items, products);
  }, [items, products]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  const addToCart = useCallback(
    (productId: number, qty: number = 1) => {
      setItems((prev) => {
        const updated = addItemToCartState(prev, productId, qty);
        saveCart(updated);
        return updated;
      });

      const matched = products.find((p) => p.id === productId);
      const productName = matched ? matched.name : "Artisan Treat";
      success(`Added ${qty} × ${productName} to your cart`);
      openDrawer();
    },
    [products, success, openDrawer]
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
        products,
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

