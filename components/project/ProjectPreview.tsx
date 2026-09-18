"use client";

import React, { useState } from "react";
import { ExternalLink, Globe, Monitor } from "lucide-react";

interface ProjectPreviewProps {
  title: string;
  url?: string;
  previewType?: "iframe" | "screenshot";
  screenshotUrl?: string;
  className?: string;
  aspectRatio?: string;
}

export function ProjectPreview({
  title,
  url,
  previewType = "iframe",
  className = "",
  aspectRatio = "aspect-video",
}: ProjectPreviewProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hasLiveUrl = Boolean(url && url.trim().length > 0);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col group ${aspectRatio} ${className}`}>
      {/* Mock Browser Header Bar */}
      <div className="h-9 bg-zinc-900/90 border-b border-white/10 px-4 flex items-center justify-between shrink-0 select-none z-10 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex-1 max-w-[200px] sm:max-w-xs mx-auto text-center truncate">
          <span className="text-[11px] text-zinc-400 font-mono flex items-center justify-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-batta-yellow shrink-0" />
            <span className="truncate">{url || title}</span>
          </span>
        </div>

        {hasLiveUrl && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="فتح الموقع في نافذة جديدة"
            className="text-zinc-400 hover:text-batta-yellow transition-colors p-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Preview Content Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-zinc-950/80 flex items-center justify-center">
        {hasLiveUrl && !iframeError ? (
          /* Live iframe with fallback safety */
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-batta-yellow border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-zinc-500 font-mono">جاري تحميل المنصة...</span>
                </div>
              </div>
            )}
            <iframe
              src={url}
              title={`معاينة ${title}`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIframeError(true);
                setIsLoading(false);
              }}
              className="w-full h-full border-0 pointer-events-none scale-100 transform origin-top-left"
            />
          </div>
        ) : (
          /* Fallback Centered Interactive Card */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900/60 via-zinc-950 to-black">
            <div className="w-14 h-14 rounded-2xl bg-batta-yellow/10 border border-batta-yellow/20 flex items-center justify-center text-batta-yellow mb-3 shadow-yellow-sm group-hover:scale-110 transition-transform">
              <Globe className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
            <p className="text-xs text-zinc-400 max-w-sm mb-5 leading-relaxed">
              اضغط على الزر أدناه لاستعراض وتجربة المنصة الحية مباشرة.
            </p>

            {hasLiveUrl && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-batta-yellow text-zinc-950 hover:bg-batta-yellow-light shadow-yellow-sm transition-all active:scale-95"
              >
                <span>زيارة الموقع مباشرة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}