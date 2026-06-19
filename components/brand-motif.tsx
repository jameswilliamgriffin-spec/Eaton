import { cn } from "@/lib/utils";

export function BrandIconMotif({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-ambient-brand
      className={cn("pointer-events-none absolute select-none bg-brand-pink opacity-[0.08] will-change-transform", className)}
      style={{
        WebkitMaskImage: "url('/BRAND/ICON.svg')",
        maskImage: "url('/BRAND/ICON.svg')",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export function BrandRingMotif({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none rounded-full border-[42px] border-brand-pink/[0.08]",
        className,
      )}
    />
  );
}
