"use server";

import { redirect } from "next/navigation";
import { RegisterInput } from "../../../lib/schemas/registerSchema";

export async function registerUser(_: unknown, formData: FormData) {
  const payload: RegisterInput = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  };

  let shouldRedirect = false;

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
      shouldRedirect = true;
    } else {
      return {
        error:
          result.message ||
          "An error occurred during registration. Please try again later",
      };
    }
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return {
      error:
        "An unexpected error occurred during registration. Please try again later",
    };
  }

  if (shouldRedirect) {
    // this is gonna throw an exception digest = 'NEXT_REDIRECT...' inside catch block
    redirect("/login");
  }
}
