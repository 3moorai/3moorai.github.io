"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Globe,
  Star,
  Search,
  Check,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Project, ProjectStatus } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge, CategoryBadge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useToast } from "@/components/ui/Toast";

interface AdminProjectsManagerProps {
  initialProjects: Project[];
}

export function AdminProjectsManager({ initialProjects }: AdminProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState<Project["category"]>("web");
  const [technologiesText, setTechnologiesText] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("PUBLISHED");
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  const resetForm = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setFullDescription("");
    setCategory("web");
    setTechnologiesText("");
    setLiveUrl("");
    setGithubUrl("");
    setStatus("PUBLISHED");
    setIsFeatured(false);
    setSortOrder(projects.length + 1);
    setSeoTitle("");
    setSeoDescription("");
    setOgImage("");
  };

  const openAddModal = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setFullDescription(p.fullDescription);
    setCategory(p.category);
    setTechnologiesText(p.technologies.join(", "));
    setLiveUrl(p.liveUrl || "");
    setGithubUrl(p.githubUrl || "");
    setStatus(p.status);
    setIsFeatured(p.isFeatured);
    setSortOrder(p.sortOrder ?? 0);
    setSeoTitle(p.seoTitle || "");
    setSeoDescription(p.seoDescription || "");
    setOgImage(p.ogImage || "");
    setIsFormOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      // Auto-generate a clean english slug if user is adding
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (generated) setSlug(generated);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const techArray = technologiesText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug,
      description,
      fullDescription: fullDescription || description,
      category,
      technologies: techArray.length > 0 ? techArray : ["Web"],
      previewType: "iframe",
      liveUrl: liveUrl || undefined,
      githubUrl: githubUrl || undefined,
      status,
      isFeatured,
      sortOrder: Number(sortOrder),
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      ogImage: ogImage || undefined,
    };

    try {
      if (editingProject) {
        // PUT update
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "فشل تحديث المشروع");

        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? data.project : p))
        );
        showToast("تم تحديث المشروع بنجاح!", "success");
      } else {
        // POST create
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "فشل إنشاء المشروع");

        setProjects((prev) => [...prev, data.project]);
        showToast("تمت إضافة المشروع الجديد بنجاح!", "success");
      }

      setIsFormOpen(false);
      resetForm();
    } catch (err: any) {
      showToast(err.message || "حدث خطأ أثناء حفظ المشروع", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (p: Project) => {
    const nextStatus: ProjectStatus =
      p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/projects/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, status: nextStatus }),
      });
      if (!res.ok) throw new Error("تعذر تغيير حالة النشر");
      setProjects((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, status: nextStatus } : item))
      );
      showToast(`تم تغيير الحالة إلى ${nextStatus === "PUBLISHED" ? "منشور" : "مسودة"}`, "success");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleToggleFeatured = async (p: Project) => {
    const nextFeatured = !p.isFeatured;
    try {
      const res = await fetch(`/api/admin/projects/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, isFeatured: nextFeatured }),
      });
      if (!res.ok) throw new Error("تعذر تعديل حالة التميز");
      setProjects((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, isFeatured: nextFeatured } : item))
      );
      showToast(nextFeatured ? "تم تعيين المشروع كمميز ⭐" : "تمت إزالة المشروع من المميز", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل حذف المشروع");
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast("تم حذف المشروع بنجاح", "success");
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered list
  const filtered = projects.filter((p) => {
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">إدارة المشاريع</h1>
          <p className="text-xs text-zinc-400">
            إضافة وتعديل وحذف المشاريع البرمجية والتحكم في ظهورها
          </p>
        </div>

        <Button onClick={openAddModal} rightIcon={<Plus className="w-4 h-4" />}>
          إضافة مشروع جديد
        </Button>
      </div>

      {/* Filters Toolbar */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="بحث بالاسم أو slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-batta-yellow/60"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? "bg-batta-yellow text-zinc-950 font-bold"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
            >
              {st === "ALL"
                ? "الكل"
                : st === "PUBLISHED"
                ? "المنشورة"
                : st === "DRAFT"
                ? "المسودات"
                : "المؤرشفة"}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400">
                <th className="py-3 px-4 font-semibold">المشروع</th>
                <th className="py-3 px-3 font-semibold">التصنيف</th>
                <th className="py-3 px-3 font-semibold">رابط الموقع</th>
                <th className="py-3 px-3 font-semibold">الحالة</th>
                <th className="py-3 px-3 font-semibold text-center">مميز؟</th>
                <th className="py-3 px-3 font-semibold text-center">الترتيب</th>
                <th className="py-3 px-4 font-semibold text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-batta-yellow/10 border border-batta-yellow/20 flex items-center justify-center text-batta-yellow shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-sm">{p.title}</span>
                        <span className="text-[11px] text-zinc-500 font-mono">/{p.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <CategoryBadge category={p.category} />
                  </td>
                  <td className="py-3 px-3 font-mono text-zinc-400">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-batta-yellow hover:underline"
                        title={p.liveUrl}
                      >
                        <span className="max-w-[130px] truncate">{p.liveUrl.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleToggleStatus(p)}
                      title="اضغط للتبديل بين منشور ومسودة"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <StatusBadge status={p.status} />
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        p.isFeatured
                          ? "bg-batta-yellow/20 border-batta-yellow/50 text-batta-yellow"
                          : "bg-white/[0.04] border-white/10 text-zinc-500 hover:text-white"
                      }`}
                      title={p.isFeatured ? "مشروع مميز" : "جعله مميزًا"}
                    >
                      <Star className={`w-3.5 h-3.5 ${p.isFeatured ? "fill-current" : ""}`} />
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-zinc-300">
                    {p.sortOrder}
                  </td>
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="معاينة"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-batta-yellow hover:bg-white/5 transition-colors"
                        title="تعديل المشروع"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="حذف المشروع"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>{editingProject ? "تعديل المشروع" : "إضافة مشروع جديد"}</span>
              <span className="text-batta-yellow">🦆</span>
            </h2>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    اسم المشروع <span className="text-batta-yellow">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: Ultimate AI"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    الرابط اللطيف (Slug) <span className="text-batta-yellow">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ultimate-ai"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-batta-yellow/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  الوصف المختصر (يظهر في الكارت) <span className="text-batta-yellow">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="وصف سريع وواضح للمشروع..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  الوصف الشامل (يظهر في صفحة المشروع المستقلة)
                </label>
                <textarea
                  rows={4}
                  placeholder="شرح مفصل وموسع للميزات وطريقة البناء..."
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    التصنيف
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
                  >
                    <option value="web">Web Application</option>
                    <option value="ai">AI System</option>
                    <option value="javascript">JavaScript Tool</option>
                    <option value="python">Python</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    التقنيات (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Python"
                    value={technologiesText}
                    onChange={(e) => setTechnologiesText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    رابط الموقع الحي (Live URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-batta-yellow/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    رابط مستودع GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-batta-yellow/60"
                  />
                </div>
              </div>



              {/* Status, Featured & Sort Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    الحالة
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
                  >
                    <option value="PUBLISHED">منشور (PUBLISHED)</option>
                    <option value="DRAFT">مسودة (DRAFT)</option>
                    <option value="ARCHIVED">مؤرشف (ARCHIVED)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    ترتيب الظهور
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-batta-yellow focus:ring-0"
                    />
                    <span>مشروع مميز (Featured)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsFormOpen(false)}
                >
                  إلغاء
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                  {editingProject ? "حفظ التعديلات" : "إضافة المشروع"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="تأكيد حذف المشروع"
        message={`هل أنت متأكد أنك تريد حذف مشروع "${deleteTarget?.title}"؟ لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.`}
        confirmLabel="حذف المشروع"
        cancelLabel="إلغاء"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}