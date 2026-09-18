import fs from "fs";
import path from "path";
import { Project, Skill, SiteSettings, ContactMessage, AdminUser, DashboardStats } from "./types";
import { hashPassword } from "./auth";

interface BattaStore {
  admin: AdminUser | null;
  projects: Project[];
  skills: Skill[];
  settings: SiteSettings;
  messages: ContactMessage[];
}

const DATA_FILE = path.join(process.cwd(), "data", "batta-store.json");

const defaultSettings: SiteSettings = {
  siteName: "بطة",
  logoUrl: "/batta-logo.png",
  heroBadge: "👋 أهلاً بيك في بطة",
  heroTitle: "أنا عمر",
  heroSubtitle: "Developer & Creator — ببني أفكار تتحول لمشاريع حقيقية",
  facebookUrl: "https://www.facebook.com/omar.mhmdfwzi",
  email: "",
  githubUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  aboutWho: "أنا عمر فوزي، مطور برمجيات ومبتكر رقمي شغوف ببناء وتطوير تطبيقات ويب حديثة وأنظمة رقمية تحل مشاكل حقيقية وتقدم تجربة استخدام استثنائية.",
  aboutLearning: "أركز دائمًا على تعلم أحدث تقنيات الويب، معمارية السيرفرات السحابية، ودمج الذكاء الاصطناعي في التطبيقات اليومية.",
  aboutBuilding: "أبني منصات متكاملة (Full-Stack) تجمع بين الأداء الفائق والسرعة والتصميم العصري المتقن.",
  aboutInterests: "هندسة البرمجيات، تصميم الواجهات الزجاجية والمستقبلية (Glassmorphism)، تقنيات الويب السريع، ومشاريع الذكاء الاصطناعي.",
  aboutGoal: "تحويل الأفكار الطموحة إلى مشاريع حقيقية تلهم الناس وتضيف قيمة عملية ملموسة.",
  footerText: "© 2026 Omar Fawzi. All rights reserved.",
  seoTitle: "بطة | عمر فوزي — Developer Portfolio & Projects",
  seoDescription: "الموقع والبورتفوليو الرسمي للمطور عمر فوزي (بطة) — استعراض المشاريع البرمجية والمهارات والتطبيقات الحديثة.",
  ogImage: "/batta-logo.png",
};

const defaultSkills: Skill[] = [
  { id: "sk-1", name: "HTML5 & Modern CSS", category: "frontend", proficiency: 95, sortOrder: 1, description: "تصميم واجهات حديثة ومتجاوبة" },
  { id: "sk-2", name: "JavaScript & TypeScript", category: "frontend", proficiency: 90, sortOrder: 2, description: "كتابة كود متين وسريع" },
  { id: "sk-3", name: "React & Next.js", category: "frontend", proficiency: 92, sortOrder: 3, description: "بناء تطبيقات ويب متقدمة بالـ App Router" },
  { id: "sk-4", name: "Tailwind CSS & Glassmorphism", category: "frontend", proficiency: 95, sortOrder: 4, description: "تصاميم داكنة وعصرية بلمسات احترافية" },
  { id: "sk-5", name: "Python", category: "backend", proficiency: 88, sortOrder: 5, description: "معالجة البيانات والبرمجة النصية والذكاء الاصطناعي" },
  { id: "sk-6", name: "Node.js & REST APIs", category: "backend", proficiency: 87, sortOrder: 6, description: "بناء واجهات برمجية آمنة وسريعة" },
  { id: "sk-7", name: "Git & Version Control", category: "tools", proficiency: 90, sortOrder: 7, description: "إدارة الإصدارات والتعاون البرمجي" },
  { id: "sk-8", name: "AI Integration & APIs", category: "ai", proficiency: 89, sortOrder: 8, description: "دمج نماذج الذكاء الاصطناعي المتقدمة" },
];

const defaultProjects: Project[] = [
  {
    id: "proj-1",
    title: "Ultimate AI",
    slug: "ultimate-ai",
    description: "منصة ذكاء اصطناعي متقدمة لمعالجة الملفات والمستندات والبحث الذكي والرؤية الحاسوبية.",
    fullDescription: "مشروع Ultimate AI هو منصة متكاملة طورتها لمعالجة وتحليل الملفات والمستندات والصور باستخدام أحدث تقنيات الذكاء الاصطناعي. تمتاز المنصة بواجهة مستخدم داكنة وسريعة الاستجابة ومحرك تدقيق وتحليل ذكي للمستندات والبيانات.",
    category: "ai",
    technologies: ["Python", "JavaScript", "AI Vision", "Modern UI"],
    previewType: "iframe",
    liveUrl: "https://example.com",
    githubUrl: "",
    status: "PUBLISHED",
    isFeatured: true,
    sortOrder: 1,
    seoTitle: "مشروع Ultimate AI — منصة الذكاء الاصطناعي",
    seoDescription: "منصة متطورة لتحليل الملفات والبحث الذكي بالذكاء الاصطناعي",
    ogImage: "/batta-logo.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-2",
    title: "Dawaaek Platform",
    slug: "dawaaek-platform",
    description: "نظام رقمي متكامل لإدارة الخدمات الدوائية والبحث عن الأدوية وتتبع المخزون.",
    fullDescription: "منصة دوائك توفر تجربة سهلة وسلسة للبحث عن الأدوية، تتبع التوافر، وإدارة الفروع والطلبات الطبية بدقة وسرعة فائقة مع مراعاة أعلى معايير سهولة الاستخدام وتجاوب الشاشات.",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Database"],
    previewType: "iframe",
    liveUrl: "https://example.com",
    githubUrl: "",
    status: "PUBLISHED",
    isFeatured: true,
    sortOrder: 2,
    seoTitle: "منصة دوائك الرقمية — حلول دوائية ذكية",
    seoDescription: "نظام متكامل للخدمات الصيدلانية وإدارة الأدوية بدقة وسرعة",
    ogImage: "/batta-logo.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

function readStore(): BattaStore {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial: BattaStore = {
        admin: null,
        projects: defaultProjects,
        skills: defaultSkills,
        settings: defaultSettings,
        messages: [],
      };
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading batta store:", error);
    return {
      admin: null,
      projects: defaultProjects,
      skills: defaultSkills,
      settings: defaultSettings,
      messages: [],
    };
  }
}

function writeStore(store: BattaStore): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing batta store:", error);
  }
}

