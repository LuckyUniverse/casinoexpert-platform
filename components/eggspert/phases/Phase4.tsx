import {
  Blush,
  CHIP_NAVY,
  EggspertFrame,
  Eyes,
  FACE_CREAM,
  Limbs,
  Mouth,
  OUTLINE,
  STRIPE_CYAN,
} from "./EggspertBase";

/**
 * Phase 4 — the chip splits open horizontally and a fountain of cash erupts.
 * Eggspert is unharmed and ecstatic: arms thrown wide, head back, big shout.
 */
export function Phase4({ size }: { size?: number }) {
  return (
    <EggspertFrame size={size} label="Eggspert (phase 4 — cracks open, cash spills out)">
      <defs>
        <radialGradient id="eggspert-burst" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fff6c8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f1c34a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Burst halo behind everything */}
      <circle cx="100" cy="90" r="80" fill="url(#eggspert-burst)" />

      {/* ----- BOTTOM HALF of chip (intact bowl) ----- */}
      <path
        d="M30 115 Q30 205 100 205 Q170 205 170 115 Z"
        fill={CHIP_NAVY}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Bottom-half stripes */}
      {[
        { angle: 120 },
        { angle: 180 },
        { angle: 240 },
      ].map(({ angle }) => {
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
      {/* Jagged top edge of the bowl (where it cracked open) */}
      <path
        d="M30 115 L46 108 L58 118 L72 106 L88 116 L100 104 L112 116 L128 106 L142 118 L154 108 L170 115"
        stroke={OUTLINE}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />

      {/* ----- CASH FOUNTAIN (drawn before the lid so coins are in front of bowl but behind lid) ----- */}
      {/* Coins */}
      {[
        { cx: 100, cy: 35, r: 11 },
        { cx: 72, cy: 50, r: 9 },
        { cx: 128, cy: 50, r: 9 },
        { cx: 55, cy: 75, r: 8 },
        { cx: 145, cy: 75, r: 8 },
        { cx: 88, cy: 60, r: 7 },
        { cx: 112, cy: 60, r: 7 },
      ].map((c, i) => (
        <g key={`coin-${i}`}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill="#f1c34a" stroke={OUTLINE} strokeWidth="2" />
          <circle cx={c.cx} cy={c.cy} r={c.r - 3} fill="none" stroke="#b3892b" strokeWidth="1" />
          <text
            x={c.cx}
            y={c.cy + c.r / 2.8}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize={c.r * 1.1}
            fill={OUTLINE}
          >
            $
          </text>
        </g>
      ))}
      {/* Bills — small green rectangles tumbling outward */}
      {[
        { x: 38, y: 50, r: -22 },
        { x: 152, y: 50, r: 22 },
        { x: 76, y: 30, r: -12 },
        { x: 122, y: 30, r: 14 },
      ].map((b, i) => (
        <g key={`bill-${i}`} transform={`rotate(${b.r} ${b.x} ${b.y})`}>
          <rect
            x={b.x - 10}
            y={b.y - 6}
            width="20"
            height="12"
            rx="1.5"
            fill="#3e8e5a"
            stroke={OUTLINE}
            strokeWidth="1.5"
          />
          <text
            x={b.x}
            y={b.y + 4}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="9"
            fill="#fff"
          >
            $
          </text>
        </g>
      ))}
      {/* Sparkle/motion lines */}
      <g stroke="#f1c34a" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M22 30 L34 38" />
        <path d="M178 30 L166 38" />
        <path d="M100 8 L100 22" />
        <path d="M40 15 L46 26" />
        <path d="M160 15 L154 26" />
      </g>

      {/* ----- TOP HALF (the "lid") — tilted back ----- */}
      <g transform="rotate(-22 60 100)">
        <path
          d="M30 115 Q30 25 100 25 Q170 25 170 115 Z"
          fill={CHIP_NAVY}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {[
          { angle: 0 },
          { angle: 60 },
          { angle: 300 },
        ].map(({ angle }) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const cx = 100 + Math.cos(rad) * 68;
          const cy = 115 + Math.sin(rad) * 88;
          return (
            <rect
              key={`lid-${angle}`}
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
        {/* Jagged underside of the lid */}
        <path
          d="M30 115 L46 122 L58 112 L72 124 L88 114 L100 126 L112 114 L128 124 L142 112 L154 122 L170 115"
          stroke={OUTLINE}
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Underside is the cream face inset showing through */}
        <path
          d="M40 115 Q40 35 100 35 Q160 35 160 115 Z"
          fill={FACE_CREAM}
          opacity="0.35"
        />
      </g>

      {/* Eggspert's face — still on the bottom half, peeking up in joy */}
      <g>
        <ellipse
          cx="100"
          cy="150"
          rx="35"
          ry="32"
          fill={FACE_CREAM}
          stroke={OUTLINE}
          strokeWidth="3"
        />
        <g transform="translate(0 35)">
          <Blush />
          <Eyes variant="closed_joy" />
          <Mouth variant="shout" />
        </g>
      </g>

      <Limbs pose="celebrate" />
    </EggspertFrame>
  );
}
