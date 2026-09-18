import React from "react";
import { Metadata } from "next";
import { getProjects } from "@/lib/db";
import { ProjectsCatalogClient } from "@/components/project/ProjectsCatalogClient";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "مشاريعي البرمجية | بطة — عمر فوزي",
  description: "استعراض كافة المشاريع البرمجية والتطبيقات الذكية التي بناها وطورها عمر فوزي.",
};

export default async function ProjectsPage() {
  const projects = await getProjects({ status: "PUBLISHED" });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Badge variant="yellow" className="mb-3">
          معرض الأعمال
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">
          مشاريعي البرمجية
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          استكشف مشاريع الويب وتطبيقات الذكاء الاصطناعي مع إمكانية المعاينة المباشرة أو زيارة الروابط الحية.
        </p>
      </div>

      {/* Interactive Filter & Grid Client */}
      <ProjectsCatalogClient initialProjects={projects} />
    </div>
  );
}