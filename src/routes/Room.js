import React, { useState, useEffect, useMemo, useCallback } from 'react'
// import * as minimist from 'minimist'
import { parse } from '../modules/command-parser'
import { useMeasure } from '../hooks/react-measure-hooks'
// import innerHeight from 'ios-inner-height'

// Stores
import { useMessagesStore, useMessagesAction } from '../stores/messages'
import { useTableStore, useTableAction } from '../stores/table'
import { useGetter, useDispatcher, useObserver } from '../stores/index'

// Components
import { Link } from 'react-router-dom'
import Messages from '../components/Messages'
import Chat from '../components/Chat'
import Media from '../components/Media'
import DataSheets from '../components/DataSheets'
import Background from '../components/Background'
import Screen from '../components/Screen'
import Dropzone from 'react-dropzone'
import { useEffectsAction } from '../stores/effects';

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

const useExecFunc = (dispatch, context) => {
  return useCallback((text) => {
    if (!text) return false
    const cmd = text.split(/\s/)[0]
    if (commands[cmd]) {
      const detail = parse(text, commands[cmd])
      switch (cmd) {
        case 'clear_table':
          return dispatch('table:clear', context)
        case 'clear_msg':
          return dispatch('messages:clear', context)
        case 'bg':
          return dispatch('table:set', context, { background: detail.data })
        case 'field':
          return dispatch('table:set', context, { field: detail.data })
        case 'media':
          return dispatch('table:set', context, { media: detail.data })
        case 'obj':
          return dispatch('table:obj:set', context, detail.data)
        default:
          return false
      }
    }
    return false
  }, [dispatch, context])
}

const Room = ({ rid }) => {
  // state
  const [scale, setScale] = useState(1)
  const [t, setTime] = useState(0)

  // store
  const user = useGetter('user')
  const messages = useGetter('messages')
  const table = useGetter('table')
  const images = useGetter('images')

  // observers
  useObserver('messages', rid)
  useObserver('table', rid)

  // actions
  const { commit, dispatch } = useDispatcher()

  // init
  useEffect(() => {
    commit('room:init')
  }, [rid])

  // const [table, $table] = useTableStore({ params: [id, 'default'] })
  const datasheets = useMemo(() => [...Array(4)].map(() => ({})), [])

  // callbacks
  const exec = useExecFunc(dispatch, rid)
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
  const onDrop = useCallback((files) => {
    files.map((file) => {
      return dispatch('images:add', { uid: user.uid, oid: 'default' }, file)
    })
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
        <div className="Uploader">
          <p>aaaaaaaaaaaaaa</p>
          <Dropzone onDrop={onDrop}>{({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              aaaaaaaaaaaaaaa
              <input {...getInputProps()} />
            </div>
          )}</Dropzone>
          {images.map(({ id, url }) => {
            return <img onClick={() => dispatch('table:set', rid, { background: { url } })} key={id} src={url} width="100" height="100" />
          })}
        </div>
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
          <a onClick={() => dispatch('table:set', rid, { field: { rotate: !table.field.rotate } })}><span>3d</span></a>
          <a onClick={() => dispatch('table:set', rid, { field: { grid: !table.field.grid } })}><span>#</span></a>
          <a onClick={() => setScale((prev) => prev + 0.1)}><span>+</span></a>
          <a onClick={() => setScale((prev) => prev - 0.1)}><span>-</span></a>

        </div>
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
      <Chat onSubmit={onSubmitMessage} />
    </div>
  </div>)
}

const RouteRoom = ({ match: { params: { id } } }) => {
  return <Room rid={id} />
}

export default RouteRoom