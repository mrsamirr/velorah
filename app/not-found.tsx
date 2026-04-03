import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
    return (
        <>
            <TopNavBar />
            <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-surface">
                {/* Ghosted backdrop 404 */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                    <span className="font-headline text-[28vw] font-extralight text-white/[0.03] italic tracking-tighter leading-none">
                        404
                    </span>
                </div>

                {/* Cinematic vertical accents */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                <div className="absolute right-16 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

                {/* Foreground content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <div className="font-headline text-[10rem] md:text-[18rem] font-extralight text-white/10 italic tracking-tighter leading-none mb-4">
                        404
                    </div>

                    <p className="font-label uppercase tracking-[0.3em] text-[11px] md:text-[13px] text-on-surface-variant max-w-md leading-loose mb-12">
                        The archive contains no record of this path.
                    </p>

                    <Link
                        href="/feed"
                        className="group relative flex items-center gap-3 bg-white text-surface px-10 py-4 rounded-full font-label text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-gray-200 transition-all duration-500 ease-out active:scale-95"
                    >
                        Return to Archive
                        <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
