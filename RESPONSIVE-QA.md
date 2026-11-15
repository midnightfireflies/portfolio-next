# RESPONSIVE QA AUDIT & VIEWPORT TESTING REPORT

**Project:** Sadman Siam — Engineering Portfolio (`portfolio-next`)  
**Date:** November 15, 2026  
**Auditor:** Senior Frontend Engineer & UI/UX Designer  
**Status:** PASSED (0 Horizontal Overflow Regressions, 100% Mobile & Desktop Compliant)

---

## 1. Executive Summary

A comprehensive responsive design and cross-device QA audit was conducted across the application. All 8 mandatory viewport resolutions specified in the engineering brief were verified against layout integrity, typography scaling, touch target requirements, keyboard accessibility, and component interactions.

No horizontal scrolling (`overflow-x`) occurs at any tested resolution from **320px up to 1920px**. All interactive components (navigation drawer, interactive terminal, project modal, filter pills, timeline tabs, and contact form) maintain high usability across touch, mouse, and keyboard input modes.

---

## 2. Target Viewport Testing Matrix

| Viewport Dimension | Target Device Archetype | Layout Structure | Horizontal Overflow | Nav Mode | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **320 × 568** | iPhone SE (1st gen), Small mobile | Single column stacked | **None (0px)** | Mobile Drawer (44px touch targets) | **PASS** |
| **375 × 812** | iPhone X / 11 / 12 mini | Single column stacked | **None (0px)** | Mobile Drawer | **PASS** |
| **430 × 932** | iPhone 14 / 15 / 16 Pro Max | Single column stacked | **None (0px)** | Mobile Drawer | **PASS** |
| **768 × 1024** | iPad (Portrait), Medium tablet | 2-column grids | **None (0px)** | Desktop Nav Bar (tight fit) | **PASS** |
| **1024 × 768** | iPad (Landscape), Small Laptop | 2-3 column grids | **None (0px)** | Desktop Nav Bar | **PASS** |
| **1366 × 768** | Budget Laptop / Chromebook | Multi-column grid (`--shell: 1120px`) | **None (0px)** | Desktop Nav Bar | **PASS** |
| **1440 × 900** | MacBook Pro / Standard Desktop | Multi-column grid (`--shell: 1120px`) | **None (0px)** | Desktop Nav Bar | **PASS** |
| **1920 × 1080** | Full HD Desktop Monitor | Centered shell (`--shell: 1120px`) | **None (0px)** | Desktop Nav Bar | **PASS** |

---

## 3. Detailed Component Inspections

### 3.1 Global Layout & Typography
- **Container Sizing:** Uses CSS variable `--shell: 1120px` and `.shell` with `padding-inline: clamp(1rem, 5vw, 2.5rem)`.
- **Global Overflow Prevention:** Both `html` and `body` enforce `overflow-x: hidden;` and `box-sizing: border-box;`.
- **Fluid Typography:**
  - `h1`: `clamp(2.5rem, 7vw, 5rem)` — scales smoothly from 40px on 320px mobile to 80px on large displays without word clipping.
  - `h2`: `clamp(1.75rem, 4vw, 3rem)`.
  - Body text: Constrained to `max-width: 68ch` for optimal reading ergonomics.
- **Watermark Numbers:** Positioned with `pointer-events: none` and `user-select: none` behind content; scaled with `clamp(5rem, 15vw, 10rem)` to avoid inflating container bounding boxes.

### 3.2 Navigation Shell (`src/components/navigation.tsx`)
- **Desktop (>= 768px):**
  - Sticky header with backdrop blur (`backdrop-blur-md bg-[rgba(16,18,22,0.88)]`).
  - Brand identity on left, 7 section jump links in center, Resume PDF download button and Theme Toggle on right.
  - Clear keyboard focus indicators (`outline: 2px solid var(--accent)`).
- **Mobile (< 768px):**
  - Hamburger button with `aria-label="Toggle navigation menu"`, `aria-expanded`, and 44×44px touch bounding box.
  - Mobile drawer with solid backdrop, stacking links vertically with `min-h-[44px]` touch targets.
  - Automatically dismisses upon clicking any navigation link or pressing `Escape`.
  - Includes mobile-specific resume download and theme toggle buttons.

### 3.3 Hero Section (`src/components/hero.tsx`)
- **Avatar:** Circular 120px Next.js image with active availability status badge (`Available for internships & collaborations`).
- **Headlines:** Fluid Space Grotesk typography.
- **Social Chips & CTAs:** Wrapped with `flex-wrap justify-center` so that on 320px screens they wrap into multiple clean lines rather than overflowing the horizontal axis.

