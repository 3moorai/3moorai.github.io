import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "تعذر جلب الإحصائيات" }, { status: 500 });
  }
}