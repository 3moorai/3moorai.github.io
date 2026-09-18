"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function HomeContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("يرجى ملء جميع الحقول المطلوبة", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "فشل إرسال الرسالة");
      }

      setIsSuccess(true);
      showToast("تم استلام رسالتك بنجاح! شكرًا لتواصلك", "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      showToast(error.message || "حدث خطأ أثناء الإرسال", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10">
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">تم الإرسال بنجاح!</h3>
          <p className="text-sm text-zinc-400 mb-6">
            شكرًا لتواصلك. ستتم مراجعة رسالتك في أقرب وقت.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setIsSuccess(false)}>
            إرسال رسالة أخرى
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              الاسم الكامل <span className="text-batta-yellow">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: عمر فوزي"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-batta-yellow/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              البريد الإلكتروني <span className="text-batta-yellow">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="example@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-batta-yellow/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              الرسالة <span className="text-batta-yellow">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="اكتب تفاصيل استفسارك أو فكرتك هنا..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-batta-yellow/60 transition-colors resize-none"
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full justify-center"
            rightIcon={<Send className="w-4 h-4 ml-1" />}
          >
            إرسال الرسالة
          </Button>
        </form>
      )}
    </div>
  );
}