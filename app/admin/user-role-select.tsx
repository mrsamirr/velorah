"use client";

import { updateUserRoleAction } from "@/app/actions/admin";
import { useActionState } from "react";

export function UserRoleSelect({
  userId,
  currentRole,
  isOwnRow,
}: {
  userId: string;
  currentRole: string;
  isOwnRow: boolean;
}) {
  const [, formAction, pending] = useActionState(
    async (_prev: unknown, fd: FormData) => {
      const role = fd.get("role") as string;
      return updateUserRoleAction(userId, role);
    },
    null
  );

  if (isOwnRow) {
    return <span className="text-on-surface-variant text-[10px] font-label uppercase">{currentRole}</span>;
  }

  return (
    <form action={formAction}>
      <select
        name="role"
        defaultValue={currentRole}
        disabled={pending}
        onChange={(e) => {
          const form = e.target.closest("form");
          if (form) form.requestSubmit();
        }}
        className="bg-transparent border border-outline-variant/10 text-[10px] text-on-surface p-1"
      >
        <option value="author" className="bg-surface">Author</option>
        <option value="editor" className="bg-surface">Editor</option>
        <option value="admin" className="bg-surface">Admin</option>
      </select>
    </form>
  );
}
