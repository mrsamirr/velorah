import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function ArchivePage() {
    return (
        <>
            <TopNavBar />
            <main className="pt-40 pb-24 px-6 md:px-0 max-w-4xl mx-auto flex-grow w-full">
                <header className="mb-16 md:mb-24 px-4 md:px-0">
                    <h1 className="font-serif text-5xl md:text-7xl italic mb-6 tracking-tighter">
                        The Obsidian Archive
                    </h1>
                    <p className="font-sans text-on-surface-variant max-w-xl text-lg leading-relaxed">
                        A curated sequence of thoughts on architectural minimalism, cinematic depth, and the quiet pursuit of digital permanence.
                    </p>
                </header>
                <div className="space-y-24 md:space-y-32">
                    <article className="group cursor-pointer px-4 md:px-0">
                        <Link href="/article" className="flex flex-col md:flex-row gap-8 md:gap-12 items-start block w-full h-full">
                            <div className="w-full md:w-1/3 aspect-[4/5] bg-surface-container overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2WQbuEs0VQQ-_roWP8WpTGKnOss8yasaWl6WxZ30o3rIPc9Fz648kGzQP8mXNzatpEMiDz1RtQ7fLYmD0Kv4DrLoERUeaopNgY7qJ88M0LHZ4nw6GO3UhKYLT2vPgf3lkbNu88gqGvNPrtMsjS9WHxao-EnjDqt8AI6nYHdybz5KnVO952qAbozzk04nnBMb-zp6dFxa8CT7dEiZLAqVFqAToLLIoSFTa6fw6ilvq5TH3vmYwcdgMCPHM6S60fw3mDZRw6MW6RTm7"
                                    alt="Archive item 1"
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-outline">
                                        MAR 14, 2024
                                    </span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl group-hover:italic transition-all duration-500 text-white">
                                    The Silence of Concrete: A Study in Brutalism
                                </h2>
                                <p className="font-sans text-on-surface-variant leading-relaxed text-base md:text-lg">
                                    In an era of digital noise, the permanence of physical structures offers a sanctuary. We explore how raw materials dictate the emotional resonance of a space...
                                </p>
                            </div>
                        </Link>
                    </article>
                    <article className="group cursor-pointer px-4 md:px-0">
                        <Link href="/article" className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start block w-full h-full">
                            <div className="w-full md:w-1/3 aspect-[4/5] bg-surface-container overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmSkLBy-JvMlxCVie_E6tyMPoWdSX5DaIkeZDcjVkWgmDFhwmtN0nOuaOaXnsGIB5u49SdoHzBDj4CBQfSl3RlhJmxu7v3s4YtKcwwP_Lw-cH9I2CDiZGbpBnr9qvpy-4ocyV1UgGvFlNtxRmwG3YUnk0ugPBj0wSu6Vzs5LofyGVbdgV2NADIp2lvMbl0NApFeiLFzmADAGSMf7Ko4xxTy6WX936n_Pjtl4nHZi8PUx3f849pVjrw0Ve6tHG1l1tRYHnVBCl_PoaI"
                                    alt="Archive item 2"
                                />
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-outline">
                                        MAR 09, 2024
                                    </span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl group-hover:italic transition-all duration-500 text-white">
                                    Luminous Shadows: The Art of Mood Lighting
                                </h2>
                                <p className="font-sans text-on-surface-variant leading-relaxed text-base md:text-lg">
                                    Shadow is not the absence of light, but its partner. Mastering the cinematic quality of a digital interface requires understanding how to sculpt darkness...
                                </p>
                            </div>
                        </Link>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
