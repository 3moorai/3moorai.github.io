import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Mail, ArrowUpRight, Heart, Sparkles, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-28 pb-12 px-4 sm:px-6">
      {/* Contained, Balanced Glass Container */}
      <div className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 glass-card border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Light at the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-batta-yellow/50 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-10">
          {/* Col 1: Brand & Identity (Span 5) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform drop-shadow-[0_4px_12px_rgba(255,212,0,0.25)]">
                <Image
                  src="/batta-logo.png"
                  alt="بطة"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white flex items-center gap-1.5 group-hover:text-batta-yellow transition-colors">
                  <span>بطة</span>
                  <span className="w-2 h-2 rounded-full bg-batta-yellow" />
                </span>
                <span className="text-[11px] text-zinc-400 font-mono tracking-wider">
                  عمر فوزي • Developer Portfolio
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 max-w-sm">
              منصة برمجية شخصية متكاملة للمطور عمر فوزي، لعرض أحدث المشاريع التقنية والواجهات الحديثة بأداء عالي وتصميم متقن.
            </p>

            {/* Social Buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/omar.mhmdfwzi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook - Omar Fawzi"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-[#1877F2]/15 text-zinc-300 hover:text-[#70a9f5] border border-white/10 hover:border-[#1877F2]/40 transition-all text-xs font-semibold"
              >
                <Facebook className="w-4 h-4 fill-current" />
                <span>فيسبوك</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-batta-yellow/10 text-zinc-300 hover:text-batta-yellow border border-white/10 hover:border-batta-yellow/40 transition-all text-xs font-semibold"
              >
                <Mail className="w-4 h-4" />
                <span>تواصل معي</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-batta-yellow" />
              <span>التنقل السريع</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-batta-yellow transition-colors block py-0.5">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-batta-yellow transition-colors block py-0.5">
                  عن المطور
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-zinc-400 hover:text-batta-yellow transition-colors block py-0.5">
                  المهارات والتقنيات
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-zinc-400 hover:text-batta-yellow transition-colors block py-0.5">
                  معرض المشاريع
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-batta-yellow transition-colors block py-0.5">
                  نموذج التواصل
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admin & Status (Span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-batta-yellow" />
                <span>لوحة الإدارة والتقنية</span>
              </h4>

              <div className="space-y-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-batta-yellow/10 border border-white/10 hover:border-batta-yellow/40 text-xs font-semibold text-zinc-300 hover:text-batta-yellow transition-all group/admin"
                >
                  <span className="flex items-center gap-2">
                    <span>دخول لوحة التحكم</span>
                    <span className="text-[10px] font-mono text-zinc-500">(Admin)</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/admin:translate-x-[-2px] group-hover/admin:translate-y-[-2px]" />
                </Link>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>متاح لمشاريع وتطبيقات جديدة</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    Next.js 14 • Tailwind CSS • TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <p>© 2026 عمر فوزي (Omar Fawzi). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>صُنع بشغف وهوية</span>
            <span className="text-batta-yellow font-bold">بطة 🦆</span>
          </div>
        </div>
      </div>
    </footer>
  );
}