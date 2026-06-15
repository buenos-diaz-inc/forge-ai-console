import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";

const rows = [
  { id: "RUN-0187", model: "GPT-Forge 7B", accuracy: "94.2%", status: "Healthy", tone: "success" as const },
  { id: "RUN-0186", model: "GPT-Forge 13B", accuracy: "91.8%", status: "Running", tone: "info" as const },
  { id: "RUN-0185", model: "Forge-Embed", accuracy: "—", status: "Queued", tone: "warning" as const },
  { id: "RUN-0184", model: "GPT-Forge 7B", accuracy: "88.0%", status: "Failed", tone: "danger" as const },
];

const meta = {
  title: "UI/Table",
  component: Table,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    density: { control: "select", options: ["compact", "cozy", "comfortable"] },
    variant: { control: "select", options: ["default", "striped", "bordered"] },
  },
  args: {
    density: "cozy",
    variant: "default",
  },
  render: (args) => (
    <div className="w-[40rem]">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Run</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Eval accuracy</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono">{r.id}</TableCell>
              <TableCell>{r.model}</TableCell>
              <TableCell className="font-mono">{r.accuracy}</TableCell>
              <TableCell>
                <StatusBadge tone={r.tone} label={r.status} pulse={r.status === "Running"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Striped: Story = { args: { variant: "striped" } };
export const Bordered: Story = { args: { variant: "bordered" } };
export const Compact: Story = { args: { density: "compact" } };
export const Comfortable: Story = { args: { density: "comfortable" } };
