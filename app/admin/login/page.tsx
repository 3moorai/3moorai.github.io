"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "فشل تسجيل الدخول");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden border border-batta-yellow/40 bg-zinc-900 shadow-yellow-md flex items-center justify-center">
            <Image
              src="/batta-logo.png"
              alt="بطة"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-white flex items-center justify-center gap-2">
            <span>لوحة تحكم بطة</span>
            <span className="text-batta-yellow">🦆</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            تسجيل الدخول الآمن لإدارة المشاريع والمحتوى
          </p>
        </div>

        {/* Login Glass Card */}
        <div className="glass-card rounded-2xl p-7 border border-white/10 shadow-2xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                اسم المستخدم
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="omar"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-batta-yellow/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-batta-yellow/60 transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center mt-2"
              rightIcon={<ArrowLeft className="w-4 h-4" />}
            >
              تسجيل الدخول
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
            <span className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-batta-yellow" />
              <span>نظام مشفر ومحمي بـ Rate Limiting</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}