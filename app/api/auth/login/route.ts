import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";
import { getAdminUser } from "@/lib/db";
import { verifyPassword, signAuthToken, COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown-ip";
    const rate = checkRateLimit(ip);

    if (!rate.success) {
      return NextResponse.json(
        {
          error: `تم تجاوز الحد المسموح من المحاولات. يرجى المحاولة بعد ${rate.resetMinutes} دقيقة.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "بيانات الدخول غير صحيحة" },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;
    const admin = await getAdminUser();

    if (!admin || admin.username !== username) {
      return NextResponse.json(
        {
          error: `بيانات الدخول غير صحيحة. المحاولات المتبقية: ${rate.remaining}`,
        },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        {
          error: `بيانات الدخول غير صحيحة. المحاولات المتبقية: ${rate.remaining}`,
        },
        { status: 401 }
      );
    }

    // Reset rate limit upon successful authentication
    resetRateLimit(ip);

    const token = await signAuthToken({ id: admin.id, username: admin.username });

    const response = NextResponse.json({
      success: true,
      user: { id: admin.id, username: admin.username },
    });

    const isHttps = req.nextUrl.protocol === "https:";

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isHttps,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "حدث خطأ غير متوقع في الخادم" }, { status: 500 });
  }
}
