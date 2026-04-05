"use client";

import { useActionState } from "react";
import { createCommentAction } from "@/app/actions/engagement";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function CommentForm({ articleId }: { articleId: string }) {
  const [state, formAction, pending] = useActionState(createCommentAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="article_id" value={articleId} />
      <Textarea
        name="body"
        rows={3}
        placeholder="Share your thoughts..."
        className="bg-transparent border-outline-variant/10 placeholder:text-on-surface-variant/30"
      />
      {state?.errors?.body && (
        <p className="text-red-400 text-xs">{state.errors.body[0]}</p>
      )}
      {state?.message && (
        <p className="text-red-400 text-xs">{state.message}</p>
      )}
      <Button
        type="submit"
        disabled={pending}
        className="bg-on-surface text-surface hover:bg-on-surface/90 py-2 px-6 font-label uppercase tracking-[0.2em] text-[10px]"
      >
        {pending ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}
