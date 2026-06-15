"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { ForgeGrid } from "@/components/data-grid/forge-grid";
import { StatusCellRenderer, AvatarCellRenderer } from "@/components/data-grid/cell-renderers";
import { ChartContainer } from "@/components/charts/chart-container";
import { BarChart } from "@/components/charts/bar-chart";
import { formatDate } from "@/lib/utils";
import { teamMembers, apiKeys, billingData, notificationPrefs } from "@/lib/data/settings";
import type { TeamMember, ApiKey } from "@/lib/types";

const teamColumnDefs: ColDef<TeamMember>[] = [
  { field: "name", headerName: "Name", flex: 1.5, cellRenderer: AvatarCellRenderer },
  { field: "email", headerName: "Email", flex: 1.5 },
  { field: "role", headerName: "Role", width: 120 },
  { field: "status", headerName: "Status", width: 120, cellRenderer: StatusCellRenderer },
  {
    field: "joinedAt",
    headerName: "Joined",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
];

const apiKeyColumnDefs: ColDef<ApiKey>[] = [
  { field: "name", headerName: "Name", flex: 1.5 },
  { field: "prefix", headerName: "Key", width: 160, cellClass: "font-mono" },
  { field: "status", headerName: "Status", width: 120, cellRenderer: StatusCellRenderer },
  {
    field: "createdAt",
    headerName: "Created",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
  {
    field: "lastUsed",
    headerName: "Last Used",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
];

const billingMetrics = [
  { label: "Current Plan", value: "Enterprise" },
  { label: "GPU Hours This Month", value: "2,847" },
  { label: "Monthly Budget", value: "$12,500" },
];

export default function SettingsPage() {
  const [name, setName] = React.useState("Brayden Love");
  const [email, setEmail] = React.useState("brayden@forge.ai");

  return (
    <PageShell>
      <PageHeader
        title="Settings"
        description="Manage your account, team, and preferences."
      />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="flex max-w-lg flex-col gap-5">
            <div className="flex items-center gap-4">
              <Avatar name={name} size="xl" />
              <div className="flex flex-col gap-0.5">
                <p className="text-body-lg font-semibold text-fg-primary">{name}</p>
                <p className="text-body-sm text-fg-secondary">Admin</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-body-sm font-medium text-fg-primary">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-body-sm font-medium text-fg-primary">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Button variant="primary" size="md">
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button variant="primary" size="md">
                <Plus className="h-4 w-4" />
                Invite Member
              </Button>
            </div>
            <ForgeGrid<TeamMember>
              rowData={teamMembers}
              columnDefs={teamColumnDefs}
              pagination={false}
              height={400}
            />
          </div>
        </TabsContent>

        <TabsContent value="api-keys">
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button variant="primary" size="md">
                <Plus className="h-4 w-4" />
                Create API Key
              </Button>
            </div>
            <ForgeGrid<ApiKey>
              rowData={apiKeys}
              columnDefs={apiKeyColumnDefs}
              pagination={false}
              height={350}
            />
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card variant="outlined" padding="none" radius="lg" className="overflow-hidden p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>In-App</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notificationPrefs.map((pref) => (
                  <TableRow key={pref.category}>
                    <TableCell className="font-medium">{pref.category}</TableCell>
                    <TableCell className="text-fg-secondary">{pref.description}</TableCell>
                    <TableCell>
                      <Badge variant={pref.email ? "success" : "neutral"} size="sm" shape="pill">
                        {pref.email ? "On" : "Off"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={pref.inApp ? "success" : "neutral"} size="sm" shape="pill">
                        {pref.inApp ? "On" : "Off"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {billingMetrics.map((item) => (
                <Card key={item.label} variant="outlined" padding="sm" radius="md">
                  <p className="text-label text-fg-tertiary">{item.label}</p>
                  <p className="mt-1 text-body-lg font-semibold text-fg-primary">{item.value}</p>
                </Card>
              ))}
            </div>
            <ChartContainer
              title="GPU Hours by Month"
              description="Compute usage over the last 6 months"
              height={280}
            >
              <BarChart data={billingData} keys={["hours"]} indexBy="month" />
            </ChartContainer>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
