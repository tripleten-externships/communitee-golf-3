import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./type";
import { setToken,getToken,removeToken} from "../../api/token";


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInError, setLogInError] = useState(false); // Managing login error state here
const [token,setCurrentToken]=useState(getToken);
const navigate = useNavigate();
const [isSubmitted,setIsSubmitted]=useState(false);
const [isLoading, setIsLoading] = useState(false);
const [logInErrorMessage,setLogInErrorMessage]=useState("");

  const onLogin =  (token: string | null) => {
    try{  if (token) {
        setLogInError(false);
        setLogInErrorMessage("");
        setToken(token); // Store token in localStorage
        setCurrentToken(token); // Update state with the current token
        setIsLoggedIn(true); // Set the login state to true
        navigate("/messages");  
      } else {
        removeToken();
        throw new Error("Login failed: No token received");
      }}
      catch (error) {
        removeToken();
        console.error();  // Log the error
      } finally {
        // Reset isSubmitted to false after the login attempt (whether successful or failed)
        setIsLoading(false);
        setIsSubmitted(false);
      }
  
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setLogInError(false); // Reset error on logout
    navigate("/")
  };


  const handleForgotPassword=()=>{
    navigate("/forget-password")
  }
  const value: AuthContextType = {
    isLoggedIn,
    onLogin,
    logout,
    logInError,handleForgotPassword,
    setLogInError, setCurrentToken,setIsLoggedIn,token,isSubmitted,setIsSubmitted,isLoading, setIsLoading,logInErrorMessage,setLogInErrorMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};