import { useState, useEffect, useRef, useCallback } from 'react'

export function useCarousel(total, autoMs = 0) {
  const [idx, setIdx] = useState(0)
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const timerRef = useRef(null)

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 640

  const cardWidth = useCallback(() => {
    if (!outerRef.current) return 300
    return outerRef.current.offsetWidth * (isMobile() ? 0.86 : 0.7)
  }, [])

  const gap = 16

  const getOffset = useCallback((i) => {
    const cw = cardWidth()
    const ow = outerRef.current?.offsetWidth || 300
    const center = i * (cw + gap) + cw / 2
    return Math.max(0, center - ow / 2)
  }, [cardWidth])

  const applyLayout = useCallback((i, animated = true) => {
    if (!trackRef.current || !outerRef.current) return
    const cw = cardWidth()
    Array.from(trackRef.current.children).forEach(c => {
      c.style.width = cw + 'px'
      const img = c.querySelector('[data-carousel-img]')
      if (img) img.style.height = Math.round(cw * 1.25) + 'px'
    })
    trackRef.current.style.transition = animated
      ? 'transform .65s cubic-bezier(.77,0,.175,1)'
      : 'none'
    trackRef.current.style.transform = `translateX(-${getOffset(i)}px)`
  }, [cardWidth, getOffset])

  const go = useCallback((i) => {
    const next = ((i % total) + total) % total
    setIdx(next)
    applyLayout(next)
  }, [total, applyLayout])

  const startTimer = useCallback(() => {
    if (!autoMs) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIdx(prev => {
      const next = (prev + 1) % total
      applyLayout(next)
      return next
    }), autoMs)
  }, [autoMs, total, applyLayout])

  const next = useCallback(() => { clearInterval(timerRef.current); go(idx + 1); startTimer() }, [idx, go, startTimer])
  const prev = useCallback(() => { clearInterval(timerRef.current); go(idx - 1); startTimer() }, [idx, go, startTimer])

  useEffect(() => {
    // Initial layout after mount
    const t = setTimeout(() => { applyLayout(0, false); startTimer() }, 50)
    const onResize = () => applyLayout(idx, false)
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); clearInterval(timerRef.current); window.removeEventListener('resize', onResize) }
  }, [])  // eslint-disable-line

  return { idx, outerRef, trackRef, next, prev, go }
}
