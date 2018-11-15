import React, { useMemo } from 'react'
import { Stage, Layer, Text } from 'react-konva'
import BlurImage from '../components/konva/BlurImage'

import { useStore as useRoomStore } from '../stores/room'
import { useStore as useScreensStore } from '../stores/screens'


const Screen = ({ images, areas, width, height }) => (
  <Stage width={width} height={height}>
    <Layer>
      <BlurImage src="/bg.jpg" blurRadius={10} width={width} height={height}></BlurImage>
      <Text draggable text="Try click on rect" />
    </Layer>
  </Stage>
)

const ScreenContainer = () => {
  const [currentTableIndex, roomStore] = useRoomStore((state) => state.currentTableIndex)
  const [table, tablesStore] = useScreensStore((state) => state[currentTableIndex])
  const [width, height] = useMemo(() => {
    return [window.innerWidth, window.innerHeight]
  })
  return (
    <Screen width={width} height={height} {...table}></Screen>
  )
}

export default ScreenContainer