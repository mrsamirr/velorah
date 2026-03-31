import Link from "next/link";

export default function PublishPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-surface">
            <nav className="bg-[#131313]/60 backdrop-blur-md fixed top-0 w-full border-b border-white/5 z-50 flex justify-between items-center px-8 md:px-16 py-6 md:py-8">
                <Link href="/" className="text-2xl font-serif font-light tracking-widest text-white uppercase">
                    Velorah
                </Link>
                <Link
                    href="/author"
                    className="bg-primary text-on-primary px-6 py-2 font-sans uppercase tracking-[0.2em] inline-block text-[10px] font-bold"
                >
                    Back
                </Link>
            </nav>

            <section className="flex-1 px-6 md:px-24 pt-32 pb-24 border-r border-white/5 overflow-y-auto w-full">
                <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
                    <div className="relative group aspect-[21/9] w-full bg-surface-container-lowest overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="w-full h-full object-cover opacity-60"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBddOnSo_vSaR8dkwX7d-kgozIQz_IwwHelgSk_PYQjhY8KVuaSzwrkRkmS93Z1zyzIo9Ka0Y6XtgY068I4Vi4kU5gm2PWU9d-JKlVT7WxSvpDJVEAXNKcq86bQqmijymPzDceXf_fl5zOq-upfWVOUfmtsLaiasVHXsYV5Le1lnYVR02vXpDqxYVbZW7jP7XKzyOa3wcJ7mtPveAyEao66ijNpOAu92vJsjFk7y9AdI9Ni618ZFvhQ-En7_181cp11Y1Zb8oFpPe_3"
                            alt="Header image"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="block text-[10px] tracking-[0.4em] uppercase text-outline">
                            Narrative Title
                        </label>
                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 text-4xl md:text-7xl font-serif tracking-tighter text-white placeholder:text-surface-container-highest resize-none leading-tight py-2 outline-none"
                            placeholder="The Weight of Silence"
                            rows={1}
                        ></textarea>
                    </div>
                    <div className="space-y-6">
                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 text-lg leading-relaxed font-light tracking-wide text-white placeholder:text-surface-container-highest resize-none outline-none h-96"
                            placeholder="Begin the archive..."
                            rows={20}
                        ></textarea>
                    </div>
                </div>
            </section>

            <aside className="w-full md:w-[400px] sidebar-blur p-8 md:p-12 space-y-12 h-screen md:sticky md:top-0 md:pt-32 overflow-y-auto">
                <div className="space-y-8">
                    <h3 className="text-[11px] tracking-[0.5em] uppercase text-white font-semibold">Details</h3>
                    <div className="space-y-3">
                        <label className="block text-[10px] tracking-[0.3em] uppercase text-outline">
                            Category
                        </label>
                        <select className="w-full glass-input py-4 px-4 text-xs tracking-widest uppercase text-white outline-none">
                            <option className="text-black">Philosophy</option>
                            <option className="text-black">Architecture</option>
                            <option className="text-black">Design</option>
                        </select>
                    </div>
                    <div className="pt-12 space-y-4">
                        <button className="w-full bg-primary text-on-primary py-5 font-bold text-[10px] uppercase tracking-[0.4em]">
                            Publish
                        </button>
                        <button className="w-full border border-white/10 text-white/40 hover:text-white py-4 text-[10px] uppercase tracking-[0.4em]">
                            Save Draft
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
