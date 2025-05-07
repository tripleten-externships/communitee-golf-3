import type { Meta, StoryObj } from "@storybook/react";
import { ChatInterFace } from "./ChatInterFace";

const meta: Meta<typeof ChatInterFace> = {
  title: "Components/ChatInterFace",
  component: ChatInterFace,
};

export default meta;

type Story = StoryObj<typeof ChatInterFace>;

export const Default: Story = {};
