"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { registerUser } from "../actions/register";
import {
  type RegisterInput,
  registerSchema,
} from "../../../lib/schemas/registerSchema";
import { UserPlus } from "lucide-react";
import FormInput from "../_components/FormInput";

type RegisterState = {
  error?: string;
  success?: boolean;
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState<
    RegisterState,
    FormData
  >(registerUser, {});

  const { register, watch, setValue } = useForm<RegisterInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("register-form", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (state?.success) {
      localStorage.removeItem("register-form");
    } else if (state?.error) {
      const saved = localStorage.getItem("register-form");
      if (saved) {
        const values = JSON.parse(saved) as Partial<RegisterInput>;
        setValue("name", values?.name || "");
        setValue("email", values?.email || "");
        setValue("password", values?.password || "");
        setValue("confirmPassword", values?.confirmPassword || "");
      }
    }
  }, [state, setValue]);

  const isButtonDisabled =
    registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    }).success === false;

  return (
    <form
      action={formAction}
      method="POST"
      className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      onSubmit={() => console.log("Form submitted")}
    >
      <div className="flex items-center justify-center mb-6">
        <UserPlus className="w-10 h-10 text-orange-500" />
        <h1 className="text-3xl font-bold text-orange-500 text-center ml-4">
          Register
        </h1>
      </div>
      <FormInput id="name" {...register("name")} label="Name" />
      <FormInput id="email" {...register("email")} label="Email" />
      <FormInput
        id="password"
        {...register("password")}
        label="Password"
        type="password"
      />
      <FormInput
        id="confirmPassword"
        {...register("confirmPassword")}
        label="Confirm Password"
        type="password"
      />

      {state?.error ? (
        <p className="text-red-600 text-sm">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`w-full py-3 font-semibold rounded-lg transition-colors text-white ${
          isButtonDisabled
            ? "bg-orange-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        }`}
      >
        {isPending ? (
          <span
            data-testid="spinner"
            className="ml-2 spinner-border animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          ></span>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
}
