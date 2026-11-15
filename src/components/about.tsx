"use client";

import React from "react";
import { aboutData } from "@/data/about";
import { SectionHeading } from "@/components/ui/section-heading";
import { Code2, ShieldAlert, Cpu, CheckCircle2 } from "lucide-react";

export function About() {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-5 h-5 text-[var(--accent)]" />;
      case 1:
        return <ShieldAlert className="w-5 h-5 text-[var(--accent)]" />;
      case 2:
        return <Cpu className="w-5 h-5 text-[var(--accent)]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={aboutData.eyebrow}
          title={aboutData.heading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-5 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
            {aboutData.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            {/* Quick Meta Stats */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[var(--border)]">
              {aboutData.meta.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] mb-1">
                    {m.label}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)] leading-snug">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars: Programming, Security, Automation */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {aboutData.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    {getPillarIcon(idx)}
                  </div>
                  <h3 className="text-base font-semibold font-display text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pl-1">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus Tracks */}
        <div className="mt-12 pt-12 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-semibold mb-1">
                Active Trajectory
              </p>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)]">
                Current Focus &amp; Learning Tracks
              </h3>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs text-[var(--text-secondary)]">
              Continuous Study
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.focusTracks.map((track) => (
              <div
                key={track.number}
                className="relative flex flex-col p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all shadow-md group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                    {track.number}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-semibold border ${
                      track.status === "Active"
                        ? "bg-[var(--accent-muted)] text-[var(--accent)] border-[var(--border-accent)]"
                        : track.status === "Building"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/30"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {track.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-display text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {track.title}
                </h4>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
                  {track.description}
                </p>

                <ul className="space-y-2 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-primary)]/90 font-mono">
                  {track.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] mt-0.5">&gt;</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
