import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { MessageSummaryList } from "./MessageSummaryList";

const meta: Meta<typeof MessageSummaryList> = {
  title: "Components/MessageSummaryList",
  component: MessageSummaryList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MessageSummaryList>;

const mockMessages = [
  {
    id: "1",
    clientName: "Alice Johnson",
    clientImage: "https://live.staticflickr.com/5720/20947700929_ffe36a95dc_b.jpg",
    unreadCount: 2,
    lastMessageAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 mins ago
    lastMessage: "Hey! Just checking in.",
    locationId: "loc1",
  },
  {
    id: "2",
    clientName: "Bob Smith",
    clientImage: "https://live.staticflickr.com/5720/20947700929_ffe36a95dc_b.jpg",
    unreadCount: 0,
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hrs ago
    lastMessage: "Let’s meet tomorrow.",
    locationId: "loc2",
  },
  {
    id: "3",
    clientName: "Charlie Davis",
    clientImage: "https://live.staticflickr.com/5720/20947700929_ffe36a95dc_b.jpg",
    unreadCount: 5,
    lastMessageAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    lastMessage: "Thanks for the update!",
    locationId: "loc3",
  },
  {
    id: "4",
    clientName: "Dana Miller",
    clientImage: "https://live.staticflickr.com/5720/20947700929_ffe36a95dc_b.jpg",
    unreadCount: 1,
    lastMessageAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    lastMessage: "Let's catch up soon!",
    locationId: "loc1",
  },
];

export const Default: Story = {
  args: {
    messages: mockMessages,
  },
};

export const EmptyList: Story = {
  args: {
    messages: [],
  },
};

