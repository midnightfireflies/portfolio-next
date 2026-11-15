# TECH-STACK-AUDIT.md

> Comparison of original portfolio stack vs. the new portfolio-next stack.
> Last updated: 2026-11-15

---

## Original Portfolio — Stack

| Layer | Technology | Notes |
|---|---|---|
| Static site generator | **Hugo** (0.166.x) | No npm, no PostCSS, no bundler |
| Templating | Go HTML templates | `layouts/` directory |
| Styling | Custom CSS (1,036 lines, 37 KB) | No utility framework |
| JavaScript | Vanilla JS (179 lines, 1 IIFE) | No libraries, no framework |
| Data | TOML (`data/portfolio.toml`) | Single master data file |
| Content | Markdown (`content/*.md`) | Hugo content pages |
| Fonts | System font stack + variable font (from CSS) | No external font loading |
| Icons | Unicode / emoji characters | No icon library |
| GitHub API | Vanilla `fetch()` in JS | Live repo tiles with graceful fallback |
| Contact form | `mailto:` link construction | No backend required |
| Theme | CSS `data-theme` attribute + `localStorage` | Dark/light |
| Deployment | Static HTML output in `public/` | Hugo Pages, Netlify, Cloudflare Pages |

---

## New Portfolio — Target Stack (portfolio-next)

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | 14.2.5 |
| Language | **TypeScript** | ^5 |
| UI | **React** | ^18 |
| Styling | **Tailwind CSS** | ^3.4.7 |
| Animation | **Framer Motion** | ^11.3.8 |
| Icons | **Lucide React** | ^0.424.0 |
| Utility | clsx + tailwind-merge | ^2.1.1 / ^2.4.0 |
| Dates | date-fns | ^3.6.0 |
| Fonts | Inter, Space Grotesk, JetBrains Mono (via `next/font`) | — |
| Data | TypeScript data files (to be created in `data/`) | — |
| GitHub API | Server Component or client `fetch()` | TBD |
| Contact | `mailto:` or Resend/Formspree | TBD |
| Deployment | **Vercel** (natural fit for Next.js) | TBD |

---

## Design System — Original CSS Tokens

Extracted directly from `assets/css/main.css`.

### Colour palette

| Variable | Dark | Light |
|---|---|---|
| `--bg` | `#0d0d0d` | `#f7f7f5` |
| `--bg-alt` | `#141414` | `#eceae4` |
| `--text` | `#e8e6e0` | `#141414` |
| `--text-muted` | `#888` | `#666` |
| `--accent` | `#c8f07a` (yellow-green) | `#3a7a00` |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.1)` |
| `--nav-bg` | `rgba(13,13,13,0.9)` | `rgba(247,247,245,0.9)` |

> [!IMPORTANT]
> The original accent is **`#c8f07a`** (yellow-green). The new portfolio-next design system uses **`#B6F09C`** (lighter green). These are close but not identical. Confirm which to use.

### Typography

| Role | Font | Weight |
|---|---|---|
| Body | System: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | 400 |
| Headings | Same system stack | 700 / 800 |
| Mono / code | `'JetBrains Mono', 'Fira Code', monospace` | 400 |
| Eyebrow labels | System, uppercase, letter-spacing | 500 |

> [!NOTE]
> The new Next.js stack replaces the system font with **Inter** (body) and **Space Grotesk** (display). JetBrains Mono is preserved for code/terminal. This is an intentional upgrade.

### Layout

| Token | Value |
|---|---|
| Nav height | 60px (desktop), 56px (mobile) |
| Section padding | `clamp(80px, 12vw, 140px)` top/bottom |
| Max content width | 1120px (`--shell`) |
| Wide shell | 1320px |
| Grid gap | 24px / 32px |
| Border radius (cards) | 12px |
| Border radius (tags) | 6px |

### Animations (original)

| Effect | Mechanism |
|---|---|
| Scroll reveal | `IntersectionObserver` → `.is-visible` class + CSS `opacity/translateY` |
| Nav scroll state | Scroll event → `.is-scrolled` class |
| Theme transition | CSS `transition: background-color 0.3s, color 0.3s` |
| Mobile menu | CSS `transform: translateX` + `.is-open` |
| Project drawer | CSS `transform: translateX` + `aria-hidden` |

**Next.js equivalent:** All of these will be replaced with Framer Motion (`whileInView`, `AnimatePresence`, `motion.div`).

---

## Feature Parity Checklist

| Original Feature | New Site Plan | Status |
|---|---|---|
| Sticky nav + scroll state | `<Navigation />` with Framer Motion | ⬜ Not started |
| Mobile hamburger menu | `<Navigation />` with React state | ⬜ Not started |
| Dark / light theme toggle | `theme-provider.tsx` already exists | ✅ Partial |
| Hero section (name, links, CTA, badge) | `<Hero />` | ⬜ Not started |
| About (bio, meta tags) | `<About />` | ⬜ Not started |
| Focus areas (3-card grid) | Part of `<About />` or `<Skills />` | ⬜ Not started |
| Skills (categorised tags) | `<Skills />` | ⬜ Not started |
| Currently learning list | Part of `<Skills />` | ⬜ Not started |
| Achievement hero section | `<SecurityLab />` or standalone | ⬜ Not started |
| Projects gallery + status badges | `<Projects />` | ⬜ Not started |
| Project off-canvas drawer | Part of `<Projects />` with Framer Motion | ⬜ Not started |
| GitHub live repo tiles | `<GitHubActivity />` | ⬜ Not started |
| Experience timeline | `<Experience />` | ⬜ Not started |
| Education section | Part of `<Experience />` | ⬜ Not started |
| Certifications credential cards | `<Experience />` or standalone | ⬜ Not started |
| Awards / recognitions list | Part of `<Experience />` | ⬜ Not started |
| Contact form → mailto | `<Contact />` | ⬜ Not started |
| Live local clock (Dhaka) | `<Contact />` | ⬜ Not started |
| Footer | `<footer>` in `layout.tsx` | ⬜ Not started |
| Back to top button | `<BackToTop />` | ⬜ Not started |
| Scroll reveal animation | Framer Motion `whileInView` | ⬜ Not started |
| Favicon SVG | Copy from original | ⬜ Not started |
| CV download links | Public files + nav | ⬜ Not started |
| **Blog section** | `<Blog />` — **not in original** | ⚠️ New addition |
| **Security lab write-ups** | `<SecurityLab />` — **not in original** | ⚠️ New addition |

---

## New Additions vs Original

The `page.tsx` in `portfolio-next` includes two sections that do not exist in the original Hugo site:

1. **`<Blog />`** — requires blog post content (none exists yet)
2. **`<SecurityLab />`** — referenced as a section distinct from the Achievement block; needs content definition

Both require content decisions before implementation can begin.

---

## Recommended Data File Structure (portfolio-next)

Replace `data/portfolio.toml` with TypeScript modules:

```
src/data/
├── hero.ts          # name, headline, intro, CTAs
├── about.ts         # bio paragraphs, meta labels, focus areas
├── skills.ts        # skill categories + items + learning tracks
├── projects.ts      # project cards with links and stack
├── experience.ts    # experience timeline + education + certifications + awards
├── github.ts        # GitHub username config
└── contact.ts       # email, socials, CV paths
```
