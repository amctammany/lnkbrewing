import type { Meta, StoryObj } from "@storybook/react";

import { CompareTable } from "./CompareTable";

const meta: Meta<typeof CompareTable<D>> = {
  component: CompareTable,
};
export default meta;
type D = { name: string; description: string };

const data: D[] = [
  { name: "first", description: "foobar" },
  { name: "second", description: "why" },
  { name: "third", description: "bar" },
];

type Story = StoryObj<typeof CompareTable<D>>;

export const Basic: Story = {
  args: {
    sources: data,
    fields: [{ name: "name" }, { name: "description" }],
  },
};
