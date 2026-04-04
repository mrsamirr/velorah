import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { requireRole } from "@/lib/dal/auth";
import { getPublishedArticles } from "@/lib/dal/articles";
import { getAllCategories } from "@/lib/dal/categories";
import { Badge } from "@/components/ui/badge";

export default async function AdminPage() {
  await requireRole("admin");

  const [articles, categories] = await Promise.all([
    getPublishedArticles({ limit: 20, sort: "recent" }),
    getAllCategories(),
  ]);

  const totalViews = articles.reduce((sum, a) => sum + a.view_count, 0);
  const totalLikes = articles.reduce((sum, a) => sum + a.like_count, 0);

  return (
    <>
      <TopNavBar />
      <div className="flex min-h-screen pt-24">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-outline-variant/10 p-8 sticky top-24 h-[calc(100vh-6rem)]">
          <nav className="space-y-6">
            <h3 className="font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant mb-8">
              Admin Panel
            </h3>
            {[
              { label: "Dashboard", icon: "dashboard", href: "/admin", active: true },
              { label: "Essays", icon: "article", href: "/admin" },
              { label: "Categories", icon: "category", href: "/admin" },
              { label: "Contributors", icon: "group", href: "/admin" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 text-sm ${
                  item.active
                    ? "text-on-surface font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                } transition-colors`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span className="font-label uppercase tracking-[0.15em] text-[10px]">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-16 max-w-[1400px]">
          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface italic">
              Dashboard
            </h1>
            <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mt-4">
              Platform Overview
            </p>
          </header>

          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-40">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Total Essays
              </span>
              <span className="text-4xl font-headline text-on-surface">
                {articles.length}
              </span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-40">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Categories
              </span>
              <span className="text-4xl font-headline text-on-surface">
                {categories.length}
              </span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-40">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Total Views
              </span>
              <span className="text-4xl font-headline text-on-surface">
                {totalViews.toLocaleString()}
              </span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-40">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                Total Likes
              </span>
              <span className="text-4xl font-headline text-on-surface">
                {totalLikes.toLocaleString()}
              </span>
            </div>
          </section>

          {/* Publications Table */}
          <section className="bg-black border border-outline-variant/10 overflow-hidden mb-16">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
              <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface">
                Recent Publications
              </h2>
              <span className="font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant">
                {articles.length} ENTRIES
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/10 bg-[#0A0A0A]">
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">
                      Title
                    </th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">
                      Author
                    </th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">
                      Category
                    </th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">
                      Status
                    </th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-right">
                      Views
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <Link
                          href={`/article?slug=${article.slug}`}
                          className="text-on-surface hover:underline font-headline text-lg"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="p-6 font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                        {article.author_name ?? "Unknown"}
                      </td>
                      <td className="p-6 text-center">
                        {article.category_name && (
                          <Badge variant="outline" className="text-[8px]">
                            {article.category_name}
                          </Badge>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        <Badge variant="outline" className="text-[8px]">
                          {article.status}
                        </Badge>
                      </td>
                      <td className="p-6 text-right font-label text-[11px] text-on-surface">
                        {article.view_count.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Categories */}
          <section>
            <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mb-8">
              Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="border border-outline-variant/10 p-6 flex items-center justify-between"
                >
                  <div>
                    <span className="text-on-surface font-headline text-lg">{cat.name}</span>
                    {cat.description && (
                      <p className="text-xs text-on-surface-variant mt-1">{cat.description}</p>
                    )}
                  </div>
                  <span className="text-on-surface-variant font-label text-[10px]">
                    {cat.article_count} articles
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
