import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import { useRoomStore, useRoomAction } from '../stores/room'
import { useMessagesStore } from '../stores/messages'
import { useTableStore } from '../stores/table'
import { useChatPaletsStore } from '../stores/chatpalets'
import { useScenesStore } from '../stores/scenes'

import Table from '../containers/Table'
import ChatBox from '../containers/ChatBox'
import ChatPalets from '../containers/ChatPalets'
import Scenes from '../containers/Scenes'

// import Modal from '../components/ui/Modal'
import Frame from '../components/ui/Frame'
import Messages from '../components/Messages'
import MenuSide from '../components/MenuSide'

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
  const [chatpalets] = useChatPaletsStore('TEST_USER')
  const [scenes] = useScenesStore('TEST_USER')
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
    <Route exact path={`${url}/chatpalets`} render={() => (
      <Frame onClose={() => replace(url)} title="ChatPalet">
        <ChatPalets id={id} chatpalets={chatpalets} />
      </Frame>
    )} />
    <Route exact path={`${url}/datasheats`} render={() => (
      <Frame onClose={() => replace(url)} title="DataSheats">
      </Frame>
    )} />
    <Route exact path={`${url}/objects`} render={() => (
      <Frame onClose={() => replace(url)} title="Objects">
      </Frame>
    )} />
    <Route exact path={`${url}/effects`} render={() => (
      <Frame onClose={() => replace(url)} title="Effects">
      </Frame>
    )} />
    <Route exact path={`${url}/media`} render={() => (
      <Frame onClose={() => replace(url)} title="Media">
        <Scenes id={id} scenes={scenes} />
      </Frame>
    )} />
    <Route exact path={`${url}/notes`} render={() => (
      <Frame onClose={() => replace(url)} title="Notes">
      </Frame>
    )} />
    <Table id={id} table={table} />
    <Messages id={id} messages={messages} />
    <ChatBox id={id} />
    <MenuSide
      onBack={goBack}
    />
    {/* <Navigation url={url} onBack={goBack} /> */}
  </>)
}

export default Room

// 部屋
// - ログ
// - ユーザーリスト
// - テーブル状況
// - BGM