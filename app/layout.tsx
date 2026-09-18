import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "بطة | عمر فوزي — Developer Portfolio & Projects",
  description: "الموقع والبورتفوليو الرسمي للمطور عمر فوزي (بطة) — استعراض المشاريع البرمجية والمهارات والتطبيقات الحديثة بتصميم زجاجي مستقبلي وأداء فائق.",
  keywords: ["بطة", "عمر فوزي", "Omar Fawzi", "Developer Portfolio", "Next.js", "Python", "Full Stack Developer"],
  authors: [{ name: "Omar Fawzi" }],
  icons: {
    icon: "/batta-logo.png",
    apple: "/batta-logo.png",
  },
  openGraph: {
    title: "بطة | عمر فوزي — Developer Portfolio & Projects",
    description: "بورتفوليو رقمي حديث لعرض المشاريع البرمجية والأفكار التقنية بأسلوب مستقبلي وأداء فائق.",
    url: baseUrl,
    siteName: "بطة",
    images: [
      {
        url: "/batta-logo.png",
        width: 1200,
        height: 630,
        alt: "بطة — Omar Fawzi Portfolio",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "بطة | عمر فوزي — Developer Portfolio",
    description: "استعراض المشاريع البرمجية والمهارات والتطبيقات الحديثة.",
    images: ["/batta-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('batta-theme')||'dark';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t)}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-batta-yellow selection:text-zinc-950 font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <main className="relative z-10 pt-24">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}