import { createStore } from 'redux'
import { useState, useEffect } from 'react'

// util
export const mutationsToReducer = (mutations) => {
  return (state, action) => {
    if (typeof mutations[action.type] === 'function') {
      const nextState = mutations[action.type](state, action.payload)
      if (nextState) {
        return { ...nextState }
      } else {
        return { ...state }
      }
    }
    return state
  }
}

// main
export const createReactReduxHooks = ({
  reducer,
  actions,
  observers,
  getters,
  initialState
}) => {

  // store
  const store = createStore(reducer, initialState)
  const commit = (type, payload) => store.dispatch({ type, payload })
  const select = (key, ...args) => getters[key](store.getState(), ...args)
  const context = {
    commit,
    select
  }

  // actions to dispather
  const dispatch = (type, ...args) => {
    if (typeof actions[type] === 'function') {
      return actions[type](context, ...args)
    }
  }

  const useGetter = (key, ...args) => {
    if (typeof getters[key] !== 'function') return null
    const [state, setState] = useState(getters[key](store.getState(), ...args))
    useEffect(() => {
      return store.subscribe(() => {
        const prevState = state
        const nextState = getters[key](store.getState(), ...args)
        if (prevState !== nextState) {
          setState(nextState)
        }
      })
    }, [key, ...args])
    return state
  }

  const useDispatcher = () => {
    return { commit, dispatch }
  }

  const useObserver = (key, ...args) => {
    useEffect(() => {
      return observers[key]({ commit, dispatch, select }, ...args)
    }, [key, ...args])
  }

  return { store, useGetter, useDispatcher, useObserver }
}
