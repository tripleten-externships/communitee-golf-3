import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Login from "./Login";
// import ProtectedRoute from "./ProtectedRoute.tsx"

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
  
  return (
    <div className="w-[336px] flex-col  flex items-center justify-center  bg-white p-4 z-50 m-0">
        <Header
        handleExitClick={handleExitClick}
        handleSignoutClick={ logout }
        isLoggedIn={isLoggedIn}
      />
      <Login/>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {/* TODO: route to message list of different locations and route to chat bubble */}

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