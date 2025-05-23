import type { Meta, StoryObj } from "@storybook/react";
import { ChatInterFace } from "./ChatInterFace";
import { AuthProvider } from "./auth/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof ChatInterFace> = {
  title: "Components/ChatInterFace",
  component: ChatInterFace,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChatInterFace>;

export const Default: Story = {};
