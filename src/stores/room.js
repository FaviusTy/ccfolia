import React, { createContext, useReducer, useContext, useState } from 'react'
import { Record, OrderedMap, Map, fromJS } from 'immutable'

const RoomModel = Record({
  background: Map({ url: '' }),
  media: Map({
    url: '',
    loop: true,
    muted: true,
    volume: 0.05
  }),
  panel: Map({ url: '' }),
  objects: OrderedMap({}),
  messages: OrderedMap({}),
  datasheets: OrderedMap({}),
  log: ''
})

const MessageModel = fromJS // todo
const DataSheetModel = fromJS // todo
const MemoModel = fromJS // todo
const ObjectModel = fromJS // todo

const reducer = (_state, { type, payload }) => {
  console.log({ type, payload });
  const state = _state.update('log', (log) => {
    return `${log}${type} ${payload ? JSON.stringify(payload) : ''}\n`
      .split('\n')
      .slice(-300)
      .join('\n')
  })
  switch (type) {
    case 'INIT':
      console.log(state)
      return state
    case 'MESSAGE_SET':
      // MESSAGE_SET {"id":"$id","name":"hoge","text":"fugafuga"}
      return state.updateIn(['messages'], messages => {
        return messages.set(payload.id, MessageModel(payload))
      })
    case 'MEMO_SET':
      // MEMO_SET {"id":"$id","text":"hogehoge"}
      return state.setIn(['memo', payload.id], MemoModel(payload))
    case 'DATASEAT_SET':
      // DATASEAT_SET {"id":"$id","data":[["name","hp","mp"],["hoge",1,2],["figa",3,4],["moge",5,6]]}
      // DATASEAT_SET {"id":"$id","data":[["name","hp","mp"],[{"bg":"red","val":"1"},{"bg":"blue","val":"1"},{"bg":"green","val":"1"}]]}
      return state.setIn(['datasheets', payload.id], DataSheetModel(payload))
    case 'OBJECT_SET':
      // OBJECT_SET {"id":"$id","type":"image","image":{"url":"/icon-100x100.png"},"x":10,"y":10,"w":50,"h":50}
      return state.setIn(['objects', payload.id], ObjectModel(payload))
    case 'OBJECT_UPDATE':
      return state.mergeIn(['objects', payload.id], payload)
    case 'BACKGROUND_SET':
      // BACKGROUND_SET {"url":"/bg.jpg"}
      return state.mergeIn(['background'], payload)
    case 'MEDIA_SET':
      // MEDIA_SET {"url":"https://www.youtube.com/watch?v=-VKIqrvVOpo","loop":true,"muted":true,"volume":0.1}
      return state.mergeIn(['media'], payload)
    case 'CLEAR_ALL':
      return new RoomModel()
    default:
      return state
  }
}

const RoomStoreContext = createContext()
const initialState = new RoomModel()

const RoomStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state);
  return (
    <RoomStoreContext.Provider value={[state, dispatch]}>
      {children}
    </RoomStoreContext.Provider>
  )
}

export const useRoomStore = (mapToState) => {
  // todo: connect firebase
  return useContext(RoomStoreContext)
  // const [state, dispatch] = useContext(RoomStoreContext)
}

export default RoomStoreProvider