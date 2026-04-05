"use client";

import { resolveReportAction } from "@/app/actions/admin";
import { useActionState } from "react";

export function ReportActions({ reportId }: { reportId: string }) {
  const [, resolveAction, resolvePending] = useActionState(
    () => resolveReportAction(reportId, "resolved"),
    null
  );
  const [, dismissAction, dismissPending] = useActionState(
    () => resolveReportAction(reportId, "dismissed"),
    null
  );

  return (
    <div className="flex gap-1">
      <form action={resolveAction} className="inline">
        <button type="submit" disabled={resolvePending} className="px-2 py-1 text-[8px] font-label uppercase tracking-widest border border-green-500/20 text-green-400 hover:bg-green-500/10 disabled:opacity-50">
          Resolve
        </button>
      </form>
      <form action={dismissAction} className="inline">
        <button type="submit" disabled={dismissPending} className="px-2 py-1 text-[8px] font-label uppercase tracking-widest border border-outline-variant/20 text-on-surface-variant hover:text-on-surface disabled:opacity-50">
          Dismiss
        </button>
      </form>
    </div>
  );
}
