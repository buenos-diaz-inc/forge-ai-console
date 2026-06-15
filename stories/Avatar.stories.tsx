import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/ui/avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    shape: { control: "select", options: ["circle", "square"] },
    tone: {
      control: "select",
      options: ["neutral", "accent", "success", "warning", "danger", "info", "inverse"],
    },
    ring: { control: "select", options: ["none", "soft", "accent"] },
    status: { control: "select", options: ["online", "away", "busy", "offline"] },
    interactive: { control: "boolean" },
  },
  args: {
    name: "Sarah Chen",
    size: "md",
    shape: "circle",
    ring: "none",
    interactive: false,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Square: Story = { args: { shape: "square", name: "Forge AI" } };
export const AccentTone: Story = { args: { tone: "accent", name: "Priya Nair" } };
export const WithStatus: Story = { args: { status: "online", name: "Marcus Lee" } };
export const Interactive: Story = { args: { interactive: true, ring: "accent" } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
      <Avatar {...args} size="2xl" />
    </div>
  ),
};

export const Statuses: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} name="Sarah Chen" status="online" />
      <Avatar {...args} name="Marcus Lee" status="away" />
      <Avatar {...args} name="Priya Nair" status="busy" />
      <Avatar {...args} name="Diego Ruiz" status="offline" />
    </div>
  ),
};
