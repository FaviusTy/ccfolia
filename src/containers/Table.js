import React, { useMemo, useCallback, useEffect } from 'react'
import { useRoomStore } from '../contexts/room'

import ReactPlayer from 'react-player'
import Screen from '../components/Screen'
import Messages from '../components/Messages'

const Table = () => {
  const { state, dispatch } = useRoomStore()
  const { messages } = state
  const objects = []
  const background = { url: '' }
  const media = {
    url: 'https://www.youtube.com/watch?v=WSUFzC6_fp8',
    loop: true,
    muted: true,
    volume: 0.1
  }
  console.log(messages);

  // const [room, doc] = useDocument({
  //   select: (db) => db.doc('rooms/1'),
  //   initialState: {
  //     background: {
  //       url: ''
  //     },
  //     media: {
  //       url: '',
  //       loop: true,
  //       muted: true,
  //       volume: 0.025
  //     }
  //   }
  // })

  // useEffect(() => {
  //   doc.set({
  //     background: {
  //       url: '/bg.jpg'
  //     },
  //     media: {
  //       url: 'https://www.youtube.com/watch?v=WSUFzC6_fp8',
  //       loop: true,
  //       muted: false,
  //       volume: 0.1
  //     }
  //   })
  // }, [])

  // const [messages] = useCollection({
  //   select: (db) => db.collection('rooms/1/messages')
  // })

  // const [messages2] = useCollection({
  //   select: (db) => db.collection('rooms/1/messages')
  // })

  // const { background, media } = room

  // doc.set({
  //   background: {
  //     url: '/bg.jpg'
  //   }
  // })

  // const {
  //   // messages,
  //   objects,
  //   background,
  //   media,
  //   // datasheets
  // } = useMemo(() => ({
  //     // messages: state.get('messages').valueSeq().toJS(),
  //     objects: state.get('objects').valueSeq().toJS(),
  //     datasheets: state.get('datasheets').valueSeq().toJS(),
  //     background: state.get('background').toJS(),
  //     media: state.get('media').toJS(),
  // }), [state])

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

export default Table