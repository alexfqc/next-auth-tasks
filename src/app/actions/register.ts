"use server";

import { redirect } from "next/navigation";
import { RegisterInput } from "../../../lib/schemas/registerSchema";

type RedirectError = Error & { digest?: string };

function isRedirectError(error: unknown): error is RedirectError {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string"
  );
}

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
      // this is gonna throw an exception digest = 'NEXT_REDIRECT...'
      redirect("/login");
    } else {
      return {
        error:
          result.message ||
          "An error occurred during registration. Please try again later",
      };
    }
  } catch (err: unknown) {
    // ignores if it is Next internal redirect error
    if (
      isRedirectError(err) &&
      (err?.digest || "").startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }

    console.error("Registration error:", err);
    return {
      error:
        "An unexpected error occurred during registration. Please try again later",
    };
  }
}
