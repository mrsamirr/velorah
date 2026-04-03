import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <TopNavBar transparent={true} />
      <header className="pt-48 pb-32 px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <span className="text-[0.75rem] font-medium tracking-[0.2em] text-neutral-500 uppercase font-label">LAST UPDATED: OCTOBER 24, 2024</span>
          <h1 className="text-[3.5rem] md:text-[5rem] leading-[1.1] font-headline -tracking-[0.04em] text-white">
            Terms of <br/>
            <span className="italic">Service</span>
          </h1>
          <p className="max-w-2xl text-xl text-neutral-400 leading-relaxed font-light mt-8">
            These terms govern your access to and use of Velorah's editorial platform and digital services. By engaging with our curated content, you agree to the conditions outlined below.
          </p>
        </div>
      </header>

      <div className="h-20 w-full"></div>

      <main className="px-8 max-w-7xl mx-auto w-full flex flex-col gap-32 mb-32 min-h-screen">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-headline italic text-white sticky top-32">I. The Agreement</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 text-neutral-300 leading-relaxed font-body text-lg">
            <p>
              Welcome to Velorah. These Terms of Service constitute a legally binding agreement between you and Velorah regarding your use of our platform. Our services are provided to those seeking curated editorial excellence and high-fidelity design experiences.
            </p>
            <p>
              By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must cease use of the site immediately.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 py-24 bg-[#1c1b1b] -mx-8 px-8 border-y border-white/5">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-headline italic text-white sticky top-32">II. Account Responsibilities</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-[0.7rem] font-bold text-white tracking-widest uppercase">2.1 ELIGIBILITY</span>
                <p className="text-neutral-400 leading-relaxed font-light">
                  You must be at least 18 years of age or the age of legal majority in your jurisdiction to create an account on Velorah. By registering, you warrant your legal capacity to enter into this contract.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[0.7rem] font-bold text-white tracking-widest uppercase">2.2 SECURITY</span>
                <p className="text-neutral-400 leading-relaxed font-light">
                  You are solely responsible for maintaining the confidentiality of your credentials. Any activity originating from your account is deemed your responsibility. Notify us immediately of unauthorized access.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[0.7rem] font-bold text-white tracking-widest uppercase">2.3 CONDUCT</span>
                <p className="text-neutral-400 leading-relaxed font-light">
                  Users are prohibited from engaging in any behavior that disrupts the aesthetic or functional integrity of the platform, including but not limited to automated scraping or malicious code injection.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[0.7rem] font-bold text-white tracking-widest uppercase">2.4 TERMINATION</span>
                <p className="text-neutral-400 leading-relaxed font-light">
                  Velorah reserves the right to suspend or terminate accounts that violate our community standards or editorial vision without prior notice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-headline italic text-white sticky top-32">III. Content Ownership</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-10">
            <div className="relative w-full aspect-video overflow-hidden">
              <img alt="Cinematic desk setup with minimalist design elements and soft lighting" className="w-full h-full object-cover grayscale opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxjkVZJx9l0qiRubE5BoUcDEp8WVmrOc7GVx9Bc0dX0em4kvFmvRB2UARCOUON4v5QpDnsqE9W3kvxKsVgq16F1WrjAd4H_9fjrdfH8Kdi_kT4JLtEWv2me11ruVB_mThIIw0ezGpk4nUlrDFMr3t15OOz4yVWPZoqxFWwko2gpVnVrE7zmRc_NuG8Fnksug-9nMDe3v7JjJoeog-3tPE_ohqHxPEyZ8sNOcg-fdXwCmeDaDWndvR0jIlgpCR1aeWX8XYXo_GrfEf0"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
            </div>
            <div className="flex flex-col gap-8 text-neutral-300 leading-relaxed font-body text-lg">
              <div className="border-l border-white/20 pl-8 py-2">
                <h3 className="text-xl font-headline text-white mb-4">Intellectual Property</h3>
                <p>
                  All materials on Velorah, including but not limited to typography, bespoke imagery, editorial copy, and interface architecture, are the exclusive property of Velorah or its licensors. These works are protected by international copyright and intellectual property laws.
                </p>
              </div>
              <div className="border-l border-white/20 pl-8 py-2">
                <h3 className="text-xl font-headline text-white mb-4">User Contributions</h3>
                <p>
                  By submitting content to our platform, you grant Velorah a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, and display such content within our editorial ecosystem. You represent that you own all rights to any content you provide.
                </p>
              </div>
              <div className="border-l border-white/20 pl-8 py-2">
                <h3 className="text-xl font-headline text-white mb-4">Limited License</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to access and view the content for personal, non-commercial use. Any extraction, reproduction, or redistribution of Velorah's assets without explicit written consent is strictly prohibited.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-headline italic text-white sticky top-32">IV. Privacy & Data</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 text-neutral-300 leading-relaxed font-body text-lg">
            <p>
              Your privacy is paramount. Use of the service is also governed by our Privacy Policy, which details how we collect and process your personal data in alignment with global standards.
            </p>
            <a href="/privacy" className="block w-fit px-8 py-4 bg-white text-black font-bold tracking-widest text-[0.75rem] uppercase transition-all duration-300 hover:bg-gray-200">
              READ PRIVACY POLICY
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-headline italic text-white sticky top-32">V. Liability</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 text-neutral-400 leading-relaxed font-body text-lg">
            <p className="italic">
              "The service is provided on an 'as is' and 'as available' basis. Velorah makes no warranties, expressed or implied, regarding the accuracy or reliability of the content found herein."
            </p>
            <p>
              In no event shall Velorah be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the platform.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
