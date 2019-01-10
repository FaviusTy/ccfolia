import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { useFirestore } from '../../firebase/hooks'

import { FaBeer, FaComment, FaDiceD20 } from 'react-icons/fa';

import Messages from './Messages'
import Screen from './Screen'
import EditObj from './EditObj'
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
      <EditObj />
      <ChatBox />
    </StyledChatArea>
      <StyledMenu>
        <button type="button"><FaBeer /></button>
        <button type="button"><FaComment /></button>
        <button type="button"><FaDiceD20 /></button>
        <button type="button">D</button>
        <button type="button">E</button>
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
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 8px;
  bottom: 42%;
  button {
    border: none;
    border-radius: 50%;
    outline: none;
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.4);
    color: #eee;
    font-size: 14px;
  }
  button + button {
    margin-top: 8px;
  }
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