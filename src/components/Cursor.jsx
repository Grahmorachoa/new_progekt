import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const curRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      curRef.current.style.left = mx + 'px'
      curRef.current.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)
    let raf
    const animate = () => {
      rx += (mx - rx) * .12
      ry += (my - ry) * .12
      ringRef.current.style.left = rx + 'px'
      ringRef.current.style.top = ry + 'px'
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={curRef} className={styles.cursor} />
      <div ref={ringRef} className={styles.cursorRing} />
    </>
  )
}
