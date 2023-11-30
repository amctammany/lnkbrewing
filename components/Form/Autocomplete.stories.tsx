// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from "@storybook/react";

import { Autocomplete, Option } from "./Autocomplete";
const options: Record<number, string> = {
  0: "hi",
  1: "you",
  2: "guys",
};
const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Basic: Story = { args: { options } };

export const Primary: Story = {
  args: {
    name: "hi",
    options,
  },
};
