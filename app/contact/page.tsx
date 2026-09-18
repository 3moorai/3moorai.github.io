import React from "react";
import { Metadata } from "next";
import { Facebook, Mail, MessageSquare, ExternalLink } from "lucide-react";
import { getSettings } from "@/lib/db";
import { HomeContactForm } from "@/components/HomeContactForm";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "تواصل معي | بطة — عمر فوزي",
  description: "تواصل مع عمر فوزي لمناقشة أفكار المشاريع والتعاون البرمجي.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Badge variant="yellow" className="mb-3">
          تواصل معي
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">
          دعنا نتحدث ونبني معًا
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          سواء كان لديك فكرة مشروع، استفسار تقني، أو رغبة في التعاون، يسعدني دائمًا تواصلك.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Social Links */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <a
            href={settings.facebookUrl || "https://www.facebook.com/omar.mhmdfwzi"}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#1877F2]/60 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Facebook className="w-6 h-6 fill-current" />
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-400 block mb-1">
                فيسبوك (Facebook)
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-[#70a9f5] transition-colors">
                Omar Fawzi
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                انقر للمراسلة السريعة عبر فيسبوك ماسنجر.
              </p>
            </div>
          </a>

          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-batta-yellow/10 text-batta-yellow flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">استجابة سريعة</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              أحرص على قراءة كافة الرسائل الواردة والرد عليها في أقرب فرصة ممكنة.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-7">
          <HomeContactForm />
        </div>
      </div>
    </div>
  );
}