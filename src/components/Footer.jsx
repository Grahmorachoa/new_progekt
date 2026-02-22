import styles from './Footer.module.css'

const navCols = [
  { title: 'Услуги', links: ['Классика','Объём 2D–4D','Мегаобъём','Ламинирование','Брови','Волосы'] },
  { title: 'Студия', links: ['О мастере','Портфолио','Отзывы','Цены'] },
  { title: 'Контакты', links: ['Записаться','Адрес студии','Уход за ресницами','FAQ'] },
]

export default function Footer() {
  return (
    <div className={`sc sc-dark ${styles.footer}`} style={{ marginBottom: 16 }}>
      <div className={styles.inner}>
        <div>
          <div className={styles.logo}>LUMI <span>beauty</span></div>
          <p className={styles.desc}>Студия красоты в Москве. Наращивание ресниц, ламинирование, брови, наращивание волос.</p>
          <div className={styles.social}>
            {['📸','💬','✈️','▶️'].map(icon => (
              <a key={icon} className={styles.sBtn} href="#">{icon}</a>
            ))}
          </div>
        </div>
        {navCols.map(col => (
          <div key={col.title} className={styles.col}>
            <h4>{col.title}</h4>
            <ul className={styles.links}>
              {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <span className={styles.copy}>© 2025 LUMI beauty studio. Все права защищены.</span>
        <a className={styles.policy} href="#">Политика конфиденциальности</a>
      </div>
    </div>
  )
}
