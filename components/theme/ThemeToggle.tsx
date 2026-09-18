"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      title={isDark ? "التحويل إلى الوضع الفاتح (Light Mode)" : "التحويل إلى الوضع الداكن (Dark Mode)"}
      className={`relative p-2 rounded-xl border transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer ${
        isDark
          ? "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-batta-yellow hover:border-batta-yellow/40"
          : "bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-amber-600 hover:border-amber-500"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12" />
      )}
    </button>
  );
}