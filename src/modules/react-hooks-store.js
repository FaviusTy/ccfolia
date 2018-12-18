import React, { createContext, useContext, useState, useEffect } from 'react'

export const createStore = (actions, mutations, initialState = {}) => {
  const state = { ...initialState }
  const callbacks = []
  const off = (cb) => {
    const index = callbacks.indexOf(cb)
    if (index > -1) {
      callbacks.splice(index, 1)
    }
  }
  const on = (cb) => {
    if (!callbacks.includes(cb)) {
      callbacks.push(cb)
    }
    return () => off(cb)
  }
  const fire = (state) => {
    return callbacks.map(cb => cb(state))
  }
  const commit = (name, payload) => {
    if (typeof mutations[name] === 'function') {
      mutations[name](state, payload)
      fire(state)
    }
  }
  const dispatch = (name, payload) => {
    if (typeof actions[name] === 'function') {
      return actions[name]({ commit }, payload)
    }
  }
  const Context = createContext()
  const Provider = ({ children, store }) => {
    return <Context.Provider value={{...store}}>{children}</Context.Provider>
  }
  const useStore = (mapToState, initialState = []) => {
    const [localState, setLocalState] = useState(initialState)
    const context = useContext(Context)
    useEffect(() => {
      return on((state) => {
        const nextLocalState = mapToState(state)
        if (nextLocalState !== localState) {
          setLocalState(nextLocalState)
        }
      })
    }, [state])
    return [localState, context]
  }

  return { Provider, dispatch, commit, useStore }
}
