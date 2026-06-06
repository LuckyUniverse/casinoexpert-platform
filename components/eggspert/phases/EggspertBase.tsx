import type { ReactNode } from "react";

/**
 * Shared frame for every phase — gives them all the same viewBox / canvas /
 * accessibility plumbing so the phase swap is purely a body change.
 */
export function EggspertFrame({
  size = 120,
  label,
  children,
}: {
  size?: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
    >
      <defs>
        {/* Soft floor shadow under the mascot */}
        <radialGradient id="eggspert-floor-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse
        cx="100"
        cy="226"
        rx="55"
        ry="7"
        fill="url(#eggspert-floor-shadow)"
      />
      {children}
    </svg>
  );
}

/* ----------------------------- shared anatomy ----------------------------- */

export const CHIP_NAVY = "#0b1530";
export const STRIPE_CYAN = "#7dd3fc";
export const FACE_CREAM = "#f5e6c8";
export const OUTLINE = "#03060f";
export const GLOVE = "#ffffff";
export const SHOE = "#1a2540";
export const BLUSH = "#f08aa0";

/** Limbs — same for every phase so progression reads as body changes only. */
export function Limbs({ pose = "neutral" }: { pose?: "neutral" | "welcome" | "point" | "anticipate" | "celebrate" }) {
  // Each pose places the hands differently. Arms are simple paths
  // (rubber-hose style), legs are fixed.
  const arms: Record<typeof pose, { left: string; right: string; lhand: [number, number]; rhand: [number, number] }> = {
    neutral: {
      left: "M55 130 Q40 150 35 175",
      right: "M145 130 Q160 150 165 175",
      lhand: [35, 178],
      rhand: [165, 178],
    },
    welcome: {
      left: "M55 130 Q35 130 25 115", // hand on hip side
      right: "M145 130 Q175 130 188 110", // open hand outward
      lhand: [25, 115],
      rhand: [188, 110],
    },
    point: {
      left: "M55 130 Q35 130 25 115",
      right: "M145 130 Q120 100 110 90", // pointing up at own shoulder
      lhand: [25, 115],
      rhand: [110, 90],
    },
    anticipate: {
      left: "M55 130 Q30 145 15 160",
      right: "M145 130 Q170 145 185 160",
      lhand: [15, 160],
      rhand: [185, 160],
    },
    celebrate: {
      left: "M55 110 Q30 70 10 40", // both arms thrown up wide
      right: "M145 110 Q170 70 190 40",
      lhand: [10, 40],
      rhand: [190, 40],
    },
  };

  const a = arms[pose];

  return (
    <g>
      {/* Arms */}
      <path d={a.left} stroke={OUTLINE} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d={a.right} stroke={OUTLINE} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Gloves (hands) */}
      <circle cx={a.lhand[0]} cy={a.lhand[1]} r="8" fill={GLOVE} stroke={OUTLINE} strokeWidth="2" />
      <circle cx={a.rhand[0]} cy={a.rhand[1]} r="8" fill={GLOVE} stroke={OUTLINE} strokeWidth="2" />
      {/* Legs */}
      <path d="M82 195 Q78 215 78 222" stroke={OUTLINE} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M118 195 Q122 215 122 222" stroke={OUTLINE} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Shoes */}
      <ellipse cx="76" cy="224" rx="14" ry="6" fill={SHOE} stroke={OUTLINE} strokeWidth="2" />
      <ellipse cx="124" cy="224" rx="14" ry="6" fill={SHOE} stroke={OUTLINE} strokeWidth="2" />
    </g>
  );
}

/** The chip body shell, sized for the oval/egg silhouette. */
export function ChipBody({ children }: { children?: ReactNode }) {
  return (
    <g>
      {/* Body ellipse */}
      <ellipse
        cx="100"
        cy="115"
        rx="70"
        ry="90"
        fill={CHIP_NAVY}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      {/* Six edge stripes — evenly spaced around the perimeter */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const cx = 100 + Math.cos(rad) * 68;
        const cy = 115 + Math.sin(rad) * 88;
        return (
          <rect
            key={angle}
            x={cx - 6}
            y={cy - 3}
            width="12"
            height="6"
            rx="2"
            fill={STRIPE_CYAN}
            stroke={OUTLINE}
            strokeWidth="1.5"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
      {children}
    </g>
  );
}

/** Face inset (the cream "egg-skin" disc where the face lives). */
export function FaceInset({ children }: { children?: ReactNode }) {
  return (
    <g>
      <ellipse
        cx="100"
        cy="115"
        rx="45"
        ry="55"
        fill={FACE_CREAM}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      {children}
    </g>
  );
}

/* ------------------------------- expressions ------------------------------ */

export function Eyes({
  variant = "open",
}: {
  variant?: "open" | "raised" | "wide" | "closed_joy";
}) {
  if (variant === "closed_joy") {
    return (
      <g>
        <path d="M78 108 Q86 100 94 108" stroke={OUTLINE} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M106 108 Q114 100 122 108" stroke={OUTLINE} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    );
  }

  const sclera = (cx: number) => (
    <ellipse cx={cx} cy="110" rx={variant === "wide" ? 9 : 7} ry={variant === "wide" ? 11 : 9} fill="#fff" stroke={OUTLINE} strokeWidth="2" />
  );
  const pupil = (cx: number) => (
    <circle cx={cx} cy="112" r={variant === "wide" ? 4 : 3.5} fill={OUTLINE} />
  );
  const highlight = (cx: number) => (
    <circle cx={cx + 1.5} cy="110" r="1" fill="#fff" />
  );

  return (
    <g>
      {sclera(86)}
      {sclera(114)}
      {pupil(86)}
      {pupil(114)}
      {highlight(86)}
      {highlight(114)}
      {variant === "raised" && (
        <path d="M78 96 Q86 92 94 95" stroke={OUTLINE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

export function Mouth({
  variant = "smile",
}: {
  variant?: "smile" | "halfsmile" | "grin" | "shout";
}) {
  switch (variant) {
    case "halfsmile":
      return (
        <path
          d="M92 138 Q102 144 114 138"
          stroke={OUTLINE}
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
      );
    case "grin":
      return (
        <path
          d="M84 134 Q100 152 116 134 Q100 140 84 134 Z"
          fill={OUTLINE}
          stroke={OUTLINE}
          strokeWidth="1"
        />
      );
    case "shout":
      return (
        <ellipse cx="100" cy="140" rx="10" ry="13" fill={OUTLINE} />
      );
    case "smile":
    default:
      return (
        <path
          d="M86 136 Q100 146 114 136"
          stroke={OUTLINE}
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
      );
  }
}

export function Blush() {
  return (
    <g opacity="0.7">
      <ellipse cx="76" cy="128" rx="6" ry="3" fill={BLUSH} />
      <ellipse cx="124" cy="128" rx="6" ry="3" fill={BLUSH} />
    </g>
  );
}
