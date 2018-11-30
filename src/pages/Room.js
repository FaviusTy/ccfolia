import React from 'react'
import { Route, Link } from 'react-router-dom'

import Messages from '../containers/Messages'
import Characters from '../containers/Characters'
import Screen from '../containers/Screen'
import Navigation from '../containers/Navigation'

import Modal from '../components/Modal'
import BlueImage from '../components/konva/BlurImage';

const CharactersModal = ({
  match: {
    url
  },
  history: {
    goBack,
    replace
  }
}) => {
  return (
    <Modal onClose={goBack} show={true}>
      <Route exact path={url} render={() => <a onClick={() => replace(`${url}/fuga`)}>next</a>} />
      {/* <CharactersList onSelect={(id) => to(`${url}/${id}`)} onClose={() => goBack()} /> */}
      <Route exact path={`${url}/:itemId`} render={() => "ppp"} />
        {/* <CharactersDetail onClose={() => goBack()} /> */}
    </Modal>
  )
}


const Room = ({
  match: {
    params: { id },
    url
  },
  history: {
    goBack
  }
}) => {
  return (<>
    {/* <Screen /> */}
    <Route exact path={`${url}/characters`} render={() => 'characters'} />
    <Route exact path={`${url}/character/:characterId`} render={() => 'character'} />
    <Route exact path={`${url}/books`} render={() => 'boooks'} />
    <Route exact path={`${url}/book/:bookId`} render={() => 'book'} />
    <Route exact path={`${url}/book/:bookId/scenes`} render={() => 'book/scenes'} />
    <Messages />
    <Navigation />
  </>)
}

export default Room


// 部屋
// - ログ
// - ユーザーリスト
// - テーブル状況
// - BGM