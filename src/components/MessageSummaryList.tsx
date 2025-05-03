import React from "react";
import { MessageSummary } from "./MessageSummary";

interface Message {
  id: string;
  clientName: string;
  clientImage: string;
  unreadCount: number;
  lastMessageAt: string;
  lastMessage: string;
  locationId: string;
}

interface MessageSummaryListProps {
  messages: Message[];
  locationId?: string;
}

export const MessageSummaryList: React.FC<MessageSummaryListProps> = ({
  messages, locationId
}) => {

  const filteredMessages = !locationId || locationId === "All" ? messages : messages.filter((message) => {
    return message.locationId === locationId;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => 
    new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );  

  function formatTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
  
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
  
    if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days === 1) {
      return "yesterday";
    } else if (days < 7) {
      return `${days}d`;
    } else if (days < 30) {
      return `${weeks}w`;
    } else {
      return date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
    }
  }
  
  

  return (
    <ul className="flex flex-col gap-[12px] p-0 m-0 max-h-full overflow-y-auto">
      {sortedMessages.map((message) => (
        <li key={message.id}>
          <MessageSummary
            name={message.clientName}
            message={message.lastMessage}
            time={formatTime(message.lastMessageAt)}
            unreadCount={message.unreadCount}
            avatarUrl={message.clientImage}
          />
        </li>
      ))}
    </ul>
  );
};
