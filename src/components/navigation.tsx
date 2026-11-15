"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Security Lab", href: "#security-lab" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Monitor scroll for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor active section
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)] py-3 shadow-md"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-2 text-sm font-mono tracking-wider font-semibold text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          aria-label="Sadman Siam Portfolio Home"
        >
          <span className="text-[var(--accent)] transition-transform duration-200 group-hover:scale-125">
            &gt;
          </span>
          <span className="tracking-tight uppercase font-display text-base">
            Sadman Siam
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors relative focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
                  isActive
                    ? "text-[var(--accent)] bg-[var(--accent-muted)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Resume & Theme Switcher & Mobile Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {siteConfig.resumePdf && (
            <a
              href={siteConfig.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-[var(--border-accent)] text-[var(--accent)] hover:bg-[var(--accent-muted)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              aria-label="View Resume PDF (opens in new tab)"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          )}

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[var(--text-primary)]" />
            ) : (
              <Menu className="w-5 h-5 text-[var(--text-primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] z-50 lg:hidden bg-[var(--nav-bg)] backdrop-blur-xl border-t border-[var(--border)] px-6 py-8 flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between",
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent-muted)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-4">
            {siteConfig.resumePdf && (
              <a
                href={siteConfig.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--accent)] hover:bg-[var(--accent-muted)] transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            )}
            <div className="text-center font-mono text-xs text-[var(--text-secondary)]">
              {siteConfig.location} · {siteConfig.email}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
