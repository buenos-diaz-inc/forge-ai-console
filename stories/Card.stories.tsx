import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardOverline,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "float", "lift", "flat", "outlined", "glass"],
    },
    padding: { control: "select", options: ["none", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["md", "lg", "xl", "2xl"] },
    tone: {
      control: "select",
      options: ["neutral", "accent", "success", "warning", "danger", "inverse"],
    },
    interactive: { control: "boolean" },
    selected: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: {
    variant: "default",
    padding: "lg",
    radius: "lg",
    tone: "neutral",
    interactive: false,
    selected: false,
    loading: false,
  },
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardOverline>Training run</CardOverline>
        <CardTitle>GPT-Forge · RUN-0187</CardTitle>
        <CardDescription>Fine-tune on customer-support corpus · 8× H100</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body text-fg-secondary">
          Converged at epoch 3 with 94.2% eval accuracy. Loss curve is stable and ready to promote
          to a hosted endpoint.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">View logs</Button>
        <Button variant="primary" size="sm">Deploy model</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Float: Story = { args: { variant: "float" } };
export const Lift: Story = { args: { variant: "lift" } };
export const Flat: Story = { args: { variant: "flat" } };
export const Outlined: Story = { args: { variant: "outlined" } };
export const Glass: Story = { args: { variant: "glass" } };
export const AccentTone: Story = { args: { tone: "accent" } };
export const WarningTone: Story = { args: { tone: "warning" } };
export const DangerTone: Story = { args: { tone: "danger" } };
export const InverseTone: Story = { args: { tone: "inverse" } };
export const Interactive: Story = { args: { interactive: true } };
export const Selected: Story = { args: { selected: true } };
export const Loading: Story = { args: { loading: true } };
