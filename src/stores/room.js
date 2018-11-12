import createStore from '../modules/react-simple-store'

const defaultValues = {
  name: 'TEST_ROOM',
  count: 0
}

export const { useStore, store } = createStore(defaultValues)