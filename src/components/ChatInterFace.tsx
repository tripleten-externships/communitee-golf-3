import React from "react";
import { ChatStream } from "./ChatStream";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import avatar from "../assets/avatar.jpg";
import { token } from "../services/constant";
import { getSingleMsgStream, updateSingleMsgStream } from "../services/api";

export type Message = {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
};

//TODO: replace with real API
const user = "user-123";
const client = "1";

//TODO: replace avatar and client name with real component
const clientInfo = {
  name: "Mary Jane",
  avatar: avatar,
};

export const ChatInterFace: React.FC = () => {
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
      senderId: user,
    };

    setMessages([...messages, newMessage]);

    updateSingleMsgStream(newMessage.content, client, token);
  }

  return (
    <div className="h-[514px] mt-4 overflow-hidden flex flex-col relative ">
      <ChatHeader
        name={clientInfo.name}
        avatar={clientInfo.avatar}
        onBack={() => {}}
      />
      <div className="flex-1 overflow-y-auto pt-5 pb-[60px]">
        <ChatStream messages={messages} />
      </div>

      <div className="absolute w-full bottom-0 left-0">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};
