import type { Meta, StoryObj } from "@storybook/react";
import { Cpu } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

const meta = {
  title: "UI/StatCard",
  component: StatCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "select", options: ["stacked", "inline", "hero"] },
    align: { control: "select", options: ["start", "center"] },
    tone: { control: "select", options: ["neutral", "success", "warning", "danger", "accent"] },
    trend: { control: "select", options: ["up", "down", "flat"] },
    surface: { control: "select", options: ["card", "ghost", "glass", "bare"] },
    loading: { control: "boolean" },
  },
  args: {
    label: "Eval accuracy",
    value: "94.2",
    unit: "%",
    delta: "+2.4%",
    trend: "up",
    tone: "success",
    hint: "vs. last run",
    layout: "stacked",
    align: "start",
    surface: "card",
    loading: false,
  },
  render: (args) => (
    <div className="w-72">
      <StatCard {...args} />
    </div>
  ),
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    label: "GPU utilization",
    value: "87",
    unit: "%",
    delta: "+5%",
    trend: "up",
    tone: "accent",
    hint: "8× H100",
    icon: <Cpu className="h-4 w-4" />,
  },
};

export const TrendDown: Story = {
  args: {
    label: "Training loss",
    value: "0.18",
    unit: "",
    delta: "-0.06",
    trend: "down",
    tone: "success",
    hint: "lower is better",
  },
};

export const TrendFlat: Story = {
  args: {
    label: "Throughput",
    value: "1,240",
    unit: "tok/s",
    delta: "0%",
    trend: "flat",
    tone: "neutral",
    hint: "stable",
  },
};

export const Danger: Story = {
  args: {
    label: "Inference errors",
    value: "312",
    unit: "/hr",
    delta: "+180%",
    trend: "up",
    tone: "danger",
    hint: "drift detected",
  },
};

export const Hero: Story = {
  args: {
    layout: "hero",
    align: "center",
    label: "Total experiments",
    value: "1,087",
    unit: "",
    delta: "+42",
    trend: "up",
    tone: "accent",
    hint: "this month",
  },
};

export const Loading: Story = { args: { loading: true } };
