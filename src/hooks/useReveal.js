import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 }
    )

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-r').forEach((el) => obs.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      obs.disconnect()
    }
  }, [])
}
