import React from "react";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card-bg)] py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-[var(--text-secondary)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-display font-semibold text-[var(--text-primary)] uppercase tracking-wider">
            {siteConfig.name}
          </span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>© {new Date().getFullYear()} · All verified records</span>
        </div>

        {/* Center/Right: Quick Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
          {siteConfig.github && (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
          )}
          {siteConfig.linkedin && (
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-[var(--accent)] transition-colors"
            aria-label="Direct Email"
          >
            Email
          </a>
          {siteConfig.resumePdf && (
            <a
              href={siteConfig.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
              aria-label="Resume PDF"
            >
              Resume
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
