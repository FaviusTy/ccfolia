import React, { memo, useState, useLayoutEffect, useCallback } from 'react'
import * as PIXI from 'pixi.js'
import { Stage, Sprite } from 'react-pixi-fiber'
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

const centerAnchor = new PIXI.Point(0.5, 0.5);

const Screen = ({ objects, background, w, h, onChangeObject }) => {
  useLayoutEffect(() => {
    render(1000)
  })
  const [target, setTarget] = useState()
  const onTouchStart = useCallback((e) => {
    setTarget(e.target)
  })
  const onTouchMove = useCallback((e) => {
    console.log(e)
    // const x = e.data.originalEvent.movementX
    // const y = e.data.originalEvent.movementY
    // console.log(x, y)
  }, [])
  const onTouchEnd = useCallback((e) => {
    setTarget(null)
  }, [])
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
      interactive
      touchmove={onTouchMove}
      // onTouchStart={onTouchStart}
      // onTouchMove={onTouchMove}
      // onTouchEnd={onTouchEnd}
    >
      <Sprite key={`bg`} texture={PIXI.Texture.fromImage(background.url)} width={w * 1.1} height={h * 1.1} x={-blur} y={-blur} filters={[blurFilter]} />
      <Sprite key={`bg2`} texture={PIXI.Texture.fromImage(background.url)} width={w * 0.5} height={h * 0.5} x={w*0.25} y={h*0.25}
        // anchor={centerAnchor}
        interactive
        // touchmove={onTouchMove}
      />
      {objects.map(obj => (
        <Sprite key={obj.id} texture={PIXI.Texture.fromImage(obj.image.url)} x={obj.x} y={obj.y} width={obj.w} height={obj.h} />
      ))}
    </Stage>
  )
}

export default memo(Screen)