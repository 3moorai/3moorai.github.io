import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { getContactMessages } from "@/lib/db";
import { AdminMessagesManager } from "@/components/admin/AdminMessagesManager";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/login");
  }

  const messages = await getContactMessages();

  return <AdminMessagesManager initialMessages={messages} />;
}