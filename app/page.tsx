import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
    return (
        <>
            <TopNavBar transparent={true} />
            <main className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    <video
                        autoPlay
                        className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
                        loop
                        muted
                        playsInline
                        poster="image-hero-poster"
                    >
                        <source
                            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface/90"></div>
                </div>
                <div className="relative z-10 w-full max-w-4xl px-8 text-center flex flex-col items-center gap-10">
                    <h1 className="text-5xl md:text-8xl font-headline leading-[1.1] text-on-surface tracking-tight">
                        Where <em className="not-italic text-on-surface-variant/70">dreams</em> rise <br className="hidden md:block" />
                        <em className="not-italic text-on-surface-variant/70">through the silence.</em>
                    </h1>
                    <p className="max-w-2xl text-on-surface-variant text-base md:text-lg leading-relaxed font-body">
                        We’re designing tools for deep thinkers, bold creators, and quiet rebels.
                        Amid the chaos, we build digital spaces for sharp focus and inspired work.
                    </p>
                    <div className="mt-4">
                        <Link
                            href="/feed"
                            className="group relative inline-flex items-center justify-center px-12 py-5 rounded-full overflow-hidden transition-all duration-700 active:scale-95 shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-white/5 glass-blur border border-white/10 rounded-full"></div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white via-secondary to-gray-400"></div>
                            <span className="relative z-10 flex items-center gap-3 font-label text-sm uppercase tracking-[0.25em] text-white group-hover:text-surface transition-colors duration-500 font-bold">
                                Begin Journey
                                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                    <span className="font-label text-[10px] uppercase tracking-[0.4em] text-white">Observe</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </main>
            <section className="relative bg-surface py-40 px-6 md:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-end">
                        <div className="md:col-span-5 space-y-8">
                            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                                The Curated Environment
                            </span>
                            <h2 className="text-4xl md:text-6xl font-headline leading-tight text-white">
                                A canvas for <br /> the conscious.
                            </h2>
                            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                                Every pixel in Velorah is placed with intentionality. We believe that digital architecture should not compete with your thoughts, but provide the silence necessary for them to flourish.
                            </p>
                        </div>
                        <div className="md:col-span-7">
                            <div className="aspect-[16/10] bg-surface-container-low rounded-lg overflow-hidden group border border-white/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Minimalist workspace"
                                    className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl1kCZ_W8YhdiIB7Esx4BngV15vrJ1-OFb40Lx9uKvhukI0Nh9Hn5ArInn4KYuj31VCNRBHmJQejqpjU2paJ4R4mZufNeZzQ6PnHmcbuMoN4_2QcwmL2G5v1koNLUWfLqjlL3e7s7YkG_QMN5L-vfBVkYRMI3X9xnFx8WQ0rb3RverNi6_L_hpAL-r-pdNCHlr9QcqkWPGNS1mESxcDECpyz766IrSd8s0w89iIJtsWYeNYiM5tnfuUe4TYtutcXRxkDLuT4EvkwdY"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
