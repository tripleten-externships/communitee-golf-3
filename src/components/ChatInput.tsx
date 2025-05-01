import React from "react";
import { useForm } from "../hooks/useForm.ts";

type ChnatInputProps = {
  onSend: (message: string) => void;
};

export const ChatInput: React.FC<ChnatInputProps> = ({ onSend }) => {
  const { values, setValues, handleValueChange } = useForm();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newMessage = values.message;
    onSend(newMessage);

    setValues({});
  }
  return (
    <form className="relative w-full " onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a message..."
        className="border border-gray-300 p-3 rounded-[12px] w-full
          font-normal text-base leading-[110%]"
        name="message"
        value={values["message"] || ""}
        onChange={handleValueChange}
      />
      <button
        className="bg-[url(./assets/subtract-btn.svg)] bg-transparent bg-no-repeat bg-center
           w-6 h-6 border-none absolute top-2 right-3"
        type="submit"
      ></button>
    </form>
  );
};
