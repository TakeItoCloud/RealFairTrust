'use client'

// Renders every milestone 4.1 primitive in its states, on dark and light surfaces,
// so the whole kit can be reviewed on one page. Labels here are literal (dev-only).
import { useState } from 'react'
import {
  Avatar,
  Button,
  EmptyState,
  Eyebrow,
  Input,
  PerformanceBadge,
  RankIndicator,
  RisingTalentTag,
  Select,
  Skeleton,
  StarRating,
  StatTile,
  Textarea,
  VerifiedBadge,
} from '@/components/ui'

function Group({ title, children, light }: { title: string; children: React.ReactNode; light?: boolean }) {
  return (
    <section className="space-y-4">
      <h2 className={light ? 'text-ink-on-light' : 'text-cream'}>{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

const cityOptions = [
  { value: 'reg-lisboa', label: 'Lisboa' },
  { value: 'reg-porto', label: 'Porto' },
  { value: 'reg-chiado', label: 'Chiado' },
  { value: 'reg-foz', label: 'Foz do Douro' },
]

export function Showcase() {
  const [loading, setLoading] = useState(false)
  const [stars, setStars] = useState(3)
  const [city, setCity] = useState<string>()

  return (
    <main className="min-h-screen bg-ink text-cream">
      <div className="container-page space-y-16 py-12">
        <header className="space-y-2">
          <Eyebrow>Dev only · not in nav</Eyebrow>
          <h1 className="text-cream">UI Primitives — Milestone 4.1</h1>
          <p className="text-cream-muted">Every primitive, every state. Midnight Gold, theme tokens only.</p>
        </header>

        {/* Buttons */}
        <Group title="Button — variants × sizes">
          <Button variant="primary" size="sm">Primary sm</Button>
          <Button variant="primary" size="md">Primary md</Button>
          <Button variant="primary" size="lg">Primary lg</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500) }}>
            {loading ? 'Loading…' : 'Click to load'}
          </Button>
        </Group>

        {/* Inputs */}
        <Group title="Input · Textarea · Select">
          <div className="w-64 space-y-3">
            <Input placeholder="Normal input" aria-label="Normal input" />
            <Input placeholder="Invalid" aria-invalid aria-label="Invalid input" />
            <Input placeholder="Disabled" disabled aria-label="Disabled input" />
          </div>
          <div className="w-64 space-y-3">
            <Textarea placeholder="Message…" aria-label="Message" />
            <Textarea placeholder="Invalid" aria-invalid aria-label="Invalid textarea" />
          </div>
          <div className="w-64 space-y-3">
            <Select options={cityOptions} value={city} onValueChange={setCity} placeholder="Select a region" aria-label="Region" />
            <Select options={cityOptions} invalid placeholder="Invalid select" aria-label="Invalid select" />
            <Select options={cityOptions} disabled placeholder="Disabled" aria-label="Disabled select" />
          </div>
        </Group>

        {/* StarRating */}
        <Group title="StarRating — read-only & interactive">
          <StarRating value={4.5} label="Average rating" />
          <StarRating value={3} label="Rating" />
          <StarRating value={0} label="No rating" />
          <div className="flex items-center gap-3">
            <StarRating value={stars} onChange={setStars} label="Your rating" size="lg" />
            <span className="text-cream-muted text-sm">{stars} / 5</span>
          </div>
        </Group>

        {/* Badges */}
        <Group title="Performance · Verified · Rising Talent · Rank">
          <PerformanceBadge variant="top" label="Top this month" />
          <PerformanceBadge variant="building" label="Building track record" />
          <PerformanceBadge variant="score" label="Composite score" value={92} />
          <VerifiedBadge label="Verified" />
          <VerifiedBadge label="Verified" iconOnly />
          <RisingTalentTag label="Rising Talent" />
          <RankIndicator rank={1} label="Rank" />
          <RankIndicator rank={2} label="Rank" />
          <RankIndicator rank={3} label="Rank" />
          <RankIndicator rank={7} label="Rank" />
        </Group>

        {/* Avatars */}
        <Group title="Avatar — image fallback to initials">
          <Avatar name="Ana Silva" src="/images/consultants/ana-silva.jpg" size="xl" />
          <Avatar name="João Pereira" size="lg" />
          <Avatar name="Maria Santos" size="md" />
          <Avatar name="Rui" size="sm" />
        </Group>

        {/* StatTiles */}
        <Group title="StatTile">
          <StatTile label="Close rate" value="90%" sub="vs target 80%" className="w-44" />
          <StatTile label="Response time" value="1.2h" sub="median" className="w-44" />
          <StatTile label="Satisfaction" value="96" sub="/ 100" className="w-44" />
        </Group>

        {/* Skeletons */}
        <Group title="Skeleton">
          <div className="w-64 space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="rect" className="h-24" />
          </div>
          <Skeleton variant="circle" className="h-16 w-16" />
        </Group>

        {/* EmptyState */}
        <Group title="EmptyState">
          <div className="w-80">
            <EmptyState
              title="No reviews yet"
              description="This consultant is building their track record."
              action={<Button variant="secondary" size="sm">Be the first</Button>}
            />
          </div>
        </Group>

        {/* Light surface panel */}
        <section className="rounded-lg bg-warm p-8 text-ink-on-light">
          <Eyebrow tone="light">Light surface</Eyebrow>
          <h2 className="mb-6 text-ink-on-light">Warm content variants</h2>
          <div className="flex flex-wrap items-start gap-4">
            <Button variant="primary" onLight>Primary</Button>
            <Button variant="secondary" onLight>Secondary</Button>
            <Button variant="ghost" onLight>Ghost</Button>
            <Input placeholder="Light input" onLight aria-label="Light input" className="w-56" />
            <Select options={cityOptions} onLight placeholder="Light select" aria-label="Light select" className="w-56" />
            <VerifiedBadge label="Verified" tone="light" />
            <RisingTalentTag label="Rising Talent" tone="light" />
            <RankIndicator rank={4} label="Rank" tone="light" />
            <PerformanceBadge variant="building" label="Building track record" tone="light" />
            <StatTile label="Close rate" value="84%" tone="light" className="w-44" />
          </div>
          <div className="mt-6 w-80">
            <EmptyState tone="light" title="No listings yet" description="Demo data only during pre-launch." />
          </div>
        </section>
      </div>
    </main>
  )
}
