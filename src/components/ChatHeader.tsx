import React from "react";

//TODO: replace avatar and client name with real component

export interface ChatHeaderProps {
  name: string;
  avatar: string;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatar,
  onBack,
}) => {
  return (
    <div className="relative">
      <button
        className="bg-[url(./assets/back-btn.svg)] bg-transparent bg-no-repeat bg-center
           w-6 h-6 border-none absolute left-0"
        onClick={onBack}
      ></button>
      <div className="flex flex-col items-center justify-center gap-2 m-auto">
        <img
          src={avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full cursor-pointer"
        />
        <p className="font-medium text-base leading-[110%] tracking-[0%] ">
          {name}
        </p>
      </div>
    </div>
  );
};
