"use client";

// Adapted from ObsidianUI's discover-button (MIT). Renders a Next link for
// in-site paths and a plain anchor for external, mailto and file links.
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./discover-button.css";

export interface DiscoverButtonProps {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
}

export function DiscoverButton({ label, href, external = false, className }: DiscoverButtonProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const face = (
    <>
      <span className="obsidian-discover-button__fill" aria-hidden="true" />
      <span className="obsidian-discover-button__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={2.25} />
      </span>
      <span className="obsidian-discover-button__text">{label}</span>
    </>
  );

  if (external) {
    const isWeb = href.startsWith("http");
    return (
      <a
        className={cn("obsidian-discover-button", className)}
        href={href}
        target={isWeb ? "_blank" : undefined}
        rel={isWeb ? "noopener noreferrer" : undefined}
      >
        {face}
      </a>
    );
  }

  return (
    <Link className={cn("obsidian-discover-button", className)} href={href}>
      {face}
    </Link>
  );
}

export default DiscoverButton;
