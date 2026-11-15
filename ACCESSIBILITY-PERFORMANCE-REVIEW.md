# ACCESSIBILITY-PERFORMANCE-REVIEW.md

> **Target:** `portfolio-next`
> **Owner:** Md. Sadman Siam
> **Date of Audit:** 2026-11-15
> **Methodology:** Code inspection, DOM structure analysis, keyboard navigation testing, build bundle metrics, and standards compliance verification.

---

## Part 1: Accessibility (A11y) Review

### 1. Semantic HTML & Heading Hierarchy
The document structure was audited to ensure strict semantic progression without skipped levels:
- **`<h1>` Landmark:** Exactly one top-level heading on the page (`src/components/hero.tsx`): `Md. Sadman Siam`.
- **`<h2>` Section Landmarks:** Every primary page section begins with a designated `<h2>`:
  1. `Interactive Terminal CLI` (`#terminal`)
  2. `Building software, exploring system security, and automating workflows.` (`#about`)
  3. `Verified Skills & Technologies` (`#skills`)
  4. `Engineered Work & Applied Systems` (`#projects`)
  5. `GitHub Activity & Repositories` (`#github`)
  6. `Cybersecurity Operations & CTF Achievements` (`#security-lab`)
  7. `Experience, Education & Credentials` (`#experience`)
  8. `Technical Notes & Security Logs` (`#blog`)
  9. `Initiate a Discussion` (`#contact`)
- **`<h3>` Sub-sections & `<h4>` Cards:** Clean hierarchical nesting used for focus areas, skill groups, individual project titles, and certification cards.

### 2. Keyboard Navigation & Focus Visibility
- **Tab Sequence:** Natural visual reading order from top navigation down through the contact form and footer.
- **Focus Rings:** Enforced via `globals.css` and Tailwind:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 3px;
  }
  ```
- **Modal Dialog Keyboard Controls:**
  - Pressing `Escape` automatically dismisses the project inspection and security lab write-up dialogs.
  - Body scrolling is locked while modals are open to prevent background tab disorientation.
- **Interactive Terminal Keyboard Controls:**
  - `Up` and `Down` arrow keys navigate historical commands.
  - `Tab` key provides instant auto-completion for available portfolio commands.
  - `Ctrl + L` / `Cmd + L` clears the terminal buffer.

### 3. Screen-Reader Labels & ARIA Annotations
- **Form Association:** Every input (`contact-name`, `contact-email`, `contact-subject`, `contact-message`) has an explicitly linked `<label htmlFor="...">`.
- **Dynamic Feedback Alerts:** Contact submission status messages are wrapped in `<div role="alert" aria-live="polite">` so screen readers announce validation errors and success confirmations without requiring page reloads.
- **Terminal Accessibility:** Includes a dedicated `<div role="log" aria-live="polite">` log stream as well as a toggleable plain-text view button (`Toggle Accessible Plain-Text View`) for users relying on linear screen readers.
- **Navigation Controls:** Mobile menu toggle includes `aria-expanded` and `aria-label`. Modal components include `role="dialog"` and `aria-modal="true"`.

### 4. Color Contrast Ratios (WCAG Compliance)

Contrast ratios were calculated against the background palette (`#101216`):
- **Accent Green (`#B6F09C` on `#101216`):**
  - Contrast Ratio: **~13.5:1**
  - Status: Exceeds WCAG AAA requirements for normal text (7:1) and large text (4.5:1).
- **Primary Text (`#E8EAF0` on `#101216`):**
  - Contrast Ratio: **~14.8:1**
  - Status: Exceeds WCAG AAA requirements.
- **Secondary Text (`#A3AAB5` on `#101216`):**
  - Contrast Ratio: **~6.8:1**
  - Status: Exceeds WCAG AA requirements for normal body copy (4.5:1).

