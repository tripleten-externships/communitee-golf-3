import React, { useState } from "react";
import { ForgetPasswordForm } from "./ForgotPasswordForm.tsx";
import { resetPassword } from "../api/passwordReset.ts";
import { useAuth } from "../hooks/useAuth.ts";
import { usernameObj } from "./auth/type.ts";

interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const { setIsSubmitted, setIsLoading, navLogin } = useAuth();
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );

  const handleSendResetLink = async ({ username }: usernameObj) => {
    setIsLoading(true);
    setIsSubmitted(true);
    try {
      await resetPassword({ username });
      //TODO: show popup
      navLogin();
    } catch (error: any) {
      if (error.message) {
        setResetPasswordError(error.message);
        console.log("faa");
      }
      throw error;
    } finally {
      setIsLoading(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className=" bg-white w-full flex flex-col items-center justify-center rounded-lg pt-[117px] pb-[195px] pl-12 pr-12">
        <ForgetPasswordForm
          handleSendResetLink={handleSendResetLink}
          resetPasswordError={resetPasswordError}
        />
      </div>
    </div>
  );
};
