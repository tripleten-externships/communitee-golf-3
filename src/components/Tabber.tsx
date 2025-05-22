import React from 'react';

interface TabberProps {
  totalUnreadMessages: number;
}

export const Tabber: React.FC<TabberProps> = ({ totalUnreadMessages }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 mb-4 px-2 border-b-2 border-gray-300 pb-2">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => window.location.href = '/message-stream'}
          className="text-[16px] font-poppins font-medium hover:text-blue-500 transition-colors cursor-pointer"
        >
          Messages ({totalUnreadMessages})
        </button>
      </div>
    </div>
  );
};