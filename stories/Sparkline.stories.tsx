import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "@/components/ui/sparkline";

const meta = {
  title: "UI/Sparkline",
  component: Sparkline,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["accent", "success", "warning", "danger", "neutral"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    fillArea: { control: "boolean" },
  },
  args: {
    data: [42, 48, 45, 53, 61, 58, 67, 72, 70, 79, 85, 94],
    tone: "accent",
    size: "md",
    fillArea: true,
  },
  render: (args) => (
    <div className="w-48">
      <Sparkline {...args} />
    </div>
  ),
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { tone: "success" } };
export const Warning: Story = { args: { tone: "warning" } };
export const Danger: Story = {
  args: { tone: "danger", data: [94, 88, 90, 81, 76, 79, 68, 60, 55, 49, 41, 33] },
};
export const Neutral: Story = { args: { tone: "neutral" } };
export const NoFill: Story = { args: { fillArea: false } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-48 flex-col gap-4">
      <Sparkline {...args} size="sm" />
      <Sparkline {...args} size="md" />
      <Sparkline {...args} size="lg" />
    </div>
  ),
};
