import type { Meta, StoryObj } from "@storybook/react";

import { PropSet } from "./PropSet";

const meta: Meta<typeof PropSet> = {
  component: PropSet,
};
export default meta;

type Story = StoryObj<typeof PropSet>;

export const Basic: Story = {
  args: {
    label: "Basic",
    value: "more basic",
  },
};

export const Warning: Story = {
  args: {
    label: "Warning",
    value: "more stuff",
    variant: "warning",
  },
};
