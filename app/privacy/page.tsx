import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <TopNavBar transparent={true} />
      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-20 w-full min-h-screen">
        <aside className="md:w-64 flex-shrink-0">
          <div className="md:sticky md:top-32 space-y-6">
            <div className="text-sm font-label uppercase tracking-[0.1em] text-neutral-400 mb-8 opacity-60">
              Directory
            </div>
            <nav className="flex flex-col gap-4">
              <a
                className="text-white font-medium border-l border-white pl-4 transition-all duration-300"
                href="#introduction"
              >
                Introduction
              </a>
              <a
                className="text-neutral-500 hover:text-white transition-all duration-300 border-l border-neutral-700 pl-4"
                href="#data-collection"
              >
                Data Collection
              </a>
              <a
                className="text-neutral-500 hover:text-white transition-all duration-300 border-l border-neutral-700 pl-4"
                href="#processing"
              >
                Processing
              </a>
              <a
                className="text-neutral-500 hover:text-white transition-all duration-300 border-l border-neutral-700 pl-4"
                href="#your-rights"
              >
                Your Rights
              </a>
              <a
                className="text-neutral-500 hover:text-white transition-all duration-300 border-l border-neutral-700 pl-4"
                href="#security"
              >
                Security
              </a>
              <a
                className="text-neutral-500 hover:text-white transition-all duration-300 border-l border-neutral-700 pl-4"
                href="#contact"
              >
                Contact
              </a>
            </nav>
          </div>
        </aside>

        <article className="flex-1 max-w-3xl">
          <header className="mb-28">
            <div className="text-sm font-label uppercase tracking-[0.1em] text-neutral-400 mb-4">
              Last Updated: October 24, 2024
            </div>
            <h1 className="text-[3.5rem] leading-[1.1] font-headline tracking-[-0.04em] text-white mb-8">
              Privacy Policy
            </h1>
            <p className="text-lg leading-relaxed text-neutral-300 font-light italic">
              At Velorah, we believe privacy is the cornerstone of the modern
              editorial experience. Our commitment to your data is as curated as
              our content.
            </p>
          </header>

          <section className="mb-28" id="introduction">
            <h2 className="text-2xl font-headline text-white mb-6">
              1. Introduction
            </h2>
            <div className="space-y-6 text-neutral-300 leading-[1.6]">
              <p>
                Velorah ("we," "our," or "us") operates a premium digital
                publication dedicated to architectural design and cinematic
                editorial. This Privacy Policy describes how we handle the
                minimal information we collect when you interact with our
                platform.
              </p>
              <p>
                By accessing Velorah, you agree to the collection and use of
                information in accordance with this policy. We prioritize
                transparency and brutalist honesty in our operations.
              </p>
            </div>
          </section>

          <section className="mb-28" id="data-collection">
            <div className="bg-neutral-900 p-12 border border-neutral-700/20">
              <h2 className="text-2xl font-headline text-white mb-6">
                2. Data Collection
              </h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm font-label uppercase tracking-[0.1em] text-white mb-2">
                      Direct Interaction
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Personal data you provide when subscribing to our
                      newsletter, including email address and name.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-label uppercase tracking-[0.1em] text-white mb-2">
                      Automated Data
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Usage details, IP addresses, and information collected
                      through tracking technologies to optimize reading
                      experiences.
                    </p>
                  </div>
                </div>
                <div className="h-px bg-neutral-700/20"></div>
                <p className="text-neutral-300 leading-[1.6]">
                  We do not collect sensitive biometrics or financial data
                  beyond what is strictly necessary for premium subscription
                  processing through our secure partners.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-28" id="processing">
            <h2 className="text-2xl font-headline text-white mb-6">
              3. Processing & Usage
            </h2>
            <div className="space-y-6 text-neutral-300 leading-[1.6]">
              <p>Information collected is utilized strictly for:</p>
              <ul className="list-none space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 bg-white mt-2"></span>
                  <span>
                    Maintaining the integrity and performance of the Velorah
                    interface.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 bg-white mt-2"></span>
                  <span>
                    Curating personalized reading recommendations based on
                    editorial interest.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 bg-white mt-2"></span>
                  <span>
                    Communication regarding exclusive digital drops and
                    exhibition updates.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-28" id="your-rights">
            <h2 className="text-2xl font-headline text-white mb-6">
              4. Your Rights
            </h2>
            <p className="text-neutral-300 leading-[1.6] mb-8">
              Under global data protection regulations, you retain absolute
              authority over your digital footprint on our platform.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="group border-b border-neutral-700/30 py-6 hover:bg-white/[0.02] px-4 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-headline text-xl text-white">
                    Right to Access
                  </span>
                  <span className="inline">
                    chevron_right
                  </span>
                </div>
              </div>
              <div className="group border-b border-neutral-700/30 py-6 hover:bg-white/[0.02] px-4 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-headline text-xl text-white">
                    Right to Erasure
                  </span>
                  <span className="inline">
                    chevron_right
                  </span>
                </div>
              </div>
              <div className="group border-b border-neutral-700/30 py-6 hover:bg-white/[0.02] px-4 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="font-headline text-xl text-white">
                    Right to Rectification
                  </span>
                  <span className="inline">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-28" id="security">
            <div className="relative overflow-hidden bg-[#0e0e0e] p-12 border border-white/5">
              <div className="relative z-10">
                <h2 className="text-2xl font-headline text-white mb-6">
                  5. Security Standards
                </h2>
                <p className="text-neutral-300 leading-[1.6] mb-8">
                  We employ industry-standard encryption protocols and secure
                  "Obsidian Tier" server architecture to shield your data from
                  unauthorized access. Our systems are audited quarterly for
                  compliance with the highest privacy benchmarks.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-medium text-sm tracking-tight">
                  <span className="inline">
                    verified_user
                  </span>
                  ENCRYPTION ACTIVE
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </section>

          <section className="mb-28" id="contact">
            <h2 className="text-2xl font-headline text-white mb-6">
              6. Contact
            </h2>
            <p className="text-neutral-300 leading-[1.6] mb-8">
              For inquiries regarding your data privacy or to exercise your
              rights, please reach out to our DPO (Data Protection Officer).
            </p>
            <a
              className="inline-block text-3xl font-headline text-white border-b-2 border-neutral-300 pb-2 hover:border-white transition-colors"
              href="mailto:privacy@velorah.com"
            >
              privacy@velorah.com
            </a>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
