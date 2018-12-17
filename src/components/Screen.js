import React, { memo, useRef, useEffect, useLayoutEffect } from 'react'
import * as PIXI from 'pixi.js'
import { Stage, Sprite } from 'react-pixi-fiber'
import styles from './styles/Screen.module.css'
// import { Stage, Layer, Group, Rect, Text } from 'react-konva'
// import BlurImage from './konva/BlurImage'
// import Image from './konva/Image'

// const _Obj = ({ id, type, image, x, y, w, h, onChangeObject }) => (
//   <Image
//     draggable
//     onDragEnd={(e) => onChangeObject(id, e)}
//     key={id}
//     src={image.url}
//     width={w}
//     height={h}
//     x={x}
//     y={y}
//   />
// )
// const Obj = memo(_Obj)

// const KonvaScreen = ({ objects, background, w, h, onChangeObject }) => {
//   return (
//     <Stage width={w} height={h}>
//       <Layer>
//         <BlurImage
//           key={background.url}
//           src={background.url}
//           blurRadius={10}
//           width={w}
//           height={h}
//         />
//         <Group draggable>
//           <Rect
//             width={3000}
//             height={3000}
//             x={-1500 + ~~(w * 0.5)}
//             y={-1500 + ~~(h * 0.5)}
//             stroke="#eee"
//             strokeWidth={5}
//           />
//           {objects.map(obj => (
//             <Obj key={obj.id} onChangeObject={onChangeObject} {...obj} />
//           ))}
//         </Group>
//       </Layer>
//     </Stage>
//   )
// }

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