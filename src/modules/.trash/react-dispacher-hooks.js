import { useCallback } from 'react'

const useDispatcher = (...actions) => {
  return useCallback((name, payload) => {
    return actions.map((action) => {
      if (typeof action[name] === 'function') {
        return action[name](payload)
      }
    })
  }, [...actions])
}

export default useDispatcher