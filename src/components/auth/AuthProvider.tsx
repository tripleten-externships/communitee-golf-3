import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { AuthContextType, TokenData } from "./type";
import { setToken, removeToken } from "../../api/token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInError, setLogInError] = useState(false); // Managing login error state here
  const [token, setCurrentToken] = useState<TokenData | null>(null);
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logInErrorMessage, setLogInErrorMessage] = useState("");

  const onLogin = (retrievedToken: string | null) => {
    try {
      if (retrievedToken) {
        setLogInError(false);
        setLogInErrorMessage("");
        const tokenData: TokenData = {
          token: retrievedToken, // The retrieved token string
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // set Expiration time (24 hours from now)
        };
        // Set token in state
        setToken(retrievedToken);
        setCurrentToken(tokenData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setCurrentToken(null); // Clear token from state
        removeToken();
      }
    } catch (error) {
      console.error();
    } finally {
      // Reset isSubmitted to false after the login attempt (whether successful or failed)
      setIsLoading(false);
      setIsSubmitted(false);
    }
  };

  const logout = () => {
    navigate("/");
    removeToken();
    setIsLoggedIn(false);
    setLogInError(false); // Reset error on logout
    sessionStorage.removeItem("selectedLocation");
  };

  const handleLogoClick = () => {
    navigate("/login");
    setLogInError(false);
    setLogInErrorMessage("");
  };

  const handleForgotPassword = () => {
    navigate("/forget-password");
  };

  const navGoBack = () => {
    navigate(-1);
  };
  const value: AuthContextType = {
    isLoggedIn,
    navGoBack,
    onLogin,
    logout,
    logInError,
    handleForgotPassword,
    setLogInError,
    setCurrentToken,
    setIsLoggedIn,
    token,
    isSubmitted,
    setIsSubmitted,
    isLoading,
    setIsLoading,
    logInErrorMessage,
    setLogInErrorMessage,
    handleLogoClick,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
