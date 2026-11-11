import { test, expect } from "@playwright/test";

test.describe("Artisan Bakery Checkout", () => {
  test("completes checkout flow from adding a bakery item to receiving an order confirmation", async ({
    page,
  }) => {
    // 1. Visit the bakery shop catalog
    await page.goto("/shop");

    // 2. Add the first handcrafted treat to the shopping cart
    const addToCartButton = page
      .getByRole("button", { name: /Add to (Cart|Bag)/i })
      .first();
    await addToCartButton.click();

    // 3. Open checkout from the cart drawer
    const proceedToCheckoutButton = page.getByRole("button", {
      name: /Proceed to Checkout/i,
    });
    await expect(proceedToCheckoutButton).toBeVisible();
    await proceedToCheckoutButton.click();

    // 4. Verify navigation to the checkout route
    await expect(page).toHaveURL(/.*checkout/);

    // 5. Fill out customer and delivery address fields using accessible labels
    await page.getByLabel(/Full Name/i).fill("Eleanor Beauchamp");
    await page.getByLabel(/Email Address/i).fill("eleanor@example.com");
    await page.getByLabel(/Phone Number/i).fill("+33 1 42 68 55 00");
    await page
      .getByLabel(/Street Address/i)
      .fill("42 Rue de Saint-Honoré, Apt 3B");
    await page.getByLabel(/^City/i).fill("Paris");
    await page.getByLabel(/Postal Code/i).fill("75001");

    // 6. Confirm and place the bakery order
    const confirmOrderButton = page.getByRole("button", {
      name: /Confirm & Place Bakery Order/i,
    });
    await confirmOrderButton.click();

    // 7. Verify order confirmation view with French gratitude heading
    const confirmationHeading = page.getByRole("heading", {
      name: /Merci Beaucoup!/i,
    });
    await expect(confirmationHeading).toBeVisible();
  });
});
