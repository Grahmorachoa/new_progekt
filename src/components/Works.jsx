import { useState } from 'react'
import styles from './Works.module.css'

const works = [
  { photo: '/lash.png', label: 'Klasyka 1:1', tag: 'Naturalny efekt', bg: 'linear-gradient(135deg,#3A2818,#2A1C0E)' },
  { photo: '/lash.png', label: 'Objętość 2D', tag: 'Brązowe rzęsy', bg: 'linear-gradient(135deg,#322414,#221809)' },
  { photo: '/lash.png', label: 'Mega objętość', tag: 'Czarny efekt', bg: 'linear-gradient(135deg,#2A1E10,#1C1208)' },
  { photo: '/lash.png', label: 'Laminowanie', tag: 'Przed i po', bg: 'linear-gradient(135deg,#382614,#281808)' },
  { photo: '/brow.png', label: 'Brwi', tag: 'Korekta kształtu', bg: 'linear-gradient(135deg,#342012,#240E06)' },
  { photo: '/hair.png', label: 'Włosy', tag: 'Keratynowe', bg: 'linear-gradient(135deg,#301C10,#200C06)' },
  { photo: '/lash.png', label: 'Objętość 3D', tag: 'Ciemny efekt', bg: 'linear-gradient(135deg,#2C180C,#1C0C04)' },
  { photo: '/hair.png', label: 'Taśmowe', tag: 'Do ramion', bg: 'linear-gradient(135deg,#281408,#180802)' },
]

const len = works.length

function mod(n, m) { return ((n % m) + m) % m }

export default function Works() {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx(i => mod(i - 1, len))
  const next = () => setIdx(i => mod(i + 1, len))

  const prevIdx = mod(idx - 1, len)
  const nextIdx = mod(idx + 1, len)

  return (
    <div className="sc sc-warm" id="works">
      <div className={styles.wrap}>
        <div className={`${styles.hd} reveal`}>
          <div className="section-label">Portfolio</div>
          <h2>Nasze <em>prace</em></h2>
        </div>

        <div className={styles.stage}>
          {/* Prev card */}
          <div className={`${styles.card} ${styles.side} ${styles.sideL}`} onClick={prev} style={{ background: works[prevIdx].bg }}>
            <img src={works[prevIdx].photo} alt={works[prevIdx].label} className={styles.img} />
            <div className={styles.sideOverlay}>
              <span className={styles.sideLabel}>{works[prevIdx].label}</span>
            </div>
          </div>

          {/* Main center card */}
          <div className={`${styles.card} ${styles.main}`} style={{ background: works[idx].bg }}>
            <img src={works[idx].photo} alt={works[idx].label} className={styles.img} />
            <div className={styles.mainOverlay}>
              <div className={styles.mainLabel}>{works[idx].label}</div>
              <div className={styles.mainTag}>{works[idx].tag}</div>
            </div>
            <button className={`${styles.arr} ${styles.arrL}`} onClick={prev}>←</button>
            <button className={`${styles.arr} ${styles.arrR}`} onClick={next}>→</button>
          </div>

          {/* Next card */}
          <div className={`${styles.card} ${styles.side} ${styles.sideR}`} onClick={next} style={{ background: works[nextIdx].bg }}>
            <img src={works[nextIdx].photo} alt={works[nextIdx].label} className={styles.img} />
            <div className={styles.sideOverlay}>
              <span className={styles.sideLabel}>{works[nextIdx].label}</span>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {works.map((_, i) => (
            <button key={i} className={`c-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
