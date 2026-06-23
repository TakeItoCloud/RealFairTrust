'use client'

// Renders every milestone 4.1 primitive in its states, on dark and light surfaces,
// so the whole kit can be reviewed on one page. Labels here are literal (dev-only).
import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Eyebrow,
  Input,
  PerformanceBadge,
  RankBadge,
  Select,
  Skeleton,
  StarRating,
  StatBlock,
  Tag,
  Textarea,
  VerifiedBadge,
} from '@/components/ui'
import { IconSparkUp, IconTrophy } from '@/components/ui/icons'

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

        {/* PerformanceBadge (retained — the numeric #18 score reveal + top/building pills) */}
        <Group title="PerformanceBadge — top · building · score (#18)">
          <PerformanceBadge variant="top" label="Top this month" />
          <PerformanceBadge variant="building" label="Building track record" />
          <PerformanceBadge variant="score" label="Composite score" value={92} />
        </Group>

        {/* Avatars */}
        <Group title="Avatar — image fallback to initials (+ gold-gradient ring)">
          <Avatar name="Ana Silva" src="/images/consultants/ana-silva.jpg" size="xl" />
          <Avatar name="João Pereira" size="lg" />
          <Avatar name="Maria Santos" size="md" />
          <Avatar name="Rui" size="sm" />
          <Avatar name="Ana Silva" size="lg" ring />
          <Avatar name="João Pereira" size="md" ring />
        </Group>

        {/* ---- Hand-off primitives (design-apply Step 3) ---- */}
        <Group title="Badge — gold · rising · success · neutral (unified)">
          <Badge variant="gold" iconLeft={<IconTrophy />}>Top deste mês</Badge>
          <Badge variant="rising" iconLeft={<IconSparkUp />}>Rising Talent</Badge>
          <Badge variant="success">Verificado</Badge>
          <Badge variant="neutral">Building track record</Badge>
        </Group>

        <Group title="RankBadge — coin (1–3 gold + glow, 4+ neutral)">
          <RankBadge rank={1} label="Rank" />
          <RankBadge rank={2} label="Rank" />
          <RankBadge rank={3} label="Rank" />
          <RankBadge rank={7} label="Rank" />
          <RankBadge rank={1} label="Rank" size={56} />
        </Group>

        <Group title="Tag — quiet outline chips">
          <Tag>Compra</Tag>
          <Tag>Arrendamento</Tag>
          <Tag>Investimento</Tag>
        </Group>

        <Group title="StatBlock — metric primitive (gold headline + delta)">
          <StatBlock value="92" label="Mérito · 90d" gold />
          <StatBlock value="90%" label="Taxa de fecho" delta="+4%" />
          <StatBlock value="1.2h" label="Resposta" delta="-12%" align="end" />
        </Group>

        <Group title="VerifiedBadge — pill & seal">
          <VerifiedBadge label="Verificado" />
          <VerifiedBadge label="Verificado" iconOnly />
          <VerifiedBadge variant="seal" label="Verificado" />
          <VerifiedBadge variant="seal" label="Verificado" sealSize={88} />
        </Group>

        <Group title="Card — default · raised · featured · ivory">
          <Card className="w-60">
            <p className="font-display text-cream">Default card</p>
            <p className="mt-1 text-meta text-cream-muted">Hairline + shadow-card; frost wired (inert).</p>
          </Card>
          <Card variant="raised" className="w-60">
            <p className="font-display text-cream">Raised card</p>
            <p className="mt-1 text-meta text-cream-muted">shadow-raised.</p>
          </Card>
          <Card variant="featured" className="w-60">
            <p className="font-display text-cream">Featured card</p>
            <p className="mt-1 text-meta text-cream-muted">Gold hairline + gold glow.</p>
          </Card>
          <Card variant="ivory" className="w-60">
            <p className="font-display">Ivory card</p>
            <p className="mt-1 text-meta text-[var(--text-ink-muted)]">Light-section surface + navy ink.</p>
          </Card>
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
            <PerformanceBadge variant="building" label="Building track record" tone="light" />
            <Badge variant="rising" onIvory iconLeft={<IconSparkUp />}>Rising Talent</Badge>
            <Badge variant="gold" onIvory iconLeft={<IconTrophy />}>Top deste mês</Badge>
            <Badge variant="success" onIvory>Verificado</Badge>
            <Badge variant="neutral" onIvory>Building</Badge>
            <Tag onIvory>Compra</Tag>
          </div>
          <div className="mt-6 w-80">
            <EmptyState tone="light" title="No listings yet" description="Demo data only during pre-launch." />
          </div>
        </section>
      </div>
    </main>
  )
}
