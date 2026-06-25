'use client'

// HeroMedia — the full-bleed cinematic hero media (Home handoff RH3b, README §3.2/§3.3c).
// A muted autoplay loop <video> on desktop over a Ken-Burns poster <img>; a legibility scrim +
// a ~230px bottom fade into the navy stage; and the Real/Fair/Trust brand reveal lower-right
// (gold word + cream phrase, crossfading every `interval`, starting after `startDelay`). The whole
// media layer is decorative (aria-hidden) — the accessible hero message lives in HeroFullBleed's
// headline. Bleed variant only (the contained-panel mode stays in the design reference). #37.
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

export interface HeroBeat {
  word: string
  phrase: string
}

export function HeroMedia({
  poster = '/images/hero-poster.jpg',
  beats,
  interval = 3000,
  startDelay = 0,
}: {
  poster?: string
  beats: HeroBeat[]
  interval?: number
  startDelay?: number
}) {
  const reduce = useReducedMotion()
  // Defer the heavy video so the poster + headline paint first; desktop-only + not reduced-motion.
  const [mountVideo, setMountVideo] = useState(false)
  const [i, setI] = useState(0)
  const [started, setStarted] = useState(startDelay <= 0)

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined' || !window.matchMedia?.('(min-width: 761px)').matches) return
    // Defer to the next frame so the poster + headline paint before the video mounts/loads.
    const raf = requestAnimationFrame(() => setMountVideo(true))
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  useEffect(() => {
    if (reduce || startDelay <= 0) return
    const to = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(to)
  }, [reduce, startDelay])

  useEffect(() => {
    if (reduce || beats.length < 2 || !started) return
    const t = setInterval(() => setI((p) => (p + 1) % beats.length), interval)
    return () => clearInterval(t)
  }, [reduce, beats.length, interval, started])

  return (
    <div className="rfthm rfthm--bleed rfthm--hasvideo" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative cover poster; next/image in 4.5 */}
      <img className="rfthm__img" src={poster} alt="" />
      {mountVideo ? (
        <video className="rfthm__video" poster={poster} autoPlay muted loop playsInline preload="none">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="rfthm__scrim" />
      <div className="rfthm__edge" />
      <div className="rfthm__bottomfade" />
      <div className="rfthm__beats">
        {beats.map((b, idx) => (
          <div key={b.word} className={cn('rfthm__beat', started && idx === i && 'rfthm__beat--on')}>
            <span className="rfthm__word">{b.word}</span>
            <span className="rfthm__phrase">{b.phrase}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
