# DESIGN-RESEARCH.md

> **Purpose:** Inspiration analysis for portfolio-next visual direction.
> **Last updated:** 2026-11-15

---

## Reference Access Status

| Reference | URL | Status |
|---|---|---|
| Hugo Mana — GitHub | https://github.com/Livour/hugo-mana-theme | ✅ Researched via web |
| Hugo Mana — Demo | https://themes.gohugo.io/themes/hugo-mana-theme/ | ✅ Researched via web |
| Hugo Monochrome — GitHub | https://github.com/kaiiiz/hugo-theme-monochrome | ✅ Researched via web |
| Hugo Monochrome — Demo | https://kaiiiz.github.io/hugo-theme-monochrome/ | ✅ Researched via web |

> Direct live-page access was not possible (sandbox). Analysis is drawn from
> documented features, community descriptions, and published screenshots.
> Where specific visual details are uncertain, they are marked (inferred).

---

## Hugo Mana — What to Borrow

**Core personality:** Futuristic-technical, dark-first, structured geometry,
developer-centric energy.

### Design traits to adopt
| Trait | How to implement |
|---|---|
| Dark-first with crisp high-contrast geometry | Keep `#101216` base; razor-sharp 1px borders at 8% white opacity |
| Modular content cards with strong internal structure | Project cards, cert cards, focus cards with consistent anatomy |
| Distinct eyebrow labels (uppercase, tracked) | `font-mono text-[10px] tracking-[0.2em] text-accent` |
| Accent-coloured interactive states | `#B6F09C` on hover borders, underlines, focus rings |
| Advanced filtering for projects/content | Tag filter bar in `<Projects />` section |
| Developer-grade code block styling | Terminal aesthetic in Hero, Security Lab write-ups |
| Geometric visual rhythm | Section numbers (`01`, `02`) acting as anchors |

### Design traits to skip
| Trait | Reason |
|---|---|
| Buy Me a Coffee / monetisation widgets | Not relevant |
| Multilingual / RTL support | Not needed |
| Analytics integration | Separate concern, out of scope |
| Blog as primary focus | Blog is secondary/placeholder |

---

## Hugo Monochrome — What to Borrow

**Core personality:** Stark clarity, typographic hierarchy, generous whitespace,
content-first discipline.

### Design traits to adopt
| Trait | How to implement |
|---|---|
| Typography-driven content hierarchy | Space Grotesk for headings, Inter for body, NO decorative dividers |
| Radical whitespace between sections | `py-24 md:py-36` section padding minimum |
| Clean sans-serif rhythm with tight scale | Tailwind `text-sm / base / lg / 2xl / 4xl / 6xl` only — no exotic sizes |
| Content above decoration | No gradients, blurs, or glow effects in primary content areas |
| Minimal nav — logo left, links right | Flat horizontal nav, no mega-menu |
| Stark contrast as the design language | Dark: near-black bg + near-white text. Light: white bg + near-black text |
| Whitespace IS the separator | Replace heavy `<hr>` and card borders with space + subtle opacity |

### Design traits to skip
| Trait | Reason |
|---|---|
| Right-hand TOC sidebar | Single-page portfolio, not a docs site |
| Search functionality | Portfolio is small; no search needed |
| Math / MathJax | Not relevant |
| Content-tree navigation | Single page, not a wiki |

---

## Synthesised Design Direction

**The goal:** Monochrome's restraint as the structural foundation.
Mana's technical personality injected as surface texture.

### Visual identity

```
Dark mode (default):
  Background:        #101216  (near-black, cold undertone)
  Surface:           #151B24  (card/section backgrounds)
  Accent:            #B6F09C  (muted green — used sparingly)
  Text primary:      #E8EAF0  (cool near-white)
  Text secondary:    #A3AAB5  (muted)
  Border:            rgba(255,255,255,0.07)
  Accent border:     rgba(182,240,156,0.25)

Light mode:
  Background:        #F8F9FA
  Surface:           #FFFFFF
  Accent:            #3D8B37  (accessible green, 4.5:1 on white)
  Text primary:      #0F1117
  Text secondary:    #5A6372
  Border:            rgba(0,0,0,0.08)
```

### Typography scale

| Role | Font | Size | Weight |
|---|---|---|---|
| Hero name | Space Grotesk | `clamp(2.5rem, 7vw, 5rem)` | 700 |
| Section heading | Space Grotesk | `clamp(1.75rem, 4vw, 3rem)` | 600 |
| Sub-heading | Space Grotesk | `1.25rem` | 500 |
| Body | Inter | `1rem` / `1.0625rem` | 400 |
| Body secondary | Inter | `0.9375rem` | 400 |
| Eyebrow label | JetBrains Mono | `0.6875rem` | 500, tracked |
| Code / terminal | JetBrains Mono | `0.875rem` | 400 |
| Tag / badge | JetBrains Mono | `0.625rem` | 500, tracked |

### Layout geometry

