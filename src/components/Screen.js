import React, { useState, useLayoutEffect, useCallback, useRef, useEffect, memo } from 'react'
import { useNoScrollRef } from '../modules/react-noscroll-ref-hooks'

function toLetters(num) {
  let mod = num % 26
  let pow = num / 26 | 0
  let out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z')
  return pow ? toLetters(pow) + out : out
}

const _Field = ({ col, row, size: _size, span, url, grid }) => {
  const pixelRatio = 1
  const size = _size * pixelRatio
  const canvasRef = useRef()
  const width = col * size
  const height = row * size
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const renderRect = () => {
      if (grid) {
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
          const alpha = Math.random() > 1 ? 1 : 0.1
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
          ctx.fillRect(posX, posY, rectSize, rectSize)
          ctx.textBaseline = 'top'
          ctx.font = `normal ${~~(10 * (_size / 50) * pixelRatio)}px sans-serif`
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
          ctx.fillText(`${xName}${yName}`, posX + pad, posY + pad, rectSize - pad * 2)
          i++
        }
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.lineWidth = 4
        ctx.strokeRect(0, 0, width, height)
      }
    }
    if (!url) {
      ctx.clearRect(0, 0, width, height)
      renderRect()
    } else {
      const image = new Image()
      image.src = url
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height)
        renderRect()
      }
      image.onerror = () => {
        ctx.clearRect(0, 0, width, height)
        renderRect()
      }
    }
  }, [row, col, size, span, url, grid, width, height])
  return <canvas
    ref={canvasRef}
    width={width * pixelRatio}
    height={height * pixelRatio}
    style={{
      width: width,
      height: height
    }}
  />
}

const Field = memo(_Field)

const transformProp = ({ x, y, z, rotateX, scale }) => {
  return `
    rotateX(${rotateX}deg)
    translate3d(${x}px, ${y}px, ${z}px)
    scale(${scale})
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
    scale: 1,
    ...initialPos,
    isTarget: false,
    handled: false,
    prev: {}
  })
  const handleStart = useCallback((e) => {
    setPos({
      ...pos,
      touchX: (e.clientX || e.touches[0].clientX),
      touchY: (e.clientY || e.touches[0].clientY),
      isTarget: e.target === e.currentTarget,
      handled: true,
      prev: {
        ...pos
      }
    })
  }, [pos, setPos])
  const handleMove = useCallback((e) => {
    if (pos.handled) {
      const diffX = (e.clientX || e.touches[0].clientX) - pos.touchX
      const diffY = (e.clientY || e.touches[0].clientY) - pos.touchY

      ref.current.x = pos.prev.x + diffX
      ref.current.y = pos.prev.y + diffY * (1 + pos.rotateX / 90)

      ref.current.style.transform = transformProp({
        ...pos,
        x: ref.current.x,
        y: ref.current.y
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
  height,
  scale,
  t
}) => {
  if (!width || !height) return null
  const stageRef = useRef()
  const screenRef = useNoScrollRef()
  const rotateX = field.rotate ? 70 : 0
  const [
    fieldPos,
    setPos,
    handleFieldStart,
    handleFieldMove,
    handleFieldEnd
  ] = useDraggable(stageRef, {
    x: width / 2 - field.col * field.baseSize / 2,
    y: height - field.row * field.baseSize / 2,
    rotateX: rotateX,
    scale
  })
  // resize
  useLayoutEffect(() => {
    setPos((prev) => {
      return {
        ...prev,
        x: width / 2 - field.col * field.baseSize / 2,
        y: height / 2 - (rotateX / 90) - field.row * field.baseSize / 2
      }
    })
  }, [width, height, t])
  // update
  useLayoutEffect(() => {
    setPos((prev) => {
      return {
        ...prev,
        scale: scale,
        rotateX: rotateX
      }
    })
  }, [scale, rotateX])

  return <div
    className="Screen"
    ref={screenRef}
    onMouseDown={handleFieldStart}
    onMouseMove={handleFieldMove}
    onMouseUp={handleFieldEnd}
    onTouchStartCapture={handleFieldStart}
    onTouchMoveCapture={handleFieldMove}
    onTouchEndCapture={handleFieldEnd}
    style={{
      transformStyle: 'preserve-3d',
      perspective: '1200px',
      width: width + 'px',
      height: height + 'px',
      touchAction: 'none'
    }}
  >
    <div ref={stageRef} style={{
      transformOrigin: 'center',
      transformStyle: 'preserve-3d',
      transform: transformProp(fieldPos),
      width: field.col * field.baseSize,
      height: field.row * field.baseSize
    }}>
      {Object.keys(objects).map((id, i) => {
        const { x = 0, y = 0, w = 1, h = 1, url } = objects[id]
        const width = w * field.baseSize
        const height = h * field.baseSize // scaling
        const posX = x * field.baseSize
        const posY = y * field.baseSize
        return <img key={id} id={id} width={width} height={height} src={url} style={{
          transformOrigin: 'bottom',
          transform: `
            translate3d(${posX}px, ${posY-height}px, 0)
            rotateX(${-fieldPos.rotateX - 5 * scale}deg)
          `,
          position: 'absolute',
          top: 0,
          left: 0
        }} draggable="false" />
      })}
      <Field size={field.baseSize} col={field.col} row={field.row} span={2} url={field.url} grid={field.grid} />
    </div>
  </div>
}

export default Screen