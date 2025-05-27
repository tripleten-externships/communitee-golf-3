import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tabber } from "./Tabber";

const meta: Meta<typeof Tabber> = {
  title: "Components/Tabber",
  component: Tabber,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabber>;

export const Default: Story = {
  args: {
    tabs: [
      {
        name: "First Tab",
        number: 3,
        component: <div className="p-4 text-sm">Content of the first tab</div>,
      },
      {
        name: "Second Tab",
        number: 0,
        component: <div className="p-4 text-sm">Content of the second tab</div>,
      },
      {
        name: "Third Tab",
        component: <div className="p-4 text-sm">No number on this tab</div>,
      },
    ],
    defaultTabIndex: 0,
    error: "",
    fontSize: "14px",
  },
};

export const WithError: Story = {
  args: {
    tabs: [
      {
        name: "Tab A",
        number: 1,
        component: <div className="p-4 text-sm">Tab A content</div>,
      },
      {
        name: "Tab B",
        component: <div className="p-4 text-sm">Tab B content</div>,
      },
    ],
    defaultTabIndex: 1,
    error: "Something went wrong!",
    fontSize: "16px",
  },
};
