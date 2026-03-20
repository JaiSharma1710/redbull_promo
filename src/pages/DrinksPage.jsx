import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { drinks } from '../siteData.js'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function DrinksPage() {
  const stackRef = useRef(null)
  const touchStartYRef = useRef(0)
  const [progress, setProgress] = useState(0)

  const updateProgress = useEffectEvent((delta) => {
    const intensity = window.innerWidth <= 820 ? 0.0014 : 0.0009
    setProgress((current) => clamp(current + delta * intensity, 0, 1))
  })

  useEffect(() => {
    const isCompactViewport = window.innerWidth <= 820

    if (isCompactViewport) {
      return undefined
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleWheel = (event) => {
      event.preventDefault()
      updateProgress(event.deltaY)
    }

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0
    }

    const handleTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY ?? 0
      const delta = touchStartYRef.current - currentY
      touchStartYRef.current = currentY
      event.preventDefault()
      updateProgress(delta * 1.2)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [updateProgress])

  const cards = drinks
  const segment = cards.length > 1 ? 1 / (cards.length - 1) : 1
  const activeIndex = Math.min(cards.length - 1, Math.round(progress * (cards.length - 1)))

  return (
    <main className="page page-drinks">
      <section
        className="cards-stack"
        ref={stackRef}
        style={{ '--cards-count': cards.length }}
      >
        <div className="cards-stack__sticky">
          <div className="cards-stack__surface">
            {cards
              .map((card, index) => {
                const phase =
                  index === cards.length - 1
                    ? 0
                    : clamp((progress - index * segment) / segment, 0, 1)

                return { card, index, phase }
              })
              .reverse()
              .map(({ card, index, phase }) => {
                const isLead = index === 0

                return (
                  <article
                    className="stack-card"
                    key={card.id}
                    style={{
                      '--card-index': index,
                      '--accent': card.accent,
                      '--surface': card.surface,
                      '--text': card.text,
                      zIndex: cards.length - index,
                      opacity: 1 - phase * 0.08,
                      transform: `translate3d(${phase * -138}%, 0, 0) rotate(${phase * -5}deg)`,
                    }}
                  >
                    <div className="stack-card__panel">
                      <div className="stack-card__visual">
                        <div className="stack-card__halo" aria-hidden="true" />
                        <img src={card.image} alt={card.name} />
                      </div>

                      <div className="stack-card__copy">
                        <p className="eyebrow">{card.kicker}</p>
                        {isLead ? <h1>{card.name}</h1> : <h2>{card.name}</h2>}
                        <p>{card.description}</p>
                        <span className="stack-card__badge" aria-hidden="true" />
                        <div className="stack-card__meta">
                          <span>{card.flavor}</span>
                          {card.id === 'original' ? (
                            <Link
                              className="button-primary button-primary--small"
                              to="/drinks/original"
                            >
                              {card.buttonLabel}
                            </Link>
                          ) : (
                            <button
                              className="button-primary button-primary--small"
                              type="button"
                            >
                              {card.buttonLabel}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}

            <div className="cards-stack__progress" aria-hidden="true">
              {cards.map((card, index) => (
                <span className={index === activeIndex ? 'is-active' : ''} key={card.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
