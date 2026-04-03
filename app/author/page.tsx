export default function Page() {
  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 h-24 bg-[#0A0A0A]/70 backdrop-blur-3xl border-b border-outline-variant/10 flex justify-between items-center px-16">
        <div className="font-serif italic text-2xl lowercase tracking-tighter text-on-surface">
          Velorah®
        </div>
        <div className="hidden md:flex items-center gap-12">
          <a
            className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface transition-colors duration-500 ease-out"
            href="#"
          >
            ESSAYS
          </a>
          <a
            className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface transition-colors duration-500 ease-out"
            href="#"
          >
            ARCHIVE
          </a>
          <a
            className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-on-surface transition-colors duration-500 ease-out"
            href="#"
          >
            ABOUT
          </a>
        </div>
        <div className="flex items-center gap-8">
          <button className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface hover:text-on-surface-variant transition-colors duration-500 ease-out">
            BEGIN JOURNEY ›
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1600px] mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-headline tracking-tight text-on-surface mb-4 italic">
            Author Dashboard
          </h1>
          <p className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Managing the digital monolith
          </p>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Total Essays
            </span>
            <span className="text-5xl font-headline text-on-surface">42</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Monthly Readers
            </span>
            <span className="text-5xl font-headline text-on-surface">12.8k</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Global Ranking
            </span>
            <span className="text-5xl font-headline text-on-surface">#04</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 flex flex-col justify-between h-48">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
              Engagement
            </span>
            <span className="text-5xl font-headline text-on-surface">88%</span>
          </div>
        </section>

        {/* Article Management Table */}
        <section className="bg-black border border-outline-variant/10 overflow-hidden">
          <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
            <h2 className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface">
              Recent Submissions
            </h2>
            <button className="font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant hover:text-on-surface transition-colors">
              VIEW FULL ARCHIVE ›
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-[#0A0A0A]">
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium">
                    Article Title
                  </th>
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">
                    Status
                  </th>
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-center">
                    Date
                  </th>
                  <th className="p-8 font-label uppercase tracking-[0.2em] text-[9px] text-on-surface-variant font-medium text-right">
                    Engagement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <img
                        alt="Article Image"
                        className="w-16 h-20 object-cover grayscale brightness-75"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAagS43DuxAq9ULMmCa80rQgCUnRFTAE7XtU7JA7RcLtiicg5wH9hUFlkXA1yF6kJnHoPki-F3cLUzUalcdUXUbA0jhpnZ9bj3x81ik0irZoHafohdm4fjr2oT0cv5E7eIueaA6qajgfAOCBx91F_TF9-P60EaIo00GaQYsUeRvCSDfSu-hQOCXM6wIgHmEBI7FeQRRhhHen9KtatXgb16vTv0zoTThUd_AScCYxN8GDyalHFgcNASmJMjISC8JLU6gXimdQEZbGeHZ"
                      />
                      <span className="text-2xl font-headline text-on-surface leading-tight">
                        The Silence of Modern Monoliths
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <span className="px-3 py-1 border border-outline-variant/30 text-on-surface-variant font-label uppercase tracking-[0.15em] text-[8px]">
                      Published
                    </span>
                  </td>
                  <td className="p-8 text-center font-label uppercase tracking-[0.1em] text-[10px] text-on-surface-variant">
                    Oct 12, 2023
                  </td>
                  <td className="p-8 text-right font-label uppercase tracking-[0.1em] text-[11px] text-on-surface">
                    4.2k
                  </td>
                </tr>
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <img
                        alt="Article Image"
                        className="w-16 h-20 object-cover grayscale brightness-75"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfqZL_vIWkSEe0CpAP0FCsZhhtXeX5nEX2v-QBWG2yhNcDK9PX4QObUwTWYavr9PmRWiZ66pIHuV6SrGOEY6hiHllWYWh_LK5FetyQtCh2cEQY81l_0q4xfJsVL_WLGxAz43UNPhneGaqgBMCgaaF8YYolgdL2_nmNOLCcFIsGcQCzPiWmlsUhACdGRIvxfv0-N_UOlhbwJxoHUDrYxvHEGxHu1pyBOI6EoC7AxPvGxXJrUMTsyEb7CDRV0CdhBpiazvKo9fWxfl7V"
                      />
                      <span className="text-2xl font-headline text-on-surface leading-tight">
                        Archetypes of the Digital Age
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <span className="px-3 py-1 border border-outline-variant/30 text-on-surface-variant font-label uppercase tracking-[0.15em] text-[8px]">
                      In Review
                    </span>
                  </td>
                  <td className="p-8 text-center font-label uppercase tracking-[0.1em] text-[10px] text-on-surface-variant">
                    Oct 08, 2023
                  </td>
                  <td className="p-8 text-right font-label uppercase tracking-[0.1em] text-[11px] text-on-surface">
                    —
                  </td>
                </tr>
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <img
                        alt="Article Image"
                        className="w-16 h-20 object-cover grayscale brightness-75"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrd_3tnhAWLkR8Gc2PIkS9ANcZzKupd8Cd2CgiWnnAwiw2Y4mEf8zv3smr0lGRM4w8Q8ANInOnt0Dro7pnVjv9AtAhA3FsKDqwItbV9kdlA7k1YIZeSrQS4T4jb8yeTPcUUPZMtpcyvP0J5G3DbrLk6t1nRhSBCkMK-otpjzUx1pb-IbJE5V2-AN_p34Z56RfDG9HxNZwCw7bIfSr3t_VWr1-uwam4qQc5LVJbaQuGbrDWzOqU0JqvpBzty9p5rPQt6I6U7Mna_2Xg"
                      />
                      <span className="text-2xl font-headline text-on-surface leading-tight">
                        Solitude as a Creative Necessity
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <span className="px-3 py-1 border border-outline-variant/30 text-on-surface-variant font-label uppercase tracking-[0.15em] text-[8px]">
                      Published
                    </span>
                  </td>
                  <td className="p-8 text-center font-label uppercase tracking-[0.1em] text-[10px] text-on-surface-variant">
                    Sep 24, 2023
                  </td>
                  <td className="p-8 text-right font-label uppercase tracking-[0.1em] text-[11px] text-on-surface">
                    8.9k
                  </td>
                </tr>
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <img
                        alt="Article Image"
                        className="w-16 h-20 object-cover grayscale brightness-75"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCF5M7wcqDsGaZE_A1XqNY6qYenB5UAu3px8SZb95zk6ZgjMsb3uFZ8W5j30UeG9tgen5Srg2lDvWbKRzstjlxU8lDeNsa4m6c2qmbGTbdnHa6buIXNuBPX6RWzmls4WiS-ippRwfv7jJ2EmzEqFFTUZipXdrSG8y7-YnRB_sG-AfqJ_NaODAukNK12B-eARbNSVRuwnk7UPmI6B8wE46Wg_dnDmfGyJwmbtpJhTpFK2rATYXoWGl1FNV1XL26bagY5_f139hLAQW9"
                      />
                      <span className="text-2xl font-headline text-on-surface leading-tight">
                        The Weight of Unspoken Words
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <span className="px-3 py-1 border border-outline-variant/30 text-on-surface-variant font-label uppercase tracking-[0.15em] text-[8px]">
                      Draft
                    </span>
                  </td>
                  <td className="p-8 text-center font-label uppercase tracking-[0.1em] text-[10px] text-on-surface-variant">
                    Sep 20, 2023
                  </td>
                  <td className="p-8 text-right font-label uppercase tracking-[0.1em] text-[11px] text-on-surface">
                    0.1k
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Secondary Actions */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-outline-variant/10 p-12 flex items-center justify-between group cursor-pointer hover:bg-on-surface transition-all duration-700">
            <div className="flex flex-col gap-2">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant group-hover:text-surface transition-colors">
                Creative Hub
              </span>
              <h3 className="text-3xl font-headline text-on-surface group-hover:text-surface transition-colors italic">
                Draft New Essay
              </h3>
            </div>
            <span
              className="material-symbols-outlined text-on-surface-variant group-hover:text-surface transition-colors"
              style={{ fontSize: "32px" }}
            >
              edit_note
            </span>
          </div>
          <div className="border border-outline-variant/10 p-12 flex items-center justify-between group cursor-pointer hover:bg-on-surface transition-all duration-700">
            <div className="flex flex-col gap-2">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-on-surface-variant group-hover:text-surface transition-colors">
                Resources
              </span>
              <h3 className="text-3xl font-headline text-on-surface group-hover:text-surface transition-colors italic">
                Author Style Guide
              </h3>
            </div>
            <span
              className="material-symbols-outlined text-on-surface-variant group-hover:text-surface transition-colors"
              style={{ fontSize: "32px" }}
            >
              menu_book
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#0A0A0A] border-t border-outline-variant/10 flex flex-col items-center gap-8 px-16">
        <div className="flex gap-12">
          <a
            className="font-label uppercase tracking-[0.15em] text-[9px] text-on-surface-variant hover:text-on-surface transition-colors duration-500"
            href="#"
          >
            PRIVACY
          </a>
          <a
            className="font-label uppercase tracking-[0.15em] text-[9px] text-on-surface-variant hover:text-on-surface transition-colors duration-500"
            href="#"
          >
            TERMS
          </a>
          <a
            className="font-label uppercase tracking-[0.15em] text-[9px] text-on-surface-variant hover:text-on-surface transition-colors duration-500"
            href="#"
          >
            SUBMISSION GUIDELINES
          </a>
        </div>
        <div className="font-label uppercase tracking-[0.15em] text-[9px] text-on-surface-variant opacity-60">
          © VELORAH. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
}
