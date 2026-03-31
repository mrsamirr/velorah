"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-surface">
            <nav className="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
                <Link href="/" className="text-2xl font-headline tracking-[-0.04em] text-white">
                    VELORAH
                </Link>
                <div className="hidden md:flex space-x-12">
                    <Link
                        href="/feed"
                        className="text-[#919191] hover:text-white transition-colors font-label tracking-tighter uppercase text-sm"
                    >
                        Essays
                    </Link>
                    <Link
                        href="/archive"
                        className="text-[#919191] hover:text-white transition-colors font-label tracking-tighter uppercase text-sm"
                    >
                        Archive
                    </Link>
                </div>
            </nav>
            <section className="hidden md:flex md:w-1/2 relative h-screen bg-surface-container-lowest">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt="Architectural abstraction"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125 mix-blend-luminosity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLpkXOLFDMdRCyjNGVXgEHcLVvtm7KXcLagkoieUpRhOdgR2baXvcDXNpRvP0qhh9L5gPn_O1tZ1xvUBZhaEih2GbHeNfsRF7qwlh9_sCZKUNE7KKW4P_imWPRKgxVRB-J1COlt01e04eBPe9Gkabc2Rq7VGC7nu8ueh6WHL-5PQ0fIhpW2v_cH1uB-Lv7nSH99rIe-E3C8LNRM8kSl9f3UfNnUJ28S6RKt87rnG6uOxCT5V2okGldjPZPiZPbF07n9IrPINhtIWDO"
                />
                <div className="relative z-10 flex flex-col justify-end p-20 w-full bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <p className="font-label text-[0.75rem] uppercase tracking-[0.2em] text-outline mb-4">
                        ESTABLISHED 2024
                    </p>
                    <h1 className="font-headline text-[4.5rem] leading-[0.9] tracking-tight text-white max-w-md">
                        The Architecture of Thought.
                    </h1>
                </div>
            </section>
            <section className="flex-1 flex items-center justify-center px-6 py-24 md:p-12 lg:p-24">
                <div className="w-full max-w-md glass-panel p-10 border border-outline-variant/20">
                    <header className="mb-12">
                        <h2 className="font-headline text-5xl text-white mb-2">Enter the Archive</h2>
                        <p className="text-outline font-body text-sm">Access your curated library.</p>
                    </header>
                    <form
                        className="space-y-8"
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.push("/author");
                        }}
                    >
                        <div className="space-y-2 relative group focus-within:border-primary border-b border-outline-variant/30 transition-colors">
                            <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant block group-focus-within:text-primary">
                                Email Address
                            </label>
                            <input
                                className="w-full bg-transparent border-none py-3 px-0 font-body text-white focus:ring-0 placeholder:text-outline/30 placeholder:uppercase"
                                placeholder="name@archive.com"
                                type="email"
                                required
                            />
                        </div>
                        <div className="space-y-2 relative group focus-within:border-primary border-b border-outline-variant/30 transition-colors">
                            <div className="flex justify-between items-end mb-2">
                                <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary">
                                    Password
                                </label>
                            </div>
                            <input
                                className="w-full bg-transparent border-none py-3 px-0 font-body text-white focus:ring-0 placeholder:text-outline/30"
                                placeholder="••••••••"
                                type="password"
                                required
                            />
                        </div>
                        <div className="pt-4 space-y-4">
                            <button
                                className="w-full bg-primary text-on-primary py-5 font-label text-[0.75rem] uppercase tracking-[0.2em] font-bold hover:bg-primary-container transition-all active:scale-[0.98]"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
