import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getProjects } from "@/lib/db";
import { AdminProjectsManager } from "@/components/admin/AdminProjectsManager";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await getProjects({ status: "ALL" });

  return <AdminProjectsManager initialProjects={projects} />;
}