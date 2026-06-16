import {
  Compass,
  ShieldCheck,
  Sparkles,
  Users,
  Gauge,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

/** Headline metrics shown in the About hero stat band. */
export interface AboutStat {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
}

export const aboutStats: AboutStat[] = [
  { label: "Founded", value: "2021", hint: "San Francisco, CA" },
  { label: "Forgers", value: "180", unit: "people", hint: "across 14 countries" },
  { label: "Models Trained", value: "2.4", unit: "million", hint: "and counting" },
  { label: "Uptime", value: "99.98", unit: "%", hint: "trailing 90 days" },
];

/** A company value with an icon + supporting copy. */
export interface AboutValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const aboutValues: AboutValue[] = [
  {
    icon: Compass,
    title: "Builder-first",
    description:
      "Every decision starts with the practitioner shipping models at 2am. If it slows them down, it does not ship.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by default",
    description:
      "Security, lineage, and reproducibility are not add-ons. They are the substrate the whole platform stands on.",
  },
  {
    icon: Sparkles,
    title: "Taste matters",
    description:
      "Powerful tools can still be beautiful. We sweat the details so the work feels effortless.",
  },
  {
    icon: Gauge,
    title: "Speed compounds",
    description:
      "Shorter feedback loops beat bigger plans. We optimize for the next experiment, not the quarterly roadmap.",
  },
  {
    icon: Users,
    title: "Win as a team",
    description:
      "The hard problems are cross-functional. We share context loudly and credit generously.",
  },
  {
    icon: GitBranch,
    title: "Open by instinct",
    description:
      "We contribute upstream, document in public, and design for portability over lock-in.",
  },
];

/** A point on the company timeline. */
export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    year: "2021",
    title: "Forge is founded",
    description:
      "Three ML engineers tired of stitching together notebooks, buckets, and spreadsheets set out to build one console.",
  },
  {
    year: "2022",
    title: "Experiments & lineage GA",
    description:
      "Tracked runs, dataset versioning, and reproducible pipelines ship to the first 500 teams.",
  },
  {
    year: "2023",
    title: "One-click deployments",
    description:
      "Promote any checkpoint to a live, autoscaling endpoint in seconds — no infra ticket required.",
  },
  {
    year: "2024",
    title: "Series B & global regions",
    description:
      "Raised $90M to expand multi-region training and bring the console to enterprise compliance.",
  },
  {
    year: "2026",
    title: "Agentic workflows",
    description:
      "The console learns your patterns and drafts the next experiment, dataset, and deploy for you.",
  },
];

/** A teammate shown in the leadership grid. */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Ava Chen",
    role: "Co-founder & CEO",
    bio: "Former research lead. Believes the best model is the one that ships.",
  },
  {
    name: "Marcus Bell",
    role: "Co-founder & CTO",
    bio: "Distributed-systems veteran. Obsessed with sub-second feedback loops.",
  },
  {
    name: "Priya Nair",
    role: "VP of Product",
    bio: "Turns messy ML workflows into interfaces people actually enjoy.",
  },
  {
    name: "Diego Ramirez",
    role: "Head of Infrastructure",
    bio: "Keeps two million training jobs humming across the globe.",
  },
  {
    name: "Sofia Larsen",
    role: "Head of Design",
    bio: "Makes powerful tooling feel calm, fast, and unmistakably Forge.",
  },
  {
    name: "Kenji Watanabe",
    role: "Head of Research",
    bio: "Bridges frontier research and the practitioners who depend on it.",
  },
];
