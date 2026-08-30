export interface PersonalInfo {
  name: string;
  professionalTitles: string[];
  typingTitles: string[];
  location: string;
  careerGoal: string;
  email: string;
  phone: string;
  currentStatus: string;
  college: string;
  introText: string;
  aboutBio: string[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  stats: {
    label: string;
    value: string;
    sublabel: string;
    iconName: string;
  }[];
}

export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  degree: string;
  period: string;
  status: string;
  grade: string;
  description: string;
  icon: string;
}

export type SkillLevelType = 'Comfortable' | 'Currently Learning';

export interface SkillItem {
  name: string;
  proficiency: number; // 0 - 100 percentage
  level: SkillLevelType;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export type ProjectCategory = 'All' | 'Prompt Engineering' | 'AI' | 'Analytics' | 'Other';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory[];
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  image: string;
  highlights?: string[];
}

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming Goal';
  technologies: string[];
  icon: string;
}

export interface ExperienceCard {
  title: string;
  status: string;
  description: string;
  highlights: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  bio: string | null;
}
