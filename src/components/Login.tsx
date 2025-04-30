import React from "react";
import { LoginForm } from "./LoginForm"; 
import {login} from "../api/auth.ts";


interface LoginProps {
    onLogin: (token:string) => void;
  }

const Login: React.FC <LoginProps> = ({ onLogin }) => {
    const handleLogin = async (username: string, password: string) => {
        try {
            const token = await login({ username, password }); 
            onLogin(token);
    
        } catch (error) {
          console.error("Login failed:", error);

        }
      };
    
  return (
    <div className="flex items-center justify-center ">
      <div className=" bg-white w-full md:w-96 md:p-8 flex flex-col items-center justify-center rounded-lg ">
        {/* TODO: add Header */}
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>      
  );
};

export default Login;