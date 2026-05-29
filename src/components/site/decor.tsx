import { Sparkles } from "lucide-react";

export function GoldDivider({ className = "" }: { className?: string }) {
  return <div className={`divider-gold my-12 ${className}`} />;
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] text-bordeaux/80">
      <Snowflake className="h-3.5 w-3.5 text-gold" />
      <span>{children}</span>
      <Snowflake className="h-3.5 w-3.5 text-gold" />
    </div>
  );
}

export function Snowflake({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" />
      <path d="M12 5l-2 2M12 5l2 2M12 19l-2-2M12 19l2-2M5 12l2-2M5 12l2 2M19 12l-2-2M19 12l-2 2" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className="font-display mt-4 text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-xs font-medium text-bordeaux">
      <Sparkles className="h-3 w-3 text-gold" />
      {children}
    </span>
  );
}
