function useStyleOnce(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const CSS = `
@keyframes rfthm-kenburns{ 0%{ transform:scale(1.02); } 100%{ transform:scale(1.13); } }
.rfthm{ position:relative; width:100%; height:100%; overflow:hidden; isolation:isolate; }
.rfthm--panel{ border-radius:var(--card-radius); border:1px solid var(--hairline-strong);
  box-shadow:inset 0 1px 0 rgba(245,241,234,0.08), var(--shadow-raised); }
.rfthm--bleed{ border-radius:0; }
.rfthm__img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;
  animation:rfthm-kenburns 22s var(--ease-in-out) infinite alternate; transform-origin:60% 40%; }
.rfthm__video{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:none; }
@media (min-width:761px){ .rfthm--hasvideo .rfthm__video{ display:block; } }
.rfthm__scrim{ position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(180deg, rgba(2,8,18,0.30) 0%, rgba(2,8,18,0.12) 36%, rgba(2,8,18,0.56) 70%, rgba(2,8,18,0.90) 100%); }
.rfthm--bleed .rfthm__scrim{
  background:linear-gradient(180deg, rgba(2,8,18,0.80) 0%, rgba(2,8,18,0.30) 32%, rgba(2,8,18,0.34) 58%, rgba(2,8,18,0.88) 100%); }
.rfthm__edge{ position:absolute; inset:0; pointer-events:none; box-shadow:inset 0 0 120px 10px rgba(2,8,18,0.45); }
.rfthm__eyebrow{ position:absolute; left:34px; top:30px; font-family:var(--font-body); font-size:11px; font-weight:var(--fw-semibold);
  letter-spacing:0.22em; text-transform:uppercase; color:var(--gold-300); display:inline-flex; align-items:center; gap:9px; }
.rfthm__eyebrow::before{ content:""; width:7px; height:7px; border-radius:50%; background:var(--gold-300); box-shadow:0 0 12px rgba(255,216,110,0.8); }

.rfthm__beats{ position:absolute; left:34px; right:34px; bottom:34px; height:120px; }
.rfthm__beats::before{ content:""; position:absolute; inset:-26px -30px -22px -30px; border-radius:22px; pointer-events:none;
  background:radial-gradient(125% 135% at 8% 92%, rgba(2,8,18,0.72) 0%, rgba(2,8,18,0.42) 38%, rgba(2,8,18,0) 75%); }
.rfthm__beat{ position:absolute; left:0; right:0; bottom:0; display:flex; flex-direction:column; gap:11px;
  opacity:0; transform:translateY(16px); transition:opacity 1000ms var(--ease-out), transform 1000ms var(--ease-out); }
.rfthm__beat--on{ opacity:1; transform:translateY(0); }
.rfthm__word{ width:max-content; font-family:var(--font-display); font-weight:var(--fw-semibold); font-size:48px; line-height:1; letter-spacing:var(--ls-tight);
  background:var(--gradient-gold-title); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent;
  filter:drop-shadow(0 2px 22px rgba(255,216,110,0.30)); }
.rfthm__phrase{ font-family:var(--font-body); font-size:19px; font-weight:var(--fw-medium); color:var(--wordmark-cream); line-height:1.3;
  text-shadow:0 2px 20px rgba(2,8,18,0.78);
  opacity:0; transform:translateY(8px); transition:opacity 900ms var(--ease-out) 240ms, transform 900ms var(--ease-out) 240ms; }
.rfthm__beat--on .rfthm__phrase{ opacity:1; transform:translateY(0); }
.rfthm--bleed .rfthm__eyebrow{ display:none; }
.rfthm--bleed .rfthm__beats{ right:54px; left:auto; bottom:84px; width:min(46%,520px); height:140px; }
.rfthm--bleed .rfthm__beats::before{ background:radial-gradient(130% 142% at 92% 92%, rgba(2,8,18,0.84) 0%, rgba(2,8,18,0.52) 40%, rgba(2,8,18,0) 78%); }
.rfthm--bleed .rfthm__beat{ align-items:flex-end; text-align:right; }
.rfthm--bleed .rfthm__word{ font-size:56px; }
.rfthm--bleed .rfthm__phrase{ font-size:21px; }
.rfthm__bottomfade{ display:none; }
.rfthm--bleed .rfthm__bottomfade{ display:block; position:absolute; left:0; right:0; bottom:0; height:230px; pointer-events:none;
  background:linear-gradient(180deg, rgba(8,24,48,0) 0%, rgba(8,24,48,0.5) 52%, #060f22 100%); }

@media (prefers-reduced-motion: reduce){
  .rfthm__img{ animation:none; transform:scale(1.04); }
  .rfthm__beats{ height:auto; bottom:30px; display:flex; flex-direction:column; gap:18px; }
  .rfthm__beat{ position:static; opacity:1; transform:none; }
  .rfthm__word{ font-size:32px; }
  .rfthm__phrase{ opacity:1; transform:none; transition:none; font-size:17px; }
}
`;

/**
 * HeroMedia — the RealFairTrust hero media panel. A muted looping video
 * (desktop) over a slow Ken-Burns poster (mobile / poster fallback), under a
 * dark scrim. A calm three-beat brand reveal cycles over it: each beat shows
 * a brand word in the gold gradient, then its phrase fades in beneath in cream.
 *
 * Beats are passed as children, one element per beat, with the brand word in
 * `data-word` and the phrase as the element's text:
 *   <div data-word="Real">Pessoas antes de imóveis.</div>
 *
 * Reduced motion: the three beats render as static stacked lines (no cycling,
 * no zoom). The `bleed` variant hides the beats (headline is overlaid instead).
 */
function HeroMedia({
  poster = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  videoSrc = "https://cdn.coverr.co/videos/coverr-the-glass-facade-of-a-modern-building-2940/1080p.mp4",
  variant = "panel", // "panel" | "bleed"
  eyebrow = "A nossa promessa",
  interval = 3000,
  startDelay = 0,
  children,
}) {
  useStyleOnce("rft-heromedia", CSS);
  const beats = React.Children.toArray(children).filter(
    (c) => c && c.props && (c.props["data-word"] || c.props.word)
  );
  const [i, setI] = React.useState(0);
  const reduce = typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // The brand-beat loop holds until the hero entrance has finished.
  const [started, setStarted] = React.useState(startDelay <= 0);

  React.useEffect(() => {
    if (reduce || startDelay <= 0) return;
    const to = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(to);
  }, [reduce, startDelay]);

  React.useEffect(() => {
    if (reduce || beats.length < 2 || !started) return;
    const t = setInterval(() => setI((p) => (p + 1) % beats.length), interval);
    return () => clearInterval(t);
  }, [beats.length, interval, reduce, started]);

  const bleed = variant === "bleed";
  return (
    <div className={`rfthm rfthm--${bleed ? "bleed" : "panel"} ${videoSrc ? "rfthm--hasvideo" : ""}`}>
      <img className="rfthm__img" src={poster} alt="" />
      {videoSrc && (
        <video className="rfthm__video" src={videoSrc} poster={poster} autoPlay muted loop playsInline preload="metadata" />
      )}
      <div className="rfthm__scrim"></div>
      <div className="rfthm__edge"></div>
      <div className="rfthm__bottomfade"></div>
      {!bleed && <span className="rfthm__eyebrow">{eyebrow}</span>}
      <div className="rfthm__beats">
        {beats.map((child, idx) => {
          const word = (child.props && (child.props["data-word"] || child.props.word)) || "";
          const phrase = child.props ? child.props.children : null;
          return (
            <div key={idx} className={`rfthm__beat ${started && idx === i ? "rfthm__beat--on" : ""}`}>
              <span className="rfthm__word">{word}</span>
              <span className="rfthm__phrase">{phrase}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

if (typeof module !== "undefined" && module.exports) module.exports = { HeroMedia };
if (typeof window !== "undefined") window.HeroMedia = HeroMedia;
