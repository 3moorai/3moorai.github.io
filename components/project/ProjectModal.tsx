"use client";

import React from "react";
import { X, ExternalLink, Github, ArrowLeft, Layers } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { ProjectPreview } from "./ProjectPreview";
import { CategoryBadge, Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-white/10 p-6 shadow-2xl backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge category={project.category} />
          {project.isFeatured && (
            <Badge variant="yellow">⭐ مميز</Badge>
          )}
          <span className="text-xs text-zinc-500 font-mono">معاينة سريعة</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>

        {/* Preview Frame */}
        <div className="mb-6">
          <ProjectPreview
            title={project.title}
            url={project.liveUrl}
            previewType={project.previewType}
            screenshotUrl={project.screenshotUrl}
            aspectRatio="aspect-video"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-batta-yellow" />
            <span>التقنيات المستخدمة</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <Badge key={i} variant="glass">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light transition-all"
              >
                <span>زيارة المشروع</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-batta-yellow hover:text-batta-yellow-light transition-colors group"
          >
            <span>عرض صفحة المشروع الكاملة</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}