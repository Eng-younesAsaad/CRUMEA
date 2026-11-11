import { describe, expect, it } from "vitest";
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
  TAX_RATE,
  buildCart,
  calculateCartCount,
  calculateCartTotal,
} from "./cart.logic";
import { type CartItem } from "./cart.types";

const mockItemA: CartItem = {
  productId: 1,
  name: "Valrhona Dark Chocolate Fleur de Sel",
  price: 4.5,
  image: "/shop1.jpg",
  category: "Cookies",
  qty: 2,
};

const mockItemB: CartItem = {
  productId: 2,
  name: "Pistachio Raspberry Breton",
  price: 6.0,
  image: "/shop2.jpg",
  category: "Biscuits",
  qty: 1,
};

describe("cart.logic", () => {
  it("calculates total item count and subtotal price across multiple cart items", () => {
    const items: CartItem[] = [mockItemA, mockItemB];

    const totalCount = calculateCartCount(items);
    const subtotal = calculateCartTotal(items);

    expect(totalCount).toBe(3);
    // (4.50 * 2) + (6.00 * 1) = 9.00 + 6.00 = 15.00
    expect(subtotal).toBe(15.0);
  });

  it("applies free shipping when the cart subtotal reaches or exceeds the $50 threshold", () => {
    const highValueItem: CartItem = {
      productId: 3,
      name: "Grand Atelier Gifting Box",
      price: 55.0,
      image: "/shop1.jpg",
      category: "Gifting",
      qty: 1,
    };

    const cart = buildCart([highValueItem]);

    expect(cart.subtotal).toBe(55.0);
    expect(cart.shipping).toBe(0);
    expect(cart.freeShippingProgress).toBe(100);
    expect(cart.amountNeededForFreeShipping).toBe(0);
  });

  it("charges the standard shipping fee when the cart subtotal is below $50", () => {
    const items: CartItem[] = [mockItemA]; // 4.50 * 2 = $9.00

    const cart = buildCart(items);

    expect(cart.subtotal).toBe(9.0);
    expect(cart.shipping).toBe(STANDARD_SHIPPING_FEE);
    expect(cart.freeShippingProgress).toBe(18); // 9 / 50 * 100 = 18%
    expect(cart.amountNeededForFreeShipping).toBe(41.0);
  });

  it("returns zero totals and full remaining free-shipping gap for an empty cart", () => {
    const cart = buildCart([]);

    expect(cart.items).toEqual([]);
    expect(cart.totalCount).toBe(0);
    expect(cart.totalPrice).toBe(0);
    expect(cart.subtotal).toBe(0);
    expect(cart.shipping).toBe(0);
    expect(cart.tax).toBe(0);
    expect(cart.finalTotal).toBe(0);
    expect(cart.freeShippingProgress).toBe(0);
    expect(cart.amountNeededForFreeShipping).toBe(FREE_SHIPPING_THRESHOLD);
  });

  it("calculates the correct tax amount and final total including shipping and tax", () => {
    // 2 x $10 item = $20 subtotal
    const item: CartItem = {
      productId: 4,
      name: "Heirloom Sourdough Loaf",
      price: 10.0,
      image: "/shop2.jpg",
      category: "Bakery",
      qty: 2,
    };

    const cart = buildCart([item]);

    const expectedSubtotal = 20.0;
    const expectedShipping = STANDARD_SHIPPING_FEE; // 5.00
    const expectedTax = Math.round(expectedSubtotal * TAX_RATE * 100) / 100; // 1.60
    const expectedFinalTotal =
      expectedSubtotal + expectedShipping + expectedTax; // 26.60

    expect(cart.subtotal).toBe(expectedSubtotal);
    expect(cart.shipping).toBe(expectedShipping);
    expect(cart.tax).toBe(expectedTax);
    expect(cart.finalTotal).toBe(expectedFinalTotal);
  });
});
