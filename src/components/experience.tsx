"use client";

import React, { useState } from "react";
import {
  workExperience,
  educationHistory,
  certifications,
  awardsList,
} from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Briefcase,
  GraduationCap,
  Award,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Experience() {
  const [activeTab, setActiveTab] = useState<"experience" | "education" | "certifications">("experience");

  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="05 / RECORD"
          title="Experience, Education &amp; Credentials"
          subtitle="A verified chronological record of professional client engagements, academic foundations, and industry certifications."
        />

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-2 mb-10" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "experience"}
            onClick={() => setActiveTab("experience")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
              activeTab === "experience"
                ? "bg-[var(--accent)] text-[var(--bg-primary)] font-semibold shadow-sm"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)]"
            )}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work &amp; Leadership</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "education"}
            onClick={() => setActiveTab("education")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
              activeTab === "education"
                ? "bg-[var(--accent)] text-[var(--bg-primary)] font-semibold shadow-sm"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)]"
            )}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "certifications"}
            onClick={() => setActiveTab("certifications")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
              activeTab === "certifications"
                ? "bg-[var(--accent)] text-[var(--bg-primary)] font-semibold shadow-sm"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)]"
            )}
          >
            <BadgeCheck className="w-4 h-4" />
            <span>Certifications &amp; Awards</span>
          </button>
        </div>

        {/* Tab 1: Work Experience */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {workExperience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-xs text-[var(--accent)] mt-0.5">
                      {exp.organization} · {exp.type}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-secondary)] px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--border)] shrink-0 self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded font-mono text-[11px] bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Education */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {educationHistory.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                    {edu.degree}
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent)] px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--border)] shrink-0 self-start sm:self-center">
                    {edu.period}
                  </span>
                </div>
                <p className="font-mono text-xs text-[var(--text-secondary)] mb-3">
                  {edu.institution} · {edu.location}
                </p>
                {edu.details && (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Certifications & Awards */}
        {activeTab === "certifications" && (
          <div className="space-y-12">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">
                // Industry &amp; Academic Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)]">
                          {cert.category}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                          {cert.issued}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold font-display text-[var(--text-primary)] mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mb-2">{cert.issuer}</p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] font-mono text-[10px] text-[var(--text-secondary)] space-y-0.5">
                      {cert.credentialId && (
                        <div>ID: {cert.credentialId}</div>
                      )}
                      {cert.expires && (
                        <div>Valid until: {cert.expires}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Honors */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">
                // Honors &amp; Recognitions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {awardsList.map((award, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm"
                  >
                    <Award className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                        {award.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-xs text-[var(--accent)]">
                          {award.year}
                        </span>
                        {award.context && (
                          <>
                            <span className="opacity-30">·</span>
                            <span className="text-xs text-[var(--text-secondary)]">
                              {award.context}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
