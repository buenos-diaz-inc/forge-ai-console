import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "ghost", "glass", "invalid"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Search models, datasets, runs…",
    variant: "default",
    size: "md",
  },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Ghost: Story = { args: { variant: "ghost", placeholder: "Filter experiments…" } };
export const Glass: Story = { args: { variant: "glass", placeholder: "Prompt the playground…" } };
export const Invalid: Story = {
  args: { variant: "invalid", defaultValue: "lr=-0.001", placeholder: "Learning rate" },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "gpt-forge-7b (read-only)" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-3">
      <Input {...args} size="sm" placeholder="Small" />
      <Input {...args} size="md" placeholder="Medium" />
      <Input {...args} size="lg" placeholder="Large" />
    </div>
  ),
};
