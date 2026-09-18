import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getProjects, createProject, getProjectBySlug } from "@/lib/db";
import { projectSchema } from "@/lib/validations";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const projects = await getProjects({ status: "ALL" });
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Admin projects error:", error);
    return NextResponse.json({ error: "فشل استرجاع المشاريع" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "بيانات المشروع غير صحيحة" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check slug uniqueness
    const existing = await getProjectBySlug(data.slug);
    if (existing) {
      return NextResponse.json(
        { error: "الرابط اللطيف (Slug) مستخدم بالفعل لمشروع آخر، يرجى اختيار slug مختلف" },
        { status: 400 }
      );
    }

    const newProject = await createProject({
      title: data.title,
      slug: data.slug,
      description: data.description,
      fullDescription: data.fullDescription,
      category: data.category,
      technologies: data.technologies,
      previewType: data.previewType,
      screenshotUrl: data.screenshotUrl || undefined,
      liveUrl: data.liveUrl || undefined,
      githubUrl: data.githubUrl || undefined,
      status: data.status,
      isFeatured: data.isFeatured,
      sortOrder: data.sortOrder,
      seoTitle: data.seoTitle || undefined,
      seoDescription: data.seoDescription || undefined,
      ogImage: data.ogImage || undefined,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "فشل إنشاء المشروع" }, { status: 500 });
  }
}