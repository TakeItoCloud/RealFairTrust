// UI primitives barrel (milestone 4.1; design-apply Step 3 adds the hand-off primitives).
export { Button } from './Button'
export { Eyebrow } from './Eyebrow'
export { SectionWrapper } from './SectionWrapper'
export { Input } from './Input'
export { Textarea } from './Textarea'
export { Select } from './Select'
export type { SelectOption } from './Select'
export { StarRating } from './StarRating'
export { VerifiedBadge } from './VerifiedBadge'
export { Skeleton } from './Skeleton'
export { EmptyState } from './EmptyState'
export { Avatar } from './Avatar'
// Hand-off primitives (Step 3) — Card · StatBlock · RankBadge · Badge · Tag:
export { Card } from './Card'
export { StatBlock } from './StatBlock'
export { RankBadge } from './RankBadge'
export { Badge } from './Badge'
export { Tag } from './Tag'
// Retained — the numeric #18 score reveal (top/building/score), still used by ScoreBreakdown +
// the profile header. RisingTalentTag/RankIndicator/StatTile were retired in Step 4 (superseded
// by Badge/RankBadge/StatBlock; zero importers remained).
export { PerformanceBadge } from './PerformanceBadge'
