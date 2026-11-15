# Sadman Siam — Engineering Portfolio

A modern, fast, and authentic personal portfolio for **Md. Sadman Siam** — Software Developer & Cybersecurity Enthusiast (B.Sc. in Computer Science & Engineering at Daffodil International University).

Built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**. Designed around a dark engineering aesthetic inspired by technical tools, terminals, and minimalist documentation systems.

---

## ⚡ Highlights

- **Visual Direction:** Understated dark engineering aesthetic (`#101216` background, `#B6F09C` accent, subtle borders, high contrast).
- **Interactive Terminal:** In-browser terminal emulator supporting keyboard navigation, command history (`ArrowUp` / `ArrowDown`), quick-command chips, and verified portfolio commands (`help`, `about`, `skills`, `projects`, `security`, `contact`, `clear`).
- **Verified Content:** 100% truthful data extracted from source credentials, repositories, and CV. Zero fake certifications, zero invented metrics, zero arbitrary skill percentage bars.
- **Security Lab & CTF Record:** Features verified CTF achievements (1st Runner Up — DIU Intra University CTF 2026) and lab focus writeups.
- **Projects & Filtering:** Filterable project catalog (Software Development, Web Development, Cybersecurity, Automation) with interactive modal inspector, live demo links, and GitHub repository links.
- **Live GitHub Integration:** Resilient GitHub profile and public repository viewer with offline fallback caching if API rate limits are encountered.
- **Contact & Anti-Spam:** Server-side validation route (`/api/contact`), in-memory IP rate limiting, hidden honeypot field, timestamp bot gating, and graceful `mailto` fallback when external email providers are unconfigured.
- **Security-First Architecture:** Strict Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), X-Frame-Options: DENY, X-Content-Type-Options: nosniff, and Permissions-Policy.
- **Accessible & Responsive:** Fluid clamp typography, full keyboard navigation, screen reader ARIA labels, reduced-motion compliance, and zero horizontal overflow across all viewports (320px to 1920px).

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 14.2.5](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** [TypeScript 5.x](https://www.typescriptlang.org/) (Strict type-checking)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Space Grotesk (Headings), Inter (Body), JetBrains Mono (Code/Terminal) via `next/font/google`
- **Deployment Target:** [Vercel](https://vercel.com/) / Node.js runtime

---

## 📁 Directory Structure

```
portfolio-next/
├── public/
│   ├── favicon.svg             # SVG site icon
│   ├── images/
│   │   └── avatar.png          # High-resolution profile avatar
│   └── files/
│       ├── Sadman-Siam-CV.pdf  # Verified Curriculum Vitae (PDF)
│       └── Sadman-Siam-CV.docx # Verified Curriculum Vitae (DOCX)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts    # Secure POST contact endpoint (rate limit + validation)
│   │   ├── globals.css         # CSS tokens, typography reset, utility classes
│   │   ├── layout.tsx          # Root server layout, font loaders, metadata, CSP
│   │   └── page.tsx            # Main portfolio single-page composition
│   ├── components/
│   │   ├── about.tsx           # Bio narrative, pillars, active focus tracks
│   │   ├── back-to-top.tsx     # Smooth scroll back-to-top button
│   │   ├── blog.tsx            # Honest placeholder for upcoming technical articles
│   │   ├── contact.tsx         # Contact form, Dhaka clock, verified channels
│   │   ├── experience.tsx      # Tabbed Work, Education, Certifications, Awards
│   │   ├── footer.tsx          # Responsive footer and social links
│   │   ├── github-activity.tsx # Live GitHub profile and repository showcase
│   │   ├── hero.tsx            # Introduction, avatar, status badge, quick CTAs
│   │   ├── navigation.tsx      # Sticky navbar, mobile menu drawer, theme toggle
│   │   ├── projects.tsx        # Filterable project showcase & modal inspector
│   │   ├── security-lab.tsx    # CTF achievements, lab writeups
│   │   ├── skills.tsx          # Categorized skills & learning tracks (no fake bars)
│   │   ├── terminal.tsx        # Interactive portfolio command-line emulator
│   │   ├── theme-context.tsx   # React Theme context definition
│   │   ├── theme-provider.tsx  # Theme provider with localStorage persistence
│   │   └── ui/
│   │       ├── modal.tsx       # Accessible modal dialog with focus trap
│   │       ├── section-heading.tsx # Reusable section title with watermark number
│   │       └── toaster.tsx     # Accessible toast notification container
│   ├── data/
│   │   ├── about.ts            # About narrative and focus areas
│   │   ├── experience.ts       # Verified work, education, certifications, awards
│   │   ├── github.ts           # Curated repository fallback data
│   │   ├── projects.ts         # Verified project catalog with categories & tags
│   │   ├── security-lab.ts     # CTF details and lab writeup data
│   │   ├── site.ts             # Global site metadata, contact details, social links
│   │   └── skills.ts           # Categorized technology competencies
│   └── lib/
│       └── utils.ts            # Class merging and string helpers
├── .env.example                # Example environment configuration (safe defaults)
├── ENVIRONMENT.md              # Detailed environment variables and integration guide
├── RESPONSIVE-QA.md            # Viewport test results across 8 resolutions
├── SECURITY-REVIEW.md          # Security audit report
├── ACCESSIBILITY-PERFORMANCE-REVIEW.md # A11y and performance verification
├── FINAL-QA-REPORT.md          # Complete QA inspection report
├── PROJECT-STATE.md            # Project milestone and implementation log
├── next.config.js              # Next.js security headers, image optimization, cache
├── tailwind.config.ts          # Tailwind design tokens, typography, colors
├── tsconfig.json               # TypeScript strict configuration
└── package.json                # Project dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.17.0 or higher
- **npm:** v9.x or higher

### Installation

1. Clone or navigate to the workspace directory:
   ```bash
   cd portfolio-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   *Note: The application runs with complete functionality even if `.env.local` is omitted.*

---

## 💻 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles an optimized production build and validates types |
| `npm run start` | Runs the compiled production server locally |
| `npx tsc --noEmit` | Executes strict TypeScript type-checking across all source files |

---

## 🔒 Security Best Practices

- **Zero Secret Commits:** No credentials or API keys are committed to Git.
- **CSP Headers:** A Content Security Policy restricts script, style, image, and font sources.
- **Spam Protection:** Multi-layer defence on `/api/contact` includes an invisible honeypot field, a 1.8-second time gate, and IP rate limiting (5 requests / 15 minutes).
- **Safe External Links:** All external links include `rel="noopener noreferrer"`.
- **Honest Feedback:** The contact form transparently informs users whether an automated email delivery service is configured on the host server.

---

## 🌐 Deployment to Vercel

1. Push your repository to GitHub (or import directly to Vercel).
2. Connect the repository in the **Vercel Dashboard**.
3. Select framework preset: **Next.js**.
4. Root Directory: `./` (or `portfolio-next`).
5. In **Project Settings → Environment Variables**, optionally add:
   - `RESEND_API_KEY`: *(Optional) Your Resend API key*
   - `CONTACT_NOTIFICATION_EMAIL`: `sadmansiam1110@gmail.com`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`
6. Click **Deploy**. Vercel will execute `npm run build` and publish the site to global edge network.

---

## 📄 License & Attribution

Designed and engineered for **Md. Sadman Siam**. All rights reserved.
