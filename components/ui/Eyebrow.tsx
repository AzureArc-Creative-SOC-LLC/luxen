import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";

export default function Eyebrow({
  children,
  className,
  light = false,
  center = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        light ? "text-white" : "text-ink",
        center && "justify-center",
        className,
      )}
    >
      <LogoMark className="h-4 w-5" color="var(--brand)" />
      {children}
    </span>
  );
}
