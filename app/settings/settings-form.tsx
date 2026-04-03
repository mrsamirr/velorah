"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/app/actions/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ProfileDTO } from "@/lib/dal/profiles";

export function SettingsForm({ profile }: { profile: ProfileDTO }) {
  const [state, formAction, pending] = useActionState(updateProfileAction, {});

  return (
    <form action={formAction} className="space-y-12">
      {state?.message && (
        <div
          className={`p-4 border text-sm ${
            state.message.includes("success")
              ? "border-green-500/20 bg-green-500/5 text-green-400"
              : "border-red-500/20 bg-red-500/5 text-red-400"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* Account Identity */}
      <section className="space-y-8">
        <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant border-b border-outline-variant/10 pb-4">
          Account Identity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="display_name" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Display Name
            </Label>
            <Input
              id="display_name"
              name="display_name"
              defaultValue={profile.display_name}
              className="bg-transparent border-outline-variant/10"
            />
            {state?.errors?.display_name && (
              <p className="text-red-400 text-xs">{state.errors.display_name[0]}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="username" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              defaultValue={profile.username}
              className="bg-transparent border-outline-variant/10"
            />
            {state?.errors?.username && (
              <p className="text-red-400 text-xs">{state.errors.username[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="bio" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={profile.bio ?? ""}
            placeholder="Tell others about yourself..."
            className="bg-transparent border-outline-variant/10 placeholder:text-on-surface-variant/30"
          />
          {state?.errors?.bio && (
            <p className="text-red-400 text-xs">{state.errors.bio[0]}</p>
          )}
        </div>
      </section>

      {/* Media & Links */}
      <section className="space-y-8">
        <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant border-b border-outline-variant/10 pb-4">
          Media & Links
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="avatar_url" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Avatar URL
            </Label>
            <Input
              id="avatar_url"
              name="avatar_url"
              defaultValue={profile.avatar_url ?? ""}
              placeholder="https://..."
              className="bg-transparent border-outline-variant/10"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="website_url" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Website
            </Label>
            <Input
              id="website_url"
              name="website_url"
              defaultValue={profile.website_url ?? ""}
              placeholder="https://..."
              className="bg-transparent border-outline-variant/10"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="location" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Location
          </Label>
          <Input
            id="location"
            name="location"
            defaultValue={profile.location ?? ""}
            placeholder="City, Country"
            className="bg-transparent border-outline-variant/10"
          />
        </div>
      </section>

      <Button
        type="submit"
        disabled={pending}
        className="bg-on-surface text-surface hover:bg-on-surface/90 py-6 px-12 font-label uppercase tracking-[0.2em] text-[11px]"
      >
        {pending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
