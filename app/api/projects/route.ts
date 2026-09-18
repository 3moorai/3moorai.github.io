import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const featured = searchParams.get("featured");

    const projects = await getProjects({
      status: "PUBLISHED",
      category,
      search,
      isFeatured: featured === "true" ? true : undefined,
    });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "تعذر جلب المشاريع" }, { status: 500 });
  }
}