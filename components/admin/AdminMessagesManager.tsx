"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Calendar, Check, Trash2, User } from "lucide-react";
import { ContactMessage } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";

interface AdminMessagesManagerProps {
  initialMessages: ContactMessage[];
}

export function AdminMessagesManager({ initialMessages }: AdminMessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const { showToast } = useToast();

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("تعذر تحديث حالة الرسالة");
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
      );
      showToast("تم تحديد الرسالة كمقروءة", "success");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل حذف الرسالة");
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast("تم حذف الرسالة بنجاح", "success");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">صندوق الرسائل الواردة</h1>
        <p className="text-xs text-zinc-400">
          استعراض رسائل واستفسارات الزوار المرسلة عبر نموذج التواصل
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-white/10 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">لا توجد رسائل واردة حاليًا</h3>
          <p className="text-xs text-zinc-400">
            عندما يقوم أي زائر بإرسال رسالة عبر الموقع، ستظهر هنا مباشرة.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card rounded-2xl p-6 border transition-all ${
                msg.isRead
                  ? "border-white/[0.08] opacity-80"
                  : "border-batta-yellow/40 bg-batta-yellow/[0.02]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-batta-yellow">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-batta-yellow text-zinc-950">
                          جديد
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-zinc-400 hover:text-batta-yellow flex items-center gap-1 font-mono transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{msg.email}</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(msg.createdAt).toLocaleString("ar-EG")}</span>
                  </span>

                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                      title="تحديد كمقروء"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="حذف الرسالة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}