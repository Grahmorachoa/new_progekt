import styles from './Marquee.module.css'

const items = [
  'Наращивание ресниц','Ламинирование','Оформление бровей','Наращивание волос',
  'Классика 1:1','2D · 3D · 4D объём','Мегаобъём','Ламинирование бровей','Капсульное наращивание',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => <span key={i} className={styles.item}>{item}</span>)}
      </div>
    </div>
  )
}