// ---------------- PROJECTS ----------------
export async function getProjects(filter?: {
  status?: "PUBLISHED" | "DRAFT" | "ARCHIVED" | "ALL";
  category?: string;
  search?: string;
  isFeatured?: boolean;
}): Promise<Project[]> {
  const store = readStore();
  let list = [...store.projects];

  if (filter?.status && filter.status !== "ALL") {
    list = list.filter((p) => p.status === filter.status);
  }

  if (filter?.category && filter.category !== "all") {
    list = list.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
  }

  if (filter?.isFeatured !== undefined) {
    list = list.filter((p) => p.isFeatured === filter.isFeatured);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }

  list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  return list;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const store = readStore();
  return store.projects.find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const store = readStore();
  return store.projects.find((p) => p.id === id) || null;
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  const store = readStore();
  const newProject: Project = {
    ...data,
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.projects.push(newProject);
  writeStore(store);
  return newProject;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  const store = readStore();
  const index = store.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  store.projects[index] = {
    ...store.projects[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeStore(store);
  return store.projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const store = readStore();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  if (store.projects.length !== initialLength) {
    writeStore(store);
    return true;
  }
  return false;
}

// ---------------- SKILLS ----------------
export async function getSkills(): Promise<Skill[]> {
  const store = readStore();
  return store.skills.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function updateSkills(skills: Skill[]): Promise<Skill[]> {
  const store = readStore();
  store.skills = skills;
  writeStore(store);
  return store.skills;
}

// ---------------- SETTINGS ----------------
export async function getSettings(): Promise<SiteSettings> {
  const store = readStore();
  return { ...defaultSettings, ...(store.settings || {}) };
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = readStore();
  store.settings = {
    ...defaultSettings,
    ...(store.settings || {}),
    ...settings,
  };
  writeStore(store);
  return store.settings;
}

// ---------------- MESSAGES ----------------
export async function getContactMessages(): Promise<ContactMessage[]> {
  const store = readStore();
  return (store.messages || []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function saveContactMessage(data: { name: string; email: string; message: string }): Promise<ContactMessage> {
  const store = readStore();
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ...data,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  if (!store.messages) store.messages = [];
  store.messages.push(newMsg);
  writeStore(store);
  return newMsg;
}

export async function markMessageAsRead(id: string): Promise<boolean> {
  const store = readStore();
  const msg = store.messages.find((m) => m.id === id);
  if (msg) {
    msg.isRead = true;
    writeStore(store);
    return true;
  }
  return false;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const store = readStore();
  const initialLength = store.messages.length;
  store.messages = store.messages.filter((m) => m.id !== id);
  if (store.messages.length !== initialLength) {
    writeStore(store);
    return true;
  }
  return false;
}

// ---------------- ADMIN AUTH ----------------
export async function getAdminUser(): Promise<AdminUser | null> {
  const store = readStore();
  if (store.admin) return store.admin;

  // If no admin yet in JSON, check environment variables to auto-initialize safely
  const envUsername = process.env.ADMIN_USERNAME || "omar";
  const envPassword = process.env.ADMIN_PASSWORD || "OmarAdmin2026!#";
  if (envUsername && envPassword) {
    const passwordHash = await hashPassword(envPassword);
    const newAdmin: AdminUser = {
      id: "admin-1",
      username: envUsername,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    store.admin = newAdmin;
    writeStore(store);
    return newAdmin;
  }
  return null;
}

export async function updateAdminCredentials(username: string, newPassword?: string): Promise<AdminUser> {
  const store = readStore();
  const current = await getAdminUser();
  const updated: AdminUser = {
    id: current?.id || "admin-1",
    username,
    passwordHash: newPassword ? await hashPassword(newPassword) : current?.passwordHash || "",
    createdAt: current?.createdAt || new Date().toISOString(),
  };
  store.admin = updated;
  writeStore(store);
  return updated;
}

// ---------------- DASHBOARD STATS ----------------
export async function getDashboardStats(): Promise<DashboardStats> {
  const store = readStore();
  const projects = store.projects || [];
  const messages = store.messages || [];

  const categoriesCount: Record<string, number> = {};
  for (const p of projects) {
    categoriesCount[p.category] = (categoriesCount[p.category] || 0) + 1;
  }

  return {
    totalProjects: projects.length,
    publishedProjects: projects.filter((p) => p.status === "PUBLISHED").length,
    draftProjects: projects.filter((p) => p.status === "DRAFT").length,
    archivedProjects: projects.filter((p) => p.status === "ARCHIVED").length,
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => !m.isRead).length,
    categoriesCount,
  };
}

// ---------------- BACKUP & EXPORT ----------------
export async function exportDatabaseBackup(): Promise<BattaStore> {
  const store = readStore();
  return {
    admin: null, // never expose passwordHash in backup
    projects: store.projects,
    skills: store.skills,
    settings: store.settings,
    messages: store.messages,
  };
}
