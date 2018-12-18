import React, { useMemo, useEffect, memo } from 'react'
import { Route, Link } from 'react-router-dom'

// import Provider from '../stores/room'
import { Provider, commit, useStore } from '../contexts/room'
import { useFirestore } from '../modules/react-hooks-firebase'

import Table from '../containers/Table'
import Console from '../containers/Console'
import Navigation from '../containers/Navigation'
import ChatBox from '../containers/ChatBox'

import Modal from '../components/Modal'

const Messages = () => {
  const [messages] = useStore((state) => state.messages)
  return (<>
    {messages.map(({ text }) => {
      return <p>{text}</p>
    })}
  </>)
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
  const m = useFirestore({
    name: 'messages',
    type: 'collection',
    select: (db) => db.collection(`rooms/${id}/messages`)
  }, commit)
  // useEffect(() => {
  //   setTimeout(() => {
  //     m.add({ text: 1 })
  //   }, 300)
  // }, [])
  return (<>
    <Provider>
      <Route exact path={`${url}/console`} render={() => (
        <Modal onClose={() => replace(url)}>
          <Console />
        </Modal>
      )} />
      <Route exact path={`${url}/objects`} render={() => (
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
      )} />
      {/* <Table /> */}
      <Messages></Messages>
      <ChatBox />
    </Provider>
    <Navigation url={url} onBack={goBack} />
  </>)
}

export default memo(Room)


// 部屋
// - ログ
// - ユーザーリスト
// - テーブル状況
// - BGM