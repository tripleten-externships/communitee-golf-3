import React from "react";
import { ChatStream } from "./ChatStream";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { token } from "../services/constant";
import { getSingleMsgStream, updateSingleMsgStream, updateReadMsgStream } from "../services/api";
import { useLocation } from "react-router-dom";

export type Message = {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
};

export const ChatInterFace: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);

//TODO: replace with real API
  const user = "user-123";

  const location = useLocation();
  const clientInfo = location.state?.selectedClient;
  const client = clientInfo.id;

  const markAsRead = (id: string, token: string) => {
          updateReadMsgStream(id, token)
          .catch((err: any) => {
         console.log(err.message);
        });
      };

  React.useEffect(() => {
    getSingleMsgStream(client, token)
      .then((res) => {
        setMessages(res.messages);
        markAsRead(client, token);
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
