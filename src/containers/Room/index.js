import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { useFirestore } from '../../firebase/hooks'

import Messages from './Messages'
import Screen from './Screen'
import EditObj from './EditObj'
import EditField from './EditField'
import EditBG from './EditBG'
import ChatBox from './ChatBox'
import Controls from './Controls'

const selectMessages = (id) => (db) => db.collection(`rooms/${id}/messages`).orderBy('t')
const selectTable = (id) => (db) => db.collection(`rooms/${id}/tables`).doc('default')
const selectObjects = (id) => (db) => db.collection(`rooms/${id}/objects`)

const Room = ({ id, init, messageChanges, objectChanges, tableChange }) => {
  useFirestore(selectMessages(id), messageChanges)
  useFirestore(selectObjects(id), objectChanges)
  useFirestore(selectTable(id), tableChange)

  useEffect(() => {
    init(id)
    return () => init(null)
  }, [id])

  return (<Container>
    <StyledScreenArea>
      <Screen />
    </StyledScreenArea>
    <StyledChatArea>
      <Messages />
      <ChatBox />
      <StyledInputArea>
        <EditField />
        <EditObj />
        <EditBG />
      </StyledInputArea>
    </StyledChatArea>
    <StyledMenu>
      <Controls />
    </StyledMenu>
  </Container>)
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

const mapDispatchToProps = {
  messageChanges: (changes) => {
    return {
      type: 'MESSAGE_CHANGES',
      changes
    }
  },
  objectChanges: (changes) => {
    return {
      type: 'OBJECT_CHANGES',
      changes
    }
  },
  tableChange: (item) => {
    return {
      type: 'TABLE_SET',
      item
    }
  },
  init: (id) => {
    return {
      type: 'ROOM_INIT',
      id
    }
  }
}

const Container = styled.div`
  /* :before {
    content: "";
    display: block;
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    filter: blur(8px);
    background: url(/bg.jpg);
    background-size: cover;
  } */
`

const StyledMenu = styled.div`
  margin-bottom: 12px;
  position: absolute;
  right: 0;
  bottom: 40%;
`

const StyledInputArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  /* top: 0; */
`

const StyledChatArea = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
`

const StyledScreenArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)