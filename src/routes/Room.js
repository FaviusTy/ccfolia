import React, { useState, useMemo, useCallback } from 'react'
// import * as minimist from 'minimist'
import { parse } from '../modules/command-parser'
import { useMeasure } from '../modules/react-measure-hooks'
// import innerHeight from 'ios-inner-height'

// Stores
import { useMessagesStore, useMessagesAction } from '../stores/messages'
import { useTableStore, useTableAction } from '../stores/table'

// Components
// import { SubRoute, SubLink, BackLink } from '../modules/react-router-hooks'
import { Link } from 'react-router-dom'
import Messages from '../components/Messages'
import Chat from '../components/Chat'
import Media from '../components/Media'
import DataSheets from '../components/DataSheets'
import TableEditor from '../components/TableEditor'
import Background from '../components/Background'
import Screen from '../components/Screen'

const initialInputState = () => ({
  name: '',
  type: 'text',
  text: '',
  images: [],
  color: 'default',
  from: 'TEST_USER',
  to: []
})

const commands = {
  'bg': {
    url: String
  },
  'media': {
    name: String,
    url: String,
    muted: Boolean,
    loop: Boolean,
    volume: Number
  },
  'obj': {
    id: String,
    url: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number
  },
  'field': {
    url: String,
    row: Number,
    col: Number,
    baseSize: Number,
    grid: Boolean,
    rotate: Boolean
  },
  'sheet': {
    key: String,
    value: Number
  },
  'clear_table': {},
  'clear_msg': {},
}

const useExecFunc = ({
  $table,
  $messages,
}, {
  table,
  messages
}) => {
  return useCallback((text) => {
    if (!text) return false
    const cmd = text.split(/\s/)[0]
    if (commands[cmd]) {
      const detail = parse(text, commands[cmd])
      switch (cmd) {
        case 'clear_table':
          return $table.reset()
        case 'clear_msg':
          return $messages.deleteAll(messages)
        case 'bg':
          return $table.set({ background: detail.data })
        case 'field':
          return $table.set({ field: detail.data })
        case 'media':
          return $table.set({ media: detail.data })
        case 'obj':
          return $table.setObj(detail.data)
        default:
          return false
      }
    }
    return false
  }, [$table, $messages, table, messages])
}

const Room = ({ id }) => {
  // state
  const [scale, setScale] = useState(1)
  const [dialog, setDialog] = useState(null)
  const [input, setInput] = useState(initialInputState())
  const [t, setTime] = useState(0)

  // store
  const [messages, $messages] = useMessagesStore({ params: [id], order: ['timestamp'] })
  const [table, $table] = useTableStore({ params: [id, 'default'] })
  const datasheets = useMemo(() => [...Array(4)].map(() => ({})), [])

  // callbacks
  const exec = useExecFunc({ $table, $messages }, { table, messages })
  const onSubmitMessage = useCallback((data) => {
    if (!data.text) return
    const lines = data.text.split('\n')
    const pureText = lines.filter((line) => {
      return !exec(line)
    }).join('\n')
    if (pureText) {
      $messages.add({
        ...data,
        text: pureText
      })
    }
  }, [exec, $messages])

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
          <a onClick={() => $table.set({ field: { rotate: !table.field.rotate } })}><span>3d</span></a>
          <a onClick={() => $table.set({ field: { grid: !table.field.grid } })}><span>#</span></a>
          <a onClick={() => setScale((prev) => prev + 0.1)}><span>+</span></a>
          <a onClick={() => setScale((prev) => prev - 0.1)}><span>-</span></a>

        </div>
        <div className="Players">
          <Link to="/">Lobby</Link>
          <p>4 players</p>
        </div>
        <DataSheets datasheets={datasheets} />
        <div className="Panels">
          <figure><img src="/man.png" alt=""/></figure>
          <figure><img src="/man.png" alt=""/></figure>
        </div>
      </div>
    </div>
    <div className="AreaChat">
      <Messages messages={messages} />
      <Chat onSubmit={onSubmitMessage} />
    </div>
  </div>)
}

const RouteRoom = ({ match: { params: { id } } }) => {
  return <Room id={id} />
}

export default RouteRoom