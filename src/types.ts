export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  medium?: string;
  email?: string;
  phone?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  detailedBio: string;
  location: string;
  avatarUrl: string;
  socials: SocialLinks;
  resumeUrl: string;
  isAvailableForHire?: boolean;
  availableText?: string;
  yearsActiveStat?: string;
  completedProjectsStat?: string;
  qualityStat?: string;
  yearsActiveLabel?: string;
  completedProjectsLabel?: string;
  qualityLabel?: string;
  pillars?: string[];
  
  // Section Headers
  experienceBadge?: string;
  experienceTitle?: string;
  experienceDesc?: string;
  
  educationBadge?: string;
  educationTitle?: string;
  educationDesc?: string;
  
  skillsBadge?: string;
  skillsTitle?: string;
  skillsDesc?: string;
  
  projectsBadge?: string;
  projectsTitle?: string;
  projectsDesc?: string;
  
  achievementsBadge?: string;
  achievementsTitle?: string;
  achievementsDesc?: string;
  
  contactBadge?: string;
  contactTitle?: string;
  contactDesc?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  certificateUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // percentage (0-100)
  category: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export type TabId = 'about' | 'experience' | 'education' | 'skills' | 'projects' | 'achievements' | 'contact';

export interface Tab {
  id: TabId;
  label: string;
}
