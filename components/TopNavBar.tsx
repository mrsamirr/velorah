"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PenTool, Bell, ChevronDown, LayoutDashboard, Settings, LogOut, Menu } from "lucide-react";

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

    const fetchUserProfile = async (retries = 3) => {
        const supabase = createClient();
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
            console.error('[TopNavBar] Auth error:', authError.message);
        }
        
        if (!authUser) {
            console.log('[TopNavBar] No auth user, retries left:', retries);
            // If no user and we have retries, try again after a delay
            if (retries > 0) {
                setTimeout(() => fetchUserProfile(retries - 1), 100);
            } else {
                console.log('[TopNavBar] No auth user after retries');
                setUser(null);
            }
            return; 
        }
        
        console.log('[TopNavBar] Auth user found:', authUser.id);
        const { data, error: profileError } = await supabase
            .from("profiles")
            .select("display_name, username, avatar_url")
            .eq("id", authUser.id)
            .single();
            
        if (profileError) {
            console.error('[TopNavBar] Profile fetch error:', profileError.message);
        }
        
        if (data) {
            console.log('[TopNavBar] Profile loaded:', data.display_name);
            setUser({
                displayName: data.display_name,
                username: data.username,
                avatarUrl: data.avatar_url,
            });
        } else {
            console.log('[TopNavBar] No profile found for user');
        }
    };

    useEffect(() => {
        fetchUserProfile(10);
    }, []);

    useEffect(() => {
        const supabase = createClient();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                // Add slight delay to ensure session is fully synced
                setTimeout(() => fetchUserProfile(0), 50);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
        });
        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    useEffect(() => {
        fetchUserProfile();
    }, [pathname]);

    // Periodic refresh while on protected pages (authcheck)
    useEffect(() => {
        if (pathname.startsWith('/author') || pathname.startsWith('/settings') || pathname.startsWith('/publish')) {
            const interval = setInterval(() => {
                if (!user) {
                    fetchUserProfile(0);
                }
            }, 250);
            return () => clearInterval(interval);
        }
    }, [pathname, user]);

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
                                <PenTool size={16} />
                                Compose
                            </Link>
                            <Link
                                href="/notifications"
                                className="hidden md:flex text-on-surface-variant hover:text-white transition-colors"
                            >
                                <Bell size={20} />
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
                                    <ChevronDown size={16} className="text-on-surface-variant group-hover:text-white transition-colors" />
                                </button>
                                {menuOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-56 bg-surface-container-lowest border border-white/10 shadow-2xl shadow-black/50 py-2">
                                        <div className="px-5 py-3 border-b border-white/5">
                                            <p className="text-sm font-headline text-white truncate">{user.displayName}</p>
                                            <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">@{user.username}</p>
                                        </div>
                                        <Link href="/author" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                                            <LayoutDashboard size={18} />
                                            Dashboard
                                        </Link>
                                        <Link href="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                                            <Settings size={18} />
                                            Settings
                                        </Link>
                                        <Link href="/notifications" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors md:hidden">
                                            <Bell size={18} />
                                            Notifications
                                        </Link>
                                        <div className="border-t border-white/5 mt-1">
                                            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                                                <LogOut size={18} />
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
                        <Menu size={24} />
                    </button>
                </div>
            </nav>
        </header>
    );
};
