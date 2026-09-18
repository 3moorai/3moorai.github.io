import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getContactMessages, markMessageAsRead, deleteContactMessage } from "@/lib/db";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const messages = await getContactMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json({ error: "تعذر استرجاع الرسائل" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "معرف الرسالة مطلوب" }, { status: 400 });

    const ok = await markMessageAsRead(id);
    return NextResponse.json({ success: ok });
  } catch (error) {
    return NextResponse.json({ error: "فشل تحديث حالة الرسالة" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح لك بالدخول" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "معرف الرسالة مطلوب" }, { status: 400 });

    const ok = await deleteContactMessage(id);
    return NextResponse.json({ success: ok });
  } catch (error) {
    return NextResponse.json({ error: "فشل حذف الرسالة" }, { status: 500 });
  }
}