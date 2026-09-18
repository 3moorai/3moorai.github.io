import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "glass" | "success" | "warning" | "danger" | "muted";
  className?: string;
}

export function Badge({ children, variant = "glass", className = "" }: BadgeProps) {
  const variantStyles = {
    yellow: "bg-batta-yellow/10 text-batta-yellow border-batta-yellow/30",
    glass: "bg-white/[0.04] text-zinc-300 border-white/[0.08] hover:border-white/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    muted: "bg-zinc-800/40 text-zinc-400 border-zinc-700/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-md transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "PUBLISHED" | "DRAFT" | "ARCHIVED" }) {
  if (status === "PUBLISHED") {
    return <Badge variant="yellow"><span className="w-1.5 h-1.5 rounded-full bg-batta-yellow animate-pulse" /> منشور</Badge>;
  }
  if (status === "DRAFT") {
    return <Badge variant="warning"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> مسودة</Badge>;
  }
  return <Badge variant="muted"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> مؤرشف</Badge>;
}

export function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, string> = {
    web: "Web App",
    ai: "ذكاء اصطناعي",
    javascript: "JavaScript",
    python: "Python",
    other: "أخرى",
  };
  return <Badge variant="glass">{map[category.toLowerCase()] || category}</Badge>;
}