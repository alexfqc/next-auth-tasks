import React from "react";

type FormInputProps = {
  label: string;
  id: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  label,
  id,
  type = "text",
  ...rest
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 transition-colors duration-200"
        {...rest}
      />
    </div>
  );
}
