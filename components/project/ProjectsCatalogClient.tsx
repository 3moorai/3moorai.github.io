"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, FolderCode, Sparkles } from "lucide-react";
import { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { Badge } from "@/components/ui/Badge";

interface ProjectsCatalogClientProps {
  initialProjects: Project[];
}

export function ProjectsCatalogClient({ initialProjects }: ProjectsCatalogClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"order" | "newest" | "title">("order");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "web", label: "تطبيقات الويب (Web)" },
    { id: "ai", label: "ذكاء اصطناعي (AI)" },
    { id: "javascript", label: "جافاسكريبت (JS)" },
    { id: "python", label: "بايثون (Python)" },
    { id: "other", label: "أخرى" },
  ];

  const filteredProjects = useMemo(() => {
    let list = [...initialProjects];

    // Filter by Category
    if (selectedCategory !== "all") {
      list = list.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }

    return list;
  }, [initialProjects, selectedCategory, search, sortBy]);

  return (
    <div>
      {/* Search and Filter Controls Toolbar */}
      <div className="glass-card rounded-2xl p-5 mb-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو التقنية..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-batta-yellow/60 transition-colors"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs text-zinc-400 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-batta-yellow" />
            <span>الترتيب:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-batta-yellow/60 cursor-pointer"
          >
            <option value="order">الترتيب الافتراضي</option>
            <option value="newest">الأحدث أولاً</option>
            <option value="title">أبجديًا</option>
          </select>
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-batta-yellow text-zinc-950 font-bold shadow-yellow-sm scale-[1.02]"
                : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid - Wider & Adaptive */}
      {filteredProjects.length > 0 ? (
        <div
          className={`grid gap-7 ${
            filteredProjects.length === 1
              ? "max-w-[460px] mx-auto grid-cols-1"
              : filteredProjects.length === 2
              ? "max-w-3xl mx-auto grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card rounded-2xl p-12 text-center border border-white/10 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-4">
            <FolderCode className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">لا توجد مشاريع تطابق بحثك</h3>
          <p className="text-xs text-zinc-400 mb-6">
            جرب كتابة مصطلح بحث مختلف أو اختر تصنيفًا آخر من القائمة بالأعلى.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}
    </div>
  );
}