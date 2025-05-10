import React, { useEffect } from "react";
import { ChatBubble } from "./ChatBubble";
import { Message } from "./ChatInterFace";

const user = "user-123";

//Only display time at a gap of at least 30 mins
function displayTime(current: Message, prev?: Message) {
  if (!prev) return true;
  const defaultGap = 30 * 60 * 1000;

  const timeGap =
    new Date(current.sentAt).getTime() - new Date(prev.sentAt).getTime();

  return timeGap > defaultGap;
}

//Calculate the displayed time in "Just Now", "?min", "?h", ?d"
function getRelativeTime(sentAt: string) {
  const now = new Date();
  const timeSent = new Date(sentAt);

  const minDiff = Math.floor((now.getTime() - timeSent.getTime()) / 60000);
  const hours = Math.floor(minDiff / 60);
  const days = Math.floor(hours / 24);

  if (minDiff < 1) return "Just now";
  if (minDiff < 60) return `${minDiff}min`;
  if (minDiff >= 60 && minDiff < 24 * 60) return `${hours}h`;

  return `${days}d`;
}

//ChatStream Compenent
export const ChatStream: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const newMsgRef = React.useRef<HTMLDivElement | null>(null);

  //Auto scroll to new messages when send or receive them
  useEffect(() => {
    newMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="m-1 flex flex-col gap-1">
      {messages.map((msg, i) => {
        const prev = messages[i - 1];
        const isDisplayed = displayTime(msg, prev);
        const timeDisplayed = getRelativeTime(msg.sentAt);
        const isMine = msg.senderId === user;

        return (
          <React.Fragment key={msg.id}>
            {isDisplayed && (
              <span
                className={`text-gray-400 text-[10px] leading-[130%] tracking-[0] align-middle 
            ${isMine ? "self-end" : " self-start"}`}
              >
                {timeDisplayed}
              </span>
            )}
            <ChatBubble message={msg.content} isMine={isMine} />
          </React.Fragment>
        );
      })}
      <div ref={newMsgRef}></div>
    </div>
  );
};
