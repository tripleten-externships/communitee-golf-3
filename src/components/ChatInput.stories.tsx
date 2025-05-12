import type { Meta, StoryObj } from "@storybook/react";
import { ChatInput } from "./ChatInput";

const meta: Meta<typeof ChatInput> = {
  title: "Components/ChatInput",
  component: ChatInput,
  args: {
    onSend: (message) => {
      console.log(message);
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {};
