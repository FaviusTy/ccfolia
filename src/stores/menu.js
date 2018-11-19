import createStore from '../modules/react-simple-store'

const defaultValues = {
  current: ''
}

export const { useStore, store } = createStore(defaultValues)