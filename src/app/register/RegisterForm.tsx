"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { registerUser } from "../actions/register";
import {
  type RegisterInput,
  registerSchema,
} from "../../../lib/schemas/registerSchema";
import { UserPlus } from "lucide-react";
import FormInput from "../_components/FormInput";
import SubmitButton from "../_components/SubmitButton";

type RegisterState =
  | {
      status: "success";
      redirectTo: string;
    }
  | {
      status: "error";
      message: string;
    }
  | {
      status: "idle";
    };

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    RegisterState,
    FormData
  >(registerUser, { status: "idle" });

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
    if (state?.status === "success") {
      router.push(state.redirectTo);
      localStorage.removeItem("register-form");
    } else if (state?.status === "error") {
      const saved = localStorage.getItem("register-form");
      if (saved) {
        const values = JSON.parse(saved) as Partial<RegisterInput>;
        setValue("name", values?.name || "");
        setValue("email", values?.email || "");
        setValue("password", values?.password || "");
        setValue("confirmPassword", values?.confirmPassword || "");
      }
    }
  }, [state, setValue, router]);

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
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
    >
      <div className="flex items-center justify-center gap-2">
        <UserPlus className="w-10 h-10 text-orange-500" />
        <h1 className="text-3xl font-extrabold text-orange-500">Register</h1>
      </div>
      <FormInput id="name" {...register("name")} label="Name" required />
      <FormInput id="email" {...register("email")} label="Email" required />
      <FormInput
        id="password"
        {...register("password")}
        label="Password"
        type="password"
        required
      />
      <FormInput
        id="confirm-password"
        {...register("confirmPassword")}
        label="Confirm Password"
        type="password"
        required
      />

      {state?.status === "error" ? (
        <p className="text-red-600 text-sm">{state.message}</p>
      ) : null}

      <SubmitButton
        text="Register"
        loading={isPending}
        disabled={isButtonDisabled}
      />
    </form>
  );
}
