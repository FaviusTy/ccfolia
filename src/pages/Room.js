import React from 'react'
import Messages from '../containers/Messages'
import Characters from '../containers/Characters'

const Room = ({ roomId }) => {
  return (<>
    {roomId}
    <Messages></Messages>
    <Characters roomId={roomId}></Characters>
  </>)
}

export default Room