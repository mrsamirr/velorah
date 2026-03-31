import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function FeedPage() {
    return (
        <>
            <TopNavBar />
            <main className="pt-40 pb-20 flex-grow">
                <header className="px-12 mb-20 max-w-screen-2xl mx-auto">
                    <h1 className="font-headline text-[5rem] md:text-[7rem] leading-none mb-6 text-on-surface tracking-tighter">
                        Stay curious.
                    </h1>
                    <p className="font-body text-on-surface-variant max-w-lg text-lg leading-relaxed border-l border-white/10 pl-8">
                        A sanctuary for deep thought, digital craftsmanship, and the quiet pursuit of meaningful perspectives in a noisy world.
                    </p>
                </header>
                <section className="px-12 mb-24 max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 group cursor-pointer">
                            <Link href="/article" className="block w-full h-full">
                                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-8 bg-surface-container-low border border-white/5">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrF30Shxq2gurEn-q4HQYrJcGsBZEcCcoc4K5bao1Zp3qEvwG_zubyIUHpLTnaqv5J5YyG3UPwaTvRzNQlENUPGY4BUfqzQ5DE9-6W1ApgWNR7z1-dFd1EgJoHPXhICQvdnsd45bLN1QzAPoPqUE-R4GoQxy1BxCKj5D4wuGpvbgPuH6QRyYb6See29ObKg4frKhDne1ugRWyB67Eu8V5pX17A6TVgKiSwO2ptDwMwVN-AzbRhszNJnqGy7oeExMwhwHo_PLIcL4DV"
                                        alt="Cover Story"
                                    />
                                </div>
                                <div>
                                    <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 block">
                                        Cover Story — Design Theory
                                    </span>
                                    <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-6 group-hover:italic transition-all duration-500">
                                        The Architecture of Silence
                                    </h2>
                                    <p className="text-on-surface-variant text-lg max-w-2xl font-body leading-relaxed">
                                        Exploring how physical and digital spaces benefit from intentional voids, minimalist structures, and the preservation of quiet aesthetics in the age of overstimulation.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-12">
                            <div className="group cursor-pointer">
                                <Link href="/article" className="block w-full h-full">
                                    <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-surface-container-low border border-white/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr7ZFMre4k1PTSZkAJyQvXnKGsZABmzA3f3s6FCgK06DlhgP-d689SnKVaOeVXzqMt6Teiri-k5UWMQSOxhHbsOH-YGURcJ0F4Fe8eCoN304aA7odECxB2iSad0OhQIeo5h2_NXx0IE3r9UEMB3eSeTWKCjykbNUxIJo5KJxQAQcr-LyrvrKztH4lm7IU_JcwCDqFdyshHoBJ29x8qDQojOMRlE84OxzSBP4Y5wQKr_d-lHLXZjB7QbHqkiLyH4B6ItmukzMMoxHi_"
                                            alt="Technology"
                                        />
                                    </div>
                                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 block">
                                        Technology
                                    </span>
                                    <h3 className="font-headline text-3xl text-on-surface mb-3 group-hover:italic transition-all">
                                        Beyond the Algorithm
                                    </h3>
                                </Link>
                            </div>
                            <div className="group cursor-pointer">
                                <Link href="/article" className="block w-full h-full">
                                    <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-surface-container-low border border-white/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsYpn00GLiMV8hiPUZ-Wqty0GX0dxEnB9X5oNZeP1dB3KBvYBILK-932I7dJBjxoHYKQ_By7seG6hOSS8VqhPPf7sv4trmYZVKuV1joaeiTQVqVGt2S_VCjATZka9V0u89E6v1JEdveWvypo5FTZ_LErX_GsnAmqd2jry6BXW84T3U8iH9XnDf5wTI5Qi6ECdTGONA-AESsplV-LjiIZeIwQfDO85BATV7JzBKEAeCSw3Du1I7a52pSEghPBM0gfXs1OnBTb0pn7ew"
                                            alt="Writing"
                                        />
                                    </div>
                                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 block">
                                        Writing
                                    </span>
                                    <h3 className="font-headline text-3xl text-on-surface mb-3 group-hover:italic transition-all">
                                        The New Editorial Era
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
