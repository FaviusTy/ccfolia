import React, { useLayoutEffect, useRef, memo } from 'react'
import { useNoScrollRef } from '../hooks/no-scroll-ref'

const toLetters = (num) => {
  let mod = num % 26
  let pow = num / 26 | 0
  let out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z')
  return pow ? toLetters(pow) + out : out
}

const renderGrid = (ctx, col, row, size, span, alpha) => {
  if (alpha <= 0) return
  const len = row * col
  const rectSize = ~~(size - span)
  const pad = 2
  let i = 0

  while (len > i) {
    const x = i % col
    const y = Math.floor(i / col)
    const xName = toLetters(x + 1)
    const yName = String(y + 1)
    const posX = ~~(x * size)
    const posY = ~~(y * size)
    // ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
    // ctx.fillRect(posX, posY, rectSize, rectSize)

    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.strokeRect(posX, posY, rectSize, rectSize)

    ctx.textBaseline = 'top'
    ctx.font = `normal ${~~(size / 4)}px sans-serif`
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
    // ctx.fillText(`${xName}${yName}`, posX + pad, posY + pad, rectSize - pad * 2)
    i++
  }
}

const GridCanvasImage = ({ col, row, size: _size, span, url, alpha, ...props }) => {
  const pixelRatio = devicePixelRatio
  const size = _size * pixelRatio
  const canvasRef = useNoScrollRef()
  const displayWidth = col * _size
  const displayHeight = row * _size
  const width = col * size
  const height = row * size
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    if (!url) {
      renderGrid(ctx, col, row, size, span, alpha)
    } else {
      const image = new Image()
      image.src = url
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height)
        ctx.filter = 'none'
        renderGrid(ctx, col, row, size, span, alpha)
      }
      image.onerror = () => {
        ctx.clearRect(0, 0, width, height)
        renderGrid(ctx, col, row, size, span, alpha)
      }
    }
  }, [canvasRef.current, row, col, size, span, url, alpha, width, height])
  return <canvas
    ref={canvasRef}
    width={width}
    height={height}
    style={{ width: displayWidth + 'px', height: displayHeight + 'px' }}
    {...props}
  />
}

export default memo(GridCanvasImage)