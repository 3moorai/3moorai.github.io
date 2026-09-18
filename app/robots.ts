import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://batta.dev";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/projects", "/about", "/contact"],
      disallow: ["/admin/", "/api/admin/", "/api/auth/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}