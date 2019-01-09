import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { useFirestore } from '../../firebase/hooks'

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
    <Controls />
    <EditObj />
    <Screen />
    <ChatBox />
    <Messages />
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

const Container = styled.div``

const ChatArea = styled.div`
  position: absolute;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)

// import { useGetter, useDispatcher, useObserver } from '../../stores/index'

// import Chat from './Chat'
// import Messages from './Messages'
// import Assets from './Assets'
// import Screen from './Screen'
// import EditObj from './EditObj'

// import Blur from 'react-blur'

// const Room = ({ id }) => {
//   const uid = useGetter('user:id')
//   const table = useGetter('room:table', id)

//   useObserver('room:messages', id)
//   useObserver('room:table', id)
//   useObserver('user:assets', uid)

//   const { commit } = useDispatcher()

//   // init
//   useEffect(() => {
//     commit('room:init', id)
//     return () => commit('room:init', null)
//   }, [id])

//   return (<Content>
//     {/* <Background key={table.background.url} img={table.background.url} blurRadius={8} /> */}
//     <MessagesArea />
//     <ChatArea />
//     <AssetsArea />
//     <ScreenArea />
//     <EditObj />
//     {/* <Layer></Layer> */}
//   </Content>)
// }

// const Content = styled.div`
//   display: grid;
//   grid-template-rows: 60px 1fr 42px;
//   grid-template-columns: 1fr 30%;
//   grid-template-areas:
//     "header side"
//     "main side"
//     "main bottom"
//   ;
//   height: 100vh;
//   overflow: hidden;
//   @media (max-width: 720px) {
//     grid-template-rows: 60px 1fr 40% 42px;
//     grid-template-columns: 1fr;
//     grid-template-areas:
//       "header"
//       "main"
//       "side"
//       "bottom"
//     ;
//   }
// `

// const AssetsArea = styled(Assets)`
//   grid-area: 1 / 1 / 99 / 99;
//   background: rgba(0, 0, 0, 0.8) !important;
//   z-index: 100;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const Background = styled(Blur)`
//   grid-area: 1 / 1 / 99 / 99;
//   z-index: -1;
//   object-fit: cover;
// `

// const MessagesArea = styled(Messages)`
//   grid-area: side;
//   background: rgba(0, 0, 0, 0.2);
//   z-index: 10;
// `

// const ChatArea = styled(Chat)`
//   grid-area: bottom;
//   background: #eee;
//   z-index: 10;
// `

// const ScreenArea = styled(Screen)`
//   grid-area: main;
//   overflow: hidden;
//   z-index: 1;
// `

// const Popup = styled.div`
//   width: 80%;
//   height: 80%;
//   background: #fff;
// `

// export default Room