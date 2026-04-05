"use client";

import { likeArticleAction, unlikeArticleAction } from "@/app/actions/engagement";
import { useActionState } from "react";

export function LikeButton({ articleId, liked }: { articleId: string; liked: boolean }) {
  const [, formAction, pending] = useActionState(
    () => (liked ? unlikeArticleAction(articleId) : likeArticleAction(articleId)),
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
          {liked ? "favorite" : "favorite_border"}
        </span>
        {liked ? "Liked" : "Like"}
      </button>
    </form>
  );
}
