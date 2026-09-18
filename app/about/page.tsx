import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail, FolderCode, Code2, Cpu, Zap, ArrowLeft, CheckCircle2 } from "lucide-react";
import { getSettings, getSkills } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "عني | بطة — عمر فوزي",
  description: "تعرف على عمر فوزي، المطور وصانع المحتوى وراء براند بطة.",
};

export default async function AboutPage() {
  const [settings, skills] = await Promise.all([getSettings(), getSkills()]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="yellow" className="mb-3">
          التعريف الشخصي
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">
          عن عمر فوزي & بطة 🦆
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          رحلتي في عالم البرمجة وبناء الواجهات والتطبيقات الحديثة.
        </p>
      </div>

      {/* Hero Visual Showcase */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 mb-16 flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 flex items-center justify-center drop-shadow-[0_15px_30px_rgba(255,212,0,0.3)] animate-float">
          <Image
            src={settings.logoUrl || "/batta-logo.png"}
            alt="بطة"
            fill
            className="object-contain"
          />
        </div>

        <div>
          <span className="text-xs font-mono text-batta-yellow uppercase tracking-widest block mb-2">
            DEVELOPER & CREATOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            أهلاً بك، أنا عمر فوزي
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
            {settings.aboutWho}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={settings.facebookUrl || "https://www.facebook.com/omar.mhmdfwzi"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#1877F2]/15 text-[#70a9f5] border border-[#1877F2]/30 hover:border-[#1877F2]/60 transition-all"
            >
              <Facebook className="w-3.5 h-3.5 fill-current" />
              <span>حساب الفيسبوك</span>
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light transition-all"
            >
              <FolderCode className="w-3.5 h-3.5" />
              <span>استعراض المشاريع</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="glass-card rounded-2xl p-7 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-batta-yellow/10 text-batta-yellow flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">ماذا أتعلم؟</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {settings.aboutLearning}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-7 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-batta-yellow/10 text-batta-yellow flex items-center justify-center mb-4">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">ماذا أبني؟</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {settings.aboutBuilding}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-7 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-batta-yellow/10 text-batta-yellow flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">اهتماماتي البرمجية</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {settings.aboutInterests}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-7 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-batta-yellow/10 text-batta-yellow flex items-center justify-center mb-4">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">هدفي وطموحي</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {settings.aboutGoal}
          </p>
        </div>
      </div>
    </div>
  );
}