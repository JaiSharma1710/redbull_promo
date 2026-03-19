import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { bannerUrl, classicCanUrl, drinks } from '../siteData.js'

const promoVideoUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_ad_final_cut_20sec.mp4'

const quickHighlights = [
  {
    title: 'Original Formula',
    text: 'The signature taste that anchors the full Red Bull lineup.',
  },
  {
    title: 'Four Flavor Stories',
    text: 'Original, Sugarfree, Pink Edition, and Yellow Edition in one clean flow.',
  },
  {
    title: 'Built To Feel Premium',
    text: 'Large product staging, restrained copy, and motion-led transitions.',
  },
]

const serveMoments = [
  'Ice cold before a late-night push',
  'Campus breaks and long creative sessions',
  'Game-day energy with a cleaner product-first look',
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function lerp(start, end, progress) {
  return start + (end - start) * progress
}

export function HomePage() {
  const showcaseRef = useRef(null)
  const promoVideoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  const updateProgress = useEffectEvent(() => {
    const node = showcaseRef.current
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

  useEffect(() => {
    const node = promoVideoRef.current
    if (!node) {
      return
    }

    node.muted = isMuted

    if (!isMuted) {
      void node.play().catch(() => {})
    }
  }, [isMuted])

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

  const activeDrink = drinks[activeIndex]

  return (
    <main className="page page-home">
      <section className="home-hero">
        <div className="home-hero__backdrop">
          <img src={bannerUrl} alt="Red Bull drinks campaign banner" />
        </div>
        <div className="home-hero__overlay" />

        <div className="home-hero__content">
          <p className="eyebrow">Original Red Bull</p>
          <h1>The original can still sets the pace.</h1>
          <p className="home-hero__text">
            A stripped-back Red Bull promo focused on the drink itself: one
            hero product, one lineup story, one film, and a cleaner finish.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#flavors">
              Explore all flavors
            </a>
            <a className="button-secondary" href="#promo-video">
              Watch promo film
            </a>
          </div>
        </div>

        <div className="home-hero__can">
          <div className="home-hero__can-glow" />
          <img
            className="hero-can-image"
            src={classicCanUrl}
            alt="Red Bull original energy drink can"
          />
        </div>
      </section>

      <section className="flavor-showcase" id="flavors" ref={showcaseRef}>
        <div className="flavor-showcase__sticky">
          <div
            className="flavor-showcase__backdrop"
            style={{ backgroundColor: activeDrink.surface }}
          />

          <div className="flavor-showcase__layout">
            <div className="flavor-showcase__copy">
              <div className="flavor-showcase__intro">
                <p className="eyebrow">All Flavors</p>
                <h2>Scroll through the lineup like a product launch.</h2>
                <p>
                  As you scroll, each can takes over the stage while the left
                  panel updates with its name, flavor, and product story.
                </p>
              </div>

              <article
                className="flavor-detail-card"
                style={{
                  backgroundColor: activeDrink.surface,
                  color: activeDrink.text,
                  borderColor: `${activeDrink.accent}66`,
                }}
              >
                <p className="flavor-detail-card__eyebrow">{activeDrink.kicker}</p>
                <h3>{activeDrink.name}</h3>
                <p>{activeDrink.description}</p>
                <div className="flavor-detail-card__meta">
                  <span>{activeDrink.flavor}</span>
                  <span>{`0${activeIndex + 1}`}</span>
                </div>
              </article>
            </div>

            <div className="flavor-showcase__visual">
              <div
                className="flavor-showcase__visual-inner"
                style={{
                  transform: `translate(${stage.x}%, ${stage.y}%) scale(${stage.scale}) rotate(${stage.rotate}deg)`,
                }}
              >
                {drinks.map((drink, index) => {
                  const opacity = clamp(1 - Math.abs(segment - index) * 1.2, 0, 1)

                  return (
                    <img
                      key={drink.id}
                      className="flavor-showcase__can"
                      src={drink.image}
                      alt={drink.name}
                      style={{ opacity }}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flavor-showcase__rail" aria-hidden="true">
            {drinks.map((drink, index) => (
              <span
                className={index === activeIndex ? 'is-active' : ''}
                key={drink.id}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-info-grid">
        {quickHighlights.map((item) => (
          <article className="home-info-card" key={item.title}>
            <p className="eyebrow">Highlight</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="home-ritual">
        <div className="home-ritual__copy">
          <p className="eyebrow">Serve It Right</p>
          <h2>Cold can. Clear choice. Fast energy story.</h2>
          <p>
            Keep the page grounded in the product with a few direct reasons to
            pick up the can, not a long brand detour.
          </p>
        </div>

        <div className="home-ritual__list">
          {serveMoments.map((moment) => (
            <div className="home-ritual__item" key={moment}>
              <span />
              <p>{moment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-banner">
        <p className="eyebrow">Lineup Preview</p>
        <h2>One product page. Four flavors. No unnecessary sections.</h2>
        <Link className="button-primary button-primary--small" to="/drinks">
          Open drinks route
        </Link>
      </section>

      <section className="home-video" id="promo-video">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">Promo Film</p>
            <h2>A short campaign cut, always ready to play.</h2>
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

      <footer className="home-footer">
        <div>
          <img src={classicCanUrl} alt="Red Bull original can" />
          <p>Red Bull Energy Drink</p>
        </div>
        <p>
          Original taste. Full lineup. One clean promotional page built around
          the drink.
        </p>
        <Link to="/drinks">Open drinks route</Link>
      </footer>
    </main>
  )
}
