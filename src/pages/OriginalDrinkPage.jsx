import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { classicCanUrl } from '../siteData.js'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function lerp(start, end, progress) {
  return start + (end - start) * progress
}

const scenes = [
  {
    id: 'hero',
    align: 'left',
    eyebrow: 'The Original Red Bull',
    title: 'Red Bull Energy Drink',
    description: '',
    buttonLabel: 'Buy now',
  },
  {
    id: 'story',
    align: 'right',
    eyebrow: '',
    title: '',
    description:
      'Red Bull Energy Drink is appreciated worldwide by top athletes, busy professionals, university students and travellers on long journeys.',
    buttonLabel: 'Buy now',
  },
  {
    id: 'vitalize',
    align: 'left',
    eyebrow: '',
    title: 'Vitalizes body and mind®.',
    description:
      'The original Red Bull Energy Drink. Giving wiiings to people and ideas since 1987.',
    buttonLabel: 'Buy now',
  },
  {
    id: 'ingredients',
    align: 'right',
    eyebrow: 'Ingredients',
    title: 'The formula that gives you wiiings',
    description:
      "Red Bull Energy Drink's unique formula is made with high-quality ingredients.",
    buttonLabel: 'See ingredients',
    sizes: ['250 ml', '355 ml'],
  },
]

const canWaypoints = [
  { x: 250, y: 0, scale: 1 },
  { x: -250, y: -8, scale: 0.8 },
  { x: 220, y: 4, scale: 0.82 },
  { x: -210, y: 0, scale: 0.86 },
]

function SceneBlock({ scene, isActive }) {
  const className = [
    'original-detail__scene',
    scene.align === 'right' ? 'is-right' : 'is-left',
    isActive ? 'is-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={className}>
      {scene.eyebrow ? <p className="original-detail__eyebrow">{scene.eyebrow}</p> : null}
      {scene.title ? <h1>{scene.title}</h1> : null}
      {scene.description ? <p>{scene.description}</p> : null}
      {scene.sizes ? (
        <div className="original-detail__sizes">
          <span>Available sizes:</span>
          {scene.sizes.map((size) => (
            <strong key={size}>{size}</strong>
          ))}
        </div>
      ) : null}
      <div className="original-detail__actions">
        <button className="button-primary" type="button">
          {scene.buttonLabel}
        </button>
      </div>
    </article>
  )
}

export function OriginalDrinkPage() {
  const touchStartYRef = useRef(0)
  const [progress, setProgress] = useState(0)

  const updateProgress = useEffectEvent((delta) => {
    const intensity = window.innerWidth <= 820 ? 0.0012 : 0.0009
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

  const segment = progress * (scenes.length - 1)
  const baseIndex = Math.floor(segment)
  const nextIndex = Math.min(baseIndex + 1, scenes.length - 1)
  const localProgress = segment - baseIndex

  const currentCan = canWaypoints[baseIndex]
  const nextCan = canWaypoints[nextIndex]
  const canStage = {
    x: lerp(currentCan.x, nextCan.x, localProgress),
    y: lerp(currentCan.y, nextCan.y, localProgress),
    scale: lerp(currentCan.scale, nextCan.scale, localProgress),
  }

  const activeIndex = Math.round(segment)
  return (
    <main className="page page-original-detail">
      <section className="original-detail">
        <div className="original-detail__surface">
          <Link className="original-detail__backlink" to="/drinks">
            Back to drinks
          </Link>

          <div className="original-detail__layout">
            <div className="original-detail__copy">
              {scenes.map((scene, index) => (
                <SceneBlock
                  scene={scene}
                  key={scene.id}
                  isActive={index === activeIndex}
                />
              ))}
            </div>

            <div className="original-detail__visual">
              <div
                className="original-detail__can-wrap"
                style={{
                  transform: `translate3d(calc(-50% + ${canStage.x}px), calc(-50% + ${canStage.y}px), 0) scale(${canStage.scale})`,
                }}
              >
                <img src={classicCanUrl} alt="Red Bull Energy Drink can" />
              </div>
            </div>
          </div>

          <div className="original-detail__progress" aria-hidden="true">
            {scenes.map((scene, index) => (
              <span className={index === activeIndex ? 'is-active' : ''} key={scene.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
