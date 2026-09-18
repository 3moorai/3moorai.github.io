export type ProjectStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
export type PreviewType = 'iframe' | 'screenshot';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: 'web' | 'ai' | 'javascript' | 'python' | 'other';
  technologies: string[];
  previewType: PreviewType;
  screenshotUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  status: ProjectStatus;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'ai';
  proficiency: number;
  icon?: string;
  description?: string;
  sortOrder: number;
}

export interface SiteSettings {
  siteName: string;
  logoUrl: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  facebookUrl: string;
  email: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  aboutWho: string;
  aboutLearning: string;
  aboutBuilding: string;
  aboutInterests: string;
  aboutGoal: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  archivedProjects: number;
  totalMessages: number;
  unreadMessages: number;
  categoriesCount: Record<string, number>;
}
