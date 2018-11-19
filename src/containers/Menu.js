import React, { useMemo } from 'react'
import { useStore } from '../stores/menu'

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