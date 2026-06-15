import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "accent", "success", "warning", "danger", "info", "solid", "outline"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    shape: { control: "select", options: ["pill", "rect"] },
    interactive: { control: "boolean" },
    dot: { control: "boolean" },
  },
  args: {
    children: "v2.4.0",
    variant: "neutral",
    size: "md",
    shape: "rect",
    interactive: false,
    dot: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Accent: Story = { args: { variant: "accent", children: "Fine-tuned" } };
export const Success: Story = { args: { variant: "success", children: "Deployed" } };
export const Warning: Story = { args: { variant: "warning", children: "Quantized" } };
export const Danger: Story = { args: { variant: "danger", children: "Drift detected" } };
export const Info: Story = { args: { variant: "info", children: "Inference" } };
export const Solid: Story = { args: { variant: "solid", children: "GPT-Forge" } };
export const Outline: Story = { args: { variant: "outline", children: "Experimental" } };

export const WithDot: Story = { args: { dot: true, variant: "success", children: "Healthy" } };
export const Pill: Story = { args: { shape: "pill", variant: "accent", children: "8× H100" } };
export const Interactive: Story = {
  args: { interactive: true, variant: "info", children: "Filter: dataset" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Badge {...args} size="sm">Small</Badge>
      <Badge {...args} size="md">Medium</Badge>
      <Badge {...args} size="lg">Large</Badge>
    </div>
  ),
};
