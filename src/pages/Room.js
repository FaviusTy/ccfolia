import React from 'react'
import Messages from '../containers/Messages'
import Characters from '../containers/Characters'
import Screen from '../containers/Screen'

const Room = ({ roomId }) => {
  return (<>
    <Screen></Screen>
    {roomId}
    <Messages></Messages>
    <Characters roomId={roomId}></Characters>
  </>)
}

export default Room