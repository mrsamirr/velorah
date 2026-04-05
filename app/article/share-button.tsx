"use client";

import { useState } from "react";

export function ShareButton({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/article/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 border border-outline-variant/20 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
    >
      <span className="material-symbols-outlined text-base">share</span>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
