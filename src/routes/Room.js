import React, { useState, useMemo, useCallback } from 'react'
import * as minimist from 'minimist'
import { parse } from '../modules/command-parser'
import useMeasure from '../modules/react-measure-hooks'

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
    x: Number,
    y: Number,
    row: Number,
    col: Number
  },
  'sheet': {
    key: String,
    value: Number
  },
  'clear': {}
}

const useExecFunc = ({ $table, $messages }) => {
  return useCallback((text) => {
    if (!text) return false
    const cmd = text.split(/\s/)[0]
    if (commands[cmd]) {
      const detail = parse(text, commands[cmd])
      console.log(detail)
      switch (cmd) {
        case 'clear':
          return $table.reset()
        case 'bg':
          return $table.set({ background: detail.data })
        case 'media':
          return $table.set({ media: detail.data })
        case 'obj':
          return $table.setObj(detail.data)
        default:
          return false
      }
    }
    return false
  }, [$table, $messages])
}

const Room = ({ id }) => {
  // state
  const [dialog, setDialog] = useState(null)
  const [input, setInput] = useState(initialInputState())

  // store
  const [messages, $messages] = useMessagesStore({ params: [id], order: ['timestamp'] })
  const [table, $table] = useTableStore({ params: [id, 'default'] })
  const datasheets = useMemo(() => [...Array(4)].map(() => ({})), [])

  // callbacks
  const exec = useExecFunc({ $table })
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
    {dialog === 'hoge' ? <TableEditor table={table} onSubmit={$table.set} /> : null}
    {dialog === 'fuga' ? (<div className="MacroBuilder">
      <div className="controls">
        <select name="cmd">
          <option value="bg">bg</option>
          <option value="media">media</option>
          <option value="obj">obj</option>
        </select>
        <button>+</button>
      </div>
    </div>) : null}
    <div className="AreaScreen">
      {/* <div className="Background" style={{ backgroundImage: `url(${table.background.url})` }}></div> */}
      <div className="AreaScreenHead">
        <Media media={table.media} />
      </div>
      <div ref={screenWrapRef} className="AreaScreenBody">
        <Screen objects={table.objects} w={1280} h={720} onChangeObject={console.log} />
        {/* <div>{Object.keys(table.objects).map((id) => {
          const { url, x, y, w, h } = table.objects[id]
          return <img key={id} src={url} width={w} height={h} style={{transform: `translate(${x}px, ${y}px)`}} />
        })}</div> */}
        <div className="Buttons">
          <a onClick={() => setDialog('fuga')}><span>🖋</span></a>
          <a onClick={() => setDialog(null)}><span>+</span></a>
        </div>
        <div className="Players">
          <Link to="/">Logout</Link>
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