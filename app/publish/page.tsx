"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { createArticleAction } from "@/app/actions/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { CategoryDTO } from "@/lib/dal/categories";

export default function PublishPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createArticleAction, {});
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/articles?categories=true");
        if (res.ok) {
          const data = await res.json();
          if (data.categories) setCategories(data.categories);
        }
      } catch {
        // ignore
      }
    }
    loadCategories();
  }, []);

  // Redirect on success
  useEffect(() => {
    if (state && "slug" in state && state.slug) {
      router.push(`/article?slug=${state.slug}`);
    }
  }, [state, router]);

  return (
    <>
      <TopNavBar />
      <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1600px] mx-auto min-h-screen">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface italic">
            Compose
          </h1>
          <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mt-4">
            Craft your next essay
          </p>
        </header>

        {state?.message && !("slug" in state) && (
          <div className="mb-8 p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
            {state.message}
          </div>
        )}

        <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="The title of your essay..."
                className="text-3xl font-headline bg-transparent border-outline-variant/10 p-6 h-auto placeholder:text-on-surface-variant/30"
              />
              {state?.errors?.title && (
                <p className="text-red-400 text-xs">{state.errors.title[0]}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="excerpt" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                placeholder="A brief summary of your essay..."
                className="bg-transparent border-outline-variant/10 placeholder:text-on-surface-variant/30"
              />
              {state?.errors?.excerpt && (
                <p className="text-red-400 text-xs">{state.errors.excerpt[0]}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="content" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Content (HTML)
              </Label>
              <Textarea
                id="content"
                name="content"
                rows={20}
                placeholder="Write your essay content here..."
                className="bg-transparent border-outline-variant/10 placeholder:text-on-surface-variant/30 font-mono text-sm"
              />
              {state?.errors?.content && (
                <p className="text-red-400 text-xs">{state.errors.content[0]}</p>
              )}
            </div>

            {/* Hidden raw content field */}
            <input type="hidden" name="content_raw" value="" />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="border border-outline-variant/10 p-8 space-y-6">
              <h3 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Publishing Options
              </h3>

              <div className="space-y-3">
                <Label htmlFor="cover_image_url" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                  Cover Image URL
                </Label>
                <Input
                  id="cover_image_url"
                  name="cover_image_url"
                  placeholder="https://..."
                  className="bg-transparent border-outline-variant/10"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="cover_image_alt" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                  Cover Image Alt Text
                </Label>
                <Input
                  id="cover_image_alt"
                  name="cover_image_alt"
                  placeholder="Describe the image..."
                  className="bg-transparent border-outline-variant/10"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="category_id" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                  Category
                </Label>
                <select
                  id="category_id"
                  name="category_id"
                  className="w-full bg-transparent border border-outline-variant/10 p-3 text-sm text-on-surface"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-surface text-on-surface">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <Label className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                  Status
                </Label>
                <input type="hidden" name="status" value={status} />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStatus("draft")}
                    className={`px-4 py-2 text-xs font-label uppercase tracking-widest border transition-colors ${
                      status === "draft"
                        ? "border-on-surface text-on-surface"
                        : "border-outline-variant/10 text-on-surface-variant"
                    }`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("published")}
                    className={`px-4 py-2 text-xs font-label uppercase tracking-widest border transition-colors ${
                      status === "published"
                        ? "border-on-surface text-on-surface"
                        : "border-outline-variant/10 text-on-surface-variant"
                    }`}
                  >
                    Publish
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="meta_title" className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                  SEO Title (optional)
                </Label>
                <Input
                  id="meta_title"
                  name="meta_title"
                  placeholder="Custom SEO title..."
                  className="bg-transparent border-outline-variant/10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-on-surface text-surface hover:bg-on-surface/90 py-6 font-label uppercase tracking-[0.2em] text-[11px]"
            >
              {pending ? "Submitting..." : status === "published" ? "Publish Essay" : "Save Draft"}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
