"use client";

import Link from "next/link";
import React from "react";

export default function PublishPage() {
    return (
        <div style={{
            "--color-surface-container-highest": "#353534",
            "--color-primary-fixed": "#5d5f5f",
            "--color-on-surface": "#e5e2e1",
            "--color-outline-variant": "#474747",
            "--color-on-primary": "#1a1c1c",
            "--color-tertiary": "#e4e2e1",
            "--color-surface-variant": "#353534",
            "--color-primary": "#ffffff",
            "--color-on-secondary": "#1a1c1c",
            "--color-on-primary-fixed": "#ffffff",
            "--color-error-container": "#93000a",
            "--color-on-primary-container": "#000000",
            "--color-background": "#131313",
            "--color-secondary-container": "#464747",
            "--color-tertiary-fixed": "#5f5e5e",
            "--color-surface-dim": "#131313",
            "--color-secondary": "#c7c6c6",
            "--color-surface-container-low": "#1c1b1b",
            "--color-surface-bright": "#393939",
            "--color-secondary-fixed-dim": "#ababab",
            "--color-secondary-fixed": "#c7c6c6",
            "--color-on-secondary-container": "#e3e2e2",
            "--color-tertiary-container": "#929090",
            "--color-inverse-surface": "#e5e2e1",
            "--color-on-primary-fixed-variant": "#e2e2e2",
            "--color-on-tertiary": "#1b1c1c",
            "--color-primary-container": "#d4d4d4",
            "--color-on-secondary-fixed-variant": "#3a3b3c",
            "--color-on-error-container": "#ffdad6",
            "--color-surface-tint": "#c6c6c7",
            "--color-on-secondary-fixed": "#1a1c1c",
            "--color-on-tertiary-fixed": "#ffffff",
            "--color-inverse-on-surface": "#313030",
            "--color-on-tertiary-fixed-variant": "#e4e2e1",
            "--color-tertiary-fixed-dim": "#474747",
            "--color-on-surface-variant": "#c6c6c6",
            "--color-on-error": "#690005",
            "--color-primary-fixed-dim": "#454747",
            "--color-surface-container": "#201f1f",
            "--color-surface": "#131313",
            "--color-on-background": "#e5e2e1",
            "--color-surface-container-lowest": "#0e0e0e",
            "--color-surface-container-high": "#2a2a2a",
            "--color-on-tertiary-container": "#000000",
            "--color-error": "#ffb4ab",
            "--color-outline": "#919191",
            "--color-inverse-primary": "#5d5f5f",
        } as React.CSSProperties} className="font-body selection:bg-primary selection:text-on-primary bg-[#131313] text-[#e5e2e1] min-h-screen">
            <style jsx global>{`
                ::-webkit-scrollbar {
                    width: 4px;
                }
                ::-webkit-scrollbar-track {
                    background: #0E0E0E;
                }
                ::-webkit-scrollbar-thumb {
                    background: #393939;
                }
            `}</style>
            
            {/* TopNavBar */}
            <nav className="bg-[#131313]/60 backdrop-blur-md text-slate-50 fixed top-0 w-full rounded-none border-b border-white/5 z-50 flex justify-between items-center px-16 py-8">
                <div className="text-2xl font-serif font-light tracking-widest text-slate-50 uppercase">Velorah</div>
                <div className="hidden md:flex gap-12 items-center">
                    <Link className="text-slate-400 font-sans uppercase tracking-[0.2em] text-[10px] hover:text-white transition-all duration-500 ease-in-out" href="#">Essays</Link>
                    <Link className="text-slate-400 font-sans uppercase tracking-[0.2em] text-[10px] hover:text-white transition-all duration-500 ease-in-out" href="#">Collections</Link>
                    <Link className="text-slate-400 font-sans uppercase tracking-[0.2em] text-[10px] hover:text-white transition-all duration-500 ease-in-out" href="#">Philosophy</Link>
                </div>
                <button className="bg-primary text-on-primary px-8 py-3 font-sans uppercase tracking-[0.2em] text-[10px] hover:bg-primary-container transition-all duration-300 active:scale-95 duration-200">
                    Begin Journey
                </button>
            </nav>

            {/* Main Composition Layout */}
            <main className="pt-32 min-h-screen flex flex-col md:flex-row">
                {/* Left Panel: Main Editor */}
                <section className="flex-1 px-8 md:px-24 pb-24 border-r border-white/5">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Cover Image Preview Area */}
                        <div className="relative group aspect-[21/9] w-full bg-surface-container-lowest overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" data-alt="abstract minimalist architectural detail in monochrome with deep shadows and sharp geometric lines in a moody setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBddOnSo_vSaR8dkwX7d-kgozIQz_IwwHelgSk_PYQjhY8KVuaSzwrkRkmS93Z1zyzIo9Ka0Y6XtgY068I4Vi4kU5gm2PWU9d-JKlVT7WxSvpDJVEAXNKcq86bQqmijymPzDceXf_fl5zOq-upfWVOUfmtsLaiasVHXsYV5Le1lnYVR02vXpDqxYVbZW7jP7XKzyOa3wcJ7mtPveAyEao66ijNpOAu92vJsjFk7y9AdI9Ni618ZFvhQ-En7_181cp11Y1Zb8oFpPe_3" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full max-w-md px-6">
                                    <label className="block text-[10px] tracking-[0.3em] uppercase text-on-surface-variant mb-2">Cover Image URL</label>
                                    <input className="w-full glass-input py-3 px-4 text-sm font-light tracking-wider placeholder:text-outline/40 focus:ring-0 focus:outline-none" placeholder="https://..." type="text" />
                                </div>
                            </div>
                        </div>

                        {/* Title Section */}
                        <div className="space-y-4">
                            <label className="block text-[10px] tracking-[0.4em] uppercase text-outline">Narrative Title</label>
                            <textarea 
                                className="w-full bg-transparent border-none focus:ring-0 text-5xl md:text-7xl font-serif tracking-tighter placeholder:text-surface-container-highest resize-none leading-tight py-4 overflow-hidden focus:outline-none" 
                                onChange={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }} 
                                placeholder="The Weight of Silence" 
                                rows={1} 
                            />
                        </div>

                        {/* Excerpt Section */}
                        <div className="space-y-4">
                            <label className="block text-[10px] tracking-[0.4em] uppercase text-outline">Optional Prelude</label>
                            <textarea className="w-full glass-input p-6 text-xl font-light italic leading-relaxed placeholder:text-outline/30 resize-none focus:outline-none focus:ring-0" placeholder="A brief reflection on the architecture of thought and the spaces we inhabit between breaths..." rows={2}></textarea>
                        </div>

                        {/* Main Content Area */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-8 border-b border-white/5 pb-4">
                                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-white transition-colors" data-icon="format_bold">format_bold</span>
                                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-white transition-colors" data-icon="format_italic">format_italic</span>
                                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-white transition-colors" data-icon="format_quote">format_quote</span>
                                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-white transition-colors" data-icon="link">link</span>
                                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-white transition-colors" data-icon="image">image</span>
                            </div>
                            <textarea className="w-full bg-transparent border-none focus:ring-0 text-lg leading-relaxed font-light tracking-wide placeholder:text-surface-container-highest resize-none focus:outline-none" placeholder="Begin the archive..." rows={20}></textarea>
                        </div>
                    </div>
                </section>

                {/* Right Panel: Sidebar Settings */}
                <aside className="w-full md:w-[400px] sidebar-blur p-8 md:p-12 space-y-12 h-fit md:sticky md:top-32">
                    <div className="space-y-8">
                        <h3 className="text-[11px] tracking-[0.5em] uppercase text-white font-semibold">Manuscript Details</h3>

                        {/* Category Select */}
                        <div className="space-y-3">
                            <label className="block text-[10px] tracking-[0.3em] uppercase text-outline">Category</label>
                            <div className="relative">
                                <select className="w-full glass-input appearance-none py-4 px-4 text-xs tracking-widest uppercase cursor-pointer pr-10 focus:outline-none focus:ring-0">
                                    <option>Technology</option>
                                    <option>Design</option>
                                    <option>Business</option>
                                    <option>Writing</option>
                                    <option>Productivity</option>
                                    <option>Lifestyle</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-sm" data-icon="expand_more">expand_more</span>
                            </div>
                        </div>

                        {/* Tags Input */}
                        <div className="space-y-3">
                            <label className="block text-[10px] tracking-[0.3em] uppercase text-outline">Tags</label>
                            <input className="w-full glass-input py-4 px-4 text-xs tracking-widest placeholder:text-outline/40 focus:outline-none focus:ring-0" placeholder="Obsidian, Architecture, Silence..." type="text" />
                            <p className="text-[9px] text-outline-variant tracking-wider">Comma separated identifiers</p>
                        </div>

                        {/* Toggle Section */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="space-y-1">
                                    <span className="block text-[10px] tracking-[0.3em] uppercase text-on-surface">Publish immediately</span>
                                    <span className="block text-[9px] text-outline tracking-wider">Visible to all archivists upon saving</span>
                                </div>
                                <div className="w-12 h-6 bg-surface-container-highest relative">
                                    <div className="absolute right-1 top-1 bottom-1 w-4 bg-primary"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="space-y-1">
                                    <span className="block text-[10px] tracking-[0.3em] uppercase text-on-surface">Save as draft</span>
                                    <span className="block text-[9px] text-outline tracking-wider">Keep this manuscript private</span>
                                </div>
                                <div className="w-12 h-6 bg-surface-container-lowest border border-white/10 relative">
                                    <div className="absolute left-1 top-1 bottom-1 w-4 bg-outline-variant"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Primary Action */}
                    <div className="pt-12 space-y-4">
                        <button className="w-full bg-primary text-on-primary py-6 px-4 flex items-center justify-center gap-4 group overflow-hidden relative">
                            <span className="text-[11px] font-sans uppercase tracking-[0.4em] relative z-10">Begin Journey</span>
                            <span className="material-symbols-outlined relative z-10 group-hover:translate-x-2 transition-transform duration-500" data-icon="arrow_right_alt">arrow_right_alt</span>
                        </button>
                        <button className="w-full border border-white/10 text-white/40 hover:text-white hover:border-white/40 py-5 text-[10px] uppercase tracking-[0.4em] transition-all duration-500">
                            Cancel Entry
                        </button>
                    </div>

                    {/* Meta Info */}
                    <div className="pt-12 border-t border-white/5 space-y-4">
                        <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase text-outline">
                            <span>Last Saved</span>
                            <span className="text-white">Just now</span>
                        </div>
                        <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase text-outline">
                            <span>Reading Time</span>
                            <span className="text-white">0 min</span>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="bg-[#0E0E0E] w-full py-24 px-16 flex flex-col md:flex-row justify-between items-center border-t border-white/5">
                <div className="text-xl font-serif italic text-white mb-8 md:mb-0">Velorah</div>
                <div className="flex flex-wrap justify-center gap-12 mb-8 md:mb-0">
                    <Link className="text-slate-500 font-sans text-[10px] tracking-[0.3em] uppercase hover:text-white transition-opacity duration-300" href="/privacy">Privacy Policy</Link>
                    <Link className="text-slate-500 font-sans text-[10px] tracking-[0.3em] uppercase hover:text-white transition-opacity duration-300" href="/terms">Terms of Service</Link>
                    <Link className="text-slate-500 font-sans text-[10px] tracking-[0.3em] uppercase hover:text-white transition-opacity duration-300" href="/archive">Archive</Link>
                    <Link className="text-slate-500 font-sans text-[10px] tracking-[0.3em] uppercase hover:text-white transition-opacity duration-300" href="#">Contact</Link>
                </div>
                <div className="text-slate-400 font-sans text-[10px] tracking-[0.3em] uppercase">© 2024 VELORAH OBSIDIAN ARCHIVE.</div>
            </footer>
        </div>
    );
}
