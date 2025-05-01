import React from "react";
import { ChatBubble } from "./ChatBubble";

type Message = {
  id: string;
  senderId: string;
  text: string;
  sentAt: string;
};

const messages = [
  {
    id: "1",
    senderId: "user_2",
    text: "Hi, question",
    sentAt: "2025-04-30T09:00:00Z",
  },
  {
    id: "2",
    senderId: "user_2",
    text: "I have a group of 3 girls, will we be able to golf on our own?",
    sentAt: "2025-04-30T09:02:00Z",
  },
  {
    id: "3",
    senderId: "user_1",
    text: "Absolutely! I can send you ahead of the next group.",
    sentAt: "2025-04-30T09:30:00Z",
  },
  {
    id: "4",
    senderId: "user_2",
    text: "Perfect, thank you!",
    sentAt: "2025-04-30T10:10:00Z",
  },
  {
    id: "5",
    senderId: "user_1",
    text: "You're welcome 😊",
    sentAt: "2025-04-30T10:11:00Z",
  },
  {
    id: "6",
    senderId: "user_1",
    text: "Let me know if you need anything else.",
    sentAt: "2025-05-01T06:45:00Z",
  },
];

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

  if (minDiff < 60) {
    return `${minDiff}min`;
  } else {
    const hours = Math.floor(minDiff / 60);
    return `${hours}h`;
  }
}

export const ChatStream: React.FC = () => {
  return (
    <div className="m-1 flex flex-col gap-1 overflow-y-auto">
      {messages.map((msg, i) => {
        const prev = messages[i - 1];
        const isDisplayed = displayTime(msg, prev);
        const timeDisplayed = getRelativeTime(msg.sentAt);
        const isMine = msg.senderId === user;

        return (
          <>
            {isDisplayed && (
              <span
                className={`text-gray-400 text-[10px] leading-[130%] tracking-[0] align-middle 
            ${isMine ? "self-end" : " self-start"}`}
              >
                {timeDisplayed}
              </span>
            )}
            <ChatBubble
              message={msg.text}
              isMine={isMine}
              sentAt={msg.sentAt}
            />
          </>
        );
      })}
    </div>
  );
};
