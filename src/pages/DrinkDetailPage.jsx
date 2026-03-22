import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { drinks, getDrinkPath } from '../siteData.js'

const defaultPromoVideoUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_orginal_product_ad.mp4'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function lerp(start, end, progress) {
  return start + (end - start) * progress
}

function createDrinkDetail({
  heroEyebrow,
  title,
  story,
  vitalizes,
  ingredientsTitle,
  ingredientsDescription,
  sizes,
  ingredientCards,
  promoHeading,
  promoVideoUrl = defaultPromoVideoUrl,
}) {
  return {
    scenes: [
      {
        id: 'hero',
        align: 'left',
        eyebrow: heroEyebrow,
        title,
        description: '',
        buttonLabel: 'Buy now',
      },
      {
        id: 'story',
        align: 'right',
        eyebrow: '',
        title: '',
        description: story,
        buttonLabel: 'Buy now',
      },
      {
        id: 'vitalize',
        align: 'left',
        eyebrow: '',
        title: 'Vitalizes body and mind®.',
        description: vitalizes,
        buttonLabel: 'Buy now',
      },
      {
        id: 'ingredients',
        align: 'right',
        eyebrow: 'Ingredients',
        title: ingredientsTitle,
        description: ingredientsDescription,
        buttonLabel: 'See ingredients',
        sizes,
      },
      {
        id: 'center-can',
        align: 'center',
      },
    ],
    ingredientCards,
    promoVideoUrl,
    promoHeading,
  }
}

