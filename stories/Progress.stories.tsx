import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/ui/progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["accent", "success", "warning", "danger", "neutral"] },
    value: { control: { type: "range", min: 0, max: 100 } },
    max: { control: "number" },
  },
  args: {
    value: 62,
    max: 100,
    size: "md",
    tone: "accent",
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { tone: "success", value: 100 } };
export const Warning: Story = { args: { tone: "warning", value: 78 } };
export const Danger: Story = { args: { tone: "danger", value: 12 } };
export const Neutral: Story = { args: { tone: "neutral", value: 45 } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-4">
      <Progress {...args} size="sm" />
      <Progress {...args} size="md" />
      <Progress {...args} size="lg" />
    </div>
  ),
};

export const TrainingEpochs: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-2">
      <div className="flex justify-between text-body-sm text-fg-secondary">
        <span>Epoch 3 / 5</span>
        <span>62%</span>
      </div>
      <Progress {...args} value={62} tone="accent" />
    </div>
  ),
};
