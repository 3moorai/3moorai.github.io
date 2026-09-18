"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function AdminExportButton() {
  const [downloading, setDownloading] = useState(false);
  const { showToast } = useToast();

  const handleExport = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/admin/export");
      if (!res.ok) throw new Error("تعذر تصدير النسخة الاحتياطية");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `batta-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showToast("تم تنزيل النسخة الاحتياطية بنجاح!", "success");
    } catch (err: any) {
      showToast(err.message || "حدث خطأ أثناء التصدير", "error");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={downloading}
      className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-batta-yellow border border-white/10 transition-all text-xs font-semibold flex items-center gap-1.5"
      title="تصدير نسخة احتياطية من كافة البيانات"
    >
      <Download className="w-3.5 h-3.5" />
      <span>تصدير نسخة JSON</span>
    </button>
  );
}