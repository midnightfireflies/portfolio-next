export interface SecurityAchievement {
  title: string;
  roleOrPlacement: string;
  event: string;
  organization: string;
  year: string;
  description: string;
  tags: string[];
}

export interface SecurityLabWriteup {
  id: string;
  title: string;
  category: "Web Security" | "Cryptography" | "Forensics" | "Linux" | "Reverse Engineering";
  platformOrEvent: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Completed" | "In Progress" | "Upcoming";
  summary: string;
  keyLearnings: string[];
  date: string;
}

export const securityAchievements: SecurityAchievement[] = [
  {
    title: "Capture The Flag (CTF) — In-House Competition",
    roleOrPlacement: "1st Runner Up",
    event: "Cyber Security Awareness Day 2026",
    organization: "Cyber Security Center · Daffodil International University",
    year: "2026",
    description:
      "Secured 1st Runner Up in an intensive competitive CTF environment, solving multi-category challenges across web security, exploitation, and cryptography under strict time constraints.",
    tags: ["CTF", "Web Security", "Exploitation", "Time-Constrained Solving"]
  },
  {
    title: "National Capture The Flag (DIU_CYBERCON 2025)",
    roleOrPlacement: "Event Organizer",
    event: "DIU_CYBERCON 2025",
    organization: "Daffodil International University",
    year: "2025",
    description:
      "Served as an organizer for the national-level cybersecurity conference and CTF contest, assisting with event logistics, participant technical support, and coordination.",
    tags: ["Leadership", "Community", "CTF Organization", "Event Coordination"]
  }
];

export const securityWriteups: SecurityLabWriteup[] = [
  {
    id: "ctf-awareness-day-2026",
    title: "DIU Cyber Security Awareness Day CTF: Challenge Analysis",
    category: "Web Security",
    platformOrEvent: "Cyber Security Center DIU",
    difficulty: "Medium",
    status: "Completed",
    summary:
      "Breakdown of key challenges solved during the 2026 in-house CTF, focusing on parameter tampering, input filter bypass, and cookie authentication flaws.",
    keyLearnings: [
      "Cookie structure decoding and role escalation verification",
      "Bypassing client-side validation logic through direct HTTP requests",
      "Fast triage and methodical flag submission workflow"
    ],
    date: "2026"
  },
  {
    id: "recon-methodology-lab",
    title: "Structured Web Reconnaissance & Attack Surface Mapping",
    category: "Linux",
    platformOrEvent: "Independent Security Lab",
    difficulty: "Easy",
    status: "Completed",
    summary:
      "Establishing a repeatable, non-destructive reconnaissance workflow using command-line Linux utilities for DNS resolution, sub-domain discovery, and HTTP security header audits.",
    keyLearnings: [
      "Bash scripting for automated target banner grabbing",
      "Analysis of Content-Security-Policy (CSP) and strict transport headers",
      "Clean documentation and evidence collection standards"
    ],
    date: "2025"
  }
];
