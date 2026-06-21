import { ReactNode } from "react";

export interface StatBlockProps {
  value: ReactNode;
  label: string;
  /** Signed delta, e.g. "+4%". Positive renders verified-green. */
  delta?: string;
  /** Render the value in the bright gold gradient (use for the headline metric). */
  gold?: boolean;
  align?: "left" | "center";
}

/** A single performance metric — the building block of agent / rating surfaces. */
export function StatBlock(props: StatBlockProps): JSX.Element;