### 5. Touch-Friendly Controls & Mobile Ergonomics
- **Touch Target Sizing:** Navigation links, CTA buttons, and interactive chips provide generous padding (minimum 40–48px touch bounding box).
- **Terminal Quick-Tap Chips:** The terminal features prominent command buttons (`help`, `about`, `skills`, `projects`, etc.) directly above the input prompt, allowing mobile users to execute commands without typing on soft keyboards.
- **Responsive Drawer:** Navigation collapses into an accessible full-screen modal drawer on viewport widths `< 1024px`.

### 6. Reduced Motion Support
In `src/app/globals.css`, the `@media (prefers-reduced-motion: reduce)` media query disables heavy animations, resets transitions to `0.01ms`, and disables smooth scrolling for users with vestibular sensitivities:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Part 2: Performance Audit

### 1. Build Bundle Analysis (Verified Next.js Production Output)

```
Route (app)                              Size     First Load JS
┌ ○ /                                    29.9 kB         125 kB
├ ○ /_not-found                          871 B          87.9 kB
└ ƒ /api/contact                         0 B                0 B
+ First Load JS shared by all            87.1 kB
  ├ chunks/23-65677de2e490e323.js        31.5 kB
  ├ chunks/fd9d1056-cc804a1e952f84f5.js  53.6 kB
  └ other shared chunks (total)          1.89 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

- **Homepage HTML Bundle Size:** `29.9 kB`
- **First Load JS:** `125 kB` (including React runtime, Next.js framework, and Framer Motion primitives).
- **Static Pre-rendering:** The entire content layout is pre-rendered at build time (`○ Static`), eliminating server render latency for visitors.

### 2. Font Loading & Rendering Optimization
- Configured Google Fonts via `next/font/google` (`Inter`, `Space_Grotesk`, `JetBrains_Mono`).
- Added `display: "swap"` across all font declarations in `src/app/layout.tsx`. This prevents Flash of Invisible Text (FOIT) by rendering system fallbacks immediately while webfonts load in parallel.
- Preconnect headers are automatically injected by Next.js to minimize font DNS handshake latency.

### 3. Image Optimization (`next/image`)
- Configured modern format negotiation in `next.config.js`:
  ```js
  images: {
    formats: ['image/avif', 'image/webp'],
  }
  ```
- **Hero Avatar Image:** Loaded with `priority={true}` and `sizes="(max-width: 640px) 112px, 144px"` to minimize Largest Contentful Paint (LCP) delays.
- Dimensions and aspect ratios are strictly declared, preventing Cumulative Layout Shift (CLS) as images load.

### 4. Network Independence & Graceful Degradation
- The public GitHub activity section queries the unauthenticated public GitHub REST API asynchronously on the client.
- If the request times out or hits API rate limits, the UI automatically falls back to verified cached data in `src/data/github.ts`. The page never blocks or depends on a third-party server to finish rendering.

---

## Part 3: Issues Fixed During Audit

1. **Heading Semantics Refined:** Updated section headers in `src/components/terminal.tsx` and `src/components/github-activity.tsx` to `<h2>` to maintain an unbroken sequential heading hierarchy from `<h1>` down through `<h4>`.
2. **Form ARIA Live Region Added:** Wrapped contact form feedback alerts with `role="alert"` and `aria-live="polite"` so screen-reader users receive prompt audio announcements upon submission.
3. **Font Swap Enabled:** Added `display: "swap"` to Google font loaders in `src/app/layout.tsx` to eliminate layout-blocking font delays.
4. **Disabled Framework Fingerprinting:** Set `poweredByHeader: false` in `next.config.js`.

---

## Part 4: Remaining Recommendations

1. **Avatar Image Resizing:** The source `public/images/avatar.png` is currently ~1.8 MB. While Next.js compresses it to WebP/AVIF dynamically for modern browsers, saving an optimized 400x400 source PNG in `public/images/` would reduce static repository size.
2. **ESLint Integration:** Add `eslint@^8` and `eslint-config-next` to CI scripts if automated linting checks are desired in future team workflows.
