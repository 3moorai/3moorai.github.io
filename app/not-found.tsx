import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="relative w-28 h-28 mx-auto mb-6 opacity-80">
          <Image src="/batta-logo.png" alt="بطة" fill className="object-contain" />
        </div>
        <span className="text-xs font-mono text-batta-yellow uppercase tracking-widest block mb-2">
          ERROR 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
          الصفحة غير موجودة
        </h1>
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
          عذرًا، الصفحة التي تحاول الوصول إليها قد تكون نُقلت أو حُذفت.
        </p>
        <Link href="/">
          <Button rightIcon={<Home className="w-4 h-4" />}>
            العودة إلى الصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}