import React, { useMemo, useEffect, memo } from 'react'
import { Route, Link } from 'react-router-dom'

// import Provider from '../stores/room'
import { Provider, useRoomStore } from '../contexts/room'
// import { useFirestore } from '../modules/react-hooks-firebase'

import Table from '../containers/Table'
import Console from '../containers/Console'
import Navigation from '../containers/Navigation'
import ChatBox from '../containers/ChatBox'

import Modal from '../components/Modal'

// const Messages = memo(() => {
//   const { state, dispatch, commit } = useRoomStore()
//   return (<>
//     <button onClick={() => dispatch('MESSAGE_ADD')}>ddd</button>
//     {state.messages.map(({ text }, i) => {
//       return <p key={i}>{text}</p>
//     })}
//   </>)
// })

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
    <Provider id={id}>
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
      <Table />
      {/* <Messages></Messages> */}
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