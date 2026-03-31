import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function ArticlePage() {
    return (
        <>
            <TopNavBar />
            <main className="pt-24 flex-grow">
                <section className="w-full h-[500px] md:h-[600px] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="Cinematic landscape"
                        className="w-full h-full object-cover grayscale brightness-50"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQTyucH4OBWI1mk-w08ymSx0JinIDphA6q6LOjNpn5owzRjJXZhRm7Fm5wlWFFdMN5DMh10C3SETxHIK6TSoIvouRDzkGHRB5PcY3sGKvveFptxnxC1EiCVncTlKToirEAP7SkY7bn--fqI737jI_62wC_KEMLepD0R9f1ONPnb5OZ766Hw89_CaA-vN3uF0Ak3yPtfQ5RUYlv8yzZ86S0V4P4rejTLgkigDqg_-5EPeoworJSHPesiZAWD19YkX7QmKXGX2GASG6-"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                </section>
                <article className="max-w-4xl mx-auto px-6 -mt-32 md:-mt-48 relative z-10">
                    <div className="space-y-8 md:space-y-10 mb-16 md:mb-20">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white">
                                Philosophy
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
                                Architecture
                            </span>
                            <div className="hidden md:block h-4 w-px bg-white/10 mx-2"></div>
                            <span className="text-on-surface-variant text-xs flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">schedule</span> 12 MIN READ
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline leading-[1.05] text-on-surface tracking-tight">
                            The Architecture of Silence: Finding Stillness in Modern Chaos
                        </h1>
                        <div className="p-6 md:p-10 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Author Avatar"
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover grayscale border border-white/10"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpAgPiR2sTBOb2FkPhcr3wmJ-zOuB9VKp2SOSZeWbiWI1SbC7z2LxmXabQz-jD1pMeIm1WDEPwENoMd8QnBkE_tFZaKcxONIA31YANtNZDDPBofyoMR1S_pUbiP6s0lpLjp4diC3vfWpeVG3wyE1yJkluK_gFc7J8KuylsjEKzoIvtz9QRhIdtW8h33iCw-3a7BzLYeEh_whuLS6twaIf104_qEN7qfr1lcsNzhKfFCU6-osdYAulhLHGXJoDfiqTRfgJGWrMqqe3l"
                                />
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h4 className="text-xl font-headline italic text-white">Elias Thorne</h4>
                                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                                                Lead Curator · Oct 24, 2024
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className="px-6 py-2 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                                        Elias has spent three decades exploring the intersection of minimalist Japanese design and Nordic functionalism. His work focuses on the psychological impact of built environments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prose max-w-none text-on-surface-variant font-body">
                        <p className="text-lg leading-relaxed mb-8">
                            In an age defined by the relentless hum of connectivity, silence has become the ultimate luxury. It is no longer merely the absence of sound, but a physical space we must intentionally construct. At Velorah, we view silence not as a void, but as a foundation—a canvas upon which the true self begins to reappear.
                        </p>
                        <h2 className="text-3xl font-headline text-white mt-12 mb-6">The Geometry of Quiet</h2>
                        <p className="text-lg leading-relaxed mb-8">
                            The spaces we inhabit dictate the rhythm of our thoughts. When we strip away the visual noise of excess ornamentation and high-saturation environments, we invite the mind to settle. Minimalist architecture isn't about emptiness; it's about the precision of what remains. A single ray of light across a raw concrete floor speaks louder than a room full of curated artifacts.
                        </p>
                        <blockquote className="border-l-2 border-white/20 pl-6 italic font-headline text-2xl text-white my-12">
                            "True luxury is the ability to hear your own heartbeat in a world that never stops screaming."
                        </blockquote>
                        <div className="my-16 md:my-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden border border-white/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 grayscale contrast-125"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfs9kvss_rukddx2_Udz49VFTWHNDZSSBIcROOPYMpiZF3tk5vdDK3Ihv26BCNKkstefqNwTnk4O6EjqiQgTzwX2zcBwnDQljRWkUqz8_qzAv04TQa4667vTKIdMC2wcQD2SUwOIIGKGdxPg-zgcn_PPlHFfGr6xRBfeEGeFtumpn2SyC_0zoz7yqjwmTfa33j6N92ZrufZIdDgo8G--q-BapW0ukIf_W6fwIyz62EEbQ0e6hhy7BNAKyMS3g-uOUEcBZFc4Vr3wxA"
                                    alt="Architecture image"
                                />
                            </div>
                            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                                <h3 className="font-headline text-3xl md:text-4xl italic text-white">Tactile Resonance</h3>
                                <p className="text-base leading-relaxed">
                                    Engagement with the physical world through texture—rough stone, cold steel, soft wool—acts as a sensory anchor. When the digital world feels ethereal and fleeting, the physical world provides the weight we need to remain present.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
