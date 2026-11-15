"use client";

import React from "react";
import { skillCategories, learningTracks } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { Terminal, Shield, Workflow, Wrench, Sparkles } from "lucide-react";

export function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "languages":
        return <Terminal className="w-4 h-4 text-[var(--accent)]" />;
      case "security":
        return <Shield className="w-4 h-4 text-[var(--accent)]" />;
      case "automation":
        return <Workflow className="w-4 h-4 text-[var(--accent)]" />;
      case "tools":
        return <Wrench className="w-4 h-4 text-[var(--accent)]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[var(--accent)]" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)] bg-[var(--surface)]/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="02 / TOOLKIT"
          title="Verified Skills &amp; Technologies"
          subtitle="Honest technical inventory. Categorized by practical experience, coursework, and ongoing security and software learning."
        />

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((group) => (
            <div
              key={group.category}
              className="p-6 sm:p-7 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)]">
                    {getCategoryIcon(group.category)}
                  </div>
                  <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                    {group.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
                  {group.description}
                </p>
              </div>

              {/* Skills Tags with specific context notes */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative flex flex-col px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] transition-all cursor-default"
                  >
                    <span className="font-mono text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {skill.name}
                    </span>
                    {skill.note && (
                      <span className="text-[10px] text-[var(--text-secondary)] tracking-tight">
                        {skill.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Active Exploration / Learning in Public */}
        <div className="p-6 sm:p-8 rounded-xl bg-[var(--card-bg)] border border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-semibold mb-1">
                Transparency &amp; Growth
              </p>
              <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
                Currently Exploring &amp; Advancing
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm">
              Learning in public without arbitrary percentages or inflated numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {learningTracks.map((track) => (
              <div
                key={track.name}
                className="flex items-center justify-between p-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                    {track.name}
                  </span>
                </div>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                    track.status === "Building"
                      ? "text-blue-500 border-blue-500/30 bg-blue-500/10"
                      : "text-amber-600 dark:text-amber-300 border-amber-500/30 bg-amber-500/10"
                  }`}
                >
                  {track.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
