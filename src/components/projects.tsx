"use client";

import React, { useState } from "react";
import {
  projectsData,
  projectCategories,
  ProjectCategory,
  Project,
} from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Modal } from "@/components/ui/modal";
import {
  Github,
  ExternalLink,
  Terminal,
  CheckCircle2,
  Clock,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FilterCategory = "All" | ProjectCategory;

export function Projects() {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--border-accent)]">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case "Working":
      case "Current":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/30">
            <Clock className="w-3 h-3" />
            <span>Active</span>
          </span>
        );
      case "Learning":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            <span>Learning</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
            <Archive className="w-3 h-3" />
            <span>Archived</span>
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="03 / PROJECTS"
          title="Engineered Work &amp; Applied Systems"
          subtitle="Real projects across algorithms, workflow automation, cybersecurity practice, and web systems."
        />

        {/* Category Filters */}
        <div
          className="flex flex-wrap items-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
                  isSelected
                    ? "bg-[var(--accent)] text-[var(--bg-primary)] font-semibold shadow-sm"
                    : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)]"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={cn(
                "relative flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[var(--card-bg)] border transition-all duration-300 shadow-md group",
                project.featured
                  ? "border-[var(--border-accent)] md:col-span-2 shadow-lg"
                  : "border-[var(--border)] hover:border-[var(--border-accent)]"
              )}
            >
              <div>
                {/* Header: Category & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                      {project.category}
                    </span>
                    <span className="opacity-30">·</span>
                    <span className="font-mono text-xs text-[var(--text-secondary)]">
                      {project.date}
                    </span>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="font-mono text-xs text-[var(--accent)] mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Footer: Tech Stack & Actions */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[var(--border)]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md font-mono text-[11px] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Inspect Details &gt;</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {project.repositoryUrl ? (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] text-[var(--text-disabled)] cursor-default">
                        Internal / Academic
                      </span>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent)] hover:underline"
                        aria-label={`Open ${project.title} live demo`}
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for In-depth Project Details */}
        <Modal
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
          title={activeProject?.title || "Project Overview"}
        >
          {activeProject && (
            <div className="space-y-6">
              {/* Metadata strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs">
                <div>
                  <span className="text-[var(--text-secondary)]">Category: </span>
                  <span className="text-[var(--accent)] font-semibold">{activeProject.category}</span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)]">Timeline: </span>
                  <span className="text-[var(--text-primary)]">{activeProject.date}</span>
                </div>
                <div>
                  {getStatusBadge(activeProject.status)}
                </div>
              </div>

              {/* Problem statement */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">
                  // Objective &amp; Problem
                </h4>
                <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
                  {activeProject.details.problem}
                </p>
              </div>

              {/* Solution breakdown */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">
                  // Technical Solution
                </h4>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {activeProject.details.solution}
                </p>
              </div>

              {/* Architecture Highlights */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">
                  // Key Highlights &amp; Architecture
                </h4>
                <ul className="space-y-2 font-mono text-xs text-[var(--text-primary)]">
                  {activeProject.details.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 p-2 rounded bg-[var(--surface)] border border-[var(--border)]">
                      <span className="text-[var(--accent)] font-bold">&gt;</span>
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((t: string) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded font-mono text-xs bg-[var(--surface)] border border-[var(--border-accent)] text-[var(--accent)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons in modal */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                {activeProject.repositoryUrl ? (
                  <a
                    href={activeProject.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-semibold text-xs font-mono hover:opacity-90 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    Repository: Coursework / Private Client
                  </span>
                )}

                <button
                  onClick={() => setActiveProject(null)}
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
