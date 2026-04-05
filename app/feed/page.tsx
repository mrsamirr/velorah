import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { getPublishedArticles } from "@/lib/dal/articles";
import { getAllCategories } from "@/lib/dal/categories";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye } from "lucide-react";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;
  const sort = (params.sort as "recent" | "popular" | "most_liked") ?? "recent";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const limit = 12;

  const [categories, articles, featured] = await Promise.all([
    getAllCategories(),
    getPublishedArticles({
      limit: limit + 1,
      offset: (page - 1) * limit,
      category_id: selectedCategory,
      sort,
    }),
    getPublishedArticles({ limit: 3, featured: true, sort: "popular" }),
  ]);

  const hasMore = articles.length > limit;
  const paginatedArticles = hasMore ? articles.slice(0, limit) : articles;

  const displayFeatured = featured.length > 0 ? featured : paginatedArticles.slice(0, 3);
  const recentArticles = paginatedArticles.slice(featured.length > 0 ? 0 : 3);
  const trendingArticles = paginatedArticles
    .slice()
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 4);

  return (
    <>
      <TopNavBar />
      <main className="pt-40 pb-20">
        {/* Hero Header */}
        <header className="px-12 mb-28 max-w-screen-2xl mx-auto">
          <h1 className="font-headline text-[7rem] leading-none mb-6 text-on-surface tracking-tighter">
            Stay curious.
          </h1>
          <p className="font-body text-on-surface-variant max-w-lg text-lg leading-relaxed border-l border-white/10 pl-8">
            A sanctuary for deep thought, digital craftsmanship, and the quiet
            pursuit of meaningful perspectives in a noisy world.
          </p>
        </header>

        {/* Category + Sort Filters */}
        <section className="px-12 mb-20 max-w-screen-2xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex gap-4 items-center flex-wrap">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline mr-4">
              Filter by
            </span>
            <Link
              href="/feed"
              className={`px-6 py-2 rounded-full text-xs font-medium transition-colors ${
                !selectedCategory
                  ? "bg-on-surface text-surface"
                  : "border border-outline-variant/30 text-on-surface hover:bg-on-surface hover:text-surface"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/feed?category=${cat.id}`}
                className={`px-6 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-on-surface text-surface"
                    : "border border-outline-variant/30 text-on-surface hover:bg-on-surface hover:text-surface"
                }`}
              >
                {cat.name}
              </Link>
            ))}
            <div className="ml-auto flex gap-2">
              {(["recent", "popular", "most_liked"] as const).map((s) => (
                <Link
                  key={s}
                  href={`/feed?${selectedCategory ? `category=${selectedCategory}&` : ""}sort=${s}`}
                  className={`px-4 py-2 text-[10px] font-label uppercase tracking-widest transition-colors ${
                    sort === s
                      ? "text-on-surface border-b border-on-surface"
                      : "text-outline hover:text-on-surface"
                  }`}
                >
                  {s === "most_liked" ? "Top Liked" : s.charAt(0).toUpperCase() + s.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Stories: 3-Column Grid */}
        {displayFeatured.length > 0 && (
          <section className="px-12 mb-32 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayFeatured.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 bg-surface-container-low border border-white/5">
                    {article.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={article.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        src={article.cover_image_url}
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="inline text-sm"><FileText size={20} /></span>
                      </div>
                    )}
                  </div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/60 mb-3 block">
                    {article.category_name ?? "Uncategorized"}
                  </span>
                  <h3 className="font-headline text-3xl text-on-surface mb-3 group-hover:italic transition-all">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-on-surface-variant text-sm line-clamp-2 font-body leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Main Content & Sidebar */}
        <section className="px-12 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Recent Posts */}
          <div className="lg:col-span-8 space-y-16">
            <h2 className="font-label text-[10px] uppercase tracking-widest text-outline mb-10 pb-4 border-b border-white/5">
              Recent Explorations
            </h2>
            {recentArticles.length === 0 && paginatedArticles.length === 0 ? (
              <p className="text-on-surface-variant font-body text-sm">
                No articles yet. Be the first to{" "}
                <Link href="/publish" className="text-on-surface underline underline-offset-4">
                  publish
                </Link>
                .
              </p>
            ) : (
              recentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="flex flex-col md:flex-row gap-10 group cursor-pointer"
                >
                  <div className="w-full md:w-64 h-44 overflow-hidden rounded-md shrink-0 bg-surface-container-low border border-white/5">
                    {article.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={article.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        src={article.cover_image_url}
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="inline text-sm"><FileText size={20} /></span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary" className="text-[9px]">
                        {article.category_name ?? "Uncategorized"}
                      </Badge>
                      <span className="text-outline text-[10px] font-label uppercase tracking-widest">
                        {article.read_time_minutes} Min Read
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl text-on-surface mb-4 group-hover:italic transition-all">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-body line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-outline font-label text-[10px] uppercase tracking-widest">
                      <span>{article.author_name ?? "Anonymous"}</span>
                      <span className="w-1 h-1 bg-outline/40 rounded-full" />
                      <span>
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                      <span className="w-1 h-1 bg-outline/40 rounded-full" />
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {article.view_count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Trending Sidebar */}
          <aside className="lg:col-span-4">
            <div className="glass-card p-10 rounded-lg sticky top-32">
              <h2 className="font-label text-[10px] uppercase tracking-widest text-white mb-12">
                Trending Now
              </h2>
              <div className="space-y-10">
                {trendingArticles.map((article, i) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.slug}`}
                    className="flex gap-6 group cursor-pointer"
                  >
                    <span className="font-headline text-4xl text-outline group-hover:text-white transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-body text-sm font-medium text-on-surface leading-snug mb-2 group-hover:underline underline-offset-4 decoration-white/30 transition-all">
                        {article.title}
                      </h4>
                      <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/60">
                        {article.author_name ?? "Anonymous"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* Pagination */}
        <div className="px-12 max-w-screen-2xl mx-auto mt-20 flex justify-center gap-4">
          {page > 1 ? (
            <Link
              href={`/feed?${selectedCategory ? `category=${selectedCategory}&` : ""}${sort !== "recent" ? `sort=${sort}&` : ""}page=${page - 1}`}
              className="px-6 py-3 border border-outline-variant/30 text-on-surface text-xs font-label uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-colors"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-6 py-3 border border-outline-variant/10 text-on-surface-variant/30 text-xs font-label uppercase tracking-widest cursor-not-allowed">
              ← Previous
            </span>
          )}
          {hasMore ? (
            <Link
              href={`/feed?${selectedCategory ? `category=${selectedCategory}&` : ""}${sort !== "recent" ? `sort=${sort}&` : ""}page=${page + 1}`}
              className="px-6 py-3 border border-outline-variant/30 text-on-surface text-xs font-label uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-colors"
            >
              Next →
            </Link>
          ) : (
            <span className="px-6 py-3 border border-outline-variant/10 text-on-surface-variant/30 text-xs font-label uppercase tracking-widest cursor-not-allowed">
              Next →
            </span>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

