import styles from './Background.module.css'

export default function Background() {
  return (
    <>
      <div className={styles.bgDeco} />
      <div className={styles.grainOverlay} />

      {/* Decorative lash SVG curves */}
      <svg className={styles.bgLash} style={{ top: '8%', left: '5%', width: 280, height: 280 }}
        viewBox="0 0 280 280" fill="none">
        <path d="M20 260 Q80 80 260 20" stroke="rgba(201,149,122,1)" strokeWidth="1.5" fill="none"/>
        <path d="M40 260 Q100 100 270 40" stroke="rgba(201,149,122,1)" strokeWidth="1" fill="none"/>
        <path d="M60 260 Q120 120 280 60" stroke="rgba(201,149,122,1)" strokeWidth="0.8" fill="none"/>
        <path d="M10 260 Q60 60 250 10" stroke="rgba(201,149,122,1)" strokeWidth="1.2" fill="none"/>
      </svg>

      <svg className={styles.bgLash} style={{ bottom: '12%', right: '4%', width: 220, height: 220, transform: 'rotate(180deg)' }}
        viewBox="0 0 220 220" fill="none">
        <path d="M20 200 Q70 60 200 20" stroke="rgba(201,149,122,1)" strokeWidth="1.5" fill="none"/>
        <path d="M35 200 Q85 75 210 35" stroke="rgba(201,149,122,1)" strokeWidth="1" fill="none"/>
        <path d="M50 200 Q100 90 218 50" stroke="rgba(201,149,122,1)" strokeWidth="0.8" fill="none"/>
      </svg>

      <svg className={styles.bgLash} style={{ top: '45%', left: '3%', width: 160, height: 160, transform: 'rotate(30deg)' }}
        viewBox="0 0 160 160" fill="none">
        <ellipse cx="80" cy="80" rx="70" ry="20" stroke="rgba(201,149,122,1)" strokeWidth="1" fill="none"/>
        <ellipse cx="80" cy="80" rx="55" ry="14" stroke="rgba(201,149,122,1)" strokeWidth="0.7" fill="none"/>
      </svg>
    </>
  )
}
