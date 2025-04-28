import React from "react";
import { LoginForm } from "./LoginForm";
import { Main } from "./Main";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <div className="w-96 h-96 bg-white p-4">
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        // <div>Chat interface will go here</div>
        //TODO: replace with real Main component
        <Main />
      )}
    </div>
  );
};
