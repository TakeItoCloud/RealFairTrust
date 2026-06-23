import { ReactNode } from "react";

export interface TagProps {
  /** Set true on the ivory light section. */
  onIvory?: boolean;
  children?: ReactNode;
}

/** A quiet outline chip for metadata: specializations, zones, deal type. */
export function Tag(props: TagProps): JSX.Element;
