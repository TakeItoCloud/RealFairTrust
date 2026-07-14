'use client'

// PropertyGallery — main image + thumbnail strip, composing the shared MediaImage (which shows
// a Midnight Gold placeholder until real photos land in 4.5). Reduced-motion safe (only a CSS
// opacity fade in MediaImage), responsive, keyboard-operable thumbnails. Composition only —
// MediaImage is unchanged.
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { MediaImage } from '@/components/MediaImage'

export function PropertyGallery({ media, alt }: { media: string[]; alt: string }) {
  const images = media.length > 0 ? media : [undefined]
  const [active, setActive] = useState(0)
  const current = images[Math.min(active, images.length - 1)]

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line">
        <MediaImage src={current} alt={alt} />
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-3" aria-label={alt}>
          {images.map((m, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                aria-label={`${alt} — ${i + 1}/${images.length}`}
                className={cn(
                  'relative block aspect-[4/3] w-full overflow-hidden rounded-md border transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-border)]',
                  i === active ? 'border-[var(--gold-border)]' : 'border-line hover:border-[var(--gold-border-soft)]',
                )}
              >
                <MediaImage src={m} alt="" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
