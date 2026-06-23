import { ReactNode, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional field label rendered above the input. */
  label?: string;
  /** Leading icon (e.g. a search glyph). */
  iconLeft?: ReactNode;
}

/** A single-line text field — inset on the navy stage with a gold focus ring. */
export function Input(props: InputProps): JSX.Element;
