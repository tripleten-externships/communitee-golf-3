import React from "react";
import { LoginForm } from "./LoginForm"; 
import {login} from "../api/auth.ts";
import { useAuth } from "../hooks/useAuth.ts";

interface LoginProps {
    // Any specific props for Login component if needed (currently none)
  }

const Login : React.FC<LoginProps> =()=> {
    const {onLogin,setIsSubmitted,setIsLoading}=useAuth();
    const handleLogin = async (username: string, password: string) => {
      setIsLoading(true);  // Start loading before making the API call
    setIsSubmitted(true); // Set submitted state to true to prevent multiple submissions
try {
            const token = await login({ username, password }); 
            onLogin(token);
        } catch (error) {
          console.error("Login failed");
        }
        finally {
          setIsLoading(false);  
          setIsSubmitted(false);  // Reset submission state after completion (whether success or error)
        }
      };
      
  return (
    <div className="flex items-center justify-center ">
      <div className=" bg-white w-full flex flex-col items-center justify-center rounded-lg pt-[117px] pb-[195px]">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>      
  );
};

export default Login;