import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, Layers, Calendar, Tag, Globe } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/db";
import { ProjectPreview } from "@/components/project/ProjectPreview";
import { CategoryBadge, Badge } from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getProjects({ status: "ALL" });
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: "المشروع غير موجود | بطة" };
  }

  const title = project.seoTitle || `${project.title} | بطة — عمر فوزي`;
  const description = project.seoDescription || project.description;
  const ogImage = project.ogImage || project.screenshotUrl || "/batta-logo.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project || (project.status !== "PUBLISHED")) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Back button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-batta-yellow mb-8 transition-colors group"
      >
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        <span>الرجوع إلى كافة المشاريع</span>
      </Link>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <CategoryBadge category={project.category} />
            {project.isFeatured && (
              <Badge variant="yellow">⭐ مشروع مميز</Badge>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* External Action Buttons */}
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light shadow-yellow-sm transition-all"
            >
              <span>زيارة الموقع الحي</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>مستودع GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Large Project Preview */}
      <div className="mb-12">
        <ProjectPreview
          title={project.title}
          url={project.liveUrl}
          previewType={project.previewType}
          screenshotUrl={project.screenshotUrl}
          aspectRatio="aspect-[16/9]"
        />
      </div>

      {/* Content Details Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Full Description */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-2xl p-7 border border-white/10 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-batta-yellow" />
              <span>نظرة شاملة عن المشروع</span>
            </h2>
            <div className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              {project.fullDescription || project.description}
            </div>
          </div>
        </div>

        {/* Right: Technical Meta & Badges */}
        <div className="lg:col-span-4 space-y-6">
          {/* Technologies Card */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-batta-yellow" />
              <span>التقنيات المستخدمة</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="glass">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Details Meta */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3.5 text-xs text-zinc-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-zinc-500" />
                <span>التصنيف</span>
              </span>
              <span className="text-white font-medium capitalize">{project.category}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <span>نوع المعاينة</span>
              </span>
              <span className="text-white font-medium font-mono">
                {project.previewType === "iframe" ? "معاينة حية (Live)" : "لقطة شاشة (Screenshot)"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>تاريخ التحديث</span>
              </span>
              <span className="text-white font-medium font-mono">
                {new Date(project.updatedAt).toLocaleDateString("ar-EG")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}