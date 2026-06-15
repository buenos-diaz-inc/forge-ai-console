import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["underline", "pill", "segmented"] },
  },
  args: {
    defaultValue: "overview",
    variant: "underline",
  },
  render: (args) => (
    <div className="w-[34rem]">
      <Tabs {...args}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-body-sm text-fg-secondary">
            GPT-Forge · RUN-0187 converged at epoch 3 with 94.2% eval accuracy.
          </p>
        </TabsContent>
        <TabsContent value="metrics">
          <p className="text-body-sm text-fg-secondary">
            Loss 0.18 · Eval accuracy 94.2% · Throughput 1,240 tok/s.
          </p>
        </TabsContent>
        <TabsContent value="logs">
          <p className="text-body-sm text-fg-secondary">
            [epoch 3/5] step 4200 · loss=0.182 · lr=1.2e-5 · grad_norm=0.94
          </p>
        </TabsContent>
        <TabsContent value="config">
          <p className="text-body-sm text-fg-secondary">
            Base: gpt-forge-7b · 8× H100 · batch 64 · lr 1e-5 · 5 epochs.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {};
export const Pill: Story = { args: { variant: "pill" } };
export const Segmented: Story = { args: { variant: "segmented" } };