const drinkDetails = {
  original: createDrinkDetail({
    heroEyebrow: 'The Original Red Bull',
    title: 'Red Bull Energy Drink',
    story:
      'Red Bull Energy Drink is appreciated worldwide by top athletes, busy professionals, university students and travellers on long journeys.',
    vitalizes:
      'The original Red Bull Energy Drink. Giving wiiings to people and ideas since 1987.',
    ingredientsTitle: 'The formula that gives you wiiings',
    ingredientsDescription:
      "Red Bull Energy Drink's unique formula is made with high-quality ingredients.",
    sizes: ['250 ml', '355 ml'],
    promoHeading: 'A short campaign cut, always ready to play.',
    promoVideoUrl:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_orginal_product_ad.mp4',
    ingredientCards: [
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
    ],
  }),
  sugarfree: createDrinkDetail({
    heroEyebrow: 'Red Bull Sugarfree',
    title: 'The same wiiings. No sugar.',
    story:
      'Red Bull Sugarfree keeps the recognizable taste and energy story of the original while shifting the profile into a cleaner, bright-blue variant.',
    vitalizes:
      'A sugarfree take on Red Bull Energy Drink for people who want the same sharp lift with a lighter nutritional profile.',
    ingredientsTitle: 'Built on the classic Red Bull base',
    ingredientsDescription:
      'Red Bull Sugarfree uses the same core functional ingredients with sweeteners instead of sugar.',
    sizes: ['250 ml', '355 ml'],
    promoHeading: 'A product-first Sugarfree cut, ready to replay.',
    promoVideoUrl:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/red_bull_zero_sugar.mp4',
    ingredientCards: [
      {
        id: 'caffeine',
        title: 'Caffeine',
        body:
          'Each 250 ml can of Red Bull Sugarfree contains 75 mg of caffeine to help improve concentration and support alertness.',
      },
      {
        id: 'taurine',
        title: 'Taurine',
        body:
          'Red Bull Sugarfree contains 1000 mg taurine per 250 ml serving, keeping the formula close to the original functional profile.',
      },
      {
        id: 'b-vitamins',
        title: 'B-group vitamins',
        body:
          'Niacin, pantothenic acid, B6 and B12 help support normal energy-yielding metabolism and reduce tiredness and fatigue.',
      },
      {
        id: 'sweeteners',
        title: 'Sweeteners',
        body:
          'Instead of sugar, the Sugarfree edition uses sweeteners to deliver the familiar taste profile with essentially no sugars.',
      },
      {
        id: 'water',
        title: 'Water',
        body:
          'Water remains the base of the drink and helps carry the crisp, colder taste that defines the Sugarfree can.',
      },
    ],
  }),
  pink: createDrinkDetail({
    heroEyebrow: 'The Pink Edition',
    title: 'White Peach with a lighter edge.',
    story:
      'The Pink Edition pushes the lineup into a softer, fruit-forward direction with a cleaner peach-led profile and a brighter shelf presence.',
    vitalizes:
      'A more playful Red Bull edition that still keeps the fast, chilled energy-drink experience at the center.',
    ingredientsTitle: 'Flavor-forward, still unmistakably Red Bull',
    ingredientsDescription:
      'The Pink Edition layers White Peach flavor over the familiar Red Bull base for a softer finish.',
    sizes: ['250 ml'],
    promoHeading: 'A sharper Pink Edition product loop, ready to roll.',
    promoVideoUrl:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/Red_Bull_Pink.mp4',
    ingredientCards: [
      {
        id: 'white-peach',
        title: 'White Peach flavor',
        body:
          'The Pink Edition brings a rounder White Peach flavor that lands softer than the original while staying clean and bright.',
      },
      {
        id: 'caffeine',
        title: 'Caffeine',
        body:
          'The energy profile still centers on caffeine, giving the Pink Edition the same quick, recognizable Red Bull lift.',
      },
      {
        id: 'taurine',
        title: 'Taurine',
        body:
          'Taurine remains part of the signature Red Bull formula, supporting consistency across the full energy-drink lineup.',
      },
      {
        id: 'b-vitamins',
        title: 'B-group vitamins',
        body:
          'B-group vitamins contribute to the everyday energy story behind the edition while the fruit flavor changes the mood.',
      },
      {
        id: 'sparkling-water',
        title: 'Sparkling base',
        body:
          'The lightly sparkling base keeps the can feeling cold, direct and refreshing instead of drifting into a heavy fruit drink.',
      },
    ],
  }),
  yellow: createDrinkDetail({
    heroEyebrow: 'The Yellow Edition',
    title: 'Tropical flavor with a brighter hit.',
    story:
      'The Yellow Edition adds a warmer, more sunlit flavor profile to the range without losing the focused Red Bull can presence.',
    vitalizes:
      'A tropical-fruit variation designed to feel louder, warmer and more immediate while staying inside the same product system.',
    ingredientsTitle: 'A tropical twist on the Red Bull formula',
    ingredientsDescription:
      'The Yellow Edition combines the familiar Red Bull base with a more vibrant tropical flavor profile.',
    sizes: ['250 ml'],
    promoHeading: 'A warm-toned Yellow Edition product film on loop.',
    promoVideoUrl:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/Red_Bull_Yellow.mp4',
    ingredientCards: [
      {
        id: 'tropical-flavor',
        title: 'Tropical flavor',
        body:
          'The Yellow Edition leads with a tropical flavor profile that feels brighter and more vivid than the original can.',
      },
      {
        id: 'caffeine',
        title: 'Caffeine',
        body:
          'Caffeine keeps the edition grounded in the core Red Bull experience, helping with concentration and alertness.',
      },
      {
        id: 'taurine',
        title: 'Taurine',
        body:
          'As with the rest of the lineup, taurine stays part of the formula that makes the drink feel immediately familiar.',
      },
      {
        id: 'b-vitamins',
        title: 'B-group vitamins',
        body:
          'The vitamin blend supports the overall energy positioning while the tropical notes shift the taste into a warmer lane.',
      },
      {
        id: 'sugars',
        title: 'Sugars',
        body:
          'Sugars help deliver the rounded finish and fuller taste that make this edition read richer and more fruit-driven.',
      },
    ],
  }),
  red: createDrinkDetail({
    heroEyebrow: 'The Red Edition',
    title: 'Watermelon flavor with more heat.',
    story:
      'The Red Edition pushes the range into a bolder watermelon-led profile with a stronger visual identity and a hotter overall feel.',
    vitalizes:
      'A louder, more vivid Red Bull edition that leans into fruit character without losing the clean can-first presentation.',
    ingredientsTitle: 'A hotter flavor story, same Red Bull energy core',
    ingredientsDescription:
      'The Red Edition pairs watermelon flavor with the familiar Red Bull base to create a sharper, more vivid can.',
    sizes: ['250 ml'],
    promoHeading: 'A vivid Red Edition loop focused on the can itself.',
    promoVideoUrl:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/Red_Bull_Red.mp4',
    ingredientCards: [
      {
        id: 'watermelon',
        title: 'Watermelon flavor',
        body:
          'The Red Edition is built around a watermelon flavor that feels juicier and more immediate than the cooler editions.',
      },
      {
        id: 'caffeine',
        title: 'Caffeine',
        body:
          'Caffeine anchors the can in the same Red Bull energy system, supporting alertness and a more focused pick-up.',
      },
      {
        id: 'taurine',
        title: 'Taurine',
        body:
          'Taurine remains part of the formula, keeping the Red Edition close to the rest of the lineup beyond the flavor shift.',
      },
      {
        id: 'b-vitamins',
        title: 'B-group vitamins',
        body:
          'B-group vitamins help maintain the familiar Red Bull functional profile underneath the stronger fruit expression.',
      },
      {
        id: 'sparkling-finish',
        title: 'Sparkling finish',
        body:
          'A lightly sparkling finish keeps the drink feeling fast and cold instead of turning into a heavy, syrupy fruit soda.',
      },
    ],
  }),
}

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

