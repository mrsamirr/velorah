import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
  return (
    <>
      <TopNavBar transparent={true} />
      <main className="pt-32 pb-24 w-full min-h-screen">
        <header className="px-8 max-w-7xl mx-auto mb-20 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-sm uppercase tracking-[0.2em] text-neutral-400 block mb-4">Legal Framework</span>
              <h1 className="font-headline text-[3.5rem] md:text-[5rem] leading-[1] tracking-[-0.04em] text-white">Cookies Policy</h1>
            </div>
            <div className="hidden md:block pb-4">
              <p className="text-neutral-400 text-sm tracking-widest uppercase">Last Updated: October 2024</p>
            </div>
          </div>
        </header>

        <section className="px-8 max-w-7xl mx-auto mb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <p className="font-body text-xl leading-[1.6] text-neutral-300 mb-8">
                At Velorah, we believe in the clarity of experience. Our use of cookies is designed to enhance the cinematic quality of our digital environment while ensuring your privacy remains an absolute priority. This policy outlines how and why we utilize these microscopic tools.
              </p>
            </div>
            <div className="lg:col-span-4 aspect-square bg-[#201f1f] relative overflow-hidden">
              <img alt="Abstract texture" className="object-cover w-full h-full opacity-50 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxGM_VympfrHFYsrueaeTuofmmV1nRhXmiCYaDRad4mbVrfGmAKso1eQT57_bLzzLg1ZYZyTsDjZK3GmmMHBV-bJu4YRsfdmd8bV7zHDZ3zBUXEMkegn23R3fubnOIqqe96ebJNyLZPeyNIo8zS3rzQuW-X5TTLwTlGNvT_wif8d2HqrH8adOp75rU5N0dxzJgKYuxUgddsEcTmxDBB8tweJtI-qflOyF8G-xmH1MTxBFeAdcgNrzbZlVTEzV15K5nXv8t7u0ZPond"/>
            </div>
          </div>
        </section>

        <section className="px-8 max-w-7xl mx-auto mb-20 space-y-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="bg-[#201f1f] p-12 flex flex-col justify-between aspect-square md:aspect-auto hover:bg-[#2a2a2a] transition-colors duration-500">
              <div>
                <span className="inline" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                <h3 className="font-headline text-2xl text-white mb-4">Essential</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Fundamental to the core architecture of Velorah. These ensure secure authentication, session management, and visual consistency across the obsidian gallery.</p>
              </div>
              <div className="pt-8 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-[0.65rem] text-white uppercase tracking-widest font-bold">Always Active</span>
              </div>
            </div>

            <div className="bg-[#1c1b1b] p-12 flex flex-col justify-between aspect-square md:aspect-auto hover:bg-[#2a2a2a] transition-colors duration-500">
              <div>
                <span className="inline">analytics</span>
                <h3 className="font-headline text-2xl text-white mb-4">Analytical</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Helping us understand the rhythm of our readers. These anonymous data points allow us to refine the editorial flow and optimize performance without identifying you.</p>
              </div>
              <div className="pt-8">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-1 bg-[#353534] peer-checked:bg-white transition-colors"></div>
                </label>
              </div>
            </div>

            <div className="bg-[#201f1f] p-12 flex flex-col justify-between aspect-square md:aspect-auto hover:bg-[#2a2a2a] transition-colors duration-500">
              <div>
                <span className="inline">auto_awesome</span>
                <h3 className="font-headline text-2xl text-white mb-4">Marketing</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Tailoring the atmosphere to your preferences. These cookies allow for personalized editorial suggestions and curated content based on your aesthetic interests.</p>
              </div>
              <div className="pt-8">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-1 bg-[#353534] peer-checked:bg-white transition-colors"></div>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 max-w-7xl mx-auto w-full">
          <div className="bg-[#0e0e0e] p-16 md:p-24 flex flex-col items-center text-center border border-white/20">
            <h2 className="font-headline text-4xl text-white mb-8 max-w-2xl">Curate Your Digital Footprint</h2>
            <p className="text-neutral-400 mb-12 max-w-xl text-lg">Your preference is the primary directive of our system. Save your choices to continue your experience within the Velorah environment.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
                Save Preferences
              </button>
              <button className="px-12 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                Accept All Cookies
              </button>
            </div>
          </div>
        </section>

        <section className="px-8 max-w-7xl mx-auto mt-32 w-full pb-20">
          <h3 className="font-headline text-2xl text-white mb-12">Cookie Inventory</h3>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="py-6 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-400 font-normal">Provider</th>
                  <th className="py-6 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-400 font-normal">Cookie Name</th>
                  <th className="py-6 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-400 font-normal">Purpose</th>
                  <th className="py-6 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-400 font-normal">Expiry</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/10">
                  <td className="py-8 font-bold text-white">Velorah</td>
                  <td className="py-8 font-mono text-neutral-400">_v_session</td>
                  <td className="py-8 text-neutral-300">Maintains active user state and secure navigation.</td>
                  <td className="py-8 text-neutral-400">Session</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-8 font-bold text-white">Google Analytics</td>
                  <td className="py-8 font-mono text-neutral-400">_ga</td>
                  <td className="py-8 text-neutral-300">Used to distinguish unique visitors and site usage statistics.</td>
                  <td className="py-8 text-neutral-400">2 Years</td>
                </tr>
                <tr>
                  <td className="py-8 font-bold text-white">Velorah</td>
                  <td className="py-8 font-mono text-neutral-400">_v_consent</td>
                  <td className="py-8 text-neutral-300">Stores your specific cookie preference configuration.</td>
                  <td className="py-8 text-neutral-400">1 Year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
