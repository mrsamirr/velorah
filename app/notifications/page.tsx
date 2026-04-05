import { redirect } from "next/navigation";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/dal/auth";
import { getMyNotifications, getUnreadCount } from "@/lib/dal/notifications";
import { NotificationPoller } from "./notification-poller";
import { MarkReadForm } from "./mark-read-form";
import { MarkAllReadForm } from "./mark-all-read-form";

const ICON_MAP: Record<string, string> = {
  like: "favorite",
  comment: "chat_bubble",
  follow: "person_add",
  mention: "alternate_email",
  reply: "reply",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");

  const [notifications, unreadCount] = await Promise.all([
    getMyNotifications({ limit: 30 }),
    getUnreadCount(),
  ]);

  return (
    <>
      <TopNavBar />
      <main className="pt-32 pb-24 px-8 md:px-16 max-w-4xl mx-auto min-h-screen">
        <header className="mb-16 flex items-end justify-between">
          <div>
            <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface italic">
              Notifications
            </h1>
            <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mt-4">
              Activity & Updates
            </p>
          </div>
          {unreadCount > 0 && <MarkAllReadForm />}
        </header>

        {notifications.length === 0 ? (
          <div className="border border-outline-variant/10 p-16 text-center">
            <span
              className="material-symbols-outlined text-on-surface-variant mb-6 block"
              style={{ fontSize: "48px" }}
            >
              notifications_none
            </span>
            <h2 className="font-headline text-2xl text-on-surface italic mb-4">
              No notifications yet
            </h2>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto">
              When someone interacts with your essays — likes, comments, or
              follows — you&apos;ll see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <MarkReadForm
                key={n.id}
                notificationId={n.id}
                isRead={n.is_read}
              >
                <div
                  className={`flex items-start gap-5 p-6 border border-outline-variant/10 transition-colors ${
                    n.is_read
                      ? "opacity-60"
                      : "border-l-2 border-l-blue-500 bg-blue-500/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-on-surface-variant mt-0.5">
                    {ICON_MAP[n.type] ?? "notifications"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-on-surface">
                      {n.actor_name && (
                        <span className="font-semibold">{n.actor_name}</span>
                      )}{" "}
                      {n.message ?? n.type}
                    </p>
                    <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
                      {timeAgo(n.created_at)}
                    </span>
                  </div>
                </div>
              </MarkReadForm>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <NotificationPoller />
    </>
  );
}
