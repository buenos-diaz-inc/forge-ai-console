import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "solid", "danger", "link"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Deploy model",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary", children: "Cancel run" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Dismiss" } };
export const Outline: Story = { args: { variant: "outline", children: "Compare runs" } };
export const Solid: Story = { args: { variant: "solid", children: "Start training run" } };
export const Danger: Story = { args: { variant: "danger", children: "Terminate run" } };
export const Link: Story = { args: { variant: "link", children: "View experiment logs" } };
export const Loading: Story = { args: { loading: true, children: "Deploying GPT-Forge" } };
export const Disabled: Story = { args: { disabled: true, children: "GPU unavailable" } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Rocket className="h-3.5 w-3.5" />
        Deploy to production
        <ArrowRight className="h-3.5 w-3.5" />
      </>
    ),
  },
};
