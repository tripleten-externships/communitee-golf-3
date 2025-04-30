import React ,  { useState ,useEffect} from "react";
import Header from "./Header/Header";
import Login from "./Login";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "../hooks/useAuth";

export const AppContent: React.FC = () => {
  const { isLoggedIn, login, logout, } = useAuth();

  const handleExitClick = () => {
    window.close();
  };


  //This needs to be in chat component
/*
  interface ChatMessage {
    sender: string;
    content: string | number;  // This allows both strings and numbers
}

  const handleNewMessage = (message: ChatMessage) => {
    //When a new message arrives and popup is closed
    if (document.hidden) {
      //Send message to background script
      chrome.runtime.sendMessage({
        type: 'NEW_MESSAGE',
        payload: {
          sender: message.sender,
          content: message.content
        }
      });
    }
  }
    */
  
  return (
    <div className="w-96 h-96 bg-white p-4">
        <Header
        handleExitClick={handleExitClick}
        handleSignoutClick={ logout }
        isLoggedIn={isLoggedIn}
      />
     {!isLoggedIn ? (
        <Login onLogin={login}/>
      ) : (
        <div>Chat interface will go here</div>
      )}
    </div>
  );
};
export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};