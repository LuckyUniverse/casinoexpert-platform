import {
  ChipBody,
  EggspertFrame,
  Eyes,
  FaceInset,
  Limbs,
  Mouth,
  OUTLINE,
} from "./EggspertBase";

/** Phase 2 — first crack. Single diagonal hairline. */
export function Phase2({ size }: { size?: number }) {
  return (
    <EggspertFrame size={size} label="Eggspert (phase 2 — first crack)">
      <ChipBody>
        {/* Single diagonal hairline crack across upper-left */}
        <path
          d="M48 80 L72 90 L66 100 L88 102"
          stroke={OUTLINE}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </ChipBody>
      <FaceInset>
        <Eyes variant="raised" />
        <Mouth variant="halfsmile" />
      </FaceInset>
      <Limbs pose="point" />
    </EggspertFrame>
  );
}
