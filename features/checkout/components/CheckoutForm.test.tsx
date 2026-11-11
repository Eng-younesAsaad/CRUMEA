import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutForm } from "./CheckoutForm";
import { type CheckoutFormData } from "../checkout.schema";

describe("CheckoutForm", () => {
  it("displays accessible validation error alerts when submitted with required fields left empty", async () => {
    const user = userEvent.setup();
    const handleSubmitSuccess = vi.fn();

    render(
      <CheckoutForm onSubmitSuccess={handleSubmitSuccess} subtotal={35.0} />
    );

    const submitButton = screen.getByRole("button", {
      name: /Confirm & Place Bakery Order/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts.length).toBeGreaterThanOrEqual(4);
    });

    expect(handleSubmitSuccess).not.toHaveBeenCalled();
  });

  it("calls the success callback with validated form data when all fields are filled correctly", async () => {
    const user = userEvent.setup();
    const handleSubmitSuccess = vi.fn();

    render(
      <CheckoutForm onSubmitSuccess={handleSubmitSuccess} subtotal={60.0} />
    );

    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const phoneInput = screen.getByLabelText(/Phone Number/i);
    const addressInput = screen.getByLabelText(/Street Address/i);
    const cityInput = screen.getByLabelText(/^City/i);
    const postalCodeInput = screen.getByLabelText(/Postal Code/i);

    await user.type(fullNameInput, "Eleanor Beauchamp");
    await user.type(emailInput, "eleanor@example.com");
    await user.type(phoneInput, "+33 1 42 68 55 00");
    await user.type(addressInput, "42 Rue de Saint-Honoré");
    await user.type(cityInput, "Paris");
    await user.type(postalCodeInput, "75001");

    const submitButton = screen.getByRole("button", {
      name: /Confirm & Place Bakery Order/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSubmitSuccess).toHaveBeenCalledTimes(1);
    });

    const submittedCalls = handleSubmitSuccess.mock.calls;
    const firstCall = submittedCalls[0];
    expect(firstCall).toBeDefined();
    if (firstCall) {
      const submittedData: CheckoutFormData = firstCall[0];
      expect(submittedData.fullName).toBe("Eleanor Beauchamp");
      expect(submittedData.email).toBe("eleanor@example.com");
      expect(submittedData.city).toBe("Paris");
    }
  });
});
