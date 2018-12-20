import React, { useCallback, memo } from 'react'
import { useTableAction } from '../stores/table'

import ReactPlayer from 'react-player'
import Screen from '../components/Screen'

const Table = ({ id, table }) => {
  if (!id || !table) return null
  const { update } = useTableAction({ rid: id, id: 'default' })
  const { objects, background, media } = table
  // todo
  const onChangeObject = useCallback((id, e) => {
    const x = e.currentTarget.x()
    const y = e.currentTarget.y()
    // dispatch({
    //   type: 'OBJECT_UPDATE',
    //   payload: { id, x, y }
    // })
  }, [update])
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
      {/* <Messages messages={messages} /> */}
    </>
  )
}

export default memo(Table)