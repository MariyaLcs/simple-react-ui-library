import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";
import "./button.css";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimarySizes: Story = {
  name: "Primary / sizes",
  args: { primary: true, label: "Button" },
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} size="small" label="Small" />
      <Button {...args} size="medium" label="Medium" />
      <Button {...args} size="large" label="Large" />
    </div>
  ),
};

export const SecondarySizes: Story = {
  name: "Secondary / sizes",
  args: { primary: false, label: "Button" },
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} size="small" label="Small" />
      <Button {...args} size="medium" label="Medium" />
      <Button {...args} size="large" label="Large" />
    </div>
  ),
};

export const PrimaryStates: Story = {
  name: "Primary / states",
  args: { primary: true, label: "Button" },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <Button {...args} label="Default" />
      <div className="sbx-hover">
        <Button {...args} label="Hover" />
      </div>
      <div className="sbx-active">
        <Button {...args} label="Active" />
      </div>
      <div className="sbx-focus">
        <Button {...args} label="Focused" />
      </div>
      <Button {...args} disabled label="Disabled" />
    </div>
  ),
};

export const SecondaryStates: Story = {
  name: "Secondary / states",
  args: { primary: false, label: "Button" },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <Button {...args} label="Default" />
      <div className="sbx-hover">
        <Button {...args} label="Hover" />
      </div>
      <div className="sbx-active">
        <Button {...args} label="Active" />
      </div>
      <div className="sbx-focus">
        <Button {...args} label="Focused" />
      </div>
      <Button {...args} disabled label="Disabled" />
    </div>
  ),
};
