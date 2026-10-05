export interface Profile {
  id?: string;
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  availableForHire: boolean;
  yearsExperience: string;
  completedProjects: string;
  happyClients: string;
  avatarUrl: string;
  cvUrl: string;
  aboutStory: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: 'Android Apps' | 'Web Applications' | 'Websites' | 'AI Applications' | 'Firebase Applications' | 'Other Projects';
  technologies: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  status: 'Completed' | 'In Progress' | 'Coming Soon';
  features: string;
  problemStatement: string;
  solution: string;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend & DB' | 'Mobile & Apps' | 'Core & Tools';
  level: number; // 0 - 100
  icon: string;
  description: string;
  displayOrder: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string; // newline separated or comma separated
  turnaround: string;
  displayOrder: number;
}

export interface Message {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
}

export interface ProjectRequest {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  projectType: string;
  projectDescription: string;
  requiredFeatures?: string;
  budget?: string;
  deadline?: string;
  referenceUrl?: string;
  additionalMessage?: string;
  status: 'new' | 'reviewing' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handle: string;
  displayOrder: number;
  isPrimary?: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  platform: 'YouTube' | 'Instagram';
  url: string;
  videoId?: string;
  thumbnailUrl: string;
  category: string;
  description: string;
  displayOrder: number;
}
