import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from '@storybook/test';
import { LoginForm } from "./LoginForm";

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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogin: (username,password) => console.log('Submitted:', username, password),
  },
};

// With validation errors
export const WithErrors: Story = {
  args: {
    onLogin: (username, password) => console.log('Submitted with errors:', username, password)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Submit empty form to trigger validation
    await userEvent.click(canvas.getByText('Sign in'));
  }
};

// Interactive test case
export const SuccessfulLogin: Story = {
  args: {
    onLogin: () => alert(`Welcome!`)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Fill out form correctly
    await userEvent.type(canvas.getByPlaceholderText('Username'), 'john_doe');
    await userEvent.type(canvas.getByPlaceholderText('Password'), 'securePass123');
    
    // Submit
    await userEvent.click(canvas.getByText('Sign in'));
  }
};

// Mobile view
export const MobileView: Story = {
  args: {
    onLogin: (username, password) => console.log('Mobile login:', username, password)
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};