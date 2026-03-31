import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function AuthorDashboard() {
    return (
        <>
            <TopNavBar />
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto flex-grow w-full">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
                    <div className="flex items-center gap-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt="Author Avatar"
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover grayscale brightness-90 border-2 border-outline-variant/30"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaKx834Fh_gRqyU0LoHxemR4rHX8AEbvLQA_WR6ZTA9eBukK5xBzPCdAnuipQMHttFzMp7ket3Fl7GfKXcBMZfqNwOLlxfiCeOridz51JShCi2lMA4G8ss9psKJUuZPxrAFwH4b-aZCHKCIDnVHNIdNO-ay_aX_m6Wi9SGCy5GteUzEUKO-xv1mvMPrGGrnVq0HA5MCaoPYLAgX3sY-akLfHNFb_Oq2JRSkZ617NMM9eE-HDUGPApU3eeG8t3GmESEknm_XyDzTwhR"
                        />
                        <div>
                            <h1 className="text-4xl md:text-6xl font-headline italic tracking-tight text-on-surface">
                                Julian Thorne
                            </h1>
                            <p className="text-on-surface-variant font-body mt-2 tracking-wide uppercase text-xs font-semibold">
                                Chief Curator
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/publish"
                        className="rounded-full px-8 py-3 bg-white text-black font-bold text-sm hover:scale-95 transition-transform flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined">edit_note</span> Write
                    </Link>
                </header>

                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                    <div className="bg-surface-container-high p-6 md:p-8 rounded-lg border border-outline-variant/30">
                        <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            Stories
                        </p>
                        <span className="text-3xl md:text-5xl font-headline text-on-surface">42</span>
                    </div>
                    <div className="bg-surface-container-high p-6 md:p-8 rounded-lg border border-outline-variant/30">
                        <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            Published
                        </p>
                        <span className="text-3xl md:text-5xl font-headline text-on-surface">38</span>
                    </div>
                    <div className="bg-surface-container-high p-6 md:p-8 rounded-lg border border-outline-variant/30">
                        <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            Likes
                        </p>
                        <span className="text-3xl md:text-5xl font-headline text-on-surface">12.4k</span>
                    </div>
                    <div className="bg-surface-container-high p-6 md:p-8 rounded-lg border border-outline-variant/30">
                        <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            Views
                        </p>
                        <span className="text-3xl md:text-5xl font-headline text-on-surface">89.2k</span>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-8 md:gap-12 border-b border-outline-variant/20 mb-12 md:mb-16">
                        <button className="pb-4 text-on-surface border-b border-on-surface font-bold text-[10px] tracking-[0.3em] uppercase">
                            Published
                        </button>
                        <button className="pb-4 text-on-surface-variant font-bold text-[10px] tracking-[0.3em] uppercase">
                            Drafts
                        </button>
                    </div>
                    <div className="space-y-16 md:space-y-24">
                        <div className="group">
                            <Link href="/article" className="flex flex-col md:flex-row gap-8 md:gap-12 items-center w-full block">
                                <div className="w-full md:w-5/12 overflow-hidden rounded-lg bg-surface-container-low aspect-[16/10] border border-outline-variant/10">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl3O-TYOGvREO5WrZjExwYcvaggyHWNrEtPrB1Vh3uLUmvFz8nVLY2Mf1EjmIeGiyv6xiHDCO05bDyhbMCQPsaONkei68X-dSyFV8gXQmjyuwakhNspGSqEE1lp0ONMl8OLevStzZSSfH2AQofVqc8R9XcLZOkMVKW8rwvXr2HeBBJbN9G-Q1S_tFibDIQ-vBkUOwFqEya2gfPQz3KvRa1EP_1Ur5qA2NdbQs8WCFtogAiCS5bqC95b780tY_TrW_MnXm4rY5nVnC4"
                                        alt="Article Thumbnail"
                                    />
                                </div>
                                <div className="w-full md:w-7/12">
                                    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 bg-surface-container-highest text-on-surface rounded-full">
                                            Philosophy
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-headline mb-4 md:mb-6 group-hover:italic transition-all duration-500">
                                        The Silence Between the Frames
                                    </h2>
                                    <p className="text-on-surface-variant text-sm leading-relaxed max-w-xl">
                                        An exploration into the minimalist aesthetic and why the space we leave empty defines the stories we tell more than the noise we fill them with.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
