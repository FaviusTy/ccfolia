import React, { useMemo } from 'react'
import { pure } from 'recompose'
import { Stage, Layer, Text } from 'react-konva'
import BlurImage from '../components/konva/BlurImage'

// import { useStore as useRoomStore } from '../stores/room'
// import { useStore as useScreensStore } from '../stores/screens'

const Screen = ({ images, areas, width, height }) => (
  <Stage width={width} height={height}>
    <Layer>
      <BlurImage src="/bg.jpg" blurRadius={10} width={width} height={height}></BlurImage>
      <Text draggable text="Try click on rect" />
    </Layer>
  </Stage>
)

const ScreenContainer = () => {
  const [width, height] = useMemo(() => {
    return [window.innerWidth, window.innerHeight]
  })
  return (
    <Screen width={width} height={height} />
  )
}

export default pure(ScreenContainer)