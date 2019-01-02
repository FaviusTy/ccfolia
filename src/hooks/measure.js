import { useRef, useState, useEffect, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useMeasure = () => {
  const [state, setState] = useState([0, 0])
  const ref = useRef()
  const update = useCallback(() => {
    if (ref.current) {
      setState([
        ref.current.offsetWidth,
        ref.current.offsetHeight
      ])
    }
  }, [ref.current, setState])
  useEffect(() => {
    let timer = null
    const observer = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        update()
      }, 100)
    })
    observer.observe(ref.current)
    return () => observer.unobserve(ref.current)
  }, [update])
  return [state, ref]
}
