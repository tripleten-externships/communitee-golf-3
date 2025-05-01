import React from "react";

type ChatBubbleProps = {
  isMine?: boolean;
  message: string;
  sentAt: string;
};

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

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  isMine,
  message,
  sentAt,
}) => {
  //   const [isMine, setIsMine] = React.useState(false);
  const timeDisplay = getRelativeTime(sentAt);

  return (
    <div className="flex flex-col">
      <span
        className={`text-gray-400 text-[10px] leading-[130%] tracking-[0] align-middle 
            ${isMine ? "self-end" : " self-start"}`}
      >
        {timeDisplay}
      </span>
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
