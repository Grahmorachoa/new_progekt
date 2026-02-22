import styles from './Contact.module.css'

const contactItems = [
  { icon: '📍', label: 'Адрес', value: 'Москва, ул. Цветочная, 12, офис 304' },
  { icon: '📞', label: 'Телефон / WhatsApp', value: '+7 (999) 123-45-67' },
  { icon: '🕐', label: 'Режим работы', value: 'Пн–Вс: 9:00 — 21:00' },
  { icon: '📸', label: 'Instagram / TikTok', value: '@lumi.beauty.studio' },
]

export default function Contact() {
  return (
    <div className="sc sc-dark" id="contact">
      <div className={`pad ${styles.inner}`}>
        <div className="reveal">
          <div className="section-label">Контакты</div>
          <h2>Приходите <em>в гости</em></h2>
          <div className={styles.details}>
            {contactItems.map(c => (
              <div key={c.label} className={styles.item}>
                <div className={styles.itemIcon}>{c.icon}</div>
                <div>
                  <div className={styles.itemLabel}>{c.label}</div>
                  <div className={styles.itemVal}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.form} reveal d2`}>
          <div className={styles.formHead}>Запись онлайн</div>
          <div className={styles.formSub}>Заполните форму — свяжемся в течение 30 минут</div>
          <div className={styles.row}>
            <div className={styles.grp}>
              <label className={styles.lbl}>Имя</label>
              <input className={styles.input} type="text" placeholder="Ваше имя" />
            </div>
            <div className={styles.grp}>
              <label className={styles.lbl}>Телефон</label>
              <input className={styles.input} type="tel" placeholder="+7 (___) ___-__-__" />
            </div>
          </div>
          <div className={styles.grp}>
            <label className={styles.lbl}>Услуга</label>
            <select className={styles.select}>
              <option>— Выберите услугу —</option>
              <optgroup label="Ресницы">
                <option>Классическое наращивание</option>
                <option>2D / 3D / 4D объём</option>
                <option>Мегаобъём</option>
                <option>Ламинирование ресниц</option>
              </optgroup>
              <optgroup label="Брови">
                <option>Коррекция бровей</option>
                <option>Ламинирование бровей</option>
              </optgroup>
              <optgroup label="Волосы">
                <option>Капсульное наращивание</option>
                <option>Ленточное наращивание</option>
                <option>Микрокапсульное</option>
              </optgroup>
            </select>
          </div>
          <div className={styles.row}>
            <div className={styles.grp}>
              <label className={styles.lbl}>Дата</label>
              <input className={styles.input} type="date" />
            </div>
            <div className={styles.grp}>
              <label className={styles.lbl}>Время</label>
              <input className={styles.input} type="time" />
            </div>
          </div>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            ✦ Отправить заявку
          </button>
        </div>
      </div>
    </div>
  )
}
