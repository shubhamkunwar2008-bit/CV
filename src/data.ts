import { PersonalInfo, ExperienceItem, EducationItem, SkillItem, ProjectItem, AchievementItem } from './types';
import avatarImage from './assets/images/profile_avatar_1782538217628.jpg';

export const INITIAL_PERSONAL_INFO: PersonalInfo = {
  name: "Shubham Kunwar",
  title: "Creative Technologist & UI Engineer",
  tagline: "Building high-fidelity digital experiences at the intersection of design, animation, and engineering.",
  bio: "I am a passionate software architect specializing in crafting highly interactive, visual, and performant web applications. With expertise in React, Next.js, and modern CSS frameworks, I translate complex requirements into clean, user-centric, and accessible codebases.",
  detailedBio: "Over the past 6+ years, I have collaborated with design agencies, startups, and product companies to engineer custom frontend solutions, visual dashboards, and custom interactive modules. I thrive in environments that value high craftsmanship, micro-interactions, robust architecture, and meticulous attention to detail. My design philosophy is rooted in structural honesty, minimalist layout, elegant typography, and purposeful motion.",
  location: "San Francisco, CA (Open to Remote)",
  avatarUrl: avatarImage,
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    medium: "https://medium.com",
    email: "shubhamkunwar2008@gmail.com",
    phone: "+1 (555) 019-2834"
  },
  resumeUrl: "#",
  isAvailableForHire: true,
  availableText: "Available for Hire",
  yearsActiveStat: "6+",
  completedProjectsStat: "24+",
  qualityStat: "100%",
  yearsActiveLabel: "Years Active",
  completedProjectsLabel: "Completed Projects",
  qualityLabel: "Craft Quality",
  pillars: [
    "Pixel-perfect Frontend Engineering",
    "Accessible & Performant Layouts",
    "Creative Interactive Prototypes",
    "Modern API & Database Architectures"
  ],
  experienceBadge: "Timeline of Craft",
  experienceTitle: "Professional Experience",
  experienceDesc: "A chronological roadmap detailing past engineering achievements, team mentorship, and product launches.",
  educationBadge: "Academic Journey",
  educationTitle: "Education & Credentials",
  educationDesc: "A record of my academic history, professional certifications, and continuous specialized learning.",
  skillsBadge: "Arsenal of Skills",
  skillsTitle: "Tech Stack & Expertise",
  skillsDesc: "A detailed breakdown of my technical specialties, tool proficiencies, and creative capabilities.",
  projectsBadge: "Selected Masterpieces",
  projectsTitle: "Featured Creations",
  projectsDesc: "An exhibit of bespoke interfaces, custom interactive components, and comprehensive full-stack prototypes.",
  achievementsBadge: "Milestones of Excellence",
  achievementsTitle: "Honors & Achievements",
  achievementsDesc: "A timeline of prestigious recognition, hackathon victories, academic honors, and engineering milestones.",
  contactBadge: "Get In Touch",
  contactTitle: "Start a Conversation",
  contactDesc: "Interested in starting a project, consulting opportunities, or saying hello? Drop me a line below."
};

