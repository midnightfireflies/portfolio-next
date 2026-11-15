# CONTENT-INVENTORY.md

> **Source:** `_original-source/` (cloned from `https://github.com/midnightfireflies/protfolio-Sadman-Siam.git`)
> **All facts below are verified directly from source files. Nothing is invented.**
> **Last updated:** 2026-11-15

---

## Identity

| Field | Value | Source |
|---|---|---|
| Full name | Md. Sadman Siam | `hugo.toml` → `params.author`, `data/portfolio.toml` → `hero.name` |
| Location | Savar, Dhaka, Bangladesh | `hugo.toml` → `params.location` |
| Timezone | Asia/Dhaka | `hugo.toml` → `params.localTimeZone` |
| Email | sadmansiam1110@gmail.com | `hugo.toml` → `params.email`, `content/contact.md` |
| GitHub | https://github.com/midnightfireflies | `hugo.toml` → `params.github` |
| GitHub username | midnightfireflies | `hugo.toml` → `params.githubUser` |
| LinkedIn | https://www.linkedin.com/in/md-sadman-siam-3b41a136a/ | `hugo.toml` → `params.linkedin` |
| CV (PDF) | `/files/Sadman-Siam-CV.pdf` | `hugo.toml` → `params.cvPDF` |
| CV (DOCX) | `/files/Sadman-Siam-CV.docx` | `hugo.toml` → `params.cvDOCX` |

---

## Hero / Introduction

| Field | Value | Source |
|---|---|---|
| Eyebrow | PORTFOLIO / 2026 | `data/portfolio.toml` → `hero.eyebrow` |
| Headline | Cybersecurity · Networking · AI Automation | `data/portfolio.toml` → `hero.headline` |
| Subheadline | CSE Student · Developer · Problem Solver | `data/portfolio.toml` → `hero.subheadline` |
| Intro | "Computer Science student building practical skills across security, networks, automation, and software. I like projects that solve a real problem and teach me something reusable." | `data/portfolio.toml` → `hero.intro` |
| CTA Primary | Explore Projects | `data/portfolio.toml` → `hero.ctaPrimary` |
| CTA Secondary | Download CV | `data/portfolio.toml` → `hero.ctaSecondary` |
| Achievement badge | 1st Runner Up · CTF · 2026 | `data/portfolio.toml` → `hero.achievement` |

---

## About / Biography

**Primary body (paragraph 1):**
> "I am studying Computer Science and Engineering at Daffodil International University. My current direction combines cybersecurity fundamentals, Cisco networking, bug-bounty learning, Linux, programming, and AI workflow automation."

**Primary body (paragraph 2):**
> "Before focusing more deeply on software and security, I built years of experience in video editing, photography, tutoring, and campus activities. That background strengthened my communication, presentation, creative problem-solving, and client-facing skills."

**About meta labels:**
- Based in: Savar, Dhaka, Bangladesh
- Studying: B.Sc. in CSE · DIU
- Current direction: Security · Networks · Automation

**Source:** `data/portfolio.toml` → `[about]`, `content/about.md`

---

## Education

| Period | Qualification | Institution | Source |
|---|---|---|---|
| 2025 — Present | B.Sc. in Computer Science & Engineering | Daffodil International University · Dhaka, Bangladesh | `data/portfolio.toml` → `[[education]]` |
| 2023 | HSC — GPA 5.00 | Govt. Azizul Haque College · Bogura, Bangladesh | `data/portfolio.toml` → `[[education]]` |
| 2021 | SSC — GPA 5.00 | BIAM Model School and College · Bogura, Bangladesh | `data/portfolio.toml` → `[[education]]` |

---

## Current Focus Areas

| # | Area | Status | Description | Source |
|---|---|---|---|---|
| 01 | Cybersecurity | Active | CTF problem-solving, Linux, security fundamentals, web-security study, bug-bounty learning | `data/portfolio.toml` → `[[focus]]` |
| 02 | Networking | Learning | Cisco networking, TCP/IP concepts, network fundamentals, troubleshooting mindset | `data/portfolio.toml` → `[[focus]]` |
| 03 | AI Automation | Building | n8n workflows connecting forms, spreadsheets, email, APIs, and AI-assisted decision logic | `data/portfolio.toml` → `[[focus]]` |

---

## Skills

