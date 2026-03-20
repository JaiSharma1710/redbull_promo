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
