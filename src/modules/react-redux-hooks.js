import { useState, useEffect } from 'react'

export const createReactReduxHooks = (store, actions) => {

  const useStore = (mapState) => {
    const [state, setState] = useState(mapState(store.getState()))
    useEffect(() => {
      return store.subscribe(() => {
        const prevState = state
        const nextState = mapState(store.getState())
        if (prevState !== nextState) {
          setState(nextState)
        }
      })
    })
    return state
  }

  const useAction = () => {
    return actions(store.dispatch)
  }

  return { useStore, useAction }
}
