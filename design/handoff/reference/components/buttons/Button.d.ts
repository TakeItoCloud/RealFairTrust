import { ReactNode, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. `primary` = calm gold gradient CTA. */
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Set true when the button sits on the warm ivory section. */
  onIvory?: boolean;
  /** Stretch to fill the container width. */
  block?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
}

/**
 * The primary call-to-action. Calm gold gradient on the navy stage; pill shape.
 * @startingPoint section="Core" subtitle="Calm-gold CTA with variants & sizes" viewport="700x200"
 */
export function Button(props: ButtonProps): JSX.Element;
