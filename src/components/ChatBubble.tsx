import React from "react";

export const ChatBubble: React.FC = () => {
  const [isMine, setIsMine] = React.useState(false);
  return (
    <div
      className={`p-3 max-w-[260px] w-fit h-15 
        rounded-tr-lg rounded-br-lg rounded-bl-lg gap-2.5
        ${isMine ? "bg-[#FFDFDF] ml-auto" : "bg-[#DEDEDE4D] mr-auto"}`}
    >
      <p>Hi, question</p>
    </div>
  );
};
