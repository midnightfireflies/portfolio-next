export interface FocusTrack {
  number: string;
  title: string;
  status: "Active" | "Learning" | "Building";
  description: string;
  items: string[];
}

export interface AboutData {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  pillars: {
    title: string;
    description: string;
  }[];
  meta: {
    label: string;
    value: string;
  }[];
  focusTracks: FocusTrack[];
}

export const aboutData: AboutData = {
  eyebrow: "01 / ABOUT",
  heading: "Building software, exploring system security, and automating workflows.",
  paragraphs: [
    "I am an undergraduate Computer Science and Engineering student at Daffodil International University. My technical journey is anchored in writing structured code, understanding system internals, and applying defensive and offensive security principles.",
    "Before focusing deeply on computer science, I spent several years working in freelance video editing, photography, tutoring, and campus event organizing. Those experiences gave me strong communication, client collaboration, and practical problem-solving habits that guide how I build and debug software today.",
    "Currently, I divide my time between algorithmic problem solving, Linux administration, Cisco networking concepts, and building intelligent automation workflows using n8n and AI integrations."
  ],
  pillars: [
    {
      title: "Programming Journey",
      description: "Developing core software foundations in C, C++, Python, and modern web technologies with an emphasis on clean logic and data structures."
    },
    {
      title: "Security Curiosity",
      description: "Hands-on participation in Capture The Flag (CTF) competitions, web vulnerability analysis, and bug bounty reconnaissance methodologies."
    },
    {
      title: "Automation & Systems",
      description: "Designing end-to-end automations connecting APIs, forms, spreadsheets, and AI decision nodes to eliminate manual friction."
    }
  ],
  meta: [
    { label: "Location", value: "Savar, Dhaka, Bangladesh" },
    { label: "Education", value: "B.Sc. in CSE · Daffodil International University" },
    { label: "Focus Areas", value: "Security · Networks · Automation · Software" }
  ],
  focusTracks: [
    {
      number: "01",
      title: "Cybersecurity",
      status: "Active",
      description:
        "CTF problem-solving, Linux security foundations, web application security study, and structured bug bounty methodologies.",
      items: [
        "CTF problem solving",
        "Linux administration & hardening",
        "Web application security",
        "Bug bounty reconnaissance (learning)"
      ]
    },
    {
      number: "02",
      title: "Networking",
      status: "Learning",
      description:
        "Strengthening foundational network literacy through Cisco learning resources, routing concepts, and protocol inspection.",
      items: [
        "Cisco networking fundamentals",
        "TCP/IP and OSI models",
        "Subnetting & packet flow analysis",
        "Network troubleshooting mindset"
      ]
    },
    {
      number: "03",
      title: "AI Automation",
      status: "Building",
      description:
        "Developing n8n workflows that connect webhooks, forms, spreadsheets, email services, and LLM reasoning steps.",
      items: [
        "n8n automation engine",
        "API integrations & webhooks",
        "Prompt engineering & AI agents",
        "Automated lead qualification pipelines"
      ]
    }
  ]
};
