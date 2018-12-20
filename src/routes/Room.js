import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import { useRoomStore, useRoomAction } from '../stores/room'
import { useMessagesStore } from '../stores/messages'
import { useTableStore } from '../stores/table'
import { useChatPaletStore } from '../stores/chatpalet'

// import Provider from '../stores/room'
// import { Provider, useRoomStore } from '../contexts/room'
// import { useFirestore } from '../modules/react-hooks-firebase'

import Table from '../containers/Table'
// import Console from '../containers/Console'
import ChatBox from '../containers/ChatBox'
import ChatPalet from '../containers/ChatPalet'

// import Modal from '../components/ui/Modal'
import Frame from '../components/ui/Frame'
import Messages from '../components/Messages'

const Count = () => {
  const count = useRoomStore(state => state)
  const { increment } = useRoomAction()
  return <p onClick={increment}>count: {count}</p>
}

const Room = ({
  match: {
    params: { id },
    url
  },
  location: {
    state
  },
  history: {
    replace,
    goBack
  }
}) => {
  const [messages] = useMessagesStore(id)
  const [table] = useTableStore(id)
  const [chatpalet] = useChatPaletStore('TEST_USER', id)
  return (<>
    <Route exact path={`${url}/console`} render={() => (
      <Frame onClose={() => replace(url)} title="Console">
        <h1>Console</h1>
      </Frame>
    )} />
    <Route exact path={`${url}/characters`} render={() => (
      <Frame onClose={() => replace(url)} title="Characters">
        <h1>Characters</h1>
      </Frame>
    )} />
    <Route exact path={`${url}/dice`} render={() => (
      <Frame onClose={() => replace(url)} title="Dice">
        <h1>Dice</h1>
      </Frame>
    )} />
    <Route exact path={`${url}/chatpalet`} render={() => (
      <Frame onClose={() => replace(url)} title="ChatPalet">
        <ChatPalet id={id} chatpalet={chatpalet} />
      </Frame>
    )} />
    <Table id={id} table={table} />
    <Messages id={id} messages={messages} />
    <ChatBox id={id} />
    {/* <Navigation url={url} onBack={goBack} /> */}
  </>)
}

export default Room

// 部屋
// - ログ
// - ユーザーリスト
// - テーブル状況
// - BGM