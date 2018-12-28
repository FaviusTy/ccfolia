import React, { useState, useLayoutEffect, useCallback, useRef, useEffect } from 'react'

function toLetters(num) {
  let mod = num % 26
  let pow = num / 26 | 0
  let out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z')
  return pow ? toLetters(pow) + out : out
}

const Field = ({ col, row, size: _size, span, url }) => {
  const pixelRatio = window.devicePixelRatio || 1
  const size = _size * pixelRatio + 1
  const canvasRef = useRef()
  const width = col * size
  const height = row * size
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const renderRect = () => {
      const len = row * col
      const rectSize = size - span
      let i = 0
      while (len > i) {
        const pad = 2
        const x = i % col
        const y = Math.floor(i / col)
        const xName = toLetters(x+1)
        const yName = String(y+1)
        const posX = x * size
        const posY = y * size
        const alpha = Math.random() > 1 ? 1 : 0.2
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
        ctx.fillRect(posX, posY, rectSize, rectSize)
        ctx.textBaseline = 'top'
        ctx.font = `normal ${8 * pixelRatio} sans-serif`
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.fillText(`${xName}${yName}`, posX + pad, posY + pad, rectSize - pad * 2)
        i++
      }
    }
    const image = new Image()
    image.src = url
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height)
      renderRect()
    }
    image.onerror = () => {
      renderRect()
    }
  }, [row, col, size, span, url, width, height])
  return <canvas ref={canvasRef} width={width * pixelRatio} height={height * pixelRatio} style={{ width: width, height: height }} />
}

const transformProp = ({ x, y, z, rotateX, rotateY, rotateZ }) => {
  return `
    rotateX(${rotateX}deg)
    translate3d(${x}px, ${y}px, ${z}px)
  `
}

const useDraggable = (ref, initialPos) => {
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    z: 0,
    touchX: 0,
    touchY: 0,
    rotateX: 0,
    ...initialPos,
    isTarget: false,
    handled: false,
    prev: {}
  })
  const handleStart = useCallback((e) => {
    setPos({
      ...pos,
      touchX: (e.clientX || e.touches[0].screenX),
      touchY: (e.clientY || e.touches[0].screenY),
      isTarget: e.target === e.currentTarget,
      handled: true,
      prev: {
        ...pos
      }
    })
  }, [pos, setPos])
  const handleMove = useCallback((e) => {
    if (pos.handled) {
      const diffX = (e.clientX || e.touches[0].screenX) - pos.touchX
      const diffY = (e.clientY || e.touches[0].screenY) - pos.touchY
      ref.current.x = pos.prev.x + diffX
      ref.current.y = pos.prev.y + diffY
      ref.current.style.transform = transformProp({
        ...pos,
        x: pos.prev.x + diffX,
        y: pos.prev.y + diffY
      })
    }
  }, [ref.current, pos])
  const handleEnd = useCallback((e) => {
    if (pos.handled) {
      setPos({
        ...pos,
        x: ref.current.x,
        y: ref.current.y,
        handled: false,
        isTarget: false,
        prev: {}
      })
    }
  }, [ref.current, pos, setPos])
  return [pos, setPos, handleStart, handleMove, handleEnd]
}

const Screen = ({
  field,
  objects,
  width,
  height
}) => {
  if (!width || !height) return null
  const stageRef = useRef()
  const [
    fieldPos,
    setPos,
    handleFieldStart,
    handleFieldMove,
    handleFieldEnd
  ] = useDraggable(stageRef, {
    x: width / 2 - field.col * field.baseSize / 2,
    y: height - field.row * field.baseSize / 2,
    rotateX: 70
  })
  // resize
  useLayoutEffect(() => {
    setPos((prev) => {
      return {
        ...prev,
        x: width / 2 - field.col * field.baseSize / 2,
        y: height - field.row * field.baseSize / 2,
      }
    })
  }, [width, height])

  return <div
    onMouseDown={handleFieldStart}
    onMouseMove={handleFieldMove}
    onMouseUp={handleFieldEnd}
    onTouchStart={handleFieldStart}
    onTouchMove={handleFieldMove}
    onTouchEnd={handleFieldEnd}
    style={{
      transformStyle: 'preserve-3d',
      perspective: '1000px',
      width: width + 'px',
      height: height + 'px'
    }}
  >
    <div ref={stageRef} style={{
      transformOrigin: 'center',
      transformStyle: 'preserve-3d',
      transform: transformProp(fieldPos),
      width: field.col * field.baseSize,
      height: field.row * field.baseSize
    }}>
      {[objects].map(({ id }, i) => {
        console.log(id, i);
        return <img key={id + i} width={field.baseSize} height={field.baseSize} src="/bg.jpg" style={{
          transformOrigin: 'bottom',
          transform: `
            translate3d(${Math.random() * 420}px, ${Math.random() * 420 - 30}px, 0)
            rotateX(${-fieldPos.rotateX}deg)
          `,
          position: 'absolute',
          top: 0,
          left: 0
        }} />
      })}
      <Field size={field.baseSize} col={field.col} row={field.row} span={2} url={field.url} />
    </div>
  </div>
}

export default Screen