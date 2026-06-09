import { cn } from "@/lib/utils";

type BrandLogoSize = "sm" | "md" | "lg";

const SIZE: Record<BrandLogoSize, { box: string; text: string; radius: string }> = {
  sm: { box: "h-9 w-9", text: "text-lg", radius: "rounded-surface-md" },
  md: { box: "h-12 w-12", text: "text-lg", radius: "rounded-surface-lg" },
  lg: { box: "h-14 w-14", text: "text-xl", radius: "rounded-surface-lg" },
};

type BrandLogoProps = {
  size?: BrandLogoSize;
  className?: string;
};

export function BrandLogo({ size = "sm", className }: BrandLogoProps) {
  const s = SIZE[size];

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center border border-teal-400/25 bg-teal-500/8",
        s.box,
        s.radius,
        className
      )}
      aria-hidden
    >
      <span className="absolute inset-[2px] rounded-[inherit] bg-gradient-to-br from-white/30 to-transparent opacity-30" />
      <span className={cn("relative font-display tracking-tight text-white", s.text)}>MZ</span>
    </span>
  );
}
