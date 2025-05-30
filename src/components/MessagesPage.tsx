import React from "react";
import { MessageSummaryList } from "./MessageSummaryList";
import { DropdownSelect } from "./DropdownSelect";
import { getLocationList, getAllMsgStream } from "../api/api";
import { getToken } from "../api/token";
import { Tabber } from "./Tabber";

export const MessagesPage: React.FC = () => {
  const [location, setLocation] = React.useState({ id: "all", name: "All" });
  const [error, setError] = React.useState("");
  const [locations, setLocations] = React.useState<any[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);

  const filteredMessages =
    !location.id || location.id.toLowerCase() === "all"
      ? messages
      : messages.filter((message) => message.locationId === location.id);

  const totalUnreadMessages = filteredMessages.reduce(
    (sum, message) => sum + (message.unreadCount || 0),
    0
  );

  const eventsTab = {
    name: "Events",
    number: 0,
    component: (
      <h2 className="text-center text-[16px] font-[500] leading-[1.2] font-poppins text-[#959494]">
        Events Component
      </h2>
    ),
  };

  const messagesTab = {
    name: "Messages",
    number: totalUnreadMessages,
    component: <MessageSummaryList messages={filteredMessages} />,
  };

  const tabsArray = [eventsTab, messagesTab];

  const fetchLocations = () => {
    getToken((tokenData) => {
      getLocationList(tokenData?.token)
        .then((res) => {
          setLocations(res);
        })
        .catch((err: any) => {
          setError(err.message);
        });
    });
  };

  const fetchMessages = () => {
    getToken((tokenData) => {
      getAllMsgStream(tokenData?.token)
        .then((res) => {
          setMessages(res);
        })
        .catch((err: any) => {
          setError(err.message);
        });
    });
  };

  React.useEffect(() => {
    fetchLocations();
  }, []);

  React.useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pt-[8px] gap-[30px] flex flex-col items-center">
      <DropdownSelect
        items={locations}
        label="Location"
        defaultOptionName="All Locations"
        setSelectionOut={setLocation}
      />
      <Tabber
        tabs={tabsArray}
        defaultTabIndex={1}
        error={error}
        fontSize="16px"
      />
    </div>
  );
};