| Category | Items | Source |
|---|---|---|
| Programming | C, C++, Python, Java, HTML, CSS, JavaScript | `data/portfolio.toml` → `[[skills]]` |
| Security & Systems | Linux, Cybersecurity fundamentals, CTF, Bug bounty (learning), Web security (learning) | `data/portfolio.toml` → `[[skills]]` |
| Automation | n8n, Google Forms, Google Sheets, Gmail automation, Prompt engineering, AI agents | `data/portfolio.toml` → `[[skills]]` |
| Tools | Git, GitHub, VS Code, Google Workspace, Canva, Adobe Creative Suite | `data/portfolio.toml` → `[[skills]]` |

---

## Currently Learning / Building

| Track | Status | Source |
|---|---|---|
| Cisco Networking | Currently learning | `data/portfolio.toml` → `[[learning]]` |
| Cybersecurity Bug Bounty | Currently learning | `data/portfolio.toml` → `[[learning]]` |
| Web Security | Currently learning | `data/portfolio.toml` → `[[learning]]` |
| Python Automation | Building | `data/portfolio.toml` → `[[learning]]` |
| AI Agents | Building | `data/portfolio.toml` → `[[learning]]` |
| n8n Workflow Automation | Building | `data/portfolio.toml` → `[[learning]]` |

---

## Projects

### Project 1 — Automated Lead Qualification & Follow-Up
- **Tag:** AI AUTOMATION
- **Status:** Working
- **Featured:** Yes
- **Description:** An n8n workflow for a digital-marketing lead funnel. Receives form submissions, updates Google Sheets, sends a personalized thank-you email, and notifies the owner with a Hot / Warm / Cold lead classification.
- **Stack:** n8n, Google Forms, Google Sheets, Gmail, Automation Logic
- **GitHub link:** ⚠️ Not listed in original source
- **Source:** `data/portfolio.toml` → `[[projects]]`, `content/projects.md`

### Project 2 — Subsequence Finder (LCS & LIS)
- **Tag:** ALGORITHMS
- **Status:** Completed
- **Featured:** No
- **Description:** A C-based algorithm laboratory project using dynamic programming to compute Longest Common Subsequence and Longest Increasing Subsequence results, including DP-table output and comparison metrics.
- **Stack:** C, Dynamic Programming, Algorithms, Problem Solving
- **GitHub link:** ⚠️ Not listed in original source
- **Source:** `data/portfolio.toml` → `[[projects]]`, `content/projects.md`

### Project 3 — Personal Portfolio
- **Tag:** HUGO / WEB
- **Status:** Current
- **Featured:** No
- **Description:** A custom Hugo portfolio blending minimal developer aesthetic with smooth single-page introduction experience, built without a runtime framework or npm dependency.
- **Stack:** Hugo, HTML, CSS, JavaScript, GitHub API
- **GitHub link:** https://github.com/midnightfireflies/protfolio-Sadman-Siam (inferred — the repo itself)
- **Source:** `data/portfolio.toml` → `[[projects]]`

### Project 4 — Bug Bounty & Security Practice
- **Tag:** SECURITY LAB
- **Status:** Learning
- **Featured:** No
- **Description:** A growing collection of responsible security-learning exercises focused on reconnaissance discipline, vulnerability analysis, web-security thinking, and structured reporting habits.
- **Stack:** Linux, Web Security, Bug Bounty, Networking
- **GitHub link:** ⚠️ Not listed in original source
- **Source:** `data/portfolio.toml` → `[[projects]]`, `content/projects.md`

---

## Experience

| Period | Role | Organisation | Description | Source |
|---|---|---|---|---|
| 2018 — Present | Freelance Video Editor | Self-employed · Remote | Edited promotional, educational, and short-form content; worked with small clients and creators; tools include Adobe Premiere Pro, CapCut, DaVinci Resolve | `data/portfolio.toml` → `[[experience]]` |
| 2020 — 2023 | Freelance Photographer | Event & Portrait Photography · Local Clients | Event and portrait photography, image retouching, client communication, delivery, and scheduling | `data/portfolio.toml` → `[[experience]]` |
| 2019 — 2023 | Private Tutor | Physics, Mathematics & Basic Computer Skills | One-to-one tutoring; created custom learning materials to simplify difficult concepts | `data/portfolio.toml` → `[[experience]]` |
| 2016 — Present | Campus Event Management | BIAM Model School & College · Govt. Azizul Haque College | Logistics, photography, media documentation, promotional content, and technical setup for student events | `data/portfolio.toml` → `[[experience]]` |

