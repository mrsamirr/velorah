"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signup } from "@/app/actions/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, undefined);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl font-headline tracking-[-0.04em] text-white">
          VELORAH
        </Link>
        <div className="hidden md:flex space-x-12">
          <Link className="text-outline hover:text-white transition-colors font-label tracking-tighter uppercase text-sm" href="/feed">Essays</Link>
          <Link className="text-outline hover:text-white transition-colors font-label tracking-tighter uppercase text-sm" href="/archive">Archive</Link>
          <Link className="text-outline hover:text-white transition-colors font-label tracking-tighter uppercase text-sm" href="/about">About</Link>
        </div>
        <div>
          <Link className="text-white font-label tracking-tighter uppercase text-sm hover:opacity-80 transition-opacity duration-300" href="/signin">Sign In</Link>
        </div>
      </nav>

      <main className="min-h-screen flex flex-col md:flex-row">
        <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-surface-container-lowest">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Architectural texture"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLpkXOLFDMdRCyjNGVXgEHcLVvtm7KXcLagkoieUpRhOdgR2baXvcDXNpRvP0qhh9L5gPn_O1tZ1xvUBZhaEih2GbHeNfsRF7qwlh9_sCZKUNE7KKW4P_imWPRKgxVRB-J1COlt01e04eBPe9Gkabc2Rq7VGC7nu8ueh6WHL-5PQ0fIhpW2v_cH1uB-Lv7nSH99rIe-E3C8LNRM8kSl9f3UfNnUJ28S6RKt87rnG6uOxCT5V2okGldjPZPiZPbF07n9IrPINhtIWDO"
          />
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

            {state?.message && (
              <p className="mb-6 text-sm text-error bg-error-container/20 border border-error/20 px-4 py-3" aria-live="polite">
                {state.message}
              </p>
            )}

            <form className="space-y-8" action={formAction}>
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <div className="space-y-2">
                <Label htmlFor="displayName" className={state?.errors?.displayName ? "text-error" : ""}>
                  Full Name
                </Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder="Alexander Vestige"
                  autoComplete="name"
                  required
                />
                {state?.errors?.displayName && (
                  <p className="text-xs text-error mt-1">{state.errors.displayName[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={state?.errors?.email ? "text-error" : ""}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="archive@velorah.com"
                  autoComplete="email"
                  required
                />
                {state?.errors?.email && (
                  <p className="text-xs text-error mt-1">{state.errors.email[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={state?.errors?.password ? "text-error" : ""}>
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
                {state?.errors?.password && (
                  <p className="text-xs text-error mt-1">{state.errors.password[0]}</p>
                )}
              </div>

              <div className="pt-4 space-y-4">
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-primary text-on-primary py-5 h-auto font-label text-[0.75rem] uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-60"
                >
                  {pending ? "Creating account…" : "Begin Journey"}
                </Button>
              </div>
            </form>

            <footer className="mt-12 text-center">
              <p className="text-[0.65rem] text-outline uppercase tracking-widest">
                Already have an account?{" "}
                <Link className="text-white border-b border-white hover:opacity-70 transition-opacity" href="/signin">
                  Sign In
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