export const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Lead Creative Developer",
    company: "Aetheria Interactive",
    location: "San Francisco, CA",
    period: "2024 - Present",
    description: "Architecting high-fidelity interactive systems, micro-interactions, and visual tools.",
    achievements: [
      "Led development of a custom React-based design token generator used across 4 product lines, boosting design-to-dev velocity by 35%.",
      "Engineered an canvas-based performance analytics dashboard that handles 100k+ real-time events with 60fps rendering.",
      "Established strict component-driven development practices, increasing Jest test coverage from 40% to 92%."
    ]
  },
  {
    id: "exp-2",
    role: "Senior Frontend Engineer",
    company: "PixelCraft Labs",
    location: "Remote",
    period: "2021 - 2024",
    description: "Crafted accessible web experiences, responsive widgets, and motion-heavy branding portfolios.",
    achievements: [
      "Redesigned core booking flow using React Server Components, decreasing PageSpeed load times by 1.8 seconds (40% faster).",
      "Mentored 6 junior/mid-level frontend engineers and established accessibility (WCAG 2.1 AA) guidelines.",
      "Developed a custom animation engine utilizing Framer Motion/motion, standardizing UI transitions across the web platform."
    ]
  },
  {
    id: "exp-3",
    role: "Full Stack Engineer",
    company: "Symphony Solutions",
    location: "Boston, MA",
    period: "2019 - 2021",
    description: "Built scalable full-stack applications with Node.js/Express backends and React frontends.",
    achievements: [
      "Constructed collaborative workspace boards utilizing WebSockets, reducing real-time sync latency by 120ms.",
      "Integrated secure Firebase Authentication and Firestore schemas, managing structured profiles for 50,000+ active users.",
      "Developed a robust RESTful API in Express to support batch reports, reducing server-side memory overhead by 30%."
    ]
  }
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: "edu-1",
    degree: "M.S. in Software Engineering",
    institution: "Northeastern University",
    location: "Boston, MA",
    period: "2017 - 2019",
    description: "Specialized in Human-Computer Interaction (HCI) and Advanced Web Technologies.",
    achievements: [
      "Graduated with Honors (GPA 3.85/4.00).",
      "Completed Master's thesis on 'Adaptive UI Layouts using Contextual Machine Learning'.",
      "Received Outstanding Graduate Research Assistant Award."
    ]
  },
  {
    id: "edu-2",
    degree: "B.S. in Computer Science",
    institution: "State University of Science",
    location: "International",
    period: "2013 - 2017",
    description: "Acquired fundamentals of computer science, algorithms, and system design.",
    achievements: [
      "President of the Creative Computing Club.",
      "Won First Place in the Regional Tech-Challenge Hackathon (48-hour challenge)."
    ]
  }
];

