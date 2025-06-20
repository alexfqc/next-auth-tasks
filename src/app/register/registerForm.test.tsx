import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "./registerFom";
import { registerSchema } from "../../../lib/schemas/registerSchema";
import { describe, it, expect } from "vitest";

describe("RegisterForm", () => {
  it("should render all inputs fields and submit button", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("should disable submit button when form is invalid", async () => {
    render(<RegisterForm />);

    const button = screen.getByRole("button", { name: /register/i });

    expect(button).toBeDisabled();
  });

  it("should disable submit button when form is invalid", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");

    expect(button).toBeDisabled();
  });

  it("should disable submit button when form is invalid", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");
    await userEvent.type(emailInput, "enzo@jonh.com");

    expect(button).toBeDisabled();
  });

  it("should disable submit button when form is invalid", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");
    await userEvent.type(emailInput, "enzo@jonh.com");
    await userEvent.type(passwordInput, "S&nha123");

    expect(button).toBeDisabled();
  });

  it("should allow user toi type in input fields", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await userEvent.type(nameInput, "Enzo Jonh");
    await userEvent.type(emailInput, "enzo@jonh.com");
    await userEvent.type(passwordInput, "S&nha123");
    await userEvent.type(confirmPasswordInput, "S&nha123");

    expect(nameInput).toHaveValue("Enzo Jonh");
    expect(emailInput).toHaveValue("enzo@jonh.com");
    expect(passwordInput).toHaveValue("S&nha123");
    expect(confirmPasswordInput).toHaveValue("S&nha123");
  });

  it("should enable submit button when form is valid", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");
    await userEvent.type(emailInput, "enzo@jonh.com");
    await userEvent.type(passwordInput, "S&nha123");
    await userEvent.type(confirmPasswordInput, "S&nha123");

    expect(button).toBeEnabled();
  });
});
