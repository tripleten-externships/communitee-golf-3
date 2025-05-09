import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header/Header";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute.tsx"

export const AppContent: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

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
  
  return (
    <div className="w-[336px] h-[595px] bg-white border-[rgba(222,222,222,0.3)] rounded-xl shadow-xl shadow-red-100 content-between">
        <Header
        handleExitClick={handleExitClick}
        handleSignoutClick={ logout }
        isLoggedIn={isLoggedIn}
      />
    
        <Routes>

          <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<Navigate to="/" />} />

          {/* TODO: route to message list of different locations and route to chat bubble */}
          <Route path="/messages" element={
          <ProtectedRoute>
            <MessageListPlaceholder />
          </ProtectedRoute>
        } />
       
        
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