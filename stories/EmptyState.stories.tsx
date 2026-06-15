import type { Meta, StoryObj } from "@storybook/react";
import { Inbox, Plus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["neutral", "accent"] },
  },
  args: {
    size: "md",
    tone: "neutral",
    icon: <Inbox className="h-6 w-6" />,
    title: "No training runs yet",
    description:
      "Kick off your first run to start fine-tuning GPT-Forge on your dataset. Metrics will stream in here live.",
    action: (
      <Button variant="primary" size="sm">
        <Plus className="h-3.5 w-3.5" />
        Start training run
      </Button>
    ),
  },
  render: (args) => (
    <div className="w-[28rem]">
      <EmptyState {...args} />
    </div>
  ),
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Accent: Story = { args: { tone: "accent" } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const NoAction: Story = {
  args: {
    action: undefined,
    title: "No datasets connected",
    description: "Connect a data source to begin building training corpora.",
  },
};
