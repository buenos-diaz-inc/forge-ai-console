import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "@/components/ui/status-badge";

const meta = {
  title: "UI/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["success", "info", "warning", "danger", "neutral"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    pulse: { control: "boolean" },
  },
  args: {
    label: "Healthy",
    tone: "success",
    size: "md",
    pulse: false,
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = { args: { tone: "success", label: "Healthy" } };
export const Info: Story = { args: { tone: "info", label: "Running" } };
export const Warning: Story = { args: { tone: "warning", label: "Queued" } };
export const Danger: Story = { args: { tone: "danger", label: "Failed" } };
export const Neutral: Story = { args: { tone: "neutral", label: "Draft" } };

export const Pulse: Story = { args: { tone: "info", label: "Running", pulse: true } };

export const Tones: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge {...args} tone="success" label="Healthy" />
      <StatusBadge {...args} tone="info" label="Running" />
      <StatusBadge {...args} tone="warning" label="Queued" />
      <StatusBadge {...args} tone="danger" label="Failed" />
      <StatusBadge {...args} tone="neutral" label="Draft" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <StatusBadge {...args} size="sm" label="Running" />
      <StatusBadge {...args} size="md" label="Running" />
      <StatusBadge {...args} size="lg" label="Running" />
    </div>
  ),
};
