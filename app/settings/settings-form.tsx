"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { updateProfileAction } from "@/app/actions/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ProfileDTO } from "@/lib/dal/profiles";
import { createClient } from "@/lib/supabase/client";

export function SettingsForm({ profile, email }: { profile: ProfileDTO; email: string }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateProfileAction, {});
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const socialLinks = (profile.social_links as Record<string, string>) ?? {};
  const [pwState, setPwState] = useState<{ message?: string; error?: string }>({});
  const [pwPending, setPwPending] = useState(false);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError("");
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("Max file size is 2MB");
      return;
    }
    setAvatarUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "avatars");
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setAvatarUrl(data.url);
    } catch {
      setAvatarError("Upload failed. Try again.");
    } finally {
      setAvatarUploading(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwState({});
    setPwPending(true);
    const fd = new FormData(e.currentTarget);
    const newPassword = fd.get("new_password") as string;
    const confirmPassword = fd.get("confirm_password") as string;
    if (newPassword !== confirmPassword) {
      setPwState({ error: "Passwords do not match" });
      setPwPending(false);
      return;
    }
    if (newPassword.length < 6) {
      setPwState({ error: "Password must be at least 6 characters" });
      setPwPending(false);
      return;
    }
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPwState({ error: error.message });
      } else {
        setPwState({ message: "Password updated successfully" });
        e.currentTarget.reset();
      }
    } catch {
      setPwState({ error: "Failed to update password" });
    } finally {
      setPwPending(false);
    }
  }

  async function handleFormSubmit(formData: FormData) {
    await formAction(formData);
    setTimeout(() => {
      router.refresh();
    }, 100);
  }

  return (
    <>
    <form action={handleFormSubmit} className="space-y-12">
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

        <div className="space-y-3">
          <Label htmlFor="email" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Email
          </Label>
          <Input
            id="email"
            value={email}
            readOnly
            disabled
            className="bg-transparent border-outline-variant/10 opacity-60"
          />
        </div>

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
            <Label htmlFor="avatar_upload" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Avatar
            </Label>
            <input type="hidden" name="avatar_url" value={avatarUrl} />
            {avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border border-outline-variant/10" />
            )}
            <Input
              id="avatar_upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="bg-transparent border-outline-variant/10"
            />
            {avatarUploading && <p className="text-on-surface-variant text-xs">Uploading...</p>}
            {avatarError && <p className="text-red-400 text-xs">{avatarError}</p>}
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

      {/* Social Links */}
      <section className="space-y-8">
        <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant border-b border-outline-variant/10 pb-4">
          Social Links
        </h2>
        <SocialLinksFields defaults={socialLinks} />
      </section>

      <Button
        type="submit"
        disabled={pending}
        className="bg-on-surface text-surface hover:bg-on-surface/90 py-6 px-12 font-label uppercase tracking-[0.2em] text-[11px]"
      >
        {pending ? "Saving..." : "Save Changes"}
      </Button>
    </form>

    {/* Password Change */}
    <form onSubmit={handlePasswordChange} className="space-y-8 mt-16">
      <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant border-b border-outline-variant/10 pb-4">
        Change Password
      </h2>
      {pwState.message && (
        <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-400 text-sm">
          {pwState.message}
        </div>
      )}
      {pwState.error && (
        <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
          {pwState.error}
        </div>
      )}
      <div className="space-y-3">
        <Label htmlFor="new_password" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
          New Password
        </Label>
        <Input
          id="new_password"
          name="new_password"
          type="password"
          minLength={6}
          required
          className="bg-transparent border-outline-variant/10"
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="confirm_password" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
          Confirm Password
        </Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          minLength={6}
          required
          className="bg-transparent border-outline-variant/10"
        />
      </div>
      <Button
        type="submit"
        disabled={pwPending}
        className="bg-on-surface text-surface hover:bg-on-surface/90 py-6 px-12 font-label uppercase tracking-[0.2em] text-[11px]"
      >
        {pwPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
    </>
  );
}

function SocialLinksFields({ defaults }: { defaults: Record<string, string> }) {
  const [twitter, setTwitter] = useState(defaults.twitter ?? "");
  const [github, setGithub] = useState(defaults.github ?? "");
  const [linkedin, setLinkedin] = useState(defaults.linkedin ?? "");
  const [instagram, setInstagram] = useState(defaults.instagram ?? "");

  return (
    <>
      <input
        type="hidden"
        name="social_links"
        value={JSON.stringify({ twitter, github, linkedin, instagram })}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="twitter" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Twitter / X
          </Label>
          <Input id="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://x.com/..." className="bg-transparent border-outline-variant/10" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="github" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            GitHub
          </Label>
          <Input id="github" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/..." className="bg-transparent border-outline-variant/10" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="linkedin" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            LinkedIn
          </Label>
          <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." className="bg-transparent border-outline-variant/10" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="instagram" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Instagram
          </Label>
          <Input id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." className="bg-transparent border-outline-variant/10" />
        </div>
      </div>
    </>
  );
}
