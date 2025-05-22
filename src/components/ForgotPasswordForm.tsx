import React, { useEffect } from "react";
import { validateForm } from "../hooks/validateLoginForm";
import { useAuth } from "../hooks/useAuth";
import { usernameObj } from "./auth/type";

interface ForgetPasswordFormProps {
  handleSendResetLink: ({ username }: usernameObj) => void;
  resetPasswordError: string | null;
}

export const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({
  handleSendResetLink,
  resetPasswordError,
}) => {
  const { isSubmitted, isLoading, navGoBack } = useAuth();
  const { values, handleValueChange, errors, isValid, resetForm } =
    validateForm(["username"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendResetLink({ username: values.username });
    // navGoBack();
  };

  useEffect(() => {
    if (!isSubmitted) {
      resetForm();
    }
  }, [isSubmitted]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5   flex flex-col w-full">
      <div>
        <label className="sr-only" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleValueChange}
          className={`w-full rounded-xl border border-solid p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.username || resetPasswordError
              ? "border-red-500"
              : "border-gray-400"
          }`}
          required
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
        {resetPasswordError && !errors.username && (
          <p className="text-red-500 text-sm">{resetPasswordError}</p>
        )}
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm font-poppins font-semibold text-base leading-6 tracking-normal text-white cursor-pointer
           ${
             !isValid
               ? "bg-gray-400 hover:bg-gray-500 focus:ring-none"
               : "bg-custom-red hover:bg-red-600 focus:ring-blue-500"
           }`}
      >
        {isLoading ? "Loading..." : "Send Reset Link"}
      </button>
      <button
        type="button"
        onClick={navGoBack}
        className="font-poppins font-medium text-sm leading-6 tracking-normal text-black  block text-center  p-0 hover:text-red-600 "
      >
        Go Back
      </button>
    </form>
  );
};
