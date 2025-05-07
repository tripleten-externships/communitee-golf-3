import React from "react";
import { ChatStream } from "./ChatStream";
import { ChatHeader } from "./ChatHeader";
import avatar from "../assets/avatar.jpg";

//TODO: replace avatar and client name with real component
export const ChatInterFace: React.FC = () => {
  return (
    <>
      <ChatHeader name="Mary Jane" avatar={avatar} onBack={() => {}} />
      <ChatStream />
    </>
  );
};
