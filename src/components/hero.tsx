"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import {
  Github,
  Linkedin,
  FileText,
  ArrowRight,
  Shield,
  Terminal,
  ExternalLink,
} from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow & Status */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm mb-6 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="font-mono text-xs text-[var(--text-secondary)] tracking-wider uppercase">
            {siteConfig.eyebrow} · Savar, Dhaka
          </span>
        </div>

        {/* Profile Image with subtle accent border */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 rounded-full p-1 border border-[var(--border-accent)] bg-[var(--card-bg)] shadow-xl group">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/images/avatar.png"
              alt="Portrait of Md. Sadman Siam"
              fill
              priority
              sizes="(max-width: 640px) 112px, 144px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-accent)] text-[var(--accent)] shadow-sm"
            title="Cybersecurity & Software"
          >
            <Shield className="w-4 h-4" />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-[var(--text-primary)] mb-3">
          {siteConfig.name}
        </h1>

        {/* Headline */}
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-[var(--accent)] font-display mb-2">
          {siteConfig.headline}
        </p>

        {/* Subheadline */}
        <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] tracking-wide mb-6">
          {siteConfig.subheadline}
        </p>

        {/* Introduction */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
          {siteConfig.intro}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-semibold text-sm hover:opacity-90 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {siteConfig.resumePdf && (
            <a
              href={siteConfig.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] font-medium text-sm hover:border-[var(--border-accent)] hover:bg-[var(--surface)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <FileText className="w-4 h-4 text-[var(--accent)]" />
              <span>Download CV</span>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            </a>
          )}
        </div>

        {/* Verified Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-8" aria-label="Social Profiles">
          {siteConfig.github && (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              aria-label="GitHub Profile (opens in new tab)"
            >
              <Github className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>GitHub</span>
            </a>
          )}

          {siteConfig.linkedin && (
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              <Linkedin className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>LinkedIn</span>
            </a>
          )}

          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            aria-label="Direct Email"
          >
            <span className="text-[var(--accent)]">@</span>
            <span>Email</span>
          </a>
        </div>

        {/* Featured Achievement Callout Link */}
        <a
          href={`#${siteConfig.achievementBadge.targetId}`}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--text-secondary)] hover:border-[var(--border-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        >
          <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="text-[var(--text-primary)] font-semibold group-hover:text-[var(--accent)] transition-colors">
            {siteConfig.achievementBadge.label}
          </span>
          <span className="opacity-30">·</span>
          <span>{siteConfig.achievementBadge.sublabel}</span>
          <ArrowRight className="w-3 h-3 text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
