import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <>
            <TopNavBar />
            <header className="pt-40 md:pt-48 pb-20 md:pb-32 px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-6">
                    <span className="text-[0.75rem] font-medium tracking-[0.2em] text-neutral-500 uppercase">
                        LAST UPDATED: OCTOBER 24, 2024
                    </span>
                    <h1 className="text-5xl md:text-[5rem] leading-[1.1] font-headline tracking-tighter text-white">
                        Privacy Policy
                    </h1>
                </div>
            </header>
            <main className="px-8 max-w-3xl mx-auto flex-grow w-full pb-32">
                <div className="space-y-12 text-neutral-300 leading-relaxed font-body">
                    <p className="text-xl text-neutral-400 font-light italic mb-12">
                        At Velorah, we believe in clarity. Our legal frameworks are designed to protect both the creators and the curated environment we maintain.
                    </p>
                    <section>
                        <h2 className="text-2xl font-headline text-white mb-6">1. Acceptance of Terms</h2>
                        <p>
                            By accessing Velorah, you agree to be bound by these conditions. Our services are provided to those seeking curated editorial excellence.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-headline text-white mb-6">2. Data & Privacy</h2>
                        <p>
                            Your privacy is paramount. We collect minimal data necessary to maintain the integrity of the platform. We employ industry-standard encryption protocols to shield your data.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
