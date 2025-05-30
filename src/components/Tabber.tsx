import React from 'react';

interface Tab {
  name: string;
  number?: number;
  component: React.ReactNode;
}

interface TabberProps {
  tabs: Tab[];
  defaultTabIndex: number;
  error: string;
  fontSize: string;
  
}

export const Tabber: React.FC<TabberProps> = ({ tabs, defaultTabIndex, error, fontSize }) => {

  const [currentTab, setCurrentTab] = React.useState(defaultTabIndex);

  return (
    <div className="gap-[16px] flex flex-col w-[304px]">
    <ul className='flex w-full'>
      {tabs.map((tab, index) => (
    <li key={tab.name} className={`flex-1 flex flex-col items-center gap-4 ${index === currentTab ? "border-b-2 border-black" : "border-b-[1px] border-[#959494]"} py-[10px]`}>
        <button 
          onClick={() => setCurrentTab(index)}
          style={{fontSize}}
          className={`${index === currentTab ? "text-black" : "text-[#959494]"} font-poppins font-medium hover:text-black leading-[1.125] transition-colors cursor-pointer`}
        >
          {tab.name} {tab.number != null ? `(${tab.number})` : ""}
        </button>
    </li>
      ))}
    </ul>
    {error === ""
        ?  tabs[currentTab].component
        : <h2 className="text-center text-custom-red">{error}</h2>}
    </div>
  );
};
