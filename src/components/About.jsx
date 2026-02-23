import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const pills = [
  '🌿 Hipoalergiczne materiały',
  '🇰🇷 Materiały koreańskie',
  '✨ Indywidualne podejście',
  '🕐 Rezerwacja online',
  '🚗 Parking',
]

const stats = [
  ['500+', 'Klientek'],
  ['3 lata', 'Doświadczenie'],
  ['5.0 ★', 'Ocena'],
]

// Photos: each flies in from a different direction
const photos = [
  { src: '/lash.webp', alt: 'Praca mistrzyni - Ламинирование ресниц фото', cls: styles.tall, dir: 'fromLeft' },
  { src: '/master.webp', alt: 'Mistrzyni Alina - Ламинирование ресниц фото', cls: '', dir: 'fromTop' },
  { src: '/brow.webp', alt: 'Stylizacja brwi - Ламинирование ресниц фото', cls: '', dir: 'fromRight' },
  { src: '/hair.webp', alt: 'Przedłużanie włosów - Ламинирование ресниц фото', cls: '', dir: 'fromBottom' },
]

export default function About({ onOpenChat }) {
  const sectionRef = useRef(null)
  const photoRefs = useRef([])

  /* ── Parallax on scroll ── */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const factor = (window.innerHeight / 2 - center) * 0.06   // subtle depth

      photoRefs.current.forEach((el, i) => {
        if (!el) return
        const sign = i % 2 === 0 ? 1 : -1
        el.style.transform = `translateY(${factor * sign * 0.8}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Stagger reveal for photos ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = sectionRef.current?.querySelectorAll('[data-photo]')
            cards?.forEach((card, i) => {
              setTimeout(() => card.classList.add(styles.visible), i * 160)
            })
            obs.disconnect()
          }
        })
      },
      { threshold: 0.18 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`sc ${styles.section}`} id="about" ref={sectionRef}>
      <div className={`pad ${styles.inner}`}>

        {/* LEFT: text — standard reveal classes */}
        <div>
          <div className="section-label reveal">O mistrzyni</div>
          <h2 className="reveal d1">Cześć,<em>jestem Alina</em></h2>
          <p className={`${styles.lead} reveal d2`}>
            «Każda kobieta zasługuje budzić się piękna — bez zbędnego wysiłku rano»
          </p>
          <p className={`${styles.desc} reveal d3`}>
            Specjalistka przedłużania rzęs i włosów z ponad 3-letnim doświadczeniem.
            Szkoliłam się u czołowych specjalistów z Rosji i Korei.
            Używam wyłącznie hipoalergicznych materiałów najwyższej jakości.
          </p>
          <div className={`${styles.pills} reveal d3`}>
            {pills.map(p => <span key={p} className={styles.pill}>{p}</span>)}
          </div>
          <div className={`${styles.stats} reveal d4`}>
            {stats.map(([num, lbl]) => (
              <div key={lbl} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLbl}>{lbl}</div>
              </div>
            ))}
          </div>
          <div className="reveal d4" style={{ marginTop: 28 }}>
            <button className="btn-ghost-light" onClick={onOpenChat}>✦ Umów wizytę z Aliną</button>
          </div>
        </div>

        {/* RIGHT: collage — each photo flies in separately */}
        <div className={styles.collage}>
          <div className={`${styles.col} ${styles.tallCol}`}>
            <div
              data-photo
              className={`${styles.photo} ${styles.tall} ${styles[photos[0].dir]}`}
              ref={el => photoRefs.current[0] = el}
            >
              <img src={photos[0].src} alt={photos[0].alt} className={styles.img} />
            </div>
          </div>
          <div className={`${styles.col} ${styles.smallCol}`}>
            {photos.slice(1).map((ph, i) => (
              <div
                key={ph.alt}
                data-photo
                className={`${styles.photo} ${styles[ph.dir]}`}
                ref={el => photoRefs.current[i + 1] = el}
              >
                <img src={ph.src} alt={ph.alt} className={styles.img} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
