import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getSkills, updateSkills } from "@/lib/db";
import { z } from "zod";
import { skillSchema } from "@/lib/validations";

const skillsArraySchema = z.array(skillSchema);

export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json({ success: true, skills });
  } catch (error) {
    console.error("Get skills error:", error);
    return NextResponse.json({ error: "تعذر استرجاع المهارات" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = skillsArraySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "بيانات المهارات غير صحيحة" },
        { status: 400 }
      );
    }

    const updated = await updateSkills(parsed.data as any);
    return NextResponse.json({ success: true, skills: updated });
  } catch (error) {
    console.error("Update skills error:", error);
    return NextResponse.json({ error: "تعذر حفظ المهارات" }, { status: 500 });
  }
}