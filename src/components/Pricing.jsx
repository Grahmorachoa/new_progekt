import styles from './Pricing.module.css'

const plans = [
  {
    icon: '🌿', name: 'Klasyczny', amount: '150 zł', unit: 'przedłużanie od',
    feats: ['Klasyka 1:1', 'Brąz / czarny', 'Korekta po 3 tyg.', 'Konsultacja w cenie'],
    featured: false,
  },
  {
    icon: '✨', name: 'Objętość', amount: '220 zł', unit: 'przedłużanie od',
    feats: ['2D / 3D / 4D objętość', 'Kolorowe akcenty', 'Korekta po 3 tyg.', 'Konsultacja w cenie'],
    featured: true, badge: 'Hit',
  },
  {
    icon: '👑', name: 'Luksus', amount: '290 zł', unit: 'mega objętość od',
    feats: ['5–10 włosków w pęczku', 'Dowolne odcienie', 'Priorytetowa rezerwacja', 'Pielęgnacja gratis'],
    featured: false,
  },
]

export default function Pricing({ onOpenChat }) {
  return (
    <div className="sc sc-glass" id="pricing">
      <div className={styles.wrap}>
        <div className={`${styles.hd} reveal`}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Прозрачные цены</div>
          <h2>Выберите <em>формат</em></h2>
        </div>
        <div className={styles.grid}>
          {plans.map(p => (
            <div key={p.name} className={`${styles.card} ${p.featured ? styles.featured : ''} reveal`}>
              {p.badge && <div className={styles.badge}>{p.badge}</div>}
              <div className={styles.icon}>{p.icon}</div>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.amount}>{p.amount}</div>
              <div className={styles.unit}>{p.unit}</div>
              <div className={styles.div} />
              <ul className={styles.feats}>
                {p.feats.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button
                className={p.featured ? 'btn-primary' : 'btn-outline-light'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onOpenChat}
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
