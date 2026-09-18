import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { exportDatabaseBackup } from "@/lib/db";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const backup = await exportDatabaseBackup();
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `batta-backup-${dateStr}.json`;

    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "فشل تصدير النسخة الاحتياطية" }, { status: 500 });
  }
}