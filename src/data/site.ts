export interface SiteConfig {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  intro: string;
  eyebrow: string;
  email: string;
  location: string;
  timezone: string;
  timezoneLabel: string;
  github: string;
  githubUser: string;
  linkedin: string;
  resumePdf: string;
  resumeDocx: string;
  achievementBadge: {
    label: string;
    sublabel: string;
    targetId: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Md. Sadman Siam",
  title: "Sadman Siam | Software Developer & Cybersecurity Enthusiast",
  headline: "Software Developer & Cybersecurity Enthusiast",
  subheadline: "CSE Student @ Daffodil International University · Problem Solver",
  intro:
    "Computer Science student building practical skills across security, networks, automation, and software. I like projects that solve a real problem and teach me something reusable.",
  eyebrow: "PORTFOLIO / 2026",
  email: "sadmansiam1110@gmail.com",
  location: "Savar, Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  timezoneLabel: "Dhaka, Bangladesh",
  github: "https://github.com/midnightfireflies",
  githubUser: "midnightfireflies",
  linkedin: "https://www.linkedin.com/in/md-sadman-siam-3b41a136a/",
  resumePdf: "/files/Sadman-Siam-CV.pdf",
  resumeDocx: "/files/Sadman-Siam-CV.docx",
  achievementBadge: {
    label: "1st Runner Up",
    sublabel: "CTF · 2026",
    targetId: "security-lab",
  },
};
