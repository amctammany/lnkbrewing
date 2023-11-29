// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from "@storybook/react";

import { Autocomplete } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Basic: Story = {};

export const Primary: Story = {
  args: {
    name: "hi",
  },
};
