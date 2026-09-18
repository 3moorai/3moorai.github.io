import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  isInteractive?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  isInteractive = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 ${
        isInteractive ? "glass-card cursor-pointer" : "glass-card-static"
      } ${className}`}
    >
      {children}
    </div>
  );
}