import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { saveContactMessage } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "بيانات الرسالة غير صحيحة" },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const saved = await saveContactMessage({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "تم استلام رسالتك بنجاح! شكرًا لتواصلك يا بطل.",
      id: saved.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "تعذر إرسال الرسالة، يرجى المحاولة لاحقًا" }, { status: 500 });
  }
}