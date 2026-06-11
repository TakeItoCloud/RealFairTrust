// Minimal className combiner — filters falsy values and joins with a space.
// Kept dependency-free; primitives control their own class order to avoid conflicts.
export type ClassValue = string | false | null | undefined

export function cn(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(' ')
}
