import React from "react";

type SubmitButtonProps = {
  disabled: boolean;
  loading: boolean;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  disabled,
  loading,
  text = "Submit",
  ...rest
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-3 font-semibold rounded-lg transition-colors text-white ${
        disabled
          ? "bg-orange-300 cursor-not-allowed"
          : "bg-orange-500 hover:bg-orange-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
      }`}
      data-testid="submit-button"
      {...rest}
    >
      {loading ? (
        <span
          data-testid="spinner"
          className="ml-2 spinner-border animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        ></span>
      ) : (
        text
      )}
    </button>
  );
}
