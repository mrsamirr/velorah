export default function Page() {
  return (
    <>
      {/* Sidebar Navigation */}
      <aside className="sidebar-bg w-64 fixed inset-y-0 left-0 hidden md:flex flex-col border-r border-zinc-900/50 z-30">
        <div className="h-24 flex items-center px-8">
          <span className="font-serif italic text-2xl lowercase tracking-tighter text-white">
            velorah®
          </span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a
            className="flex items-center gap-4 px-4 py-3 text-white bg-surface-container-high rounded-sm transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              dashboard
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em]">
              Dashboard
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-zinc-200 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              article
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em]">
              Essays
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-zinc-200 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              person
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em]">
              Contributors
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-zinc-200 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              auto_stories
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em]">
              Archive
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-zinc-200 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em]">
              Preferences
            </span>
          </a>
        </nav>
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-zinc-400 text-sm">
                admin_panel_settings
              </span>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-zinc-200">
                A. Valerius
              </p>
              <p className="font-label text-[8px] uppercase tracking-widest text-zinc-500">
                Editor-in-Chief
              </p>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content Shell */}
      <main className="flex-1 md:ml-64 bg-[#0A0A0A]">
        {/* Top Navigation */}
        <header className="h-24 fixed top-0 right-0 left-0 md:left-64 flex justify-between items-center px-10 z-50 bg-[#0A0A0A]/70 backdrop-blur-3xl border-b border-zinc-900/40">
          <div className="flex flex-col">
            <h1 className="font-serif italic text-xl text-white lowercase tracking-tighter">
              administrative portal
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <button className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors duration-500">
              Search
            </button>
            <button className="bg-primary text-on-primary font-label text-[10px] uppercase tracking-[0.2em] px-6 py-2 rounded-full transition-all duration-300 hover:bg-zinc-200">
              BEGIN JOURNEY ›
            </button>
          </div>
        </header>
        {/* Page Content */}
        <div className="pt-32 px-10 pb-20 max-w-7xl mx-auto">
          {/* Dashboard Stats */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-surface-container-low p-8 rounded-sm border border-zinc-900/50">
              <p className="font-label text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Total Readership
              </p>
              <h2 className="font-serif text-3xl text-white">2.4M</h2>
            </div>
            <div className="bg-surface-container-low p-8 rounded-sm border border-zinc-900/50">
              <p className="font-label text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Active Essays
              </p>
              <h2 className="font-serif text-3xl text-white">184</h2>
            </div>
            <div className="bg-surface-container-low p-8 rounded-sm border border-zinc-900/50">
              <p className="font-label text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Global Reach
              </p>
              <h2 className="font-serif text-3xl text-white">42</h2>
            </div>
            <div className="bg-surface-container-low p-8 rounded-sm border border-zinc-900/50">
              <p className="font-label text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Pending Reviews
              </p>
              <h2 className="font-serif text-3xl text-white">12</h2>
            </div>
          </section>
          {/* Main Data Table Section */}
          <section className="bg-surface-container-low rounded-sm border border-zinc-900/50 overflow-hidden">
            <div className="p-8 border-b border-zinc-900 flex justify-between items-end">
              <div>
                <h3 className="font-serif text-2xl text-white italic lowercase tracking-tight">
                  recent publications
                </h3>
                <p className="font-label text-[10px] uppercase tracking-[0.15em] text-zinc-500 mt-2">
                  Managing the latest literary contributions
                </p>
              </div>
              <div className="flex gap-4">
                <button className="font-label text-[9px] uppercase tracking-[0.2em] px-4 py-2 text-zinc-400 border border-zinc-800 hover:border-zinc-600 transition-colors">
                  Export CSV
                </button>
                <button className="font-label text-[9px] uppercase tracking-[0.2em] px-4 py-2 text-white bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  Filter Results
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900">
                    <th className="px-8 py-6 font-label text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      Post Title
                    </th>
                    <th className="px-8 py-6 font-label text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      Author
                    </th>
                    <th className="px-8 py-6 font-label text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      Category
                    </th>
                    <th className="px-8 py-6 font-label text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      Status
                    </th>
                    <th className="px-8 py-6 font-label text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      Published
                    </th>
                    <th className="px-8 py-6 font-label text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  <tr className="table-row-hover transition-colors duration-300">
                    <td className="px-8 py-6 font-serif text-lg text-white">
                      The Architecture of Silence
                    </td>
                    <td className="px-8 py-6 font-serif italic text-zinc-400 text-base">
                      Elena Thorne
                    </td>
                    <td className="px-8 py-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">
                      Philosophy
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 border border-zinc-800 rounded-full font-label text-[8px] uppercase tracking-widest text-zinc-400">
                        Published
                      </span>
                    </td>
                    <td className="px-8 py-6 font-label text-[9px] text-zinc-500">
                      OCT 12, 2023
                    </td>
                    <td className="px-8 py-6">
                      <button className="material-symbols-outlined text-zinc-500 hover:text-white transition-colors">
                        more_horiz
                      </button>
                    </td>
                  </tr>
                  <tr className="table-row-hover transition-colors duration-300">
                    <td className="px-8 py-6 font-serif text-lg text-white">
                      Midnight at the Gallery
                    </td>
                    <td className="px-8 py-6 font-serif italic text-zinc-400 text-base">
                      Marcus Aurel
                    </td>
                    <td className="px-8 py-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">
                      Fine Art
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 border border-zinc-800 rounded-full font-label text-[8px] uppercase tracking-widest text-zinc-400">
                        Published
                      </span>
                    </td>
                    <td className="px-8 py-6 font-label text-[9px] text-zinc-500">
                      OCT 10, 2023
                    </td>
                    <td className="px-8 py-6">
                      <button className="material-symbols-outlined text-zinc-500 hover:text-white transition-colors">
                        more_horiz
                      </button>
                    </td>
                  </tr>
                  <tr className="table-row-hover transition-colors duration-300">
                    <td className="px-8 py-6 font-serif text-lg text-white">
                      Reflections on Grain &amp; Texture
                    </td>
                    <td className="px-8 py-6 font-serif italic text-zinc-400 text-base">
                      Julian Vane
                    </td>
                    <td className="px-8 py-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">
                      Cinematography
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 border border-zinc-800 bg-zinc-800/30 rounded-full font-label text-[8px] uppercase tracking-widest text-zinc-200">
                        Review
                      </span>
                    </td>
                    <td className="px-8 py-6 font-label text-[9px] text-zinc-500">
                      PENDING
                    </td>
                    <td className="px-8 py-6">
                      <button className="material-symbols-outlined text-zinc-500 hover:text-white transition-colors">
                        more_horiz
                      </button>
                    </td>
                  </tr>
                  <tr className="table-row-hover transition-colors duration-300">
                    <td className="px-8 py-6 font-serif text-lg text-white">
                      The Last Existentialist
                    </td>
                    <td className="px-8 py-6 font-serif italic text-zinc-400 text-base">
                      Sophia Reed
                    </td>
                    <td className="px-8 py-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">
                      Literature
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 border border-zinc-800 rounded-full font-label text-[8px] uppercase tracking-widest text-zinc-400">
                        Published
                      </span>
                    </td>
                    <td className="px-8 py-6 font-label text-[9px] text-zinc-500">
                      SEP 28, 2023
                    </td>
                    <td className="px-8 py-6">
                      <button className="material-symbols-outlined text-zinc-500 hover:text-white transition-colors">
                        more_horiz
                      </button>
                    </td>
                  </tr>
                  <tr className="table-row-hover transition-colors duration-300">
                    <td className="px-8 py-6 font-serif text-lg text-white">
                      Monolithic Structures in Digital Age
                    </td>
                    <td className="px-8 py-6 font-serif italic text-zinc-400 text-base">
                      Leon Wu
                    </td>
                    <td className="px-8 py-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">
                      Design
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 border border-zinc-800 bg-zinc-800/10 rounded-full font-label text-[8px] uppercase tracking-widest text-zinc-500">
                        Draft
                      </span>
                    </td>
                    <td className="px-8 py-6 font-label text-[9px] text-zinc-500">
                      --
                    </td>
                    <td className="px-8 py-6">
                      <button className="material-symbols-outlined text-zinc-500 hover:text-white transition-colors">
                        more_horiz
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-8 py-6 border-t border-zinc-900 flex justify-between items-center">
              <p className="font-label text-[8px] uppercase tracking-[0.2em] text-zinc-600">
                Showing 1-5 of 184 entries
              </p>
              <div className="flex gap-4">
                <button className="font-label text-[9px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                  Previous
                </button>
                <button className="font-label text-[9px] uppercase tracking-widest text-white">
                  Next
                </button>
              </div>
            </div>
          </section>
          {/* Featured Content Management */}
          <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="font-serif text-xl text-white italic lowercase tracking-tight">
                contributor activity
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-surface-container-high/50 rounded-sm">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-serif italic text-xl text-zinc-500">
                    E
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-white">
                      Elena Thorne{" "}
                      <span className="font-label text-[8px] uppercase tracking-widest text-zinc-500 ml-2">
                        — 2 hours ago
                      </span>
                    </p>
                    <p className="font-label text-[9px] text-zinc-400 mt-1 uppercase tracking-[0.05em]">
                      Uploaded "The Minimalist Soul" (4,200 words)
                    </p>
                  </div>
                  <button className="font-label text-[8px] border border-zinc-800 px-3 py-1 uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Review
                  </button>
                </div>
                <div className="flex items-center gap-6 p-4 bg-surface-container-high/50 rounded-sm">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-serif italic text-xl text-zinc-500">
                    M
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-white">
                      Marcus Aurel{" "}
                      <span className="font-label text-[8px] uppercase tracking-widest text-zinc-500 ml-2">
                        — 5 hours ago
                      </span>
                    </p>
                    <p className="font-label text-[9px] text-zinc-400 mt-1 uppercase tracking-[0.05em]">
                      Updated gallery assets for "Urban Decay" series
                    </p>
                  </div>
                  <button className="font-label text-[8px] border border-zinc-800 px-3 py-1 uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Review
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low p-10 flex flex-col justify-center items-center border border-zinc-900 relative overflow-hidden group">
              <div className="absolute inset-0 z-0 opacity-20 transition-opacity group-hover:opacity-40">
                <img
                  className="w-full h-full object-cover grayscale"
                  data-alt="Dark dramatic architectural interior with strong shadows and geometric light patterns in black and white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7lyDb3ggA961AuaQJVqUalKMxhOn18A-xyeGo4qzlUkUMEuvWHOJaAGexX3qixLV4thm1-wyDoN0oUDvCuB5kcoxxtbkKyrtxu1sjYl_y00PVGFw5zyBRMNmFxZ5gNhZkuViCW5DPkCh2Tob1FM1dOJFshtYaCrvFiZT9lNvBIEOamlqtyhrG9aGvQFBilcPoYUMFxuc7p9114GBwxXFfewMBNw6WCkhbE4xd_JpYbG5KvpgloOQLZCld93bkowV8epDCr8PUVMOn"
                />
              </div>
              <div className="relative z-10 text-center">
                <p className="font-label text-[10px] uppercase tracking-widest text-zinc-400 mb-4">
                  The Monolith Experience
                </p>
                <h2 className="font-serif text-4xl text-white italic lowercase tracking-tight mb-8">
                  redefining editorial utility.
                </h2>
                <button className="bg-white text-black font-label text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-full transition-all duration-500 hover:tracking-[0.4em]">
                  Enter Cinematic Mode
                </button>
              </div>
            </div>
          </section>
        </div>
        {/* Footer Shell */}
        <footer className="w-full py-16 bg-[#0A0A0A] border-t border-zinc-900 flex flex-col items-center gap-8 px-16">
          <div className="flex gap-12">
            <a
              className="font-label text-[9px] uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition-colors duration-500"
              href="#"
            >
              PRIVACY
            </a>
            <a
              className="font-label text-[9px] uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition-colors duration-500"
              href="#"
            >
              TERMS
            </a>
            <a
              className="font-label text-[9px] uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition-colors duration-500"
              href="#"
            >
              SUBMISSION GUIDELINES
            </a>
          </div>
          <p className="font-label text-[9px] uppercase tracking-[0.15em] text-zinc-500">
            © VELORAH. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </>
  );
}
