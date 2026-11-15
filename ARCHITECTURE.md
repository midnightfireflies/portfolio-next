# ARCHITECTURE.md

> **Status:** Proposed — awaiting approval before implementation.
> **Last updated:** 2026-11-15

---

## Stack Recommendation: Keep the Existing Stack

### Verdict: ✅ No migration needed

The existing `portfolio-next` package.json already matches your preferred stack
exactly. Every requested technology is already declared:

| You requested | In package.json | Decision |
|---|---|---|
| Next.js App Router | ✅ next 14.2.5 | Keep |
| TypeScript | ✅ typescript ^5 | Keep |
| Tailwind CSS | ✅ tailwindcss ^3.4.7 | Keep |
| Framer Motion (when useful) | ✅ framer-motion ^11.3.8 | Keep, use selectively |
| Lucide icons | ✅ lucide-react ^0.424.0 | Keep |
| Vercel deployment | — (not in pkg.json, it's infra) | Configured at deploy time |
| MDX (for blog/security lab) | ❌ Not installed | Add: `@next/mdx` + `@mdx-js/react` |
| GitHub API | ❌ Not configured | Client-side fetch (no package needed) |
| Contact form | ❌ Not decided | Use `mailto:` — no backend required |

**Only one new dependency is needed: MDX support.**
Everything else is already in place.

---

## Routes

This is a **single-page portfolio** with a few auxiliary routes for content.

```
app/
├── page.tsx                    # Main single-page portfolio (all sections)
├── layout.tsx                  # Root layout (nav, fonts, theme, toaster)
├── globals.css                 # Design tokens + base styles
│
├── blog/
│   └── page.tsx                # Blog index (placeholder / coming soon)
│
├── security-lab/
│   └── [slug]/
│       └── page.tsx            # Individual CTF write-up page (MDX)
│
├── og/                         # (Optional) Dynamic OG image generation
│   └── route.ts
│
└── sitemap.ts                  # Auto-generated sitemap
```

> [!NOTE]
> The main portfolio is intentionally a single scrolling page. Blog and
> Security Lab write-ups get their own routes because they are longform content
> that benefits from a dedicated reading layout (and their own OG images).

---

## Component Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   │
│   ├── layout/
│   │   ├── navigation.tsx          # Sticky nav, mobile drawer, theme toggle
│   │   ├── footer.tsx              # Minimal footer
│   │   └── back-to-top.tsx         # Fixed scroll-to-top button
│   │
│   ├── sections/                   # One file per page.tsx section
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── projects.tsx
│   │   ├── github-activity.tsx
│   │   ├── security-lab.tsx
│   │   ├── experience.tsx
│   │   ├── blog.tsx
│   │   └── contact.tsx
│   │
│   ├── ui/                         # Shared primitive components
│   │   ├── section-wrapper.tsx     # Shared padding/reveal animation wrapper
│   │   ├── section-eyebrow.tsx     # Mono eyebrow label (e.g. "// 01 ABOUT")
│   │   ├── tag.tsx                 # Skill/stack tag chip
│   │   ├── status-badge.tsx        # Working / Completed / Learning badge
│   │   ├── social-chip.tsx         # GH / IN / @ social link chip
│   │   ├── button.tsx              # Filled + ghost button variants
│   │   ├── toaster.tsx             # Toast notification (contact form feedback)
│   │   ├── project-drawer.tsx      # Off-canvas project navigator
│   │   └── local-clock.tsx         # Live Dhaka timezone clock
│   │
│   ├── theme-context.tsx           # Already exists — keep as-is
│   └── theme-provider.tsx          # Already exists — keep as-is
│
├── data/                           # Static content — TypeScript modules
│   ├── hero.ts
│   ├── about.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── experience.ts
│   ├── certifications.ts
│   ├── security-lab.ts             # Write-up metadata (MDX slugs + frontmatter)
│   └── site.ts                     # Name, email, socials, CV paths, timezone
│
├── content/                        # MDX longform content
│   └── security-lab/
│       └── *.mdx                   # One file per CTF write-up
│
└── lib/
    ├── github.ts                   # GitHub API fetch + types
    ├── mdx.ts                      # MDX loader utility
    └── utils.ts                    # cn() helper (clsx + tailwind-merge)
```

---

## Content Model

### `src/data/site.ts`
```ts
export const site = {
  name: 'Md. Sadman Siam',
  email: 'sadmansiam1110@gmail.com',
  github: 'https://github.com/midnightfireflies',
  githubUser: 'midnightfireflies',
  linkedin: 'https://www.linkedin.com/in/md-sadman-siam-3b41a136a/',
  location: 'Savar, Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  cvPDF: '/files/Sadman-Siam-CV.pdf',
  cvDOCX: '/files/Sadman-Siam-CV.docx',
}
```

### `src/data/projects.ts`
```ts
export type Project = {
  id: string
  tag: string               // 'AI AUTOMATION' | 'ALGORITHMS' | etc.
  status: 'Working' | 'Completed' | 'Learning' | 'Current'
  featured: boolean
  title: string
  description: string
  stack: string[]
  github?: string           // optional — only if repo is public
  demo?: string             // optional live URL
}
```

### `src/data/experience.ts`
```ts
export type ExperienceEntry = {
  period: string
  role: string
  place: string
  description: string
}
export type EducationEntry = {
  period: string
  title: string
  place: string
}
```

### `src/data/certifications.ts`
```ts
export type Certification = {
  title: string
  issuer: string
  issued: string
  expires?: string
  credentialId?: string
  category: string
  verifyUrl?: string
}
```

### `src/data/security-lab.ts`
```ts
export type WriteUp = {
  slug: string              // matches MDX filename
  title: string
  event: string             // 'DIU CTF 2026' | 'TryHackMe' | etc.
  platform: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  summary: string           // 1-2 sentence teaser
  date: string              // ISO date
}
```

### MDX write-up frontmatter (`content/security-lab/*.mdx`)
```mdx
---
title: "..."
event: "..."
platform: "..."
difficulty: "Hard"
tags: ["web", "ctf", "xss"]
date: "2026-01-01"
---

Write-up body in MDX...
```

---

## Data Organisation

```
public/
├── images/
│   └── avatar.png          # Copy from _original-source/static/image/avatar.png
├── files/
│   ├── Sadman-Siam-CV.pdf
│   └── Sadman-Siam-CV.docx
└── favicon.svg             # Copy from _original-source/static/favicon.svg
```

All portfolio content lives in `src/data/*.ts` as plain TypeScript arrays/objects.
Longform write-up content lives in `content/security-lab/*.mdx`.
No CMS, no database, no API calls for content — everything is static.

---

## API Boundaries

| Concern | Approach | Reason |
|---|---|---|
| GitHub live repos | Client-side `fetch()` in `<GitHubActivity />` | Same as original; graceful fallback if API rate-limited |
| Contact form | `mailto:` URI construction (client-side) | No backend required; matches original |
| Blog content | MDX files at build time | Static, fast, no API |
| Security Lab write-ups | MDX files at build time | Same |
| OG images | Optional: `@vercel/og` at `/og/route.ts` | Edge-rendered, no extra service |
| Analytics | None in scope | Add Vercel Analytics later if needed |

> [!IMPORTANT]
> The GitHub API is unauthenticated and rate-limited to 60 req/hour per IP.
> The component must gracefully fall back to a "View GitHub profile" link
> when the API is unavailable — exactly as the original did.

---

## Contact Form Approach

**Decision: `mailto:` URI, no backend.**

Rationale:
- Matches original Hugo behaviour exactly
- No third-party service account required (Formspree, Resend)
- No API key to manage or secure
- Perfectly appropriate for a personal portfolio

Implementation:
```ts
// On form submit, construct and open:
mailto:sadmansiam1110@gmail.com
  ?subject=<encoded subject>
  &body=Hi Sadman,%0A%0A<encoded message>%0A%0AFrom: <name>%0AEmail: <email>
```

A `<Toaster />` confirmation fires after the `mailto:` link is triggered.
If a backend is ever wanted, Resend + a Next.js Route Handler is a one-hour swap.

---

## Theme Approach

**Decision: Keep the existing `ThemeProvider` + extend it.**

The `theme-provider.tsx` and `theme-context.tsx` already exist and work.
Current implementation uses `data-theme` attribute on `<html>`.

Changes needed:
1. Persist theme preference to `localStorage` (not currently done)
2. Honour `prefers-color-scheme` on first visit (SSR-safe)
3. Add `suppressHydrationWarning` on `<html>` (already in layout.tsx ✅)
4. Update `globals.css` to use `:root` / `[data-theme="light"]` consistently

The existing `layout.tsx` also wraps a `next-themes`-style `ThemeProvider` with
`attribute="class"` — this conflicts with the custom `data-theme` provider.
**We will consolidate to a single provider using `data-theme`**, removing the
`next-themes`-style props from `layout.tsx`.

---

## Package Changes

### Keep (all already in package.json)
- next, react, react-dom
- typescript, @types/*
- tailwindcss, postcss, autoprefixer
- framer-motion
- lucide-react
- clsx, tailwind-merge
- date-fns

### Add (one dependency)
```bash
npm install @next/mdx @mdx-js/react
npm install -D @types/mdx
```

### Remove
- Nothing. No packages need to be removed.

### Explicitly not adding
| Package | Reason |
|---|---|
| shadcn/ui | Overkill for a portfolio; we build lean primitives |
| Resend / Formspree | `mailto:` is sufficient |
| next-themes | Custom ThemeProvider already exists |
| react-query / SWR | GitHub fetch is simple; native `fetch` + `useEffect` is enough |
| Prisma / Supabase | No database needed |
| Storybook | Out of scope |

---

## Testing Plan

Lightweight but meaningful. No unit tests for static data.

### What to test

| Type | Tool | What |
|---|---|---|
| Type checking | `tsc --noEmit` | All data types, component props |
| Lint | `next lint` (ESLint) | Already configured |
| Build | `next build` | No build errors, no unused imports |
| Visual / manual | Browser dev tools | Mobile (375px), tablet (768px), desktop (1280px) |
| Accessibility | Browser axe / Lighthouse | ARIA labels, focus order, colour contrast |
| Performance | Lighthouse | LCP, CLS, INP on production build |
| GitHub API fallback | Throttle in devtools | Confirm fallback renders correctly |
| Theme toggle | Manual | Dark → light → dark, persists on reload |
| Contact form | Manual | mailto: opens correctly, fields pre-fill |

### Not in scope
- E2E tests (Playwright / Cypress) — not needed for a static portfolio
- Unit tests for UI components — no business logic to test
- CI/CD pipelines — Vercel handles this automatically on push

---

## Deployment Approach

**Platform: Vercel**

| Step | Detail |
|---|---|
| Connect | Link GitHub repo to Vercel project |
| Framework preset | Next.js (auto-detected) |
| Build command | `next build` (default) |
| Output directory | `.next` (default) |
| Environment variables | None required (no API keys for MVP) |
| Domain | Vercel subdomain initially; custom domain later |
| Preview deployments | Auto on every pull request / branch push |
| Production | Auto on merge to `main` |

### Pre-deployment checklist
- [ ] `next build` passes with zero errors
- [ ] All images in `public/images/` (avatar, favicon, CV files)
- [ ] `baseURL` / canonical URL set in metadata
- [ ] OG image configured
- [ ] `robots.txt` in `public/`
- [ ] Lighthouse score ≥ 90 on all categories

---

## Migration Decision Summary

| Question | Decision |
|---|---|
| Keep Next.js App Router? | ✅ Yes — already the right choice |
| Keep TypeScript? | ✅ Yes |
| Keep Tailwind CSS? | ✅ Yes |
| Keep Framer Motion? | ✅ Yes — but only for scroll reveal, drawer, theme transition |
| Add MDX? | ✅ Yes — one small install for blog/security-lab |
| Add a CMS? | ❌ No — static TypeScript data files are sufficient |
| Add a form backend? | ❌ No — `mailto:` matches original behaviour |
| Replace ThemeProvider? | ❌ No — fix and consolidate what exists |
| Add shadcn/ui? | ❌ No — build lean custom primitives instead |
| Use Pages Router instead? | ❌ No — App Router is the right modern choice |
