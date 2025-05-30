import React from "react";
import { ChatStream } from "./ChatStream";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import {
  getSingleMsgStream,
  updateSingleMsgStream,
  updateReadMsgStream,
} from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export type Message = {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
};

export const ChatInterFace: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { token } = useAuth();
  const tokenString = token?.token;

  //TODO: replace with real API
  const user = "user-123";

  const location = useLocation();
  const clientInfo = location.state?.selectedClient;
  const client = clientInfo.id;
  const navigate = useNavigate();

  const markAsRead = (id: string, token: string | undefined) => {
    updateReadMsgStream(id, token).catch((err: any) => {
      console.log(err.message);
    });
  };

  React.useEffect(() => {
    getSingleMsgStream(client, tokenString)
      .then((res) => {
        setMessages(res.messages);
        markAsRead(client, tokenString);
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

    updateSingleMsgStream(newMessage.content, client, tokenString);
  }

  return (
    <div className="h-[514px] mt-4 overflow-hidden flex flex-col relative ">
      <ChatHeader
        name={clientInfo.name}
        avatar={clientInfo.avatar}
        onBack={() => {navigate(-1)}}
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
