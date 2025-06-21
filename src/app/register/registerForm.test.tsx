import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "./RegisterForm";
import { describe, it, expect } from "vitest";

describe("RegisterForm", () => {
  it("should render all inputs fields and submit button", () => {
    render(<RegisterForm />);

    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password")).toBeInTheDocument();

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

    const nameInput = screen.getByTestId("name");
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");

    expect(button).toBeDisabled();
  });

  it("should disable submit button when form is invalid", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByTestId("name");
    const emailInput = screen.getByTestId("email");
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");
    await userEvent.type(emailInput, "enzo@jonh.com");

    expect(button).toBeDisabled();
  });

  it("should disable submit button when form is invalid", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByTestId("name");
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");
    await userEvent.type(emailInput, "enzo@jonh.com");
    await userEvent.type(passwordInput, "S&nha123");

    expect(button).toBeDisabled();
  });

  it("should allow user toi type in input fields", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByTestId("name");
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");

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

    const nameInput = screen.getByTestId("name");
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(nameInput, "Enzo Jonh");
    await userEvent.type(emailInput, "enzo@jonh.com");
    await userEvent.type(passwordInput, "S&nha123");
    await userEvent.type(confirmPasswordInput, "S&nha123");

    expect(button).toBeEnabled();
  });
});
