import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/ui/separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    tone: { control: "select", options: ["default", "subtle", "strong"] },
  },
  args: {
    orientation: "horizontal",
    tone: "default",
  },
  render: (args) => (
    <div className="w-80">
      <p className="text-body-sm text-fg-secondary">Model card</p>
      <Separator {...args} className="my-3" />
      <p className="text-body-sm text-fg-secondary">Evaluation metrics</p>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Subtle: Story = { args: { tone: "subtle" } };
export const Strong: Story = { args: { tone: "strong" } };

export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-8 items-center gap-3 text-body-sm text-fg-secondary">
      <span>94.2% acc</span>
      <Separator {...args} orientation="vertical" />
      <span>0.18 loss</span>
      <Separator {...args} orientation="vertical" />
      <span>8× H100</span>
    </div>
  ),
};