---

## Certifications & Credentials

| # | Title | Issuer | Issued | Expires | Credential ID | Category | Source |
|---|---|---|---|---|---|---|---|
| 01 | AI 100: Fundamentals | TCM Security | Jan 2026 | — | cert 2989tv00 | AI | `data/portfolio.toml` → `[[certifications]]` |
| 02 | Practical Security Fundamentals | TCM Security | Nov 2025 | — | cert 23x517md | Cybersecurity | `data/portfolio.toml` → `[[certifications]]` |
| 03 | Linux 100: Fundamentals | TCM Security | Nov 2025 | Dec 2035 | — | Linux | `data/portfolio.toml` → `[[certifications]]` |
| 04 | Programming 100: Fundamentals | TCM Security | Nov 2025 | Dec 2034 | — | Programming | `data/portfolio.toml` → `[[certifications]]` |
| 05 | AgentX Prompting | Microsoft / Netcom Learning | 2025 | — | — | AI / Prompting | `data/portfolio.toml` → `[[certifications]]` |
| 06 | CS50x: Introduction to Computer Science | Harvard University / edX | 2024 | — | — | Computer Science | `data/portfolio.toml` → `[[certifications]]` |
| 07 | The Complete Web Development Bootcamp | Angela Yu / Udemy | 2023 | — | — | Web Development | `data/portfolio.toml` → `[[certifications]]` |
| 08 | DIU_CYBERCON 2025 — Organizer | Daffodil International University | 2025 | — | — | Cybersecurity / Leadership | `data/portfolio.toml` → `[[certifications]]` |

---

## Awards & Recognitions

| Title | Year | Source |
|---|---|---|
| 1st Runner Up — Cyber Security Awareness Day In-House CTF | 2026 | `data/portfolio.toml` → `[[awards]]`, `content/achievements.md` |
| Organizer — National Capture The Flag, DIU_CYBERCON | 2025 | `data/portfolio.toml` → `[[awards]]`, `content/achievements.md` |
| Young Innovator Recognition — July Students Community | 2024 | `data/portfolio.toml` → `[[awards]]`, `content/achievements.md` |
| General Scholarship — HSC | 2023 | `data/portfolio.toml` → `[[awards]]`, `content/achievements.md` |
| General Scholarship — SSC | 2021 | `data/portfolio.toml` → `[[awards]]`, `content/achievements.md` |
| Best Cultural Coordinator Award — Cultural Classicists | 2021 | `data/portfolio.toml` → `[[awards]]`, `content/achievements.md` |

---

## Featured Achievement (Hero Section)

- **Title:** 1st Runner Up — Capture The Flag
- **Event:** Cyber Security Awareness Day 2026
- **Organisation:** Cyber Security Center · Daffodil International University
- **Description:** Secured 1st Runner Up in an in-house CTF competition through cybersecurity problem-solving, exploitation challenges, and technical work under strict time constraints.
- **Source:** `data/portfolio.toml` → `[achievement]`, `content/achievements.md`

---

## Contact Information

- **Email:** sadmansiam1110@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/md-sadman-siam-3b41a136a/
- **GitHub:** https://github.com/midnightfireflies
- **Location:** Savar, Dhaka, Bangladesh
- **Contact form behaviour:** Opens visitor's email client with pre-filled fields (no server backend)
- **Source:** `hugo.toml`, `content/contact.md`, `assets/js/main.js`

---

## Navigation Links (from original)

About · Projects · Experience · Achievements · Contact · CV (PDF)
**Source:** `layouts/partials/nav.html`

---

## ⚠️ Missing / Gaps Found

| Item | Status |
|---|---|
| GitHub repo URLs for individual projects | Not listed in original source |
| Live demo URLs for any project | Not present |
| Blog / writing section | Not present in original — referenced in `page.tsx` for new site |
| Security Lab write-ups | Described but no actual write-up content |
| Profile photo alt image (`as.png`) | Present but purpose unclear (second avatar variant?) |
| Headshot optimised for web | Only 1.7 MB PNG available; needs resizing |
