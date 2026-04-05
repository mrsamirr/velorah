import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { requireRole, getCurrentUser } from "@/lib/dal/auth";
import { getAllArticlesAdmin, getPlatformStats, getAllUsers, getAllReports } from "@/lib/dal/admin";
import { getAllCategories } from "@/lib/dal/categories";
import { Badge } from "@/components/ui/badge";
import { ArticleActions } from "./article-actions";
import { AddCategoryForm, CategoryRow } from "./category-forms";
import { UserRoleSelect } from "./user-role-select";
import { ReportActions } from "./report-actions";

const STATUS_COLORS: Record<string, string> = {
  draft: "border-yellow-500/30 text-yellow-400",
  published: "border-green-500/30 text-green-400",
  archived: "border-outline-variant/30 text-on-surface-variant",
  under_review: "border-blue-500/30 text-blue-400",
};

export default async function AdminPage() {
  const adminUser = await requireRole("admin");

  const [stats, articles, categories, users, reports] = await Promise.all([
    getPlatformStats(),
    getAllArticlesAdmin({ limit: 50 }),
    getAllCategories(),
    getAllUsers({ limit: 50 }),
    getAllReports({ status: "pending" }),
  ]);

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
              { label: "Dashboard", icon: "dashboard", href: "#dashboard" },
              { label: "Essays", icon: "article", href: "#essays" },
              { label: "Categories", icon: "category", href: "#categories" },
              { label: "Users", icon: "group", href: "#users" },
              { label: "Reports", icon: "flag", href: "#reports", badge: reports.length },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <span className="inline">{item.icon}</span>
                <span className="font-label uppercase tracking-[0.15em] text-[10px]">
                  {item.label}
                </span>
                {"badge" in item && item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-16 max-w-[1400px]">
          <header className="mb-16" id="dashboard">
            <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface italic">
              Dashboard
            </h1>
            <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mt-4">
              Platform Overview
            </p>
          </header>

          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            {[
              { label: "Total Users", value: stats.total_users },
              { label: "Total Essays", value: stats.total_articles },
              { label: "Published", value: stats.published_articles },
              { label: "Comments", value: stats.total_comments },
              { label: "Pending Reports", value: stats.total_reports_pending },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-40">
                <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
                  {s.label}
                </span>
                <span className="text-4xl font-headline text-on-surface">
                  {s.value.toLocaleString()}
                </span>
              </div>
            ))}
          </section>

          {/* Articles Table */}
          <section className="bg-black border border-outline-variant/10 overflow-hidden mb-16" id="essays">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
              <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface">
                All Articles
              </h2>
              <span className="font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant">
                {articles.length} ENTRIES
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/10 bg-[#0A0A0A]">
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">Title</th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">Author</th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">Status</th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-right">Views</th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <Link
                          href={`/article/${article.slug}`}
                          className="text-on-surface hover:underline font-headline text-lg"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="p-6 font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                        {article.author_name ?? "Unknown"}
                      </td>
                      <td className="p-6 text-center">
                        <Badge variant="outline" className={`text-[8px] ${STATUS_COLORS[article.status] ?? ""}`}>
                          {article.status}
                        </Badge>
                        {article.is_featured && (
                          <Badge variant="outline" className="text-[8px] ml-1 border-yellow-500/30 text-yellow-400">
                            featured
                          </Badge>
                        )}
                      </td>
                      <td className="p-6 text-right font-label text-[11px] text-on-surface">
                        {article.view_count.toLocaleString()}
                      </td>
                      <td className="p-6 text-right">
                        <ArticleActions
                          articleId={article.id}
                          isFeatured={article.is_featured}
                          isPinned={false}
                          status={article.status}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-16" id="categories">
            <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mb-8">
              Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <CategoryRow
                  key={cat.id}
                  id={cat.id}
                  name={cat.name}
                  color={cat.color}
                  articleCount={cat.article_count}
                  description={cat.description}
                />
              ))}
            </div>
            <AddCategoryForm />
          </section>

          {/* Users */}
          <section className="bg-black border border-outline-variant/10 overflow-hidden mb-16" id="users">
            <div className="p-8 border-b border-outline-variant/10">
              <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface">
                Users
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/10 bg-[#0A0A0A]">
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">User</th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">Email</th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">Role</th>
                    <th className="p-6 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-right">Articles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <span className="text-on-surface text-sm font-semibold">{u.display_name}</span>
                        <span className="text-on-surface-variant text-[10px] ml-2">@{u.username}</span>
                      </td>
                      <td className="p-6 font-label text-[10px] text-on-surface-variant">{u.email}</td>
                      <td className="p-6 text-center">
                        <UserRoleSelect userId={u.id} currentRole={u.role} isOwnRow={u.id === adminUser.id} />
                      </td>
                      <td className="p-6 text-right font-label text-[11px] text-on-surface">
                        {u.article_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reports */}
          <section className="mb-16" id="reports">
            <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mb-8">
              Pending Reports ({reports.length})
            </h2>
            {reports.length === 0 ? (
              <p className="text-on-surface-variant text-sm border border-outline-variant/10 p-8 text-center">
                No pending reports.
              </p>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div key={r.id} className="border border-outline-variant/10 p-6 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[8px]">{r.entity_type}</Badge>
                        <span className="text-[10px] text-on-surface-variant">
                          reported by @{r.reporter_username ?? "unknown"}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface font-semibold">{r.reason}</p>
                      {r.description && (
                        <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{r.description}</p>
                      )}
                    </div>
                    <ReportActions reportId={r.id} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
