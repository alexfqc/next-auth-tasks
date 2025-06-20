"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { registerUser } from "../actions/register";
import {
  type RegisterInput,
  registerSchema,
} from "../../../lib/schemas/registerSchema";

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
      className="flex flex-col gap-4 max-w-md mx-auto p-4"
      onSubmit={() => console.log("Form submitted")}
    >
      <div>
        <label htmlFor="name" className="block mb-1 text-gray-700">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          className="w-full p-2 border-2 border-gray-500 rounded text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 text-gray-700">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          className="w-full p-2 border-2 border-gray-500 rounded text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 text-gray-700">
          Password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          className="w-full p-2 border-2 border-gray-500 rounded text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1 text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
          className="w-full p-2 border-2 border-gray-500 rounded text-gray-900"
        />
      </div>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`bg-blue-600 text-white px-4 py-2 rounded transition
          ${
            isButtonDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }
  `}
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
