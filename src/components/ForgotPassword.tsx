import React, { useState } from "react";
import { ForgetPasswordForm } from "./ForgotPasswordForm.tsx";
import { resetPassword } from "../api/passwordReset.ts";
import { useAuth } from "../hooks/useAuth.ts";
import { usernameObj } from "./auth/type.ts";

interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const { setIsSubmitted, setIsLoading } = useAuth();
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );

  const handleSendResetLink = async ({ username }: usernameObj) => {
    setIsLoading(true);
    setIsSubmitted(true);
    try {
      await resetPassword({ username });
      if (typeof chrome !== "undefined" && chrome.runtime) {
        console.log("chrome.runtime is available");
        chrome.runtime.sendMessage({
          type: "PASSWORD_CHANGE_REQUEST",
          payload: {
            username,
          },
        });
      } else {
        console.log("chrome.runtime is not available, showing alert");
        alert(
          `A verification link has been sent to your email. Please check your inbox.`
        );
      }
    } catch (error: any) {
      if (error.message) {
        setResetPasswordError(error.message);
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
