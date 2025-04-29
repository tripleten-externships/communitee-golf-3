import React from "react";
import avatar from "../assets/avatar.jpg";
import { ChatBubble } from "./ChatBubble";

export const ChatInterFace: React.FC = () => {
  return (
    <div className="m-4">
      <div className="relative">
        <button
          className="bg-[url(./assets/back-btn.svg)] bg-transparent bg-no-repeat bg-center
           w-6 h-6 border-none absolute left-0"
        ></button>
        <div className="flex flex-col items-center justify-center gap-2 m-auto">
          <img src={avatar} alt="avatar" className="w-9 h-9 rounded-full" />
          <p className="font-medium text-base leading-[110%] tracking-[0%] ">
            Mary Jane
          </p>
        </div>
      </div>
      <ChatBubble />
      <form className="relative w-[304px] h-[42px]">
        <input
          type="text"
          placeholder="Write a message..."
          className="border border-gray-300 p-3 rounded-[12px] w-full
          font-normal text-base leading-[110%]"
        />
        <button
          className="bg-[url(./assets/subtract-btn.svg)] bg-transparent bg-no-repeat bg-center
           w-6 h-6 border-none absolute top-2 right-3"
        ></button>
      </form>
    </div>
  );
};
