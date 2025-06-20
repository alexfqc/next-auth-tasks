import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name should have at least 2 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Email is not valid"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password must contain letters")
      .regex(/[0-9]/, "Password must contain numbers")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must be the same",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
