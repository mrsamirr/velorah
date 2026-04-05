"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type NavUser = {
    displayName: string;
    username: string;
    avatarUrl: string | null;
} | null;

export const TopNavBar = ({ transparent = false }: { transparent?: boolean }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<NavUser>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user: authUser } }) => {
            if (!authUser) { setUser(null); return; }
            supabase
                .from("profiles")
                .select("display_name, username, avatar_url")
                .eq("id", authUser.id)
                .single()
                .then(({ data }) => {
                    if (data) {
                        setUser({
                            displayName: data.display_name,
                            username: data.username,
                            avatarUrl: data.avatar_url,
                        });
                    }
                });
        });
    }, []);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        setMenuOpen(false);
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
        router.refresh();
    };

    const bgClass =
        transparent && !isScrolled
            ? "bg-transparent"
            : "bg-surface/80 backdrop-blur-xl border-b border-white/5";

    const navLink = (href: string, label: string, active: boolean) => (
        <li>
            <Link
                href={href}
                className={`font-headline italic text-lg ${
                    active
                        ? "text-white border-b-2 border-white pb-1"
                        : "text-on-surface-variant hover:text-white"
                } hover:tracking-widest transition-all duration-500 ease-out`}
            >
                {label}
            </Link>
        </li>
    );

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
                    {navLink("/feed", "Essays", pathname.startsWith("/feed"))}
                    {navLink("/archive", "Collections", pathname === "/archive")}
                    {navLink("/about", "Philosophy", pathname === "/about")}
                    {user && navLink("/search", "Search", pathname === "/search")}
                </ul>
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link
                                href="/publish"
                                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-white text-surface rounded-full font-label text-xs uppercase tracking-widest hover:bg-gray-200 transition-all duration-500 ease-out active:scale-95 font-bold"
                            >
                                <span className="material-symbols-outlined text-sm">edit_note</span>
                                Compose
                            </Link>
                            <Link
                                href="/notifications"
                                className="hidden md:flex text-on-surface-variant hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined">notifications</span>
                            </Link>
                            <div className="relative hidden md:block" ref={menuRef}>
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="flex items-center gap-3 group"
                                >
                                    {user.avatarUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            alt={user.displayName}
                                            src={user.avatarUrl}
                                            className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-white/30 transition-colors"
                                        />
                                    ) : (
                                        <span className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xs font-bold uppercase group-hover:border-white/30 transition-colors">
                                            {user.displayName.charAt(0)}
                                        </span>
                                    )}
                                    <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-white transition-colors">
                                        expand_more
                                    </span>
                                </button>
                                {menuOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-56 bg-surface-container-lowest border border-white/10 shadow-2xl shadow-black/50 py-2">
                                        <div className="px-5 py-3 border-b border-white/5">
                                            <p className="text-sm font-headline text-white truncate">{user.displayName}</p>
                                            <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">@{user.username}</p>
                                        </div>
                                        <Link href="/author" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                                            <span className="material-symbols-outlined text-base">dashboard</span>
                                            Dashboard
                                        </Link>
                                        <Link href="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                                            <span className="material-symbols-outlined text-base">settings</span>
                                            Settings
                                        </Link>
                                        <Link href="/notifications" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors md:hidden">
                                            <span className="material-symbols-outlined text-base">notifications</span>
                                            Notifications
                                        </Link>
                                        <div className="border-t border-white/5 mt-1">
                                            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                                                <span className="material-symbols-outlined text-base">logout</span>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/signin"
                            className="hidden md:block px-8 py-3 bg-white text-surface rounded-full font-label text-xs uppercase tracking-widest hover:bg-gray-200 transition-all duration-500 ease-out active:scale-95 font-bold"
                        >
                            Sign In
                        </Link>
                    )}
                    <button className="md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};
