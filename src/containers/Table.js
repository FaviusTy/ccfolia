import React, { useMemo, useCallback, useEffect, memo } from 'react'
// import { useRoomStore } from '../contexts/room'

import ReactPlayer from 'react-player'
import Screen from '../components/Screen'
import Messages from '../components/Messages'

const Table = () => {
  // const { state, dispatch } = useRoomStore((state) => state.messages)
  const state = { messages: [] }
  const dispatch = () => {}
  // todo
  const { messages } = state
  const objects = []
  const background = { url: '/bg.jpg' }
  const media = {
    // url: 'https://www.youtube.com/watch?v=WSUFzC6_fp8',
    url: '',
    loop: true,
    muted: true,
    volume: 0.1
  }
  const onChangeObject = useCallback((id, e) => {
    const x = e.currentTarget.x()
    const y = e.currentTarget.y()
    dispatch({
      type: 'OBJECT_UPDATE',
      payload: { id, x, y }
    })
  }, [dispatch])
  return (
    <>
      {/* bg */}
      <Screen
        background={background}
        objects={objects}
        w={1080}
        h={720}
        onChangeObject={onChangeObject}
      />
      {/* <DataSheets items={datasheets} /> */}
      <ReactPlayer
        className="player"
        url={media.url}
        playing
        loop={media.loop}
        muted={media.muted}
        volume={media.volume}
        width={80}
        height={45}
      />
      {/* {objects.map(({ id, url, w, h, x, y }) => (
        <img key={id} src={url} alt="" width={w} height={h} style={{
          transform: `translate(${x}px, ${y}px)`
        }} />
      ))} */}
      <Messages messages={messages} />
    </>
  )
}

export default memo(Table)