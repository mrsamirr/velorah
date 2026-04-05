"use client";

import { bookmarkArticleAction, unbookmarkArticleAction } from "@/app/actions/engagement";
import { useActionState } from "react";

export function BookmarkButton({ articleId, bookmarked }: { articleId: string; bookmarked: boolean }) {
  const [, formAction, pending] = useActionState(
    () => (bookmarked ? unbookmarkArticleAction(articleId) : bookmarkArticleAction(articleId)),
    null
  );

  return (
    <form action={formAction} className="inline">
      <button
        type="submit"
        disabled={pending}
        className="flex items-center gap-2 px-4 py-2 border border-outline-variant/20 text-sm text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-base">
          {bookmarked ? "bookmark" : "bookmark_border"}
        </span>
        {bookmarked ? "Saved" : "Save"}
      </button>
    </form>
  );
}
