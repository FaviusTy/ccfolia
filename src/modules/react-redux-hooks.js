import { useState, useEffect } from 'react'

export const createReactReduxHooks = (store, actions) => {

  const useStore = (mapToState) => {
    const [state, setState] = useState(mapToState(store.getState()))
    useEffect(() => {
      return store.subscribe(() => {
        const prevState = state
        const nextState = mapToState(store.getState())
        if (prevState !== nextState) {
          setState(nextState)
        }
      })
    })
    return [state, store.dispatch]
  }

  const useAction = () => {
    return actions(store.dispatch)
  }

  return { useStore, useAction }
}
