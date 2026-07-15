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

// ---------------------------------------------------------------------------
// DEMO outcome metrics (Decision #90, Cycle 1) — units sold over a rolling 12-month
// window + average time-to-sell in days, keyed by agentId.
//
// ⚠ DEMO — these are INVENTED illustrative values, NOT real. Phase 5 will source real
// close data (units sold + days-to-sell) from the commission / transaction record — the
// same open problem tracked in docs/RATING-ENGINE-NOTES. Surfaced in the UI with a muted
// "demo values" caption until then.
//
// Deliberately NOT correlated with the composite rating (composites in comments) so that a
// later cycle can show "the rating says one thing, volume/speed says another": e.g. Sofia
// (79) has the highest volume + fastest time; Maria (83) outsells Ana (92); Pedro (87) is
// the slowest. One aligned case (João: great + fast) keeps it realistic, not mechanically inverted.
// ---------------------------------------------------------------------------
export const demoOutcomeMetrics: Record<string, { unitsSold12mo: number; avgDaysToSell: number }> = {
  'c-ana-silva': { unitsSold12mo: 9, avgDaysToSell: 63 }, // composite 92 · luxury: few high-value deals, slow
  'c-joao-pereira': { unitsSold12mo: 21, avgDaysToSell: 34 }, // 92 · investment: high volume + fast (aligned)
  'c-catarina-ferreira': { unitsSold12mo: 14, avgDaysToSell: 41 }, // 87 · mid-pack
  'c-pedro-costa': { unitsSold12mo: 8, avgDaysToSell: 71 }, // 87 · luxury: lowest volume + slowest
  'c-maria-santos': { unitsSold12mo: 23, avgDaysToSell: 38 }, // 83 · first-time buyers: high volume despite lower rating
  'c-rui-oliveira': { unitsSold12mo: 11, avgDaysToSell: 58 }, // 82 · commercial: moderate
  'c-sofia-martins': { unitsSold12mo: 27, avgDaysToSell: 22 }, // 79 · rental: HIGHEST volume + FASTEST despite lowest established rating
  'c-miguel-rodrigues': { unitsSold12mo: 6, avgDaysToSell: 96 }, // 79 · new developments: long cycles, low volume
  // Rising Talent (<6 months) — small 12-month windows, consistent with recent join dates.
  'c-ines-carvalho': { unitsSold12mo: 5, avgDaysToSell: 44 }, // joined 2026-01
  'c-tiago-sousa': { unitsSold12mo: 4, avgDaysToSell: 39 }, // joined 2026-02
  'c-beatriz-almeida': { unitsSold12mo: 2, avgDaysToSell: 51 }, // joined 2026-03
  'c-diogo-fernandes': { unitsSold12mo: 1, avgDaysToSell: 68 }, // joined 2026-04 (newest)
}
