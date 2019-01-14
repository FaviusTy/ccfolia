import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { useFirestore } from '../../firebase/hooks'

import Messages from './Messages'
import Screen from './Screen'
import Table from './Table'
import EditObj from './EditObj'
import EditField from './EditField'
import EditBG from './EditBG'
import EditMedia from './EditMedia'
import EditTable from './EditTable'
import Media from './Media'
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
    <StyledHeaderArea>
      <Media />
    </StyledHeaderArea>
    <StyledScreenArea>
      {/* <Screen /> */}
      <Table />
    </StyledScreenArea>
    <StyledChatArea>
      {/* <Messages /> */}
      <ChatBox />
      <StyledInputArea>
        {/* <EditMedia />
        <EditField />
        <EditBG /> */}
        <EditTable />
        <EditObj />
      </StyledInputArea>
    </StyledChatArea>
    <StyledMessagesArea>
      <Messages />
    </StyledMessagesArea>
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

const StyledMessagesArea = styled.div`
  position: absolute;
  left: 0;
  bottom: 60px;
  height: 40%;
`

const StyledChatArea = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
`

const StyledHeaderArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
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