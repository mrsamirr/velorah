"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TopNavBar = ({ transparent = false }: { transparent?: boolean }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const bgClass =
        transparent && !isScrolled
            ? "bg-transparent"
            : "bg-surface/80 backdrop-blur-xl border-b border-white/5";

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgClass}`}>
            <nav className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-screen-2xl mx-auto">
                <Link
                    href="/"
                    className="text-2xl font-headline italic text-white tracking-tighter hover:opacity-80 transition-opacity"
                >
                    Velorah®
                </Link>
                <ul className="hidden md:flex gap-12 items-center">
                    <li>
                        <Link
                            href="/feed"
                            className={`font-headline italic text-lg ${
                                pathname.startsWith("/feed")
                                    ? "text-white border-b-2 border-white pb-1"
                                    : "text-on-surface-variant hover:text-white"
                            } hover:tracking-widest transition-all duration-500 ease-out`}
                        >
                            Essays
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/archive"
                            className={`font-headline italic text-lg ${
                                pathname === "/archive"
                                    ? "text-white border-b-2 border-white pb-1"
                                    : "text-on-surface-variant hover:text-white"
                            } hover:tracking-widest transition-all duration-500 ease-out`}
                        >
                            Collections
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`font-headline italic text-lg ${
                                pathname === "/about"
                                    ? "text-white border-b-2 border-white pb-1"
                                    : "text-on-surface-variant hover:text-white"
                            } hover:tracking-widest transition-all duration-500 ease-out`}
                        >
                            Philosophy
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center gap-6">
                    <Link
                        href="/signin"
                        className="hidden md:block px-8 py-3 bg-white text-surface rounded-full font-label text-xs uppercase tracking-widest hover:bg-gray-200 transition-all duration-500 ease-out active:scale-95 font-bold"
                    >
                        Sign In
                    </Link>
                    <button className="md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};
