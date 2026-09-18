import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export const projectSchema = z.object({
  title: z.string().min(2, "اسم المشروع مطلوب (حرفان على الأقل)"),
  slug: z
    .string()
    .min(2, "الرابط اللطيف (Slug) مطلوب")
    .regex(/^[a-z0-9-]+$/, "Slug يجب أن يحتوي فقط على أحرف إنجليزية صغيرة وأرقام وشرطات"),
  description: z.string().min(5, "الوصف المختصر مطلوب (5 أحرف على الأقل)"),
  fullDescription: z.string().min(10, "الوصف الشامل مطلوب (10 أحرف على الأقل)"),
  category: z.enum(["web", "ai", "javascript", "python", "other"]),
  technologies: z.array(z.string()).min(1, "أضف تقنية واحدة على الأقل"),
  previewType: z.enum(["iframe", "screenshot"]).default("iframe"),
  screenshotUrl: z.string().optional().or(z.literal("")),
  liveUrl: z.string().url("رابط الموقع غير صحيح").optional().or(z.literal("")),
  githubUrl: z.string().url("رابط GitHub غير صحيح").optional().or(z.literal("")),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  seoTitle: z.string().optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
  ogImage: z.string().optional().or(z.literal("")),
});

export const skillSchema = z.object({
  name: z.string().min(1, "اسم المهارة مطلوب"),
  category: z.enum(["frontend", "backend", "tools", "ai"]),
  proficiency: z.number().min(0).max(100).default(90),
  icon: z.string().optional(),
  description: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

export const settingsSchema = z.object({
  siteName: z.string().min(1, "اسم الموقع مطلوب"),
  logoUrl: z.string().min(1, "رابط اللوجو مطلوب"),
  heroBadge: z.string().min(1, "الشارة الترحيبية مطلوبة"),
  heroTitle: z.string().min(1, "العنوان الرئيسي مطلوب"),
  heroSubtitle: z.string().min(1, "الوصف التعريفي مطلوب"),
  facebookUrl: z.string().url("رابط Facebook غير صالح"),
  email: z.string().email("البريد الإلكتروني غير صالح").or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  aboutWho: z.string().min(5, "نص 'من أنا' مطلوب"),
  aboutLearning: z.string().min(5, "نص 'ماذا أتعلم' مطلوب"),
  aboutBuilding: z.string().min(5, "نص 'ماذا أبني' مطلوب"),
  aboutInterests: z.string().min(5, "نص 'اهتماماتي' مطلوب"),
  aboutGoal: z.string().min(5, "نص 'هدفي' مطلوب"),
  footerText: z.string().min(1, "نص التذييل مطلوب"),
  seoTitle: z.string().min(1, "عنوان SEO مطلوب"),
  seoDescription: z.string().min(5, "وصف SEO مطلوب"),
  ogImage: z.string().optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  message: z.string().min(5, "الرسالة يجب أن تكون 5 أحرف على الأقل").max(2000, "الرسالة طويلة جدًا"),
});
