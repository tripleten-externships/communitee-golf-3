import { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "./ChatBubble";

const meta: Meta<typeof ChatBubble> = {
  title: "Components/ChatBubble",
  component: ChatBubble,
  args: {
    isMine: false,
    message: "Good morning!",
  },
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

export const Default: Story = {};
