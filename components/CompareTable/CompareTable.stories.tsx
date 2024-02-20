import type { Meta, StoryObj } from "@storybook/react";

import { CompareTable } from "./CompareTable";
import { NumberField } from "./fields/NumberField";

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
//const columns: DataColumnProps<D>[] = [
//{ name: "name", href: (src: D) => `/sub/${src.name}` },
//{ name: "description" },
//];

type Story = StoryObj<typeof CompareTable<D>>;

export const Basic: Story = {
  args: {
    //columns,
    sources: data,
    fields: [{ name: "name" }, { name: "description" }],
  },
};
