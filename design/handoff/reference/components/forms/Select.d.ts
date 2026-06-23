import { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Options as strings or {value,label} objects. */
  options?: (string | SelectOption)[];
}

/** A styled native dropdown — the workhorse of discovery filters. */
export function Select(props: SelectProps): JSX.Element;
