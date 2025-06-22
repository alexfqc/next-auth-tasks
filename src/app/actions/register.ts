"use server";

import { RegisterInput } from "../../../lib/schemas/registerSchema";

export async function registerUser(_: unknown, formData: FormData) {
  const payload: RegisterInput = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  };

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        status: "success",
        redirectTo: "/login",
      } as const;
    }

    return {
      status: "error",
      message:
        result.message ||
        "An error occurred during registration. Please try again later",
    } as const;
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return {
      status: "error",
      message:
        "An unexpected error occurred during registration. Please try again later",
    } as const;
  }
}
