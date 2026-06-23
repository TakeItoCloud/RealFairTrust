export interface VerifiedBadgeProps {
  /** `pill` = inline green-check chip; `seal` = circular RFT seal (Concept B). */
  variant?: "pill" | "seal";
  /** Pill label, e.g. "Verified" / "Verificado". */
  label?: string;
  /** Seal diameter in px (seal variant only). */
  sealSize?: number;
}

/**
 * The trust mark for approved consultants. Green is reserved for verification/success only.
 * @startingPoint section="Brand" subtitle="Verified pill & RFT seal" viewport="700x160"
 */
export function VerifiedBadge(props: VerifiedBadgeProps): JSX.Element;
