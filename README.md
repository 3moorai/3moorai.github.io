# 🦆 بطة — Modern Personal Portfolio & Projects Platform

منصة وبورتفوليو رقمي متكامل واحترافي للمطور وصانع المحتوى **عمر فوزي (Omar Fawzi)**، مصمم بهوية بصرية مميزة داكنة ومستقبلية (Dark Glassmorphism + Duck Yellow `#FFD400`)، مع لوحة تحكم كاملة (Admin Dashboard) لإدارة المشاريع، ونظام معاينة ذكي للمواقع (Intelligent Website Preview System).

---

## 🚀 المميزات الرئيسية (Key Features)

### 🎨 1. تجربة مستخدم وهيكلية بصرية استثنائية
- **اللوجو الرسمي للبطة ثلاثي الأبعاد**: مدمج في كل أنحاء المنصة مع وهج أصفر تفاعلي وتأثيرات عائمة (Floating Animation).
- **Dark Glassmorphism**: استخدام احترافي للأسطح الشفافة (`backdrop-filter: blur`)، الحدود الدقيقة، وتدرجات الإضاءة دون مبالغة.
- **RTL & Mobile-First**: تجاوب كامل مع كافة أحجام الشاشات (320px, 390px, 768px, 1440px, 1920px) مع دعم كامل للغة العربية والمصطلحات التقنية الإنجليزية.
- **شريط تنقل عائم (Floating Glass Navbar)**: يتكيف ناعمًا مع التمرير (Scroll) ويتحول لقائمة ذكية على الهواتف.

### 💼 2. نظام المشاريع والمعاينة الذكية (Projects & Preview)
- **معاينة حية للمواقع (Live Iframe Preview)** للمواقع التي تسمح بالـ Iframe.
- **Fallback Preview الذكي**: في حال منع الموقع للـ Iframe بسبب `X-Frame-Options` أو `CSP`، يعرض النظام بطاقة تفاعلية أو لقطة شاشة مرفوعة دون كسر الواجهة إطلاقًا.
- **رفع حقيقي لقطات الشاشة (Screenshot Upload)** من لوحة التحكم مباشرة.
- **صفحات تفاصيل مستقلة لكل مشروع (`/projects/[slug]`)** مع عناوين SEO و OpenGraph وصفحات تفصيلية كاملة.
- **Project Quick Modal**: للاطلاع السريع والمباشر من الصفحة الرئيسية أو المعرض.
- **حالات المشاريع**:
  - `PUBLISHED`: يظهر فورًا في الموقع العام.
  - `DRAFT`: مسودة محفوظة في لوحة التحكم فقط.
  - `ARCHIVED`: مشروع مؤرشف.

### 🔐 3. لوحة تحكم إدارية متكاملة (Production-Ready Admin)
- **مسار دخول محمي (`/admin/login`)**:
  - تشفير كلمات المرور باستخدام `bcryptjs`.
  - جلسات JWT آمنة مخزنة في HTTP-Only Secure Cookies.
  - حماية مشددة بـ **Rate Limiting** ضد محاولات التخمين وهجمات القوة الغاشمة.
- **لوحة الإحصائيات (`/admin`)**: استعراض أعداد المشاريع المنشورة، المسودات، المؤرشفة، ورسائل الزوار.
- **إدارة المشاريع الكاملة (`/admin/projects`)**: إضافة، تعديل، تغيير النشر/المميز، وترتيب المشاريع، مع نافذة تأكيد حقيقية قبل الحذف.
- **إدارة الإعدادات والمهارات (`/admin/settings`)**: التحكم بنصوص Hero و About وقنوات التواصل وقائمة المهارات بدون لمس الكود.
- **صندوق الرسائل (`/admin/messages`)**: مراجعة واستقبال رسائل الزوار الواردة من نموذج "تواصل معي".
- **تصدير نسخة احتياطية (JSON Backup/Export)**: تحميل ملف كامل لكافة بيانات المشاريع والإعدادات بضغطة زر واحدة.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Glassmorphism System
- **Icons**: Lucide React
- **Authentication**: JWT (`jose`) + `bcryptjs` + HTTP-Only Cookies
- **Validation**: Zod (Schema validation للـ Forms والـ API)
- **Database**:
  - مهيأ لـ **PostgreSQL / Supabase / Neon** عبر Prisma Schema (`prisma/schema.prisma`).
  - مخزن دائم محلي في `data/batta-store.json` يتيح التشغيل الفوري والتطوير بدون إعدادات معقدة.
- **Storage**: نظام مرن يدعم Supabase Storage و S3 و Local/DataURL لضمان عمل الرفع في بيئات Serverless كـ Vercel أو Cloudflare.

---

## ⚙️ طريقة التشغيل السريع (Getting Started)

### 1. تثبيت الحزم
```bash
npm install
```

### 2. إعداد متغيرات البيئة (Environment Variables)
انسخ ملف `.env.example` إلى `.env`:
```bash
cp .env.example .env
```

محتوى ملف `.env`:
```env
# Database (PostgreSQL / Supabase / Neon)
DATABASE_URL="postgresql://user:password@localhost:5432/batta"

# Security & Admin Setup
JWT_SECRET="your-super-strong-jwt-secret-at-least-32-chars"
ADMIN_USERNAME="omar"
ADMIN_PASSWORD="OmarAdmin2026!#"

# Storage
STORAGE_PROVIDER="dataurl"

# Public
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. إنشاء وتجهيز أول حساب Admin
قم بتشغيل الأمر التالي لتهيئة بيانات الأدمن وتشفير كلمة المرور:
```bash
npm run admin:setup
```

### 4. تشغيل خادم التطوير
```bash
npm run dev
```
افتح المتصفح على [http://localhost:3000](http://localhost:3000).

---

## 🔑 تسجيل الدخول للوحة التحكم

- رابط الدخول: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- اسم المستخدم الافتراضي: `omar`
- كلمة المرور: المحددة في `.env` (الافتراضية: `OmarAdmin2026!#`)
*(يمكنك تغيير اسم المستخدم أو كلمة المرور في أي وقت من ملف `.env` ثم تشغيل `npm run admin:setup`)*

---

## 🏗️ بناء المشروع للإنتاج (Production Build)

```bash
npm run build
npm run start
```

---

## ☁️ النشر على السحابة (Deployment)

### النشر على Vercel:
1. ارفع الكود إلى مستودع GitHub.
2. استورد المشروع في Vercel.
3. أضف متغيرات البيئة (`JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `DATABASE_URL`).
4. اضغط Deploy وسيتم بناء المشروع بنجاح.

### النشر على Supabase / PostgreSQL:
- أنشئ مشروعًا في Supabase.
- انسخ الـ Connection String وضعها في `DATABASE_URL`.
- استخدم `npx prisma db push` لدفع الجداول مباشرة إلى السيرفر السحابي.

---

## 📄 الترخيص وحقوق الملكية
© 2026 Omar Fawzi. جميع الحقوق محفوظة لهوية **بطة 🦆**.