import React, { memo } from 'react'
import { Stage, Layer, Group, Rect, Text } from 'react-konva'
import BlurImage from './konva/BlurImage'
import Image from './konva/Image'

const _Obj = ({ id, type, image, x, y, w, h, onChangeObject }) => (
  <Image
    draggable
    onDragEnd={(e) => onChangeObject(id, e)}
    key={id}
    src={image.url}
    width={w}
    height={h}
    x={x}
    y={y}
  />
)
const Obj = memo(_Obj)

const Screen = ({ objects, background, w, h, onChangeObject }) => {
  return (
    <Stage width={w} height={h}>
      <Layer>
        <BlurImage
          key={background.url}
          src={background.url}
          blurRadius={10}
          width={w}
          height={h}
        />
        <Group draggable>
          <Rect
            width={3000}
            height={3000}
            x={-1500 + ~~(w * 0.5)}
            y={-1500 + ~~(h * 0.5)}
            stroke="#eee"
            strokeWidth={5}
          />
          {objects.map(obj => (
            <Obj key={obj.id} onChangeObject={onChangeObject} {...obj} />
          ))}
        </Group>
      </Layer>
    </Stage>
  )
}

export default memo(Screen)