"use client";

import { setArticleFeaturedAction, setArticleStatusAction } from "@/app/actions/admin";
import { useActionState } from "react";
import type { ArticleStatus } from "@/lib/types/database";

export function ArticleActions({
  articleId,
  isFeatured,
  isPinned,
  status,
}: {
  articleId: string;
  isFeatured: boolean;
  isPinned: boolean;
  status: ArticleStatus;
}) {
  const [, featuredAction, featuredPending] = useActionState(
    () => setArticleFeaturedAction(articleId, !isFeatured),
    null
  );

  const [, archiveAction, archivePending] = useActionState(
    () => setArticleStatusAction(articleId, status === "archived" ? "published" : "archived"),
    null
  );

  return (
    <div className="flex items-center gap-1">
      <form action={featuredAction} className="inline">
        <button
          type="submit"
          disabled={featuredPending}
          className={`px-2 py-1 text-[8px] font-label uppercase tracking-widest border transition-colors ${
            isFeatured
              ? "border-yellow-500/30 text-yellow-400"
              : "border-outline-variant/20 text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {isFeatured ? "★" : "☆"}
        </button>
      </form>
      <form action={archiveAction} className="inline">
        <button
          type="submit"
          disabled={archivePending}
          className="px-2 py-1 text-[8px] font-label uppercase tracking-widest border border-outline-variant/20 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          {status === "archived" ? "Restore" : "Archive"}
        </button>
      </form>
    </div>
  );
}
