export default function Page() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#121212]/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center px-12 py-6 w-full max-w-screen-2xl mx-auto">
          <div className="text-2xl font-serif italic text-white tracking-tighter">
            Velorah®
          </div>
          <div className="hidden md:flex items-center gap-12">
            <a
              className="text-on-surface-variant hover:text-white transition-all duration-500 ease-out text-sm uppercase tracking-widest font-semibold"
              href="#"
            >
              Essays
            </a>
            <a
              className="text-on-surface-variant hover:text-white transition-all duration-500 ease-out text-sm uppercase tracking-widest font-semibold"
              href="#"
            >
              Collections
            </a>
            <a
              className="text-white border-b border-white/40 pb-1 hover:tracking-widest transition-all duration-500 ease-out text-sm uppercase tracking-widest font-semibold"
              href="#"
            >
              Philosophy
            </a>
          </div>
          <button className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all duration-500 ease-out scale-100 active:scale-95">
            Begin Journey
          </button>
        </div>
      </nav>
      <main className="pt-24">
        {/* Hero Section */}
        <section className="w-full h-128 relative overflow-hidden">
          <img
            alt="Cinematic landscape"
            className="w-full h-full object-cover grayscale brightness-50"
            data-alt="dramatic wide angle shot of a minimalist concrete building nestled in a misty dark pine forest at twilight with soft ambient lighting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQTyucH4OBWI1mk-w08ymSx0JinIDphA6q6LOjNpn5owzRjJXZhRm7Fm5wlWFFdMN5DMh10C3SETxHIK6TSoIvouRDzkGHRB5PcY3sGKvveFptxnxC1EiCVncTlKToirEAP7SkY7bn--fqI737jI_62wC_KEMLepD0R9f1ONPnb5OZ766Hw89_CaA-vN3uF0Ak3yPtfQ5RUYlv8yzZ86S0V4P4rejTLgkigDqg_-5EPeoworJSHPesiZAWD19YkX7QmKXGX2GASG6-"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent"></div>
        </section>
        {/* Article Content Shell */}
        <article className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
          {/* Header Info */}
          <div className="space-y-8 mb-16">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
                Philosophy
              </span>
              <span className="text-on-surface-variant text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                12 MIN READ
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline leading-[1.1] text-on-surface tracking-tight">
              The Architecture of Silence: Finding Stillness in Modern Chaos
            </h1>
            {/* Author Card */}
            <div className="flex items-center justify-between py-8 border-y border-white/5">
              <div className="flex items-center gap-4">
                <img
                  alt="Author Avatar"
                  className="w-12 h-12 rounded-full object-cover grayscale border border-white/10"
                  data-alt="portait of an elegant elderly man with glasses and grey hair in a charcoal turtleneck against a dark blue background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpAgPiR2sTBOb2FkPhcr3wmJ-zOuB9VKp2SOSZeWbiWI1SbC7z2LxmXabQz-jD1pMeIm1WDEPwENoMd8QnBkE_tFZaKcxONIA31YANtNZDDPBofyoMR1S_pUbiP6s0lpLjp4diC3vfWpeVG3wyE1yJkluK_gFc7J8KuylsjEKzoIvtz9QRhIdtW8h33iCw-3a7BzLYeEh_whuLS6twaIf104_qEN7qfr1lcsNzhKfFCU6-osdYAulhLHGXJoDfiqTRfgJGWrMqqe3l"
                />
                <div>
                  <p className="text-sm font-semibold text-on-surface">
                    Elias Thorne
                  </p>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                    Lead Curator · Oct 24, 2024
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors group">
                  <span
                    className="material-symbols-outlined group-active:scale-125 transition-transform"
                    data-icon="favorite"
                  >
                    favorite
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    1.2k
                  </span>
                </button>
                <button className="text-on-surface-variant hover:text-white transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="bookmark"
                  >
                    bookmark
                  </span>
                </button>
                <button className="text-on-surface-variant hover:text-white transition-colors">
                  <span className="material-symbols-outlined" data-icon="share">
                    share
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* Main Text */}
          <div className="prose max-w-none">
            <p>
              In an age defined by the relentless hum of connectivity, silence
              has become the ultimate luxury. It is no longer merely the absence
              of sound, but a physical space we must intentionally construct. At
              Velorah, we view silence not as a void, but as a foundation—a
              canvas upon which the true self begins to reappear.
            </p>
            <h2>The Geometry of Quiet</h2>
            <p>
              The spaces we inhabit dictate the rhythm of our thoughts. When we
              strip away the visual noise of excess ornamentation and
              high-saturation environments, we invite the mind to settle.
              Minimalist architecture isn't about emptiness; it's about the
              precision of what remains. A single ray of light across a raw
              concrete floor speaks louder than a room full of curated
              artifacts.
            </p>
            <blockquote className="border-white/20">
              "True luxury is the ability to hear your own heartbeat in a world
              that never stops screaming."
            </blockquote>
            <p>
              We find that the most profound insights occur in the intervals
              between activities. It is in the transition from the frantic
              "doing" to the contemplative "being" where our philosophy takes
              root. This editorial explores the specific ways we can cultivate
              these nocturnal sanctuaries, using shadow, texture, and
              intentional asymmetry to ground our wandering attention.
            </p>
            <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-4/5 bg-surface-container rounded-lg overflow-hidden border border-white/5">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale contrast-125"
                  data-alt="macro shot of textured grey silk fabric folding over a dark stone surface in dramatic chiaroscuro lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfs9kvss_rukddx2_Udz49VFTWHNDZSSBIcROOPYMpiZF3tk5vdDK3Ihv26BCNKkstefqNwTnk4O6EjqiQgTzwX2zcBwnDQljRWkUqz8_qzAv04TQa4667vTKIdMC2wcQD2SUwOIIGKGdxPg-zgcn_PPlHFfGr6xRBfeEGeFtumpn2SyC_0zoz7yqjwmTfa33j6N92ZrufZIdDgo8G--q-BapW0ukIf_W6fwIyz62EEbQ0e6hhy7BNAKyMS3g-uOUEcBZFc4Vr3wxA"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <h3 className="font-headline text-3xl italic text-white">
                  Tactile Resonance
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Engagement with the physical world through texture—rough
                  stone, cold steel, soft wool—acts as a sensory anchor. When
                  the digital world feels ethereal and fleeting, the physical
                  world provides the weight we need to remain present.
                </p>
              </div>
            </div>
          </div>
          {/* Interaction Bar */}
          <div className="mt-20 flex justify-center">
            <div className="inline-flex items-center gap-12 bg-white/5 backdrop-blur-md px-10 py-4 rounded-full border border-white/10 shadow-2xl shadow-black">
              <button className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors">
                <span
                  className="material-symbols-outlined"
                  data-icon="favorite"
                >
                  favorite
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Appreciate
                </span>
              </button>
              <div className="w-px h-4 bg-white/10"></div>
              <button className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors">
                <span
                  className="material-symbols-outlined"
                  data-icon="mode_comment"
                >
                  mode_comment
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Comment
                </span>
              </button>
              <div className="w-px h-4 bg-white/10"></div>
              <button className="flex items-center gap-3 text-on-surface-variant hover:text-white transition-colors">
                <span className="material-symbols-outlined" data-icon="share">
                  share
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Share
                </span>
              </button>
            </div>
          </div>
          {/* Comment Section */}
          <section className="mt-32 mb-40">
            <h3 className="font-headline text-4xl mb-12 text-white">
              Conversations
            </h3>
            {/* Input Area */}
            <div className="bg-white/3 p-8 rounded-lg mb-12 border border-white/5 backdrop-blur-sm">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs uppercase border border-white/5">
                  JD
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-white/20 resize-none h-24 font-body"
                    placeholder="Join the dialogue..."
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all">
                      Post Response
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Threaded Comments */}
            <div className="space-y-12">
              {/* Parent Comment */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <img
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover grayscale border border-white/10"
                    data-alt="close up profile of a young woman with sharp features and short hair looking thoughtful in low moody light"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNm1p6mMhNDhpxkSD27O9qu6jMf4KqBAem1oJ87g9iGbSMBbsx20y3u5m9rjF4Tw56TDO0-JZztIYa6-ND9Q4ZxddpJQ30H7CRFskxZTRHuKQTDaL242D6t34YSRjk-TxvGGWWsn3W4vJ1mGEZraM_obctxmz9ty__2xGNv4TEQdQpPH0miRnPeaAP4cOrz6OQVoVnpFWnvPeEarPGtQij9dyRLSIE3bnSQZuBWl4gCKCKJniCpv4ojatVI-kG8mIJMPs-9jhcX1JF"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Julianne V.
                      </span>
                      <span className="text-[10px] text-on-surface-variant/40 uppercase">
                        2 Hours Ago
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      The concept of "The Geometry of Quiet" resonated deeply.
                      I've recently started removing all non-essential objects
                      from my workspace and the cognitive lift is palpable.
                    </p>
                    <div className="mt-4 flex gap-6">
                      <button className="text-[10px] uppercase font-bold text-white tracking-widest hover:underline">
                        Reply
                      </button>
                      <button className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-widest hover:text-white">
                        Helpful (14)
                      </button>
                    </div>
                  </div>
                </div>
                {/* Nested Reply */}
                <div className="ml-14 flex gap-4 border-l border-white/5 pl-8 py-2">
                  <img
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover grayscale border border-white/5"
                    data-alt="portrait of a bearded man in a simple black t-shirt looking away from camera with a serious expression"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgcGtP2yW3tcC3YxXdA_ovY6F7fLayKwv0pZlVpumOCcVJ-qBcSdRt8_m_FZrHNajCgqkVEQEuOaFKsTE0WmVcwoGZeonT2IYZfucy1g-BH9Y39rYBdGy7kheJt5akxbtRpZ-OYGhLovrjGS59MBwAAu22t3DJzOTaVZqx3n8MbymdcaBQTJuyyxwfviY3Ha3rrMVVsuwoi5VxW9iudxXiq8YDsJmgAVf0iBhXZFQa3xHInF4ska9NdZPSSbY9u-SkNOI8LbUozn8I"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                        Markus K.
                      </span>
                      <span className="text-[9px] text-on-surface-variant/40 uppercase">
                        1 Hour Ago
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed italic">
                      I agree. It’s about creating a buffer between ourselves
                      and the data stream.
                    </p>
                  </div>
                </div>
              </div>
              {/* Another Comment */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant font-bold text-xs border border-white/5">
                  SK
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      S. Kendrick
                    </span>
                    <span className="text-[10px] text-on-surface-variant/40 uppercase">
                      5 Hours Ago
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Beautifully written. The nocturnal metaphor is perfect for
                    how we should curate our digital presence.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      {/* Footer */}
      <footer className="w-full py-20 px-12 bg-surface-container-lowest border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 items-start">
          <div className="space-y-6">
            <p className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-white">
              Company
            </p>
            <div className="flex flex-col gap-4">
              <a
                className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                href="#"
              >
                About
              </a>
              <a
                className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                href="#"
              >
                Manifesto
              </a>
              <a
                className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                href="#"
              >
                Careers
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <p className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-white">
              Legal
            </p>
            <div className="flex flex-col gap-4">
              <a
                className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                href="#"
              >
                Privacy
              </a>
              <a
                className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                href="#"
              >
                Terms
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <p className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-white">
              Help
            </p>
            <div className="flex flex-col gap-4">
              <a
                className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                href="#"
              >
                Support
              </a>
              <a
                className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
                href="#"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-widest leading-relaxed">
              © 2024 Velorah WhiteSpace.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
