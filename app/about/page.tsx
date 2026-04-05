import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <TopNavBar transparent={true} />
            <main className="w-full min-h-screen">
                <section className="min-h-screen flex flex-col justify-end px-8 pb-20 pt-40 relative">
                    <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-end relative z-10">
                        <div className="space-y-8">
                            <span className="text-xs font-label uppercase tracking-[0.2em] text-neutral-400">ESTABLISHED MMXXIV</span>
                            <h1 className="font-headline text-[clamp(4rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em] text-white italic">
                                Beyond the <br />
                                Obsidian.
                            </h1>
                        </div>
                        <div className="space-y-12">
                            <p className="text-xl leading-relaxed text-neutral-300 max-w-md">
                                Velorah is a sanctuary for curated excellence. We reject the noise of the digital age to find beauty in the silent, the minimal, and the profound.
                            </p>
                            <div className="h-[1px] w-24 bg-white"></div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#0e0e0e] py-32 md:py-48 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-12 gap-12">
                            <div className="md:col-span-5 relative overflow-hidden group">
                                <img
                                    className="w-full grayscale brightness-75 group-hover:scale-105 transition-transform duration-1000 object-cover aspect-[3/4]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9gRvQK7eD1cVN1Tcb-kgoQ3Fi-JNHMFFAOZCbDOzsk2QoAiXxqFn8FqgJPkrpV5VF6GeYmG45s2GVlGVTC6bncUTREbhupB98HtNuNRrCtfcMVWrJ4pI2zE28efG-PZvGqw0kZMouTntPVG8aiBY7UpY9ZjkLXJHhD-QroSxVU3oKYP_2elxtEHw6eWI4maEOQvYD-DtIeq0oeYEvIj94fbnijz2iGFUAQU0pvnUib961agR-3uEKckX47_EORmJlZT1gQ2cMI8f6"
                                    alt="About image"
                                />
                            </div>
                            <div className="md:col-span-7 flex flex-col justify-center space-y-16 md:pl-20">
                                <div className="space-y-6">
                                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">The Creative North Star</span>
                                    <h2 className="font-headline text-5xl md:text-7xl leading-tight tracking-tight text-white">
                                        To ignite the <br />curated void.
                                    </h2>
                                </div>
                                <p className="text-lg text-neutral-300 max-w-xl leading-relaxed">
                                    Our mission is to dismantle the clutter of modern media. We provide a canvas where only the most essential narratives survive—a digital gallery dedicated to the permanence of quality over the transience of quantity.
                                </p>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <span className="text-white uppercase tracking-widest text-sm font-bold">DISCOVER OUR ETHOS</span>
                                    <span className="inline"><ArrowRight size={16} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 md:py-60 px-8">
                    <div className="max-w-4xl mx-auto text-center space-y-20">
                        <div className="space-y-8">
                            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">Philosophy of Silence</span>
                            <h2 className="font-headline text-6xl md:text-9xl leading-[0.8] tracking-tighter text-white">
                                Whisper <br />Louder.
                            </h2>
                        </div>
                        <div className="relative py-24">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <span className="font-headline text-[20vw] leading-none select-none text-white">SILENCE</span>
                            </div>
                            <p className="text-2xl md:text-3xl font-light leading-snug text-white relative z-10 max-w-2xl mx-auto">
                                In an era of relentless broadcasting, true authority is found in the pause. We believe vision is not about what is seen, but what is felt in the space between.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-1 px-8">
                            <div className="h-1 bg-[#353534]">
                                <div className="h-full bg-white w-1/3"></div>
                            </div>
                            <div className="h-1 bg-[#353534]">
                                <div className="h-full bg-white w-2/3"></div>
                            </div>
                            <div className="h-1 bg-[#353534]">
                                <div className="h-full bg-white w-full"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#1c1b1b] py-32 md:py-48 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
                            <div className="space-y-6">
                                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">The Curators</span>
                                <h2 className="font-headline text-5xl md:text-7xl leading-tight text-white">
                                    Architects of <br />the Archive.
                                </h2>
                            </div>
                            <p className="text-neutral-400 max-w-xs text-right italic">
                                "A collection is only as strong as the hands that filter it."
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-1">
                            <div className="group bg-[#201f1f] p-12 flex flex-col gap-12 hover:bg-[#2a2a2a] transition-colors duration-500">
                                <div className="overflow-hidden aspect-square">
                                    <img className="w-full grayscale brightness-75 group-hover:scale-110 transition-transform duration-1000 object-cover aspect-square" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg8xMDLUZE26vtfYSbE_a9SR-ikcRumo6A0Gqcrp0YYvWL7Z6HpKe2-AfzP2hWuMhLqgBzHJ2k24gdzZyGNvpxKkbqa7ykH5RG4JaqLvzGOZ20kRPlcl1e78Z8KZ4XU2BDBw5H6K0KAkmKXHjBuP1ymFM2B0H_yWnapTgCdfMDeTW5imDtOrFQvjLgqporDdtuobuviDFgSYqwoZGooeajG78UpZia2q9ezgCGW5zIymRYC1hjQae-TFFzDIHcDAtjMXFcNAmHcLMd" alt="Curator 1"/>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-headline text-3xl text-white">Elias Thorne</h3>
                                    <p className="uppercase tracking-widest text-neutral-400 text-xs">Founding Editor</p>
                                    <p className="text-neutral-300 leading-relaxed text-sm">Formerly at The Monolith, Elias brings two decades of structural aesthetic theory to the Velorah mission.</p>
                                </div>
                            </div>
                            <div className="group bg-[#201f1f] p-12 flex flex-col gap-12 hover:bg-[#2a2a2a] transition-colors duration-500">
                                <div className="overflow-hidden aspect-square">
                                    <img className="w-full grayscale brightness-75 group-hover:scale-110 transition-transform duration-1000 object-cover aspect-square" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1fWMsH8sF7GGwBTnPOmMa_aGTazAdKy_Qq6ejbg3TumMBgGlQXmPAUCEi85wl3GLdxa2okZiBWkaTiVa_L2f7qgSnPrA_TUrUV-R1tF4ajYx09Xs-BhhQRC7IBlnSU6PVyRC4q_eHJjia7-gilokLqDCNkv78rGsMFwKxIxsTrE4fed3D2dUlGam4b7tmY5L59vRd0GYUehTV-9qadjYMeLGUTZHm_JDLzxCx7hAMwHLYvzOewDY5vPldBE1KChPWpz8-PXLmiDH1" alt="Curator 2"/>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-headline text-3xl text-white">Sienna Vark</h3>
                                    <p className="uppercase tracking-widest text-neutral-400 text-xs">Creative Director</p>
                                    <p className="text-neutral-300 leading-relaxed text-sm">Sienna's obsession with negative space and brutalist geometry defines the visual soul of our archive.</p>
                                </div>
                            </div>
                            <div className="group bg-[#201f1f] p-12 flex flex-col gap-12 hover:bg-[#2a2a2a] transition-colors duration-500">
                                <div className="overflow-hidden aspect-square">
                                    <img className="w-full grayscale brightness-75 group-hover:scale-110 transition-transform duration-1000 object-cover aspect-square" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxVqjDHru3GldOfOTe4BRJsaNT7IC2kp6k-5XPyF1_FZNj-xLY8v-JIj0ggLP_9a6t_a9NPl6jaouTVf-Yz7wbfWOBRu-9ng5CwX1Cj6yF5Bm0PBYlU_LVPYvpXiZcpjs50YO_DAnVPndxv0oPiYKK55_azDSaUYKxG9T8HApRMeVYCb6mLrbusoRb--DqHlfl2vhbj9juxfwHRojMpXYmjIqaMAJPbk9t3BYDXDn8G1rj1p0QsMjWfZedQrjIQivYUL2QSUlslP" alt="Curator 3"/>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-headline text-3xl text-white">Julian Roe</h3>
                                    <p className="uppercase tracking-widest text-neutral-400 text-xs">Visual Archivist</p>
                                    <p className="text-neutral-300 leading-relaxed text-sm">Julian scours the globe for the unseen, managing our collection of cinematic narratives with forensic precision.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-40 px-8">
                    <div className="max-w-7xl mx-auto border border-white/20 p-16 md:p-32 text-center space-y-12">
                        <h2 className="font-headline text-4xl md:text-6xl text-white">Step into the Gallery.</h2>
                        <button className="bg-white text-black px-12 py-6 font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-colors duration-300">
                            JOIN THE INNER CIRCLE
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
