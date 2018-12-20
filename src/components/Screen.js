import React, { memo, useLayoutEffect } from 'react'
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

const Screen = ({ objects, background, w, h, onChangeObject }) => {
  useLayoutEffect(() => {
    render(1000)
  })
  return (
    <Stage className={styles.wrap} width={w} height={h} options={{ transparent: true, autoStart: false, sharedTicker: true }}>
      <Sprite key={`bg`} texture={PIXI.Texture.fromImage(background.url)} width={w * 1.1} height={h * 1.1} x={-blur} y={-blur} filters={[blurFilter]} />
      {objects.map(obj => (
        <Sprite key={obj.id} texture={PIXI.Texture.fromImage(obj.image.url)} x={obj.x} y={obj.y} width={obj.w} height={obj.h} />
      ))}
    </Stage>
  )
}

export default memo(Screen)