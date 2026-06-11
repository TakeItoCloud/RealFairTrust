// Small inline icon set — avoids pulling in an icon library for the few glyphs the
// primitives need. All inherit `currentColor` and accept standard SVG props.
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
  focusable: false,
} as const

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Shield with a check — used by the Verified badge. */
export function IconVerified(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 4.5 5.5v5.2c0 4.3 3 8.3 7.5 9.8 4.5-1.5 7.5-5.5 7.5-9.8V5.5L12 2.5Z" fill="currentColor" opacity="0.16" />
      <path d="M12 2.5 4.5 5.5v5.2c0 4.3 3 8.3 7.5 9.8 4.5-1.5 7.5-5.5 7.5-9.8V5.5L12 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconStar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Upward spark — Rising Talent. */
export function IconSparkUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v8m0 0 3.2-3.2M12 11 8.8 7.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m18.5 14.5.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9ZM5 13l.5 1.4L7 15l-1.5.6L5 17l-.5-1.4L3 15l1.5-.6L5 13Z" fill="currentColor" />
    </svg>
  )
}

export function IconTrophy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 5H4.5v1.5A2.5 2.5 0 0 0 7 9M17 5h2.5v1.5A2.5 2.5 0 0 1 17 9M9.5 12.5h5M10 20h4M12 14v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconInbox(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 13.5 6 6.2A2 2 0 0 1 7.9 5h8.2A2 2 0 0 1 18 6.2l2.5 7.3V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18v-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3.5 13.5H8a1 1 0 0 1 1 1 1.5 1.5 0 0 0 1.5 1.5h3A1.5 1.5 0 0 0 15 14.5a1 1 0 0 1 1-1h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Spinner ring — pair with `motion-safe:animate-spin`. */
export function IconSpinner(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
