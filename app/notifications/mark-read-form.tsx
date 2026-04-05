"use client";

import { useActionState } from "react";
import { markNotificationReadAction } from "@/app/actions/notifications";
import type { ReactNode } from "react";

export function MarkReadForm({
  notificationId,
  isRead,
  children,
}: {
  notificationId: string;
  isRead: boolean;
  children: ReactNode;
}) {
  const [, formAction] = useActionState(
    () => markNotificationReadAction(notificationId),
    null
  );

  if (isRead) return <>{children}</>;

  return (
    <form action={formAction}>
      <button type="submit" className="w-full text-left">
        {children}
      </button>
    </form>
  );
}
