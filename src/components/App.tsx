import React ,  { useState ,useEffect} from "react";
import Login from "./Login";
import { getToken,setToken} from "../api/token";
import { login } from "../api/auth";

export const App: React.FC = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [token, setCurrentToken] = useState(getToken);
const [logInError, setLogInError] = useState(false);


useEffect(() => {
  
  if (token) {
    setIsLoggedIn(true);
  }
}, []);

const onLogin =  (token: string) => {
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
    
  return (
    <div className="mx-auto p-5 bg-white min-w-[320px]">
      {!isLoggedIn ? (
        <Login onLogin={onLogin}/>
      ) : (
        <div>Chat interface will go here</div>
      )}

    </div>
  );
};