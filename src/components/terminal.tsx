"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { aboutData } from "@/data/about";
import { skillCategories } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { securityAchievements, securityWriteups } from "@/data/security-lab";
import {
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  Trash2,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OutputItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "security",
  "contact",
  "clear",
] as const;

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<OutputItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAccessibleView, setShowAccessibleView] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome banner
  useEffect(() => {
    const welcomeItem: OutputItem = {
      id: "welcome-banner",
      command: "welcome",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      output: (
        <div className="space-y-2 text-xs sm:text-sm font-mono">
          <p className="text-[var(--term-prompt)] font-semibold">
            Md. Sadman Siam — Interactive Terminal v1.0.0 (Portfolio Emulator)
          </p>
          <p className="text-[var(--term-secondary)]">
            Type <span className="text-[var(--term-prompt)] font-semibold">help</span> to view available commands, or tap the quick command chips below.
          </p>
          <p className="text-[11px] text-[var(--term-muted)] italic">
            [Notice: This terminal is an in-browser portfolio explorer. It does not execute real system or security commands.]
          </p>
        </div>
      ),
    };
    setHistory([welcomeItem]);
  }, []);

  // Scroll to bottom on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandExecution = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Record in command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);

    const lowerCmd = trimmed.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (lowerCmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let resultNode: React.ReactNode = null;

    switch (lowerCmd) {
      case "help":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[var(--term-prompt)] font-semibold">Supported Portfolio Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[var(--term-text)] pl-2">
              <div>
                <span className="text-[var(--term-prompt)] font-bold">help</span>
                <span className="text-[var(--term-secondary)]"> — Display this command reference</span>
              </div>
              <div>
                <span className="text-[var(--term-prompt)] font-bold">about</span>
                <span className="text-[var(--term-secondary)]"> — Background, education &amp; focus</span>
              </div>
              <div>
                <span className="text-[var(--term-prompt)] font-bold">skills</span>
                <span className="text-[var(--term-secondary)]"> — Categorized technical toolkit</span>
              </div>
              <div>
                <span className="text-[var(--term-prompt)] font-bold">projects</span>
                <span className="text-[var(--term-secondary)]"> — Verified software &amp; lab projects</span>
              </div>
              <div>
                <span className="text-[var(--term-prompt)] font-bold">security</span>
                <span className="text-[var(--term-secondary)]"> — CTF results &amp; lab analysis</span>
              </div>
              <div>
                <span className="text-[var(--term-prompt)] font-bold">contact</span>
                <span className="text-[var(--term-secondary)]"> — Email, LinkedIn, GitHub &amp; resume</span>
              </div>
              <div>
                <span className="text-[var(--term-prompt)] font-bold">clear</span>
                <span className="text-[var(--term-secondary)]"> — Reset the terminal screen</span>
              </div>
            </div>
            <p className="text-[11px] text-[var(--term-muted)] pt-1">
              Tip: Use Up/Down arrow keys for history navigation and Tab for command completion.
            </p>
          </div>
        );
        break;

      case "about":
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-[var(--term-text)]">
            <p className="text-[var(--term-prompt)] font-semibold">{siteConfig.name}</p>
            <p className="text-[var(--term-secondary)]">{siteConfig.headline}</p>
            <p className="text-[var(--term-secondary)]">{siteConfig.subheadline}</p>
            <p className="pt-1 text-[var(--term-secondary)] leading-relaxed max-w-2xl">
              {aboutData.paragraphs[0]}
            </p>
            <div className="pt-2 text-[11px] text-[var(--term-secondary)]">
              <span className="text-[var(--term-prompt)] font-semibold">Active Focus: </span>
              {aboutData.focusTracks.map((t) => `${t.title} [${t.status}]`).join(" · ")}
            </div>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-3 text-xs font-mono">
            <p className="text-[var(--term-prompt)] font-semibold">Verified Technical Stack:</p>
            {skillCategories.map((cat) => (
              <div key={cat.category} className="pl-2 border-l border-[var(--term-border)]">
                <span className="text-[var(--term-prompt)] text-[11px] uppercase tracking-wider block font-bold">
                  {cat.title}
                </span>
                <p className="text-[var(--term-text)] text-xs">
                  {cat.skills.map((s) => s.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-3 text-xs font-mono">
            <p className="text-[var(--term-prompt)] font-semibold">Verified Projects &amp; Software Work:</p>
            <div className="space-y-2 pl-2">
              {projectsData.map((p, idx) => (
                <div key={p.id} className="border-b border-[var(--term-border)]/50 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--term-prompt)] font-bold">0{idx + 1}.</span>
                    <span className="text-[var(--term-text)] font-semibold">{p.title}</span>
                    <span className="text-[10px] text-[var(--term-secondary)] px-1.5 py-0.5 rounded bg-[var(--term-header)] border border-[var(--term-border)]">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--term-secondary)] mt-0.5">{p.description}</p>
                  <p className="text-[10px] text-[var(--term-prompt)] mt-1">
                    Stack: {p.technologies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "security":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[var(--term-prompt)] font-semibold">Cybersecurity Operations &amp; CTF Honors:</p>
            <div className="space-y-2 pl-2">
              {securityAchievements.map((ach, i) => (
                <div key={i} className="text-[var(--term-text)]">
                  <span className="text-[var(--term-prompt)] font-bold">[{ach.roleOrPlacement}]</span>{" "}
                  <span className="font-semibold">{ach.title}</span> — {ach.event} ({ach.year})
                  <p className="text-[11px] text-[var(--term-secondary)] mt-0.5">{ach.description}</p>
                </div>
              ))}
              <div className="pt-2">
                <span className="text-[var(--term-prompt)] font-bold">Lab Exercises:</span>
                <ul className="list-disc pl-4 text-[11px] text-[var(--term-secondary)] mt-1 space-y-1">
                  {securityWriteups.map((w) => (
                    <li key={w.id}>
                      <span className="text-[var(--term-text)]">{w.title}</span> ({w.category}) — {w.summary}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-[var(--term-text)]">
            <p className="text-[var(--term-prompt)] font-semibold">Verified Contact Endpoints:</p>
            <p>
              <span className="text-[var(--term-secondary)]">Email:</span>{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-[var(--term-prompt)] underline hover:opacity-80">
                {siteConfig.email}
              </a>
            </p>
            <p>
              <span className="text-[var(--term-secondary)]">GitHub:</span>{" "}
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-[var(--term-prompt)] underline hover:opacity-80">
                {siteConfig.github}
              </a>
            </p>
            <p>
              <span className="text-[var(--term-secondary)]">LinkedIn:</span>{" "}
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--term-prompt)] underline hover:opacity-80">
                {siteConfig.linkedin}
              </a>
            </p>
            <p>
              <span className="text-[var(--term-secondary)]">Location:</span> {siteConfig.location}
            </p>
          </div>
        );
        break;

      default:
        resultNode = (
          <div className="text-xs font-mono space-y-1">
            <p className="text-[var(--term-error)]">
              command not found: {trimmed}
            </p>
            <p className="text-[var(--term-muted)] text-[11px]">
              Type <span className="text-[var(--term-prompt)]">help</span> to list available commands.
            </p>
          </div>
        );
        break;
    }

    const newItem: OutputItem = {
      id: Math.random().toString(36).substring(2, 9),
      command: trimmed,
      output: resultNode,
      timestamp,
    };

    setHistory((prev) => [...prev, newItem]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // History traversal: Up
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
      return;
    }

    // History traversal: Down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(null);
        setInputVal("");
      }
      return;
    }

    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (!inputVal.trim()) return;
      const match = AVAILABLE_COMMANDS.find((c) =>
        c.startsWith(inputVal.trim().toLowerCase())
      );
      if (match) {
        setInputVal(match);
      }
      return;
    }

    // Enter execution
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommandExecution(inputVal);
      return;
    }

    // Ctrl+L to clear screen
    if ((e.ctrlKey || e.metaKey) && e.key === "l") {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <section
      id="terminal"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)] bg-[var(--surface)]/20"
      aria-label="Interactive Portfolio Terminal"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section title & accessibility toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-[var(--accent)]" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
              Interactive Terminal CLI
            </h2>
          </div>
          <button
            onClick={() => setShowAccessibleView(!showAccessibleView)}
            className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline self-start sm:self-center focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            {showAccessibleView ? "Hide Accessible Text View" : "Toggle Accessible Plain-Text View"}
          </button>
        </div>

        {/* Accessible Plain-Text Fallback Region */}
        {showAccessibleView && (
          <div
            className="p-5 mb-6 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] space-y-4"
            role="region"
            aria-label="Terminal Plain Text Fallback"
          >
            <p className="text-[var(--text-primary)] font-semibold">
              Accessible Terminal Content Reference:
            </p>
            <div>
              <strong className="text-[var(--accent)]">Identity:</strong> {siteConfig.name} — {siteConfig.headline} ({siteConfig.subheadline})
            </div>
            <div>
              <strong className="text-[var(--accent)]">Commands Supported:</strong> help, about, skills, projects, security, contact, clear
            </div>
            <div>
              <strong className="text-[var(--accent)]">Verified Email:</strong> {siteConfig.email} | Location: {siteConfig.location}
            </div>
          </div>
        )}

        {/* Dedicated Theme-Isolated Terminal Window */}
        <div
          onClick={() => inputRef.current?.focus()}
          style={{
            backgroundColor: "var(--term-bg)",
            borderColor: "var(--term-border)",
            color: "var(--term-text)",
          }}
          className={cn(
            "terminal-window rounded-xl border shadow-2xl overflow-hidden font-mono transition-all duration-300 flex flex-col cursor-text select-text",
            isExpanded ? "min-h-[550px]" : "min-h-[380px]"
          )}
        >
          {/* Title Bar */}
          <div
            style={{
              backgroundColor: "var(--term-header)",
              borderBottomColor: "var(--term-border)",
            }}
            className="flex items-center justify-between px-4 py-3 border-b select-none"
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#B6F09C]/80 inline-block" />
              <span className="ml-2 text-xs text-[var(--term-secondary)] font-medium hidden sm:inline">
                visitor@siam-portfolio: ~ (bash emulator)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([]);
                }}
                className="p-1 rounded text-[var(--term-secondary)] hover:text-[var(--term-text)] hover:bg-white/5 transition-colors focus-visible:outline-1 focus-visible:outline-[var(--term-prompt)]"
                title="Clear terminal screen"
                aria-label="Clear terminal screen"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-1 rounded text-[var(--term-secondary)] hover:text-[var(--term-text)] hover:bg-white/5 transition-colors focus-visible:outline-1 focus-visible:outline-[var(--term-prompt)]"
                title={isExpanded ? "Collapse height" : "Expand height"}
                aria-label={isExpanded ? "Collapse height" : "Expand height"}
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Terminal Output Log Area */}
          <div
            className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[480px] text-xs sm:text-sm"
            role="log"
            aria-live="polite"
          >
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5 animate-fade-in">
                {item.command !== "welcome" && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[var(--term-prompt)] font-semibold">visitor@siam:~$</span>
                    <span className="text-[var(--term-command)] font-bold">{item.command}</span>
                    <span className="text-[10px] text-[var(--term-muted)] ml-auto">{item.timestamp}</span>
                  </div>
                )}
                <div className="pl-0 sm:pl-3 text-[var(--term-text)] break-words">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Command Chips (Mobile & Desktop Touch Support) */}
          <div
            style={{
              backgroundColor: "var(--term-header)",
              borderTopColor: "var(--term-border)",
            }}
            className="px-4 py-2 border-t flex flex-wrap items-center gap-1.5 select-none"
          >
            <span className="text-[10px] text-[var(--term-secondary)] mr-1 hidden sm:inline">Commands:</span>
            {AVAILABLE_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommandExecution(cmd);
                  inputRef.current?.focus();
                }}
                style={{
                  backgroundColor: "var(--term-bg)",
                  borderColor: "var(--term-border)",
                  color: "var(--term-prompt)",
                }}
                className="px-2 py-0.5 rounded font-mono text-[11px] border hover:opacity-85 transition-opacity"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Command Prompt Input Area */}
          <div
            style={{
              backgroundColor: "var(--term-header)",
              borderTopColor: "var(--term-border)",
            }}
            className="p-3 sm:p-4 border-t flex items-center gap-2"
          >
            <span className="text-[var(--term-prompt)] font-semibold text-xs sm:text-sm shrink-0">
              visitor@siam:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. help, projects, skills)..."
              style={{
                color: "var(--term-text)",
                caretColor: "var(--term-prompt)",
              }}
              className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm font-mono placeholder-[var(--term-muted)] focus:outline-none"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              aria-label="Terminal command input"
            />
            <button
              type="button"
              onClick={() => handleCommandExecution(inputVal)}
              disabled={!inputVal.trim()}
              style={{
                backgroundColor: "rgba(182, 240, 156, 0.12)",
                borderColor: "rgba(182, 240, 156, 0.35)",
                color: "var(--term-prompt)",
              }}
              className="px-2.5 py-1 rounded border text-xs font-mono hover:bg-[var(--term-prompt)] hover:text-[var(--term-bg)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Run command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
