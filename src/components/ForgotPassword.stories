import type { Meta, StoryObj } from "@storybook/react";
import Login  from "./Login"; 
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";

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

// Create a Wrapper to provide both BrowserRouter and AuthProvider context
const Wrapper = (args: any) => (
  <BrowserRouter>
    <AuthProvider> {/* Wrap both BrowserRouter and AuthProvider */}
      <Login {...args} />
    </AuthProvider>
  </BrowserRouter>
);

export const Default: Story = {
  render: (args) => {
    console.log("Rendering Default Story");
    return <Wrapper {...args} />; 
  },
  args: {     
    onLogin: () => {
      console.log("Logged in");
    }
  },
};

// Mobile view
export const MobileView: Story = {
  render: (args) => {
    console.log("Rendering MobileView Story");
    return <Wrapper {...args} />; 
  },
  args: {    
    onLogin: () => {
      console.log("Logged in (Mobile View)");
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};