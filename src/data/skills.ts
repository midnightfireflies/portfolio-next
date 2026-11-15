export interface SkillCategory {
  title: string;
  category: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    note?: string;
  }[];
}

export interface LearningTrack {
  name: string;
  status: "Currently learning" | "Building";
  domain: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    category: "languages",
    description: "Languages used for coursework, algorithmic problem solving, scripting, and web development.",
    skills: [
      { name: "C", note: "Algorithms & dynamic programming" },
      { name: "C++", note: "Object-oriented programming & DSA" },
      { name: "Python", note: "Scripting, tooling & automation" },
      { name: "Java", note: "Academic OOP foundations" },
      { name: "JavaScript", note: "Frontend logic & DOM scripting" },
      { name: "HTML5", note: "Semantic structure & accessibility" },
      { name: "CSS3", note: "Modern layout, Flexbox & Grid" }
    ]
  },
  {
    title: "Security & Systems",
    category: "security",
    description: "Hands-on security concepts, Linux operating environment, and CTF challenges.",
    skills: [
      { name: "Linux (Debian/Ubuntu/Kali)", note: "CLI, permissions & services" },
      { name: "Cybersecurity Fundamentals", note: "TCM Security trained" },
      { name: "CTF Problem Solving", note: "Exploitation & time-boxed labs" },
      { name: "Web Security", note: "OWASP Top 10 study (in progress)" },
      { name: "Bug Bounty Methodology", note: "Reconnaissance discipline (learning)" }
    ]
  },
  {
    title: "Automation & AI Workflows",
    category: "automation",
    description: "Streamlining data pipelines, form handling, and integrating LLM-assisted decision logic.",
    skills: [
      { name: "n8n", note: "Self-hosted & cloud workflow engine" },
      { name: "Google Forms & Sheets", note: "Data intake & automated spreadsheets" },
      { name: "Gmail Automation", note: "Templated follow-up dispatches" },
      { name: "Prompt Engineering", note: "Structured LLM guidance" },
      { name: "AI Agent Orchestration", note: "Tool-using LLM workflows" }
    ]
  },
  {
    title: "Developer Tools & Media",
    category: "tools",
    description: "Version control, IDE environments, and digital media production tooling.",
    skills: [
      { name: "Git & GitHub", note: "Version control & collaboration" },
      { name: "VS Code", note: "Primary coding environment" },
      { name: "Google Workspace", note: "Collaboration & productivity suite" },
      { name: "Adobe Premiere Pro", note: "Video editing & post-production" },
      { name: "DaVinci Resolve", note: "Color grading & cut editing" },
      { name: "Canva", note: "Visual layouts & assets" }
    ]
  }
];

export const learningTracks: LearningTrack[] = [
  { name: "Cisco Networking (CCNA)", status: "Currently learning", domain: "Networking" },
  { name: "Cybersecurity Bug Bounty", status: "Currently learning", domain: "Security" },
  { name: "Web Application Security", status: "Currently learning", domain: "Security" },
  { name: "Python Automation Frameworks", status: "Building", domain: "Automation" },
  { name: "Autonomous AI Agents", status: "Building", domain: "AI" },
  { name: "n8n Workflow Automation", status: "Building", domain: "Automation" }
];
