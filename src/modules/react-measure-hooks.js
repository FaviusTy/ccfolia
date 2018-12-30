import { useRef, useState, useEffect, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
// import innerHeight from 'ios-inner-height'

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

// export const useWindowMeasure = () => {
//   const [state, setState] = useState([0, 0])
//   const ref = useRef()
//   const update = useCallback(() => {
//     document.body.style.height = innerHeight()
//     setState([
//       document.documentElement.clientWidth,
//       innerHeight()
//     ])
//   }, [ref.current, setState])
//   useEffect(() => {
//     let timer = null
//     const updator = () => timer = setTimeout(() => { update() }, 100)
//     window.addEventListener('scroll', updator)
//     return () => window.removeEventListener('scroll', updator)
//   }, [update])
//   return [state, ref]
// }
