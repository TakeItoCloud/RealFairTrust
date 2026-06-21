export interface LogoProps {
  /** `full` = mark + wordmark; `mark` = roofline-check only; `wordmark` = text only. */
  variant?: "full" | "mark" | "wordmark";
  /** Wordmark font-size in px (mark scales with it). */
  size?: number;
  /** Show the uppercase tagline under the wordmark (full variant only). */
  tagline?: boolean;
  taglineText?: string;
  /** Set true on the ivory light section so the wordmark stays legible. */
  onIvory?: boolean;
}

/**
 * The RealFairTrust lockup: roofline-check mark + wordmark with "Fair" in bright gold.
 * @startingPoint section="Brand" subtitle="Logo lockup, mark & wordmark" viewport="700x160"
 */
export function Logo(props: LogoProps): JSX.Element;
