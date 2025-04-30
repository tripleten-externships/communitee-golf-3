import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./type";
import { setToken,getToken} from "../../api/token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInError, setLogInError] = useState(false); // Managing login error state here
const [token,setCurrentToken]=useState(getToken);


  const login =  () => {
    try{  if (token) {
        setLogInError(false);
        setToken(token); // Store token in localStorage
        setCurrentToken(token); // Update state with the current token
        setIsLoggedIn(true); // Set the login state to true
      } else {
        throw new Error("Login failed: No token received");
      }}
      catch (error) {
        console.error(error);  // Log the error
        setLogInError(true);  // Set error state to indicate a login failure
      }
  
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLogInError(false); // Reset error on logout
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    logInError,
    setLogInError, setCurrentToken,setIsLoggedIn,token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};