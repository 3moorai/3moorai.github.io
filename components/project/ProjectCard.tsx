"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  Star,
  Globe,
  Eye,
  Code2,
  Cpu,
  Terminal,
  Github,
} from "lucide-react";
import { Project } from "@/lib/types";
import { ProjectModal } from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic icon based on category
  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "ai":
        return <Cpu className="w-4 h-4 text-batta-yellow" />;
      case "python":
        return <Terminal className="w-4 h-4 text-batta-yellow" />;
      case "javascript":
        return <Code2 className="w-4 h-4 text-batta-yellow" />;
      default:
        return <Globe className="w-4 h-4 text-batta-yellow" />;
    }
  };

  const projectUrl = project.liveUrl || project.githubUrl || `/projects/${project.slug}`;
  const displayDomain = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `batta.dev/${project.slug}`;

  return (
    <>
      <div className="relative overflow-hidden rounded-[24px] p-5 sm:p-6 flex flex-col justify-between group border border-white/[0.08] hover:border-batta-yellow/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_15px_35px_rgba(255,212,0,0.12)] bg-gradient-to-b from-zinc-900/70 via-zinc-950/90 to-black backdrop-blur-xl">
        {/* Subtle Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-batta-yellow/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div>
          {/* Top Header: Category & Badges */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06] w-full">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-batta-yellow/30 transition-colors">
                {getCategoryIcon(project.category)}
              </span>
              <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span>مباشر</span>
                </span>
              )}

              {project.isFeatured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-batta-yellow bg-batta-yellow/10 px-2.5 py-0.5 rounded-full border border-batta-yellow/30 shadow-yellow-subtle">
                  <Star className="w-3 h-3 fill-current" />
                  <span>مميز</span>
                </span>
              )}
            </div>
          </div>

          {/* Centered Clickable Website Portal */}
          <div className="my-1.5">
            <a
              href={projectUrl}
              target={project.liveUrl ? "_blank" : undefined}
              rel={project.liveUrl ? "noopener noreferrer" : undefined}
              className="group/portal relative w-full block rounded-xl p-4 sm:p-5 border border-white/[0.07] hover:border-batta-yellow/50 bg-white/[0.02] hover:bg-batta-yellow/[0.04] transition-all duration-300 text-center active:scale-[0.99]"
              title={`زيارة موقع ${project.title} مباشرة`}
            >
              {/* Domain Label */}
              <div className="inline-flex items-center justify-center gap-1 text-[11px] font-mono text-zinc-400 group-hover/portal:text-batta-yellow transition-colors mb-2 px-2.5 py-0.5 rounded-md bg-black/40 border border-white/5">
                <Globe className="w-3 h-3 text-batta-yellow shrink-0" />
                <span className="truncate max-w-[200px]">{displayDomain}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/portal:opacity-100 transition-opacity shrink-0" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover/portal:text-batta-yellow transition-colors tracking-tight leading-tight my-1.5">
                {project.title}
              </h3>

              {/* Pill Button */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-batta-yellow/10 border border-batta-yellow/20 text-batta-yellow text-xs font-bold group-hover/portal:bg-batta-yellow group-hover/portal:text-zinc-950 transition-all duration-200">
                <span>زيارة الموقع الآن</span>
                <span className="font-mono text-xs group-hover/portal:-translate-x-0.5 transition-transform">↗</span>
              </div>
            </a>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-400 mt-3 mb-4 leading-relaxed text-center sm:text-right line-clamp-2 px-1">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-zinc-500 rounded-lg bg-white/[0.02]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-white/[0.06] mt-1 w-full">
          <div className="flex items-center gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light shadow-yellow-sm transition-all active:scale-95"
              >
                <span>زيارة الموقع</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light shadow-yellow-sm transition-all"
              >
                <span>استعراض</span>
                <ArrowLeft className="w-3 h-3" />
              </Link>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.07] border border-white/[0.06] transition-colors"
              title="نظرة سريعة"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-batta-yellow transition-colors group/link px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04]"
            >
              <span>التفاصيل</span>
              <ArrowLeft className="w-3 h-3 transition-transform group-hover/link:-translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Preview Modal */}
      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}