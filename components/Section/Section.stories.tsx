import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "./Section";

const meta: Meta<typeof Section> = {
  component: Section,
};
export default meta;

type Story = StoryObj<typeof Section>;
const sectionBody = (
  <div>
    <h4>Section Body</h4>
    <p>Stuff</p>
    <ul>
      <li>1st</li>
      <li>2nd</li>
      <li>3rd</li>
    </ul>
  </div>
);

export const Basic: Story = {
  args: {
    header: "Basic",
    children: sectionBody,
  },
};

export const Warning: Story = {
  args: {
    header: "Warning",
    variant: "warning",
    children: sectionBody,
  },
};
