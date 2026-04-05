"use client";

import { deleteArticleAction } from "@/app/actions/content";
import { useActionState } from "react";

export function DeleteArticleButton({ articleId, title }: { articleId: string; title: string }) {
  const [, formAction, pending] = useActionState(
    async () => {
      if (!confirm(`Delete "${title}"? This cannot be undone.`)) return null;
      return deleteArticleAction(articleId);
    },
    null
  );

  return (
    <form action={formAction} className="inline">
      <button
        type="submit"
        disabled={pending}
        className="px-3 py-1 text-[9px] font-label uppercase tracking-widest border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
      >
        {pending ? "..." : "Delete"}
      </button>
    </form>
  );
}
