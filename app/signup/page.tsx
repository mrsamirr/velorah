import Link from "next/link";
import React from "react";

export default function SignupPage() {
    return (
        <div style={{
            "--color-on-secondary-fixed-variant": "#3a3b3c",
            "--color-surface-container-high": "#2a2a2a",
            "--color-inverse-surface": "#e5e2e1",
            "--color-surface-dim": "#131313",
            "--color-surface-tint": "#c6c6c7",
            "--color-tertiary-fixed-dim": "#474747",
            "--color-secondary-fixed": "#c7c6c6",
            "--color-surface-container": "#201f1f",
            "--color-surface-bright": "#393939",
            "--color-on-primary": "#1a1c1c",
            "--color-primary-fixed-dim": "#454747",
            "--color-primary": "#ffffff",
            "--color-secondary-container": "#464747",
            "--color-secondary": "#c7c6c6",
            "--color-surface-container-low": "#1c1b1b",
            "--color-outline-variant": "#474747",
            "--color-inverse-on-surface": "#313030",
            "--color-surface-container-highest": "#353534",
            "--color-on-tertiary-fixed": "#ffffff",
            "--color-on-error": "#690005",
            "--color-inverse-primary": "#5d5f5f",
            "--color-on-primary-fixed": "#ffffff",
            "--color-on-surface": "#e5e2e1",
            "--color-on-secondary": "#1a1c1c",
            "--color-on-tertiary": "#1b1c1c",
            "--color-on-primary-container": "#000000",
            "--color-primary-fixed": "#5d5f5f",
            "--color-surface-variant": "#353534",
            "--color-on-surface-variant": "#c6c6c6",
            "--color-on-secondary-container": "#e3e2e2",
            "--color-on-tertiary-container": "#000000",
            "--color-tertiary-container": "#929090",
            "--color-primary-container": "#d4d4d4",
            "--color-outline": "#919191",
            "--color-tertiary": "#e4e2e1",
            "--color-surface-container-lowest": "#0e0e0e",
            "--color-on-secondary-fixed": "#1a1c1c",
            "--color-error": "#ffb4ab",
            "--color-tertiary-fixed": "#5f5e5e",
            "--color-error-container": "#93000a",
            "--color-surface": "#131313",
            "--color-secondary-fixed-dim": "#ababab",
            "--color-on-tertiary-fixed-variant": "#e4e2e1",
            "--color-on-error-container": "#ffdad6",
            "--color-on-background": "#e5e2e1",
            "--color-background": "#131313",
            "--color-on-primary-fixed-variant": "#e2e2e2"
        } as React.CSSProperties} className="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary">
            <nav className="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
                <div className="text-2xl font-headline tracking-[-0.04em] text-white">VELORAH</div>
                <div className="hidden md:flex space-x-12">
                    <Link className="text-[#919191] hover:text-white transition-colors font-label tracking-tighter uppercase text-sm" href="#">Essays</Link>
                    <Link className="text-[#919191] hover:text-white transition-colors font-label tracking-tighter uppercase text-sm" href="#">Archive</Link>
                    <Link className="text-[#919191] hover:text-white transition-colors font-label tracking-tighter uppercase text-sm" href="#">About</Link>
                </div>
                <div>
                    <Link className="text-white font-label tracking-tighter uppercase text-sm hover:opacity-80 transition-opacity duration-300" href="/signin">Sign In</Link>
                </div>
            </nav>
            <main className="min-h-screen flex flex-col md:flex-row">
                <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-surface-container-lowest">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="cinematic close-up of architectural concrete texture with dramatic diagonal shadows and high-contrast black and white lighting" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLpkXOLFDMdRCyjNGVXgEHcLVvtm7KXcLagkoieUpRhOdgR2baXvcDXNpRvP0qhh9L5gPn_O1tZ1xvUBZhaEih2GbHeNfsRF7qwlh9_sCZKUNE7KKW4P_imWPRKgxVRB-J1COlt01e04eBPe9Gkabc2Rq7VGC7nu8ueh6WHL-5PQ0fIhpW2v_cH1uB-Lv7nSH99rIe-E3C8LNRM8kSl9f3UfNnUJ28S6RKt87rnG6uOxCT5V2okGldjPZPiZPbF07n9IrPINhtIWDO" />
                    <div className="relative z-10 flex flex-col justify-end p-20 w-full">
                        <p className="font-label text-[0.75rem] uppercase tracking-[0.2em] text-outline mb-4">ESTABLISHED 2024</p>
                        <h1 className="font-headline text-[4.5rem] leading-[0.9] tracking-tight text-white max-w-md">The Architecture of Thought.</h1>
                    </div>
                </section>
                <section className="flex-1 flex items-center justify-center px-6 py-24 md:p-12 lg:p-24 bg-surface">
                    <div className="w-full max-w-md glass-panel p-10 border border-outline-variant/20">
                        <header className="mb-12">
                            <h2 className="font-headline text-5xl text-white mb-2">Create your account</h2>
                            <p className="text-outline font-body text-sm">Enter your details to join the obsidian gallery.</p>
                        </header>
                        <form className="space-y-8">
                            <div className="space-y-2 relative">
                                <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant block">Full Name</label>
                                <input className="w-full bg-transparent border-0 border-b border-outline-variant text-white py-3 px-0 font-body placeholder:text-surface-bright focus:border-primary transition-colors focus:ring-0 focus:outline-none" placeholder="ALEXANDER VESTIGE" required type="text" />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant block">Email Address</label>
                                <input className="w-full bg-transparent border-0 border-b border-outline-variant text-white py-3 px-0 font-body placeholder:text-surface-bright focus:border-primary transition-colors focus:ring-0 focus:outline-none" placeholder="ARCHIVE@VELORAH.COM" required type="email" />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant block">Password</label>
                                <input className="w-full bg-transparent border-0 border-b border-outline-variant text-white py-3 px-0 font-body placeholder:text-surface-bright focus:border-primary transition-colors focus:ring-0 focus:outline-none" placeholder="••••••••" required type="password" />
                            </div>
                            <div className="pt-4 space-y-4">
                                <button className="w-full bg-primary text-on-primary py-5 font-label text-[0.75rem] uppercase tracking-[0.2em] font-semibold hover:bg-primary-container transition-all duration-300" type="submit">
                                    Begin Journey
                                </button>
                                <div className="relative py-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-outline-variant/20"></div>
                                    </div>
                                    <div className="relative flex justify-center text-[0.65rem] uppercase tracking-widest">
                                        <span className="bg-surface-container px-4 text-outline">or continue with</span>
                                    </div>
                                </div>
                                <button className="w-full bg-transparent border border-outline-variant/30 text-white py-4 font-label text-[0.7rem] uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-surface-container transition-colors" type="button">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
                                    </svg>
                                    <span>Sign up with Google</span>
                                </button>
                            </div>
                        </form>
                        <footer className="mt-12 text-center">
                            <p className="text-[0.65rem] text-outline uppercase tracking-widest">
                                Already have an account? <Link className="text-white border-b border-white hover:opacity-70 transition-opacity" href="/signin">Sign In</Link>
                            </p>
                        </footer>
                    </div>
                </section>
            </main>
            <footer className="bg-[#131313] w-full border-t border-[#474747]/20 flex flex-col md:flex-row justify-between items-center px-8 py-20 mt-20">
                <div className="mb-8 md:mb-0">
                    <div className="text-lg font-headline text-white mb-2">VELORAH</div>
                    <p className="font-label text-[0.75rem] text-[#919191] uppercase tracking-widest">© 2024 VELORAH. ARCHITECTURAL MINIMALISM.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <Link className="text-[#919191] hover:text-white transition-colors font-label text-[0.75rem] uppercase tracking-widest" href="/privacy">Privacy</Link>
                    <Link className="text-[#919191] hover:text-white transition-colors font-label text-[0.75rem] uppercase tracking-widest" href="/terms">Terms</Link>
                    <Link className="text-[#919191] hover:text-white transition-colors font-label text-[0.75rem] uppercase tracking-widest" href="#">Submission Guidelines</Link>
                </div>
            </footer>
        </div>
    );
}
