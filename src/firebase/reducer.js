
export const collectionReducer = (state, { payload }) => {
  return [...payload].reduce((currentState, { type, doc }) => {
    switch (type) {
      case 'removed': {
        return currentState.filter((item) => {
          return item.id !== doc.id
        })
      }
      case 'modified': {
        return currentState.map((item) => {
          if (item.id === doc.id) {
            return {　...doc.data(),　id: doc.id　}
          } else {
            return item
          }
        })
      }
      case 'added': {
        return [...currentState, { ...doc.data(), id: doc.id }]
      }
      default:
        return currentState
    }
  }, state)
}