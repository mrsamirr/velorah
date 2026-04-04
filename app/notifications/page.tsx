import { redirect } from "next/navigation";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/dal/auth";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");

  return (
    <>
      <TopNavBar />
      <main className="pt-32 pb-24 px-8 md:px-16 max-w-4xl mx-auto min-h-screen">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface italic">
            Notifications
          </h1>
          <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mt-4">
            Activity & Updates
          </p>
        </header>

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
            When someone interacts with your essays — likes, comments, or follows — you&apos;ll see it here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
