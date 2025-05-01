import React from "react";
import { ChatBubble } from "./ChatBubble";

export const ChatStream: React.FC = () => {
  return (
    <div className="m-1 flex flex-col gap-1">
      <ChatBubble
        isMine={false}
        message="Hey!"
        sentAt={new Date(Date.now() - 55 * 60 * 1000).toISOString()}
      />
      <ChatBubble
        isMine={true}
        message="How are you!"
        sentAt={new Date(Date.now() - 30 * 60 * 1000).toISOString()}
      />
      <ChatBubble
        isMine={false}
        message="How are you! Nice to meet you all!"
        sentAt={new Date(Date.now() - 20 * 60 * 1000).toISOString()}
      />
    </div>
  );
};