export function DrinkDetailPage() {
  const { drinkId } = useParams()
  const touchStartYRef = useRef(0)
  const promoVideoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const currentDrinkIndex = drinks.findIndex((drink) => drink.id === drinkId)
  const [activeDrinkIndex, setActiveDrinkIndex] = useState(
    currentDrinkIndex >= 0 ? currentDrinkIndex : 0,
  )
  const drink =
    currentDrinkIndex >= 0 ? drinks[currentDrinkIndex] : drinks[0]
  const detail = drinkDetails[drink.id] ?? drinkDetails.original
  const { scenes, ingredientCards, promoHeading, promoVideoUrl } = detail

  useEffect(() => {
    if (currentDrinkIndex >= 0) {
      setActiveDrinkIndex(currentDrinkIndex)
      setProgress(0)
    }
  }, [currentDrinkIndex])

  const updateProgress = useEffectEvent((delta) => {
    const intensity = window.innerWidth <= 820 ? 0.00082 : 0.00058
    setProgress((current) => clamp(current + delta * intensity, 0, 1))
  })

  const handleScrollDelta = useEffectEvent((delta) => {
    const isAtTop = window.scrollY <= 0
    const isSliderComplete = progress >= 0.999

    if (delta > 0 && isSliderComplete) {
      return false
    }

    if (delta < 0 && !isAtTop) {
      return false
    }

    updateProgress(delta)
    return true
  })

  useEffect(() => {
    const isCompactViewport = window.innerWidth <= 820

    if (isCompactViewport) {
      return undefined
    }

    const handleWheel = (event) => {
      if (handleScrollDelta(event.deltaY)) {
        event.preventDefault()
      }
    }

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0
    }

    const handleTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY ?? 0
      const delta = touchStartYRef.current - currentY
      touchStartYRef.current = currentY
      if (handleScrollDelta(delta * 1.2)) {
        event.preventDefault()
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleScrollDelta])

  useEffect(() => {
    const node = promoVideoRef.current
    if (!node) {
      return
    }

    node.load()
    node.muted = isMuted

    if (!isMuted) {
      void node.play().catch(() => {})
    }
  }, [isMuted, drinkId])

  if (currentDrinkIndex < 0) {
    return <Navigate replace to="/drinks" />
  }

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
  const activeDrink = drinks[activeDrinkIndex]
  const lineupDrinks = drinks.map((lineupDrink, index) => {
    const relativeIndex = (index - activeDrinkIndex + drinks.length) % drinks.length
    return { ...lineupDrink, relativeIndex }
  })

  const shiftActiveDrink = (direction) => {
    const currentScrollY = window.scrollY

    setActiveDrinkIndex((current) => (current + direction + drinks.length) % drinks.length)

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'auto' })
    })
  }

  return (
    <main className="page page-original-detail">
      <section className="original-detail">
        <div
          className="original-detail__surface"
          style={{
            background: `radial-gradient(circle at 70% 44%, ${drink.accent}1f, transparent 16%), linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(250, 251, 255, 1))`,
          }}
        >
          <Link className="original-detail__backlink" to="/drinks">
            Back to drinks
          </Link>

          <div className="original-detail__layout">
            <div className="original-detail__copy">
              {scenes.map((scene, index) => (
                <SceneBlock scene={scene} key={scene.id} isActive={index === activeIndex} />
              ))}
            </div>

            <div className="original-detail__visual">
              <div
                className="original-detail__can-wrap"
                style={{
                  transform: `translate3d(calc(-50% + ${canStage.x}px), calc(-50% + ${canStage.y}px), 0) scale(${canStage.scale})`,
                }}
              >
                <img src={drink.image} alt={`${drink.name} can`} />
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
                        borderTop: `4px solid ${drink.accent}`,
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
              <span
                className={index === activeIndex ? 'is-active' : ''}
                key={scene.id}
                style={{
                  backgroundColor:
                    index === activeIndex ? `${drink.accent}` : 'rgba(9, 22, 46, 0.08)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-video" id={`${drink.id}-promo-video`}>
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">Promo Film</p>
            <h2>{promoHeading}</h2>
          </div>
        </div>

        <div className="home-video__shell">
          <button
            className="home-video__audio-toggle"
            type="button"
            aria-label={isMuted ? 'Unmute promo video' : 'Mute promo video'}
            onClick={() => setIsMuted((current) => !current)}
          >
            <span aria-hidden="true">{isMuted ? '🔇' : '🔊'}</span>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <video
            autoPlay
            className="home-video__player"
            disablePictureInPicture
            key={promoVideoUrl}
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            ref={promoVideoRef}
          >
            <source src={promoVideoUrl} type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="original-lineup">
        <div className="original-lineup__surface">
          <div
            className="original-lineup__backdrop"
            style={{ backgroundColor: activeDrink.surface }}
          />

          <div className="original-lineup__layout">
            <div className="original-lineup__copy" style={{ color: activeDrink.text }}>
              <p className="original-lineup__eyebrow">Red Bull Energy Drinks</p>
              <h2>{activeDrink.name}</h2>
              <p>{activeDrink.description}</p>
              <span className="original-lineup__badge" aria-hidden="true" />

              <div className="original-lineup__actions">
                <Link
                  className="button-primary"
                  to={getDrinkPath(activeDrink.id)}
                >
                  See product
                </Link>
                <Link className="button-secondary" to="/drinks">
                  Select your flavor
                </Link>
              </div>

              <div className="original-lineup__controls">
                <button
                  aria-label="Previous drink"
                  className="original-lineup__control"
                  onClick={() => shiftActiveDrink(-1)}
                  type="button"
                >
                  ‹
                </button>
                <button
                  aria-label="Next drink"
                  className="original-lineup__control"
                  onClick={() => shiftActiveDrink(1)}
                  type="button"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="original-lineup__visual">
              <div className="original-lineup__track">
                {lineupDrinks.map((lineupDrink) => {
                  const isActive = lineupDrink.relativeIndex === 0
                  const x = 10 + lineupDrink.relativeIndex * 30
                  const y =
                    lineupDrink.relativeIndex === 0
                      ? 3
                      : 12 + (lineupDrink.relativeIndex % 3) * 2
                  const scale = isActive
                    ? 1
                    : Math.max(0.72, 0.86 - lineupDrink.relativeIndex * 0.06)
                  const rotate =
                    lineupDrink.relativeIndex === 0
                      ? -2
                      : lineupDrink.relativeIndex % 2 === 0
                        ? -10
                        : 9
                  const opacity = lineupDrink.relativeIndex > 3 ? 0 : 1

                  return (
                    <img
                      alt={lineupDrink.name}
                      className={`original-lineup__can ${isActive ? 'is-active' : ''}`}
                      key={lineupDrink.id}
                      src={lineupDrink.image}
                      style={{
                        opacity,
                        transform: `translate3d(${x}%, ${y}%, 0) scale(${scale}) rotate(${rotate}deg)`,
                        zIndex: drinks.length - lineupDrink.relativeIndex,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
