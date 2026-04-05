import Link from "next/link";
import React from "react";

export default function BlogsPage() {
    return (
        <div style={{
            "--color-surface-container-highest": "#353534",
            "--color-primary-fixed": "#5d5f5f",
            "--color-on-surface": "#e5e2e1",
            "--color-outline-variant": "#474747",
            "--color-on-primary": "#1a1c1c",
            "--color-tertiary": "#e4e2e1",
            "--color-surface-variant": "#353534",
            "--color-primary": "#ffffff",
            "--color-on-secondary": "#1a1c1c",
            "--color-on-primary-fixed": "#ffffff",
            "--color-error-container": "#93000a",
            "--color-on-primary-container": "#000000",
            "--color-background": "#131313",
            "--color-secondary-container": "#464747",
            "--color-tertiary-fixed": "#5f5e5e",
            "--color-surface-dim": "#131313",
            "--color-secondary": "#c7c6c6",
            "--color-surface-container-low": "#1c1b1b",
            "--color-surface-bright": "#393939",
            "--color-secondary-fixed-dim": "#ababab",
            "--color-secondary-fixed": "#c7c6c6",
            "--color-on-secondary-container": "#e3e2e2",
            "--color-tertiary-container": "#929090",
            "--color-inverse-surface": "#e5e2e1",
            "--color-on-primary-fixed-variant": "#e2e2e2",
            "--color-on-tertiary": "#1b1c1c",
            "--color-primary-container": "#d4d4d4",
            "--color-on-secondary-fixed-variant": "#3a3b3c",
            "--color-on-error-container": "#ffdad6",
            "--color-surface-tint": "#c6c6c7",
            "--color-on-secondary-fixed": "#1a1c1c",
            "--color-on-tertiary-fixed": "#ffffff",
            "--color-inverse-on-surface": "#313030",
            "--color-on-tertiary-fixed-variant": "#e4e2e1",
            "--color-tertiary-fixed-dim": "#474747",
            "--color-on-surface-variant": "#c6c6c6",
            "--color-on-error": "#690005",
            "--color-primary-fixed-dim": "#454747",
            "--color-surface-container": "#201f1f",
            "--color-surface": "#131313",
            "--color-on-background": "#e5e2e1",
            "--color-surface-container-lowest": "#0e0e0e",
            "--color-surface-container-high": "#2a2a2a",
            "--color-on-tertiary-container": "#000000",
            "--color-error": "#ffb4ab",
            "--color-outline": "#919191",
            "--color-inverse-primary": "#5d5f5f",
        } as React.CSSProperties} className="font-sans antialiased bg-[#131313] text-[#e5e2e1] min-h-screen">
            {/* TopNavBar */}
            <nav className="bg-[#131313]/60 backdrop-blur-md text-slate-50 fixed top-0 w-full rounded-none border-b border-white/5 z-50 flex justify-between items-center px-8 md:px-16 py-8">
                <div className="text-2xl font-serif font-light tracking-widest text-slate-50 uppercase">Velorah</div>
                <div className="hidden md:flex gap-12 items-center">
                    <Link className="text-white border-b border-white pb-1 font-serif text-lg tracking-tighter hover:text-white transition-all duration-500 ease-in-out" href="#">Essays</Link>
                    <Link className="text-slate-400 font-sans uppercase tracking-[0.2em] text-[10px] hover:text-white transition-all duration-500 ease-in-out" href="#">Collections</Link>
                    <Link className="text-slate-400 font-sans uppercase tracking-[0.2em] text-[10px] hover:text-white transition-all duration-500 ease-in-out" href="#">Philosophy</Link>
                </div>
                <button className="bg-primary text-on-primary px-8 py-3 font-sans uppercase tracking-widest text-[10px] hover:bg-primary-container transition-colors duration-300">
                    Begin Journey
                </button>
            </nav>

            <main className="pt-48 pb-24 px-6 md:px-0 max-w-4xl mx-auto">
                {/* Header Section */}
                <header className="mb-24">
                    <h1 className="font-serif text-[3.5rem] leading-[1.1] tracking-[-0.04em] italic mb-6">The Obsidian Archive</h1>
                    <p className="font-sans text-on-surface-variant max-w-xl text-lg leading-relaxed">
                        A curated sequence of thoughts on architectural minimalism, cinematic depth, and the quiet pursuit of digital permanence.
                    </p>
                </header>

                {/* Vertical Feed */}
                <div className="space-y-32">
                    {/* BlogCard 01 */}
                    <article className="group cursor-pointer">
                        <Link href="/article" className="flex flex-col md:flex-row gap-12 items-start w-full block">
                            <div className="w-full md:w-1/3 aspect-[4/5] bg-surface-container overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                                    data-alt="dramatic architectural shot of a brutalist concrete building against a dark moody sky with high contrast shadows"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2WQbuEs0VQQ-_roWP8WpTGKnOss8yasaWl6WxZ30o3rIPc9Fz648kGzQP8mXNzatpEMiDz1RtQ7fLYmD0Kv4DrLoERUeaopNgY7qJ88M0LHZ4nw6GO3UhKYLT2vPgf3lkbNu88gqGvNPrtMsjS9WHxao-EnjDqt8AI6nYHdybz5KnVO952qAbozzk04nnBMb-zp6dFxa8CT7dEiZLAqVFqAToLLIoSFTa6fw6ilvq5TH3vmYwcdgMCPHM6S60fw3mDZRw6MW6RTm7"
                                    alt="Blog cover"
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-full h-full object-cover"
                                                data-alt="portrait of a minimalist designer in black turtleneck with neutral expression"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp-TdWXjV4WabrIywTGelzdoPSBQbL3-xQG1T12RRjQRi8OTC3_-elUQaq2JJwvy6WaMzDZkHKX2vTX3bjCZ8-nbk1HWrrwPMeLQXGPIfAM87ox_4ciu2RT1nUX5V5g30KIO8n4Rm7kEz087AvPEQy1KbOPP0mifbb6uf1s8CfR0HSWKDi6oQxBxbfm14zEFgwJEksv7HanXux4mHtW-pZof3sAamU9h1CneY0pMHdgiMKnBfXap2sQq86SB-qA4ILAUfqN9OybgRk"
                                                alt="Author"
                                            />
                                        </div>
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Julian Vane</span>
                                    </div>
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-outline">MAR 14, 2024</span>
                                </div>
                                <h2 className="font-serif text-[2rem] leading-[1.2] group-hover:italic transition-all duration-500">The Silence of Concrete: A Study in Brutalism</h2>
                                <p className="font-sans text-on-surface-variant leading-relaxed text-lg line-clamp-3">
                                    In an era of digital noise, the permanence of physical structures offers a sanctuary. We explore how raw materials dictate the emotional resonance of a space...
                                </p>
                                <div className="flex items-center justify-between pt-6">
                                    <div className="flex gap-4 items-center">
                                        <span className="px-3 py-1 bg-surface-container text-[10px] uppercase tracking-widest text-on-surface">Architecture</span>
                                        <span className="font-sans text-[10px] uppercase tracking-widest text-outline">12 MIN READ</span>
                                    </div>
                                    <div className="flex gap-6 text-outline">
                                        <div className="flex items-center gap-2">
                                            <span className="inline" data-icon="visibility">visibility</span>
                                            <span className="text-[10px]">2.4K</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="inline" data-icon="favorite">favorite</span>
                                            <span className="text-[10px]">182</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>

                    {/* BlogCard 02 */}
                    <article className="group cursor-pointer">
                        <Link href="/article" className="flex flex-col md:flex-row-reverse gap-12 items-start w-full block">
                            <div className="w-full md:w-1/3 aspect-[4/5] bg-surface-container overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                                    data-alt="abstract minimalist shot of a single designer lamp in a dark room casting a sharp pool of warm light"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmSkLBy-JvMlxCVie_E6tyMPoWdSX5DaIkeZDcjVkWgmDFhwmtN0nOuaOaXnsGIB5u49SdoHzBDj4CBQfSl3RlhJmxu7v3s4YtKcwwP_Lw-cH9I2CDiZGbpBnr9qvpy-4ocyV1UgGvFlNtxRmwG3YUnk0ugPBj0wSu6Vzs5LofyGVbdgV2NADIp2lvMbl0NApFeiLFzmADAGSMf7Ko4xxTy6WX936n_Pjtl4nHZi8PUx3f849pVjrw0Ve6tHG1l1tRYHnVBCl_PoaI"
                                    alt="Blog cover"
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-full h-full object-cover"
                                                data-alt="minimalist aesthetic portrait of a woman looking away"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIk5hroCrNjKdRCQ6AiXGNHQJ7YsAvdoDioH-n4WesVLrgMtmwvo8Tts2bmSQ-sfXTkk-bxK9NZ_i3BA6qrRM3_z1Gpu0_0ZVz889Hsf_psdAu2ABuQbRlQfONWE-mxKKixDZrETtf_qQjqfkFXGTOYcKR-csJOt-IzC16oXdc6p4KvejiG54PJGbd4b4flP7ZThUr4elxn7lwtV7kh3tmj7-AIjMVzrQwtYpCqvIhDxzBT9mvAjMBYYa0haT48Uv6s73aE-ow3QCy"
                                                alt="Author"
                                            />
                                        </div>
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Elowen Thorne</span>
                                    </div>
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-outline">MAR 09, 2024</span>
                                </div>
                                <h2 className="font-serif text-[2rem] leading-[1.2] group-hover:italic transition-all duration-500">Luminous Shadows: The Art of Mood Lighting</h2>
                                <p className="font-sans text-on-surface-variant leading-relaxed text-lg line-clamp-3">
                                    Shadow is not the absence of light, but its partner. Mastering the cinematic quality of a digital interface requires understanding how to sculpt darkness...
                                </p>
                                <div className="flex items-center justify-between pt-6">
                                    <div className="flex gap-4 items-center">
                                        <span className="px-3 py-1 bg-surface-container text-[10px] uppercase tracking-widest text-on-surface">Design Philosophy</span>
                                        <span className="font-sans text-[10px] uppercase tracking-widest text-outline">8 MIN READ</span>
                                    </div>
                                    <div className="flex gap-6 text-outline">
                                        <div className="flex items-center gap-2">
                                            <span className="inline" data-icon="visibility">visibility</span>
                                            <span className="text-[10px]">1.8K</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="inline" data-icon="favorite">favorite</span>
                                            <span className="text-[10px]">342</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>

                    {/* BlogCard 03 */}
                    <article className="group cursor-pointer">
                        <Link href="/article" className="flex flex-col md:flex-row gap-12 items-start w-full block">
                            <div className="w-full md:w-1/3 aspect-[4/5] bg-surface-container overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                                    data-alt="close up of dark obsidian stones with subtle reflections and sharp edges on a black background"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuifk6dCNY_ugRNCvi6O68sVwBExsZz4U1bC_Pm2i5jG_VPtEN8HxOT2LBtVHS3PPWJkB-GWDyb2d_Oy-mS6MxksGF37m-w6HQfkXpcVjJcc--51S90Qc2dLPQVUAV5qN3iHrDEldTIicuzkEhZ9DEiZ9SCU3TvDwqg6gYyB4phy9u8__jWhktnZbshDGg7WveGq3jPW2GP3ZZFJr-hKIsY0f7nTZ1eY1a8sW32MCnYFmWoUCJNJZsemTxj-O7KyncdKQOAx6X2Q7Y"
                                    alt="Blog cover"
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="w-full h-full object-cover"
                                                data-alt="professional headshot of a creative director"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwDwNtjfhlHsC4QsWIfEwPqQ3RNGqVJNSO5wemng-9-WtysPyTBkZLVx4PVeTOdGR20TqRZlFC_tNAgQan24z7IugpqktGwt2Ks2t89N5rtVjDm52dVc0c6iyApcxlAughGsGElJFr4kVIU6Na47uSHlc7jG3LM5l-gEi62jEjG-bsrzH1ibe0pvxb5hYz2l77kHpWm0d8A2DIMEXGmuZUuLTXvwGarCSKM73nzhKUdwI-VG97FMhYmhMx2OCBkp6YyhRBDxL6xgOJ"
                                                alt="Author"
                                            />
                                        </div>
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Marcus Elara</span>
                                    </div>
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-outline">FEB 28, 2024</span>
                                </div>
                                <h2 className="font-serif text-[2rem] leading-[1.2] group-hover:italic transition-all duration-500">Obsidian Systems: Building for Longevity</h2>
                                <p className="font-sans text-on-surface-variant leading-relaxed text-lg line-clamp-3">
                                    Fast trends fade. True design systems are built like obsidian: sharp, enduring, and formed under pressure. We analyze the components of timeless UI...
                                </p>
                                <div className="flex items-center justify-between pt-6">
                                    <div className="flex gap-4 items-center">
                                        <span className="px-3 py-1 bg-surface-container text-[10px] uppercase tracking-widest text-on-surface">Systems</span>
                                        <span className="font-sans text-[10px] uppercase tracking-widest text-outline">15 MIN READ</span>
                                    </div>
                                    <div className="flex gap-6 text-outline">
                                        <div className="flex items-center gap-2">
                                            <span className="inline" data-icon="visibility">visibility</span>
                                            <span className="text-[10px]">3.1K</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* React style attribute for specific icon variation */}
                                            <span className="inline" data-icon="favorite" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            <span className="text-[10px]">529</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                </div>

                {/* Pagination */}
                <div className="mt-32 pt-16 border-t border-white/10 flex justify-between items-center">
                    <button className="font-sans text-[10px] uppercase tracking-[0.3em] text-outline hover:text-white transition-colors">
                        Previous Archive
                    </button>
                    <div className="flex gap-8 font-sans text-[10px] tracking-[0.2em]">
                        <span className="text-white border-b border-white">01</span>
                        <span className="text-outline hover:text-white cursor-pointer">02</span>
                        <span className="text-outline hover:text-white cursor-pointer">03</span>
                    </div>
                    <button className="font-sans text-[10px] uppercase tracking-[0.3em] text-outline hover:text-white transition-colors">
                        Next Archive
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#0E0E0E] text-slate-400 font-sans text-[10px] tracking-[0.3em] uppercase w-full rounded-none py-24 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center border-t border-white/5">
                <div className="text-xl font-serif italic text-white mb-8 md:mb-0">Velorah</div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-8 md:mb-0">
                    <Link className="text-slate-500 hover:text-white transition-opacity duration-300" href="/privacy">Privacy Policy</Link>
                    <Link className="text-slate-500 hover:text-white transition-opacity duration-300" href="/terms">Terms of Service</Link>
                    <Link className="text-white hover:text-white transition-opacity duration-300" href="/archive">Archive</Link>
                    <Link className="text-slate-500 hover:text-white transition-opacity duration-300" href="#">Contact</Link>
                </div>
                <div className="text-slate-500">© 2024 VELORAH OBSIDIAN ARCHIVE.</div>
            </footer>
        </div>
    );
}
