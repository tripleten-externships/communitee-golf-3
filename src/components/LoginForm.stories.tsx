import { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import { AuthProvider } from "./auth/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Components/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onLogin: { action: 'submitted' } // Shows data in Storybook actions panel
  },
} satisfies Meta<typeof LoginForm>;

export default meta;

const Template = (args: any) => (
  <BrowserRouter> {/* Wrap the LoginForm with BrowserRouter */}
  <AuthProvider>
    <LoginForm {...args} />
    </AuthProvider>
  </BrowserRouter>
);
// Default story
export const Default: StoryObj<typeof meta> = {
  render: Template,
  args: {
    onLogin: (username, password) => console.log('Submitted:', username, password),
  },
};

// With validation errors
export const WithErrors: StoryObj<typeof meta> = {
  render: Template,
  args: {
    onLogin: (username, password) => console.log('Submitted with errors:', username, password)
  },
};

// Interactive test case for successful login
export const SuccessfulLogin: StoryObj<typeof meta> = {
  render: Template,
  args: {
    onLogin: () => alert(`Welcome!`)
  },
};

// Mobile view
export const MobileView: StoryObj<typeof meta> = {
  render: Template,
  args: {
    onLogin: (username, password) => console.log('Mobile login:', username, password)
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};