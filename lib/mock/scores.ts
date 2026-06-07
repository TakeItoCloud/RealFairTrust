// Seed performance scores — one current-period score per consultant.
// Composite is computed from RATING_WEIGHTS (Decision #16) so fixtures stay consistent
// with the real engine. Ranks are assigned per region across the ranked board
// (established consultants); Rising Talent sit on their own board with rank = null.
import type { PerformanceScore, PerformanceSubScores } from '@/lib/types'
import { RATING_WEIGHTS } from '@/lib/types'

const PERIOD_MONTH = '2026-06'
const WINDOW_START = '2026-03-09'
const WINDOW_END = '2026-06-07'

function composite(sub: PerformanceSubScores): number {
  const w = RATING_WEIGHTS
  return Math.round(
    sub.satisfaction * w.satisfaction +
      sub.closeRate * w.closeRate +
      sub.responsiveness * w.responsiveness +
      sub.conversion * w.conversion +
      sub.activity * w.activity,
  )
}

/** < 8 opportunities → "building track record" (number hidden, Decision #18). */
function confidenceFor(sampleSize: number): PerformanceScore['confidence'] {
  if (sampleSize < 8) return 'low'
  if (sampleSize < 15) return 'medium'
  return 'high'
}

interface ScoreSeed {
  agentId: string
  regionId: string
  sub: PerformanceSubScores
  sampleSize: number
  risingTalent: boolean
}

const seeds: ScoreSeed[] = [
  // Lisboa — established
  { agentId: 'c-ana-silva', regionId: 'reg-lisboa', sub: { satisfaction: 96, closeRate: 90, responsiveness: 92, conversion: 88, activity: 85 }, sampleSize: 34, risingTalent: false },
  { agentId: 'c-catarina-ferreira', regionId: 'reg-lisboa', sub: { satisfaction: 92, closeRate: 84, responsiveness: 88, conversion: 82, activity: 80 }, sampleSize: 22, risingTalent: false },
  { agentId: 'c-maria-santos', regionId: 'reg-lisboa', sub: { satisfaction: 88, closeRate: 80, responsiveness: 85, conversion: 78, activity: 76 }, sampleSize: 19, risingTalent: false },
  { agentId: 'c-sofia-martins', regionId: 'reg-lisboa', sub: { satisfaction: 84, closeRate: 76, responsiveness: 82, conversion: 74, activity: 72 }, sampleSize: 16, risingTalent: false },
  // Porto — established
  { agentId: 'c-joao-pereira', regionId: 'reg-porto', sub: { satisfaction: 95, closeRate: 92, responsiveness: 90, conversion: 90, activity: 88 }, sampleSize: 38, risingTalent: false },
  { agentId: 'c-pedro-costa', regionId: 'reg-porto', sub: { satisfaction: 90, closeRate: 86, responsiveness: 84, conversion: 85, activity: 82 }, sampleSize: 24, risingTalent: false },
  { agentId: 'c-rui-oliveira', regionId: 'reg-porto', sub: { satisfaction: 86, closeRate: 82, responsiveness: 80, conversion: 80, activity: 78 }, sampleSize: 20, risingTalent: false },
  { agentId: 'c-miguel-rodrigues', regionId: 'reg-porto', sub: { satisfaction: 82, closeRate: 78, responsiveness: 79, conversion: 76, activity: 74 }, sampleSize: 15, risingTalent: false },
  // Rising Talent — low/medium sample
  { agentId: 'c-ines-carvalho', regionId: 'reg-lisboa', sub: { satisfaction: 88, closeRate: 74, responsiveness: 84, conversion: 76, activity: 68 }, sampleSize: 9, risingTalent: true },
  { agentId: 'c-beatriz-almeida', regionId: 'reg-lisboa', sub: { satisfaction: 90, closeRate: 70, responsiveness: 88, conversion: 72, activity: 60 }, sampleSize: 4, risingTalent: true },
  { agentId: 'c-tiago-sousa', regionId: 'reg-porto', sub: { satisfaction: 86, closeRate: 68, responsiveness: 82, conversion: 70, activity: 58 }, sampleSize: 6, risingTalent: true },
  { agentId: 'c-diogo-fernandes', regionId: 'reg-porto', sub: { satisfaction: 84, closeRate: 64, responsiveness: 80, conversion: 66, activity: 55 }, sampleSize: 3, risingTalent: true },
]

// Build scores, then assign ranks per region among the ranked board (non-rising).
function buildScores(): PerformanceScore[] {
  const withComposite = seeds.map((s) => ({
    ...s,
    composite: composite(s.sub),
    confidence: confidenceFor(s.sampleSize),
  }))

  const rankByAgent = new Map<string, number>()
  for (const regionId of ['reg-lisboa', 'reg-porto']) {
    withComposite
      .filter((s) => s.regionId === regionId && !s.risingTalent)
      .sort((a, b) => b.composite - a.composite)
      .forEach((s, i) => rankByAgent.set(s.agentId, i + 1))
  }

  return withComposite.map((s) => ({
    id: `score-${s.agentId}`,
    agentId: s.agentId,
    periodMonth: PERIOD_MONTH,
    windowStart: WINDOW_START,
    windowEnd: WINDOW_END,
    sub: s.sub,
    composite: s.composite,
    rank: s.risingTalent ? null : (rankByAgent.get(s.agentId) ?? null),
    regionId: s.regionId,
    risingTalent: s.risingTalent,
    sampleSize: s.sampleSize,
    confidence: s.confidence,
  }))
}

export const scores: PerformanceScore[] = buildScores()
