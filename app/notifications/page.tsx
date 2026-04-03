export default function Page() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 h-24 bg-[#0A0A0A]/70 backdrop-blur-3xl border-b border-zinc-900/40 flex justify-between items-center px-8 md:px-16">
        <div className="font-serif italic text-2xl lowercase tracking-tighter text-white">
          Velorah®
        </div>
        <div className="hidden md:flex gap-12">
          <a
            className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors duration-500 ease-out"
            href="#"
          >
            ESSAYS
          </a>
          <a
            className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors duration-500 ease-out"
            href="#"
          >
            ARCHIVE
          </a>
          <a
            className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors duration-500 ease-out"
            href="#"
          >
            ABOUT
          </a>
        </div>
        <button className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-500 ease-out">
          BEGIN JOURNEY ›
        </button>
      </nav>
      <main className="pt-40 pb-24 px-8 md:px-0 max-w-3xl mx-auto min-h-screen">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl newsreader-display font-light tracking-tight text-white mb-4">
            Notifications
          </h1>
          <p className="font-sans inter uppercase tracking-widest text-[9px] text-zinc-500">
            The pulse of your literary circle
          </p>
        </header>
        <section className="space-y-4">
          <div className="bg-[#111111] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 hover:bg-[#161616]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full overflow-hidden grayscale contrast-125">
                <img
                  className="w-full h-full object-cover"
                  data-alt="close-up portrait of an older man with glasses and artistic features in black and white dramatic lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkBIY1tVByUW6tMUZcoGXLXxioLzQ_0Zzv4Ywjz8CYewNZawdqorcoRozAdoqcLdI2eI44q3H7MndQ6tGJMIGhxKICIQvZpB5wadUB2WLHLcLMxfMTycoJv4ADMan_N_tgyVaA_nxou-CPVu5SCepglTPVitmjCFKoZbABvrvMwvzoxhIEp3RscJckEA_aN3ATnO8mq1jBRVUBhNaK3xTNkAFP3v5bDhdRyDAGvx1I7Qrsce7Aqm3m47zVfZBHGosgQgKXUo2yrsoz"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="newsreader-display text-xl italic text-white">
                    Julian Vane
                  </span>
                  <span className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-400">
                    LIKED YOUR ESSAY
                  </span>
                </div>
                <p className="newsreader-display text-zinc-500 italic text-lg">
                  "The Weight of Silent Rooms"
                </p>
              </div>
            </div>
            <div className="font-sans inter uppercase tracking-[0.2em] text-[9px] text-zinc-600 md:text-right">
              2H AGO
            </div>
          </div>
          <div className="bg-[#111111] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 hover:bg-[#161616]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full overflow-hidden grayscale contrast-125 border border-zinc-800">
                <img
                  className="w-full h-full object-cover"
                  data-alt="atmospheric black and white portrait of a woman with braided hair looking away from the camera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoHiuJuunQperkUY5IZovEj_J2g9VCppu6-KlnAvfJet37hlqvwVoPu5cTVt0kT3MrdUURkDbP-VlFy9a2MDkF0FT5Ufk_8smFAphu_LmfkQKvWhukB_ds78UcMTjhfzpkcHWUP7nNrqqP7AEiGnyq5lrjWYYUXM1T6Ol63bUMklbK1_CRKu4ToMD6t-ehTcBU6sF8JflXeb-nxt3fgGGxcDukitAqkS9JYC4xmNAgBfBzZQvj4YZU4rp2xZkYffcUMFwpzxKpkEYX"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="newsreader-display text-xl italic text-white">
                    Elena Thorne
                  </span>
                  <span className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-400">
                    COMMENTED
                  </span>
                </div>
                <p className="text-zinc-400 font-light leading-relaxed max-w-md">
                  "This perspective on solitude feels necessary in our current
                  noise..."
                </p>
              </div>
            </div>
            <div className="font-sans inter uppercase tracking-[0.2em] text-[9px] text-zinc-600 md:text-right">
              5H AGO
            </div>
          </div>
          <div className="bg-[#111111] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 hover:bg-[#161616]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                <span className="material-symbols-outlined text-zinc-400">
                  auto_stories
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="newsreader-display text-xl italic text-white">
                    Archive Update
                  </span>
                  <span className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-400">
                    NEW RELEASE
                  </span>
                </div>
                <p className="newsreader-display text-zinc-500 italic text-lg">
                  The Winter Collection: Part III
                </p>
              </div>
            </div>
            <div className="font-sans inter uppercase tracking-[0.2em] text-[9px] text-zinc-600 md:text-right">
              YESTERDAY
            </div>
          </div>
          <div className="bg-[#111111] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 hover:bg-[#161616]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full overflow-hidden grayscale contrast-125">
                <img
                  className="w-full h-full object-cover"
                  data-alt="moody black and white portrait of a young man in a turtleneck against a dark void background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhzk0sUYpWU-DeuOKJgKrwEHQphyjxMr0YMCN1goR5WScc2yeXFLA6IWN8eLL8hT8AlmmGfOAJTBxG_oj-tEGobBTD2x1TDalMWA4_M42zVFsieEFe5qXHOrceNb6Im0uV3Z7fgYGMCFWuVKc2iQZ5097mZaf6d02EZsevLANXE2xwFOnAN50JD-wMvL3ran66XvbUd0Ko3n1BHulKOEd3HL7nYSG8RblwFkpkSKLozZafl6hUojZuy8gern702QkGqUd6Jcympsrs"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="newsreader-display text-xl italic text-white">
                    Marcus Sol
                  </span>
                  <span className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-400">
                    FOLLOWED YOU
                  </span>
                </div>
                <p className="text-zinc-500 font-sans inter text-[10px] tracking-widest">
                  CURATOR AT L'ESPACE
                </p>
              </div>
            </div>
            <div className="font-sans inter uppercase tracking-[0.2em] text-[9px] text-zinc-600 md:text-right">
              2D AGO
            </div>
          </div>
          <div className="bg-[#111111] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 hover:bg-[#161616]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full overflow-hidden grayscale contrast-125">
                <img
                  className="w-full h-full object-cover"
                  data-alt="striking profile view of a woman with minimalist jewelry in sharp black and white high contrast"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeZ-Zzm_JJALY3deLX086DI98V_owdw2fvT15WD6_8aCLoXIsF4G_edrEdecqFYTruteVkzXeMugO2U233IlIMajQQdSfxs6CmkGS5em3Z-moDxlgXH8STJuqd-80xPPxbLPzeuHqzcHPdxRV4mkC1-J1qtKl0y1L0BfJ5ijjJX8_50fR6HzicJHj8ubSHgJrbhuaAWlDxImgPLv1b5Scd31a_Mxt08vkiYWqrdFGMUL5E4ZQGeTdR4siJOOOHBxKyLAA-hSTh4t-v"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="newsreader-display text-xl italic text-white">
                    Sloane Beckett
                  </span>
                  <span className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-400">
                    MENTIONED YOU
                  </span>
                </div>
                <p className="text-zinc-400 font-light leading-relaxed max-w-md">
                  "The way Velorah users approach the theme of 'Ancestry' this
                  week is..."
                </p>
              </div>
            </div>
            <div className="font-sans inter uppercase tracking-[0.2em] text-[9px] text-zinc-600 md:text-right">
              4D AGO
            </div>
          </div>
        </section>
        <div className="mt-20 flex justify-center">
          <button className="font-sans inter uppercase tracking-widest text-[10px] text-zinc-500 hover:text-white transition-colors py-4 px-12 border-t border-zinc-900 w-full">
            LOAD OLDER ARCHIVES
          </button>
        </div>
      </main>
      <footer className="w-full py-16 bg-[#0A0A0A] border-t border-zinc-900 flex flex-col items-center gap-8 px-16 w-full">
        <div className="flex gap-12 font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-500">
          <a
            className="hover:text-white transition-colors duration-500"
            href="#"
          >
            PRIVACY
          </a>
          <a
            className="hover:text-white transition-colors duration-500"
            href="#"
          >
            TERMS
          </a>
          <a
            className="hover:text-white transition-colors duration-500"
            href="#"
          >
            SUBMISSION GUIDELINES
          </a>
        </div>
        <div className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-500">
          © VELORAH. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
}
