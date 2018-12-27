import React, { memo, useState, useLayoutEffect, useCallback, useMemo, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { Stage, Sprite, Container, Graphics } from 'react-pixi-fiber'
import Rect from './pixi/Rect'
import Plane from './pixi/Plane'
import styles from './styles/Screen.module.css'

// Ticker
const ticker = PIXI.ticker.shared
ticker.autoStart = false
ticker.stop()

let timer = null
const render = (duration = 3000) => {
  ticker.start()
  clearTimeout(timer)
  timer = setTimeout(() => {
    ticker.stop()
  }, duration)
}

const blur = 10
const blurFilter = new PIXI.filters.BlurFilter()
blurFilter.blur = blur

const centerAnchor = new PIXI.Point(0.5, 0.5)
const hitArea = new PIXI.Rectangle(-1500, -1500, 3000, 3000)

const Field = ({ row, col, width = 30, height = 30, span = 2 }) => {
  return (<Plane
    pivot={[width*col/2, height*row/2]}
  >
    {/* {[...Array(row * col)].map((_, i) => {
      return <Rect
        key={i}
        lineColor={0x111111}
        fill={0xffffff}
        width={width - span}
        height={height - span}
        x={(i % col) * width + span}
        y={Math.floor(i / col) * height + span}
      />
    })} */}
  </Plane>)
}

const Screen = ({ objects, background, w, h, onChangeObject }) => {
  useLayoutEffect(() => {
    render(1000)
  })
  const containerRef = useRef()
  const center = useMemo(() => {
    return [~~(w*-0.5), ~~(h*-0.5)]
  }, [w, h])
  const [target, setTarget] = useState()
  const onTouchStart = useCallback((e) => {
    e.stopPropagation()
    if (e.target) {
      const pos = e.data.getLocalPosition(e.target.parent)
      const target = {
        id: e.target.id,
        el: e.target,
        parent: e.target.parent,
        sx: e.target.x,
        sy: e.target.y,
        tx: pos.x,
        ty: pos.y
      }
      setTarget(target)
    }
  }, [setTarget])
  const onTouchMove = useCallback((e) => {
    e.stopPropagation()
    if (target) {
      const pos = e.data.getLocalPosition(target.parent)
      target.el.x = target.sx + pos.x - target.tx
      target.el.y = target.sy + pos.y - target.ty
    }
    render(1000)
  }, [target])
  const onTouchEnd = useCallback((e) => {
    e.stopPropagation()
    if (!target) return
    if (target.id) {
      onChangeObject({
        id: target.id,
        x: target.el.x,
        y: target.el.y
      })
    }
    setTarget(null)
  }, [onChangeObject, target, setTarget])
  return (
    <Stage
      className={styles.wrap}
      width={w}
      height={h}
      options={{
        transparent: true,
        autoStart: false,
        sharedTicker: true
      }}
    >
      <Container
        ref={containerRef}
        interactive
        pointerdown={onTouchStart}
        pointermove={onTouchMove}
        pointerup={onTouchEnd}
        pivot={center}
      >
        <Container interactive hitArea={hitArea}>
          <Field row={30} col={30} width={60} height={60} />
          <Rect
            lineColor={0xFFFFFF}
            lineWidth={4}
            width={3000}
            height={3000}
            x={-1500}
            y={-1500}
          />
          {Object.keys(objects).map((id) => {
            const { url, x, y, w, h } = objects[id]
            return <Sprite
              buttonMode
              id={id}
              key={id}
              texture={PIXI.Texture.fromImage(url)}
              x={x}
              y={y}
              width={w}
              height={h}
              interactive
              anchor={centerAnchor}
            />
          })}
        </Container>
      </Container>
    </Stage>
  )
}

export default memo(Screen)