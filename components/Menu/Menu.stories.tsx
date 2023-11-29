import type { Meta, StoryObj } from "@storybook/react";

import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

const meta: Meta<typeof Menu> = {
  component: Menu,
  decorators: [
    (Story) => (
      <div className="flex justify-center h-screen">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Menu>;
const MenuLinks = ["First", "Second"].map((s) => (
  <MenuItem key={s}>{s}</MenuItem>
));
export const Basic: Story = {
  args: {
    children: MenuLinks,
    label: "Basic",
  },
};

export const Warning: Story = {
  args: {
    label: "Warning",
    children: MenuLinks,
    //variant: "warning",
  },
};