export const INITIAL_SKILLS: SkillItem[] = [
  // Frontend
  { id: "skill-1", name: "React / React 19", level: 95, category: "Frontend" },
  { id: "skill-2", name: "TypeScript", level: 92, category: "Frontend" },
  { id: "skill-3", name: "Tailwind CSS", level: 98, category: "Frontend" },
  { id: "skill-4", name: "motion / Framer Motion", level: 90, category: "Frontend" },
  { id: "skill-5", name: "Next.js / Remix", level: 88, category: "Frontend" },
  { id: "skill-6", name: "HTML5 / Canvas API", level: 85, category: "Frontend" },

  // Backend / Cloud
  { id: "skill-7", name: "Node.js / Express", level: 85, category: "Backend" },
  { id: "skill-8", name: "Firebase (Firestore & Auth)", level: 90, category: "Backend" },
  { id: "skill-9", name: "PostgreSQL / SQL", level: 80, category: "Backend" },
  { id: "skill-10", name: "REST & GraphQL APIs", level: 88, category: "Backend" },

  // Tools & Design
  { id: "skill-11", name: "Git / GitHub Workflows", level: 94, category: "Tools" },
  { id: "skill-12", name: "Figma (UI/UX Design)", level: 85, category: "Tools" },
  { id: "skill-13", name: "Docker", level: 75, category: "Tools" },
  { id: "skill-14", name: "Webpack / Vite", level: 88, category: "Tools" },
  { id: "skill-15", name: "CI/CD (GitHub Actions)", level: 80, category: "Tools" }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Aura Creative Studio",
    description: "An elegant, interactive immersive landing site with canvas-based particles, smooth scrolling, and scroll-bound animations.",
    longDescription: "Aura Creative Studio is a front-facing website designed for digital marketing. It utilizes WebGL shaders, responsive canvas particle layers, and custom transition managers to construct an incredibly premium experience. It includes interactive case studies, responsive layout structures, and fluid micro-animations that respond to cursor focus.",
    category: "Design & Interaction",
    tags: ["React", "HTML5 Canvas", "motion", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600&h=400",
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: "proj-2",
    title: "Kanban Collab Engine",
    description: "A real-time, multi-user project board with persistent cloud states, drag-and-drop lists, and activity logs.",
    longDescription: "A full-scale collaborative project platform. Features include real-time board sync across connected clients, full user authentication (OAuth & Email), and deep customization (custom tag markers, archive boards, detailed cards with attachments). Supports offline-first edits that sync seamlessly when back online.",
    category: "Full Stack",
    tags: ["TypeScript", "Node.js", "Firebase", "WebSockets"],
    imageUrl: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&q=80&w=600&h=400",
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: "proj-3",
    title: "Dusk Darkroom",
    description: "A professional browser-based photo adjustment studio featuring real-time CSS/Canvas matrix image filters and history states.",
    longDescription: "Dusk Darkroom brings lightweight image processing right into the client browser. It supports non-destructive adjustments (brightness, contrast, saturation, exposure, crop, and custom matrix duotones) with a robust undo-redo queue, EXIF metadata inspector, and instant high-quality PNG export. Built completely using client-side parallel rendering.",
    category: "Web Application",
    tags: ["React", "TypeScript", "Canvas API", "CSS Filters"],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600&h=400",
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: "proj-4",
    title: "Syntax Highlighting Sandbox",
    description: "A visual playground for developers to write, format, test, and style custom code snippets with custom syntax token editors.",
    longDescription: "An interactive editor constructed to format and style code beautifully. It features standard monospaced pairings, immediate parser validation, automatic indentation, token analysis, and custom-styled output generation ready to copy as clean HTML or share via a permalink system.",
    category: "Developer Tool",
    tags: ["React", "Vite", "Monaco Editor", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400",
    demoUrl: "https://example.com/demo4",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: "proj-5",
    title: "Zen Focus Matrix",
    description: "A beautifully minimalist time management board built to promote deep flow, incorporating pomodoro cycles and spatial noise mixers.",
    longDescription: "Zen Focus is a task manager focusing on minimalism and user wellbeing. It includes clean, fluid, customizable work/break timers, ambient sound mixers (white noise, rain, forest, ocean), and local progress charts tracking focus sessions. Styled with generous whitespace and low-opacity drop shadows for visual relief.",
    category: "Design & Interaction",
    tags: ["React", "Web Audio API", "motion", "Local Storage"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600&h=400",
    demoUrl: "https://example.com/demo5",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: "proj-6",
    title: "OmniSearch Dashboard",
    description: "A high-speed administrative control hub indexing multiple API pipelines with live multi-column filters.",
    longDescription: "A powerful visual table layout integrating data across system APIs. It supports instant debounced searching, dynamic column sorting, pagination controls, CSV exports, and configurable interactive widgets representing metric deltas with lightweight sparkline charts.",
    category: "Web Application",
    tags: ["React", "D3.js", "REST API", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400",
    demoUrl: "https://example.com/demo6",
    githubUrl: "https://github.com",
    featured: false
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    title: "1st Place - Global Web Craft Hackathon",
    issuer: "DevPost & Vercel",
    date: "2025",
    description: "Won first prize among 2,500+ participants for building a high-fidelity visual UI compiler that generates clean, accessible Tailwind CSS code."
  },
  {
    id: "ach-2",
    title: "Outstanding UI/UX Design Contributor",
    issuer: "Aetheria Open Source Community",
    date: "2024",
    description: "Awarded for designing and engineering a library of fluid, micro-interaction components downloaded over 100k+ times."
  },
  {
    id: "ach-3",
    title: "Cybersecurity & Web Security Specialist Certificate",
    issuer: "Google Career Certificates",
    date: "2023",
    description: "Completed comprehensive practical modules on secure code practices, pen-testing client interfaces, and designing secure OAuth systems."
  }
];

// Helper methods to load/save state from LocalStorage
const STORAGE_PREFIX = 'shubham_cv_';

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing localStorage key "${key}":`, error);
  }
}
