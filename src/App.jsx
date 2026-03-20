import { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { DrinksPage } from './pages/DrinksPage.jsx'
import { DrinkDetailPage } from './pages/DrinkDetailPage.jsx'
import { drinks, getDrinkPath, logoUrl } from './siteData.js'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function SiteHeader({ isMenuOpen, onToggleMenu, onCloseMenu }) {
  const [isDrinksExpanded, setIsDrinksExpanded] = useState(true)
  const drinkRailRef = useRef(null)

  const scrollDrinkRail = (direction) => {
    const node = drinkRailRef.current
    if (!node) {
      return
    }

    const start = node.scrollLeft
    const distance = direction * 332
    const duration = 420
    let startTime = null

    const easeInOutCubic = (value) => {
      return value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2
    }

    const animate = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutCubic(progress)
      node.scrollLeft = start + distance * eased

      if (progress < 1) {
        window.requestAnimationFrame(animate)
      }
    }

    window.requestAnimationFrame(animate)
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-brand">
            <button
              className="site-brand__menu-button"
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={onToggleMenu}
            >
              <span className="site-brand__menu" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </span>
            </button>
            <Link to="/" aria-label="Red Bull home">
              <img src={logoUrl} alt="Red Bull" />
            </Link>
          </div>

          <nav className="site-nav" aria-label="Primary">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/drinks">Energy Drinks</NavLink>
          </nav>

          <Link className="site-header__cta" to="/drinks">
            Explore Drinks
          </Link>
        </div>
      </header>

      <div className={`menu-overlay ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="menu-overlay__surface">
          <div className="menu-overlay__header">
            <div className="menu-overlay__brand">
              <button
                className="menu-overlay__close"
                type="button"
                aria-label="Close menu"
                onClick={onCloseMenu}
              >
                x
              </button>
              <img src={logoUrl} alt="Red Bull" />
            </div>
          </div>

          <div className="menu-overlay__layout">
            <aside className="menu-overlay__sidebar">
              <Link to="/" onClick={onCloseMenu}>
                Home
              </Link>
              <div className="menu-overlay__group">
                <button
                  className="menu-overlay__toggle"
                  type="button"
                  aria-expanded={isDrinksExpanded}
                  onClick={() => setIsDrinksExpanded((current) => !current)}
                >
                  Energy Drinks
                  <span
                    className={`menu-overlay__toggle-icon ${
                      isDrinksExpanded ? 'is-expanded' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`menu-overlay__subnav ${
                    isDrinksExpanded ? 'is-expanded' : ''
                  }`}
                >
                  <Link to="/drinks" onClick={onCloseMenu}>
                    All Red Bull Energy Drinks
                  </Link>
                  {drinks.map((drink) => (
                    <Link key={drink.id} to={getDrinkPath(drink.id)} onClick={onCloseMenu}>
                      {drink.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <div className="menu-overlay__content">
              <section className="menu-overlay__section">
                <div className="menu-overlay__section-head">
                  <h2>Red Bull Energy Drinks</h2>
                  <div className="menu-overlay__rail-controls">
                    <button
                      className="menu-overlay__rail-button"
                      type="button"
                      aria-label="Scroll drinks left"
                      onClick={() => scrollDrinkRail(-1)}
                    >
                      ‹
                    </button>
                    <button
                      className="menu-overlay__rail-button"
                      type="button"
                      aria-label="Scroll drinks right"
                      onClick={() => scrollDrinkRail(1)}
                    >
                      ›
                    </button>
                    <Link to="/drinks" onClick={onCloseMenu}>
                      View all
                    </Link>
                  </div>
                </div>
                <div className="menu-overlay__drink-rail" ref={drinkRailRef}>
                  {drinks.map((drink) => (
                    <Link
                      className="menu-overlay__drink-card"
                      key={drink.id}
                      to={getDrinkPath(drink.id)}
                      onClick={onCloseMenu}
                    >
                      <div className="menu-overlay__drink-surface">
                        <h3>{drink.name}</h3>
                        <img src={drink.image} alt={drink.name} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SiteFooter() {
  const year = new Date().getFullYear()
  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/redbull/',
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.2" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.3" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@RedBull',
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M21 12c0 2.9-.3 4.4-.74 5.24a2.9 2.9 0 0 1-1.27 1.27C18.16 19 16.66 19.3 12 19.3S5.84 19 5.01 18.51a2.9 2.9 0 0 1-1.27-1.27C3.3 16.4 3 14.9 3 12s.3-4.4.74-5.24A2.9 2.9 0 0 1 5 5.49C5.84 5 7.34 4.7 12 4.7s6.16.3 6.99.79a2.9 2.9 0 0 1 1.27 1.27C20.7 7.6 21 9.1 21 12Z" />
          <path fill="currentColor" stroke="none" d="m10 8.8 5.8 3.2-5.8 3.2Z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/RedBull/',
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M13.3 20v-6.5h2.3l.35-2.73H13.3V9.03c0-.79.22-1.33 1.35-1.33H16V5.26c-.64-.07-1.28-.11-1.93-.1-1.92 0-3.24 1.17-3.24 3.33v2.23H8.65v2.73h2.18V20Z" />
        </svg>
      ),
    },
    {
      label: 'Official Site',
      href: 'https://www.redbull.com/',
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5a13 13 0 0 0 0 17" fill="none" />
          <path d="M12 3.5a13 13 0 0 1 0 17" fill="none" />
          <path d="M4.8 9h14.4" fill="none" />
          <path d="M4.8 15h14.4" fill="none" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="site-footer">
      <div className="site-footer__surface">
        <div className="site-footer__brand">
          <img src={logoUrl} alt="Red Bull" />
          <div>
            <p className="site-footer__eyebrow">Red Bull Energy Drink</p>
            <p className="site-footer__text">
              Original taste, full lineup, and dedicated product pages built around the can.
            </p>
          </div>
        </div>

        <div className="site-footer__links">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
              <span className="site-footer__icon">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        <p className="site-footer__copyright">© {year} Red Bull promotional experience.</p>
      </div>
    </footer>
  )
}

function AppShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <SiteHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drinks" element={<DrinksPage />} />
        <Route path="/drinks/:drinkId" element={<DrinkDetailPage />} />
      </Routes>
      <SiteFooter />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
