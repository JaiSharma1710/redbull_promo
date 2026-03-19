import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { drinks } from '../siteData.js'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function lerp(start, end, progress) {
  return start + (end - start) * progress
}

export function DrinksPage() {
  const journeyRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const updateProgress = useEffectEvent(() => {
    const node = journeyRef.current
    if (!node) {
      return
    }

    const rect = node.getBoundingClientRect()
    const viewport = window.innerHeight
    const total = Math.max(node.offsetHeight - viewport, 1)
    const distance = clamp(-rect.top, 0, total)

    setProgress(distance / total)
  })

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  const segment = progress * (drinks.length - 1)
  const activeIndex = Math.round(segment)
  const baseIndex = Math.floor(segment)
  const nextIndex = Math.min(baseIndex + 1, drinks.length - 1)
  const localProgress = segment - baseIndex

  const currentStage = drinks[baseIndex].stage
  const nextStage = drinks[nextIndex].stage

  const stage = {
    x: lerp(currentStage.x, nextStage.x, localProgress),
    y: lerp(currentStage.y, nextStage.y, localProgress),
    scale: lerp(currentStage.scale, nextStage.scale, localProgress),
    rotate: lerp(currentStage.rotate, nextStage.rotate, localProgress),
  }

  return (
    <main className="page page-drinks">
      <section className="drinks-intro">
        <div className="drinks-intro__copy">
          <p className="eyebrow">Energy Drinks</p>
          <h1>Scroll the can through the lineup.</h1>
          <p>
            This route is designed as the high-impact product page. The can
            stays pinned while sections slide underneath it, shifting position,
            scale, rotation, and flavor as the page moves.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#journey">
              Start scrolling
            </a>
            <Link className="button-secondary" to="/">
              Back to home
            </Link>
          </div>
        </div>

        <div className="drinks-intro__badge">
          <span>{`0${activeIndex + 1}`}</span>
          <p>Active flavor</p>
          <h2>{drinks[activeIndex].shortLabel}</h2>
        </div>
      </section>

      <section className="can-journey" id="journey" ref={journeyRef}>
        <div className="can-journey__sticky">
          <div
            className="can-journey__backdrop"
            style={{ backgroundColor: drinks[activeIndex].surface }}
          />

          <div className="can-journey__visual">
            <div
              className="can-journey__visual-inner"
              style={{
                transform: `translate(${stage.x}%, ${stage.y}%) scale(${stage.scale}) rotate(${stage.rotate}deg)`,
              }}
            >
              {drinks.map((drink, index) => {
                const opacity = clamp(1 - Math.abs(segment - index) * 1.35, 0, 1)

                return (
                  <img
                    key={drink.id}
                    className="journey-can"
                    src={drink.image}
                    alt={drink.name}
                    style={{ opacity }}
                  />
                )
              })}
            </div>
          </div>

          <div className="can-journey__rail" aria-hidden="true">
            {drinks.map((drink, index) => (
              <span
                className={index === activeIndex ? 'is-active' : ''}
                key={drink.id}
              />
            ))}
          </div>

          <div className="can-journey__sections">
            {drinks.map((drink, index) => (
              <article
                className={`journey-panel ${index % 2 === 0 ? '' : 'journey-panel--right'}`}
                key={drink.id}
              >
                <div
                  className="journey-panel__card"
                  style={{
                    backgroundColor: drink.surface,
                    color: drink.text,
                    borderColor: `${drink.accent}55`,
                  }}
                >
                  <p className="journey-panel__eyebrow">{drink.kicker}</p>
                  <h2>{drink.name}</h2>
                  <p>{drink.description}</p>
                  <div className="journey-panel__meta">
                    <span>{drink.flavor}</span>
                    <span>{`0${index + 1}`}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="drinks-grid-section" id="grid">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">Product Grid</p>
            <h2>All four cans, restaged as premium cards.</h2>
          </div>
          <Link className="button-secondary button-secondary--small" to="/">
            Return home
          </Link>
        </div>

        <div className="drinks-grid">
          {drinks.map((drink) => (
            <article className="drink-card" key={drink.id}>
              <div
                className="drink-card__visual"
                style={{ backgroundColor: drink.surface, color: drink.text }}
              >
                <img src={drink.image} alt={drink.name} />
              </div>
              <div className="drink-card__body">
                <p>{drink.kicker}</p>
                <h3>{drink.name}</h3>
                <span>{drink.flavor}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
