import Link from "next/link";

export const Footer = () => (
    <footer className="w-full py-20 px-12 bg-surface border-t border-white/5 mt-auto">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 items-start">
            <div className="space-y-6">
                <Link
                    href="/"
                    className="text-xl font-headline italic text-white tracking-tighter mb-8 block hover:opacity-80 transition-opacity"
                >
                    Velorah®
                </Link>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-xs normal-case font-body opacity-60">
                    A publication dedicated to the intersection of deep thought and modern craft. Curating the best of the web for the intentional mind.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <h5 className="text-white font-['Inter'] text-xs font-semibold uppercase tracking-widest mb-2">
                    Company
                </h5>
                <Link
                    href="/about"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                >
                    About
                </Link>
                <Link
                    href="/author"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                >
                    Curators
                </Link>
                <Link
                    href="/feed"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                >
                    Manifesto
                </Link>
            </div>
            <div className="flex flex-col gap-4">
                <h5 className="text-white font-['Inter'] text-xs font-semibold uppercase tracking-widest mb-2">
                    Legal
                </h5>
                <Link
                    href="/privacy"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                >
                    Privacy
                </Link>
                <Link
                    href="/terms"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                >
                    Terms
                </Link>
                <Link
                    href="/cookies"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                >
                    Cookie Policy
                </Link>
            </div>
            <div className="flex flex-col gap-4">
                <h5 className="text-white font-['Inter'] text-xs font-semibold uppercase tracking-widest mb-2">
                    Connect
                </h5>
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer transition-colors">
                        language
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant hover:text-white cursor-pointer transition-colors">
                        alternate_email
                    </span>
                </div>
            </div>
        </div>
        <div className="max-w-screen-2xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest opacity-40">
                © 2024 Velorah WhiteSpace. All rights reserved.
            </span>
            <div className="flex gap-8">
                <Link
                    href="/terms"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors"
                >
                    Terms
                </Link>
                <Link
                    href="/privacy"
                    className="text-on-surface-variant font-['Inter'] text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors"
                >
                    Privacy
                </Link>
            </div>
        </div>
    </footer>
);
