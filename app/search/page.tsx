import Link from "next/link";
import type { Metadata } from "next";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { searchArticles } from "@/lib/dal/search";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q;
  return {
    title: q ? `Search: ${q} — Velorah` : "Search — Velorah",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const results = q ? await searchArticles(q) : [];

  return (
    <>
      <TopNavBar />
      <main className="pt-32 pb-24 px-8 md:px-16 max-w-4xl mx-auto min-h-screen">
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface italic mb-8">
            Search
          </h1>
          <form action="/search" method="GET">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search articles..."
              className="w-full bg-transparent border border-outline-variant/10 p-4 text-on-surface text-lg placeholder:text-on-surface-variant/30 focus:outline-none focus:border-on-surface/30"
            />
          </form>
        </header>

        {!q ? (
          <p className="text-on-surface-variant text-sm">
            Enter a search term above to find articles.
          </p>
        ) : results.length === 0 ? (
          <p className="text-on-surface-variant text-sm">
            No results for &ldquo;{q}&rdquo;
          </p>
        ) : (
          <div className="space-y-10">
            {results.map((article) => (
              <div key={article.id} className="border-b border-outline-variant/10 pb-8">
                <Link
                  href={`/article/${article.slug}`}
                  className="font-headline text-2xl text-on-surface hover:underline underline-offset-4"
                >
                  {article.title}
                </Link>
                <div className="flex items-center gap-2 mt-2 text-on-surface-variant text-[10px] font-label uppercase tracking-widest">
                  <span>{article.author_name ?? "Anonymous"}</span>
                  {article.published_at && (
                    <>
                      <span className="w-1 h-1 bg-outline/40 rounded-full" />
                      <span>
                        {new Date(article.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </div>
                {article.excerpt && (
                  <p className="text-on-surface-variant text-sm mt-3 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
