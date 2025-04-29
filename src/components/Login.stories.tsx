import type { Meta, StoryObj } from "@storybook/react";
import Login  from "./Login"; 

const meta = {
  title: "Pages/Login",
  component: Login, 
  parameters: {
    layout: "centered", 
  },
  tags: ["autodocs"], 
} satisfies Meta<typeof Login>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {     onLogin: () => console.log("Logged in")
  },
};

// Mobile view
export const MobileView: Story = {
  args: {    onLogin: () => console.log("Logged in")
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};