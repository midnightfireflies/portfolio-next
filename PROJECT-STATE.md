# PROJECT-STATE.md

> **Owner:** Md. Sadman Siam  
> **Status:** 🟢 Complete & Verified — Interactive Terminal CLI Theme Isolation Fixed  
> **Last updated:** 2026-11-15  

---

## Workspace

| Key | Value |
|---|---|
| **Path** | `/Volumes/Mac Disk/Programming/portfolio-next` |
| **Git** | Configured with `.gitignore` (uncommitted local workspace, pending user push permission) |
| **node_modules** | ✅ Installed & verified |
| **TypeScript** | ✅ 100% clean strict type-check (`npx tsc --noEmit` exited code 0) |
| **Build Status** | ✅ Next.js 14.2.5 production build successful (`5/5` routes, 0 errors, 125 kB first load JS) |
| **Server Status** | ✅ Active at `http://localhost:3000` (HTTP 200 OK with strict security headers) |
| **Theme System** | ✅ Triple Mode (Dark / Light / System) with persistence, OS media query sync, and zero FOUT |
| **Terminal CLI** | ✅ 100% Theme-Isolated: Permanently dark, high-contrast, immune to global dark/light theme switching |
| **Background System**| ✅ Layered graphite/editorial base + technical grid + ambient radial lighting + network canvas + film grain |

---

## Interactive Terminal CLI Theme Isolation Diagnosis & Fix

### 1. Root Cause of Previous Issue:
- When the website was placed into Light Mode, global CSS variables changed `--text-primary` to dark charcoal (`#171B18`) and `--text-secondary` to dark grey-green (`#626B63`).
- Because terminal output elements, prompt echoes, and input controls used `var(--text-primary)` and `var(--text-secondary)`, they rendered dark text on top of the terminal's dark graphite background, creating near-zero contrast and making text unreadable.

### 2. Architectural Solution Implemented:
- **Dedicated Scoped Palette:** Created dedicated terminal tokens (`--term-*`) in `src/app/globals.css` scoped across `:root`, `[data-theme="light"]`, `[data-theme="dark"]`, and `.terminal-window`:
  - **Terminal background (`--term-bg`):** `#0B0F0E`
  - **Terminal header (`--term-header`):** `#151B18`
  - **Terminal border (`--term-border`):** `#29352D`
  - **Primary text (`--term-text`):** `#E6EDE7`
  - **Secondary text (`--term-secondary`):** `#A3B5A7`
  - **Prompt color (`--term-prompt`):** `#B6F09C`
  - **Command color (`--term-command`):** `#D7E8D3`
  - **Success color (`--term-success`):** `#9DE6A5`
  - **Error color (`--term-error`):** `#FF8585`
  - **Muted output (`--term-muted`):** `#8C9A8F`
- **Component Style Isolation:**
  - Applied inline style boundary on `.terminal-window` setting `backgroundColor: var(--term-bg)`, `borderColor: var(--term-border)`, and `color: var(--term-text)`.
  - Refactored all terminal commands (`help`, `about`, `skills`, `projects`, `security`, `contact`, error states), welcome banner, command history lines, quick command buttons, and input field (`caretColor: var(--term-prompt)`) to use the isolated `--term-*` variables.
- **Zero Regression:**
  - Command execution, history traversal (ArrowUp / ArrowDown), tab autocompletion, expand/collapse, clear button, and accessible plain-text view remain 100% operational.

---

## Files Changed

| File | Change Description |
|---|---|
| `src/app/globals.css` | Defined dedicated `--term-*` palette scoped to `:root, [data-theme="light"], [data-theme="dark"], .terminal-window` |
| `src/components/terminal.tsx` | Completely refactored terminal window, outputs, chips, titlebar, and input prompt to use `--term-*` tokens |
| `PROJECT-STATE.md` | Recorded terminal theme isolation diagnosis, implementation, and test verification |

---

## Verification & Test Results

- **TypeScript:** `npx tsc --noEmit` exited code 0 (Zero errors).
- **Production Build:** `npm run build` compiled 5/5 static pages in 2.8s without errors.
- **Color Audit:** 0 occurrences of inherited global text variables inside `.terminal-window`.
- **Server Health:** `curl -sI http://localhost:3000` returned HTTP 200 with strict CSP & HSTS.
- **Light/Dark Immunity:** Terminal background (`#0B0F0E`), header (`#151B18`), text (`#E6EDE7`), prompt (`#B6F09C`), and command echo (`#D7E8D3`) remain razor-sharp and identical regardless of whether Light, Dark, or System mode is selected.
