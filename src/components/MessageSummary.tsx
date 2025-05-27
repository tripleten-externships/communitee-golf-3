import React from "react";
import { useNavigate } from "react-router-dom";

interface MessageSummaryProps {
  id: string
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  avatarUrl: string;
}

export const MessageSummary: React.FC<MessageSummaryProps> = ({
  id,
  name,
  message,
  time,
  unreadCount,
  avatarUrl,
}) => {

  const navigate = useNavigate();

  const onClick = () => {
  navigate("/chat-interface", { state: { selectedClient:  {id: id, name: name, avatar: avatarUrl}} });
};


  return (
    <div
      onClick={onClick}
      className="relative w-[304px] min-h-[52px] pl-2 pr-3 py-2 rounded-[12px] bg-[#DEDEDE4D] cursor-pointer flex items-center gap-3 overflow-hidden"
    >
      {/* Time in top-right corner */}
      <span className="absolute top-2 right-3 text-[10px] font-[500] leading-[1] font-poppins text-gray-500">
        {time}
      </span>

      {/* Avatar and unread badge */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
        {typeof unreadCount === "number" && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 text-[9px] font-[500] leading-[1] font-poppins text-white bg-[#FF3131] rounded-full border border-[#F5F8FA] px-[4px] pt-[2px] pb-[3px] z-10">
        {unreadCount}
        </span>
        )}
      </div>

      {/* Name + Message */}
      <div className="flex flex-col overflow-hidden gap-1">
        <span className="text-[14px] font-[500] leading-[1.1] font-poppins text-black">
          {name}
        </span>
        <span className="text-[14px] font-[400] leading-[1.2] font-poppins text-[#959494] truncate">
          {message}
        </span>
      </div>
    </div>
  );
};