"use client";

import React, { useState } from "react";
import {
  securityAchievements,
  securityWriteups,
  SecurityLabWriteup,
} from "@/data/security-lab";
import { SectionHeading } from "@/components/ui/section-heading";
import { Modal } from "@/components/ui/modal";
import {
  Shield,
  Trophy,
  Terminal,
  Flag,
  Calendar,
  Lock,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SecurityLab() {
  const [selectedWriteup, setSelectedWriteup] = useState<SecurityLabWriteup | null>(null);

  return (
    <section
      id="security-lab"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)] bg-[var(--surface)]/30"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="04 / SECURITY LAB"
          title="Cybersecurity Operations &amp; CTF Achievements"
          subtitle="Competitive Capture The Flag (CTF) results, ethical security practice, and documented technical lab analysis."
        />

        {/* Featured Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {securityAchievements.map((achieve, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl bg-[var(--card-bg)] border border-[var(--border-accent)] shadow-lg relative overflow-hidden flex flex-col justify-between group"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-muted)] rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[var(--accent)]" />
                    <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                      {achieve.roleOrPlacement}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-secondary)] px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                    {achieve.year}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-2">
                  {achieve.title}
                </h3>
                <p className="font-mono text-xs text-[var(--accent)] mb-1">
                  {achieve.event}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mb-4">
                  {achieve.organization}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {achieve.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                {achieve.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTF Writeups & Lab Exercises */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-semibold mb-1">
                Field Notes &amp; Analysis
              </p>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)]">
                Technical Lab Write-ups
              </h3>
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              Documented Methodology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityWriteups.map((writeup) => (
              <div
                key={writeup.id}
                className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-semibold text-[var(--accent)]">
                      {writeup.category}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                      {writeup.difficulty}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-[var(--text-primary)] mb-2 leading-snug">
                    {writeup.title}
                  </h4>

                  <p className="font-mono text-xs text-[var(--text-secondary)] mb-3">
                    {writeup.platformOrEvent} · {writeup.date}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {writeup.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedWriteup(writeup)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Read Summary &gt;</span>
                  </button>

                  <span className="font-mono text-[10px] text-[var(--text-secondary)] px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">
                    {writeup.status}
                  </span>
                </div>
              </div>
            ))}

            {/* Editable Placeholder for Future Writeups */}
            <div className="p-6 rounded-xl bg-[var(--card-bg)]/60 border border-dashed border-[var(--border)] flex flex-col justify-center items-center text-center py-10">
              <div className="p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-3 text-[var(--accent)]">
                <Flag className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-[var(--text-primary)] text-base mb-1">
                More CTF Write-ups Forthcoming
              </h4>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mb-4 leading-relaxed">
                Ongoing competition notes and TryHackMe/HackTheBox challenge solutions will be published here upon completion of active trials.
              </p>
              <span className="font-mono text-[10px] text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-1 rounded-full border border-[var(--border-accent)]">
                Active Queue
              </span>
            </div>
          </div>
        </div>

        {/* Modal for Writeup Details */}
        <Modal
          isOpen={!!selectedWriteup}
          onClose={() => setSelectedWriteup(null)}
          title={selectedWriteup?.title || "Security Lab Write-up"}
        >
          {selectedWriteup && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs">
                <div>
                  <span className="text-[var(--text-secondary)]">Category: </span>
                  <span className="text-[var(--accent)] font-semibold">
                    {selectedWriteup.category}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)]">Difficulty: </span>
                  <span className="text-[var(--text-primary)] font-semibold">
                    {selectedWriteup.difficulty}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)]">Platform: </span>
                  <span className="text-[var(--text-primary)]">
                    {selectedWriteup.platformOrEvent}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">
                  // Executive Summary
                </h4>
                <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
                  {selectedWriteup.summary}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">
                  // Key Technical Takeaways
                </h4>
                <ul className="space-y-2 font-mono text-xs text-[var(--text-primary)]">
                  {selectedWriteup.keyLearnings.map((learn, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 p-2.5 rounded bg-[var(--surface)] border border-[var(--border)]"
                    >
                      <span className="text-[var(--accent)] font-bold">&gt;</span>
                      <span className="leading-snug">{learn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                <button
                  onClick={() => setSelectedWriteup(null)}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
