export type ProjectCategory =
  | "Software Development"
  | "Web Development"
  | "Cybersecurity"
  | "Automation";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: "Completed" | "Working" | "Current" | "Learning";
  featured: boolean;
  description: string;
  details: {
    problem: string;
    solution: string;
    highlights: string[];
  };
  technologies: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  screenshot?: string;
  date: string;
}

export const projectCategories = [
  "All",
  "Software Development",
  "Web Development",
  "Cybersecurity",
  "Automation"
] as const;

export const projectsData: Project[] = [
  {
    id: "lead-qualification-automation",
    title: "Automated Lead Qualification & Follow-Up",
    tagline: "n8n digital marketing workflow with automatic classification & email delivery",
    category: "Automation",
    status: "Working",
    featured: true,
    date: "2025",
    description:
      "An automated workflow designed for digital marketing lead funnels. Captures incoming inbound inquiries, updates central spreadsheets, classifies lead intent, and delivers immediate personalized follow-ups.",
    details: {
      problem:
        "Manual response times for incoming business inquiries frequently caused high drop-off rates and inconsistent lead tracking across multiple team members.",
      solution:
        "Built a resilient multi-node workflow in n8n triggered instantaneously by form webhooks, parsing lead attributes and calculating a classification tier (Hot / Warm / Cold).",
      highlights: [
        "Instant webhook ingestion from web and Google Forms submissions",
        "Deterministic classification logic routing high-priority leads directly to notifications",
        "Automated personalized confirmation dispatched via Gmail without manual intervention",
        "Synchronous append to central Google Sheets ledger for CRM record keeping"
      ]
    },
    technologies: ["n8n", "Google Forms", "Google Sheets", "Gmail", "Webhooks", "JSON"],
    repositoryUrl: undefined,
    demoUrl: undefined
  },
  {
    id: "subsequence-finder-lcs-lis",
    title: "Subsequence Finder — LCS & LIS",
    tagline: "Dynamic programming laboratory system written in C with DP-table visualization",
    category: "Software Development",
    status: "Completed",
    featured: false,
    date: "2025",
    description:
      "A C-based algorithm laboratory implementation leveraging dynamic programming to solve the Longest Common Subsequence (LCS) and Longest Increasing Subsequence (LIS) optimization problems.",
    details: {
      problem:
        "Understanding and comparing dynamic programming state transitions can be opaque when only examining raw scalar results without intermediate memoization matrices.",
      solution:
        "Constructed a CLI tool in pure C that renders formatted 2D table states in the terminal while computing the optimal subsequence and execution metrics.",
      highlights: [
        "Recursive formulation optimized with bottom-up tabulated memoization",
        "ASCII matrix visualizer for step-by-step backtrack trajectory",
        "Memory-safe allocation and traversal in strict ANSI C",
        "Comparative benchmark of asymptotic time and auxiliary space consumption"
      ]
    },
    technologies: ["C", "Dynamic Programming", "Algorithms", "Data Structures", "Terminal UI"],
    repositoryUrl: undefined,
    demoUrl: undefined
  },
  {
    id: "personal-portfolio-next",
    title: "Personal Developer Portfolio",
    tagline: "Next.js App Router engineering portfolio with dark minimalist aesthetics",
    category: "Web Development",
    status: "Current",
    featured: false,
    date: "2026",
    description:
      "A modern developer portfolio built with Next.js App Router, TypeScript, and Tailwind CSS. Combines Hugo Mana's structured technical personality with Hugo Monochrome's typographic restraint.",
    details: {
      problem:
        "Previous static Hugo deployment lacked component modularity and modern reactive UI capabilities for interactive filtering and dynamic GitHub feeds.",
      solution:
        "Migrated to Next.js 14 App Router with clean TypeScript domain modeling, fluid clamp() typography, dark-first color tokens, and full responsive support across 320px–1920px viewports.",
      highlights: [
        "Fluid responsive design with zero horizontal scroll across all device widths",
        "Accessible modal detail views for in-depth project inspection",
        "Dark & light theme toggle synchronized with data-theme attributes",
        "Zero arbitrary proficiency claims; only verified coursework, credentials, and code"
      ]
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
    repositoryUrl: "https://github.com/midnightfireflies/protfolio-Sadman-Siam",
    demoUrl: "/"
  },
  {
    id: "bug-bounty-security-practice",
    title: "Bug Bounty & Security Practice",
    tagline: "Responsible security reconnaissance discipline and vulnerability analysis labs",
    category: "Cybersecurity",
    status: "Learning",
    featured: false,
    date: "2025 — Present",
    description:
      "A structured repository of security-learning exercises, reconnaissance checklists, Linux system hardening labs, and practical web vulnerability analysis notes.",
    details: {
      problem:
        "Ad-hoc penetration testing practice often lacks disciplined documentation and repeatable methodology needed for responsible vulnerability disclosure.",
      solution:
        "Established structured laboratory workflows detailing discovery steps, verified attack surface mapping, and proof-of-concept reporting standards.",
      highlights: [
        "Reconnaissance workflows covering DNS analysis, port enumeration, and asset mapping",
        "Hands-on practice identifying OWASP Top 10 vulnerabilities in deliberate sandbox targets",
        "Linux server security checklists including SSH hardening and permission audits",
        "Focus on ethical guidelines and formal reporting formats"
      ]
    },
    technologies: ["Linux", "Web Security", "Bug Bounty", "Networking", "Reconnaissance"],
    repositoryUrl: undefined,
    demoUrl: undefined
  }
];
