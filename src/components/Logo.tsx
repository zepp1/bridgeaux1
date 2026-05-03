import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * Bridgeaux mark — "BA" letters built like a bridge spanning blue to green,
 * with an arched suspension underneath. Reconstructed as inline SVG so it
 * stays crisp at every size and inherits brand gradient tokens.
 */
export const Logo = ({ className, showWordmark = true }: LogoProps) => (
  <a href="/" className={cn("inline-flex items-center gap-2.5 group", className)} aria-label="Bridgeaux home">
    <svg
      viewBox="0 0 64 56"
      className="h-9 w-auto"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ba-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--brand-blue))" />
          <stop offset="55%" stopColor="hsl(var(--brand-teal))" />
          <stop offset="100%" stopColor="hsl(var(--brand-green))" />
        </linearGradient>
      </defs>
      {/* Stylized B */}
      <path
        d="M8 6 H20 a10 10 0 0 1 0 20 H8 Z M8 24 H22 a10 10 0 0 1 0 20 H8 Z"
        fill="hsl(var(--brand-blue))"
      />
      {/* Stylized A */}
      <path
        d="M44 6 L58 44 H50 L47 36 H37 L34 44 H26 L40 6 Z M39 30 H45 L42 19 Z"
        fill="hsl(var(--brand-green))"
      />
      {/* Suspension arch */}
      <path
        d="M2 50 Q32 28 62 50"
        stroke="url(#ba-grad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cables */}
      {[8, 16, 24, 32, 40, 48, 56].map((x, i) => (
        <line
          key={i}
          x1={x}
          x2={x}
          y1={50}
          y2={50 - Math.max(0, 22 - Math.abs(32 - x) * 0.9)}
          stroke="url(#ba-grad)"
          strokeWidth="1"
          opacity="0.85"
        />
      ))}
      {/* Deck */}
      <line x1="2" y1="50" x2="62" y2="50" stroke="hsl(var(--brand-ink))" strokeWidth="1.25" />
    </svg>
    {showWordmark && (
      <span className="font-display text-xl font-semibold tracking-tight text-brand-ink">
        Bridgeaux
      </span>
    )}
  </a>
);
