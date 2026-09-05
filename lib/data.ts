// Centralized data management for portfolio
// This file contains all the data that needs to be updated across the application

export type Project = {
  name: string;
  slug: string;
  desc: string;
  tech: string[];
  repo?: string;
  demo?: string;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'internship' | 'education' | 'volunteer' | 'project' | 'work';
};

export type Resume = {
  url: string;
  filename: string;
  lastUpdated: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type Profile = {
  name: string;
  handle: string;
  tagline: string;
  about: string;
  contact: {
    email_masked: string;
    phone_masked: string;
    open_to: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    portfolio: string;
  };
  education: {
    summary: string;
  };
  achievements?: string[];
};

// ===== PROJECTS =====
export const PROJECTS: Project[] = [
  {
    name: "Pause-Distraction — Productivity Chrome Extension",
    slug: "pause-distraction",
    desc: "Built a Chrome extension (Manifest V3) that tracks time spent on distracting websites, enforces user-defined limits, and redirects to a motivational 'Time’s Up' page. Implemented smart time-tracking, local storage privacy, configurable domain blocking, and lightweight alarms for efficient performance.",
    tech: ["JavaScript", "Chrome", "HTML", "CSS"],
    repo: "https://github.com/akashsharma20150",
    demo: "https://github.com/akashsharma20150",
  },
  {
    name: "ChatZ — Real-time Chat Web Application",
    slug: "chatz",
    desc: "Designed ChatZ's architecture using RESTful APIs and WebSockets, enabling seamless real-time messaging used by 30+ employees across departments. Built using Node.js, Express, MongoDB, WebSockets, and Stream Chat API for real-time communication, with a responsive frontend using React and Tailwind CSS.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Socket.io"],
    repo: "https://github.com/akashsharma20150",
    demo: "https://github.com/akashsharma20150",
  },
  {
    name: "AI Purchase Order (PO) Extractor",
    slug: "po-extractor",
    desc: "Architected a full-stack AI-powered Purchase Order Extractor implementing a hybrid LLM orchestration pipeline with Gemini 3.1 Flash and PyMuPDF for high-accuracy structured PDF data extraction and predictive analytics.",
    tech: ["FastAPI", "Python", "React", "SQLAlchemy", "Docker"],
    repo: "https://github.com/akashsharma20150",
    demo: "https://github.com/akashsharma20150",
  },
];

// ===== WORK EXPERIENCE =====
export const EXPERIENCE: Experience[] = [
  {
    title: "SDE Intern",
    company: "WAISL Limited",
    period: "10-June-2026 - 10-Aug-2026",
    description: "Architected a full-stack AI-powered Purchase Order (PO) Extractor using React, FastAPI, Gemini 3.1 Flash, SQLAlchemy, and PyMuPDF, implementing a hybrid LLM orchestration pipeline for high-accuracy structured PDF data extraction. Designed end-to-end data analytics and machine learning pipelines, integrating EDA, NLP, feature engineering, model benchmarking, and data visualization to solve real-world predictive analytics problems.",
    type: 'internship'
  },
  {
    title: "SDE Intern",
    company: "Esecurity Innovations Labs LLP",
    period: "7-Apr-2026 - 7-June-2026",
    description: "Designed and developed a production-grade AI platform enabling conversational assistance, interview automation, personalized recommendations, and secure career management through a modular architecture. Engineered fault-tolerant backend services with React, Node.js, Express.js, MongoDB, Socket.io, Gemini 2.5 Flash, JWT, and OAuth 2.0, incorporating caching, secure middleware, and real-time event processing.",
    type: 'internship'
  },
  {
    title: "Trainee",
    company: "Dr. Reddy's Foundation",
    period: "16-May-2024 - 12-July-2024",
    description: "Enhanced employability and customer service skills through practical, industry-aligned training.",
    type: 'work'
  }
];

// ===== SKILLS =====
export const SKILLS: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java"]
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "React.js", "Node.js", "Express.js", "MongoDB", "Next.js", "FastAPI"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Docker", "Git", "GitHub", "Vercel", "Render", "VS Code", "Postman", "Canva", "Premiere Pro"]
  },
  {
    title: "CS Fundamentals",
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Computer Networks"]
  },
  {
    title: "Data Analytics",
    skills: ["NumPy", "Pandas", "Matplotlib", "SQL", "SQLAlchemy", "MS Excel", "Power BI"]
  },
  {
    title: "Soft Skills",
    skills: ["Communication", "Problem Solving", "Adaptability"]
  }
];

// ===== RESUME =====
export const RESUME: Resume = {
  url: "/akash-kumar-sharma-resume.pdf",
  filename: "Akash_Kumar_Sharma_Resume.pdf",
  lastUpdated: "2026-08-10"
};

