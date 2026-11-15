export interface WorkExperience {
  period: string;
  role: string;
  organization: string;
  type: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  details?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  category: string;
}

export interface AwardItem {
  title: string;
  year: string;
  context?: string;
}

export const workExperience: WorkExperience[] = [
  {
    period: "2018 — Present",
    role: "Freelance Video Editor",
    organization: "Self-Employed",
    type: "Remote / Client-Facing",
    description:
      "Produced, cut, and finalized promotional, educational, and short-form video assets for independent creators and small businesses. Managed tight turnaround timelines and client feedback cycles.",
    skills: ["Adobe Premiere Pro", "CapCut", "DaVinci Resolve", "Pacing & Storyboarding", "Client Delivery"]
  },
  {
    period: "2020 — 2023",
    role: "Freelance Photographer",
    organization: "Local Event & Portrait Clients",
    type: "Contract",
    description:
      "Executed on-location portrait sessions and event photography. Managed post-capture raw image processing, retouching, client previews, and print/digital asset deliveries.",
    skills: ["Composition", "Lighting", "Color Grading", "Client Relations", "Digital Asset Workflow"]
  },
  {
    period: "2019 — 2023",
    role: "Private Tutor",
    organization: "Academic Tutoring",
    type: "Part-Time",
    description:
      "Instructed secondary school students in Physics, Mathematics, and fundamental computer literacy. Developed tailored exercises and visual analogies to break down complex mathematical concepts.",
    skills: ["Curriculum Tailoring", "Concept Synthesis", "Mentorship", "Problem Breakdown"]
  },
  {
    period: "2016 — Present",
    role: "Campus Event Management & Media",
    organization: "BIAM Model School & College / Govt. Azizul Haque College",
    type: "Leadership & Volunteer",
    description:
      "Coordinated campus ceremonies, student festivals, and competitions. Provided technical setup, media documentation, photography, and promotional banners.",
    skills: ["Event Operations", "Audio/Visual Coordination", "Team Leadership", "Logistics"]
  }
];

export const educationHistory: EducationItem[] = [
  {
    period: "2025 — Present",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    details: "Coursework covering Data Structures, Algorithms, Discrete Mathematics, and Computer Architecture."
  },
  {
    period: "2023",
    degree: "Higher Secondary Certificate (HSC) — GPA 5.00 / 5.00",
    institution: "Govt. Azizul Haque College",
    location: "Bogura, Bangladesh",
    details: "Science Group. Awarded General Scholarship for academic merit."
  },
  {
    period: "2021",
    degree: "Secondary School Certificate (SSC) — GPA 5.00 / 5.00",
    institution: "BIAM Model School and College",
    location: "Bogura, Bangladesh",
    details: "Science Group. Awarded General Scholarship for academic merit."
  }
];

export const certifications: CertificationItem[] = [
  {
    title: "AI 100: Fundamentals",
    issuer: "TCM Security",
    issued: "Jan 2026",
    credentialId: "cert 2989tv00",
    category: "AI"
  },
  {
    title: "Practical Security Fundamentals",
    issuer: "TCM Security",
    issued: "Nov 2025",
    credentialId: "cert 23x517md",
    category: "Cybersecurity"
  },
  {
    title: "Linux 100: Fundamentals",
    issuer: "TCM Security",
    issued: "Nov 2025",
    expires: "Dec 2035",
    category: "Linux"
  },
  {
    title: "Programming 100: Fundamentals",
    issuer: "TCM Security",
    issued: "Nov 2025",
    expires: "Dec 2034",
    category: "Programming"
  },
  {
    title: "AgentX Prompting",
    issuer: "Microsoft / Netcom Learning",
    issued: "2025",
    category: "AI / Prompting"
  },
  {
    title: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University / edX",
    issued: "2024",
    category: "Computer Science"
  },
  {
    title: "The Complete Web Development Bootcamp",
    issuer: "Angela Yu / Udemy",
    issued: "2023",
    category: "Web Development"
  },
  {
    title: "DIU_CYBERCON 2025 — Organizer",
    issuer: "Daffodil International University",
    issued: "2025",
    category: "Cybersecurity / Leadership"
  }
];

export const awardsList: AwardItem[] = [
  {
    title: "1st Runner Up — Cyber Security Awareness Day In-House CTF",
    year: "2026",
    context: "Cyber Security Center · Daffodil International University"
  },
  {
    title: "Organizer — National Capture The Flag (DIU_CYBERCON)",
    year: "2025",
    context: "National cybersecurity contest organization"
  },
  {
    title: "Young Innovator Recognition",
    year: "2024",
    context: "July Students Community"
  },
  {
    title: "General Government Scholarship (HSC)",
    year: "2023",
    context: "Board of Intermediate and Secondary Education, Rajshahi"
  },
  {
    title: "General Government Scholarship (SSC)",
    year: "2021",
    context: "Board of Intermediate and Secondary Education, Rajshahi"
  },
  {
    title: "Best Cultural Coordinator Award",
    year: "2021",
    context: "Cultural Classicists"
  }
];
