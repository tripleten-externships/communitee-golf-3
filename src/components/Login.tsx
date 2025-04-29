import React from "react";
import { LoginForm } from "./LoginForm"; 

interface LoginProps {
    onLogin: () => void;
  }

const Login: React.FC <LoginProps> = ({ onLogin }) => {
    const handleLogin = async (username: string, password: string) => {
        // API call logic for login
        try {
          // Simulate an API call
          console.log("API call for login with:", username, password);
          
          // Assuming API call is successful
          // const response = await authService.login(username, password);
          // if (response.success) {
            onLogin();
          // } else {
          //   handleError(response.error);
          // }
    
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