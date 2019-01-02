import React, { useState, useEffect, useMemo, useCallback } from 'react'

import { useMeasure } from '../hooks/measure'
import { useCommand } from '../hooks/command'

// Stores
import { useGetter, useDispatcher, useObserver } from '../stores/index'

// Components
import { Link } from 'react-router-dom'
import Messages from '../components/Messages'
import Chat from '../components/Chat'
import Media from '../components/Media'
import DataSheets from '../components/DataSheets'
import Background from '../components/Background'
import Screen from '../components/Screen'
import Assets from '../components/Assets'
import Uploader from '../components/Uploader'
import MacroEditor from '../components/MacroEditor'

const Room = ({ rid }) => {
  // state
  const [scale, setScale] = useState(1)
  const [t, setTime] = useState(0)

  // store
  const user = useGetter('user')
  const messages = useGetter('room:messages')
  const table = useGetter('room:table')
  const objects = useGetter('objects')

  // observers
  useObserver('room:messages', rid)
  useObserver('room:table', rid)
  useObserver('objects', user.uid)

  // actions
  const { commit, dispatch } = useDispatcher()

  // init
  useEffect(() => {
    commit('room:init')
  }, [rid])

  // const [table, $table] = useTableStore({ params: [id, 'default'] })
  const datasheets = useMemo(() => [...Array(4)].map(() => ({})), [])

  // callbacks
  const exec = useCommand(dispatch, rid, user.uid)
  const onSubmitMessage = useCallback((data) => {
    if (!data.text) return
    const lines = data.text.split('\n')
    const pureText = lines.filter((line) => {
      return !exec(line)
    }).join('\n')
    if (pureText) {
      dispatch('messages:add', rid, {
        ...data,
        text: pureText
      })
    }
  }, [exec, dispatch])
  const onDrop = useCallback(async (files) => {
    try {
      const tasks = files.map((file) => {
        return dispatch('images:add', user.uid, file)
      })
      const urls = await Promise.all(tasks)
      urls.forEach((url) => window.open(url))
    } catch(err) {
      console.error(err)
    }
  }, [dispatch, user])

  const [[screenWidth, screenHeight], screenWrapRef] = useMeasure()

  // render
  return (<div className="Room">
    <Background url={table.background.url} />
    <div className="AreaScreen">
      {/* <div className="Background" style={{ backgroundImage: `url(${table.background.url})` }}></div> */}
      <div className="AreaScreenHead">
        <Media media={table.media} />
      </div>
      <div ref={screenWrapRef} className="AreaScreenBody">
        <Screen
          field={table.field}
          objects={table.objects}
          width={screenWidth}
          height={screenHeight}
          scale={scale}
          t={t}
          onChangeObject={console.log}
        />
        <div className="Buttons">
          {/* <a onClick={() => setDialog('fuga')}><span>🖋</span></a> */}
          <a onClick={() => setTime(Date.now())}><span>*</span></a>
          <a onClick={() => dispatch('room:table:set', rid, { field: { rotate: !table.field.rotate } })}><span>3d</span></a>
          <a onClick={() => dispatch('room:table:set', rid, { field: { grid: !table.field.grid } })}><span>#</span></a>
          <a onClick={() => setScale((prev) => prev + 0.1)}><span>+</span></a>
          <a onClick={() => setScale((prev) => prev - 0.1)}><span>-</span></a>
        </div>
        <MacroEditor />
        <div className="Players">
          <Link to="/">Lobby</Link>
          <p>4 players</p>
        </div>
        {/* <DataSheets datasheets={datasheets} /> */}
        <div className="Panels">
          <figure><img src="/man.png" alt=""/></figure>
          <figure><img src="/man.png" alt=""/></figure>
        </div>
      </div>
    </div>
    <div className="AreaChat">
      <Messages messages={messages} />
      <Assets
        onSubmit={onSubmitMessage}
        onAdd={() => dispatch('assets:objects:add', user.uid, { name: Date.now().toString(34) })}
        objects={objects}
      />
      <Chat onSubmit={onSubmitMessage} />
    </div>
  </div>)
}

const RouteRoom = ({ match: { params: { id } } }) => {
  return <Room rid={id} />
}

export default RouteRoom