// ===== PROFILE =====
export const PROFILE: Profile = {
  name: "Akash Kumar Sharma",
  handle: "akash",
  tagline: "Computer Science Undergraduate | Full-Stack & AI Developer",
  about: "Computer Science undergraduate with strong foundations in Data Structures & Algorithms and full-stack development. Passionate about building scalable, high-performance applications and solving complex technical challenges. Experienced in hackathons and collaborative projects, with a focus on creating secure, reliable, and impactful software solutions that deliver real-world value.",
  contact: {
    email_masked: "akashsharma20150@gmail.com",
    phone_masked: "+91 88600 64486",
    open_to: "Open to SDE Roles & Collaborative Opportunities",
  },
  socials: {
    github: "https://github.com/akashsharma20150",
    linkedin: "https://linkedin.com/in/akashsharma20150",
    twitter: "https://x.com/akashsharma20150",
    instagram: "https://instagram.com/akashsharma20150",
    portfolio: "https://akashsharma.dev",
  },
  education: {
    summary: "B.Tech in Computer Science and Engineering — Guru Gobind Singh Indraprastha University (GTB4CEC), 2024-2028 (CGPA: 8.62/10)",
  },
};

// ===== SONGS (Now Listening Widget) =====
export type Song = {
  title: string;
  artist: string;
};

export const SONGS: Song[] = [
  { title: "My Eyes", artist: "Travis Scott" },
  { title: "No Pole", artist: "Don Toliver" },
  { title: "Dracula", artist: "Tame Impala" },
  { title: "Humble", artist: "Kendrick Lamar" },
  { title: "Softcore", artist: "The Neighbourhood" },
  { title: "Runaway", artist: "Kanye West" },
  { title: "Wildflower", artist: "Billie Eilish" },
  { title: "Sao Paulo", artist: "The Weeknd" },
  { title: "Chanel", artist: "Tyla" },
  { title: "Chihiro", artist: "Billie Eilish" },
  { title: "Sofia", artist: "Clairo" },
  { title: "Guess", artist: "Billie Eilish"},
  { title: "I KNOW?", artist: "Travis Scott"},
  { title: "Ilomilo", artist: "Billie Eilish"}
];

// ===== TASKS (Todo Widget) =====
export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export const TASKS: Task[] = [
  { id: 1, title: "Running high on AstroJs", completed: false },
  { id: 2, title: "May God shed light when i debug", completed: false},
  { id: 3, title: "Just keep Watching", completed: false },
  { id: 4, title: "Watching The Night Manager", completed: false },
  { id: 5, title: "Intern Lesson 101: Git is dangerous", completed: false},
  { id: 6, title: "Lewis Hamilton is the GOAT", completed: false },
  { id: 7, title: "Try starting your day with Jim Beam", completed: false },
  { id: 8, title: "Life's a B*TCH, so are we", completed: false },
  { id: 9, title: "I love Billie Eilish" , completed: false },
  { id: 10, title: "Sometimes I wish I'd become a composer", completed: false},
  { id: 11, title: "I swear I didn't use AI to build this", completed: false},
  { id: 12, title: "My flirting style is forgetting how to talk", completed: false}
];

// ===== HOBBIES =====
export type Hobby = string;

export const HOBBIES: Hobby[] = [
  "Gaming — \"Rise, Tarnished.\" - Elden Ring",
  "Chess — 1200+ on Chess.com",
  "Cats — Permanently chosen by at least one feline",
  "Cooking — Alchemy, to satisfy my hunger"
];

// ===== UTILITY FUNCTIONS =====

/**
 * Get project by slug or index
 */
export function getProject(identifier: string | number): Project | undefined {
  if (typeof identifier === 'number') {
    return PROJECTS[identifier - 1]; // 1-indexed
  }
  return PROJECTS.find(p => p.slug === identifier || p.name.toLowerCase().includes(identifier.toLowerCase()));
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return PROJECTS;
}

/**
 * Get all experience entries
 */
export function getAllExperience(): Experience[] {
  return EXPERIENCE;
}

/**
 * Get resume information
 */
export function getResume(): Resume {
  return RESUME;
}

/**
 * Get profile information
 */
export function getProfile(): Profile {
  return PROFILE;
}

/**
 * Get projects count for dynamic text
 */
export function getProjectsCount(): number {
  return PROJECTS.length;
}

/**
 * Get all skills categories
 */
export function getAllSkills(): SkillCategory[] {
  return SKILLS;
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): SkillCategory | undefined {
  return SKILLS.find(s => s.title.toLowerCase() === category.toLowerCase());
}

/**
 * Get all hobbies
 */
export function getHobbies(): Hobby[] {
  return HOBBIES;
}

/**
 * Get all songs for Now Listening widget
 */
export function getSongs(): Song[] {
  return SONGS;
}

/**
 * Get all tasks for Todo widget
 */
export function getTasks(): Task[] {
  return TASKS;
}
