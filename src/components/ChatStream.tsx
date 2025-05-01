import React from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { mockMsg } from "../services/mockMsg";

type Message = {
  //   id: string;
  senderId: string;
  text: string;
  sentAt: string;
};

const user = "user_1";

function displayTime(current: Message, prev?: Message) {
  if (!prev) return true;
  const defaultGap = 30 * 60 * 1000;

  const timeGap =
    new Date(current.sentAt).getTime() - new Date(prev.sentAt).getTime();

  return timeGap > defaultGap;
}

function getRelativeTime(sentAt: string) {
  const now = new Date();
  const timeSent = new Date(sentAt);

  const minDiff = Math.floor((now.getTime() - timeSent.getTime()) / 60000);

  if (minDiff < 1) return "Just now";
  if (minDiff < 60) return `${minDiff}min`;

  const hours = Math.floor(minDiff / 60);
  return `${hours}h`;
}

export const ChatStream: React.FC = () => {
  const [messages, setMessages] = React.useState(mockMsg);

  function handleSendMessage(message: string) {
    const newMessage = {
      text: message,
      sentAt: new Date().toISOString(),
      senderId: user,
    };

    setMessages([...messages, newMessage]);
  }

  return (
    <div className="m-1 flex flex-col gap-1 overflow-y-auto">
      {messages.map((msg, i) => {
        const prev = messages[i - 1];
        const isDisplayed = displayTime(msg, prev);
        const timeDisplayed = getRelativeTime(msg.sentAt);
        const isMine = msg.senderId === user;

        return (
          <React.Fragment key={i}>
            {isDisplayed && (
              <span
                className={`text-gray-400 text-[10px] leading-[130%] tracking-[0] align-middle 
            ${isMine ? "self-end" : " self-start"}`}
              >
                {timeDisplayed}
              </span>
            )}
            <ChatBubble message={msg.text} isMine={isMine} />
          </React.Fragment>
        );
      })}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};
