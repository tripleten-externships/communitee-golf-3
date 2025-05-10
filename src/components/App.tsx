import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header/Header";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { getToken } from "../api/token.ts";

export const AppContent: React.FC = () => {
  const { isLoggedIn, logout, setIsLoggedIn, setCurrentToken } = useAuth();

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
  const MessageListPlaceholder = () => {
    return <div>You are logged in and viewing the message list!</div>;
  };

  const ForgetPasswordPlaceholder = () => {
    return <div>forget password</div>;
  };

  //runs only once on component mount
  useEffect(() => {
    // Get token asynchronously and check if it’s valid
    getToken((retrievedToken) => {
      if (retrievedToken) {
        setCurrentToken(retrievedToken); // Update state with the token if valid
        setIsLoggedIn(true); // User is logged in if token exists
        console.log("Token retrieved:", retrievedToken);
      } else {
        setIsLoggedIn(false); // No token found, user is logged out
        setCurrentToken(null); // Clear token in state
        console.log("No valid token found.");
      }
    });
  }, []);

  useEffect(() => {
    console.log("logged in?", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div className="w-[352px] h-[595px] p-2 ml-1 mr-1 box-border bg-white border-[rgba(222,222,222,0.3)] rounded-xl shadow-md shadow-red-100 content-between">
      <Header
        handleExitClick={handleExitClick}
        handleSignoutClick={logout}
        isLoggedIn={isLoggedIn}
      />

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <MessageListPlaceholder /> : <Login />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <MessageListPlaceholder /> : <Login />}
        />

        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/forget-password"
          element={<ForgetPasswordPlaceholder />}
        ></Route>
        {/* TODO: route to message list of different locations and route to chat bubble */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessageListPlaceholder />
            </ProtectedRoute>
          }
        />

        {/* 
    <Route path="/messages" element={
          <ProtectedRoute>
            <MessageList />  
          </ProtectedRoute>
        } />
       
        <Route path="/messages/:locationId" element={
          <ProtectedRoute>
            <MessageListByLocation />  
          </ProtectedRoute>
        } />
    
        <Route path="/" element={<ChatBubble />} /> */}
      </Routes>
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
