import React from "react";
import Header from "./Header/Header";
import { LoginForm } from "./LoginForm";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleExitClick = () => {
    window.close();
  };

  const handleSignoutClick = () => {
    setIsLoggedIn(false);
  };

  //This needs to be in chat component

  return (
    <div className="w-[336px] h-[595px] bg-white border-black rounded-xl shadow-xl content-between">
      <Header
        handleExitClick={handleExitClick}
        handleSignoutClick={handleSignoutClick}
        isLoggedIn={isLoggedIn}
      />
      <div className="w-[336px] h-[336px] bg-white p-4">
        {!isLoggedIn ? (
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
          
        ) : (
          <div>Chat interface will go here</div>
        )}
      </div>
    </div>
  );
};
