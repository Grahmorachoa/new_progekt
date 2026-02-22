import { useState } from 'react'
import { categories } from '../data/services'
import styles from './Services.module.css'

function ServiceCard({ svc, tag, tagClass, onBook }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImg} style={{ background: svc.bg }}>
        {svc.photo
          ? <img src={svc.photo} alt={svc.title} className={styles.cardPhoto} />
          : <span className={styles.cardImgIcon}>{svc.icon}</span>
        }
      </div>
      <div className={styles.cardBody}>
        <span className={`${styles.tag} ${styles[tagClass]}`}>{tag}</span>
        <div className={styles.cardTitle}>{svc.title}</div>
        <p className={styles.cardDesc}>{svc.desc}</p>
        <div className={styles.cardFooter}>
          <div>
            <div className={styles.cardPrice}>{svc.price}</div>
            <div className={styles.cardTime}>⏱ {svc.time}</div>
          </div>
          <button className={styles.cardBtn} onClick={onBook}>Zarezerwuj</button>
        </div>
      </div>
    </div>
  )
}

function Category({ cat, onBook }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.category}>
      <div
        className={`${styles.catHeader} ${open ? styles.catHeaderOpen : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <div className={styles.catLeft}>
          <span className={styles.catIcon}>{cat.icon}</span>
          <div>
            <span className={styles.catName}>{cat.name}</span>
            <span className={styles.catCount}>{cat.services.length} услуги</span>
          </div>
        </div>
        <div className={styles.catRight}>
          <span className={styles.catPrice}>{cat.fromPrice}</span>
          <span className={`${styles.catArrow} ${open ? styles.catArrowOpen : ''}`}>▾</span>
        </div>
      </div>

      <div className={`${styles.catBody} ${open ? styles.catBodyOpen : ''}`}>
        <div className={styles.grid}>
          {cat.services.map(svc => (
            <ServiceCard key={svc.title} svc={svc} tag={cat.tag} tagClass={cat.tagClass} onBook={onBook} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Services({ onOpenChat }) {
  return (
    <div className="sc sc-glass" id="services">
      <div className={styles.wrap}>
        <div className={`${styles.hd} reveal`}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Что мы делаем</div>
          <h2>Наши <em>услуги</em></h2>
          <p className={styles.hint}>Нажмите на категорию, чтобы узнать подробнее</p>
        </div>

        <div className={styles.categories}>
          {categories.map(cat => (
            <div key={cat.id} className="reveal">
              <Category cat={cat} onBook={onOpenChat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
