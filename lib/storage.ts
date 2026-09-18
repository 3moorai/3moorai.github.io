import fs from "fs";
import path from "path";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadScreenshot(file: File): Promise<string> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("حجم الصورة يجب ألا يتجاوز 5 ميجابايت");
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error("صيغة الصورة غير مدعومة. يرجى رفع PNG أو JPEG أو WEBP");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // If Supabase Storage is configured in env
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    const ext = file.name.split(".").pop() || "png";
    const filename = `projects/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const uploadEndpoint = `${supabaseUrl}/storage/v1/object/batta-uploads/${filename}`;

    const res = await fetch(uploadEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": file.type,
      },
      body: buffer,
    });

    if (res.ok) {
      return `${supabaseUrl}/storage/v1/object/public/batta-uploads/${filename}`;
    }
  }

  // If running in local or Node container, save to public/uploads
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const ext = file.name.split(".").pop() || "png";
    const filename = `screen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  } catch {
    // Edge / Serverless without filesystem: fallback to direct Data URI
    const base64 = buffer.toString("base64");
    return `data:${file.type};base64,${base64}`;
  }
}
