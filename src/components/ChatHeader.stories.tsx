import type { Meta, StoryObj } from "@storybook/react";
import { ChatHeader } from "./ChatHeader";
import avatar from "../assets/avatar.jpg";

const meta: Meta<typeof ChatHeader> = {
  title: "Components/ChatHeader",
  component: ChatHeader,
  args: {
    name: "Mary Jane",
    avatar: avatar,
    onBack: () => {
      console.log("Back button clicked!");
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChatHeader>;

export const Default: Story = {};
