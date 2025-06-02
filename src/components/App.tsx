import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header/Header";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { getToken } from "../api/token.ts";
import { ForgotPassword } from "./ForgotPassword.tsx";
import { MessagesPage } from "./MessagesPage.tsx";
import { ChatInterFace } from "./ChatInterFace.tsx";

export const AppContent: React.FC = () => {
  const { isLoggedIn, logout, setIsLoggedIn, setCurrentToken } =
    useAuth();
  const handleExitClick = () => {
    window.close();
  };

  //runs only once on component mount
  useEffect(() => {
    // Get token asynchronously and check if it’s valid
    getToken((retrievedToken) => {
      if (retrievedToken) {
        setCurrentToken(retrievedToken); // Update state with the token if valid
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false); // No token found, user is logged out
        setCurrentToken(null); // Clear token in state
      }
    });
  }, []);

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
          element={
            isLoggedIn ? (
              <MessagesPage />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <MessagesPage />
            ) : (
              <Login />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/forget-password"
          element={isLoggedIn ? <Navigate to="/" /> : <ForgotPassword />}
        ></Route>
        <Route
          path="/message-stream"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat-interface"
          element={
            <ProtectedRoute>
              <ChatInterFace />
            </ProtectedRoute>
          }
        />
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
