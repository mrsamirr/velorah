import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
    return (
        <>
            <TopNavBar />
            <main className="pt-32 pb-24 flex-grow w-full">
                <header className="px-8 max-w-7xl mx-auto mb-20 pt-10">
                    <span className="text-xs uppercase tracking-[0.2em] text-outline block mb-4">
                        Legal Framework
                    </span>
                    <h1 className="font-headline text-5xl md:text-7xl text-white">Cookies Policy</h1>
                </header>
                <section className="px-8 max-w-7xl mx-auto mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-surface-container p-8 border border-white/5">
                            <h3 className="font-headline text-2xl text-white mb-4">Essential</h3>
                            <p className="text-on-surface-variant text-sm">
                                Fundamental to the core architecture. Ensures secure authentication.
                            </p>
                        </div>
                        <div className="bg-surface-container p-8 border border-white/5 opacity-60">
                            <h3 className="font-headline text-2xl text-white mb-4">Analytical</h3>
                            <p className="text-on-surface-variant text-sm">
                                Anonymous data points to refine the editorial flow.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
