
import { useState, useCallback } from 'react'

export const useDispatcher = ({ mutations, actions, refs, initialState }) => {
  const [state, setState] = useState({
    ...initialState
  })
  const commit = useCallback((name, payload) => {
    setState((prevState) => {
      mutations[name](prevState, payload)
      return prevState
    })
  }, [setState])
  const dispatch = useCallback((name, payload) => {
    actions[name]({ commit, refs }, payload)
  }, [commit])
  return [state, commit, dispatch]
}