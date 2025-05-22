import type { Meta, StoryObj } from "@storybook/react";
import { ChatStream } from "./ChatStream";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";

const meta: Meta<typeof ChatStream> = {
  title: "Components/ChatStream",
  component: ChatStream,
  // decorators: [
  //   (Story) => (
  //     <BrowserRouter>
  //       <AuthProvider>
  //         <Story />
  //       </AuthProvider>
  //     </BrowserRouter>
  //   ),
  // ],
};

export default meta;

type Story = StoryObj<typeof ChatStream>;

export const Default: Story = {};
