import type { Meta, StoryObj } from "@storybook/react";

import { ColumnView } from "./ColumnView";

type D = { name: string; description: string };
type S = { selected: number };
const meta: Meta<typeof ColumnView<D, S>> = {
  component: ColumnView,
};
export default meta;

const data: D[] = [
  { name: "first", description: "foobar" },
  { name: "second", description: "why" },
  { name: "third", description: "bar" },
  { name: "fourth", description: "barfas" },
];

type Story = StoryObj<typeof ColumnView<D, S>>;

export const Basic: Story = {
  args: {
    sources: data,
    fields: [{ name: "name" }, { name: "description" }],
  },
};

export const Form: Story = {
  args: {
    sources: data,
    state: { selected: 0 },
    fields: [{ name: "name" }, "selected", { name: "description" }],
  },
};
