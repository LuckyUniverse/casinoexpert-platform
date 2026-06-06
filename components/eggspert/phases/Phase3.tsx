import {
  Blush,
  ChipBody,
  EggspertFrame,
  Eyes,
  FaceInset,
  Limbs,
  Mouth,
  OUTLINE,
} from "./EggspertBase";

/** Phase 3 — spider-webbed cracks plus a faint warm glow leaking through. */
export function Phase3({ size }: { size?: number }) {
  return (
    <EggspertFrame size={size} label="Eggspert (phase 3 — spider-webbed)">
      <defs>
        <radialGradient id="eggspert-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f1c34a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f1c34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ChipBody>
        {/* Glow leaking from the main crack node */}
        <circle cx="72" cy="92" r="22" fill="url(#eggspert-glow)" />
        {/* Web of cracks branching from upper-left */}
        <path
          d="M44 78 L72 92 L66 104 L92 108 M72 92 L88 78 M72 92 L54 110 M72 92 L100 92 M88 108 L108 122"
          stroke={OUTLINE}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </ChipBody>
      <FaceInset>
        <Blush />
        <Eyes variant="wide" />
        <Mouth variant="grin" />
      </FaceInset>
      <Limbs pose="anticipate" />
    </EggspertFrame>
  );
}
