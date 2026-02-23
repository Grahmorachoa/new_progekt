import styles from './Hero.module.css'

export default function Hero({ onOpenChat }) {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={styles.hero} id="home">
      <div className={styles.decoRing} />

      {/* Left: text content */}
      <div className={styles.content}>
        <div className={styles.tag}>Salon urody · Warszawa</div>
        <h1 className={styles.h1}>Piękno<em>w detalach</em></h1>
        <p className={styles.sub}>
          Przedłużanie rzęs, laminowanie, brwi i przedłużanie włosów.
          Podkreślamy Twoje naturalne piękno.
        </p>
        <div className={styles.actions}>
          <button className="btn-primary" onClick={onOpenChat}>✦ Zarezerwuj online</button>
          <button className="btn-outline-light" onClick={() => scrollTo('#works')}>Nasze prace</button>
        </div>
        <div className={styles.kpi}>
          <div><div className={styles.kpiNum}>500+</div><div className={styles.kpiLbl}>Klientek</div></div>
          <div className={styles.kpiDiv} />
          <div><div className={styles.kpiNum}>5 ★</div><div className={styles.kpiLbl}>Ocena</div></div>
          <div className={styles.kpiDiv} />
          <div><div className={styles.kpiNum}>3 lata</div><div className={styles.kpiLbl}>Doświadczenia</div></div>
        </div>
      </div>

      {/* Right: master photo only */}
      <div className={styles.visual}>
        <img src="/master.webp" alt="Mistrzyni Lumi Beauty - Ламинирование ресниц фото" className={styles.masterImg} />
      </div>
    </div>
  )
}
