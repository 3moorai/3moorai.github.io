import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getProjectById, updateProject, deleteProject, getProjectBySlug } from "@/lib/db";
import { projectSchema } from "@/lib/validations";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  const project = await getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
  }

  return NextResponse.json({ success: true, project });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

    // Check if slug taken by another project
    const existingWithSlug = await getProjectBySlug(data.slug);
    if (existingWithSlug && existingWithSlug.id !== params.id) {
      return NextResponse.json(
        { error: "هذا الـ Slug مستخدم بالفعل لمشروع آخر" },
        { status: 400 }
      );
    }

    const updated = await updateProject(params.id, {
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

    if (!updated) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "فشل تعديل المشروع" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const success = await deleteProject(params.id);
    if (!success) {
      return NextResponse.json({ error: "المشروع غير موجود أو تعذر حذفه" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "تم حذف المشروع بنجاح" });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "فشل حذف المشروع" }, { status: 500 });
  }
}