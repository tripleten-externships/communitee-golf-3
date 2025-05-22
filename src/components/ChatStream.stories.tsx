import type { Meta, StoryObj } from "@storybook/react";
import { ChatStream } from "./ChatStream";

const meta: Meta<typeof ChatStream> = {
  title: "Components/ChatStream",
  component: ChatStream,
};

export default meta;

type Story = StoryObj<typeof ChatStream>;

export const Default: Story = {};
