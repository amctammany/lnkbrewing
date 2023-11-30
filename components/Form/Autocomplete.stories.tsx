// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from "@storybook/react";

import { Autocomplete, Option } from "./Autocomplete";
const options: Option[] = [
  ["first", 0],
  ["second", 1],
  ["third", 2],
];
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
