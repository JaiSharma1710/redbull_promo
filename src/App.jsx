import { useEffect, useEffectEvent, useRef, useState } from 'react'
import './App.css'

const logoUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_logo.svg'
const canUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_can.webp'

const stats = [
  { value: '04', label: 'scroll-led story chapters' },
  { value: '360', label: 'degrees of visual energy' },
  { value: '24/7', label: 'campus-ready momentum' },
]

const features = [
  {
    eyebrow: 'Velocity',
    title: 'Built to feel like a launch sequence.',
    text: 'Large typography, layered gradients, and motion-tuned transitions create a premium campaign page instead of a basic college submission.',
  },
  {
    eyebrow: 'Adrenaline',
    title: 'Animations react as the page moves.',
    text: 'Sections reveal, cards lift, grids drift, and the can keeps a controlled parallax presence to make scrolling feel intentional.',
  },
  {
    eyebrow: 'Impact',
    title: 'A strong finish with a direct call to action.',
    text: 'The final section closes the story with event-driven messaging for launches, fests, gaming nights, or athlete partnerships.',
  },
]

const timeline = [
  'Freshers week launch drops',
  'Night event sponsorship push',
  'Esports and athlete collabs',
  'Final CTA for campus activation',
]

function App() {
  const sectionRefs = useRef([])
  const [visibleSections, setVisibleSections] = useState({})
  const [scrollY, setScrollY] = useState(0)

  const registerSection = (index) => (node) => {
    sectionRefs.current[index] = node
  }

  const handleScroll = useEffectEvent(() => {
    setScrollY(window.scrollY)
  })

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((current) => {
          const next = { ...current }

          entries.forEach((entry) => {
            const key = entry.target.dataset.section
            if (entry.isIntersecting) {
              next[key] = true
            }
          })

          return next
        })
      },
      { threshold: 0.25 },
    )

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const heroShift = Math.min(scrollY * 0.16, 140)
  const canLift = Math.min(scrollY * 0.12, 120)
  const glowShift = Math.min(scrollY * 0.08, 90)

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#hero" aria-label="Red Bull home">
          <img src={logoUrl} alt="Red Bull" />
        </a>
        <nav className="topnav" aria-label="Primary">
          <a href="#story">Story</a>
          <a href="#momentum">Momentum</a>
          <a href="#campus">Campus</a>
          <a href="#launch">Launch</a>
        </nav>
        <a className="topbar-cta" href="#launch">
          Launch Campaign
        </a>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <div
            className="hero-orb hero-orb-left"
            style={{ transform: `translate3d(0, ${glowShift}px, 0)` }}
          />
          <div
            className="hero-orb hero-orb-right"
            style={{ transform: `translate3d(0, ${-glowShift}px, 0)` }}
          />

          <div className="hero-copy">
            <p className="eyebrow">The Original Energy Drink</p>
            <h1>
              Red Bull
              <span>Gives Your Campus Wings</span>
            </h1>
            <p className="hero-text">
              A scroll-first promotional experience designed for college events,
              athlete showcases, esports nights, and high-energy brand drops.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#launch">
                Start the rush
              </a>
              <a className="button-secondary" href="#story">
                Explore motion
              </a>
            </div>

            <div className="stat-row">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="hero-visual"
            style={{ transform: `translate3d(0, ${heroShift}px, 0)` }}
          >
            <div className="can-halo" />
            <div
              className="can-frame"
              style={{ transform: `translate3d(0, ${-canLift}px, 0)` }}
            >
              <img className="hero-can" src={canUrl} alt="Red Bull can" />
            </div>
            <div className="energy-ring energy-ring-one" />
            <div className="energy-ring energy-ring-two" />
            <div className="floating-tag">Charge the night</div>
            <div className="floating-tag floating-tag-alt">Fuel the finals</div>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span />
            Scroll for impact
          </div>
        </section>

        <section
          ref={registerSection(0)}
          data-section="story"
          id="story"
          className={`panel story-panel ${visibleSections.story ? 'is-visible' : ''}`}
        >
          <div className="panel-heading">
            <p className="eyebrow">Campaign Story</p>
            <h2>Designed to open clean, then build pressure as you scroll.</h2>
          </div>

          <div className="story-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <p className="feature-eyebrow">{feature.eyebrow}</p>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={registerSection(1)}
          data-section="momentum"
          id="momentum"
          className={`panel momentum-panel ${
            visibleSections.momentum ? 'is-visible' : ''
          }`}
        >
          <div className="panel-heading narrow">
            <p className="eyebrow">Momentum</p>
            <h2>One can. Multiple scenes. Constant movement.</h2>
          </div>

          <div className="momentum-layout">
            <div className="timeline-card">
              {timeline.map((item, index) => (
                <div className="timeline-step" key={item}>
                  <span>{`0${index + 1}`}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="quote-card">
              <p>
                “Not just a product page. This feels like an event teaser, a
                sports promo, and a launch poster blended into one.”
              </p>
            </div>
          </div>
        </section>

        <section
          ref={registerSection(2)}
          data-section="campus"
          id="campus"
          className={`panel campus-panel ${visibleSections.campus ? 'is-visible' : ''}`}
        >
          <div className="campus-copy">
            <p className="eyebrow">Campus Activation</p>
            <h2>Turn the landing page into the pre-event hype machine.</h2>
            <p>
              Use it for college festivals, battle-of-the-bands posters, gaming
              tournaments, athlete signups, or branded night runs. The layout is
              flexible enough to present schedules, sponsors, or hero messages.
            </p>
          </div>

          <div className="campus-grid">
            <div className="campus-card">Sports Meet</div>
            <div className="campus-card">DJ Night</div>
            <div className="campus-card">Esports Arena</div>
            <div className="campus-card">Creator Drop</div>
          </div>
        </section>

        <section
          ref={registerSection(3)}
          data-section="launch"
          id="launch"
          className={`panel launch-panel ${visibleSections.launch ? 'is-visible' : ''}`}
        >
          <div className="launch-copy">
            <p className="eyebrow">Final Push</p>
            <h2>Ready for your college presentation, showcase, or demo reel.</h2>
            <p>
              Built as a polished single-page experience with strong motion,
              branded visuals, and a presentation-friendly structure.
            </p>
          </div>

          <div className="launch-actions">
            <a className="button-primary" href="#hero">
              Replay intro
            </a>
            <a className="button-secondary" href="https://www.redbull.com/" target="_blank" rel="noreferrer">
              View brand inspiration
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
