export interface AvatarProps {
  src?: string;
  /** Used for the initials fallback and alt text. */
  name?: string;
  size?: number;
  /** Gold ring — reserve for featured / top-ranked consultants. */
  ring?: boolean;
}

/** A circular consultant portrait with an initials fallback and optional gold ring. */
export function Avatar(props: AvatarProps): JSX.Element;
