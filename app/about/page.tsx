import type { Metadata } from "next";
import { ArrowRight, Quote } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Separator } from "@/components/ui/separator";
import { ValueCard } from "@/components/about/value-card";
import { TeamMemberCard } from "@/components/about/team-member-card";
import { MilestoneTimeline } from "@/components/about/milestone-timeline";
import {
  aboutStats,
  aboutValues,
  milestones,
  teamMembers,
} from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About · Forge AI",
  description:
    "Who we are, what we believe, and the team building the AI development platform.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        overline="About Forge AI"
        title="We build the console serious ML teams live in"
        description="Forge is the AI development platform for the whole model lifecycle — datasets, experiments, training, and live deployments — in one fast, trustworthy console."
        actions={
          <Button variant="primary" size="md">
            Join the team
            <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      {/* Mission */}
      <Card variant="default" radius="xl" padding="xl" tone="accent" className="gap-4">
        <Quote className="h-6 w-6 text-accent-strong" />
        <p className="max-w-3xl font-display text-title-lg font-medium leading-snug tracking-tight text-fg-primary">
          Our mission is to collapse the distance between an idea and a model in
          production — so every team can ship intelligence as easily as they ship code.
        </p>
      </Card>

      {/* Stat band */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            hint={stat.hint}
          />
        ))}
      </div>

      <Separator tone="subtle" />

      {/* Values */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-display text-title font-semibold tracking-tight text-fg-primary">
            What we believe
          </h2>
          <p className="max-w-2xl text-body text-fg-secondary">
            Six principles that shape every pixel, API, and roadmap call.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutValues.map((value) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

      <Separator tone="subtle" />

      {/* Timeline + Team */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-title font-semibold tracking-tight text-fg-primary">
              How we got here
            </h2>
            <p className="text-body text-fg-secondary">From notebooks to a console.</p>
          </div>
          <MilestoneTimeline items={milestones} />
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-title font-semibold tracking-tight text-fg-primary">
              The people behind Forge
            </h2>
            <p className="text-body text-fg-secondary">
              A small, senior team obsessed with the practitioner experience.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
              />
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <Card
        variant="default"
        radius="xl"
        padding="xl"
        tone="inverse"
        className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-col gap-1.5">
          <CardTitle className="text-fg-inverse">Build the future of ML tooling</CardTitle>
          <p className="max-w-xl text-body-sm text-fg-inverse/80">
            We are hiring across engineering, design, and research. Come help every team
            ship intelligence faster.
          </p>
        </div>
        <Button variant="secondary" size="lg" className="shrink-0">
          View open roles
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>
    </PageShell>
  );
}
