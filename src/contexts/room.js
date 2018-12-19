
import React, { createContext, useContext } from 'react'
import { useDispatcher } from '../modules/react-hooks-dispatcher'
import { useFirestore, firestoreMutations, firestoreDispatcher } from '../modules/react-hooks-firebase'

// Room Context
const Context = createContext()

const actions = {
  MESSAGE_ADD: ({ refs }, paylaod) => {
    refs.messageRef.add({ text: 'hogehoge' })
  },
  increment: ({ commit }, payload) => {
    commit('increment')
  }
}

const mutations = {
  MESSAGE_ADD: (state) => {
    state.messages.push({ text: 1 })
  },
  incriment: (state) => {
    state.count++
  }
}

export const useRoomStore = () => {
  return useContext(Context)
}

export const Provider = ({ id, uid, children }) => {
  const [messages, messageRef] = useFirestore({
    select: (db) => db.collection(`rooms/${id}/messages`)
  })

  const [state, commit, dispatch] = useDispatcher({
    mutations: mutations,
    actions: actions,
    refs: { messageRef },
    initialState: {
      count: 0
    }
  })

  return (
    <Context.Provider value={{
      state: {
        ...state,
        messages
      },
      commit,
      dispatch,
      // firestore: {
      //   messages
      // }
    }}>{children}</Context.Provider>
  )
}