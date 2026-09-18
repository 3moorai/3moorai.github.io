"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowLeft, FolderCode } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "عني", href: "/about" },
    { name: "مهاراتي", href: "/#skills" },
    { name: "مشاريعي البرمجية", href: "/projects" },
    { name: "تواصل معي", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 transition-all duration-300 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? "glass-panel shadow-2xl py-2.5 px-4 sm:px-6"
            : "bg-zinc-950/40 backdrop-blur-md border border-white/10 shadow-lg py-3 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 drop-shadow-[0_2px_8px_rgba(255,212,0,0.3)]">
              <Image
                src="/batta-logo.png"
                alt="لوجو بطة"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 group-hover:text-batta-yellow transition-colors">
                <span>بطة</span>
                <span className="w-1.5 h-1.5 rounded-full bg-batta-yellow" />
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                PORTFOLIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "text-batta-yellow bg-batta-yellow/10 border border-batta-yellow/20"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button & Mobile Burger */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Direct Projects CTA button */}
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light shadow-yellow-sm hover:shadow-yellow-md transition-all active:scale-[0.98]"
            >
              <FolderCode className="w-3.5 h-3.5" />
              <span>مشاريعي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="تبديل القائمة"
              className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-batta-yellow/15 text-batta-yellow font-bold border border-batta-yellow/20"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-batta-yellow text-zinc-950 shadow-yellow-sm"
            >
              <FolderCode className="w-4 h-4" />
              <span>عرض كافة المشاريع البرمجية</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}