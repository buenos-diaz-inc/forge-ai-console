import * as React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
}

/** Leadership grid item: avatar, name, role, and a one-line bio. */
export function TeamMemberCard({ name, role, bio }: TeamMemberCardProps) {
  return (
    <Card variant="default" radius="lg" padding="md" className="items-start gap-3">
      <Avatar name={name} size="lg" />
      <div className="flex flex-col gap-0.5">
        <span className="text-body font-semibold text-fg-primary">{name}</span>
        <span className="text-body-sm text-accent-strong">{role}</span>
      </div>
      <p className="text-body-sm leading-relaxed text-fg-secondary">{bio}</p>
    </Card>
  );
}
