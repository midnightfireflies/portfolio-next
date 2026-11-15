"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)] bg-[var(--surface)]/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="06 / WRITING &amp; NOTES"
          title="Technical Notes &amp; Security Logs"
          subtitle="A dedicated space for forthcoming deep dives into CTF problem solving, Linux administration, and automation workflows."
        />

        {/* Clear, honest empty state */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] text-center flex flex-col items-center shadow-lg relative overflow-hidden">
          <div
            className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--accent-muted)] rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] mb-4">
            <BookOpen className="w-6 h-6" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)] mb-2">
            Technical Articles In Progress
          </h3>

          <p className="max-w-lg text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
            In keeping with strict authenticity, articles will only appear here as formal post-competition write-ups and engineering lab benchmarks are drafted.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl text-left font-mono text-xs mb-8">
            <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[var(--accent)] font-semibold block mb-1">01. CTF Walkthroughs</span>
              <span className="text-[var(--text-secondary)] text-[11px]">Deconstructing web &amp; cryptography challenges.</span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[var(--accent)] font-semibold block mb-1">02. Linux Security</span>
              <span className="text-[var(--text-secondary)] text-[11px]">Hardening guides &amp; system monitoring notes.</span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[var(--accent)] font-semibold block mb-1">03. Automation Logic</span>
              <span className="text-[var(--text-secondary)] text-[11px]">n8n orchestrations &amp; API pipeline patterns.</span>
            </div>
          </div>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-accent)] text-[var(--accent)] font-mono text-xs font-semibold hover:bg-[var(--accent-muted)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <span>Follow development on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
