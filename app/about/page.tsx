import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    return (
        <>
            <TopNavBar transparent={true} />
            <main className="flex-grow w-full">
                <section className="min-h-screen flex flex-col justify-center px-8 pb-20 pt-40 relative">
                    <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-end relative z-10">
                        <div className="space-y-8">
                            <h1 className="font-headline text-[4rem] md:text-[8rem] leading-[0.9] tracking-[-0.04em] text-white italic">
                                Beyond the <br />
                                Obsidian.
                            </h1>
                        </div>
                        <div className="space-y-12">
                            <p className="text-xl leading-relaxed text-on-surface-variant max-w-md">
                                Velorah is a sanctuary for curated excellence. We reject the noise of the digital age to find beauty in the silent, the minimal, and the profound.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-32 md:py-48 px-8 bg-surface-container-lowest">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-5 relative overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="w-full grayscale brightness-75 object-cover aspect-[3/4]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9gRvQK7eD1cVN1Tcb-kgoQ3Fi-JNHMFFAOZCbDOzsk2QoAiXxqFn8FqgJPkrpV5VF6GeYmG45s2GVlGVTC6bncUTREbhupB98HtNuNRrCtfcMVWrJ4pI2zE28efG-PZvGqw0kZMouTntPVG8aiBY7UpY9ZjkLXJHhD-QroSxVU3oKYP_2elxtEHw6eWI4maEOQvYD-DtIeq0oeYEvIj94fbnijz2iGFUAQU0pvnUib961agR-3uEKckX47_EORmJlZT1gQ2cMI8f6"
                                    alt="About image"
                                />
                            </div>
                            <div className="md:col-span-7 space-y-8 md:pl-20">
                                <h2 className="font-headline text-5xl md:text-7xl leading-tight text-white">
                                    To ignite the <br />
                                    curated void.
                                </h2>
                                <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                                    Our mission is to dismantle the clutter of modern media. We provide a canvas where only the most essential narratives survive.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
