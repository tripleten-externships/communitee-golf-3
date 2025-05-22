import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    handleExitClick: () => console.log('Exit clicked'),
    handleSignoutClick: () => console.log('Sign out clicked'),
  },
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    handleExitClick: () => console.log('Exit clicked'),
    handleSignoutClick: () => console.log('Sign out clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof Header>;