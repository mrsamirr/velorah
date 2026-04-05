"use client";

import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/app/actions/admin";
import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddCategoryForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, fd: FormData) => createCategoryAction(fd),
    null
  );

  return (
    <form action={formAction} className="flex gap-2 items-end mt-4">
      <Input name="name" placeholder="Name" required className="bg-transparent border-outline-variant/10 w-32" />
      <Input name="slug" placeholder="slug" required className="bg-transparent border-outline-variant/10 w-32" />
      <input name="color" type="color" defaultValue="#666666" className="w-10 h-10 border border-outline-variant/10 bg-transparent cursor-pointer" />
      <Button type="submit" disabled={pending} className="bg-on-surface text-surface text-[9px] font-label uppercase tracking-widest px-4 py-2">
        {pending ? "..." : "Add"}
      </Button>
      {state && "error" in state && state.error && (
        <span className="text-red-400 text-xs">{state.error}</span>
      )}
    </form>
  );
}

export function CategoryRow({
  id,
  name,
  color,
  articleCount,
  description,
}: {
  id: string;
  name: string;
  color: string | null;
  articleCount: number;
  description: string | null;
}) {
  const [editing, setEditing] = useState(false);
  const [, updateAction, updatePending] = useActionState(
    async (_prev: unknown, fd: FormData) => {
      const result = await updateCategoryAction(id, fd);
      if (result.success) setEditing(false);
      return result;
    },
    null
  );
  const [, deleteAction, deletePending] = useActionState(
    async () => {
      if (!confirm(`Delete category "${name}"?`)) return null;
      return deleteCategoryAction(id);
    },
    null
  );

  if (editing) {
    return (
      <form action={updateAction} className="border border-outline-variant/10 p-4 flex items-center gap-3">
        <Input name="name" defaultValue={name} className="bg-transparent border-outline-variant/10 w-32" />
        <input name="color" type="color" defaultValue={color ?? "#666666"} className="w-8 h-8 border border-outline-variant/10 bg-transparent cursor-pointer" />
        <Button type="submit" disabled={updatePending} className="bg-on-surface text-surface text-[9px] px-3 py-1">Save</Button>
        <button type="button" onClick={() => setEditing(false)} className="text-on-surface-variant text-[9px] px-3 py-1 border border-outline-variant/10">Cancel</button>
      </form>
    );
  }

  return (
    <div className="border border-outline-variant/10 p-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {color && <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />}
        <div>
          <span className="text-on-surface font-headline text-lg">{name}</span>
          {description && <p className="text-xs text-on-surface-variant mt-1">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-on-surface-variant font-label text-[10px]">{articleCount} articles</span>
        <button onClick={() => setEditing(true)} className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant hover:text-on-surface px-2 py-1 border border-outline-variant/20">Edit</button>
        <form action={deleteAction} className="inline">
          <button type="submit" disabled={deletePending} className="text-[9px] font-label uppercase tracking-widest text-red-400 px-2 py-1 border border-red-500/20 hover:bg-red-500/10">{deletePending ? "..." : "Del"}</button>
        </form>
      </div>
    </div>
  );
}
