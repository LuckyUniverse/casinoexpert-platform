import {
  ChipBody,
  EggspertFrame,
  Eyes,
  FaceInset,
  Limbs,
  Mouth,
} from "./EggspertBase";

/** Phase 1 — pristine, welcoming. */
export function Phase1({ size }: { size?: number }) {
  return (
    <EggspertFrame size={size} label="Eggspert (phase 1 — whole)">
      <ChipBody />
      <FaceInset>
        <Eyes variant="open" />
        <Mouth variant="smile" />
      </FaceInset>
      <Limbs pose="welcome" />
    </EggspertFrame>
  );
}
