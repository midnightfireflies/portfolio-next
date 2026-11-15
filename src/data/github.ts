export interface VerifiedGitHubRepo {
  name: string;
  description: string;
  language: string;
  htmlUrl: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

export interface VerifiedGitHubProfile {
  username: string;
  name: string;
  bio: string;
  profileUrl: string;
  publicRepos: number;
  location: string;
  avatarUrl: string;
}

export const verifiedProfileData: VerifiedGitHubProfile = {
  username: "midnightfireflies",
  name: "Md. Sadman Siam",
  bio: "Computer Science student focused on cybersecurity, systems, and automation.",
  profileUrl: "https://github.com/midnightfireflies",
  publicRepos: 4,
  location: "Dhaka, Bangladesh",
  avatarUrl: "/images/avatar.png",
};

export const verifiedFallbackRepos: VerifiedGitHubRepo[] = [
  {
    name: "protfolio-Sadman-Siam",
    description:
      "Modern developer portfolio built with Next.js App Router, TypeScript, and Tailwind CSS. Focuses on dark engineering aesthetics, responsive layout, and verified records.",
    language: "TypeScript",
    htmlUrl: "https://github.com/midnightfireflies/protfolio-Sadman-Siam",
    stars: 1,
    forks: 0,
    updatedAt: "2026",
  },
  {
    name: "subsequence-finder-c",
    description:
      "Dynamic programming laboratory in C for computing Longest Common Subsequence (LCS) and Longest Increasing Subsequence (LIS) with DP table tracing.",
    language: "C",
    htmlUrl: "https://github.com/midnightfireflies",
    stars: 0,
    forks: 0,
    updatedAt: "2025",
  },
  {
    name: "security-recon-labs",
    description:
      "Ethical security learning exercises covering web reconnaissance, Linux server hardening checklists, and vulnerability disclosure notes.",
    language: "Shell",
    htmlUrl: "https://github.com/midnightfireflies",
    stars: 0,
    forks: 0,
    updatedAt: "2025",
  },
  {
    name: "n8n-marketing-automations",
    description:
      "Automated lead qualification and personalized email dispatch pipelines connecting webhook endpoints to Google Sheets and Gmail.",
    language: "JSON",
    htmlUrl: "https://github.com/midnightfireflies",
    stars: 0,
    forks: 0,
    updatedAt: "2025",
  },
];
