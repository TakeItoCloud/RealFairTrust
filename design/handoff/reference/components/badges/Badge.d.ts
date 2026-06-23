import { ReactNode } from "react";

export interface BadgeProps {
  /** `gold` = merit/standing, `rising` = Rising Talent, `success` = verified, `neutral` = metadata. */
  variant?: "gold" | "rising" | "success" | "neutral";
  iconLeft?: ReactNode;
  children?: ReactNode;
}

/** A small status chip — agent standing, verification, or quiet metadata. */
export function Badge(props: BadgeProps): JSX.Element;
