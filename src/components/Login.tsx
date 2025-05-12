import React from "react";
import { LoginForm } from "./LoginForm";
import { login } from "../api/auth.ts";
import { useAuth } from "../hooks/useAuth.ts";

interface LoginProps {
  // Any specific props for Login component if needed (currently none)
}

const Login: React.FC<LoginProps> = () => {
  const {
    onLogin,
    setIsSubmitted,
    setIsLoading,
    setLogInError,
    setLogInErrorMessage,
    setIsLoggedIn,
  } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true); // Start loading before making the API call
    setIsSubmitted(true); // Set submitted state to true to prevent multiple submissions
    try {
      const token = await login({ username, password });
      setIsLoggedIn(true);
      onLogin(token);
    } catch (error: any) {
      if (error.message === "Invalid credentials.") {
        setLogInError(true);
        setLogInErrorMessage("Invalid credentials");
      }
      if (error.message === "Username and password are required.") {
        setLogInError(true);
        setLogInErrorMessage("Username and password are required");
      }
    } finally {
      setIsLoading(false);
      setIsSubmitted(false); // Reset submission state after completion (whether success or error)
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className=" bg-white w-full flex flex-col items-center justify-center rounded-lg pt-[117px] pb-[195px] pl-12 pr-12">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
