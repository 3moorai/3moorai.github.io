import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FolderKanban,
  CheckCircle2,
  FileEdit,
  Archive,
  MessageSquare,
  Plus,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { getDashboardStats, getProjects } from "@/lib/db";
import { StatusBadge, CategoryBadge } from "@/components/ui/Badge";

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [stats, projects] = await Promise.all([
    getDashboardStats(),
    getProjects({ status: "ALL" }),
  ]);

  const recentProjects = projects.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 flex items-center gap-2">
            <span>نظرة عامة على المنصة</span>
            <span className="text-batta-yellow">🦆</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            متابعة حالة المشاريع والإحصائيات ورسائل الزوار
          </p>
        </div>

        <Link
          href="/admin/projects?action=new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light text-xs font-bold shadow-yellow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="w-9 h-9 rounded-xl bg-white/[0.05] text-white flex items-center justify-center mb-3">
            <FolderKanban className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-400 block mb-1">إجمالي المشاريع</span>
          <span className="text-2xl font-black text-white">{stats.totalProjects}</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="w-9 h-9 rounded-xl bg-batta-yellow/10 text-batta-yellow flex items-center justify-center mb-3">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-400 block mb-1">المشاريع المنشورة</span>
          <span className="text-2xl font-black text-batta-yellow">{stats.publishedProjects}</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-300 flex items-center justify-center mb-3">
            <FileEdit className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-400 block mb-1">المسودات</span>
          <span className="text-2xl font-black text-amber-300">{stats.draftProjects}</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="w-9 h-9 rounded-xl bg-zinc-800/60 text-zinc-400 flex items-center justify-center mb-3">
            <Archive className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-400 block mb-1">المؤرشفة</span>
          <span className="text-2xl font-black text-zinc-400">{stats.archivedProjects}</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 col-span-2 sm:col-span-1">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-400 block mb-1">رسائل الزوار</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">{stats.totalMessages}</span>
            {stats.unreadMessages > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {stats.unreadMessages} جديد
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-batta-yellow" />
            <span>أحدث المشاريع المسجلة</span>
          </h2>
          <Link
            href="/admin/projects"
            className="text-xs font-semibold text-batta-yellow hover:text-batta-yellow-light flex items-center gap-1 transition-colors"
          >
            <span>إدارة كل المشاريع</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="pb-3 pr-2 font-semibold">المشروع</th>
                <th className="pb-3 px-2 font-semibold">التصنيف</th>
                <th className="pb-3 px-2 font-semibold">الحالة</th>
                <th className="pb-3 px-2 font-semibold">الترتيب</th>
                <th className="pb-3 pl-2 text-left font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {recentProjects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 pr-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm">{p.title}</span>
                      <span className="text-[11px] text-zinc-500 font-mono">/{p.slug}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-2">
                    <CategoryBadge category={p.category} />
                  </td>
                  <td className="py-3.5 px-2">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3.5 px-2 font-mono text-zinc-400">
                    {p.sortOrder}
                  </td>
                  <td className="py-3.5 pl-2 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="معاينة في الموقع"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/projects?edit=${p.id}`}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] font-semibold transition-colors"
                      >
                        تعديل
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}