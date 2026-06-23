import { ReactNode, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** `featured` = gold hairline + glow; `ivory` = light-section surface. */
  variant?: "default" | "raised" | "featured" | "ivory";
  /** Inner padding in px or a CSS string. */
  padding?: number | string;
  children?: ReactNode;
}

/**
 * The base surface that floats content on the navy stage.
 * @startingPoint section="Core" subtitle="Surface card with variants" viewport="700x240"
 */
export function Card(props: CardProps): JSX.Element;
