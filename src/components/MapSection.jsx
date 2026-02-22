import styles from './MapSection.module.css'

export default function MapSection() {
  return (
    <div className={styles.mapCard}>
      <div className={styles.mapBg}>
        <div className={styles.mapGrid} />
        <div className={styles.mapRoads} />
        <div className={styles.pinWrap}>
          <div className={styles.pin}><div className={styles.pinInner} /></div>
          <div className={styles.shadow} />
        </div>
        <div className={styles.info}>
          <span className={styles.infoIcon}>✨</span>
          <div>
            <div className={styles.infoTitle}>LUMI beauty studio</div>
            <div className={styles.infoAddr}>Москва, ул. Цветочная, 12 · Пн–Вс 9:00–21:00</div>
          </div>
        </div>
      </div>
    </div>
  )
}
