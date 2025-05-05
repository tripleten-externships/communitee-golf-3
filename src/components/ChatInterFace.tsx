import React from "react";
import { ChatStream } from "./ChatStream";
import { ChatHeader } from "./ChatHeader";

export const ChatInterFace: React.FC = () => {
  return (
    <>
      <ChatHeader />
      <ChatStream />
    </>
  );
};
