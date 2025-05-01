import React from "react";

type ChatBubbleProps = {
  isMine?: boolean;
  message: string;
  sentAt: string;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  isMine,
  message,
  sentAt,
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={`p-3 max-w-[260px] w-fit h-15 rounded-lg gap-2.5
        ${
          isMine
            ? "bg-[#FFDFDF] ml-auto rounded-tr-none"
            : "bg-[#DEDEDE4D] mr-auto rounded-tl-none"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};
