import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getSettings, getSkills } from "@/lib/db";
import { AdminSettingsManager } from "@/components/admin/AdminSettingsManager";

export default async function AdminSettingsPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [settings, skills] = await Promise.all([getSettings(), getSkills()]);

  return <AdminSettingsManager initialSettings={settings} initialSkills={skills} />;
}