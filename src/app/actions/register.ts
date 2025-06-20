"use server";

import { redirect } from "next/navigation";
import { RegisterInput } from "../../../lib/schemas/registerSchema";

export async function registerUser(_: unknown, formData: FormData) {
  const payload = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  } as RegisterInput;
  console.log(payload);

  const response = await fetch(`${process.env.BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (response.ok) {
    redirect("/login");
  } else {
    return {
      error: result.message || "An error occurred during registration",
    };
  }
}
