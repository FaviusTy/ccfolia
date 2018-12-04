import React, { useMemo, useCallback } from 'react'
import { useRoomStore } from '../stores/room'

import ReactPlayer from 'react-player'
import Screen from '../components/Screen'
import Messages from '../components/Messages'
import DataSheets from '../components/DataSheets'

const Table = () => {
  const [state, dispatch] = useRoomStore()
  const {
    messages,
    objects,
    background,
    media,
    datasheets
  } = useMemo(() => ({
      messages: state.get('messages').valueSeq().toJS(),
      objects: state.get('objects').valueSeq().toJS(),
      datasheets: state.get('datasheets').valueSeq().toJS(),
      background: state.get('background').toJS(),
      media: state.get('media').toJS(),
  }), [state])

  console.log(datasheets);


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
      <DataSheets items={datasheets} />
      <ReactPlayer
        className="player"
        url={media.url}
        playing
        loop={media.loop}
        muted={media.muted}
        width={160}
        height={90}
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

export default Table