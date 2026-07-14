"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth";
import { ApiError, apiForgotPassword } from "@/lib/api";

const INPUT =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [forgotBusy, setForgotBusy] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      await login(form.email.trim(), form.password);
      router.push("/");
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.status === 401
            ? "Invalid email or password."
            : err.message
          : "Could not sign you in. Please try again.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleForgot = async () => {
    setError(null);
    setNotice(null);
    const email = form.email.trim();
    if (!email) {
      setError("Enter your email above, then tap ‘Forgot?’ to receive a reset link.");
      return;
    }
    setForgotBusy(true);
    try {
      const res = await apiForgotPassword(email);
      setNotice(res.message);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send reset link.");
    } finally {
      setForgotBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[1fr_1.1fr]">
      {/* Left — Form column */}
      <section className="relative flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        {/* Top row: logo + back home */}
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="LUXEN home">
            <Logo className="text-ink" mark="var(--brand)" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft size={16} /> Back to site
          </Link>
        </div>

        {/* Center card */}
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-brand">Welcome back</p>
          <h1 className="h-display mt-2 text-4xl tracking-[-0.02em] text-ink lg:text-5xl">
            Sign in
          </h1>
          <p className="mt-3 text-sm text-muted">
            Access your research orders, batch records, and certificates of analysis.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-muted">
                Email
              </span>
              <input
                className={INPUT}
                type="email"
                required
                autoComplete="email"
                placeholder="you@lab.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </label>

            <label className="block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-muted">Password</span>
                <button
                  type="button"
                  onClick={handleForgot}
                  disabled={forgotBusy}
                  className="text-xs font-semibold text-brand hover:text-brand-dark disabled:opacity-60"
                >
                  {forgotBusy ? "Sending…" : "Forgot?"}
                </button>
              </div>
              <div className="relative">
                <input
                  className={`${INPUT} pr-12`}
                  type={showPwd ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border border-black/20 accent-[var(--brand)]"
              />
              Keep me signed in on this device
            </label>

            {notice && (
              <p className="rounded-2xl border border-brand/30 bg-brand/[0.06] px-4 py-2 text-xs text-brand-dark">
                {notice}
              </p>
            )}
            {error && (
              <p className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2 text-xs text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-3 w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-[0_20px_40px_-20px_rgba(0,131,195,0.6)] disabled:opacity-70"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            New to LUXEN?{" "}
            <Link href="/signup" className="font-semibold text-brand hover:text-brand-dark">
              Create an account
            </Link>
          </p>
        </div>

        {/* Bottom row */}
        <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.22em] text-muted lg:text-left">
          For laboratory R&amp;D use only · Not for human or veterinary consumption
        </p>
      </section>

      {/* Right — Visual panel: low-opacity lab image on dark backdrop */}
      <aside className="relative hidden overflow-hidden bg-navy lg:block">
        <Image
          src="/images/our-process-bg.webp"
          alt=""
          fill
          priority
          sizes="(min-width:1024px) 55vw, 0vw"
          className="object-cover opacity-40"
        />
        {/* Subtle vignette so text stays legible */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-navy/40 via-transparent to-navy/60"
        />

        <div className="relative z-10 flex h-full flex-col p-14 text-white">
          <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/70">
            <span className="grid h-2 w-2 place-items-center rounded-full bg-brand" />
            Research portal
          </div>

          <blockquote className="mt-auto">
            <p className="h-display text-3xl leading-[1.15] tracking-[-0.01em] lg:text-4xl">
              &ldquo;The certificates of analysis matched our own HPLC results to the decimal.
              Reordering has become the easiest part of running the lab.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-white/70">
              Research Associate · Cell Biology Lab
            </footer>
          </blockquote>
        </div>
      </aside>
    </main>
  );
}
