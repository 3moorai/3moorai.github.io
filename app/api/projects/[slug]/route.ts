import { NextRequest, NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    if (project.status !== "PUBLISHED") {
      const session = await getAuthSession();
      if (!session) {
        return NextResponse.json({ error: "المشروع غير متوفر" }, { status: 404 });
      }
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return NextResponse.json({ error: "تعذر جلب تفاصيل المشروع" }, { status: 500 });
  }
}