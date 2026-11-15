# ASSET-INVENTORY.md

> **Source:** `_original-source/` — read-only reference clone
> **Last updated:** 2026-11-15

---

## Images

| File | Location in source | Size | Notes |
|---|---|---|---|
| `avatar.png` | `static/image/avatar.png` | 1.7 MB | Primary profile photo — **needs web optimisation (resize, convert to WebP)** |
| `avatar.png` | `public/images/avatar.png` | 1.7 MB | Hugo build output copy — same file |
| `as.png` | `public/images/as.png` | 1.7 MB | Secondary image — purpose unclear; possibly an alternate avatar or action shot |
| `favicon.svg` | `static/favicon.svg` | 344 B | SVG favicon — reusable as-is |
| `favicon.svg` | `public/favicon.svg` | 344 B | Hugo build output copy — same file |

### Action Required
- [ ] Copy `static/image/avatar.png` → `public/images/` in `portfolio-next`
- [ ] Resize and convert avatar to WebP (recommended: 400×400 and 800×800 for retina)
- [ ] Identify what `as.png` is and decide whether to use it
- [ ] Copy `static/favicon.svg` → `public/` in `portfolio-next`

---

## Documents / Downloads

| File | Location in source | Size | Notes |
|---|---|---|---|
| `Sadman-Siam-CV.pdf` | `static/files/Sadman-Siam-CV.pdf` | 214 KB | Resume — primary download |
| `Sadman-Siam-CV.docx` | `static/files/Sadman-Siam-CV.docx` | 509 KB | Resume — Word format |

### Action Required
- [ ] Copy both CV files to `public/files/` in `portfolio-next`

---

## CSS

| File | Lines | Size | Notes |
|---|---|---|---|
| `assets/css/main.css` | 1,036 | 37 KB | Full custom stylesheet — no framework, no dependencies |
| `public/css/main.min.*.css` | — | — | Hugo fingerprinted minified build output — do not use directly |

### Design tokens extracted from main.css
Refer to `TECH-STACK-AUDIT.md` for full design token analysis.

---

## JavaScript

| File | Lines | Notes |
|---|---|---|
| `assets/js/main.js` | 179 | Vanilla JS IIFE — no dependencies |
| `public/js/main.min.*.js` | — | Hugo fingerprinted build output — do not use directly |

### JS features implemented
| Feature | Lines | Carry to Next.js? |
|---|---|---|
| Sticky nav scroll state (`is-scrolled`) | 9–14 | ✅ Yes — replicate in Navigation component |
| Mobile menu toggle (open/close) | 16–31 | ✅ Yes |
| Theme toggle (dark/light via `data-theme`) | 33–39 | ✅ Already implemented in `theme-provider.tsx` |
| IntersectionObserver scroll reveal (`.reveal`) | 41–54 | ✅ Yes — convert to Framer Motion `whileInView` |
| Live local clock (Dhaka timezone) | 56–74 | ✅ Yes — in Contact section |
| Contact form → mailto link | 76–88 | ✅ Yes |
| GitHub REST API live repos | 90–137 | ✅ Yes — in `<GitHubActivity />` component |
| Project off-canvas drawer | 140–179 | ✅ Yes — convert to React state + Framer Motion |

---

## Hugo Templates (layout reference only — not reused)

| File | Purpose |
|---|---|
| `layouts/index.html` | Full single-page homepage — 295 lines, all 9 sections |
| `layouts/partials/nav.html` | Sticky nav with theme toggle and mobile hamburger |
| `layouts/partials/footer.html` | Footer with copyright, GitHub, LinkedIn, Email |
| `layouts/partials/head.html` | HTML `<head>` with meta tags and font loading |
| `layouts/_default/baseof.html` | Base HTML shell |
| `layouts/_default/single.html` | Single-page content template |
| `layouts/404.html` | 404 error page |

---

## Data Files

| File | Purpose |
|---|---|
| `data/portfolio.toml` | Master data file — all portfolio content (238 lines) |
| `hugo.toml` | Hugo config — site params, contact links, SEO meta |

---

## Content Markdown Files

| File | Purpose |
|---|---|
| `content/about.md` | About page standalone route |
| `content/projects.md` | Projects page standalone route |
| `content/experience.md` | Experience page standalone route |
| `content/achievements.md` | Achievements page standalone route |
| `content/contact.md` | Contact page standalone route |

> [!NOTE]
> These are Hugo-specific standalone pages. In the Next.js rebuild, all content lives in the single-page layout and is driven from TypeScript data files rather than Markdown.

---

## What Is Missing

| Asset | Status |
|---|---|
| OG / social share image | ❌ Not present |
| Twitter card image | ❌ Not present |
| App icon / apple-touch-icon | ❌ Not present |
| Any project screenshots or thumbnails | ❌ Not present |
| Security lab write-up assets | ❌ Not present |
| Blog post images | ❌ Not present — blog section not in original |
