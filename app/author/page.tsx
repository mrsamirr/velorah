import Link from "next/link";
import { redirect } from "next/navigation";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/dal/auth";
import { getMyProfile, getMyProfileStats } from "@/lib/dal/profiles";
import { getMyArticles } from "@/lib/dal/articles";
import { Badge } from "@/components/ui/badge";
import { DeleteArticleButton } from "./delete-article-button";

export default async function AuthorPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");

  const params = await searchParams;
  const statusFilter = params.status as "published" | "draft" | "archived" | undefined;

  const [profile, stats] = await Promise.all([
    getMyProfile(),
    getMyProfileStats(),
  ]);

  if (!profile) redirect("/signin");

  const articles = await getMyArticles({
    status: statusFilter,
  });

  return (
    <>
      <TopNavBar />
      <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1600px] mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-headline tracking-tight text-on-surface mb-4 italic">
            Author Dashboard
          </h1>
          <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Welcome back, {profile.display_name}
          </p>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Total Essays
            </span>
            <span className="text-5xl font-headline text-on-surface">
              {stats.total_articles}
            </span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Published
            </span>
            <span className="text-5xl font-headline text-on-surface">
              {stats.published_articles}
            </span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Total Views
            </span>
            <span className="text-5xl font-headline text-on-surface">
              {stats.total_views.toLocaleString()}
            </span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Total Likes
            </span>
            <span className="text-5xl font-headline text-on-surface">
              {stats.total_likes.toLocaleString()}
            </span>
          </div>
        </section>

        {/* Article Management Table */}
        <section className="bg-black border border-outline-variant/10 overflow-hidden">
          <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
            <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface">
              Your Articles
            </h2>
            <Link
              href="/archive"
              className="font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant hover:text-on-surface transition-colors"
            >
              VIEW FULL ARCHIVE ›
            </Link>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-2 p-4 border-b border-outline-variant/10">
            {([undefined, "published", "draft", "archived"] as const).map((s) => (
              <Link
                key={s ?? "all"}
                href={s ? `/author?status=${s}` : "/author"}
                className={`px-4 py-2 text-[10px] font-label uppercase tracking-widest transition-colors ${
                  statusFilter === s || (!statusFilter && !s)
                    ? "text-on-surface border-b border-on-surface"
                    : "text-outline hover:text-on-surface"
                }`}
              >
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
              </Link>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-[#0A0A0A]">
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">
                    Article Title
                  </th>
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">
                    Status
                  </th>
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">
                    Date
                  </th>
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-right">
                    Engagement
                  </th>
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-16 text-center text-on-surface-variant text-sm">
                      No articles yet.{" "}
                      <Link href="/publish" className="text-on-surface underline">
                        Write your first essay
                      </Link>
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article.id} className="group hover:bg-white/5 transition-colors">
                      <td className="p-8">
                        <Link href={`/article/${article.slug}`} className="flex items-center gap-6">
                          {article.cover_image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              alt={article.title}
                              className="w-16 h-20 object-cover grayscale brightness-75"
                              src={article.cover_image_url}
                            />
                          )}
                          <span className="text-2xl font-headline text-on-surface leading-tight group-hover:underline">
                            {article.title}
                          </span>
                        </Link>
                      </td>
                      <td className="p-8 text-center">
                        <Badge variant="outline" className="text-[8px]">
                          {article.status}
                        </Badge>
                      </td>
                      <td className="p-8 text-center font-label uppercase tracking-[0.1em] text-[10px] text-on-surface-variant">
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="p-8 text-right font-label uppercase tracking-[0.1em] text-[11px] text-on-surface">
                        {article.view_count >= 1000
                          ? `${(article.view_count / 1000).toFixed(1)}k`
                          : article.view_count}
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Link
                            href={`/publish?edit=${article.slug}`}
                            className="px-3 py-1 text-[9px] font-label uppercase tracking-widest border border-outline-variant/20 text-on-surface-variant hover:text-on-surface transition-colors"
                          >
                            Edit
                          </Link>
                          <DeleteArticleButton articleId={article.id} title={article.title} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Secondary Actions */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/publish"
            className="border border-outline-variant/10 p-12 flex items-center justify-between group cursor-pointer hover:bg-on-surface transition-all duration-700"
          >
            <div className="flex flex-col gap-2">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant group-hover:text-surface transition-colors">
                Creative Hub
              </span>
              <h3 className="text-3xl font-headline text-on-surface group-hover:text-surface transition-colors italic">
                Draft New Essay
              </h3>
            </div>
            <span
              className="material-symbols-outlined text-on-surface-variant group-hover:text-surface transition-colors"
              style={{ fontSize: "32px" }}
            >
              edit_note
            </span>
          </Link>
          <Link
            href="/settings"
            className="border border-outline-variant/10 p-12 flex items-center justify-between group cursor-pointer hover:bg-on-surface transition-all duration-700"
          >
            <div className="flex flex-col gap-2">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant group-hover:text-surface transition-colors">
                Account
              </span>
              <h3 className="text-3xl font-headline text-on-surface group-hover:text-surface transition-colors italic">
                Profile Settings
              </h3>
            </div>
            <span
              className="material-symbols-outlined text-on-surface-variant group-hover:text-surface transition-colors"
              style={{ fontSize: "32px" }}
            >
              settings
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
