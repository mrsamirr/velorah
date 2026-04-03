export default function Page() {
  return (
    <>
      {/* TopNavBar from JSON */}
      <nav className="fixed top-0 w-full z-50 h-24 bg-[#0A0A0A]/70 backdrop-blur-3xl border-b border-zinc-900/40 flex justify-between items-center px-16">
        <div className="font-serif italic text-2xl lowercase tracking-tighter text-white">Velorah®</div>
        <div className="hidden md:flex items-center gap-12">
          <a className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors duration-500 ease-out" href="#">ESSAYS</a>
          <a className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors duration-500 ease-out" href="#">ARCHIVE</a>
          <a className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors duration-500 ease-out" href="#">ABOUT</a>
        </div>
        <div className="flex items-center gap-8">
          <button className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-white font-semibold hover:text-zinc-300 transition-colors duration-500 ease-out">BEGIN JOURNEY ›</button>
        </div>
      </nav>
      <main className="pt-40 pb-32 px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-12">
          <div className="space-y-6">
            <h3 className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500">Navigation</h3>
            <nav className="flex flex-col gap-6">
              <a className="newsreader-display text-2xl italic text-white flex items-center gap-4 group" href="#">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                Profile Settings
              </a>
              <a className="newsreader-display text-2xl text-zinc-600 hover:text-white transition-colors duration-500" href="#">Security</a>
              <a className="newsreader-display text-2xl text-zinc-600 hover:text-white transition-colors duration-500" href="#">Preferences</a>
              <a className="newsreader-display text-2xl text-zinc-600 hover:text-white transition-colors duration-500" href="#">Billing</a>
            </nav>
          </div>
          {/* Decorative Image */}
          <div className="hidden md:block overflow-hidden h-96 w-full bg-surface-container grayscale">
            <img className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-1000" data-alt="dramatic black and white high-contrast close-up of a vintage analog camera lens with dust particles and deep shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr_UTwmoVa1TF188U_JDe6WNgjQc-bX4Ja-z2Rz2unEfRfL23UOaOE6ZN-ilUiwI3fDofWWWzUvtJFg5Nk-luvDNj6P9V1CYSWP0vsQkbpfTaZgMnelwwVqRR0zumGrdXUVQkXE1vfQ9rNZxH31zNPmT7-4Jxv_N0W_30npTG8vZwkx0mQtwcd3_AUSySpB9Nozkx2WQHi3HZtrZzfyqber3w25xyLTVBHNxCSP-WYixb83ulRRSyNRxzeIdOI39aLYqC-7Pz1v3mO"/>
          </div>
        </aside>
        {/* Settings Forms */}
        <section className="flex-1 space-y-24">
          {/* Section 1: Account Identity */}
          <div className="space-y-12">
            <header className="border-b border-zinc-900 pb-6">
              <h2 className="newsreader-display text-5xl font-light tracking-tight text-white italic">Account Identity</h2>
              <p className="mt-4 font-sans inter uppercase tracking-[0.15em] text-[11px] text-zinc-500">Define the core presence of your digital existence.</p>
            </header>
            <div className="bg-[#111111] p-10 md:p-16 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {/* Input Field */}
                <div className="space-y-2">
                  <label className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-400 block">Given Name</label>
                  <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant px-0 py-3 text-white focus:ring-0 focus:border-white transition-colors duration-500 outline-none inter font-light tracking-wide placeholder-zinc-700" type="text" value="Julian"/>
                </div>
                {/* Input Field */}
                <div className="space-y-2">
                  <label className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-400 block">Surname</label>
                  <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant px-0 py-3 text-white focus:ring-0 focus:border-white transition-colors duration-500 outline-none inter font-light tracking-wide placeholder-zinc-700" type="text" value="Vance"/>
                </div>
                {/* Full Width Input */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-400 block">Email Address</label>
                  <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant px-0 py-3 text-white focus:ring-0 focus:border-white transition-colors duration-500 outline-none inter font-light tracking-wide placeholder-zinc-700" type="email" value="julian.vance@velorah.arch"/>
                </div>
                {/* Bio Area */}
                <div className="space-y-2 md:col-span-2">
                  <label className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-400 block">Public Manifesto</label>
                  <textarea className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant px-0 py-3 text-white focus:ring-0 focus:border-white transition-colors duration-500 outline-none newsreader-display text-xl leading-relaxed placeholder-zinc-700" placeholder="Articulating the void..." rows={4}></textarea>
                </div>
              </div>
              <div className="flex justify-end pt-8">
                <button className="px-10 py-3 rounded-full border border-white text-white font-sans inter uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-500">Update Identity</button>
              </div>
            </div>
          </div>
          {/* Section 2: Security Parameters */}
          <div className="space-y-12">
            <header className="border-b border-zinc-900 pb-6">
              <h2 className="newsreader-display text-5xl font-light tracking-tight text-white italic">Security Parameters</h2>
              <p className="mt-4 font-sans inter uppercase tracking-[0.15em] text-[11px] text-zinc-500">Access protocols and cryptographic safeguards.</p>
            </header>
            <div className="bg-[#111111] p-10 md:p-16 space-y-12">
              <div className="space-y-10">
                <div className="flex items-center justify-between border-b border-zinc-900/50 pb-8">
                  <div>
                    <h4 className="newsreader-display text-2xl text-white">Two-Factor Authentication</h4>
                    <p className="font-sans inter text-xs text-zinc-500 mt-1">An additional layer of cryptographic verification.</p>
                  </div>
                  <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer group">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-500 rounded-full transition-all duration-300 group-hover:bg-white"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-400 block">Current Passcode</label>
                  <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant px-0 py-3 text-white focus:ring-0 focus:border-white transition-colors duration-500 outline-none inter font-light tracking-wide" type="password" value="********"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  <div className="space-y-2">
                    <label className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-400 block">New Passcode</label>
                    <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant px-0 py-3 text-white focus:ring-0 focus:border-white transition-colors duration-500 outline-none inter font-light tracking-wide placeholder-zinc-800" placeholder="Minimum 12 characters" type="password"/>
                  </div>
                  <div className="space-y-2">
                    <label className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-400 block">Confirm Passcode</label>
                    <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant px-0 py-3 text-white focus:ring-0 focus:border-white transition-colors duration-500 outline-none inter font-light tracking-wide placeholder-zinc-800" placeholder="Repeat passphrase" type="password"/>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-8">
                <button className="font-sans inter uppercase tracking-[0.2em] text-[10px] text-zinc-500 hover:text-white transition-colors">Terminate Sessions</button>
                <button className="px-10 py-3 rounded-full border border-white text-white font-sans inter uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-500">Secure Account</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer from JSON */}
      <footer className="w-full py-16 bg-[#0A0A0A] border-t border-zinc-900 flex flex-col items-center gap-8 px-16">
        <div className="flex gap-12">
          <a className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-500 hover:text-white transition-colors duration-500" href="#">PRIVACY</a>
          <a className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-500 hover:text-white transition-colors duration-500" href="#">TERMS</a>
          <a className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-500 hover:text-white transition-colors duration-500" href="#">SUBMISSION GUIDELINES</a>
        </div>
        <p className="font-sans inter uppercase tracking-[0.15em] text-[9px] text-zinc-500 opacity-100 hover:opacity-80 transition-opacity">© VELORAH. ALL RIGHTS RESERVED.</p>
      </footer>
    </>
  );
}