import React from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { token } from "../services/constant";
import { getSingleMsgStream, updateSingleMsgStream } from "../services/api";

type Message = {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
};

//TODO: replace with real data
const user = "user-123";
const client = "1";

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
export const ChatStream: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    getSingleMsgStream(client, token)
      .then((res) => {
        setMessages(res.messages);
      })
      .catch(() => console.error);
  }, []);

  //handle user sending message
  function handleSendMessage(message: string) {
    const newMessage = {
      id: `${Date.now()}`,
      content: message,
      sentAt: new Date().toISOString(),
      senderId: "user-123",
    };

    setMessages([...messages, newMessage]);

    updateSingleMsgStream(newMessage.content, client, token);
  }

  return (
    <div className="m-1 flex flex-col gap-1 overflow-y-auto">
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
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};
