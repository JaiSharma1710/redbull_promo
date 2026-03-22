import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogs, getBlogPath } from '../blogData.js'
import { bannerUrl, classicCanUrl, drinks, getDrinkPath } from '../siteData.js'

const promoVideoUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_ad_final_cut_20sec.mp4'

const quickHighlights = [
  {
    title: 'Original Formula',
    text: 'The signature taste that anchors the full Red Bull lineup.',
  },
  {
    title: 'Five Flavor Stories',
    text: 'Original, Sugarfree, Pink Edition, Yellow Edition, and Red Edition in one clean flow.',
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

const testimonials = [
  {
    id: 1,
    name: 'Aarav Mehta',
    role: 'Exam Prep Student',
    rating: 5,
    quote: 'Red Bull helps me stay sharp during long revision nights without feeling too heavy.',
  },
  {
    id: 2,
    name: 'Nina Brooks',
    role: 'Marketing Professional',
    rating: 5,
    quote: 'The original Red Bull is still the easiest pick when I need quick focus in a packed workday.',
  },
  {
    id: 3,
    name: 'Rohan Sethi',
    role: 'Night Shift Designer',
    rating: 4,
    quote: 'Sugarfree gives me the same familiar Red Bull lift while fitting better into my everyday routine.',
  },
  {
    id: 4,
    name: 'Mia Carter',
    role: 'Content Lead',
    rating: 5,
    quote: 'Red Bull works because the energy feels reliable. It is quick, direct, and easy to trust.',
  },
  {
    id: 5,
    name: 'Kabir Anand',
    role: 'Gym Regular',
    rating: 5,
    quote: 'Before training, Red Bull gives me a cleaner boost than most oversized energy drinks.',
  },
  {
    id: 6,
    name: 'Sana Ali',
    role: 'University Student',
    rating: 4,
    quote: 'When study hours stretch late, Red Bull helps me stay alert without completely throwing off the session.',
  },
  {
    id: 7,
    name: 'Jason Reed',
    role: 'Sports Photographer',
    rating: 5,
    quote: 'Red Bull is the one I reach for on event days because it keeps my energy steady and practical.',
  },
  {
    id: 8,
    name: 'Priya Nair',
    role: 'Creative Producer',
    rating: 5,
    quote: 'The flavored editions are fun, but the original can still feels like the most dependable option.',
  },
  {
    id: 9,
    name: 'Daniel Cho',
    role: 'Startup Founder',
    rating: 4,
    quote: 'For long meetings and travel days, Red Bull is still one of the most balanced energy drinks around.',
  },
  {
    id: 10,
    name: 'Ishita Rao',
    role: 'Sports Editor',
    rating: 5,
    quote: 'Red Bull gives me the fast mental reset I need when deadlines stack up during the day.',
  },
  {
    id: 11,
    name: 'Leo Martin',
    role: 'Sales Consultant',
    rating: 5,
    quote: 'I like that Red Bull feels strong enough to work, but not so extreme that it becomes uncomfortable.',
  },
  {
    id: 12,
    name: 'Anaya Kapoor',
    role: 'Visual Designer',
    rating: 5,
    quote: 'Pink, Yellow, and Sugarfree each have their own mood, but the Red Bull core always stays recognizable.',
  },
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
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [isTestimonialAnimating, setIsTestimonialAnimating] = useState(false)

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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (isTestimonialAnimating) {
        setActiveTestimonialIndex((current) => (current + 1) % testimonials.length)
        setIsTestimonialAnimating(false)
        return
      }

      setIsTestimonialAnimating(true)
    }, isTestimonialAnimating ? 8200 : 220)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isTestimonialAnimating])

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
  const supportingDrinks = drinks
    .filter((drink) => drink.id !== activeDrink.id)
    .slice(0, 3)
  const homeBlogs = blogs.slice(0, 4)
  const visibleTestimonials = [-1, 0, 1, 2].map((offset, slotIndex) => {
    const index =
      (activeTestimonialIndex + offset + testimonials.length) % testimonials.length

    return {
      ...testimonials[index],
      position:
        slotIndex === 0
          ? 'left'
          : slotIndex === 1
            ? 'center'
            : slotIndex === 2
              ? 'right'
              : 'incoming',
    }
  })

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
                <span className="flavor-detail-card__badge" aria-hidden="true" />
                <div className="flavor-detail-card__meta">
                  <span>{activeDrink.flavor}</span>
                  <span>{`0${activeIndex + 1}`}</span>
                </div>
                <div className="flavor-detail-card__actions">
                  <Link
                    className="button-primary button-primary--small"
                    to={getDrinkPath(activeDrink.id)}
                  >
                    {activeDrink.buttonLabel}
                  </Link>
                  <Link className="button-secondary button-secondary--small" to="/drinks">
                    Select your flavor
                  </Link>
                </div>
              </article>
            </div>

            <div className="flavor-showcase__visual">
              <div
                className="flavor-showcase__visual-inner"
                style={{
                  transform: `translate(calc(-50% + ${stage.x}%), calc(-50% + ${stage.y}%)) scale(${stage.scale}) rotate(${stage.rotate}deg)`,
                }}
              >
                <img
                  className="flavor-showcase__can flavor-showcase__can--active"
                  src={activeDrink.image}
                  alt={activeDrink.name}
                />
              </div>

              <div className="flavor-showcase__supporting">
                {supportingDrinks.map((drink, index) => (
                  <img
                    key={drink.id}
                    className={`flavor-showcase__supporting-can flavor-showcase__supporting-can--${
                      index + 1
                    }`}
                    src={drink.image}
                    alt={drink.name}
                  />
                ))}
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

      <section className="testimonials-section">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2>Auto-moving praise with the center card taking the focus.</h2>
          </div>
        </div>

        <div className="testimonials-carousel">
          <div
            className={`testimonials-track ${isTestimonialAnimating ? 'is-animating' : ''}`}
          >
            {visibleTestimonials.map((item) => (
              <article
                className={`testimonial-card testimonial-card--${item.position}`}
                key={`${activeTestimonialIndex}-${item.id}-${item.position}`}
              >
                <div className="testimonial-card__rating" aria-label={`${item.rating} out of 5`}>
                  {'★'.repeat(item.rating)}
                </div>
                <p className="testimonial-card__quote">“{item.quote}”</p>
                <div className="testimonial-card__author">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-blogs">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">From The Blog</p>
            <h2>Short reads around product design, flavor, and the promo story.</h2>
          </div>
          <Link className="button-secondary button-secondary--small" to="/blogs">
            View all blogs
          </Link>
        </div>

        <div className="blogs-grid blogs-grid--home">
          {homeBlogs.map((blog) => (
            <Link className="blog-card" key={blog.slug} to={getBlogPath(blog.slug)}>
              <div className="blog-card__body">
                <p className="eyebrow">{blog.category}</p>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <div className="blogs-meta">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
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

    </main>
  )
}
