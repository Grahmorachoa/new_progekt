import { useState, useEffect } from 'react'
import styles from './Header.module.css'

const navLinks = [
  { href: '#services', label: 'Usługi' },
  { href: '#works', label: 'Prace' },
  { href: '#reviews', label: 'Opinie' },
  { href: '#pricing', label: 'Cennik' },
  { href: '#contact', label: 'Kontakt' },
]

export default function Header({ onOpenChat }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map(l => (
          <a key={l.href} onClick={() => scrollTo(l.href)}>{l.label}</a>
        ))}
        <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => { setMenuOpen(false); onOpenChat?.() }}>
          ✦ Zarezerwuj
        </button>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>

          {/* Left: Logo */}
          <a className={styles.logo} onClick={() => scrollTo('#home')}>LUMI <span>beauty</span></a>

          {/* Center: Nav pill */}
          <nav className={styles.desktopNav}>
            {navLinks.map(l => <a key={l.href} onClick={() => scrollTo(l.href)}>{l.label}</a>)}
          </nav>

          {/* Right: Book button + burger */}
          <div className={styles.actions}>
            <button
              className={`btn-primary bookBtn ${styles.bookBtn || ''}`}
              style={{ fontSize: 10, padding: '10px 22px', cursor: 'pointer' }}
              onClick={onOpenChat}
            >
              ✦ Zarezerwuj
            </button>
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>
    </>
  )
}
