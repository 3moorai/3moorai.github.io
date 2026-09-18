import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Admin Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 mb-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & User Info */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Image src="/batta-logo.png" alt="بطة" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white flex items-center gap-1">
                <span>لوحة تحكم بطة</span>
                <span className="text-batta-yellow">🦆</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                مرحبًا، {session.username}
              </span>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="text-xs text-zinc-400 hover:text-batta-yellow flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10"
          >
            <span>زيارة الموقع</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <Link
            href="/admin"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-batta-yellow" />
            <span>نظرة عامة</span>
          </Link>

          <Link
            href="/admin/projects"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors flex items-center gap-1.5"
          >
            <FolderKanban className="w-3.5 h-3.5 text-batta-yellow" />
            <span>إدارة المشاريع</span>
          </Link>

          <Link
            href="/admin/settings"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-batta-yellow" />
            <span>الإعدادات والمهارات</span>
          </Link>

          <Link
            href="/admin/messages"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-batta-yellow" />
            <span>الرسائل الواردة</span>
          </Link>
        </nav>

        {/* Actions: Theme, Export & Logout */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <ThemeToggle />
          <AdminExportButton />
          <AdminLogoutButton />
        </div>
      </div>

      {/* Main Admin View Content */}
      <div className="min-h-[65vh]">{children}</div>
    </div>
  );
}