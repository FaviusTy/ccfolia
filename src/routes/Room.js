import React, { useMemo, useEffect, memo } from 'react'
import { Route, Link } from 'react-router-dom'

import Provider from '../stores/room'

import Table from '../containers/Table'
import Console from '../containers/Console'
import Navigation from '../containers/Navigation'
import ChatBox from '../containers/ChatBox'

import Modal from '../components/Modal'

import { useCollection } from '../modules/react-hooks-firebase'

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
  const [tekitos, tekitoCollection] = useCollection({
    select: (db) => db.collection('/hoge')
  })
  const h = useEffect(() => {
    console.log(111);
    tekitoCollection.add({ hoge: 1 })
  }, [])
  return (<>
    {/* <Screen /> */}
    <Provider>
      <Route exact path={`${url}/console`} render={() => (
        <Modal onClose={() => replace(url)}>
          <Console />
        </Modal>
      )} />
      <Route exact path={`${url}/objects`} render={() => (
        <Modal onClose={() => replace(url)}>
          <h1>My objects</h1>
          {/* <Characters /> */}
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
      <ChatBox />
    </Provider>
    {tekitos.map((t) => (<p>{t.data.hoge}</p>))}
    <Navigation url={url} onBack={goBack} />
  </>)
}

export default memo(Room)


// 部屋
// - ログ
// - ユーザーリスト
// - テーブル状況
// - BGM