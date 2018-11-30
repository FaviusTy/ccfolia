import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from '../containers/Navigation'
import RoomList from '../containers/RoomList'

const Home = ({
  location: {
    state
  }
}) => {
  return (<>
    <Route exact path="/" component={RoomList} />
    <Route exact path="/objects" render={() => "hoge"} />
    <Route exact path="/object/:objectId" render={() => "hoge"} />
    <Route exact path="/books" render={() => "hoge"} />
    <Route exact path="/book/:bookId" render={() => "hoge"} />
    <Route exact path="/book/:bookId/scenes" render={() => "hoge"} />
    <Route exact path="/book/:bookId/scene/:sceneId" render={() => "hoge"} />
    <Route exact path="/book/:bookId/memo" render={() => "hoge"} />
    <Route exact path="/book/:bookId/memo/:memoId" render={() => "hoge"} />
    <Route exact path="/book/:bookId/objects" render={() => "hoge"} />
    <Route exact path="/book/:bookId/object/:objectId" render={() => "hoge"} />
    <Navigation />
    {state && state.room ? <p>room: {state.room}</p> : null}
  </>)
}

export default Home