### 3.4 Interactive Terminal (`src/components/terminal.tsx`)
- **Container:** Wrapped in responsive macOS terminal chrome with simulated titlebar.
- **Mobile Layout:**
  - Fixed-width input issues resolved via `min-w-0` on flex input child.
  - Text output wraps via `break-words` and `whitespace-pre-wrap` to handle long URLs and commands without horizontal scroll.
  - Command shortcut buttons (`help`, `about`, `skills`, `projects`, `security`, `contact`, `clear`) wrap with `flex-wrap gap-1.5` and touch-friendly padding.
- **Accessibility:** Live ARIA terminal region, command history traversal via `ArrowUp` / `ArrowDown`, and `<noscript>` fallback.

### 3.5 Projects Section (`src/components/projects.tsx`)
- **Filter Pills:** `flex-wrap gap-2` allowing seamless reflow on narrow viewports.
- **Card Grid:** Stacks on mobile (`grid-cols-1`), expands to 2 columns on `md:` screens (`>= 768px`).
- **Modal Inspector:**
  - Viewport-aware overlay (`fixed inset-0 z-50 p-4 sm:p-6 overflow-y-auto`).
  - Max width capped at `max-w-2xl` with responsive border-radius.
  - Handles `Escape` key, outside backdrop click, and locks body scrolling while open.

### 3.6 Skills Section (`src/components/skills.tsx`)
- **Grid Breakdown:**
  - 320px – 639px: 1 column.
  - 640px – 1023px: 2 columns.
  - 1024px+: 3 columns.
- **Badges:** Flex-wrapped tag items with mono font and high-contrast borders. Zero arbitrary percentage bars.

### 3.7 Security Lab (`src/components/security-lab.tsx`)
- **CTF Achievement Callout:** Prominent highlighted card with DIU CTF 2026 1st Runner Up trophy badge.
- **Lab Grid:** 1 column on mobile, 2 columns on tablet/desktop.
- **Writeup Teaser:** Honest placeholder card indicating upcoming writeups.

### 3.8 Experience & Timeline (`src/components/experience.tsx`)
- **Tab Navigation:** Responsive pill selector with `flex-wrap gap-2` for switching between Work, Education, Certifications (8 verified items), and Awards.
- **Cards:** Date badges, institution metadata, and credential verification IDs format cleanly across all viewports.

### 3.9 GitHub Activity (`src/components/github-activity.tsx`)
- **Profile Header:** Repositories, followers, and public profile links wrapped in a responsive card.
- **Repository Grid:** 1 column on mobile, 2 columns on `md:` screens.
- **Offline / Rate-Limit Resiliency:** Gracefully falls back to curated static repo data when the unauthenticated GitHub API hits rate limits.

### 3.10 Blog Section (`src/components/blog.tsx`)
- **Design:** Honest empty-state card with terminal aesthetic.
- **Upcoming Topics:** Outlines planned writeups without fabricating ghost articles.

### 3.11 Contact Form & Channels (`src/components/contact.tsx`)
- **Layout:**
  - Mobile: Channels stack above the form in a single column.
  - Desktop (`lg:`): 5-column grid (`lg:col-span-2` channels + `lg:col-span-3` form).
- **Timezone Widget:** Live Asia/Dhaka digital clock badge.
- **Form Controls:** All `<input>` and `<textarea>` elements have full width, explicit `<label>` bindings, focus rings, and proper mobile virtual keyboard types (`type="email"`).
- **Spam Trap:** Hidden honeypot field is off-screen (`opacity-0 absolute -z-10`) and does not impact mobile layout or screen readers.

### 3.12 Footer (`src/components/footer.tsx`)
- **Layout:** Mobile centered column (`flex-col text-center`), desktop row (`sm:flex-row justify-between`).
- **Back to Top:** Touch target with smooth scrolling behavior.

---

## 4. Issues Discovered and Resolved

1. **Issue:** Hero social chips caused minor horizontal edge clipping at 320px viewport width.  
   **Fix:** Added `flex-wrap justify-center` to the chip wrapper in `src/components/hero.tsx`.
2. **Issue:** Terminal input flex child expanded past 320px viewport when input string grew.  
   **Fix:** Added `min-w-0` to the flex container input element in `src/components/terminal.tsx`.
3. **Issue:** Long terminal output lines (e.g., repository URLs) forced scrollbar blow-out.  
   **Fix:** Applied `break-words` and `whitespace-pre-wrap` to terminal output rows in `src/components/terminal.tsx`.
4. **Issue:** Footer copyright and social links collided on viewports narrower than 400px.  
   **Fix:** Refactored footer layout to `flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left`.

---

## 5. Unresolved Responsive Issues

**None.** All identified responsive issues have been resolved and verified across all 8 target viewports.
