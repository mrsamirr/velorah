import { notFound } from "next/navigation";
import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { getArticleBySlug } from "@/lib/dal/articles";
import { getCommentsByArticle } from "@/lib/dal/comments";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const params = await searchParams;
  const slug = params.slug;

  if (!slug) notFound();

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const comments = await getCommentsByArticle(article.id);

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <>
      <TopNavBar />
      <main className="pt-24">
        {/* Hero Cover */}
        {article.cover_image_url && (
          <section className="w-full h-128 relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={article.cover_image_alt ?? article.title}
              className="w-full h-full object-cover grayscale brightness-50"
              src={article.cover_image_url}
            />
            <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
          </section>
        )}

        <article
          className={`max-w-4xl mx-auto px-6 ${article.cover_image_url ? "-mt-32" : "mt-16"} relative z-10`}
        >
          {/* Header */}
          <div className="space-y-8 mb-16">
            <div className="flex items-center gap-4">
              {article.category_name && (
                <Badge variant="outline" className="rounded-full">
                  {article.category_name}
                </Badge>
              )}
              <span className="text-on-surface-variant text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {article.read_time_minutes} MIN READ
              </span>
              <span className="text-on-surface-variant text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">visibility</span>
                {article.view_count.toLocaleString()} VIEWS
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-headline leading-[1.1] text-on-surface tracking-tight">
              {article.title}
            </h1>

            {/* Author Card */}
            <div className="flex items-center justify-between py-8 border-y border-white/5">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 grayscale border border-white/10">
                  <AvatarImage src={article.author_avatar ?? undefined} alt={article.author_name ?? ""} />
                  <AvatarFallback>
                    {article.author_name?.charAt(0)?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    href={`/author?user=${article.author_username ?? article.author_id}`}
                    className="text-sm font-semibold text-on-surface hover:underline"
                  >
                    {article.author_name ?? "Anonymous"}
                  </Link>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                    {publishedDate}
                  </p>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-6 text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">favorite</span>
                  <span className="text-xs font-bold">{article.like_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">chat_bubble_outline</span>
                  <span className="text-xs font-bold">{article.comment_count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">bookmark_border</span>
                  <span className="text-xs font-bold">{article.bookmark_count}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-invert max-w-none mb-24"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Comments Section */}
          <section className="border-t border-white/5 pt-16 mb-20">
            <h3 className="font-label text-[10px] uppercase tracking-widest text-outline mb-10">
              Discussion ({comments.length})
            </h3>
            <div className="space-y-10">
              {comments.length === 0 ? (
                <p className="text-on-surface-variant text-sm">
                  No comments yet. Be the first to share your thoughts.
                </p>
              ) : (
                comments
                  .filter((c) => !c.parent_id)
                  .map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={comment.author_avatar ?? undefined}
                          alt={comment.author_name ?? ""}
                        />
                        <AvatarFallback className="text-xs">
                          {comment.author_name?.charAt(0)?.toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                            {comment.author_name ?? "Anonymous"}
                          </span>
                          <span className="text-[10px] text-on-surface-variant/40 uppercase">
                            {new Date(comment.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          {comment.body}
                        </p>

                        {/* Replies */}
                        {comments
                          .filter((r) => r.parent_id === comment.id)
                          .map((reply) => (
                            <div key={reply.id} className="flex gap-3 mt-6 ml-4 border-l border-white/5 pl-4">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={reply.author_avatar ?? undefined}
                                  alt={reply.author_name ?? ""}
                                />
                                <AvatarFallback className="text-[10px]">
                                  {reply.author_name?.charAt(0)?.toUpperCase() ?? "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface">
                                    {reply.author_name ?? "Anonymous"}
                                  </span>
                                </div>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                  {reply.body}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
