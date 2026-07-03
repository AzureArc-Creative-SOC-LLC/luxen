import { cn } from "@/lib/utils";

/* LUXEN leaf-swoosh mark (echoes the reference's leaf logo) + wordmark */
export function LogoMark({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <path
        d="M6 30c0-11 9-20 20-20 3 0 6 .6 8 1.6-1 9-8.6 16-18 16-2 0-4-.4-6-1.2-2.4 1.6-4 4-4 4z"
        fill={color}
      />
      <path
        d="M9 31c5-9 13-15 22-17"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

export function Logo({
  className,
  textClassName,
  mark = "currentColor",
}: {
  className?: string;
  textClassName?: string;
  mark?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="h-8 w-8" color={mark} />
      <span className={cn("text-2xl font-extrabold tracking-tight", textClassName)}>
        LUXEN
      </span>
    </span>
  );
}
