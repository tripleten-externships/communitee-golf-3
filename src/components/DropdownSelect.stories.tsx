import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DropdownSelect } from "./DropdownSelect";

interface Item {
  id: string;
  name: string;
}

const meta: Meta<typeof DropdownSelect> = {
  title: "Components/DropdownSelect",
  component: DropdownSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownSelect>;

const mockItems: Item[] = [
  { id: "1", name: "Golf Course One" },
  { id: "2", name: "Golf Course Two" },
  { id: "3", name: "Golf Course Three" },
  { id: "4", name: "Golf Course Four" },
];

const Template: Story = {
  render: (args) => {
    const Wrapper: React.FC = () => {
      const [selectedItem, setSelectedItem] = useState<Item>({
        id: args.defaultOptionValue || "all",
        name: args.defaultOptionName || "All",
      });

      return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-4">
          <DropdownSelect
            {...args}
            items={mockItems}
            setSelectionOut={setSelectedItem}
          />
          <p className="text-gray-700 text-sm">
            Selected: <strong>{selectedItem.name}</strong> (ID: {selectedItem.id})
          </p>
        </div>
      );
    };

    return <Wrapper />;
  },
  args: {
    label: "Location",
    defaultOptionName: "All Locations",
    defaultOptionValue: "all",
  },
};

export const Default = Template;


