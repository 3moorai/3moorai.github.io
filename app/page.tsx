import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  FolderCode,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  CheckCircle,
  Terminal,
  Zap,
} from "lucide-react";
import { getProjects, getSkills, getSettings } from "@/lib/db";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { HomeContactForm } from "@/components/HomeContactForm";

export const dynamic = "force-static";

export default async function HomePage() {
  const [projects, skills, settings] = await Promise.all([
    getProjects({ status: "PUBLISHED" }),
    getSkills(),
    getSettings(),
  ]);

  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 4);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-batta-yellow/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* ========================================================
          1. HERO SECTION
      ======================================================== */}
      <section id="hero" className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 relative">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Text Side */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-yellow-subtle">
              <span className="w-2 h-2 rounded-full bg-batta-yellow animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                {settings.heroBadge || "👋 أهلاً بيك في بطة"}
              </span>
            </div>

            {/* Giant Main Title */}
            <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight mb-6 leading-[1.15]">
              {settings.heroTitle || "أنا عمر"}
              <span className="text-batta-yellow">.</span>
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed mb-8 max-w-2xl">
              {settings.heroSubtitle || "Developer & Creator — ببني أفكار تتحول لمشاريع حقيقية"}
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light shadow-yellow-sm hover:shadow-yellow-md transition-all active:scale-[0.98]"
              >
                <FolderCode className="w-4 h-4" />
                <span>استكشف مشاريعي</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-batta-yellow/40 transition-all active:scale-[0.98] backdrop-blur-md"
              >
                <span>تواصل معي</span>
              </Link>

              {/* Official Facebook Button */}
              <a
                href={settings.facebookUrl || "https://www.facebook.com/omar.mhmdfwzi"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#70a9f5] border border-[#1877F2]/30 hover:border-[#1877F2]/60 transition-all active:scale-[0.98]"
              >
                <Facebook className="w-4 h-4 fill-current" />
                <span>Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Metrics / Stats Chips */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-6 border-t border-white/[0.08]">
              <div>
                <span className="block text-2xl font-black text-white">100%</span>
                <span className="text-xs text-zinc-400">شغف بالتطوير</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-batta-yellow">Modern</span>
                <span className="text-xs text-zinc-400">واجهات زجاجية</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white">{projects.length}+</span>
                <span className="text-xs text-zinc-400">مشاريع تم بناؤها</span>
              </div>
            </div>
          </div>

          {/* Right / Visual Mascot Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Ambient Backlight Glow */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-batta-yellow/20 blur-[90px] -z-10 animate-pulse-glow" />

            {/* Glass Showcase Card */}
            <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl p-6 sm:p-8 glass-card border border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col items-center text-center animate-float">
              {/* Top Card Badge */}
              <div className="self-end mb-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-batta-yellow/15 text-batta-yellow border border-batta-yellow/30">
                  OFFICIAL MASCOT
                </span>
              </div>

              {/* 3D Duck Image with Glow & Strict Explicit Dimensions */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 my-2 flex items-center justify-center drop-shadow-[0_20px_35px_rgba(255,212,0,0.25)]">
                <Image
                  src={settings.logoUrl || "/batta-logo.png"}
                  alt="بطة - الهوية الرسمية"
                  width={240}
                  height={240}
                  priority
                  className="w-auto h-auto max-w-full max-h-full object-contain"
                />
              </div>

              {/* Mascot Brand Caption */}
              <div className="mt-4 pt-4 border-t border-white/10 w-full flex items-center justify-between">
                <div className="text-right">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>بطة</span>
                    <span className="text-batta-yellow">🦆</span>
                  </h3>
                  <span className="text-xs text-zinc-400">الهوية البصرية لعمر فوزي</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ABOUT ME ("عني") BENTO GRID SECTION
      ======================================================== */}
      <section id="about" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="yellow" className="mb-3">
              عني
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              من أنا وماذا أقدم؟
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              نظرة عامة عن رحلتي البرمجية، ما أتعلمه، والمشاريع التي أسعى لبنائها.
            </p>
          </div>

          {/* Calm & Balanced 3-Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Who Am I */}
            <div className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-batta-yellow/10 border border-batta-yellow/20 flex items-center justify-center text-batta-yellow mb-5 shadow-yellow-sm">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">من أنا</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {settings.aboutWho}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center gap-2 text-xs text-batta-yellow font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>تركيز كامل على الجودة والنظافة البرمجية</span>
              </div>
            </div>

            {/* Card 2: What I Build & Learn */}
            <div className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-5">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">ماذا أبني وأتعلم</h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                  {settings.aboutBuilding}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {settings.aboutLearning}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.08] text-xs text-zinc-400">
                منصات تفاعلية • تقنيات ذكاء اصطناعي حديثة
              </div>
            </div>

            {/* Card 3: Mission & Goal */}
            <div className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-batta-yellow/10 border border-batta-yellow/20 flex items-center justify-center text-batta-yellow mb-5 shadow-yellow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">الرؤية والهدف</h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                  {settings.aboutGoal}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {settings.aboutInterests}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/[0.08] text-xs text-batta-yellow font-semibold">
                تحويل الأفكار الإبداعية إلى واقع حي
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SKILLS ("مهاراتي") SECTION
      ======================================================== */}
      {skills.length > 0 && (
        <section id="skills" className="py-24 px-4 sm:px-6 relative bg-zinc-950/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="yellow" className="mb-3">
                القدرات والمهارات
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
                التقنيات التي أعمل بها
              </h2>
              <p className="text-sm sm:text-base text-zinc-400">
                مجموعة من المهارات والأدوات التي أعتمد عليها لبناء حلول برمجية مستقرة وسريعة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="glass-card rounded-2xl p-5 border border-white/[0.08] hover:border-batta-yellow/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/[0.05] text-zinc-400 border border-white/10">
                      {skill.category}
                    </span>
                    <span className="text-xs font-bold text-batta-yellow">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-batta-yellow transition-colors">
                    {skill.name}
                  </h3>

                  {skill.description && (
                    <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                  )}

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-zinc-800/80 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-batta-yellow to-amber-500 transition-all duration-700"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          4. FEATURED PROJECTS ("مشاريعي البرمجية") SECTION
      ======================================================== */}
      <section id="projects" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="yellow" className="mb-3">
                المشاريع
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black text-white">
                مشاريعي البرمجية
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white/[0.05] hover:bg-white/10 text-batta-yellow hover:text-white border border-batta-yellow/30 hover:border-white/20 transition-all group"
            >
              <span>عرض كل المشاريع ({projects.length})</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Project Grid - Wider & Elegant */}
          <div
            className={`grid gap-7 ${
              displayProjects.length === 1
                ? "max-w-[460px] mx-auto grid-cols-1"
                : displayProjects.length === 2
                ? "max-w-3xl mx-auto grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CONTACT ME ("تواصل معي") SECTION
      ======================================================== */}
      <section id="contact" className="py-24 px-4 sm:px-6 relative bg-zinc-950/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="yellow" className="mb-3">
              تواصل
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              جاهز لبدء مشروع جديد؟
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              يمكنك مراسلتي عبر النموذج التالي أو مباشرة من خلال حساب Facebook الرسمي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Direct Facebook & Info */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <a
                href={settings.facebookUrl || "https://www.facebook.com/omar.mhmdfwzi"}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#1877F2]/60 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Facebook className="w-6 h-6 fill-current" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-400 block mb-1">
                    حساب الفيسبوك الرسمي
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#70a9f5] transition-colors">
                    Omar Fawzi
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2">
                    اضغط لفتح الحساب في تبويب جديد والتواصل السريع.
                  </p>
                </div>
              </a>

              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <span className="text-xs font-mono text-batta-yellow block mb-2">
                  🦆 هوية بطة
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  مطور شغوف بالتطوير الحديث، الواجهات التفاعلية، والأنظمة الرقمية المتقنة.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form Component */}
            <div className="md:col-span-7">
              <HomeContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}