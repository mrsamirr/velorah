"use client";

import { useActionState } from "react";
import { markAllNotificationsReadAction } from "@/app/actions/notifications";

export function MarkAllReadForm() {
  const [, formAction, pending] = useActionState(
    () => markAllNotificationsReadAction(),
    null
  );

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={pending}
        className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-50"
      >
        {pending ? "Marking..." : "Mark all as read"}
      </button>
    </form>
  );
}
