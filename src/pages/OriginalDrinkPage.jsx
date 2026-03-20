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
  {
    id: 'center-can',
    align: 'center',
  },
]

const ingredientCards = [
  {
    id: 'caffeine',
    title: 'Caffeine',
    body:
      'Each 250 ml can of Red Bull Energy Drink contains 75 mg of caffeine. Caffeine helps to improve concentration and increase alertness.',
  },
  {
    id: 'taurine',
    title: 'Taurine',
    body:
      'Red Bull Energy Drink contains 1000 mg taurine per serving (250 ml). It is one of the most abundant amino acids in the heart and muscles.',
  },
  {
    id: 'b-vitamins',
    title: 'B-group vitamins',
    body:
      'B-group vitamins including niacin, B2, B6 and B12 contribute to the reduction of tiredness and fatigue in every 250 ml serving.',
  },
  {
    id: 'sugars',
    title: 'Sugars',
    body:
      'One serving, a 250 ml can of Red Bull Energy Drink, contains 27 g of sugars for the classic Red Bull taste profile.',
  },
  {
    id: 'water',
    title: 'Water',
    body:
      'Water is the main ingredient of Red Bull Energy Drink. Dedication to its quality contributes to the iconic taste in every sip.',
  },
]

const sceneHoldSegments = 0.7
const centerCanHoldSegments = 1
const cardHoldSegments = 0.85

const canWaypoints = [
  { x: 250, y: 0, scale: 1 },
  { x: -250, y: -8, scale: 0.8 },
  { x: 220, y: 4, scale: 0.82 },
  { x: -210, y: 0, scale: 0.86 },
  { x: 0, y: -84, scale: 0.84 },
]

function SceneBlock({ scene, isActive }) {
  const hasContent =
    Boolean(scene.eyebrow) ||
    Boolean(scene.title) ||
    Boolean(scene.description) ||
    Boolean(scene.sizes?.length) ||
    Boolean(scene.buttonLabel)

  if (!hasContent) {
    return null
  }

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
      {scene.buttonLabel ? (
        <div className="original-detail__actions">
          <button className="button-primary" type="button">
            {scene.buttonLabel}
          </button>
        </div>
      ) : null}
    </article>
  )
}

export function OriginalDrinkPage() {
  const touchStartYRef = useRef(0)
  const [progress, setProgress] = useState(0)

  const updateProgress = useEffectEvent((delta) => {
    const intensity = window.innerWidth <= 820 ? 0.00082 : 0.00058
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

  const sceneSegments = scenes.length - 1
  const sceneStep = 1 + sceneHoldSegments
  const sceneTimeline = sceneSegments * sceneStep
  const cardStep = 1 + cardHoldSegments
  const cardTimeline = ingredientCards.length * cardStep
  const totalSegments = sceneTimeline + centerCanHoldSegments + cardTimeline
  const journey = progress * totalSegments
  const sceneSegment = Math.min(journey, sceneTimeline)
  const baseIndex = Math.min(Math.floor(sceneSegment / sceneStep), scenes.length - 1)
  const nextIndex = Math.min(baseIndex + 1, scenes.length - 1)
  const localProgress = clamp(sceneSegment - baseIndex * sceneStep, 0, 1)

  const currentCan = canWaypoints[baseIndex]
  const nextCan = canWaypoints[nextIndex]
  const canStage = {
    x: lerp(currentCan.x, nextCan.x, localProgress),
    y: lerp(currentCan.y, nextCan.y, localProgress),
    scale: lerp(currentCan.scale, nextCan.scale, localProgress),
  }

  const activeIndex = Math.min(
    Math.round(sceneSegment / sceneStep),
    scenes.length - 1,
  )
  const stackProgress = clamp(
    journey - sceneTimeline - centerCanHoldSegments,
    0,
    cardTimeline,
  )
  const visibleCardCount = Math.ceil(stackProgress / cardStep - 0.02)
  const topCardIndex =
    visibleCardCount > 0 ? Math.min(visibleCardCount - 1, ingredientCards.length - 1) : -1

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

              <div
                className={`original-detail__ingredient-stack ${
                  stackProgress > 0 ? 'is-active' : ''
                }`}
                aria-hidden={stackProgress <= 0}
              >
                {ingredientCards.map((card, index) => {
                  const reveal = clamp(stackProgress - index * cardStep, 0, 1)

                  if (reveal <= 0) {
                    return null
                  }

                  const layerDepth = topCardIndex - index
                  const isTopCard = index === topCardIndex
                  const stackSlotOffset = index * 16
                  const offsetY = lerp(180, stackSlotOffset, reveal)

                  return (
                    <article
                      className={`ingredient-card ${isTopCard ? 'is-top' : 'is-back'}`}
                      key={card.id}
                      style={{
                        zIndex: 10 + index,
                        transform: `translate3d(-50%, ${offsetY}px, 0)`,
                      }}
                    >
                      <div className="ingredient-card__content">
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                      </div>
                    </article>
                  )
                })}
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
