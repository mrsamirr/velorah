import { redirect } from "next/navigation";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/dal/auth";
import { getMyProfile } from "@/lib/dal/profiles";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");

  const profile = await getMyProfile();
  if (!profile) redirect("/signin");

  return (
    <>
      <TopNavBar />
      <main className="pt-32 pb-24 px-8 md:px-16 max-w-4xl mx-auto min-h-screen">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface italic">
            Settings
          </h1>
          <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant mt-4">
            Profile & Account Configuration
          </p>
        </header>
        <SettingsForm profile={profile} email={user.email} />
      </main>
      <Footer />
    </>
  );
}
