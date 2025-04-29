import React ,  { useState } from "react";
import Login from "./Login";

export const App: React.FC = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = () => {
  // Logic to set user as logged in after successful authentication, nav to message list
  setIsLoggedIn(true);
};

  return (
    <div className="mx-auto p-5 bg-white min-w-[320px]">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin}/>
      ) : (
        <div>Chat interface will go here</div>
      )}

    </div>
  );
};
