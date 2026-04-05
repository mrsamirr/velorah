import Link from "next/link";
import React from "react";
import { Clock, Eye, Heart, MessageCircle, ThumbsUp, ArrowRight } from "lucide-react";

export default function HomePage2() {
    return (
        <div style={{
            // Overrides for this specific page based on the HTML
            "--color-outline-variant": "#2A2A2A",
            "--color-surface-container": "#1A1A1A",
            "--color-surface-container-high": "#222222",
            "--color-surface-container-low": "#161616",
        } as React.CSSProperties}>
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-[#121212]/60 backdrop-blur-xl border-b border-white/5">
                <div className="flex justify-between items-center px-12 py-6 w-full max-w-screen-2xl mx-auto">
                    <div className="text-2xl font-serif italic text-white tracking-tighter">Velorah®</div>
                    <div className="hidden md:flex items-center gap-12">
                        <Link href="#" className="text-on-surface-variant hover:text-white transition-all duration-500 ease-out text-sm uppercase tracking-widest font-semibold">Essays</Link>
                        <Link href="#" className="text-on-surface-variant hover:text-white transition-all duration-500 ease-out text-sm uppercase tracking-widest font-semibold">Collections</Link>
                        <Link href="#" className="text-white border-b border-white/40 pb-1 hover:tracking-widest transition-all duration-500 ease-out text-sm uppercase tracking-widest font-semibold">Philosophy</Link>
                    </div>
                    <button className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all duration-500 ease-out scale-100 active:scale-95">
                        Begin Journey
                    </button>
                </div>
            </nav>

            <main className="pt-24">
                {/* Hero Section */}
                <section className="w-full h-[600px] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Cinematic landscape" className="w-full h-full object-cover grayscale brightness-50" data-alt="dramatic wide angle shot of a minimalist concrete building nestled in a misty dark pine forest at twilight with soft ambient lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQTyucH4OBWI1mk-w08ymSx0JinIDphA6q6LOjNpn5owzRjJXZhRm7Fm5wlWFFdMN5DMh10C3SETxHIK6TSoIvouRDzkGHRB5PcY3sGKvveFptxnxC1EiCVncTlKToirEAP7SkY7bn--fqI737jI_62wC_KEMLepD0R9f1ONPnb5OZ766Hw89_CaA-vN3uF0Ak3yPtfQ5RUYlv8yzZ86S0V4P4rejTLgkigDqg_-5EPeoworJSHPesiZAWD19YkX7QmKXGX2GASG6-" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                </section>

                {/* Article Content Shell */}
                <article className="max-w-4xl mx-auto px-6 -mt-48 relative z-10">
                    {/* Header Info */}
                    <div className="space-y-10 mb-20">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white">Philosophy</span>
                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Architecture</span>
                            <div className="h-4 w-px bg-white/10 mx-2"></div>
                            <span className="text-on-surface-variant text-xs flex items-center gap-2">
                                <span className="inline text-sm"><Clock size={14} /></span>
                                12 MIN READ
                            </span>
                            <span className="text-on-surface-variant text-xs flex items-center gap-2">
                                <span className="inline text-sm"><Eye size={14} /></span>
                                4.2K VIEWS
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-headline leading-[1.05] text-on-surface tracking-tight">
                            The Architecture of Silence: Finding Stillness in Modern Chaos
                        </h1>

                        {/* Full Author Card */}
                        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img alt="Author Avatar" className="w-24 h-24 rounded-full object-cover grayscale border border-white/10" data-alt="portait of an elegant elderly man with glasses and grey hair in a charcoal turtleneck against a dark blue background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpAgPiR2sTBOb2FkPhcr3wmJ-zOuB9VKp2SOSZeWbiWI1SbC7z2LxmXabQz-jD1pMeIm1WDEPwENoMd8QnBkE_tFZaKcxONIA31YANtNZDDPBofyoMR1S_pUbiP6s0lpLjp4diC3vfWpeVG3wyE1yJkluK_gFc7J8KuylsjEKzoIvtz9QRhIdtW8h33iCw-3a7BzLYeEh_whuLS6twaIf104_qEN7qfr1lcsNzhKfFCU6-osdYAulhLHGXJoDfiqTRfgJGWrMqqe3l" />
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="text-xl font-headline italic text-white">Elias Thorne</h4>
                                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Lead Curator · Oct 24, 2024</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Link className="text-white hover:text-white/60 transition-colors" href="#">
                                                <span className="inline" data-icon="language">language</span>
                                            </Link>
                                            <button className="px-6 py-2 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Follow</button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                                        Elias has spent three decades exploring the intersection of minimalist Japanese design and Nordic functionalism. His work focuses on the psychological impact of built environments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Text */}
                    <div className="prose max-w-none text-on-surface-variant font-body">
                        {/* We add explicit classes because prose might be defined globally differently */}
                        <p className="text-lg leading-relaxed mb-8">
                            In an age defined by the relentless hum of connectivity, silence has become the ultimate luxury. It is no longer merely the absence of sound, but a physical space we must intentionally construct. At Velorah, we view silence not as a void, but as a foundation—a canvas upon which the true self begins to reappear.
                        </p>
                        <h2 className="text-[2.25rem] font-headline text-white mt-16 mb-6">The Geometry of Quiet</h2>
                        <p className="text-lg leading-relaxed mb-8">
                            The spaces we inhabit dictate the rhythm of our thoughts. When we strip away the visual noise of excess ornamentation and high-saturation environments, we invite the mind to settle. Minimalist architecture isn't about emptiness; it's about the precision of what remains. A single ray of light across a raw concrete floor speaks louder than a room full of curated artifacts.
                        </p>
                        <blockquote className="border-l border-white/20 pl-8 italic font-headline text-[1.75rem] text-white my-12">
                            "True luxury is the ability to hear your own heartbeat in a world that never stops screaming."
                        </blockquote>
                        <p className="text-lg leading-relaxed mb-8">
                            We find that the most profound insights occur in the intervals between activities. It is in the transition from the frantic "doing" to the contemplative "being" where our philosophy takes root. This editorial explores the specific ways we can cultivate these nocturnal sanctuaries, using shadow, texture, and intentional asymmetry to ground our wandering attention.
                        </p>

                        <div className="my-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden border border-white/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 grayscale contrast-125" data-alt="macro shot of textured grey silk fabric folding over a dark stone surface in dramatic chiaroscuro lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfs9kvss_rukddx2_Udz49VFTWHNDZSSBIcROOPYMpiZF3tk5vdDK3Ihv26BCNKkstefqNwTnk4O6EjqiQgTzwX2zcBwnDQljRWkUqz8_qzAv04TQa4667vTKIdMC2wcQD2SUwOIIGKGdxPg-zgcn_PPlHFfGr6xRBfeEGeFtumpn2SyC_0zoz7yqjwmTfa33j6N92ZrufZIdDgo8G--q-BapW0ukIf_W6fwIyz62EEbQ0e6hhy7BNAKyMS3g-uOUEcBZFc4Vr3wxA" />
                            </div>
                            <div className="flex flex-col justify-center space-y-8">
                                <h3 className="font-headline text-4xl italic text-white">Tactile Resonance</h3>
                                <p className="text-base leading-relaxed text-on-surface-variant">
                                    Engagement with the physical world through texture—rough stone, cold steel, soft wool—acts as a sensory anchor. When the digital world feels ethereal and fleeting, the physical world provides the weight we need to remain present. This tactile feedback loops us back into our immediate reality, away from the abstraction of the screen.
                                </p>
                            </div>
                        </div>

                        <p className="text-lg leading-relaxed mb-8">
                            As we move forward, the challenge will be to protect these sanctuaries of silence. It requires a radical commitment to essentialism—not just in our surroundings, but in our digital diet and our internal dialogues. Silence is not a lack; it is a presence that we must curate with the same rigor we apply to our most valuable collections.
                        </p>
                    </div>

                    {/* Tags List */}
                    <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-3">
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mr-4 py-2">TAGS:</span>
                        <Link className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-on-surface-variant hover:text-white hover:border-white/30 transition-all" href="#">MINIMALISM</Link>
                        <Link className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-on-surface-variant hover:text-white hover:border-white/30 transition-all" href="#">STILLNESS</Link>
                        <Link className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-on-surface-variant hover:text-white hover:border-white/30 transition-all" href="#">ESSENTIALISM</Link>
                        <Link className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-on-surface-variant hover:text-white hover:border-white/30 transition-all" href="#">NOCTURNAL ARCHITECTURE</Link>
                    </div>

                    {/* Interaction Bar */}
                    <div className="mt-24 flex justify-center">
                        <div className="inline-flex items-center gap-12 bg-white/5 backdrop-blur-md px-12 py-5 rounded-full border border-white/10 shadow-2xl shadow-black">
                            <button className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors group">
                                <span className="inline" data-icon="favorite">favorite</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">1.2K</span>
                            </button>
                            <div className="w-px h-5 bg-white/10"></div>
                            <button className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors">
                                <span className="inline" data-icon="mode_comment">mode_comment</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">24</span>
                            </button>
                            <div className="w-px h-5 bg-white/10"></div>
                            <button className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors">
                                <span className="inline" data-icon="share">share</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Share</span>
                            </button>
                            <div className="w-px h-5 bg-white/10"></div>
                            <button className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors">
                                <span className="inline" data-icon="bookmark">bookmark</span>
                            </button>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <section className="mt-32 mb-48">
                        <h3 className="font-headline text-5xl mb-16 text-white italic">The Dialogue</h3>

                        {/* Input Area */}
                        <div className="bg-white/[0.03] p-10 rounded-2xl mb-16 border border-white/5 backdrop-blur-sm">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs uppercase border border-white/10 shrink-0">JD</div>
                                <div className="flex-1">
                                    <textarea className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-white/20 resize-none h-32 font-body text-lg outline-none" placeholder="Share your perspective..."></textarea>
                                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                                        <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Maintaining radical civility</span>
                                        <button className="bg-white text-black px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all scale-100 active:scale-95">Post Response</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Threaded Comments */}
                        <div className="space-y-16">
                            {/* Comment 1 */}
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img alt="Avatar" className="w-12 h-12 rounded-full object-cover grayscale border border-white/10" data-alt="close up profile of a young woman with sharp features and short hair looking thoughtful in low moody light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNm1p6mMhNDhpxkSD27O9qu6jMf4KqBAem1oJ87g9iGbSMBbsx20y3u5m9rjF4Tw56TDO0-JZztIYa6-ND9Q4ZxddpJQ30H7CRFskxZTRHuKQTDaL242D6t34YSRjk-TxvGGWWsn3W4vJ1mGEZraM_obctxmz9ty__2xGNv4TEQdQpPH0miRnPeaAP4cOrz6OQVoVnpFWnvPeEarPGtQij9dyRLSIE3bnSQZuBWl4gCKCKJniCpv4ojatVI-kG8mIJMPs-9jhcX1JF" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[11px] font-bold uppercase tracking-widest text-white">Julianne V.</span>
                                                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                                <span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest">2 Hours Ago</span>
                                            </div>
                                            <button className="text-on-surface-variant/40 hover:text-white">
                                                <span className="inline">more_horiz</span>
                                            </button>
                                        </div>
                                        <p className="text-base text-on-surface-variant leading-relaxed">
                                            The concept of &quot;The Geometry of Quiet&quot; resonated deeply. I&apos;ve recently started removing all non-essential objects from my workspace and the cognitive lift is palpable. It&apos;s as if the brain has less data to process, freeing it for actual creation.
                                        </p>
                                        <div className="mt-6 flex items-center gap-8">
                                            <button className="text-[10px] uppercase font-bold text-white tracking-widest hover:underline flex items-center gap-2">
                                                <span><MessageCircle size={16} /></span> Reply
                                            </button>
                                            <button className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-widest hover:text-white flex items-center gap-2">
                                                <ThumbsUp size={14} /> Helpful (14)
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Threaded Reply */}
                                <div className="ml-12 md:ml-18 pl-8 border-l border-white/5 space-y-8">
                                    <div className="flex gap-5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img alt="Avatar" className="w-10 h-10 rounded-full object-cover grayscale border border-white/5" data-alt="portrait of a bearded man in a simple black t-shirt looking away from camera with a serious expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgcGtP2yW3tcC3YxXdA_ovY6F7fLayKwv0pZlVpumOCcVJ-qBcSdRt8_m_FZrHNajCgqkVEQEuOaFKsTE0WmVcwoGZeonT2IYZfucy1g-BH9Y39rYBdGy7kheJt5akxbtRpZ-OYGhLovrjGS59MBwAAu22t3DJzOTaVZqx3n8MbymdcaBQTJuyyxwfviY3Ha3rrMVVsuwoi5VxW9iudxXiq8YDsJmgAVf0iBhXZFQa3xHInF4ska9NdZPSSbY9u-SkNOI8LbUozn8I" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Markus K.</span>
                                                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                                <span className="text-[9px] text-on-surface-variant/40 uppercase tracking-widest">1 Hour Ago</span>
                                            </div>
                                            <p className="text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-white/10 pl-4 py-1">
                                                I agree. It’s about creating a buffer between ourselves and the data stream. We&apos;ve optimized for speed for so long we&apos;ve forgotten the value of latency.
                                            </p>
                                            <div className="mt-4 flex items-center gap-6">
                                                <button className="text-[9px] uppercase font-bold text-on-surface-variant/60 tracking-widest hover:text-white">Reply</button>
                                                <button className="text-[9px] uppercase font-bold text-on-surface-variant/60 tracking-widest hover:text-white">Helpful (3)</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comment 2 */}
                            <div className="flex gap-6 pt-10 border-t border-white/5">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant font-bold text-xs border border-white/5 shrink-0">SK</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-white">S. Kendrick</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                            <span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest">5 Hours Ago</span>
                                        </div>
                                    </div>
                                    <p className="text-base text-on-surface-variant leading-relaxed">
                                        Beautifully written. The nocturnal metaphor is perfect for how we should curate our digital presence. We need these &quot;dimmed&quot; spaces where we aren&apos;t being performing for an algorithm.
                                    </p>
                                    <div className="mt-6 flex items-center gap-8">
                                        <button className="text-[10px] uppercase font-bold text-white tracking-widest hover:underline flex items-center gap-2">
                                            <span><MessageCircle size={16} /></span> Reply
                                        </button>
                                        <button className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-widest hover:text-white flex items-center gap-2">
                                            <ThumbsUp size={14} /> Helpful (8)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pt-10">
                                <button className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 hover:text-white transition-colors">Load More Dialogue</button>
                            </div>
                        </div>
                    </section>
                </article>
            </main>

            {/* Footer */}
            <footer className="w-full py-24 px-12 bg-surface-container-lowest border-t border-white/5">
                <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16 items-start">
                    <div className="space-y-8">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-white">Company</p>
                        <div className="flex flex-col gap-5">
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">About</Link>
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">Manifesto</Link>
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">Careers</Link>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-white">Legal</p>
                        <div className="flex flex-col gap-5">
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">Privacy</Link>
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">Terms</Link>
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">Cookie Policy</Link>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-white">Help</p>
                        <div className="flex flex-col gap-5">
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">Support</Link>
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">Contact</Link>
                            <Link className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300" href="#">FAQ</Link>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="text-xl font-serif italic text-white tracking-tighter mb-6">Velorah®</div>
                        <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-[0.3em] leading-[2]">
                            © 2024 VELORAH WHITESPACE.<br />All rights reserved.<br />Designed for the quiet mind.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
