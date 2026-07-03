"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

/*
 * Shared account control for the header.
 *
 * - Signed in  → avatar-initial button that opens a dropdown with the user's
 *                name/email, order history link, and Sign out.
 * - Signed out → prominent "Create account" pill (primary CTA) + a quieter
 *                "Sign in" link (secondary), because new visitors should land
 *                on the create-account flow first.
 *
 * `variant` swaps colors so it works both on the dark hero navbar and the
 * white sub-page header.
 */
export default function AccountMenu({
  variant = "light",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const { isAuthed, user, ready, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Avoid flashing "Create account" for a hydrated logged-in user.
  if (!ready) return <div className={cn("h-9 w-9 sm:w-24", className)} aria-hidden />;

  const onDark = variant === "dark";

  /* -------------------- Signed out: create account CTA -------------------- */
  if (!isAuthed) {
    return (
      <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
        <Link
          href="/signin"
          className={cn(
            "hidden text-sm font-semibold transition-colors sm:inline",
            onDark ? "text-white/90 hover:text-brand-light" : "text-muted hover:text-brand",
          )}
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          aria-label="Create account"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:px-4 sm:py-2 h-10 w-10 sm:h-auto sm:w-auto"
        >
          <User size={16} />
          <span className="hidden sm:inline">Create account</span>
        </Link>
      </div>
    );
  }

  /* -------------------- Signed in: account dropdown --------------------- */
  const first = user?.name?.split(" ")[0] ?? "Account";
  const initial = (first[0] ?? "A").toUpperCase();

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className={cn(
          "flex items-center gap-2 rounded-full text-sm font-semibold transition-colors",
          "p-0.5 sm:py-1.5 sm:pl-1.5 sm:pr-3",
          onDark ? "text-white hover:bg-white/10" : "text-ink hover:bg-surface",
        )}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white sm:h-8 sm:w-8">
          {initial}
        </span>
        <span className="hidden max-w-[7rem] truncate sm:inline">{first}</span>
        <ChevronDown
          size={14}
          className={cn("hidden transition-transform sm:inline", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] w-64 overflow-hidden rounded-2xl border border-black/10 bg-white text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
        >
          <div className="border-b border-black/10 bg-surface px-4 py-3">
            <p className="text-sm font-bold text-ink">{user?.name ?? "Account"}</p>
            {user?.email && (
              <p className="mt-0.5 truncate text-xs text-muted">{user.email}</p>
            )}
          </div>

          <div className="py-1">
            <Link
              href="/cart"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-surface"
            >
              <ShoppingBag size={15} className="text-muted" />
              Your cart
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface"
            >
              <LogOut size={15} className="text-muted" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
