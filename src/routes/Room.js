import React, { useMemo, useEffect, useCallback, memo } from 'react'
import { Route, Link } from 'react-router-dom'

import { useStore, useAction } from '../stores/room'

// import Provider from '../stores/room'
// import { Provider, useRoomStore } from '../contexts/room'
// import { useFirestore } from '../modules/react-hooks-firebase'

import Table from '../containers/Table'
// import Console from '../containers/Console'
import Navigation from '../containers/Navigation'
import ChatBox from '../containers/ChatBox'

import Modal from '../components/ui/Modal'
import Frame from '../components/ui/Frame'

const Count = memo(() => {
  const count = useStore(state => state)
  const { increment } = useAction()
  return <p onClick={increment}>count: {count}</p>
})

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
  return (<>
    <Route exact path={`${url}/console`} render={() => (
      <Frame onClose={() => replace(url)} title="Console">
        <h1>Console</h1>
        {/* <Console /> */}
      </Frame>
    )} />
    <Count />
    {/* <Route exact path={`${url}/objects`} render={() => (
      <Modal onClose={() => replace(url)}>
        <h1>My objects</h1>
      </Modal>
    )} />
    <Route exact path={`${url}/books`} render={() => (
      <Modal onClose={() => replace(url)}>
        <h1>My books</h1>
      </Modal>
    )} />
    <Route exact path={`${url}/effects`} render={() => (
      <Modal onClose={() => replace(url)}>
        <h1>My effects</h1>
      </Modal>
    )} /> */}
    <Table />
    {/* <Messages></Messages> */}
    <ChatBox />
    {/* <Navigation url={url} onBack={goBack} /> */}
  </>)
}

export default Room

// 部屋
// - ログ
// - ユーザーリスト
// - テーブル状況
// - BGM