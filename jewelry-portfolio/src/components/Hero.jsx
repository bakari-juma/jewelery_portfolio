import { content } from '../data/content'
import '../styles/hero.css'

export function Hero() {
  const hero = content.hero
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-sheen" aria-hidden="true" />
      <div className="hero-inner page-width">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" />{hero.eyebrow}</p>
          <p className="hero-name">{hero.name}</p>
          <h1 id="hero-title">{hero.headline}</h1>
          <p className="hero-intro">{hero.intro}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">{hero.primaryAction}<span aria-hidden="true">↗</span></a>
            <a className="button button-quiet" href="#contact">{hero.secondaryAction}<span aria-hidden="true">↗</span></a>
          </div>
          <p className="hero-availability"><span className="availability-dot" />{hero.availability}</p>
        </div>
        <div className="hero-art-wrap" aria-label={hero.visualCaption} role="img">
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-jewel" aria-hidden="true">
            <span className="jewel-chain" />
            <span className="jewel-ring" />
            <span className="jewel-stone" />
            <span className="jewel-glint" />
          </div>
          <span className="hero-art-note">{hero.visualCaption}</span>
          <span className="hero-index" aria-hidden="true">01 / 06</span>
        </div>
      </div>
      <a className="hero-scroll" href="#workflow"><span aria-hidden="true" />Scroll to explore</a>
    </section>
  )
}