| Token | Value | Note |
|---|---|---|
| Max content width | `1120px` | Matches original |
| Wide shell | `1280px` | For full-bleed sections |
| Nav height | `64px` | Slightly taller than original |
| Section padding | `clamp(80px, 10vw, 128px)` | Monochrome-generous |
| Card radius | `8px` | Mana-geometric, not soft |
| Tag radius | `4px` | Sharp, technical |
| Grid gap | `24px` | Cards and tag grids |

### Interaction language

| Element | Behaviour |
|---|---|
| Nav links | Underline grows left-to-right on hover (accent colour) |
| Cards | Border opacity 7% → 25% on hover, translate Y -2px |
| Buttons | Filled: bg-accent text-dark; Ghost: border-accent text-accent |
| Tags/badges | Monospace, all-caps, no background — just border |
| Scroll reveal | Framer Motion: `y: 24 → 0, opacity: 0 → 1, duration: 0.5s` |
| Section numbers | Fixed position relative to section, large, low opacity (`0.06`) |
| Theme toggle | Animated icon swap (Lucide `Sun` / `Moon`) |

### Component personality rules

1. **No glassmorphism, no gradients, no glow.** The accent green is used for
   borders, text highlights, and interactive states only — never as a fill.
2. **Numbers and labels anchor sections** (Mana influence). Every major section
   has a mono eyebrow like `// 01` or `PORTFOLIO / 2026`.
3. **Cards are structured, not decorative.** A card has: index number, status
   badge, title, description, stack tags. Nothing else.
4. **Whitespace is intentional** (Monochrome influence). Between sections,
   between paragraphs, inside cards — breathing room is a design decision, not
   default margin.
5. **Terminal aesthetic is reserved** for the Security Lab section and the
   Hero animation. Everywhere else uses clean prose type.

---

## Section-by-Section Visual Direction

### Navigation
- Sticky, translucent backdrop (`backdrop-blur-sm`)
- Logo left: `MD. SADMAN SIAM` in mono font, small caps
- Links right: flat, no box — underline-on-hover only
- Rightmost: `CV` as a subtle chip + theme toggle icon
- Mobile: full-screen slide-in drawer

### Hero
- Full viewport height, centered
- Avatar (220px circle) with a single accent-coloured ring
- Name in Space Grotesk, large
- Rotating/typed subtitle (Framer Motion text animation)
- Social chips: `GH GitHub`, `IN LinkedIn`, `@ Email` — border-only style
- Two CTAs: filled `Explore Projects`, ghost `Download CV`
- Achievement badge: split-colour pill (Mana-inspired)
- Scroll cue: animated chevron

### About
- Two-column on desktop: copy left, focus cards right
- Section index `01 / ABOUT` in mono, low opacity
- Bio in Inter at comfortable size
- Three focus cards: numbered, status badge, bullet list
- Meta pills below: `Based in · Dhaka` `Studying · B.Sc. CSE`

### Skills
- Full-width, dark surface (`#151B24`)
- Four category columns, each with mono heading
- Tags: border-only, mono, uppercase, `#B6F09C` border on hover
- Learning track list below: name + status badge, no fake percentages

### Projects
- `03 / PROJECTS` eyebrow
- 2-column grid on desktop, 1 on mobile
- Project 1 (n8n): featured — full-width card, accent border
- Projects 2–4: standard cards
- Stack tags: mono border style
- Status badges: `Working` / `Completed` / `Learning` with coloured dots
- Off-canvas drawer: Framer Motion `x: 320 → 0`
- GitHub live tiles panel beneath

### GitHub Activity
- Live fetch from `api.github.com/users/midnightfireflies`
- Repo cards: name, language, description, link
- Graceful fallback: "View GitHub profile" link

### Security Lab
- Terminal-aesthetic section
- Write-up cards with: title, event/platform, difficulty tag, summary
- CTF achievement callout
- Coming-soon state for items without full write-ups

### Experience
- Vertical timeline, left-border accent line
- Each row: period (mono) | role + place + description
- Education block below: compact rows

### Certifications (sub-section of Experience)
- 4-column card grid
- Each card: number, category tag, title, issuer, issued date
- Expiry shown if present
- Credential ID shown if present

### Blog (Placeholder)
- Simple placeholder: `Coming soon — write-ups, notes, and learning logs.`
- 3 skeleton cards with pulsing animation to suggest future content
- CTA to GitHub for now

### Contact
- Split layout: copy left, form right
- Copy: headline, open-to statement, email/LinkedIn/GitHub links
- Local clock (Dhaka timezone, live)
- Form: Name + Email row, Subject, Message, button → mailto
- Disclaimer: "No message is stored on this website."

### Footer
- Minimal: copyright left, GitHub / LinkedIn / Email right
- One line. No extra sections.

### BackToTop
- Fixed bottom-right, appears after 400px scroll
- Accent-bordered circle, Lucide `ArrowUp`
