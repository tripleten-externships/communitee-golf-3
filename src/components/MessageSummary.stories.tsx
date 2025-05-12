import { Meta, StoryObj } from "@storybook/react";
import { MessageSummary } from "./MessageSummary";

const meta: Meta<typeof MessageSummary> = {
  title: "Components/MessageSummary",
  component: MessageSummary,
  tags: ["autodocs"],
  args: {
    name: "John Doe",
    message: "Hey! I just checked in with the group and we're good to go.",
    time: "1h",
    unreadCount: 2,
    avatarUrl: "https://live.staticflickr.com/5720/20947700929_ffe36a95dc_b.jpg",
  },
};

export default meta;

type Story = StoryObj<typeof MessageSummary>;

export const Default: Story = {};

export const NoUnread: Story = {
  args: {
    unreadCount: 0,
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert("Message clicked!"),
  },
};
