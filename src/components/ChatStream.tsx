import React from "react";
import { ChatBubble } from "./ChatBubble";

export const ChatStream: React.FC = () => {
  return (
    <div className="m-1 flex flex-col gap-1">
      <ChatBubble isMine={false} message="Hey!" />
      <ChatBubble isMine={true} message="How are you!" />
    </div>
  );
};
