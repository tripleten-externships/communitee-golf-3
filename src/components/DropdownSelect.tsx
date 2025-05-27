import React, { useState, useRef, useEffect } from "react";
import ChevronDown from "../assets/chevron-down.svg";

interface Item {
  id: string;
  name: string;
}

interface DropdownSelectProps {
  items: Item[];
  label: string;
  defaultOptionName?: string;
  defaultOptionValue?: string;
  setSelectionOut: React.Dispatch<React.SetStateAction<Item>>;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  items,
  label,
  defaultOptionName = "All",
  defaultOptionValue = "All",
  setSelectionOut,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>({
    id: defaultOptionValue,
    name: defaultOptionName,
  });

  const fullItemList: Item[] = [
    { id: defaultOptionValue, name: defaultOptionName },
    ...items,
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    setSelectionOut(item);
    setIsOpen(false);
  };

  return (
    <div className="w-[304px] max-w-sm relative" ref={dropdownRef}>
      <label className="font-normal text-[12px] text-[#959494] leading-[1.1] font-poppins mb-1 block">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
        w-full h-[42px] 
        flex justify-between items-center 
        p-[12px] 
        rounded-[12px] 
        border border-[#030303] 
        bg-[#FFFFFF] 
        cursor-pointer 
        focus:outline-none
        font-normal text-[16px] text-[#030303] font-poppins
        "
      >
        {selectedItem.name}
        <img
        src={ChevronDown}
        alt="Dropdown Arrow"
        className="w-[24px] h-[24px]"
        />

      </button>

      {isOpen && (
        <ul
          className="
            absolute mt-[8px] py-[4px] w-full bg-white z-[999] border border-[#959494]
            rounded-[12px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] overflow-auto max-h-[153px]
          "
        >
          {fullItemList.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`
                h-[42px] pl-[12px] font-normal text-[16px] text-[#030303] leading-[1.1] font-poppins cursor-pointer
                hover:bg-[#F5F8FA] flex items-center
                ${item.id === selectedItem.id ? "bg-[#F5F8FA]" : ""}
              `}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
