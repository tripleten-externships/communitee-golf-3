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

  const onLogin =  (token: string | null) => {
    try{  if (token) {
        setLogInError(false);
        setToken(token); // Store token in localStorage
        setCurrentToken(token); // Update state with the current token
        setIsLoggedIn(true); // Set the login state to true
        // TODO: redirect to message list 
        navigate("/messages");  
      } else {
        removeToken();
        throw new Error("Login failed: No token received");
      }}
      catch (error) {
        removeToken();
        console.error(error);  // Log the error
        setLogInError(true);  // Set error state to indicate a login failure
      }
  
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setLogInError(false); // Reset error on logout
    navigate("/login")
  };

  const value: AuthContextType = {
    isLoggedIn,
    onLogin,
    logout,
    logInError,
    setLogInError, setCurrentToken,setIsLoggedIn,token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};