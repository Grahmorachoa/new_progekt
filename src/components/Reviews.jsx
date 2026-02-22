import { useCarousel } from '../hooks/useCarousel'
import styles from './Reviews.module.css'

const reviews = [
  { stars: 5, text: 'Делаю ресницы больше года — всегда в восторге. Держатся долго, выглядят очень естественно. Мастер учитывает все пожелания!', name: 'Анастасия М.', svc: 'Классическое наращивание' },
  { stars: 5, text: 'Сделала ламинирование бровей — влюбилась! Брови стали чёткими, ухоженными. Экономлю 20 минут каждое утро на макияже.', name: 'Екатерина В.', svc: 'Ламинирование бровей' },
  { stars: 5, text: 'Наращивание волос превзошло все ожидания! Очень натурально. Мастер объяснила весь уход. Спасибо за профессионализм!', name: 'Ольга Р.', svc: 'Ленточное наращивание волос' },
  { stars: 5, text: 'Обратилась на мегаобъём перед свадьбой — ресницы выглядели идеально на всех фото. Лучшее решение для праздничного образа!', name: 'Дарья К.', svc: 'Мегаобъём' },
]

export default function Reviews() {
  const { idx, outerRef, trackRef, next, prev, go } = useCarousel(reviews.length, 5500)

  return (
    <div className="sc sc-dark" id="reviews">
      <div className={styles.wrap}>
        <div className={`${styles.hd} reveal`}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Отзывы</div>
          <h2>Что говорят <em>клиентки</em></h2>
        </div>

        <div className="carousel-outer" ref={outerRef}>
          <div className="carousel-track" ref={trackRef}>
            {reviews.map((r, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.stars}>{'★'.repeat(r.stars)}</div>
                <p className={styles.text}>{r.text}</p>
                <div className={styles.author}>
                  <div className={styles.av}>👤</div>
                  <div>
                    <div className={styles.name}>{r.name}</div>
                    <div className={styles.svc}>{r.svc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-arrows">
            <button className="c-arr" onClick={prev}>←</button>
            <button className="c-arr" onClick={next}>→</button>
          </div>
        </div>

        <div className="carousel-dots" style={{ marginTop: 16 }}>
          {reviews.map((_, i) => (
            <button key={i} className={`c-dot ${i === idx ? 'active' : ''}`} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
